/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test harness loads TypeScript without generating build files. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Load pure TypeScript modules without a Next server or emitted build files.
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
    module: loadedModule, exports: loadedModule.exports, URLSearchParams,
    require: id => id.startsWith(".") ? load(path.relative(path.resolve(__dirname, "../lib"), path.resolve(path.dirname(file), id))) : require(id),
  }, { filename: file });
  return loadedModule.exports;
}
const w = load("wizard");
const { situationFrom } = load("asked");
const { withLang } = load("i18n");
// Key order matters: the round-trip assertion below compares this literal
// against parseAnswers' output, which is built in QUESTION_ORDER. Keep these
// in QUESTION_ORDER (claiming, nominee, court, ...) or that test fails for a
// reason that has nothing to do with the flow.
const base = { claiming: "deposit-account", nominee: "no", court: "no", will: "no", heirs: "agree", bankType: "commercial", amount: "under" };

test("confirmed no-nominee route and commercial/co-operative thresholds", () => {
  assert.equal(w.resolve(base).outcome, "under-threshold");
  assert.equal(w.resolve({ ...base, bankType: "cooperative" }).outcome, "under-threshold");
  assert.match(w.questionFor("amount", base).options[0].label, /15/);
  assert.match(w.questionFor("amount", { bankType: "cooperative" }).options[0].label, /5/);
});
test("unknown, equality, wills and court restrictions cannot get a favourable checklist", () => {
  for (const override of [{ amount: "unknown" }, { amount: "equal" }, { heirs: "unknown" }, { bankType: "unknown" }, { will: "unknown" }, { will: "yes" }, { court: "yes" }, { court: "unknown" }]) {
    const a = { ...base, ...override };
    assert.equal(w.resolve(a).kind, "review", JSON.stringify(override));
    assert.equal(situationFrom(a), "unknown");
  }
});
test("nominees and survivors still require a court check but not the no-nominee threshold questions", () => {
  for (const nominee of ["yes", "survivorship"]) {
    assert.equal(w.resolve({ claiming: "deposit-account", nominee }).question.id, "court");
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "no" }).kind, "outcome");
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "yes" }).kind, "review");
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "no", heirs: "dispute" }).kind, "review");
  }
});
test("missing facts are asked again, including old bookmarked results", () => {
  for (const key of Object.keys(base)) {
    const a = { ...base };
    delete a[key];
    assert.equal(w.resolve(a).kind, "question", key);
  }
});
test("lockers, minors, pensions and other assets exit the deposit flow", () => {
  for (const claiming of ["locker", "minor", "pension", "other"]) assert.equal(w.resolve({ claiming }).outcome, "out-of-scope");
});
test("all three deposit types reach the same verdict", () => {
  // The claiming answer was one value ("deposit") until it was split into
  // three. Nothing downstream distinguishes them -- the RBI's Directions
  // cover an account and a term deposit identically -- so assert that, or a
  // future split silently changes a verdict.
  for (const claiming of ["deposit-account", "deposit-fd", "deposit-both"]) {
    assert.equal(w.resolve({ ...base, claiming }).outcome, "under-threshold", claiming);
  }
});
test("editing an earlier answer clears dependent answers", () => {
  const next = w.answerQuestion(base, "bankType", "cooperative");
  assert.equal(next.bankType, "cooperative");
  assert.equal(next.amount, undefined);
  assert.equal(w.resolve(next).question.id, "amount");
});
test("filling the new court check preserves scenario presets and a known dispute", () => {
  const a = w.answerQuestion({ claiming: "deposit-account", nominee: "yes", heirs: "dispute" }, "court", "no");
  assert.equal(a.heirs, "dispute");
  assert.equal(w.resolve(a).kind, "review");
  const nominee = w.answerQuestion({ claiming: "deposit-account", nominee: "yes" }, "court", "no");
  assert.equal(w.resolve(nominee).outcome, "nominee");
});
test("URL parser only accepts known categories and round trips safely", () => {
  assert.equal(w.parseAnswers({ claiming: "name", amount: "100000" }).claiming, undefined);
  assert.equal(w.parseAnswers({ amount: "100000" }).amount, undefined);
  assert.equal(JSON.stringify(w.parseAnswers(Object.fromEntries(new URLSearchParams(w.toQuery(base))))), JSON.stringify(base));
});
test("language helpers preserve the anchor and other selections", () => {
  assert.equal(withLang("/#find", "hi"), "/?lang=hi#find");
  assert.equal(withLang("/start?nominee=no&lang=hi", "kn"), "/start?nominee=no&lang=kn");
  assert.equal(withLang("/start?nominee=no&lang=hi", "en"), "/start?nominee=no");
});
test("all completed combinations uphold simplified eligibility", () => {
  // Counted, then asserted non-zero at the end. Without this the whole sweep
  // passes vacuously the moment `claiming` stops resolving to a deposit --
  // every branch returns out-of-scope, no assertion inside the loop ever
  // runs, and the one test that proves no unsafe combination reaches a
  // favourable verdict reports green while checking nothing.
  let favourable = 0;
  for (const court of ["no", "yes", "unknown"])
  for (const nominee of ["no", "yes", "survivorship", "unknown"])
  for (const will of ["no", "yes", "unknown"])
  for (const heirs of ["agree", "dispute", "unknown"])
  for (const bankType of ["commercial", "cooperative", "unknown"])
  for (const amount of ["under", "equal", "over", "unknown"]) {
    const a = { claiming: "deposit-account", court, nominee, will, heirs, bankType, amount };
    const r = w.resolve(a);
    if (r.outcome === "under-threshold") {
      favourable++;
      assert.equal(court, "no"); assert.equal(nominee, "no"); assert.equal(will, "no");
      assert.equal(heirs, "agree"); assert.notEqual(bankType, "unknown"); assert.equal(amount, "under");
    }
    if (situationFrom(a) === "simplified") assert.equal(r.outcome, "under-threshold");
  }
  assert.ok(favourable > 0, "swept every combination and never reached a favourable verdict -- the sweep is checking nothing");
});

/**
 * The claim never leaves the browser in a URL.
 *
 * This site's URL *is* the family's case -- /confirm-details?nominee=
 * survivorship&court=unknown and so on. Mixpanel attaches $current_url to
 * every event by default, and `track_pageview: false` does NOT stop that: it
 * only suppresses Mixpanel's own pageview events. An export on 6 Sep 2026
 * found 85 of 110 events carrying claim answers this way.
 *
 * Asserted against the source rather than a live init, because the failure
 * being guarded against is a config line being dropped, and the cost of it
 * regressing unnoticed is the promise printed on five screens of this site.
 */
test("analytics never transmits the URL, which carries the family's answers", () => {
  const src = fs.readFileSync(path.resolve(__dirname, "../lib/analytics.ts"), "utf8");

  assert.match(src, /property_blacklist:\s*BLOCKED_PROPERTIES/,
    "property_blacklist must be wired into mixpanel.init -- without it $current_url ships the whole claim");

  for (const prop of ["$current_url", "$referrer", "$initial_referrer"]) {
    assert.ok(src.includes(`"${prop}"`), `${prop} must stay in BLOCKED_PROPERTIES`);
  }

  // The two flags that look like they cover this, but do not. Kept for their
  // own sake; this asserts nobody removed the blacklist believing these are
  // equivalent -- the exact reasoning error that caused the original bug.
  assert.match(src, /track_pageview:\s*false/);
  assert.match(src, /autocapture:\s*false/);
});

/**
 * The progress bar's denominator is path-dependent and must not overstate.
 *
 * A registered nominee resolves under para 9 at any amount, so that journey
 * is three questions long. Showing "Step 3 of 7" told those readers the
 * product had stopped a third of the way through, when it had actually
 * finished -- the same confusion that made the flow look broken.
 */
test("progress total shrinks to the real worst case for the path taken", () => {
  const remaining = (a) => w.QUESTION_ORDER.filter((id) => a[id]).length + w.maxRemainingQuestions(a);

  assert.equal(remaining({}), 7, "a fresh journey can still ask all seven");
  assert.equal(remaining({ claiming: "deposit-account", nominee: "yes" }), 3,
    "a registered nominee is three questions from an answer, not seven");
  assert.equal(remaining({ claiming: "deposit-account", nominee: "survivorship" }), 3,
    "survivorship resolves on para 9 the same way");
  assert.equal(remaining({ claiming: "deposit-account", nominee: "no" }), 7,
    "the no-nominee path really can ask all seven");

  // Never advertises fewer questions than remain -- but only where a question
  // is actually being asked. "I don't know" on the nominee question resolves
  // straight to /unknown-nominee, so there is no next question to leave room
  // for, and the progress bar is never rendered on that path.
  for (const nominee of ["yes", "survivorship", "no", "unknown"]) {
    const a = { claiming: "deposit-account", nominee };
    if (w.resolve(a).kind !== "question") continue;
    assert.ok(remaining(a) >= w.QUESTION_ORDER.filter((id) => a[id]).length + 1,
      `total must leave room for the question being asked (${nominee})`);
  }
});
