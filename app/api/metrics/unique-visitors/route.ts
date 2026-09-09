/**
 * Unique visitors, over a caller-chosen window -- separate from
 * /api/metrics because that route's window is fixed (last 30 days,
 * shared across every tile it returns) and this one needs its own
 * independent 3/7/30-day toggle without shifting any other metric's
 * reporting period.
 *
 * Public and aggregate-only, same trust boundary as /api/metrics: no
 * distinct_id, no URL, just a count of distinct visitor_id values.
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, EVENTS_TABLE } from "@/lib/supabase";

export const runtime = "nodejs";

const ALLOWED_DAYS = new Set([3, 7, 30]);

export async function GET(req: NextRequest) {
  const requested = Number(req.nextUrl.searchParams.get("days"));
  const days = ALLOWED_DAYS.has(requested) ? requested : 7;
  const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from(EVENTS_TABLE)
      .select("properties")
      .gte("created_at", from.toISOString());
    if (error) {
      return NextResponse.json({ error: `Could not read events: ${error.message}` }, { status: 502 });
    }
    const ids = new Set(
      (data ?? [])
        .map((row) => (row as { properties: Record<string, unknown> }).properties?.["visitor_id"])
        .filter((v): v is string => typeof v === "string" && v.length > 0),
    );
    return NextResponse.json({ days, uniqueVisitors: ids.size });
  } catch {
    return NextResponse.json({ error: "Analytics is not configured." }, { status: 503 });
  }
}
