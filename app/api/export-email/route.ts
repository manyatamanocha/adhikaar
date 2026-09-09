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
 * No email address is ever stored: it goes straight to Resend for this one
 * send and is never written to Supabase or any table.
 */

import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "node:fs";

export const runtime = "nodejs";
export const maxDuration = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Same in-memory sliding-window pattern as /api/saathi -- this route can
 * relay mail through our Resend account and spends real time on Chromium,
 * so an unlimited public POST would make it both a spam relay and a compute
 * sink. Resets on redeploy; good enough for this MVP's traffic.
 */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) {
    hits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email export is not configured yet." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
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
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Adhikaar <onboarding@resend.dev>",
        to,
        subject,
        html: "<p>Your Adhikaar claim guide is attached as a PDF.</p>",
        attachments: [
          { filename: "adhikaar-claim-guide.pdf", content: pdf.toString("base64") },
        ],
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Could not send email." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Could not send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
