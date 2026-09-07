# Bank Question Moves to Q2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move Adhikaar's "which bank" wizard question from last (asked only once the legal verdict is already decided) to second — right after "is this a bank deposit?" — so the reader sees their bank's own policy progressively from Q2 onward instead of only at the final verdict, and drop the now-redundant "what kind of bank" question for anyone who already named a specific bank.

**Architecture:** `resolve()`'s legal branching in `lib/wizard.ts` is untouched below its top; only the position of the bank gate moves. `QUESTION_ORDER` gains `"bank"` as its second member, which lets several special-case code paths added for the previous "ask last" design (`BANK_QUESTION`, `ALL_QUESTION_IDS`) be deleted rather than extended. A new `effectiveBankType()` helper infers `bankType: "commercial"` from a known bank so `bankType` (Q7) is skipped for 8 of 9 possible bank answers. A new `BankSummary` component shows the bank's policy, collapsed, on every question screen from Q2 onward.

**Tech Stack:** Next.js 16 (App Router, server components, no client state), TypeScript, `node:test` + `typescript`'s `transpileModule` for a dependency-free CommonJS test harness (`tests/claim-flow.test.cjs`).

**Spec:** `docs/superpowers/specs/2026-09-07-bank-question-earlier-design.md`

## Global Constraints

- No verdict, RBI clause, document list, or branch of the legal logic changes — this is a reorder plus copy, never a rule change.
- The court-restraint check (`court` question) keeps its exact three values (`no`/`yes`/`unknown`) and exact downstream branching — only its prompt/help/label text changes.
- No free-text input anywhere in this product.
- `amount` is not moved earlier than the no-nominee path already places it.
- Every reworded prompt gets en/hi/kn versions; Hindi and Kannada are unreviewed by a native speaker, same standing caveat as the rest of the site (do not claim otherwise in commit messages or comments).
- `tsc --noEmit` and `eslint app lib` must be clean before any commit in this plan.
- `node --test tests/` must pass before any commit in this plan.
- Run `git status --short` before staging any commit and stage only files this plan touches — other sessions may have concurrent uncommitted work in this repo.

---

### Task 1: Reorder `lib/wizard.ts` — bank at Q2, `effectiveBankType`, remove old special-casing

**Files:**
- Modify: `lib/wizard.ts`
- Modify: `tests/claim-flow.test.cjs`

**Interfaces:**
- Consumes: nothing new — `BANKS` from `./banks` (already imported).
- Produces: `QUESTION_ORDER` now `["claiming", "bank", "nominee", "court", "heirs", "will", "bankType", "amount"]` (8 items, `bank` a real contiguous member). `BANK_QUESTION` and `ALL_QUESTION_IDS` no longer exist — every later task must reference the literal string `"bank"` instead. New exported function `effectiveBankType(a: Answers): Answers["bankType"]`. `TOTAL_QUESTIONS` still equals `QUESTION_ORDER.length` (8). `parseAnswers`, `toQuery`, `answerQuestion`, `previousAnswers`, `answeredPrefix`, `progressFor` all keep their existing signatures — only their internals change.

- [ ] **Step 1: Update the test file's shared fixtures and easy-order-independent tests**

In `tests/claim-flow.test.cjs`, replace the `base` object and its comment block (currently lines 28–36):

```js
// Key order matters: the round-trip assertion below compares this literal
// against parseAnswers' output, which is built in QUESTION_ORDER. Keep these
// in QUESTION_ORDER (claiming, bank, nominee, court, heirs, will, bankType,
// amount) or that test fails for a reason that has nothing to do with the
// flow. `bank` sits second now -- it moved from last to right after
// `claiming`, 7 Sep 2026 evening -- see the bank-question-earlier design spec.
const base = { claiming: "deposit-account", bank: "other", nominee: "no", court: "no", heirs: "agree", will: "no", bankType: "commercial", amount: "under" };
```

- [ ] **Step 2: Rewrite the order-dependent tests to expect bank right after claiming**

Replace the test `"nominees and survivors require a court check and a heirs check, but not the no-nominee threshold questions"` (currently the block starting `test("nominees and survivors require a court check...")`) with:

```js
test("nominees and survivors require a court check and a heirs check, but not the no-nominee threshold questions", () => {
  // Bank is now asked before nominee is even inspected -- confirmed once,
  // outside the nominee/survivorship loop below.
  assert.equal(w.resolve({ claiming: "deposit-account" }).question.id, "bank",
    "bank is the second question, asked before any of the seven facts");
  for (const nominee of ["yes", "survivorship"]) {
    const withBank = { claiming: "deposit-account", bank: "other" };
    assert.equal(w.resolve(withBank).question.id, "nominee");
    // Both gates, in order, and neither is skippable.
    assert.equal(w.resolve({ ...withBank, nominee }).question.id, "court");
    assert.equal(w.resolve({ ...withBank, nominee, court: "no" }).question.id, "heirs");
    assert.equal(w.resolve({ ...withBank, nominee, court: "no", heirs: "agree" }).kind, "outcome");
    assert.equal(w.resolve({ ...withBank, nominee, court: "yes" }).kind, "review");
    assert.equal(w.resolve({ ...withBank, nominee, court: "no", heirs: "dispute" }).kind, "review");
    // ...and nothing beyond court and heirs. The threshold questions never
    // apply: para 9 is unconditional at any amount.
    assert.equal(w.resolve({ ...withBank, nominee, court: "no", heirs: "agree" }).outcome, nominee === "yes" ? "nominee" : "survivorship");
  }
});
```

Replace the test `"a contested family is asked about on the nominee path, not just the no-nominee one"` with:

```js
test("a contested family is asked about on the nominee path, not just the no-nominee one", () => {
  for (const nominee of ["yes", "survivorship"]) {
    const answered = { claiming: "deposit-account", bank: "other", nominee, court: "no" };
    assert.equal(w.resolve(answered).question.id, "heirs", `${nominee} must be asked`);
    // A contest with a nominee is not the /dispute page's own case: para 9 may
    // still oblige the bank to pay the nominee, who holds in trust for the
    // heirs. It needs review, not a flat "go and get a succession certificate".
    assert.equal(w.resolve({ ...answered, heirs: "dispute" }).kind, "review");
    // "I don't know" establishes no contest, and para 9 is unconditional, so
    // it must NOT cost the reader the strongest verdict in the product.
    assert.equal(w.resolve({ ...answered, heirs: "unknown" }).kind, "outcome");
  }
  // With no nominee, a contest is /dispute's own case.
  assert.equal(w.resolve({ claiming: "deposit-account", bank: "other", nominee: "no", court: "no", heirs: "dispute" }).outcome, "dispute");
  assert.equal(w.resolve({ claiming: "deposit-account", bank: "other", nominee: "no", court: "no", heirs: "dispute", will: "yes" }).outcome, "dispute");
  // The skipped-court entry does not skip this one: whether the family is
  // fighting has nothing to do with whether anyone has been to a bank.
  assert.equal(w.resolve({ claiming: "deposit-account", bank: "other", nominee: "yes" }, "en", "new").question.id, "heirs");
  // QUESTION_ORDER and the ask order must agree, or Back and the progress
  // counter read the wrong field -- see answeredPrefix.
  assert.ok(w.QUESTION_ORDER.indexOf("heirs") < w.QUESTION_ORDER.indexOf("will"));
  assert.ok(w.QUESTION_ORDER.indexOf("bank") < w.QUESTION_ORDER.indexOf("nominee"),
    "bank must sit before nominee, the earliest point common to every branch");
  assert.equal(
    w.answeredPrefix({ claiming: "deposit-account", bank: "other", nominee: "yes", court: "no", heirs: "agree" }).join(","),
    "claiming,bank,nominee,court,heirs",
  );
});
```

Replace the test `"the not-been-to-the-bank entry skips the court question but not the court gate"` with:

```js
test("the not-been-to-the-bank entry skips the court question but not the court gate", () => {
  const start = { claiming: "deposit-account", bank: "other", nominee: "yes", heirs: "agree" };
  // Asked on every other entry...
  assert.equal(w.resolve(start).question.id, "court");
  // ...and not on this one, which goes straight to the verdict. Entry has no
  // bearing on the bank question -- every path asks bank regardless of how
  // the reader arrived, and it is answered here already.
  assert.equal(w.resolve(start, "en", "new").kind, "outcome");
  assert.equal(w.resolve(start, "en", "new").outcome, "nominee");
  // The gate survives: a restriction the reader volunteers still wins, and so
  // does a heir dispute arriving from a scenario card.
  assert.equal(w.resolve({ ...start, court: "yes" }, "en", "new").kind, "review");
  assert.equal(w.resolve({ ...start, court: "unknown" }, "en", "new").kind, "review");
  assert.equal(w.resolve({ ...start, heirs: "dispute" }, "en", "new").kind, "review");
  // Out of scope still exits before anything else, entry or no entry -- and
  // before the bank question too, since no bank's policy applies to a
  // non-deposit claim.
  assert.equal(w.resolve({ claiming: "other" }, "en", "new").outcome, "out-of-scope");
  // No-nominee still walks its own questions; only court is dropped.
  assert.equal(w.resolve({ claiming: "deposit-account", bank: "other", nominee: "no" }, "en", "new").question.id, "heirs");
  assert.equal(
    w.resolve({ claiming: "deposit-account", bank: "other", nominee: "no", heirs: "agree", will: "no", bankType: "commercial", amount: "under" }, "en", "new").outcome,
    "under-threshold",
  );
  // Only the literal string counts -- anything else is a normal journey.
  assert.equal(w.parseEntry("new"), "new");
  for (const junk of ["started", "", undefined, "1"]) assert.equal(w.parseEntry(junk), undefined);
  // The progress bar must not keep counting a question this path never asks.
  assert.ok(w.progressFor(start, "new").reachable < w.progressFor(start).reachable);
});
```

In the test `"question one offers a scope gate, and old links still work"`, change the two assertions that read `.question.id, "nominee"` (there are two, once for each retired `claiming` value) to `.question.id, "bank"`:

```js
    assert.equal(w.resolve(w.parseAnswers({ claiming })).question.id, "bank",
      `${claiming} must still be honoured from an existing link`);
```

Replace the test `"editing an earlier answer clears dependent answers"` with:

```js
test("editing an earlier answer clears dependent answers, but bank survives a later edit", () => {
  const next = w.answerQuestion(base, "bankType", "cooperative");
  assert.equal(next.bankType, "cooperative");
  assert.equal(next.amount, undefined);
  // Bank sits BEFORE bankType in QUESTION_ORDER now, so the generic
  // invalidation rule (drop everything after the edited field) leaves it
  // standing without any special-casing -- this is the whole point of
  // moving it into QUESTION_ORDER instead of carrying it separately.
  assert.equal(next.bank, "other");
  assert.equal(w.resolve(next).question.id, "amount");
});
```

Replace the test `"filling the new court check preserves scenario presets and a known dispute"` with:

```js
test("filling the new court check preserves scenario presets and a known dispute", () => {
  const a = w.answerQuestion({ claiming: "deposit-account", bank: "other", nominee: "yes", heirs: "dispute" }, "court", "no");
  assert.equal(a.heirs, "dispute");
  assert.equal(w.resolve(a).kind, "review");
  const nominee = w.answerQuestion({ claiming: "deposit-account", bank: "other", nominee: "yes" }, "court", "no");
  assert.equal(w.resolve(nominee).question.id, "heirs");
  assert.equal(w.resolve({ ...nominee, heirs: "agree" }).outcome, "nominee");
});
```

- [ ] **Step 3: Add a new test for the `bankType` skip and threshold inference**

Add this test after the sweep test (`"all completed combinations uphold simplified eligibility"`):

```js
/**
 * §2.8 of the design spec. Every bank in lib/banks.ts is commercial, so
 * naming one at Q2 already answers "what kind of bank is it" -- asking Q7
 * again would be pure redundancy for 8 of the 9 possible Q2 answers.
 */
test("a known bank skips the bank-type question and infers commercial for the threshold", () => {
  const withRealBank = { claiming: "deposit-account", bank: "sbi", nominee: "no", court: "no", heirs: "agree", will: "no" };
  assert.equal(w.resolve(withRealBank).question.id, "amount",
    "bankType must be skipped -- SBI already tells us it's commercial");
  assert.match(w.questionFor("amount", withRealBank).options[0].label, /15/,
    "a known commercial bank infers the ₹15 lakh threshold label without bankType being answered");
  assert.equal(w.resolve({ ...withRealBank, amount: "under" }).outcome, "under-threshold");

  // "another bank / not sure" still asks it normally -- we cannot infer a
  // type for a bank we hold no row for.
  const withOther = { ...withRealBank, bank: "other" };
  assert.equal(w.resolve(withOther).question.id, "bankType",
    "bankType is still asked when the bank is not on our list");
  assert.equal(w.resolve({ ...withOther, bankType: "cooperative" }).question.id, "amount");
  assert.match(w.questionFor("amount", { ...withOther, bankType: "cooperative" }).options[0].label, /5/);

  // An explicitly answered bankType is never overridden by the inference,
  // even for a known bank -- effectiveBankType only fills a GAP.
  assert.equal(w.resolve({ ...withRealBank, bankType: "cooperative" }).question.id, "amount");
  assert.match(w.questionFor("amount", { ...withRealBank, bankType: "cooperative" }).options[0].label, /5/,
    "an explicit answer is never overridden by the inference from a known bank");
});
```

- [ ] **Step 4: Update the two comment blocks in the progress tests that describe the old order**

In `"progress total shrinks to the real worst case for the path taken"`, replace the comment above `assert.equal(remaining({}), 8, ...)`:

```js
  // Eight questions total either way -- reordering which QUESTION is asked
  // at which step never changes how many get asked on the longest path.
  // Bank is now the second question rather than the eighth (7 Sep 2026
  // evening, see the bank-question-earlier design spec).
  assert.equal(remaining({}), 8, "a fresh journey can still ask all eight");
```

Replace `progress({ claiming: "deposit-account", nominee: "yes" })` and its sibling assertion (currently expecting `{ current: 3, reachable: 5, total: 8 }`) in `"progress reports position, reach and a fixed scale separately"` with the realistic new-order state (bank answered before nominee, matching how the wizard actually walks now):

```js
  // Bank is now the second question, so a registered nominee is reached on
  // step 4 (claiming, bank, nominee), not step 3 -- one real question
  // earlier than before this redesign, and correctly so: the reader has
  // genuinely answered one more question by this point.
  assert.deepEqual(progress({ claiming: "deposit-account", bank: "sbi", nominee: "yes" }),
    { current: 4, reachable: 5, total: 8 });
  assert.deepEqual(progress({ claiming: "deposit-account", bank: "sbi", nominee: "survivorship" }),
    { current: 4, reachable: 5, total: 8 });
```

- [ ] **Step 5: Run the tests and confirm they fail against the current implementation**

Run: `node --test tests/claim-flow.test.cjs`
Expected: FAIL — multiple assertions about `question.id` return `"nominee"` where the new tests expect `"bank"`, since `lib/wizard.ts` has not changed yet.

- [ ] **Step 6: Reorder `QUESTION_ORDER` and remove the old `BANK_QUESTION`/`ALL_QUESTION_IDS` split**

In `lib/wizard.ts`, replace the block from the `QUESTION_ORDER` declaration (line 97) through `export const TOTAL_QUESTIONS = ALL_QUESTION_IDS.length;` (line 122), including the `BANK_QUESTION` doc comment above it:

```ts
export const QUESTION_ORDER: QuestionId[] = ["claiming", "bank", "nominee", "court", "heirs", "will", "bankType", "amount"];
export const TOTAL_QUESTIONS = QUESTION_ORDER.length;
```

Update the `Answers.bank` doc comment (currently ending "Not a member of QUESTION_ORDER. See BANK_QUESTION below.") to:

```ts
  /**
   * WHICH bank, by id from lib/banks.ts — or "other" for one we hold no
   * verified row for. A free string rather than a literal union because the
   * option list is generated from BANKS: adding a bank to the table must not
   * mean editing a type here as well.
   *
   * The second member of QUESTION_ORDER, asked right after `claiming` — the
   * earliest point common to every branch. It never changes the verdict; see
   * resolve()'s comment at its bank gate for why it is asked this early
   * anyway.
   */
```

- [ ] **Step 7: Move the bank gate to the top of `resolve()` and add `effectiveBankType`**

Add this new exported function directly above `export function questionFor`:

```ts
/**
 * §2.8 of the bank-question-earlier design spec: every bank in BANKS is
 * commercial, so naming one at Q2 already answers Q7 (`bankType`). This
 * fills that gap without ever overriding an EXPLICIT answer -- a reader who
 * somehow has both a named bank and an answered bankType (e.g. an old URL)
 * keeps what they answered.
 */
export function effectiveBankType(a: Answers): Answers["bankType"] {
  return a.bankType ?? (a.bank && a.bank !== "other" ? "commercial" : undefined);
}
```

Replace `questionFor`'s threshold-label lookup line (`const limit = a.bankType === "cooperative" ? ...`) to read through the inference:

```ts
  const limit = effectiveBankType(a) === "cooperative" ? THRESHOLD_LABEL[locale].cooperative : THRESHOLD_LABEL[locale].other;
```

Replace the whole `resolve()` function. The `done()` closure loses its bank-asking logic entirely (that job moves to the top of `resolve()` itself); every branch below the bank gate is byte-for-byte the same as before, with one line changed (`bankType` gate now reads through `effectiveBankType`):

```ts
export function resolve(a: Answers, locale: Locale = "en", entry?: Entry): Resolution {
  const ask = (id: QuestionId): Resolution => ({ kind: "question", question: questionFor(id, a, locale) });
  const review = (): Resolution => ({ kind: "review", carry: a });
  const done = (outcome: OutcomeId): Resolution => ({ kind: "outcome", outcome, carry: a });
  if (!a.claiming) return ask("claiming");
  // deposit-fd and deposit-both are no longer offered as answers (question one
  // collapsed to a single deposit option on 7 Sep 2026) but are still honoured
  // here. Every answer lives in the URL, so half-finished journeys are already
  // out there as bookmarks and links sent to siblings; dropping these would
  // turn one into a wrong "out of scope" verdict on reopening.
  if (a.claiming !== "deposit-account" && a.claiming !== "deposit-fd" && a.claiming !== "deposit-both") return done("out-of-scope");
  // Asked second, right after claiming -- the earliest point common to every
  // branch, moved here 7 Sep 2026 evening (superseding the "ask last" design
  // shipped earlier the same day). It STILL never changes the verdict: every
  // rule below this line is exactly what it was before the move. It is asked
  // this early so the reader's own bank's published policy can show alongside
  // every question that follows, not just at the final page. Skipped only
  // when no bank's policy could apply: out-of-scope is handled above this
  // line already, so reaching here means it is a real deposit claim.
  if (!a.bank) return ask("bank");
  if (!a.nominee) return ask("nominee");
  if (a.nominee === "unknown") return done("unknown-nominee");
  // Court gates every outcome below and must be asked before ANY other
  // branch gets to short-circuit past it -- including a pre-filled
  // heirs=dispute answer. A scenario card ("The legal heirs disagree")
  // deep-links straight to /start?claiming=...&heirs=dispute, which lands
  // in `a` before nominee or court are ever asked. Checking heirs first
  // (as this used to) let that pre-filled value skip the court question
  // entirely once nominee was answered -- a real safety gap, since a court
  // restriction can exist independently of a heir dispute and must never
  // be silently skipped. See QUESTION_ORDER's comment for why court can't
  // move any further down either.
  // Not asked of a reader who has not been to the bank yet -- see Entry.
  if (!a.court && entry !== "new") return ask("court");
  // A known dispute needs individual review, not a blanket statement that a
  // valid nominee must obtain succession documents. Kept ahead of the court
  // gate so a dispute that arrived pre-set from a scenario card wins even
  // before the court answer is in.
  if (a.heirs === "dispute" && a.nominee !== "no") return review();
  // An ANSWERED restriction still stops everything, on every path. An
  // unanswered one reaches here only on the "new" entry, where the question
  // was deliberately never put -- so the condition travels with the verdict
  // (outcome.tsx's court-assumption box) instead of blocking it. Written as
  // `a.court && ...` rather than `!== "no"` for exactly that reason: undefined
  // must not be read as a restriction, and must not be read as its absence
  // either.
  if (a.court && a.court !== "no") return review();
  // 🔴 Asked on EVERY path, including nominee and survivorship — closed 7 Sep
  // 2026. It used to be asked only after the nominee short-circuit had already
  // been passed, which meant a registered nominee whose family is contesting
  // the money reached "no succession certificate needed, whatever the amount"
  // without ever being asked about the contest. Para 11(b) overrides para 9:
  // where there are "contesting claims or dispute amongst the legal heir(s)"
  // the bank requires probate, a letter of administration, a succession
  // certificate or a court order. The verdict page carried DISPUTE_CAVEAT as a
  // hard box throughout, so nobody was left without the warning — but the
  // headline was wrong for that reader, which is the part that gets read.
  if (!a.heirs) return ask("heirs");
  // A dispute with no nominee is the /dispute page's own case. With a nominee
  // it is not: para 9 may still oblige the bank to pay the nominee, who then
  // holds in trust for the heirs (Sarbati Devi), and saying flatly that a
  // valid nominee must go and get a succession certificate would be wrong in
  // the other direction. That one goes to review.
  if (a.heirs === "dispute") return a.nominee === "no" ? done("dispute") : review();
  // "I don't know whether everyone agrees" is not a contested claim, and para
  // 9 is unconditional. Sending every unsure nominee to review would gut the
  // strongest verdict in the product over an answer that establishes nothing;
  // the hard dispute caveat on the page covers it. On the no-nominee path,
  // where the whole route depends on heir agreement, it still needs review.
  if (a.nominee === "yes") return done("nominee");
  if (a.nominee === "survivorship") return done("survivorship");
  if (a.heirs === "unknown") return review();
  if (!a.will) return ask("will");
  if (a.will !== "no") return review();
  // Skipped when the bank named at Q2 already tells us the type (§2.8):
  // effectiveBankType infers "commercial" for any of the 8 named banks, since
  // every row in BANKS is commercial. Only "another bank / not sure" (and an
  // old URL with no bank at all, which cannot reach this line -- the bank
  // gate above already caught it) still needs this asked.
  if (!effectiveBankType(a)) return ask("bankType");
  if (effectiveBankType(a) === "unknown") return review();
  if (!a.amount) return ask("amount");
  // Para 10 opens with "less than"; 10(a) says "up to". At equality, confirm.
  if (a.amount === "unknown" || a.amount === "equal") return review();
  return done(a.amount === "over" ? "over-threshold" : "under-threshold");
}
```

- [ ] **Step 8: Remove the `ALL_QUESTION_IDS`/`BANK_QUESTION` references in `parseAnswers`, `toQuery`, `answerQuestion`, `previousAnswers`**

Replace `parseAnswers`'s loop (`for (const id of ALL_QUESTION_IDS) {`) to iterate `QUESTION_ORDER`:

```ts
export function parseAnswers(sp: Record<string, string | string[] | undefined>): Answers {
  const a: Answers = {};
  for (const id of QUESTION_ORDER) {
    const raw = sp[id];
    const v = Array.isArray(raw) ? raw[0] : raw;
    const known = QUESTIONS[id]?.options.some(o => o.value === v) || RETIRED_VALUES[id]?.includes(v!);
    if (v && known) Object.assign(a, { [id]: v });
  }
  return a;
}
```

Replace `toQuery` the same way, and simplify its comment:

```ts
export function toQuery(a: Answers): string {
  const q = new URLSearchParams();
  // QUESTION_ORDER, so `bank` rides in the query string like every other
  // answer -- it is one now, not a value carried alongside them.
  for (const id of QUESTION_ORDER) if (a[id]) q.set(id, a[id]!);
  return q.size ? `?${q}` : "";
}
```

Replace `answerQuestion` in full — the `id === BANK_QUESTION` early-return and the `if (a.bank && id !== "bankType") next.bank = a.bank;` line are both deleted; bank is now handled by the same generic slice-and-rebuild every other question already uses:

```ts
/** Changing an earlier answer invalidates later facts (especially bank/amount). */
export function answerQuestion(a: Answers, id: QuestionId, value: string): Answers {
  // Filling a missing court check must not erase a scenario's known dispute
  // or nominee. Bank/amount is different: a new bank type invalidates a
  // previously selected numeric category, including old bookmarked URLs.
  if (a[id] === undefined && id !== "bankType") return parseAnswers({ ...a, [id]: value });
  const next: Answers = {};
  for (const key of QUESTION_ORDER.slice(0, QUESTION_ORDER.indexOf(id))) {
    if (a[key]) Object.assign(next, { [key]: a[key] });
  }
  return parseAnswers({ ...next, [id]: value });
}
```

Replace `previousAnswers` — the `if (a.bank) { ... }` special case at its top is deleted; Back from the bank question now falls straight through to the generic `answeredPrefix`-based logic, exactly like Back from every other question:

```ts
export function previousAnswers(a: Answers): Answers | null {
  const answered = answeredPrefix(a);
  if (!answered.length) return null;
  const previous = { ...a };
  delete previous[answered[answered.length - 1]];
  return previous;
}
```

- [ ] **Step 9: Run the tests and confirm they pass**

Run: `node --test tests/claim-flow.test.cjs`
Expected: PASS — all tests green, including the new `"a known bank skips the bank-type question..."` test.

- [ ] **Step 10: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint lib`
Expected: no errors.

- [ ] **Step 11: Commit**

```bash
git add lib/wizard.ts tests/claim-flow.test.cjs
git commit -m "Move the bank question to Q2, skip bankType for a known bank

resolve()'s bank gate moves from inside done() (asked only once an
outcome was already decided) to right after claiming -- the earliest
point common to every branch. Every rule below it is unchanged; only its
position moves, and it still cannot change the verdict.

New effectiveBankType() infers bankType: commercial from a named bank
(every row in lib/banks.ts is commercial), so bankType (Q7) is skipped
for 8 of the 9 possible bank answers -- redundant otherwise, since
picking SBI already tells us it's commercial.

BANK_QUESTION and ALL_QUESTION_IDS are removed: bank is now a real,
contiguous member of QUESTION_ORDER, so the special-casing added when it
was asked last (in parseAnswers, toQuery, answerQuestion,
previousAnswers) is deleted rather than extended -- this removes more
code than it adds.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01S1dgu8GoUYSRZbJDZGggRN"
```

---

### Task 2: Reword Q1, Q3, Q4 and the bank question's help text (en/hi/kn)

**Files:**
- Modify: `lib/wizard.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: no signature changes — every `Question` object's `id`, `number`, and every `Option`'s `value` stay exactly as they are. Only `prompt`, `help`, and the affected `Option.label` strings change.

**Copy-only. No test changes in this task** — `tests/claim-flow.test.cjs` asserts option `value`s and `resolve()`/`answerQuestion()` behaviour, never prompt or label text, so none of its assertions are sensitive to this task.

- [ ] **Step 1: Reword Q1 (`claiming`) in all three locales**

In the `en` object, `claiming.prompt` becomes `"The claim is for which of the following?"`; the first option's `label` becomes `"A bank account, a deposit, or both"` (its `detail` is unchanged):

```ts
  claiming: {
    id: "claiming", number: 1, prompt: "The claim is for which of the following?",
    help: "",
    options: [
      { value: "deposit-account", label: "A bank account, a deposit, or both", detail: "Savings, current, term or recurring." },
      { value: "other", label: "Something else, or I'm not sure", detail: "A locker, pension, insurance, provident fund, shares — or you don't know yet.", unsure: true },
    ],
  },
```

In `hi`, `claiming.prompt` becomes `"यह दावा इनमें से किसके लिए है?"`; first option's `label` becomes `"एक बैंक खाता, एक जमा, या दोनों"`.

In `kn`, `claiming.prompt` becomes `"ಈ ಹಕ್ಕು ಇವುಗಳಲ್ಲಿ ಯಾವುದಕ್ಕಾಗಿದೆ?"`; first option's `label` becomes `"ಬ್ಯಾಂಕ್ ಖಾತೆ, ಠೇವಣಿ, ಅಥವಾ ಎರಡೂ"`.

- [ ] **Step 2: Reword Q3 (`nominee`) in all three locales**

In `en`, `nominee.prompt` becomes `"Is there a registered nominee for this account?"` (help and every option unchanged):

```ts
  nominee: {
    id: "nominee", number: 2, prompt: "Is there a registered nominee for this account?",
    help: "This person is called a nominee. Check the bank's records. For a joint account, a surviving holder may qualify under an 'either or survivor' instruction.",
    options: [
      { value: "yes", label: "Yes, there is a registered nominee", detail: "The sole account holder, or all joint depositors, have died." },
      { value: "survivorship", label: "A joint holder survives", detail: "The account says 'either or survivor' or similar words." },
      { value: "no", label: "No one was named, and no joint-holder instruction applies" }, unknownEn,
    ],
  },
```

In `hi`, `nominee.prompt` becomes `"क्या इस खाते के लिए कोई पंजीकृत नामांकित व्यक्ति है?"`.

In `kn`, `nominee.prompt` becomes `"ಈ ಖಾತೆಗೆ ನೋಂದಾಯಿತ ನಾಮನಿರ್ದೇಶಿತರು ಇದ್ದಾರೆಯೇ?"`.

- [ ] **Step 3: Reword Q4 (`court`) in all three locales — the safety check stays, wording only**

In `en`:

```ts
  court: {
    id: "court", number: 3, prompt: "Is there a court order currently stopping the bank from paying this money?",
    help: "This is different from simply having a court case about the money — only an order that specifically stops payment counts here. If you're not sure, ask the bank whether it knows of one.",
    options: [{ value: "no", label: "No — there's no such order (whether or not there's a case)" }, { value: "yes", label: "Yes, a court order is stopping payment" }, unknownEn],
  },
```

In `hi`:

```ts
  court: {
    id: "court", number: 3, prompt: "क्या फ़िलहाल कोई अदालती आदेश बैंक को यह पैसा देने से रोक रहा है?",
    help: "यह केवल पैसे से जुड़ा कोई अदालती मामला होने से अलग है — यहाँ सिर्फ़ वह आदेश गिना जाता है जो भुगतान को स्पष्ट रूप से रोकता है। अगर यक़ीन न हो, तो बैंक से पूछें कि क्या उसे ऐसे किसी आदेश की जानकारी है।",
    options: [{ value: "no", label: "नहीं — ऐसा कोई आदेश नहीं है (चाहे मामला हो या न हो)" }, { value: "yes", label: "हाँ, एक अदालती आदेश भुगतान रोक रहा है" }, unknownHi],
  },
```

In `kn`:

```ts
  court: {
    id: "court", number: 3, prompt: "ಈ ಹಣವನ್ನು ಪಾವತಿಸದಂತೆ ಬ್ಯಾಂಕನ್ನು ಪ್ರಸ್ತುತ ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ತಡೆಯುತ್ತಿದೆಯೇ?",
    help: "ಇದು ಹಣದ ಬಗ್ಗೆ ಕೇವಲ ನ್ಯಾಯಾಲಯದ ಪ್ರಕರಣ ಇರುವುದಕ್ಕಿಂತ ಬೇರೆ — ಇಲ್ಲಿ ಪಾವತಿಯನ್ನು ನಿರ್ದಿಷ್ಟವಾಗಿ ತಡೆಯುವ ಆದೇಶ ಮಾತ್ರ ಎಣಿಕೆಯಾಗುತ್ತದೆ. ಖಚಿತವಿಲ್ಲದಿದ್ದರೆ, ಅಂತಹ ಆದೇಶದ ಬಗ್ಗೆ ಬ್ಯಾಂಕಿಗೆ ಗೊತ್ತಿದೆಯೇ ಎಂದು ಕೇಳಿ.",
    options: [{ value: "no", label: "ಇಲ್ಲ — ಅಂತಹ ಆದೇಶ ಇಲ್ಲ (ಪ್ರಕರಣ ಇರಲಿ ಅಥವಾ ಇಲ್ಲದಿರಲಿ)" }, { value: "yes", label: "ಹೌದು, ಒಂದು ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಪಾವತಿಯನ್ನು ತಡೆಯುತ್ತಿದೆ" }, unknownKn],
  },
```

- [ ] **Step 4: Reword the bank question's help text in all three locales**

In `en`, `bank.help` becomes:

```ts
    help: "This does not change your result — it only means we can show you your bank's own published policy alongside the questions that follow.",
```

In `hi`, `bank.help` becomes:

```ts
    help: "इससे आपका नतीजा नहीं बदलता — इसका मतलब बस इतना है कि हम आपके बैंक की प्रकाशित नीति आगे के सवालों के साथ दिखा सकते हैं।",
```

In `kn`, `bank.help` becomes:

```ts
    help: "ಇದು ನಿಮ್ಮ ಫಲಿತಾಂಶವನ್ನು ಬದಲಾಯಿಸುವುದಿಲ್ಲ — ಇದರರ್ಥ ನಿಮ್ಮ ಬ್ಯಾಂಕಿನ ಪ್ರಕಟಿತ ನೀತಿಯನ್ನು ಮುಂದಿನ ಪ್ರಶ್ನೆಗಳ ಜೊತೆ ತೋರಿಸಬಹುದು ಎಂದು ಮಾತ್ರ.",
```

- [ ] **Step 5: Run the full test suite, typecheck, lint**

Run: `node --test tests/ && npx tsc --noEmit && npx eslint app lib`
Expected: all pass — this task changes no value or logic a test could catch, so this step's real job is confirming that claim by seeing green, not finding a bug.

- [ ] **Step 6: Manually verify the reworded screens render**

Run: `npx next dev -p 3100 &` then, once ready:

```bash
curl -s "http://localhost:3100/start?begin=1" | grep -o "The claim is for which of the following?"
curl -s "http://localhost:3100/start?begin=1&claiming=deposit-account&bank=sbi" | grep -o "Is there a registered nominee for this account?"
curl -s "http://localhost:3100/start?begin=1&claiming=deposit-account&bank=sbi&nominee=no" | grep -o "Is there a court order currently stopping the bank from paying this money?"
```

Expected: each `grep` prints the exact reworded string. Stop the dev server afterward.

- [ ] **Step 7: Commit**

```bash
git add lib/wizard.ts
git commit -m "Reword Q1, Q3, Q4 and the bank question's help text

Copy only -- no option value, branch, or outcome changes. Q4 keeps its
exact court-restraint safety check (para 8(ii)); only its wording
changes, specifically to make 'I have some unrelated court matter but no
order stopping payment' unmistakably still a 'No'. Q3 keeps the term
'nominee' rather than 'claimant', which in this product already means
the reader themselves. en/hi/kn, hi/kn unreviewed by a native speaker.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01S1dgu8GoUYSRZbJDZGggRN"
```

---

### Task 3: Rename the opening screen's heading

**Files:**
- Modify: `lib/i18n-situations.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `SituationsDict.heading` (all three locales) — no type change, string value only.

- [ ] **Step 1: Change the English heading**

In `lib/i18n-situations.ts`, in the `en` object, change:

```ts
  heading: "My Claim Journey",
```

to:

```ts
  heading: "My Claim Process",
```

- [ ] **Step 2: Change the Hindi heading**

In the `hi` object, change:

```ts
  heading: "मेरी दावा यात्रा",
```

to:

```ts
  heading: "मेरी दावा प्रक्रिया",
```

- [ ] **Step 3: Change the Kannada heading**

In the `kn` object, change:

```ts
  heading: "ನನ್ನ ಹಕ್ಕಿನ ಪಯಣ",
```

to:

```ts
  heading: "ನನ್ನ ಹಕ್ಕಿನ ಪ್ರಕ್ರಿಯೆ",
```

- [ ] **Step 4: Typecheck and verify**

Run: `npx tsc --noEmit`
Expected: clean.

Run (dev server already running or restarted per Task 2 Step 6's pattern):
```bash
curl -s "http://localhost:3100/start" | grep -o "My Claim Process"
curl -s "http://localhost:3100/start?lang=hi" | grep -o "मेरी दावा प्रक्रिया"
curl -s "http://localhost:3100/start?lang=kn" | grep -o "ನನ್ನ ಹಕ್ಕಿನ ಪ್ರಕ್ರಿಯೆ"
```
Expected: each prints its string.

- [ ] **Step 5: Commit**

```bash
git add lib/i18n-situations.ts
git commit -m "Rename the opening screen's heading to My Claim Process

Copy only, en/hi/kn.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01S1dgu8GoUYSRZbJDZGggRN"
```

---

### Task 4: Point "I do not know from where to start" at the search page directly

**Files:**
- Modify: `app/start/page.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: no signature change — `SituationPicker`'s internal `options` array, one `href` value changed.

- [ ] **Step 1: Change the `dontKnow` option's href**

In `app/start/page.tsx`, inside `SituationPicker`, change:

```ts
    { ...t.dontKnow, href: "/start/find" },
```

to:

```ts
    // Goes straight to the search page now, not the two-way fork -- the
    // fork's content turned out to just restate Q1 rather than address the
    // actual problem this option names ("I don't know where the money is").
    // /start/find/where already serves exactly that reader. /start/find
    // itself is now unreachable from this screen (still works if visited
    // directly) -- 7 Sep 2026 evening, see the bank-question-earlier spec §2.11.
    { ...t.dontKnow, href: "/start/find/where" },
```

- [ ] **Step 2: Typecheck and verify the new link and the orphaned page**

Run: `npx tsc --noEmit`
Expected: clean.

```bash
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3100/start/find/where"
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3100/start/find"
curl -s "http://localhost:3100/start" | grep -o 'href="/start/find/where[^"]*"'
```
Expected: both return 200; the third command prints at least one match (confirming the link on the opening screen now points at `/start/find/where`).

- [ ] **Step 3: Commit**

```bash
git add app/start/page.tsx
git commit -m "Point 'I do not know from where to start' straight at the search page

/start/find (the two-way 'know the bank / don't know where it is' fork)
is now unreachable from the opening screen -- its content duplicated Q1
rather than addressing the actual problem this option names. Still works
at its URL if visited directly.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01S1dgu8GoUYSRZbJDZGggRN"
```

---

### Task 5: Add the "unverified bank" dictionary key

**Files:**
- Modify: `lib/i18n-home.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: new `HomeDict["verdictPage"]["bankSummaryUnverified"]: string`, all three locales — consumed by Task 6's `BankSummary` component.

- [ ] **Step 1: Add the type field**

In `lib/i18n-home.ts`, immediately after the line `bankBoxOtherBody: string;` (in the `verdictPage` type block), add:

```ts
    /** The collapsed wizard-screen summary (BankSummary) for bank: "other" or an unrecognised id — shorter than bankBoxOtherBody, which has room for a full paragraph on the verdict page. */
    bankSummaryUnverified: string;
```

- [ ] **Step 2: Add the English value**

Immediately after the `bankBoxOtherBody:` value in the `en` object, add:

```ts
    bankSummaryUnverified: "We hold no verified policy for this bank.",
```

- [ ] **Step 3: Add the Hindi value**

Immediately after the `bankBoxOtherBody:` value in the `hi` object, add:

```ts
    bankSummaryUnverified: "इस बैंक की कोई जाँची हुई नीति हमारे पास नहीं है।",
```

- [ ] **Step 4: Add the Kannada value**

Immediately after the `bankBoxOtherBody:` value in the `kn` object, add:

```ts
    bankSummaryUnverified: "ಈ ಬ್ಯಾಂಕಿನ ಪರಿಶೀಲಿಸಿದ ನೀತಿ ನಮ್ಮ ಬಳಿ ಇಲ್ಲ.",
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean — this fails loudly (missing property) if any locale object was skipped, since `HomeDict` requires all three to satisfy the type.

- [ ] **Step 6: Commit**

```bash
git add lib/i18n-home.ts
git commit -m "Add the bankSummaryUnverified dictionary key

For Task 6's BankSummary component, shown on wizard question screens
when the picked bank is 'other' or unrecognised. en/hi/kn.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01S1dgu8GoUYSRZbJDZGggRN"
```

---

### Task 6: Add the `BankSummary` component

**Files:**
- Modify: `app/_components/bank-panel.tsx`

**Interfaces:**
- Consumes: `getBank` (already imported in this file), `plainPolicyLines` (already defined in this file, unexported — stays that way, `BankSummary` calls it directly since it lives in the same module), `HomeDict["verdictPage"]["bankBoxEyebrow"|"bankBoxChange"|"bankSummaryUnverified"]` (the last added in Task 5).
- Produces: new exported function `BankSummary({ bankId, changeHref, t }: { bankId: string; changeHref: string; t: VerdictText }): JSX.Element`, consumed by Task 7.

- [ ] **Step 1: Add the component**

In `app/_components/bank-panel.tsx`, add this directly after the closing brace of `BankBox` (before the `plainPolicyLines` function):

```tsx
/**
 * The collapsed line shown on every wizard question screen from Q2 onward
 * (once bank is answered) -- app/start/page.tsx.
 *
 * Deliberately ONE level, not two: BankBox on the verdict page nests a full
 * BankPanel behind its own "More details" disclosure, because that page has
 * room for the whole reference table. This is a wizard screen mid-journey —
 * it gets the same plain-language sentences BankBox opens with, and nothing
 * more. The full table stays exclusive to the verdict, where it belongs
 * alongside the RBI clause it is being weighed against.
 */
export function BankSummary({
  bankId,
  changeHref,
  t,
}: {
  bankId: string;
  /** Where "change" navigates -- the same URL with `bank` cleared, landing back on the bank question. */
  changeHref: string;
  t: VerdictText;
}) {
  const bank = bankId !== "other" ? getBank(bankId) : undefined;

  if (!bank) {
    return (
      <p data-print="hide" className="mb-5 text-[0.9375rem] text-ink-soft">
        <span className="font-bold text-ink">{t.bankBoxEyebrow}:</span>{" "}
        {t.bankSummaryUnverified}{" "}
        <Link href={changeHref} className="font-bold text-link underline underline-offset-2">
          {t.bankBoxChange}
        </Link>
      </p>
    );
  }

  const lines = plainPolicyLines(bank, t);

  return (
    <details data-print="hide" className="group mb-5 rounded-lg border border-rule bg-white">
      <summary className="-my-1 flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-2.5 [&::-webkit-details-marker]:hidden">
        <span className="text-[0.9375rem] font-bold text-indigo-ink">
          {t.bankBoxEyebrow}: {bank.name}
        </span>
        <span aria-hidden="true" className="shrink-0 text-[0.8125rem] font-bold text-saffron-ink transition-transform group-open:rotate-180">
          &darr;
        </span>
      </summary>
      <div className="border-t border-rule-faint px-4 py-3">
        <ul className="space-y-2">
          {lines.map((line) => (
            <li key={line} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-ink">
              <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <Link href={changeHref} className="mt-3 inline-block text-[0.875rem] font-bold text-link underline underline-offset-2">
          {t.bankBoxChange}
        </Link>
      </div>
    </details>
  );
}

```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint app`
Expected: clean. (`BankSummary` is unused until Task 7 wires it in — an unused-export is not an eslint error, only an unused local variable/import would be, so this step should already be clean.)

- [ ] **Step 3: Commit**

```bash
git add app/_components/bank-panel.tsx
git commit -m "Add BankSummary, the collapsed wizard-screen bank policy line

One level deep (plain-language sentences only, no nested reference
panel) -- unlike BankBox on the verdict page, which has room for the
full table behind its own disclosure. Not yet wired into any page.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01S1dgu8GoUYSRZbJDZGggRN"
```

---

### Task 7: Wire `BankSummary` into the wizard, fix the two `BANK_QUESTION` references

**Files:**
- Modify: `app/start/page.tsx`
- Modify: `app/_components/outcome.tsx`

**Interfaces:**
- Consumes: `BankSummary` from `../_components/bank-panel` (Task 6), `effectiveBankType`/`QUESTION_ORDER` behaviour from Task 1 (already released).
- Produces: no new exports.

- [ ] **Step 1: Fix `app/start/page.tsx`'s import and the compact-chip condition**

Remove `BANK_QUESTION` from the `@/lib/wizard` import list (it no longer exists after Task 1):

```ts
import {
  parseAnswers,
  parseEntry,
  answerQuestion,
  previousAnswers,
  progressFor,
  resolve,
  toQuery,
  QUESTION_ORDER,
  type Answers,
  type Entry,
  type Option,
  type Question,
} from "@/lib/wizard";
```

Add the `BankSummary` import and its type dependency, alongside the existing `HOME_T` import:

```ts
import { HOME_T, type HomeDict } from "@/lib/i18n-home";
import { BankSummary } from "../_components/bank-panel";
```

Change the compact-chip condition from `question.id === BANK_QUESTION` to the literal string:

```tsx
          {question.id === "bank" ? (
```

- [ ] **Step 2: Render `BankSummary` between the Back link and the question heading**

In the `Start` function body, compute a `changeHref` (the current answers with `bank` cleared, which sends `resolve()` straight back to asking "bank" — the same trick every other Back-style navigation on this page already uses) right after `const back = previousAnswers(answers);`:

```ts
  const back = previousAnswers(answers);
  // Cleared, not omitted: toQuery's `if (a[id])` guard already treats a
  // falsy value as absent, so this reaches the bank question again without
  // needing a second code path to "remove a key".
  const changeHref = link(`/start${toQuery({ ...answers, bank: undefined })}`);
```

Insert the `BankSummary` render immediately after the closing `</Link>` of the Back link and before the `<h1>`:

```tsx
          <Link
            href={back ? link(`/start${toQuery(back)}`) : withLang("/", locale)}
            className="-my-2.5 mt-4 inline-flex items-center gap-2 py-2.5 text-[1rem] font-bold text-indigo"
          >
            <span aria-hidden="true">&larr;</span>
            {back ? t.backAQuestion : t.backToStart}
          </Link>

          {/* Every screen from the bank question onward -- never on the bank
              question screen itself (answers.bank is unset until it's
              answered, and this page never renders past it in the same
              request since resolve() would already have moved on). */}
          {answers.bank && (
            <div className="mt-4">
              <BankSummary bankId={answers.bank} changeHref={changeHref} t={HOME_T[locale].verdictPage} />
            </div>
          )}

          <h1 className="display-lg mt-4 font-serif font-bold text-indigo-ink">
```

- [ ] **Step 3: Fix `app/_components/outcome.tsx`'s import and the redirect-skip condition**

Change the import line:

```ts
import { parseAnswers, parseEntry, resolve, toQuery, type Answers } from "@/lib/wizard";
```

Change the condition and tighten its comment (the "last question" framing no longer applies — bank is asked early now, so reaching this branch only ever means an OLD link predating this redesign):

```tsx
    // The bank question is the one unanswered question that must NOT bounce a
    // reader out of their verdict -- reaching this branch means an old link
    // (predating this redesign, or the brief "ask last" design that preceded
    // it) carries every other answer but no bank. Sending it back into the
    // wizard to collect one it was never asked for would break the thing that
    // makes a verdict shareable. It gets the verdict, with the bank picker
    // sitting at the top via BankBox. Every other unanswered question is
    // still a real gap and still redirects.
    if (route.kind === "question" && route.question.id !== "bank") {
      redirect(withLang("/start" + carry, locale));
    }
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit && npx eslint app lib`
Expected: clean.

- [ ] **Step 5: Manual verification against a running dev server**

```bash
npx next dev -p 3100 &
sleep 4
# Bank summary must NOT appear on the bank question itself...
curl -s "http://localhost:3100/start?begin=1&claiming=deposit-account" | grep -c "Your bank:"
# ...but must appear on the very next screen once bank is answered.
curl -s "http://localhost:3100/start?begin=1&claiming=deposit-account&bank=sbi" | grep -o "Your bank: State Bank of India"
# A named bank must skip Q7 (bankType) entirely.
curl -s "http://localhost:3100/start?begin=1&claiming=deposit-account&bank=sbi&nominee=no&court=no&heirs=agree&will=no" | grep -o "How much money is held at this bank in total?"
# "other" must show the unverified line, not a bank name.
curl -s "http://localhost:3100/start?begin=1&claiming=deposit-account&bank=other" | grep -o "We hold no verified policy for this bank."
# Old-shape verdict URL (answers, no bank) must still show the BankBox picker, not redirect.
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3100/no-nominee/under-threshold?claiming=deposit-account&nominee=no&court=no&heirs=agree&will=no&bankType=commercial&amount=under"
kill %1
```

Expected: first command prints `0`; second, third, and fourth each print their matched string; fifth prints `200`.

- [ ] **Step 6: Full regression pass**

Run: `node --test tests/ && npx tsc --noEmit && npx eslint app lib`
Expected: all pass.

Run, spot-checking every outcome route still 200 in every locale:

```bash
npx next dev -p 3100 &
sleep 4
for path in /nominee /survivorship /unknown-nominee /no-nominee/under-threshold /no-nominee/over-threshold /dispute /already-in-court /out-of-scope /start /start/started /start/find /start/find/where; do
  for lang in en hi kn; do
    code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3100$path?lang=$lang")
    echo "$path?lang=$lang -> $code"
  done
done
kill %1
```

Expected: every line ends `-> 200`.

- [ ] **Step 7: Commit**

```bash
git add app/start/page.tsx app/_components/outcome.tsx
git commit -m "Show the bank's policy on every wizard screen from Q2 onward

BankSummary (Task 6) renders collapsed between Back and the question
heading once bank is answered -- never on the bank question screen
itself. 'change' clears bank and lands back on that question via the
same URL-parameter trick every other answer already uses.

Fixes the two remaining BANK_QUESTION references (removed in Task 1) to
the literal string 'bank'. outcome.tsx's redirect-skip logic is
unchanged in behaviour -- it now only ever fires for a link predating
this redesign, since a normal journey answers bank at Q2.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01S1dgu8GoUYSRZbJDZGggRN"
```

---

## Final Verification (after all 7 tasks)

- [ ] Run the full suite once more: `node --test tests/ && npx tsc --noEmit && npx eslint app lib`
- [ ] `git log --oneline -7` shows all seven commits in order
- [ ] `git push origin master`
- [ ] Spot-check the live site 24–48h after deploy: `/api/metrics`-style sanity is not needed here, but re-open `/start?begin=1` and walk one full journey by hand (nominee path and no-nominee path) to confirm the collapsed bank line appears, expands, and "change" works end to end — the thing no automated test can see, which is how it actually feels to use.
