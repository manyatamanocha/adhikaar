/**
 * The write side of the analytics pipeline. Every `track()` call in the
 * browser (lib/analytics.ts) becomes one POST here.
 *
 * Validates the event name against the same fixed list /api/metrics reads
 * back out of -- an unrecognised name is rejected rather than silently
 * creating a new, uncounted category of event. `properties` is stored as-is;
 * the client only ever sends the fixed enum properties documented against
 * each EventName, the same trust boundary that held under Mixpanel.
 */

import { NextResponse } from "next/server";
import { getSupabaseAdmin, EVENTS_TABLE } from "@/lib/supabase";
import { isValidEventName } from "@/lib/events";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const b = (body ?? {}) as Record<string, unknown>;
  const event = typeof b.event === "string" ? b.event : "";
  const sessionId = typeof b.session_id === "string" ? b.session_id : "";
  const properties =
    b.properties && typeof b.properties === "object" && !Array.isArray(b.properties)
      ? (b.properties as Record<string, unknown>)
      : {};

  if (!isValidEventName(event) || !sessionId) {
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
