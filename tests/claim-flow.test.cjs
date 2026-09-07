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
// Trailing `bank`, matching ALL_QUESTION_IDS' own order (QUESTION_ORDER then
// BANK_QUESTION) -- the URL round-trip test below compares this literal's own
// JSON key order against parseAnswers' output, which is built by iterating
// ALL_QUESTION_IDS.
const base = { claiming: "deposit-account", nominee: "no", court: "no", heirs: "agree", will: "no", bankType: "commercial", amount: "under", bank: "other" };

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
test("nominees and survivors require a court check and a heirs check, but not the no-nominee threshold questions", () => {
  for (const nominee of ["yes", "survivorship"]) {
    assert.equal(w.resolve({ claiming: "deposit-account", nominee }).question.id, "court");
    // Both gates, in order, and neither is skippable.
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "no" }).question.id, "heirs");
    // The facts are settled here -- but resolve() then asks which bank,
    // separately from the seven facts above (see BANK_QUESTION in wizard.ts).
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "no", heirs: "agree" }).question.id, "bank");
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "no", heirs: "agree", bank: "other" }).kind, "outcome");
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "yes" }).kind, "review");
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "no", heirs: "dispute" }).kind, "review");
    // ...and nothing beyond court, heirs and the bank. The threshold
    // questions never apply: para 9 is unconditional at any amount.
    assert.equal(w.resolve({ claiming: "deposit-account", nominee, court: "no", heirs: "agree", bank: "other" }).outcome, nominee === "yes" ? "nominee" : "survivorship");
  }
});
/**
 * The gap this closes, recorded because it survived four days and two reviews.
 *
 * The heirs question used to be asked only on the no-nominee path, AFTER the
 * nominee short-circuit had already returned a verdict. So a registered
 * nominee whose family is contesting the money was told "you should not be
 * asked for a succession certificate, whatever the amount" without ever being
 * asked whether anyone was contesting it. Para 11(b) overrides para 9 exactly
 * there. resolve() caught it only when heirs=dispute arrived pre-set in the
 * URL from a scenario card -- which is to say, almost never.
 */
test("a contested family is asked about on the nominee path, not just the no-nominee one", () => {
  for (const nominee of ["yes", "survivorship"]) {
    const answered = { claiming: "deposit-account", nominee, court: "no" };
    assert.equal(w.resolve(answered).question.id, "heirs", `${nominee} must be asked`);
    // A contest with a nominee is not the /dispute page's case: para 9 may
    // still oblige the bank to pay the nominee, who holds in trust for the
    // heirs. It needs review, not a flat "go and get a succession certificate".
    assert.equal(w.resolve({ ...answered, heirs: "dispute" }).kind, "review");
    // "I don't know" establishes no contest, and para 9 is unconditional, so
    // it must NOT cost the reader the strongest verdict in the product.
    // (bank: "other" clears the separate bank question so this checks the
    // FACTS are settled, not that the wizard has nothing left to ask at all.)
    assert.equal(w.resolve({ ...answered, heirs: "unknown", bank: "other" }).kind, "outcome");
  }
  // With no nominee, a contest is /dispute's own case and reaches it -- now
  // ahead of the will question, since para 11(b) overrides either way.
  assert.equal(w.resolve({ claiming: "deposit-account", nominee: "no", court: "no", heirs: "dispute", bank: "other" }).outcome, "dispute");
  assert.equal(w.resolve({ claiming: "deposit-account", nominee: "no", court: "no", heirs: "dispute", will: "yes", bank: "other" }).outcome, "dispute");
  // The skipped-court entry does not skip this one: whether the family is
  // fighting has nothing to do with whether anyone has been to a bank.
  assert.equal(w.resolve({ claiming: "deposit-account", nominee: "yes" }, "en", "new").question.id, "heirs");
  // QUESTION_ORDER and the ask order must agree, or Back and the progress
  // counter read the wrong field -- see answeredPrefix.
  assert.ok(w.QUESTION_ORDER.indexOf("heirs") < w.QUESTION_ORDER.indexOf("will"));
  // Joined rather than deep-compared: the vm loader builds arrays against its
  // own realm's prototype, which deepStrictEqual counts as a difference.
  assert.equal(
    w.answeredPrefix({ claiming: "deposit-account", nominee: "yes", court: "no", heirs: "agree" }).join(","),
    "claiming,nominee,court,heirs",
  );
});
/**
 * The "not been to the bank yet" entry drops the court QUESTION, never the
 * court GATE.
 *
 * Direct decision, 7 Sep 2026: a reader who is not sure the money even exists
 * cannot answer whether a judge has restrained its payment. What must not
 * follow is a verdict that quietly assumes the answer -- para 8(ii) still bars
 * a bank from settling where it knows of a restraining order. So an ANSWERED
 * restriction has to keep stopping the flow on this entry exactly as it does
 * on every other, and the assumption has to reach the reader on the verdict
 * (outcome.tsx's CourtAssumption, rendered on `!answers.court`).
 */
test("the not-been-to-the-bank entry skips the court question but not the court gate", () => {
  const start = { claiming: "deposit-account", nominee: "yes", heirs: "agree" };
  // Asked on every other entry...
  assert.equal(w.resolve(start).question.id, "court");
  // ...and not on this one, which goes straight to the bank question and then
  // the verdict -- entry has no bearing on BANK_QUESTION, which every path
  // asks regardless of how the reader arrived.
  assert.equal(w.resolve(start, "en", "new").question.id, "bank");
  assert.equal(w.resolve({ ...start, bank: "other" }, "en", "new").outcome, "nominee");
  // The gate survives: a restriction the reader volunteers still wins, and so
  // does a heir dispute arriving from a scenario card.
  assert.equal(w.resolve({ ...start, court: "yes" }, "en", "new").kind, "review");
  assert.equal(w.resolve({ ...start, court: "unknown" }, "en", "new").kind, "review");
  assert.equal(w.resolve({ ...start, heirs: "dispute" }, "en", "new").kind, "review");
  // Out of scope still exits before anything else, entry or no entry -- and
  // the bank question is never asked of it either, since no bank's policy
  // applies to a non-deposit claim.
  assert.equal(w.resolve({ claiming: "other" }, "en", "new").outcome, "out-of-scope");
  // No-nominee still walks its own questions; only court is dropped.
  assert.equal(w.resolve({ claiming: "deposit-account", nominee: "no" }, "en", "new").question.id, "heirs");
  assert.equal(
    w.resolve({ claiming: "deposit-account", nominee: "no", heirs: "agree", will: "no", bankType: "commercial", amount: "under", bank: "other" }, "en", "new").outcome,
    "under-threshold",
  );
  // Only the literal string counts -- anything else is a normal journey.
  assert.equal(w.parseEntry("new"), "new");
  for (const junk of ["started", "", undefined, "1"]) assert.equal(w.parseEntry(junk), undefined);
  // The progress bar must not keep counting a question this path never asks.
  assert.ok(w.progressFor(start, "new").reachable < w.progressFor(start).reachable);
});
test("missing facts are asked again, including old bookmarked results", () => {
  for (const key of Object.keys(base)) {
    const a = { ...base };
    delete a[key];
    assert.equal(w.resolve(a).kind, "question", key);
  }
});
/**
 * Asserted through parseAnswers, like every other URL-borne answer.
 *
 * This used to walk "locker", "minor" and "pension" as well, which read as
 * broad coverage but tested nothing: no option has ever produced those
 * values and the parser has never accepted them, so they could not arrive
 * from a URL either. Handing them straight to resolve() exercised a branch
 * the app cannot reach, while the reachable path -- a real reader picking
 * "Something else, or I'm not sure" -- went through the parser this test
 * skipped. That is precisely the gap that hid the retired-value bug.
 */
test("anything that is not a bank deposit exits the deposit flow", () => {
  assert.equal(w.resolve(w.parseAnswers({ claiming: "other" })).outcome, "out-of-scope");

  // A value no option offers is not quietly treated as an answer: it is
  // dropped, and the reader is asked the question rather than routed on a
  // guess about what they meant.
  for (const claiming of ["locker", "minor", "pension", "", "deposit"]) {
    assert.equal(w.parseAnswers({ claiming }).claiming, undefined, claiming);
    assert.equal(w.resolve(w.parseAnswers({ claiming })).question.id, "claiming", claiming);
  }
});
/**
 * Question one is a scope gate, not a taxonomy quiz.
 *
 * It used to offer "a bank account", "a bank deposit" and "both" as separate
 * answers. Nothing in the product could tell them apart -- resolve() only
 * ever checks that the value is one of the three, no verdict or printed
 * sheet reads it, analytics never sends it, and every scenario card and
 * /guide link already hardcodes deposit-account regardless of the asset it
 * describes. So the first screen a bereaved reader ever sees asked them to
 * classify their asset three ways to reach an identical destination.
 *
 * The one job that screen genuinely does is catch a locker, pension or
 * insurance claim before the reader is walked through deposit guidance that
 * does not apply to them. That exit stays; the busywork does not.
 */
test("question one offers a scope gate, and old links still work", () => {
  const values = (locale) =>
    w.QUESTIONS_BY_LOCALE[locale].claiming.options.map((o) => o.value).join("|");
  for (const locale of ["en", "hi", "kn"]) {
    assert.equal(values(locale), "deposit-account|other",
      `${locale} must offer exactly the deposit answer and the exit`);
  }

  // The retired values stay legal. Every answer lives in the URL, so a
  // half-finished journey is a shareable link -- and links already sent to a
  // sibling, or bookmarked, still carry claiming=deposit-fd.
  //
  // Asserted through parseAnswers, not against resolve() directly, because
  // that is the path the page actually takes and the two disagreed: resolve()
  // honoured the retired values while parseAnswers, which validates against
  // the options currently OFFERED, silently dropped them. The reader was sent
  // back to question one with their answer discarded. Any test that hands
  // resolve() a literal object cannot see that.
  for (const claiming of ["deposit-fd", "deposit-both"]) {
    assert.equal(w.parseAnswers({ claiming }).claiming, claiming,
      `${claiming} must survive the URL parser`);
    assert.equal(w.resolve(w.parseAnswers({ claiming })).question.id, "nominee",
      `${claiming} must still be honoured from an existing link`);
    assert.equal(w.resolve(w.parseAnswers({ ...base, claiming })).outcome, "under-threshold",
      `${claiming} must still reach its verdict`);
  }
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
  assert.equal(w.resolve(nominee).question.id, "heirs");
  assert.equal(w.resolve({ ...nominee, heirs: "agree" }).question.id, "bank");
  assert.equal(w.resolve({ ...nominee, heirs: "agree", bank: "other" }).outcome, "nominee");
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
    // bank: "other" clears the separate bank question (see BANK_QUESTION in
    // wizard.ts) so the sweep reaches an actual outcome for every commercial-
    // bank combination too, not just the co-operative ones that skip it.
    // Without this, resolve() returns kind:"question" (id "bank") for most of
    // the sweep and this test's own favourable-count guard against a vacuous
    // pass would itself pass vacuously on everything but co-operative rows.
    const a = { claiming: "deposit-account", court, nominee, will, heirs, bankType, amount, bank: "other" };
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

  // Eight, not seven, since the bank question joined the wizard (7 Sep 2026,
  // same day as the court/heirs changes below): every path that reaches a
  // deposit verdict asks it, out-of-scope and co-operative-bank claims
  // excepted. See BANK_QUESTION in wizard.ts.
  assert.equal(remaining({}), 8, "a fresh journey can still ask all eight");
  // Five, not three: the nominee path now asks about a contested family
  // (para 11(b) overrides para 9) as well as a court order, and then the bank
  // question -- which every settled path asks, short-circuits included.
  assert.equal(remaining({ claiming: "deposit-account", nominee: "yes" }), 5,
    "a registered nominee is five questions from an answer, not eight");
  assert.equal(remaining({ claiming: "deposit-account", nominee: "survivorship" }), 5,
    "survivorship resolves on para 9 the same way");
  assert.equal(remaining({ claiming: "deposit-account", nominee: "no" }), 8,
    "the no-nominee path really can ask all eight");

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

/**
 * The bar's geometry must not change under the reader.
 *
 * Shrinking the denominator itself (7 -> 3 once a nominee is known) is
 * correct and stays. What broke was showing it as the whole scale: two
 * screens said "of up to 7", the third said "of up to 3", so the earlier
 * screens read as having lied and the bar jumped from two sevenths filled to
 * completely full in one click. progressFor keeps all three numbers apart --
 * where the reader is, how far this path can still go, and the fixed scale
 * everything is drawn on -- so the ruled-out questions can be shown as spent
 * rather than deleted.
 */
test("progress reports position, reach and a fixed scale separately", () => {
  // Re-homed into this realm before comparing: the vm loader above builds
  // objects against its own Object.prototype, which deepStrictEqual counts as
  // a difference. Same reason the URL round-trip test compares JSON strings.
  const progress = (a) => JSON.parse(JSON.stringify(w.progressFor(a)));

  assert.deepEqual(progress({}), { current: 1, reachable: 8, total: 8 });
  assert.deepEqual(progress({ claiming: "deposit-account" }),
    { current: 2, reachable: 8, total: 8 });

  // The screen that produced the bug report: still question 3 of the same
  // scale, but only five of the eight can ever be asked on this path (the
  // bank question, asked last on every settled path, is the fifth).
  assert.deepEqual(progress({ claiming: "deposit-account", nominee: "yes" }),
    { current: 3, reachable: 5, total: 8 });
  assert.deepEqual(progress({ claiming: "deposit-account", nominee: "survivorship" }),
    { current: 3, reachable: 5, total: 8 });

  // The scale is the same seven on every screen of every path -- that is the
  // whole point -- and the reader is never past the end of their own reach.
  const walk = (a) => {
    const step = w.resolve(a);
    if (step.kind !== "question") return;
    const p = w.progressFor(a);
    const where = JSON.stringify(a);
    assert.equal(p.total, w.TOTAL_QUESTIONS, `scale must never change (${where})`);
    assert.ok(p.current <= p.reachable, `position past its own reach (${where})`);
    assert.ok(p.reachable <= p.total, `reach past the scale (${where})`);
    for (const option of w.QUESTIONS[step.question.id].options) {
      walk(w.answerQuestion(a, step.question.id, option.value));
    }
  };
  walk({});
});
