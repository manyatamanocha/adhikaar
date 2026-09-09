/**
 * The metric definitions, as arithmetic.
 *
 * Split out of app/api/metrics/route.ts so the numbers can be tested. The
 * route imports next/server, which the CommonJS test harness in tests/ cannot
 * load; everything here is pure and takes its clock as an argument, so a test
 * can hand it a fixed set of events and assert the result.
 *
 * That matters more here than in most files. This is the only place the
 * product's own claims about itself are computed, and until there is real
 * traffic every one of these returns null or zero — which means a mistake in
 * the arithmetic would look exactly like "no data yet" for as long as it took
 * anyone to notice.
 *
 * ─── The metric system this implements ───
 *
 *   North Star   Weekly Resolved Journeys      value delivered
 *   OMTM         Resolution Rate               efficiency of delivering it
 *   Behaviour    Next-Step Action Rate         did they act on it
 *   Guardrails   Honest-Exit Rate              are we still telling the truth
 *                Situation Resolution Share    is the numerator being inflated
 *                Stale Citation Share          is the bank table rotting
 *
 * Agreed 7 Sep 2026; see docs/superpowers/specs/2026-09-06-north-star-metric-design.md.
 */

import { getBank, isStale } from "./banks";
import { RULES_VERIFIED_ON } from "./rbi";

export type MixpanelEvent = {
  event: string;
  properties: Record<string, unknown>;
};

/**
 * Verdicts where the honest answer is "this is not straightforward".
 *
 * `needs-review` belongs here: a court restriction, a will, or a flagged
 * dispute sending someone to a lawyer is exactly the unwelcome truth this
 * guardrail exists to protect. It was ADDED to this set on a first pass that
 * believed that was the whole fix -- it was not. `/needs-review` never fires
 * `outcome_reached` (it fires `actionable_result_viewed` with
 * `resolution_source: "review"` instead -- see analytics.tsx), and the
 * guardrail below read this set against `outcome_reached` alone, so
 * "needs-review" sat in the set unable to ever match anything. Fixed 9 Sep
 * 2026 by widening the event source the set is read against, not by
 * touching the set itself -- see the guardrail below.
 *
 * `confirm-details` is the same outcome under its old route name, kept so
 * events recorded before the 6 Sep rename still count.
 */
export const HONEST_EXIT_OUTCOMES = new Set([
  "dispute",
  "over-threshold",
  "already-in-court",
  "out-of-scope",
  "needs-review",
  "confirm-details",
]);

/**
 * Resolutions that CAN produce a next-step action.
 *
 * DoneBand (Print, Export to email) renders on verdict pages (outcome.tsx)
 * and /needs-review, nowhere else. A situation resolution has no such
 * control, so it can never fire one of ACTION_EVENTS; leaving those journeys
 * in the denominator would score a structural absence as a behavioural
 * failure and drag the rate down every time a situation branch works exactly
 * as designed.
 */
const ELIGIBLE_FOR_ACTION = new Set(["verdict", "review", "unattributed"]);

/**
 * There is deliberately no "I'm ready to proceed" button counted here --
 * whether someone acts at a bank counter happens outside this app and was
 * never ours to claim or gate behind a click. Print and export-to-email are
 * the two real, in-our-control signals that a reader produced a copy of
 * their verdict to use elsewhere.
 */
const ACTION_EVENTS = ["sheet_printed", "exported_to_email"];

/** A rate, or null when the denominator is empty. Never 0% for "no data". */
export function rate(numerator: number, denominator: number): number | null {
  if (!denominator) return null;
  return Math.round((numerator / denominator) * 1000) / 10;
}

export function aggregate(real: MixpanelEvent[], nowMs: number = Date.now()) {
  const of = (name: string) => real.filter((e) => e.event === name);
  const idFor = (e: MixpanelEvent) => String(e.properties["distinct_id"] ?? "");
  const timeOf = (e: MixpanelEvent) => Number(e.properties["time"] ?? 0);
  const idsOf = (name: string) => new Set(of(name).map(idFor));

  const landing = idsOf("landing_viewed").size;
  const startedIds = idsOf("flow_started");
  // Resolved is NOT "finished the seven questions". It counts the situation
  // branches that resolve without the wizard too -- the UDGAM search route,
  // and a named bank demand answered against the RBI's list. That matches the
  // NSM's own definition, "a resolved claim route OR a resolved information
  // gap", not a question count.
  const resolvedIds = idsOf("actionable_result_viewed");

  // ── North Star: Weekly Resolved Journeys ──
  const weekAgo = nowMs / 1000 - 7 * 24 * 60 * 60;
  const weeklyResolved = new Set(
    of("actionable_result_viewed")
      .filter((e) => timeOf(e) >= weekAgo)
      .map(idFor),
  ).size;

  // ── OMTM: Resolution Rate, as a COHORT ──
  //
  // Not "all resolutions ÷ all starts in the window", which divides two
  // populations that need not overlap. This is the share of the journeys that
  // STARTED in the window which went on to resolve -- the same journeys in
  // both halves of the fraction.
  //
  // It stays the OMTM even while it returns null. A metric hierarchy that
  // reshuffles itself according to how much data happens to exist is not a
  // hierarchy; "insufficient data" is the honest reading, not a cue to promote
  // a different metric.
  const cohortResolved = [...startedIds].filter((id) => resolvedIds.has(id)).length;

  // ── Which kind of resolution, and through which door ──
  //
  // Counted as DISTINCT JOURNEYS. A journey that resolved twice by different
  // routes is counted under both, so these can sum to more than the total.
  // They decompose where answers come from; they are not exclusive buckets.
  //
  // "unattributed" is every event recorded before 7 Sep 2026, when
  // `resolution_source` did not exist. Not a fourth kind, and it will not grow.
  const bySource: Record<string, Set<string>> = {};
  for (const e of of("actionable_result_viewed")) {
    const s = String(e.properties["resolution_source"] ?? "unattributed");
    (bySource[s] ??= new Set()).add(idFor(e));
  }
  const resolvedBySource = Object.fromEntries(
    Object.entries(bySource).map(([s, ids]) => [s, ids.size]),
  );

  // Per-door funnel. `branch` rides on flow_started from 7 Sep; journeys that
  // started before that carry none and are reported as "unattributed" rather
  // than silently folded into a real door.
  const branchOf = new Map<string, string>();
  for (const e of of("flow_started")) {
    const id = idFor(e);
    if (!branchOf.has(id)) branchOf.set(id, String(e.properties["branch"] ?? "unattributed"));
  }
  const startedByBranch: Record<string, number> = {};
  const resolvedByBranch: Record<string, number> = {};
  for (const [id, b] of branchOf) {
    startedByBranch[b] = (startedByBranch[b] ?? 0) + 1;
    if (resolvedIds.has(id)) resolvedByBranch[b] = (resolvedByBranch[b] ?? 0) + 1;
  }
  const resolutionRateByBranch = Object.fromEntries(
    Object.keys(startedByBranch).map((b) => [b, rate(resolvedByBranch[b] ?? 0, startedByBranch[b])]),
  );

  // ── Behaviour: Next-Step Action Rate, over ELIGIBLE journeys only ──
  const eligibleIds = new Set(
    of("actionable_result_viewed")
      .filter((e) =>
        ELIGIBLE_FOR_ACTION.has(String(e.properties["resolution_source"] ?? "unattributed")),
      )
      .map(idFor),
  );
  const actedIds = new Set(real.filter((e) => ACTION_EVENTS.includes(e.event)).map(idFor));
  const actedEligible = [...actedIds].filter((id) => eligibleIds.has(id)).length;

  // ── Efficiency: Median Time to Resolution ──
  //
  // No new instrumentation: every event already carries a `time` property
  // (mapRowsToEvents, lib/events.ts, stamps it from Supabase's created_at),
  // so this is the gap between a journey's first start and its first
  // resolution. Journeys missing either end are skipped rather than counted
  // as zero.
  const firstAt = (name: string) => {
    const m = new Map<string, number>();
    for (const e of of(name)) {
      const id = idFor(e);
      const t = timeOf(e);
      if (!m.has(id) || t < m.get(id)!) m.set(id, t);
    }
    return m;
  };
  const startAt = firstAt("flow_started");
  const resolveAt = firstAt("actionable_result_viewed");
  const durations: number[] = [];
  for (const [id, s] of startAt) {
    const r = resolveAt.get(id);
    if (r !== undefined && r >= s) durations.push(r - s);
  }
  durations.sort((a, b) => a - b);
  const mid = durations.length / 2;
  const medianTimeToResolutionSeconds = durations.length
    ? Math.round(
        durations.length % 2 ? durations[Math.floor(mid)] : (durations[mid - 1] + durations[mid]) / 2,
      )
    : null;

  // Per-question drop-off: how many journeys reached each step at all.
  const perQuestion: Record<string, number> = {};
  for (const e of of("question_answered")) {
    const step = String(e.properties["step"] ?? "?");
    perQuestion[step] = (perQuestion[step] ?? 0) + 1;
  }

  const outcomes: Record<string, number> = {};
  for (const e of of("outcome_reached")) {
    const o = String(e.properties["outcome"] ?? "?");
    outcomes[o] = (outcomes[o] ?? 0) + 1;
  }

  // ── Safety guardrail: Honest-Exit Rate, in JOURNEYS ──
  //
  // Was events over events, which is not comparable to anything else in this
  // response and double-counts a journey that reloaded a verdict page.
  //
  // 🔴 Fixed 9 Sep 2026: both halves used to be built from `outcome_reached`
  // alone, which /needs-review never fires. HONEST_EXIT_OUTCOMES already
  // listed "needs-review" -- added specifically because omitting it
  // under-counts this guardrail -- but a value in that set can only ever
  // match an event whose stream actually carries it, and outcome_reached
  // never does for a review. The set membership was right; the event source
  // filtered against it was wrong. needs-review (a court restriction, an
  // unconfirmed will, a flagged dispute) is arguably the single population
  // this guardrail most exists to catch, so the miss was not a rounding
  // error -- it made the guardrail blind to the outcome most likely to be
  // the one worth hiding. Both halves now also read the review-resolution
  // events /needs-review actually fires.
  const reviewEvents = of("actionable_result_viewed").filter(
    (e) => String(e.properties["resolution_source"] ?? "") === "review",
  );
  const outcomeJourneys = new Set([...idsOf("outcome_reached"), ...reviewEvents.map(idFor)]);
  const honestJourneys = new Set(
    [...of("outcome_reached"), ...reviewEvents]
      .filter((e) => HONEST_EXIT_OUTCOMES.has(String(e.properties["outcome"] ?? "")))
      .map(idFor),
  );

  // ── Mix guardrail: Situation Resolution Share ──
  //
  // Honest-Exit reads `outcome_reached`, which situation resolutions never
  // fire, so it cannot see the cheapest way to inflate this North Star:
  // declaring more pages resolutions. Two entries in a lookup table added two
  // on 7 Sep, with no product change.
  //
  // 🔴 No threshold, deliberately. A high share is not itself bad -- a
  // situation resolution is real delivered value, and the NSM counts it on
  // purpose. What the number is for is the MOVE: if it climbs while verdicts
  // stay flat, ask whether traffic mix changed or whether the definition of
  // "resolution" was loosened. Set a baseline once real users exist.
  const situationResolved = bySource["situation"]?.size ?? 0;

  // ── Freshness guardrail: Stale Citation Share ──
  //
  // Computed here rather than sent from the browser: the bank table and
  // isStale() are already importable, so this needs no new event and no new
  // property. Staleness is evaluated as of now, which is the question a
  // guardrail should answer -- is the table rotting today.
  const bankJourneys = new Map<string, string>();
  for (const e of of("bank_selected")) {
    const id = idFor(e);
    if (!bankJourneys.has(id)) bankJourneys.set(id, String(e.properties["bank"] ?? ""));
  }
  let staleCitations = 0;
  for (const [, bankId] of bankJourneys) {
    const bank = getBank(bankId);
    if (bank && isStale(bank.verifiedOn)) staleCitations += 1;
  }

  // ── Validation: Belief Correction Rate ──
  //
  // ⚠️ Narrow base, and it must be labelled as one. BeliefSurvey renders only
  // where `hasAnswers && outcome.goodNews` (outcome.tsx), so it cannot appear
  // on over-threshold, out-of-scope, already-in-court, /needs-review or either
  // situation branch. The denominator is "people who answered a survey shown
  // only on good-news verdicts", never "journeys".
  const beliefAnswers = of("survey_answered");
  const beliefCorrected = beliefAnswers.filter(
    (e) => String(e.properties["believed_certificate_needed"] ?? "") === "yes",
  ).length;

  const arrivedVia: Record<string, number> = {};
  for (const e of of("landing_viewed")) {
    const a = String(e.properties["arrived_via"] ?? "unknown");
    arrivedVia[a] = (arrivedVia[a] ?? 0) + 1;
  }

  return {
    northStar: { weeklyResolvedJourneys: weeklyResolved },
    omtm: {
      metric: "Resolution Rate",
      resolutionRate: rate(cohortResolved, startedIds.size),
      cohortStarted: startedIds.size,
      cohortResolved,
    },
    funnel: {
      landingVisitors: landing,
      journeysStarted: startedIds.size,
      resolvedJourneys: resolvedIds.size,
      showingIntent: actedIds.size,
      journeyStartRate: rate(startedIds.size, landing),
      resolutionRate: rate(cohortResolved, startedIds.size),
      nextStepActionRate: rate(actedEligible, eligibleIds.size),
      nextStepEligibleJourneys: eligibleIds.size,
      resolvedBySource,
      startedByBranch,
      resolvedByBranch,
      resolutionRateByBranch,
    },
    guardrails: {
      honestExitRate: rate(honestJourneys.size, outcomeJourneys.size),
      honestExits: honestJourneys.size,
      journeysReachingOutcome: outcomeJourneys.size,
      situationResolutionShare: rate(situationResolved, resolvedIds.size),
      staleCitationShare: rate(staleCitations, bankJourneys.size),
      journeysCitingABank: bankJourneys.size,
      // Global, not per-journey: every clause was verified in one pass, so if
      // this goes stale the whole product does at once.
      rulesVerifiedOn: RULES_VERIFIED_ON,
      rulesStale: isStale(RULES_VERIFIED_ON),
    },
    validation: {
      beliefCorrectionRate: rate(beliefCorrected, beliefAnswers.length),
      beliefResponses: beliefAnswers.length,
      beliefBase: "good-news verdicts only — not journeys",
    },
    efficiency: { medianTimeToResolutionSeconds },
    perQuestion,
    outcomes,
    arrivedVia,
  };
}
