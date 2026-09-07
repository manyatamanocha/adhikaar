# Adhikaar — Bank Question Moves Earlier

**Date:** 7 September 2026
**Status:** Design agreed. Not yet implemented.
**Replaces:** the "ask bank last" design shipped in commit `9fce739` the same day, superseding it entirely rather than layering on top of it.

---

## 1. Motivation

Commit `9fce739` added a "which bank" question, deliberately asked LAST — after `resolve()` had already decided the outcome — on the reasoning that the bank "changes the evidence, never the verdict." That reasoning still holds and is not being revisited here.

What changed: the product should feel like it is personalising the experience *as the reader answers*, not only at the very end. Direct request, 7 Sep 2026 afternoon: "personalisation should start earlier" — specifically, both (a) ask which bank sooner, and (b) start surfacing that bank's own information alongside the remaining questions, rather than holding everything back for the final verdict screen.

A second option was designed and shown to the user (a provisional "here's where this looks headed" preview of the legal verdict, updating as each question is answered) and explicitly rejected after a concrete walkthrough showed its failure mode: a preview that states something concrete, then retracts it two questions later, reads as the product being wrong rather than the product still gathering facts. Adhikaar's whole discipline — nulls render as honest gaps, never guesses; `lib/banks.ts`'s "every field is either read from that bank's own page or it is null, no inference" — rules this out. **This spec is the honesty-preserving option (Approach A).**

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

### 2.2 `resolve()`

The `9fce739` design gated bank-asking inside `done()`, with special cases for out-of-scope and stated-cooperative claims. That gate moves to the top of `resolve()`, immediately after the claiming check:

```
if (!a.claiming) return ask("claiming");
if (claiming is not a deposit type) return done("out-of-scope");
if (!a.bank) return ask("bank");
... existing logic, unchanged from here down ...
```

**The cooperative-bank special case is dropped entirely.** Under the old "ask last" design, a stated cooperative bank skipped the bank question because our table holds only commercial banks. Under this design, bank is asked before `bankType` is even known, so that skip is no longer possible to compute — and is no longer necessary: a cooperative-bank claimant simply will not find their bank in the list of 8 and picks "another bank / not sure," landing on exactly the same "no verified policy, RBI rules apply" state a skip would have produced. One fewer special case, same outcome.

**Every rule below `resolve()`'s bank gate is unchanged.** The court-restriction gate, the heirs-before-nominee-shortcircuit ordering, the will/bankType/amount branches — none of this moves or changes. This is purely an insertion, not a restructuring of the legal logic.

### 2.3 `lib/wizard.ts` internals simplify

Because bank becomes a genuine, contiguous member of `QUESTION_ORDER` instead of a question that sits outside it, the special-casing added in `9fce739` is removed rather than extended:

- `BANK_QUESTION` constant and the separate `ALL_QUESTION_IDS` array: **removed**. `QUESTION_ORDER` alone is authoritative again, as it was before `9fce739` and as `answeredPrefix()`'s contiguous-prefix logic already assumes.
- `TOTAL_QUESTIONS = QUESTION_ORDER.length`: reverts to the simple form (now `8`, since `QUESTION_ORDER` itself grew by one).
- `parseAnswers`, `toQuery`: iterate `QUESTION_ORDER` again, no `ALL_QUESTION_IDS` needed.
- `answerQuestion`'s bank-specific branch (the one that let re-picking a bank survive every other answered field): **removed**. Bank now follows the same rule as every other question — changing an earlier answer invalidates answers that came after it in `QUESTION_ORDER`. Concretely: changing `claiming` invalidates the bank pick (correct — a different claim type might be out of scope entirely); changing `bank` invalidates nothing after it that isn't already re-askable the normal way, since bank has no downstream dependents.
- `previousAnswers`'s bank special case: **removed**. Back from the bank question behaves like Back from any other question — deletes the last contiguous answer.

Net effect: this change removes more special-case code than it adds. The wizard's general machinery, written for a linear `QUESTION_ORDER`, goes back to handling every question uniformly.

### 2.4 The bank question itself

Content unchanged from `9fce739` — same 9 options (8 banks + "another bank / not sure"), same compact 2-column chip layout instead of the full detail-card layout the other questions use. One wording change to the `help` text, since the framing shifts from "this is the last thing we ask" to "this is the second thing we ask":

> Old: "This does not change your result. It adds what your own bank has already published..."
> New: "This does not change your result — it only means we can show you your bank's own published policy alongside the questions that follow."

### 2.5 What shows on the remaining question screens (Q3–Q8)

Once bank is answered, every subsequent question screen (`app/start/page.tsx`) gains a compact, collapsed summary line between the Back link and the question heading:

```
[← Back]
Your bank: SBI · change
─────────────────────────
Does everyone entitled to inherit
agree?
[option]  [option]  [option]
```

"Your bank: SBI" is a `<details>` disclosure — collapsed by default so it does not compete with the actual question, expandable to show the exact same plain-language policy sentences `BankBox` already renders on the verdict page (no surety needed under ₹15 lakh, claim-form names, etc.). "· change" re-opens the bank picker inline, using the same URL-parameter navigation trick every other answer uses (Back/Forward and bookmarking keep working).

**Nothing here is provisional.** The bank's policy is a fact about the bank, true independent of how the remaining questions get answered — it is not a preview of the verdict. This is the one deliberate exception carved out of the "no personalised information before the verdict" rule that governed the `9fce739` design, and it's safe specifically because it cannot be contradicted by a later answer the way a verdict preview could.

No other progressive content is added. Documents, the RBI clause, the "what to do today" card — all of these stay exactly where they are today, appearing only on the final verdict page once `resolve()` reaches a real outcome.

### 2.6 Verdict page

`app/_components/outcome.tsx`'s `BankBox` is unchanged in behaviour. By the time a normal journey reaches the verdict, bank will already be answered (it's now Q2), so the box renders its policy summary immediately rather than showing the picker. The picker fallback stays in place for the paths that can still reach a verdict without a bank answer:

- an old bookmarked/shared link from before this change, carrying answers but no `bank`
- a link shared mid-journey under the `9fce739` ordering, if any exist in the wild for the ~1 day that design was live

### 2.7 Compatibility

- **URL shape is unchanged.** `bank` was already an ordinary query parameter under `9fce739`; this change only moves WHEN it's asked, not its name or how it's carried. Every existing bookmarked verdict URL continues to work.
- **Analytics.** `branchFor()` and `answeredPrefix()`-based step tracking in `app/_components/analytics.tsx` need no changes — they already read `QUESTION_ORDER` generically. The one behavioural change: `question_answered` events for `bank` will now fire at step 2 instead of step 8 for journeys that answer it, which is the intended, correct reflection of the new order.
- **Progress counter.** `progressFor()`'s arithmetic is untouched; `TOTAL_QUESTIONS` is still `QUESTION_ORDER.length`, now 8, same as it was under `9fce739`'s `ALL_QUESTION_IDS.length`. No visible change to the progress bar's behaviour.

## 3. What this spec explicitly does NOT do

- Does not add any preview or "so far, this looks like" content (Approach B, rejected).
- Does not change any outcome, any RBI clause, any document list, or any branch of the legal logic below the bank gate.
- Does not change the verdict page's layout beyond what `9fce739` already shipped.
- Does not touch `/bank-refused`, `/what-were-you-asked-for`, or the opening `/start` situation picker (`aef283a`) — none of these read `QUESTION_ORDER` positionally in a way this reorder affects.

## 4. Testing plan

- Walk every `resolve()` branch by hand with bank answered at the new position (short nominee path, long no-nominee path, every "needs review" exit) to confirm no verdict changed.
- Confirm a stated-cooperative-bank journey now reaches "another bank / not sure" naturally rather than via a skip, and that it renders identically to today's skip-produced state.
- Confirm Back from every question screen still lands on the correct previous question, specifically Back from `nominee` (now lands on `bank`, previously landed on `claiming`).
- Confirm old-shape verdict URLs (answers only, no `bank`) still 200 and still show the bank picker.
- `tsc`/`eslint` clean; all outcome routes 200 in en/hi/kn.

## 5. Files touched

`lib/wizard.ts` (question order, `resolve()`, remove `9fce739`'s special-casing), `lib/i18n-home.ts` (bank question help text, en/hi/kn), `app/start/page.tsx` (collapsed bank summary on Q3–Q8, uses existing `BankBox`/plain-language content), `app/_components/bank-panel.tsx` (possible small extraction if the collapsed-summary rendering needs a shared component with the verdict page's box — decided during implementation, not a new design decision).
