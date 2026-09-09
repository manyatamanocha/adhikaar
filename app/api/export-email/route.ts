/**
 * Sends a verdict page as an emailed PDF -- the second of the two real
 * next-step actions left (Print is the other). Renders the page with a real
 * headless Chromium, print-media-emulated, exactly the way Ctrl+P does --
 * so this can never drift from what Print produces, and Chromium's own
 * `::details-content` support means every fold and every tab panel opens
 * from the print stylesheet alone, no client-side DOM trick needed.
 *
 * Two Chromium sources, picked by environment: @sparticuz/chromium's slim
 * Linux binary in production (the standard pairing for serverless Chromium
 * on Vercel -- full `puppeteer` bundles a Chromium too large for serverless
 * deploy limits), or a locally installed Chrome/Edge in dev, since
 * @sparticuz/chromium's binary does not run on Windows.
 *
 * No email address is ever stored: it goes straight to Brevo for this one
 * send and is never written to Supabase or any table.
 *
 * Brevo, not Resend: Resend's shared/unverified sending address only
 * delivers to the Resend account's own owner, so it cannot email an
 * arbitrary reader -- the exact thing this feature needs. Brevo's free plan
 * (300 emails/day, permanent, no card) supports Single Sender Verification:
 * verify one email address you own (no domain/DNS required) and send to any
 * recipient from it. Requires BREVO_API_KEY and BREVO_SENDER_EMAIL in
 * .env.local / Vercel env vars -- see the setup note at the bottom of this
 * file.
 */

import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "node:fs";
import { createRateLimiter, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * This route relays mail through our Brevo account and spends real time on
 * Chromium, so an unlimited public POST would make it both a spam relay and
 * a compute sink -- the two most expensive things a stranger could do with
 * this app. See lib/rate-limit.ts for what an in-memory limiter is honestly
 * worth: this is a deterrent, not a guarantee.
 */
const isRateLimited = createRateLimiter(5, 60 * 60 * 1000);

/**
 * Common install locations for a real browser on a dev machine. Overridable
 * via CHROME_EXECUTABLE_PATH for a non-default install.
 */
function localChromePath(): string | undefined {
  if (process.env.CHROME_EXECUTABLE_PATH) return process.env.CHROME_EXECUTABLE_PATH;
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  return candidates.find((p) => fs.existsSync(p));
}

async function renderPdf(url: string): Promise<Buffer> {
  const inProd = !!process.env.VERCEL;
  const executablePath = inProd ? await chromium.executablePath() : localChromePath();
  if (!executablePath) {
    throw new Error(
      "No local Chrome/Edge found. Set CHROME_EXECUTABLE_PATH in .env.local to test PDF export in dev.",
    );
  }

  const browser = await puppeteer.launch({
    args: inProd ? chromium.args : [],
    executablePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // ─── Do not let the renderer forge journeys in our own analytics ───
    //
    // The page below is the real production site, so its client JavaScript
    // runs -- track() included. lib/analytics.ts's only gates are
    // server-side rendering, localhost, and an opted-out browser; a headless
    // Chromium pointed at the production hostname passes all three. Without
    // this block, every emailed PDF would fire a full verdict-page event set
    // (landing_viewed, outcome_reached, actionable_result_viewed) against a
    // freshly minted visitor_id -- inflating the North Star, the unique
    // visitor count and the median time to resolution with a journey the
    // product invented for itself, and doing it MORE as real usage grows.
    //
    // Blocked at the network layer rather than by setting analytics.ts's own
    // exclude-tester flag: that flag's key is private to that module, so
    // reaching for it would couple this route to another file's internals.
    // Aborting the request cannot be undone by a change over there.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const handle = req.url().includes("/api/events") ? req.abort() : req.continue();
      // Both return promises; a request that raced to completion rejects
      // here, and an unhandled rejection would take down the function.
      void Promise.resolve(handle).catch(() => {});
    });

    await page.goto(url, { waitUntil: "networkidle0", timeout: 30_000 });
    await page.emulateMediaType("print");
    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
      margin: { top: "14mm", right: "14mm", bottom: "14mm", left: "14mm" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    return NextResponse.json({ error: "Email export is not configured yet." }, { status: 503 });
  }

  if (isRateLimited(clientIp(req.headers))) {
    return NextResponse.json(
      { error: "Too many emails -- please wait a while and try again." },
      { status: 429 },
    );
  }

  const body: unknown = await req.json().catch(() => null);
  const b = (body ?? {}) as Record<string, unknown>;
  const to = typeof b.to === "string" ? b.to.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.slice(0, 200) : "Your Adhikaar claim guide";
  const url = typeof b.url === "string" ? b.url : "";

  if (!EMAIL_RE.test(to) || !url) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // The URL comes from the client, which means it must be treated as
  // untrusted input -- without this check, this route would render and
  // return the content of ANY url a caller supplied, i.e. an open,
  // Chromium-powered SSRF proxy. Only ever render pages on this same site.
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (parsed.origin !== req.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  let pdf: Buffer;
  try {
    pdf = await renderPdf(parsed.toString());
  } catch (err) {
    console.error("PDF render error:", err);
    return NextResponse.json({ error: "Could not prepare that page as a PDF." }, { status: 502 });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Adhikaar", email: senderEmail },
        to: [{ email: to }],
        subject,
        htmlContent: "<p>Your Adhikaar claim guide is attached as a PDF.</p>",
        attachment: [
          { name: "adhikaar-claim-guide.pdf", content: pdf.toString("base64") },
        ],
      }),
    });
    if (!res.ok) {
      // Logged, not returned -- the failure body can carry Brevo account
      // detail (e.g. the sender's own address) that has no business being
      // sent back to whoever is on the other end of this public route.
      console.error("Brevo send error:", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ error: "Could not send email." }, { status: 502 });
    }
  } catch (err) {
    console.error("Brevo send error:", err);
    return NextResponse.json({ error: "Could not send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

/**
 * ─── One-time setup (does what neither the client nor this route can) ───
 *
 * 1. Create a free Brevo account: https://www.brevo.com/ (no credit card).
 * 2. Verify one sender email you already own: Senders, Domains & Dedicated
 *    IPs → Senders → Add a sender → verify via the confirmation link Brevo
 *    emails to that address. No domain or DNS record needed.
 * 3. SMTP & API → API Keys → Generate a new API key.
 * 4. Set both in .env.local (dev) and the Vercel project's env vars (prod):
 *      BREVO_API_KEY=<the generated key>
 *      BREVO_SENDER_EMAIL=<the address verified in step 2>
 */
