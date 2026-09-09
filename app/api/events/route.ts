/**
 * The write side of the analytics pipeline. Every `track()` call in the
 * browser (lib/analytics.ts) becomes one POST here.
 *
 * Validates the event name against the same fixed list /api/metrics reads
 * back out of -- an unrecognised name is rejected rather than silently
 * creating a new, uncounted category of event.
 *
 * ─── Why this route is hardened but not authenticated (9 Sep 2026) ───
 *
 * It has to be callable from an anonymous browser on the first page view,
 * so there is no credential that could gate it: a token shipped in client
 * JavaScript is readable by anyone the token is meant to exclude. That means
 * this endpoint can always be called by a stranger, and /metrics is public,
 * so the numbers there can never be *proof* against a determined forger.
 *
 * What CAN be bounded is what one caller can do cheaply, and that is what
 * the two guards below do: lib/events.ts's validators bound the contents of
 * any single row, and the rate limit bounds how many rows one IP can add.
 * Together they move casual forgery from trivial to tedious. The honest
 * claim in the PRD is exactly that -- tedious, not impossible.
 */

import { NextResponse } from "next/server";
import { getSupabaseAdmin, EVENTS_TABLE } from "@/lib/supabase";
import { isValidEventName, isValidProperties, isValidSessionId } from "@/lib/events";
import { createRateLimiter, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Deliberately generous. The busiest real journey fires roughly two dozen
 * events, so this leaves better than tenfold headroom for the case that
 * actually matters: several genuine claimants behind one carrier or office
 * NAT, who must never be silently dropped. See lib/rate-limit.ts on why the
 * true ceiling is a multiple of this on serverless.
 */
const isRateLimited = createRateLimiter(300, 60 * 60 * 1000);

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request.headers))) {
    // 429 rather than a silent 200: track() ignores the response either way,
    // but a real operator reading logs should be able to see this happening.
    return NextResponse.json({ error: "Too many events." }, { status: 429 });
  }

  const body: unknown = await request.json().catch(() => null);
  const b = (body ?? {}) as Record<string, unknown>;
  const event = typeof b.event === "string" ? b.event : "";
  const sessionId = b.session_id;
  const properties = b.properties === undefined ? {} : b.properties;

  if (!isValidEventName(event) || !isValidSessionId(sessionId) || !isValidProperties(properties)) {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from(EVENTS_TABLE).insert({ event, session_id: sessionId, properties });
    if (error) {
      return NextResponse.json({ error: "Could not record event." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Analytics is not configured." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
