# Adhikaar — Claim Journey Rebuild

**Date:** 7 September 2026
**Status:** Design agreed, pending review. No implementation started.
**Replaces:** the single seven-question wizard at `/start`

---

## 1. The change in one line

The journey stops walking the RBI's decision tree in the RBI's order, and starts at the reader's own situation.

| | Today | After |
|---|---|---|
| Entry | One wizard, one question order, everyone | Five situations, five destinations |
| First question | "Is this money in a bank account or deposit?" | "What best describes your situation?" |
| Question order | The order the law needs facts in | Only what this reader can actually answer |
| Not knowing | Ends the journey at `needs-review` | Produces a sheet of what to go and ask |
| Reachable outcomes | 5 of 8 outcome pages | All 8, plus one new flow |

---

## 2. Why — the evidence

### 2.1 The current flow, measured

Every branch of `resolve()` was walked exhaustively (23 distinct paths, no more).

| Destination | Paths | Share |
|---|---|---|
| `needs-review` | 14 | **61%** |
| `under-threshold` | 2 | 9% |
| `over-threshold` | 2 | 9% |
| `nominee` | 1 | 4% |
| `survivorship` | 1 | 4% |
| `dispute` | 1 | 4% |
| `unknown-nominee` | 1 | 4% |
| `out-of-scope` | 1 | 4% |

The single likeliest destination is the one that answers nothing. The product asks up to seven questions and most often replies "we cannot tell you yet."

### 2.2 Three structural faults

1. **Every "I don't know yet" is a dead end.** On Q3 court, Q4 will, Q5 heirs, Q6 bank type and Q7 amount, that answer routes to `needs-review`. Five consecutive questions where the commonest honest answer from a bereaved reader terminates the journey.

2. **The no-nominee reader must pass a five-question gauntlet cleanly** — no court order, no will, heirs agree, bank type known, amount known — to reach a real verdict. 10 of the 15 no-nominee paths (67%) end in review.

3. **The questions ask for facts the reader does not hold.** Nominee registration is the *bank's* record. "Is there a court order restraining payment?" is a legal test, not an observation. "Does everyone entitled to inherit agree?" asks for a prediction about family behaviour, usually premature.

### 2.3 Two orphaned surfaces

| Surface | State |
|---|---|
| Scenario picker (`ScenarioPicker` in `app/start/page.tsx`) | Gated behind `?cards=1`. That string appears **once** in the codebase — in a comment. Nothing links to it. Unreachable. |
| `/already-in-court` | Fully written, live at its URL, counted in the Honest-Exit guardrail. `resolve()` cannot return it. Its only doors were three scenario cards. Unreachable. |

### 2.4 What the research says

From `Research Log.md` §11 (n=2, received 3 Sep 2026):

- **R2, verbatim:** *"There is no standard process." "They are not given any set of documents to be brought." "No website that can give them a list."*
- R2 is two years in, in district court, still unsettled. The design assumed a person at the *start*. There are two populations at different stages and the product serves one.
- **The aggregate rule decides R2's case** and exists today only as a sentence of help text under Q7. Para 10 is explicit: *"the aggregate amount payable, including accrued interest, as on the date of the application"*.

---

## 3. The opening screen

One screen, five options. Each is a fact the reader knows happened, not a judgement about which stage they are in.

```
What best describes your situation?

  1  We haven't been to the bank yet
     Or we've been told what to expect, but haven't asked them

  2  We've been to the bank and it's going normally
     They took the claim; we want to know what comes next

  3  The bank asked for something we don't understand
     A succession certificate, an indemnity bond, a surety, a list of documents

  4  The bank refused, or has gone quiet
     No answer, repeated visits, or a flat refusal

  5  We don't know if there's even an account
     Looking for money we think exists somewhere
```

### 3.1 Why these five and not others

Rejected: *"I have not started the claim"* alongside *"I don't know where to begin"* — the same person, forced to choose. Merged into option 1.

Rejected: *"I've already started the claim"* as a sixth option — it is the parent of options 2, 3 and 4, not their sibling. Keeping it would make every already-started reader choose between a general option and a specific one that both apply.

The test each option must pass: **the reader knows the answer without judging anything.** "Did the bank ask you for something you didn't understand" is a memory. "Are you in the claim process" is an opinion.

### 3.2 Routing

| Option | Branch | Destination | Build |
|---|---|---|---|
| 1 | A — Not yet at the bank | The counter sheet | **New** |
| 2 | B — In progress | Conditional determination | Mostly exists |
| 3 | C — Asked for something | `/what-were-you-asked-for` + rebuttal | Exists |
| 4 | D — Refused or quiet | `/bank-refused` | Exists |
| 5 | E — Discovery | UDGAM route | **New** |

---

## 4. Branch A — "We haven't been to the bank yet"

### 4.1 The premise

This reader cannot answer a nominee question. That fact is in the bank's records and they have not asked. Any flow that opens by asking it produces a guess, and a guess produces a wrong verdict carried to a counter.

So branch A does not attempt a verdict. **Its output is the sheet R2 said does not exist anywhere.**

### 4.2 Questions (2)

| # | Question | Options | Purpose |
|---|---|---|---|
| 1 | Was your name on the account with theirs? | Joint account / Only theirs / Don't know | Survivorship is the one route the reader *can* know without the bank |
| 2 | Roughly how much is at this bank, all accounts added together? | Under ₹5 lakh / ₹5–15 lakh / Over ₹15 lakh / No idea | Carries the aggregate rule in the question itself, not help text |

Both accept "don't know" without penalty. Neither gates the output.

### 4.3 Output — the counter sheet

Three parts, all printable:

1. **Ask the bank, in writing** — the three questions whose answers unlock the verdict:
   - Was a nominee registered on this account, and who?
   - Is the account under any court order restraining payment? (para 8(ii))
   - What is the total across all their accounts here, including accrued interest? (para 10)

2. **What they may not demand** — para 9 verbatim, with the standing rule that it is quoted only for the nominee/survivor case.

3. **Both document lists** — para 9 route and para 10(a) route, side by side, so the reader is prepared whichever answer comes back.

Plus a resume link: *"I know more now →"* re-enters the reader as branch B.

### 4.4 Why this counts as success

Adhikaar's North Star (`2026-09-06-north-star-metric-design.md` §1) defines a claim-ready journey as reaching **either** a resolved claim route **or** a resolved information gap. Branch A produces the second, deliberately. This is the definition being used as designed, not stretched.

**Stated honestly:** this will raise Weekly Claim-Ready Journeys, because journeys that today end at `needs-review` will end at a real sheet instead. That is a genuine improvement in delivered value, but the metric movement must not be reported as if the funnel improved on its own. The Honest-Exit Rate guardrail is unaffected — branch A never converts an unwelcome verdict into a welcome one.

---

## 5. Branch B — "We've been to the bank and it's going normally"

### 5.1 The premise

This reader has been told things. They can often answer the nominee question, and a verdict is reachable.

### 5.2 Questions

Shortest path first, with every answer conditional rather than gated.

| # | Question | Asked when | Notes |
|---|---|---|---|
| 1 | Was anyone named in the bank's records to receive this money? | always | Registered nominee / Joint holder survives / No one / **Don't know** |
| 2 | Roughly how much, all accounts at this bank added together? | no one was named | A nominee resolves under para 9 at any amount, so this is never asked of them |
| 3 | What kind of bank? | the total is between ₹5 and ₹15 lakh, or exactly on either | Below ₹5 lakh is under-threshold for both bank types; above ₹15 lakh is over for both. Most readers never see it. |
| 4 | Did they leave a will? | no one was named | Irrelevant to a nominee — para 9 pays irrespective. Only para 10(a)'s heirs route is affected. |
| 5 | Is anyone contesting who should receive this money? | no one was named | Reworded from "does everyone entitled to inherit agree" — a memory, not a prediction. "Too early to say" is a real answer. |

**Path lengths:** registered nominee or surviving joint holder → **1 question**. No nominee → **4–5**. Today those are 3 and 7.

Questions 4 and 5 exist because para 10's simplified procedure is granted *"provided…"* — its provisos are real preconditions, not optional colour. They are asked only of the readers they bind.

Court restraint is **not asked as a question.** It rides on the verdict as a stated condition and is captured by the control in §7.1 — para 8(ii) is a condition on payment, not a fact this reader can verify in advance.

Unknown answers to 4 and 5 do not terminate: they hold the verdict conditional in the same way court restraint does, and join the sheet's written questions for the bank.

### 5.3 "Don't know" on question 1

Does not end the journey. Produces both routes, stated as conditions, plus the single thing to go and confirm — the same shape as branch A's sheet, reached from a different door.

### 5.4 Threshold boundaries

Para 10 says *"less than the threshold limit"*, not "up to". Equality is therefore not below. The amount bands must preserve this:

| Band | Commercial (₹15L) | Co-operative (₹5L) |
|---|---|---|
| Less than ₹5 lakh | under | under |
| Exactly ₹5 lakh | under | **equal — confirm** |
| ₹5–15 lakh | under | over |
| Exactly ₹15 lakh | **equal — confirm** | over |
| More than ₹15 lakh | over | over |

Bank type is required for every row except the first and last.

---

## 6. Branches C, D, E

### 6.1 C — "The bank asked for something we don't understand"

No determination. The job is to check what the reader was told against what the Directions permit.

- Entry lists the things banks actually ask for: succession certificate, letter of administration, probate, indemnity bond, third-party surety, legal heir certificate, "a list we were given", "nothing was written down".
- Succession certificate / letter of administration / probate / indemnity / surety → the para 9 rebuttal **if** nominee or survivor, else para 10(a)'s closed list and the no-surety rule.
- Destination `/what-were-you-asked-for` already exists and receives this.
- This branch needs the nominee fact to answer correctly, so it asks question 1 of branch B and nothing else.

### 6.2 D — "The bank refused, or has gone quiet"

No determination at all. Escalation content only: the 15-day settlement expectation, the compensation clause (para 31 — Bank Rate + 4%), the internal escalation ladder, and RB-IOS 2026 with the CRPC address. `/bank-refused` exists.

### 6.3 E — "We don't know if there's even an account"

The only branch with nothing behind it. Scope for this build:

- Points at UDGAM (`udgam.rbi.org.in`), the Common Landing Portal and IEPF.
- States plainly, on the page, that **Adhikaar runs no search** and holds no index — the standing rule from `/discovery`'s header comment.
- Ends by handing the reader back to option 1 once an account is found.

Explicitly **not** in scope: the `/discovery` landing-page repositioning, which is a separate unlinked experiment and a different question from the claim journey.

---

## 7. Conditional verdicts

Agreed model: a verdict may be given before every fact is known, **provided its condition is stated with it and visibly unresolved.**

```
If no court order is stopping payment, the bank must settle on
para 9 — no succession certificate, at any amount.

⚠ One thing left to confirm: is a court order stopping payment?
```

Rules:

1. A claim is never stated flatly while a condition on it is open.
2. The condition names the paragraph it comes from (8(ii) for restraint).
3. Resolving a condition is always offered as an action, never left implicit.
4. No conditional verdict may be printed without its condition on the printed sheet.

Rule 4 matters most: the printed sheet is the artefact that reaches a bank counter, and a condition dropped in printing is exactly the failure the whole product exists to prevent.

### 7.1 The condition is where the court question moved to

Branch B does not ask about court restraint as a gating question (§5.2), but the fact still has to be capturable — otherwise the restraint page below is unreachable, which is precisely the fault this rebuild exists to fix (§2.3).

The condition itself is the control:

```
⚠ One thing left to confirm: is a court order stopping payment?
   [ No, none that we know of ]   [ Yes, there is ]   [ We don't know ]
```

| Answer | Result |
|---|---|
| No | The condition closes. The verdict is restated flatly and becomes printable without it. |
| Yes | Routes to the restraint page (§8) |
| Don't know | Condition stays open. The verdict remains conditional, and "ask the bank whether it knows of any order" joins the sheet's written questions. |

So the court fact is still collected — after a verdict rather than before one, and phrased as confirming an answer the reader already has rather than as a test they must pass to receive one.

---

## 8. What happens to `needs-review`

Today one page absorbs 14 of 23 paths for four unrelated reasons. It splits:

| Reason | Becomes | Reached from |
|---|---|---|
| Court restraint | Its own page — para 8(ii), what a restraint means, take it to a lawyer | The condition control, §7.1 |
| A will exists | Probate route — what changes, what documents | Branch B, when a will is reported |
| Exactly at the threshold | Boundary confirmation — para 10 says "less than", so confirm the total with the bank | Branch B, the two "equal" rows in §5.4 |
| Plain uncertainty | The branch A sheet — what to go and find out | Any unresolved "don't know" |

`/needs-review` remains as a route for the first case and keeps its 308 from `/confirm-details`.

**Every row names what reaches it.** A destination with no named source is an orphan, and this product has shipped two of those already (§2.3).

---

## 9. Outcome pages

All eight existing outcome pages are kept at their current URLs. No content rewrite is in scope.

| Outcome | Path | Reachable today | After |
|---|---|---|---|
| `nominee` | `/nominee` | yes | yes |
| `survivorship` | `/survivorship` | yes | yes |
| `under-threshold` | `/no-nominee/under-threshold` | yes | yes |
| `over-threshold` | `/no-nominee/over-threshold` | yes | yes |
| `unknown-nominee` | `/unknown-nominee` | yes | yes |
| `dispute` | `/dispute` | yes | yes — from branch B question 5 |
| `out-of-scope` | `/out-of-scope` | yes | yes |
| `already-in-court` | `/already-in-court` | **no** | **no — see §12** |

---

## 10. URLs and migration

- The opening screen is `/start`. Each branch is its own route: `/start/new`, `/start/progress`, `/start/asked`, `/start/refused`, `/start/find`.
- Answers stay in the query string. The URL remains the whole state; nothing is stored.
- **Existing links must not break.** `/start?claiming=…&nominee=…` links are in bookmarks and messages. A bare `/start` with wizard answers present routes into branch B at the matching point rather than showing the opening screen.
- `RETIRED_VALUES` in `lib/wizard.ts` is the existing mechanism for this and extends to any option this rebuild retires. Retiring an option means moving its value there, never deleting it.

---

## 11. Analytics

| Event | Change |
|---|---|
| `flow_started` | Gains a `branch` property (a–e). Without it the funnel cannot be read per branch. |
| `question_answered` | Unchanged shape; `step` becomes branch-relative |
| `actionable_result_viewed` | Now also fires for branch A's sheet — this is the NSM, see §4.4 |
| `outcome_reached` | Unchanged |
| Honest-Exit outcome set | Remove `already-in-court` while it stays unreachable (§12), or the guardrail counts an impossible event |

No new personal data. No URL is transmitted; the existing `lib/analytics.ts` guarantees hold unchanged.

---

## 12. Explicitly out of scope

| Item | Decision |
|---|---|
| An "already in court" door | **Cut, by decision on 7 Sep.** `/already-in-court` stays built and unreachable. Its removal from the Honest-Exit set (§11) is the only related change. |
| The document-list door as a top-level entry | Folded into branch C rather than given its own option |
| `/discovery` landing repositioning | Separate experiment, untouched |
| Rewriting outcome page content | Out — routing and entry only |
| Hindi/Kannada review by a native speaker | Still outstanding across the product; this rebuild adds strings that inherit the same caveat |

---

## 13. Risks

| Risk | Mitigation |
|---|---|
| A conditional verdict is printed without its condition | Rule 4 in §7; a test asserting the printed sheet carries every open condition |
| Five options is too many for a bereaved reader on a phone | Each has a one-line description; they are mutually exclusive by construction (§3.1) |
| Branch A raises the NSM and looks like a funnel win | Stated in §4.4 and to be repeated wherever the number is reported |
| Retiring wizard options breaks shared links | `RETIRED_VALUES` (§10), with the existing test asserting through `parseAnswers` |
| Branch E overstates what Adhikaar does | The page states it runs no search; "Start your search" wording is not reused |

---

## 14. Phasing

Each phase leaves the product shippable. No phase depends on a later one.

| Phase | Contents | Why this order |
|---|---|---|
| 1 | Opening screen; branches C and D wired to the pages that already exist | Highest value per unit of work — three built pages get a front door, and two of them have never had one |
| 2 | Branch B: the shortened question set and conditional verdicts | The determination engine; changes `resolve()` and is the riskiest legal surface |
| 3 | Branch A: the counter sheet | Depends on phase 2's route logic to state both branches correctly |
| 4 | `needs-review` split (§8) | Needs phases 2 and 3 to have named sources for each destination |
| 5 | Branch E: discovery | Independent of everything above; gated on open question 1 |

Phase 1 alone fixes the orphaned scenario picker and gives `/what-were-you-asked-for` and `/bank-refused` real entry points, without touching `resolve()`.

---

## 15. Open questions

1. **Branch E has no research behind it.** n=2 covers claiming, not finding. Worth one interview before building, or shipping it as a links page rather than a journey.
2. **Does branch C need the amount question?** Para 10(a)'s no-surety rule is threshold-dependent, so a surety demand above the threshold may be legitimate. Needs resolving before that branch is written.
3. **Branch B question 1 wording** is inherited from the current Q2 and has not been re-tested against a reader who has been to the bank but was told nothing useful.
