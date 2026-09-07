/**
 * The public metrics endpoint.
 *
 * WHY THIS EXISTS. Mixpanel's own reports need a login on this project, so
 * nobody outside the account can check any number this product claims. A
 * custom dashboard was built and removed once already, correctly, because
 * Mixpanel's UI was strictly better for the one person who could log in.
 * That reasoning changes the moment the numbers have to be *shown* to
 * someone: the constraint is not analysis, it is access.
 *
 * WHY THE RAW EXPORT API AND NOT THE QUERY API. Mixpanel's free plan returns
 * "Your plan does not allow API calls" for every /api/query/* and
 * /api/2.0/segmentation endpoint. The raw event export
 * (data-eu.mixpanel.com/api/2.0/export) is not gated the same way. That is
 * the whole reason this computes its own aggregates rather than asking
 * Mixpanel for them -- and it is the better fit anyway, because the metrics
 * defined for this product (claim-ready journeys, Honest-Exit Rate) are not
 * shapes Mixpanel's canned reports produce.
 *
 * WHAT IS AND IS NOT EXPOSED. The service-account credentials live in
 * server-only env vars -- no NEXT_PUBLIC_ prefix, so they are never in the
 * client bundle. This route returns aggregate counts only: no distinct_id, no
 * URL, no property values beyond the coarse enums the events already carry.
 * The page is public; the credentials are not.
 *
 * PRIVACY NOTE. Historical events (before 6 Sep 2026) carry $current_url,
 * which on this site contains the family's answers -- that was a real bug,
 * fixed in lib/analytics.ts. This route never returns a URL, and uses
 * $current_url only to identify and DISCARD localhost development traffic.
 */

import { NextResponse } from "next/server";
// Every metric definition lives in lib/metrics.ts, which is pure and testable.
// This file is only the fetch, the development-traffic filter, and the
// envelope -- see tests/metrics.test.cjs for the arithmetic's proof.
import { aggregate, type MixpanelEvent } from "@/lib/metrics";

export const runtime = "nodejs";
export const revalidate = 300;

const EXPORT_HOST = "https://data-eu.mixpanel.com/api/2.0/export";

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const user = process.env.MIXPANEL_SERVICE_USER;
  const secret = process.env.MIXPANEL_SERVICE_SECRET;
  const projectId = process.env.MIXPANEL_PROJECT_ID;

  if (!user || !secret || !projectId) {
    return NextResponse.json(
      { error: "Metrics are not configured." },
      { status: 503 },
    );
  }

  const to = new Date();
  const from = new Date(to.getTime() - 29 * 24 * 60 * 60 * 1000);
  const url =
    `${EXPORT_HOST}?project_id=${encodeURIComponent(projectId)}` +
    `&from_date=${isoDate(from)}&to_date=${isoDate(to)}`;

  let raw: string;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${user}:${secret}`).toString("base64"),
      },
      next: { revalidate },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Mixpanel returned ${res.status}.` },
        { status: 502 },
      );
    }
    raw = await res.text();
  } catch {
    return NextResponse.json(
      { error: "Could not reach Mixpanel." },
      { status: 502 },
    );
  }

  const events: MixpanelEvent[] = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      events.push(JSON.parse(line) as MixpanelEvent);
    } catch {
      // A truncated final line is normal on a streamed export; skip it rather
      // than failing the whole page over one unparseable record.
    }
  }

  // Development traffic and diagnostics are excluded rather than filtered in
  // the reader's head. Events sent from localhost predate the guard added in
  // lib/analytics.ts; zz_ events are pipeline diagnostics.
  let excludedDev = 0;
  const real = events.filter((e) => {
    if (e.event.startsWith("zz_")) return false;
    const u = String(e.properties["$current_url"] ?? "");
    if (u.includes("localhost") || u.includes("127.0.0.1")) {
      excludedDev += 1;
      return false;
    }
    return true;
  });

  return NextResponse.json({
    window: { from: isoDate(from), to: isoDate(to) },
    ...aggregate(real),
    dataQuality: {
      eventsConsidered: real.length,
      developmentEventsExcluded: excludedDev,
    },
    generatedAt: new Date().toISOString(),
  });
}
