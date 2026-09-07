/**
 * The public metrics endpoint.
 *
 * WHY THIS EXISTS. Every number this product claims about itself should be
 * checkable by the person reading the claim, and nobody outside the account
 * could otherwise verify it. A custom dashboard was built and removed once
 * already, correctly, because a vendor's own UI was strictly better for the
 * one person who could log in. That reasoning changes the moment the numbers
 * have to be *shown* to someone: the constraint is not analysis, it is
 * access.
 *
 * WHY SUPABASE DIRECTLY. Since 7 Sep 2026 this reads Adhikaar's own Supabase
 * table rather than any third party's export API. No export lag, no
 * plan-tier gate, no vendor account required at all -- not even a read-only
 * service account. This computes its own aggregates rather than asking for
 * canned reports because the metrics defined for this product (weekly
 * resolved journeys, Resolution Rate, Honest-Exit Rate) are not shapes any
 * off-the-shelf dashboard produces.
 *
 * WHAT IS AND IS NOT EXPOSED. The service-role key lives in a server-only env
 * var -- no NEXT_PUBLIC_ prefix, so it is never in the client bundle. This
 * route returns aggregate counts only: no distinct_id, no URL, no property
 * values beyond the coarse enums the events already carry. The page is
 * public; the credential is not.
 *
 * DEV TRAFFIC. Never reaches this table at all -- lib/analytics.ts's
 * isLocalDev() stops track() from firing before /api/events is ever called,
 * so there is nothing to filter out at read time the way Mixpanel's export
 * required.
 */

import { NextResponse } from "next/server";
import { aggregate } from "@/lib/metrics";
import { getSupabaseAdmin, EVENTS_TABLE } from "@/lib/supabase";
import { mapRowsToEvents, type EventRow } from "@/lib/events";

export const runtime = "nodejs";
export const revalidate = 300;

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const to = new Date();
  const from = new Date(to.getTime() - 29 * 24 * 60 * 60 * 1000);

  let rows: EventRow[];
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from(EVENTS_TABLE)
      .select("event, session_id, properties, created_at")
      .gte("created_at", from.toISOString())
      .lte("created_at", to.toISOString());
    if (error) {
      return NextResponse.json(
        { error: `Could not read events: ${error.message}` },
        { status: 502 },
      );
    }
    rows = (data ?? []) as EventRow[];
  } catch {
    return NextResponse.json(
      { error: "Analytics is not configured." },
      { status: 503 },
    );
  }

  const real = mapRowsToEvents(rows);

  return NextResponse.json({
    window: { from: isoDate(from), to: isoDate(to) },
    ...aggregate(real),
    dataQuality: {
      eventsConsidered: real.length,
    },
    generatedAt: new Date().toISOString(),
  });
}
