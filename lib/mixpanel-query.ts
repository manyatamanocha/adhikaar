/**
 * Read side of Mixpanel, server-only.
 *
 * `lib/analytics.ts` is the write side -- a client-side token that can send
 * events but, by design, can never read them back. This file is the
 * opposite: a Service Account (project ID + username + secret, all
 * server-only env vars, never NEXT_PUBLIC_) that can query but never write.
 *
 * One JQL request answers everything the admin dashboard needs in a single
 * round trip: a count per (event name, outcome_type) pair, restricted to
 * exactly the events this product actually fires -- see lib/analytics.ts's
 * EventName union, which is the source of truth this list is kept in sync
 * with by hand.
 *
 * Data-residency gotcha already paid for once on this project (see the
 * REGION comment in lib/analytics.ts): the JQL endpoint's HOST must match
 * the region the Mixpanel project was actually CREATED in, or every query
 * silently 401s or returns nothing. `MIXPANEL_REGION` must be set
 * explicitly here -- it is deliberately NOT defaulted to the ingestion
 * SDK's NEXT_PUBLIC_MIXPANEL_REGION, because a wrong guess here fails
 * loudly (a 401), which is safer than a wrong guess on ingestion (silent
 * data loss).
 */

const REGION = process.env.MIXPANEL_REGION;
const QUERY_HOST =
  REGION === "eu"
    ? "https://eu.mixpanel.com"
    : REGION === "in"
      ? "https://in.mixpanel.com"
      : "https://mixpanel.com";

export type MixpanelCounts = Record<string, Record<string, number>>;

export type MixpanelQueryResult =
  | { ok: true; counts: MixpanelCounts }
  | { ok: false; reason: "not_configured" }
  | { ok: false; reason: "request_failed"; status: number; body: string };

export function isMixpanelQueryConfigured(): boolean {
  return Boolean(
    process.env.MIXPANEL_PROJECT_ID &&
    process.env.MIXPANEL_SERVICE_ACCOUNT_USERNAME &&
    process.env.MIXPANEL_SERVICE_ACCOUNT_SECRET &&
    process.env.MIXPANEL_REGION
  );
}

/** The exact event names this product fires -- see lib/analytics.ts's EventName union. */
const TRACKED_EVENTS = [
  "flow_started",
  "question_answered",
  "outcome_reached",
  "demand_checked",
  "readiness_checked",
  "bank_selected",
  "sheet_printed",
  "survey_answered",
  "actionable_result_viewed",
  "next_step_intent",
];

/**
 * JQL script: one count per (event name, outcome_type-or-step-1-flag).
 * `question_answered` is split into "step_1" vs "later" so the NSM
 * denominator (answering the FIRST decision question) is a direct group,
 * not something recomputed client-side from an ambiguous total.
 */
const JQL_SCRIPT = `
function main() {
  return Events({
    from_date: params.from_date,
    to_date: params.to_date,
    event_selectors: ${JSON.stringify(TRACKED_EVENTS.map((name) => ({ event: name })))}
  })
  .groupBy(
    [
      function(e) { return e.name; },
      function(e) {
        if (e.name === "question_answered") return e.properties.step === 1 ? "step_1" : "later";
        if (e.name === "actionable_result_viewed" || e.name === "next_step_intent") {
          return e.properties.outcome_type || "unknown";
        }
        return "total";
      }
    ],
    mixpanel.reducer.count()
  );
}
`;

export async function queryMixpanelCounts(fromDate: string, toDate: string): Promise<MixpanelQueryResult> {
  const projectId = process.env.MIXPANEL_PROJECT_ID;
  const username = process.env.MIXPANEL_SERVICE_ACCOUNT_USERNAME;
  const secret = process.env.MIXPANEL_SERVICE_ACCOUNT_SECRET;
  if (!projectId || !username || !secret) return { ok: false, reason: "not_configured" };

  const auth = Buffer.from(`${username}:${secret}`).toString("base64");
  const body = new URLSearchParams({
    project_id: projectId,
    script: JQL_SCRIPT,
    params: JSON.stringify({ from_date: fromDate, to_date: toDate }),
  });

  const res = await fetch(`${QUERY_HOST}/api/query/jql`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) return { ok: false, reason: "request_failed", status: res.status, body: text };

  let rows: { key: [string, string]; value: number }[];
  try {
    rows = JSON.parse(text);
  } catch {
    return { ok: false, reason: "request_failed", status: res.status, body: text };
  }

  const counts: MixpanelCounts = {};
  for (const row of rows) {
    const [event, bucket] = row.key;
    counts[event] ??= {};
    counts[event][bucket] = row.value;
  }
  return { ok: true, counts };
}
