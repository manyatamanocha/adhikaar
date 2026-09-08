/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test harness loads TypeScript without generating build files. */
/**
 * The metric arithmetic.
 *
 * Every number in lib/metrics.ts returns null or zero against production
 * today, because there is no production traffic yet. That means a mistake in
 * the arithmetic would be indistinguishable from "no data" for as long as it
 * took someone to notice — and these numbers are the product's own claims
 * about itself. So they are proved here against events built by hand.
 *
 * Same loader as claim-flow.test.cjs.
 */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const cache = new Map();
function load(name) {
  const file = path.resolve(__dirname, "../lib", name + ".ts");
  if (cache.has(file)) return cache.get(file).exports;
  const loadedModule = { exports: {} };
  cache.set(file, loadedModule);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, {
    module: loadedModule, exports: loadedModule.exports, URLSearchParams, Date, Math, Object, Set, Map, Number, String, Array, JSON,
    require: id => id.startsWith(".") ? load(path.relative(path.resolve(__dirname, "../lib"), path.resolve(path.dirname(file), id))) : require(id),
  }, { filename: file });
  return loadedModule.exports;
}
const { aggregate, rate } = load("metrics");

// A fixed clock, so "last 7 days" is not a moving target.
const NOW = Date.UTC(2026, 8, 7, 12, 0, 0);
const T = NOW / 1000;
const DAY = 86400;

const ev = (event, id, props = {}, time = T - 60) => ({
  event,
  properties: { distinct_id: id, time, ...props },
});

/**
 * Objects built inside the vm sandbox carry that realm's Object.prototype, so
 * assert/strict's deepEqual fails them on prototype identity even when every
 * key and value matches. Compare the shape as JSON, the way
 * claim-flow.test.cjs already does.
 */
const sameShape = (actual, expected) =>
  assert.equal(JSON.stringify(actual), JSON.stringify(expected));

test("rate() returns null for an empty denominator, never 0%", () => {
  assert.equal(rate(0, 0), null);
  assert.equal(rate(0, 5), 0);
  assert.equal(rate(1, 3), 33.3);
});

test("North Star counts unique journeys in the last 7 days, not events", () => {
  const { northStar, funnel } = aggregate([
    // One journey resolving twice must count once.
    ev("actionable_result_viewed", "a", { resolution_source: "verdict" }),
    ev("actionable_result_viewed", "a", { resolution_source: "verdict" }),
    ev("actionable_result_viewed", "b", { resolution_source: "situation" }),
    // Outside the 7-day window: in the 30-day total, out of the North Star.
    ev("actionable_result_viewed", "c", { resolution_source: "verdict" }, T - 10 * DAY),
  ], NOW);
  assert.equal(northStar.weeklyResolvedJourneys, 2);
  assert.equal(funnel.resolvedJourneys, 3);
});

test("Resolution Rate is a cohort: the same journeys in both halves", () => {
  const { omtm } = aggregate([
    ev("flow_started", "a", { branch: "new" }),
    ev("flow_started", "b", { branch: "asked" }),
    ev("flow_started", "c", { branch: "find" }),
    ev("flow_started", "d", { branch: "new" }),
    ev("actionable_result_viewed", "a", { resolution_source: "verdict" }),
    ev("actionable_result_viewed", "b", { resolution_source: "situation" }),
    // "z" resolved but never started -- a shared link opened mid-journey.
    // It must NOT push the rate above 100%, which is what the old
    // resolutions ÷ starts formula did.
    ev("actionable_result_viewed", "z", { resolution_source: "verdict" }),
  ], NOW);
  assert.equal(omtm.cohortStarted, 4);
  assert.equal(omtm.cohortResolved, 2);
  assert.equal(omtm.resolutionRate, 50);
});

test("a journey that resolves without ever starting cannot exceed 100%", () => {
  const { omtm } = aggregate([
    ev("flow_started", "a", { branch: "new" }),
    ev("actionable_result_viewed", "a", { resolution_source: "verdict" }),
    ev("actionable_result_viewed", "y", { resolution_source: "situation" }),
    ev("actionable_result_viewed", "z", { resolution_source: "situation" }),
  ], NOW);
  assert.equal(omtm.resolutionRate, 100);
  assert.ok(omtm.resolutionRate <= 100);
});

test("Resolution Rate splits by the door the journey came in through", () => {
  const { funnel } = aggregate([
    ev("flow_started", "a", { branch: "new" }),
    ev("flow_started", "b", { branch: "new" }),
    ev("flow_started", "c", { branch: "find" }),
    ev("actionable_result_viewed", "a", { resolution_source: "verdict" }),
    ev("actionable_result_viewed", "c", { resolution_source: "situation" }),
  ], NOW);
  sameShape(funnel.startedByBranch, { new: 2, find: 1 });
  sameShape(funnel.resolvedByBranch, { new: 1, find: 1 });
  assert.equal(funnel.resolutionRateByBranch.new, 50);
  assert.equal(funnel.resolutionRateByBranch.find, 100);
});

test("a start with no branch is reported as unattributed, not folded into a real door", () => {
  const { funnel } = aggregate([ev("flow_started", "old")], NOW);
  sameShape(funnel.startedByBranch, { unattributed: 1 });
});

test("Next-Step Action Rate excludes journeys with no control to act on", () => {
  const { funnel } = aggregate([
    ev("actionable_result_viewed", "a", { resolution_source: "verdict" }),
    ev("actionable_result_viewed", "b", { resolution_source: "review" }),
    // Situation resolutions have no NextStepButton. They must not sit in the
    // denominator being scored as failures to act.
    ev("actionable_result_viewed", "c", { resolution_source: "situation" }),
    ev("actionable_result_viewed", "d", { resolution_source: "situation" }),
    ev("sheet_printed", "a"),
  ], NOW);
  assert.equal(funnel.nextStepEligibleJourneys, 2);
  assert.equal(funnel.nextStepActionRate, 50);
  // showingIntent stays the raw diagnostic across everyone.
  assert.equal(funnel.showingIntent, 1);
});

test("Honest-Exit Rate counts journeys, not events", () => {
  const { guardrails } = aggregate([
    // One journey reloading an honest verdict three times is one journey.
    ev("outcome_reached", "a", { outcome: "over-threshold" }),
    ev("outcome_reached", "a", { outcome: "over-threshold" }),
    ev("outcome_reached", "a", { outcome: "over-threshold" }),
    ev("outcome_reached", "b", { outcome: "nominee" }),
  ], NOW);
  assert.equal(guardrails.journeysReachingOutcome, 2);
  assert.equal(guardrails.honestExits, 1);
  assert.equal(guardrails.honestExitRate, 50);
});

/**
 * The bug this pins: HONEST_EXIT_OUTCOMES has always listed "needs-review",
 * but /needs-review never fires outcome_reached -- only
 * actionable_result_viewed with resolution_source "review" (see
 * analytics.tsx). Reading the set against outcome_reached alone therefore
 * let "needs-review" sit in the set unable to ever match anything: a review
 * journey was invisible to BOTH halves of this guardrail, not merely
 * undercounted in the numerator. needs-review (a court restriction, an
 * unconfirmed will, a flagged dispute) is arguably the single population
 * this guardrail most exists to catch.
 */
test("Honest-Exit Rate counts a needs-review journey in both halves", () => {
  const { guardrails } = aggregate([
    ev("outcome_reached", "a", { outcome: "nominee" }),
    ev("actionable_result_viewed", "b", { outcome: "needs-review", resolution_source: "review" }),
    // Reloading the review page twice is still one journey.
    ev("actionable_result_viewed", "b", { outcome: "needs-review", resolution_source: "review" }),
  ], NOW);
  assert.equal(guardrails.journeysReachingOutcome, 2, "the review journey must sit in the denominator");
  assert.equal(guardrails.honestExits, 1, "and count as a hard case in the numerator");
  assert.equal(guardrails.honestExitRate, 50);
});

test("Situation Resolution Share sees numerator inflation that Honest-Exit cannot", () => {
  const events = [
    ev("outcome_reached", "a", { outcome: "nominee" }),
    ev("actionable_result_viewed", "a", { resolution_source: "verdict" }),
    ev("actionable_result_viewed", "b", { resolution_source: "situation" }),
    ev("actionable_result_viewed", "c", { resolution_source: "situation" }),
    ev("actionable_result_viewed", "d", { resolution_source: "situation" }),
  ];
  const { guardrails, northStar } = aggregate(events, NOW);
  // The North Star is 4 while exactly one verdict was ever reached.
  assert.equal(northStar.weeklyResolvedJourneys, 4);
  assert.equal(guardrails.situationResolutionShare, 75);
  // The safety guardrail is blind to this -- one outcome, honest rate 0%.
  assert.equal(guardrails.journeysReachingOutcome, 1);
});

test("Median Time to Resolution pairs each journey's own start and resolution", () => {
  const { efficiency } = aggregate([
    ev("flow_started", "a", { branch: "new" }, T - 300),
    ev("actionable_result_viewed", "a", { resolution_source: "verdict" }, T - 200), // 100s
    ev("flow_started", "b", { branch: "new" }, T - 600),
    ev("actionable_result_viewed", "b", { resolution_source: "verdict" }, T - 300), // 300s
    ev("flow_started", "c", { branch: "new" }, T - 900),
    ev("actionable_result_viewed", "c", { resolution_source: "verdict" }, T - 700), // 200s
    // Started and never resolved: skipped, not counted as zero.
    ev("flow_started", "d", { branch: "new" }, T - 50),
  ], NOW);
  assert.equal(efficiency.medianTimeToResolutionSeconds, 200);
});

test("Median is the mean of the middle two on an even count", () => {
  const { efficiency } = aggregate([
    ev("flow_started", "a", {}, T - 300),
    ev("actionable_result_viewed", "a", {}, T - 200), // 100s
    ev("flow_started", "b", {}, T - 600),
    ev("actionable_result_viewed", "b", {}, T - 300), // 300s
  ], NOW);
  assert.equal(efficiency.medianTimeToResolutionSeconds, 200);
});

test("Belief Correction Rate is the share who arrived believing the myth", () => {
  const { validation } = aggregate([
    ev("survey_answered", "a", { believed_certificate_needed: "yes" }),
    ev("survey_answered", "b", { believed_certificate_needed: "yes" }),
    ev("survey_answered", "c", { believed_certificate_needed: "no" }),
    ev("survey_answered", "d", { believed_certificate_needed: "unsure" }),
  ], NOW);
  assert.equal(validation.beliefCorrectionRate, 50);
  assert.equal(validation.beliefResponses, 4);
  assert.match(validation.beliefBase, /good-news/);
});

test("Stale Citation Share reads the real bank table, and the RBI rules are current", () => {
  const { guardrails } = aggregate([
    ev("bank_selected", "a", { bank: "sbi", outcome: "nominee" }),
    ev("bank_selected", "a", { bank: "sbi", outcome: "nominee" }),
  ], NOW);
  assert.equal(guardrails.journeysCitingABank, 1);
  // Nothing in lib/banks.ts is past its 182-day window yet. If this ever
  // fails, the bank table has genuinely gone stale and needs re-verifying --
  // that is the guardrail doing its job, not a broken test.
  assert.equal(guardrails.staleCitationShare, 0);
  assert.equal(guardrails.rulesStale, false);
});

test("an empty window reports null everywhere rather than a confident zero", () => {
  const r = aggregate([], NOW);
  assert.equal(r.northStar.weeklyResolvedJourneys, 0);
  assert.equal(r.omtm.resolutionRate, null);
  assert.equal(r.funnel.journeyStartRate, null);
  assert.equal(r.funnel.nextStepActionRate, null);
  assert.equal(r.guardrails.honestExitRate, null);
  assert.equal(r.guardrails.situationResolutionShare, null);
  assert.equal(r.validation.beliefCorrectionRate, null);
  assert.equal(r.efficiency.medianTimeToResolutionSeconds, null);
});
