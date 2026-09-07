# Adhikaar — Bank Question Moves Earlier, Plus Wording & Redundancy Fixes

**Date:** 7 September 2026
**Status:** Design agreed (expanded in a second round the same evening). Not yet implemented.
**Replaces:** the "ask bank last" design shipped in commit `9fce739` the same day, superseding it entirely rather than layering on top of it.

---

## 1. Motivation

Commit `9fce739` added a "which bank" question, deliberately asked LAST — after `resolve()` had already decided the outcome — on the reasoning that the bank "changes the evidence, never the verdict." That reasoning still holds and is not being revisited here.

What changed: the product should feel like it is personalising the experience *as the reader answers*, not only at the very end. Direct request, 7 Sep 2026 afternoon: "personalisation should start earlier" — specifically, both (a) ask which bank sooner, and (b) start surfacing that bank's own information alongside the remaining questions, rather than holding everything back for the final verdict screen.

A second option was designed and shown to the user (a provisional "here's where this looks headed" preview of the legal verdict, updating as each question is answered) and explicitly rejected after a concrete walkthrough showed its failure mode: a preview that states something concrete, then retracts it two questions later, reads as the product being wrong rather than the product still gathering facts. Adhikaar's whole discipline — nulls render as honest gaps, never guesses; `lib/banks.ts`'s "every field is either read from that bank's own page or it is null, no inference" — rules this out. **This spec is the honesty-preserving option (Approach A).**

A second round of feedback the same evening, after the user reviewed the full question tree as a diagram, raised several further points — a real redundancy (Q7 duplicates what Q2 already establishes for 8 of 9 answers), two wording concerns, and one navigation simplification. §2.8–§2.12 record those, each reached only after flagging the concerns they raised (two of which touched a legal safety gate and a privacy-model decision) and getting an explicit choice back.

## 2. What this changes

### 2.1 Question order

`QUESTION_ORDER` in `lib/wizard.ts` changes from:

```
["claiming", "nominee", "court", "heirs", "will", "bankType", "amount"]
```

to:

```
["claiming", "bank", "nominee", "court", "heirs", "will", "bankType", "amount"]
```

Bank sits immediately after `claiming` — the earliest point common to every branch, since which bank the money is at does not depend on any later answer. Both the short nominee/survivorship path and the long no-nominee path share this same prefix (`claiming`, `bank`, `nominee`, `court`, `heirs`) before diverging, exactly as they already share `claiming → nominee → court → heirs` today.

**`bankType` (§2.8) and `amount` stay exactly where they are relative to each other** — amount is NOT pulled forward to sit near bank. It was considered and explicitly rejected: amount is legally irrelevant to a nominee or survivorship claim (para 9 pays "at any amount"), so asking it right after Q2 would put an irrelevant question in front of every nominee-path reader, which is the exact problem this wizard's whole restructuring exists to avoid. Amount is asked only where it always was — on the no-nominee path, after `will`.

### 2.2 `resolve()`

The `9fce739` design gated bank-asking inside `done()`, with special cases for out-of-scope and stated-cooperative claims. That gate moves to the top of `resolve()`, immediately after the claiming check:

```
if (!a.claiming) return ask("claiming");
if (claiming is not a deposit type) return done("out-of-scope");
if (!a.bank) return ask("bank");
... existing logic, unchanged from here down ...
```

**The cooperative-bank special case is dropped entirely.** Under the old "ask last" design, a stated cooperative bank skipped the bank question because our table holds only commercial banks. Under this design, bank is asked before `bankType` is even known, so that skip is no longer possible to compute — and is no longer necessary: a cooperative-bank claimant simply will not find their bank in the list of 8 and picks "another bank / not sure," landing on exactly the same "no verified policy, RBI rules apply" state a skip would have produced. One fewer special case, same outcome.

**Every rule below `resolve()`'s bank gate is unchanged except §2.8's `bankType` skip.** The court-restriction gate, the heirs-before-nominee-shortcircuit ordering, the will/amount branches — none of this moves or changes.

### 2.3 `lib/wizard.ts` internals simplify

Because bank becomes a genuine, contiguous member of `QUESTION_ORDER` instead of a question that sits outside it, the special-casing added in `9fce739` is removed rather than extended:

- `BANK_QUESTION` constant and the separate `ALL_QUESTION_IDS` array: **removed**. `QUESTION_ORDER` alone is authoritative again.
- `TOTAL_QUESTIONS = QUESTION_ORDER.length`: reverts to the simple form.
- `parseAnswers`, `toQuery`: iterate `QUESTION_ORDER` again, no `ALL_QUESTION_IDS` needed.
- `answerQuestion`'s bank-specific branch: **removed**. Bank now follows the same rule as every other question — changing an earlier answer invalidates answers that came after it in `QUESTION_ORDER`.
- `previousAnswers`'s bank special case: **removed**. Back from the bank question behaves like Back from any other question.

Net effect: this change removes more special-case code than it adds.

### 2.4 The bank question itself

Content unchanged from `9fce739` — same 9 options (8 banks + "another bank / not sure"), same compact 2-column chip layout. One `help`-text wording change, since the framing shifts from "this is the last thing we ask" to "this is the second thing we ask":

> Old: "This does not change your result. It adds what your own bank has already published..."
> New: "This does not change your result — it only means we can show you your bank's own published policy alongside the questions that follow."

### 2.5 What shows on the remaining question screens

Once bank is answered, every subsequent question screen (`app/start/page.tsx`) gains a compact, collapsed summary line between the Back link and the question heading:

```
[← Back]
Your bank: SBI · change
─────────────────────────
Does everyone entitled to inherit
agree?
[option]  [option]  [option]
```

"Your bank: SBI" is a `<details>` disclosure — collapsed by default, expandable to show the same plain-language policy sentences `BankBox` already renders on the verdict page. "· change" re-opens the bank picker inline.

**Nothing here is provisional.** The bank's policy is a fact about the bank, true independent of how the remaining questions get answered — it is not a preview of the verdict. No other progressive content is added. Documents, the RBI clause, the "what to do today" card all stay on the final verdict page only.

### 2.6 Verdict page

`BankBox` unchanged in behaviour. By the time a normal journey reaches the verdict, bank will already be answered, so the box renders its policy summary immediately. The picker fallback stays for old bookmarked links carrying answers but no `bank`.

### 2.7 Compatibility

- **URL shape is unchanged.** `bank` was already an ordinary query parameter under `9fce739`.
- **Analytics.** No code changes needed — `question_answered` for `bank` now fires at step 2 instead of step 8, which is the intended, correct reflection of the new order.
- **Progress counter.** Untouched; `TOTAL_QUESTIONS` stays `QUESTION_ORDER.length` (8).

### 2.8 `bankType` (Q7) becomes conditional — new, second round

Confirmed by re-reading `lib/banks.ts`: all 8 banks in the table are `type: "commercial"`. So the instant a reader picks a named bank at Q2, `bankType` is already known with certainty — asking Q7 again is pure redundancy for 8 of the 9 possible Q2 answers.

**Fix:** `bankType` is asked only when `a.bank === "other"`. Otherwise it is treated as `"commercial"` without ever asking — implemented as a small helper, `effectiveBankType(a)`, used everywhere `bankType` currently gets read (the `resolve()` gate, and `questionFor`'s amount-threshold-label lookup):

```
function effectiveBankType(a: Answers): Answers["bankType"] {
  return a.bankType ?? (a.bank && a.bank !== "other" ? "commercial" : undefined);
}
```

This is additive logic only — `resolve()`'s branch on `bankType === "cooperative"` (used only to pick the ₹5L vs ₹15L threshold label) is otherwise unchanged, it just now also accepts an inferred value. A reader who picked "another bank / not sure" at Q2 still gets asked Q7 normally, exactly as today.

### 2.9 Wording changes — new, second round

Three prompts get reworded for clarity. **No option values, no branching, no outcome changes** — every one of these is copy-only.

**Q1 (`claiming`).** Prompt changes from "Is this money in a bank account or deposit?" to **"The claim is for which of the following?"**. First option's label drops its now-redundant "Yes —" prefix: **"A bank account, a deposit, or both"** (detail unchanged: "Savings, current, term or recurring."). Second option unchanged: "Something else, or I'm not sure" — already carries bracketed examples in its detail text ("A locker, pension, insurance, provident fund, shares — or you don't know yet."), which is the pattern §2.11 confirms rather than adding a text box.

**Q3 (`nominee`).** The user's own draft used "registered claimant" — flagged and NOT used: in this product "claimant" already means the person filing the claim (the reader), so reusing it for the nominee (who receives the money, not who's claiming it) risks a reader answering about themselves. Prompt changes from "Was someone named in the bank records to receive the money?" to **"Is there a registered nominee for this account?"** — plainer, keeps the legally correct term. Options and their values are unchanged.

**Q4 (`court`).** The user's draft ("did you submit any documents to the court or the bank?") was flagged as a different question entirely — the current Q4 is a legal safety gate (RBI para 8(ii): a bank cannot pay if it knows of a restraining order, even to a valid nominee) and that check must not be lost. Confirmed with the user: keep the safety check exactly as-is, reword only for clarity, addressing the actual concern raised ("may or may not have reached the court stage — rephrase it"). Prompt changes to **"Is there a court order currently stopping the bank from paying this money?"**, help text to **"This is different from simply having a court case about the money — only an order that specifically stops payment counts here. If you're not sure, ask the bank whether it knows of one."**, and the "no" option's label changes to **"No — there's no such order (whether or not there's a case)"**, so a reader with some unrelated court matter isn't left unsure which box to tick. The three underlying values (`no`/`yes`/`unknown`) and every downstream branch are byte-for-byte unchanged.

### 2.10 No free-text input anywhere — new, second round

A "please specify" text box was proposed for the "something else" answers and explicitly declined: this product currently stores zero free text (every answer is a fixed enum, deliberately, so nothing identifying is ever typed in). Confirmed resolution: **no input field, anywhere.** Where an option needs disambiguating, its `detail` text carries bracketed examples instead — the pattern Q1's "other" option already uses. No other question currently needs this treatment added.

### 2.11 Opening screen: heading and one route simplified — new, second round

Two small changes to `/start` (`SituationPicker`, shipped in `aef283a`):

- **Heading** changes from "My Claim Journey" to **"My Claim Process"**, per the user's own wording in the second-round message. Low-risk, copy-only.
- **"I do not know from where to start"** now routes **directly to `/start/find/where`** (the UDGAM/branch-search page) instead of `/start/find`. This was reached after the user's redraft of `/start/find`'s content turned out to just restate Q1 rather than address "I don't know where the money is" — the actual problem that option names. `/start/find/where` already exists and already serves exactly that reader. `/start/find` (the two-way "do you know the bank / don't know where it is" fork) becomes unreachable from the opening screen as a result — it still exists at its URL and still works if visited directly, it simply has no remaining inbound link from `/start`. This is accepted, not a gap: the fork it offered is now resolved one level up, by the opening screen's own five options.

## 3. What this spec explicitly does NOT do

- Does not add any preview or "so far, this looks like" content (Approach B, rejected in round one).
- Does not add a free-text field anywhere (proposed and declined in round two — §2.10).
- Does not move `amount` earlier than the no-nominee path already puts it (proposed and declined — §2.1's note).
- Does not touch the court-restraint safety check's actual logic, only its wording (§2.9).
- Does not change any outcome, any RBI clause, any document list, or any branch of the legal logic.
- Does not change `/bank-refused` or `/what-were-you-asked-for`.

## 4. Testing plan

- Walk every `resolve()` branch by hand with bank answered at the new position, confirming no verdict changed.
- Confirm a stated-cooperative-bank journey (Q2 = "other") still reaches Q7 normally; confirm all 8 named-bank journeys skip Q7 and still compute the correct amount-threshold label via `effectiveBankType`.
- Confirm Back from `nominee` now lands on `bank` (previously `claiming`); confirm Back from `amount` still lands on `will` when Q7 was skipped.
- Confirm old-shape verdict URLs (answers only, no `bank`) still 200 and still show the bank picker.
- Confirm `/start/find` still 200 when visited directly, despite having no inbound link from `/start`.
- Confirm the three reworded prompts (Q1, Q3, Q4) render correctly in en/hi/kn and that Q4's three option VALUES are unchanged from before the reword.
- `tsc`/`eslint` clean; all outcome routes 200 in en/hi/kn.

## 5. Files touched

`lib/wizard.ts` (question order, `resolve()`, `effectiveBankType`, three reworded prompts, remove `9fce739`'s special-casing), `lib/i18n-home.ts` (bank question help text, en/hi/kn), `lib/i18n-situations.ts` (opening-screen heading, `dontKnow` href target — href lives in `app/start/page.tsx` not the dictionary, heading text does), `app/start/page.tsx` (collapsed bank summary on Q3–Q8, `dontKnow`'s href change to `/start/find/where`), `app/_components/bank-panel.tsx` (possible small extraction for the collapsed-summary rendering, decided during implementation).
