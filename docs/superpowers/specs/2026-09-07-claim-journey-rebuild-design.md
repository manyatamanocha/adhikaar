# Adhikaar — Claim Journey Rebuild

**Date:** 7 September 2026
**Status:** Design agreed, pending review. No implementation started.
**Replaces:** the single seven-question wizard at `/start`

---

## 1. The change in one line

The journey stops walking the RBI's decision tree in the RBI's order, and starts at the reader's own situation.

> **Choose situation → ask only the relevant questions → give one clear next action.**

| | Today | After |
|---|---|---|
| Entry | One wizard, one question order, everyone | Five situations |
| First question | "Is this money in a bank account or deposit?" | "What best describes your situation?" |
| Question order | The order the law needs facts in | Only what this reader can answer |
| Not knowing | Ends the journey at `needs-review` | Produces exactly what to confirm with the bank |
| Someone already stuck | Walks the whole questionnaire again | Goes straight to their own problem |

### 1.1 The governing rule

**Never make a reader repeat the questionnaire unless the missing information changes the answer.**

Every branch below is a consequence of that rule. A person whose bank has demanded a succession certificate does not need to be asked about bank types and thresholds before being told the demand may be unlawful.

---

## 2. Why — the evidence

### 2.1 The current flow, measured

Every branch of `resolve()` was walked exhaustively — 23 distinct paths, no more.

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

The single likeliest destination is the one that answers nothing.

### 2.2 Three structural faults

1. **Every "I don't know yet" is a dead end.** On court, will, heirs, bank type and amount, that answer routes to `needs-review` — five consecutive questions where the commonest honest answer terminates the journey.
2. **The no-nominee reader must pass a five-question gauntlet cleanly.** 10 of the 15 no-nominee paths (67%) end in review.
3. **The questions ask for facts the reader does not hold.** Nominee registration is the bank's record. A restraining order is a legal test. Whether heirs agree is a prediction.

### 2.3 Two orphaned surfaces

| Surface | State |
|---|---|
| Scenario picker (`app/start/page.tsx`) | Gated behind `?cards=1`. That string appears once in the codebase — in a comment. Unreachable. |
| `/already-in-court` | Fully written, live, counted in the Honest-Exit guardrail. `resolve()` cannot return it. Unreachable. Fixed by branch 2.5 below. |

### 2.4 What the research says

From `Research Log.md` §11 (n=2, received 3 Sep 2026):

- **R2, verbatim:** *"There is no standard process." "They are not given any set of documents to be brought." "No website that can give them a list."*
- R2 is two years in, in district court, unsettled. The design assumed a person at the start. There are two populations and the product serves one.
- **The aggregate rule decides R2's case** and exists today only as help text. Para 10: *"the aggregate amount payable, including accrued interest, as on the date of the application"*.

---

## 3. The opening screen

```
What best describes your situation?

  1  I have not started the claim
  2  I've already started the claim
  3  The bank asked for something I don't understand
  4  The bank refused or delayed the claim
  5  I don't know where to begin
```

Options 3 and 4 also appear inside option 2. That redundancy is deliberate: option 2 serves a reader who identifies by **stage**, options 3 and 4 are express lanes for a reader who identifies by **problem**. Both reach the same content. A reader is never wrong, only slower by one screen.

---

## 4. Branch 1 — I have not started the claim

### 4.1 Questions

| # | Question | Options |
|---|---|---|
| 1 | Is this money in a bank account or deposit? | Yes — an account, a deposit, or both / Something else, or I'm not sure |
| 2 | Was there a nominee or surviving joint holder? | Registered nominee / Joint holder survives / No nominee / Not sure |
| 3 | Is there a court order stopping payment? | No / Yes / Not sure |

Question 1 stays two-option, per decision of 7 Sep (commit `8e36b3e`): nothing downstream distinguishes an account from a term deposit — `resolve()` checks only that the value is a deposit type, no verdict or printed sheet reads it, and analytics never sends it. Its only job is the out-of-scope exit for a locker, pension, insurance or PPF claim. Para 6(b) excludes PPF, SCSS, MSSC and SSA.

### 4.2 Then

| Answer to Q2 | Next |
|---|---|
| Registered nominee / joint holder survives | Nominee route and documents — para 9, unconditional at any amount |
| No nominee | Ask will, heir agreement, bank type and amount (§4.3) |
| Not sure | Show exactly what to confirm with the bank (§4.4) |

### 4.3 The no-nominee continuation

| # | Question | Asked when |
|---|---|---|
| 4 | Did they leave a will? | always on this path |
| 5 | Is anyone contesting who should receive this money? | always on this path |
| 6 | Roughly how much, all accounts at this bank added together? | always on this path |
| 7 | What kind of bank? | **only** when the total is between ₹5 and ₹15 lakh, or exactly on either |

Question 7 is conditional because below ₹5 lakh is under-threshold for both bank types and above ₹15 lakh is over for both. Most readers never see it.

Question 6 carries the aggregate rule in its own wording rather than in help text — the gap `Research Log.md` §11 identifies as decisive for R2.

Question 5 is reworded from "does everyone entitled to inherit agree" — a memory rather than a prediction. "Too early to say" is a real answer that holds the verdict conditional rather than ending it.

### 4.4 Threshold boundaries

Para 10 says *"less than the threshold limit"*, not "up to". Equality is not below.

| Total | Commercial (₹15L) | Co-operative (₹5L) |
|---|---|---|
| Less than ₹5 lakh | under | under |
| Exactly ₹5 lakh | under | **equal — confirm** |
| ₹5–15 lakh | under | over |
| Exactly ₹15 lakh | **equal — confirm** | over |
| More than ₹15 lakh | over | over |

### 4.5 The result page

Every result page in the product carries these six parts, in this order:

| Part | Content |
|---|---|
| Your likely route | Para 9 (nominee/survivor) or para 10(a) (no nominee), named plainly |
| Documents required | The closed list for that route |
| What the bank should not ask for | Succession certificate, letter of administration, probate, indemnity, third-party surety — as the route permits |
| RBI source | Clause quoted verbatim with its paragraph number, from `lib/rbi.ts` |
| What to say at the counter | Plain sentences the reader can read aloud |
| Print / download | The sheet, carrying every open condition (§6) |

**"Likely" is load-bearing.** Where a fact is still unconfirmed the route is stated as a condition, never as a settled fact.

---

## 5. Branch 2 — I've already started the claim

### 5.1 Where are you now?

```
  2.1  I have not submitted documents
  2.2  I submitted documents and am waiting
  2.3  The bank asked for extra documents
  2.4  The bank refused or delayed the claim
  2.5  I have started a court case
```

### 5.2 — Documents not submitted

Runs the minimum claim questions only: nominee or no nominee → court order → will and heir agreement → bank type and amount if required. Output is a personalised document checklist rather than a verdict page.

### 5.3 — Submitted and waiting

No determination. Four questions:

| Question | Purpose |
|---|---|
| When did the bank have all the documents it asked for? | Para 31's clock starts from receipt of **all** required documents, not from the first visit — see open question 3 |
| Did the bank give you an acknowledgement? | The single most useful piece of evidence |
| Which bank? | Pulls that bank's own published policy from `lib/banks.ts` |
| Have they given a written response? | Determines whether escalation is available yet |

Shows: expected settlement timeline; a follow-up message template; what evidence to keep; when to complain in writing.

### 5.4 — Bank asked for extra documents

Same destination as branch 3 (§6). Asks what was demanded, then answers it.

### 5.5 — Bank refused or delayed

Same destination as branch 4 (§7).

### 5.6 — Court case already started

Three questions:

| Question | Why |
|---|---|
| Is the case about this bank deposit? | Scope — an unrelated case does not engage the Directions |
| Was it started before or after the new RBI Directions? | The Directions came into force 31 Mar 2026. R2's ordeal began before, and nobody told them the ground had moved. |
| Is there currently a court order stopping payment? | Para 8(ii) |

Shows the relevant RBI rule and **a note to discuss with a lawyer**.

🔴 **Framing rule, non-negotiable:** *"take this clause to your lawyer and ask whether it changes your position"* — never "drop your case", and no promise that a case can be withdrawn or resolved automatically. Taken verbatim from `Research Log.md` §11's finding on R2.

This gives `/already-in-court` its first reachable door and reverses the earlier decision to leave it orphaned. `already-in-court` therefore **stays** in the Honest-Exit outcome set in `app/api/metrics/route.ts`.

---

## 6. Branch 3 — The bank asked for something I don't understand

Goes straight to *"What did the bank ask you for?"*

- Succession certificate
- Surety or bond
- Affidavit
- Genealogy / vanshavali
- Legal-heir certificate
- Other

Then shows: whether the request may be unnecessary for their route; the relevant RBI paragraph; what to ask the bank in writing; a printable counter note; an escalation option.

**This branch must not ask seven questions first.** It needs the nominee fact and nothing else — para 9 forbids these demands outright for a nominee or survivor, while para 10(a) prescribes a closed list and forbids third-party surety below the threshold. Where the nominee fact is unknown, both answers are given as conditions.

`/what-were-you-asked-for` already exists and receives this.

---

## 7. Branch 4 — The bank refused or delayed

Straight to escalation. Four questions only:

- What happened?
- Do you have it in writing?
- How long have you been waiting?
- Which bank is involved?

Then the complaint letter and the escalation ladder:

1. Ask for the refusal or delay in writing
2. Written complaint to the branch
3. The bank's grievance officer
4. RBI Ombudsman (RB-IOS 2026) if eligible
5. Keep all receipts, emails and acknowledgement numbers

Compensation for bank-attributable delay is para 31 — Bank Rate + 4%. `/bank-refused` already exists.

---

## 8. Branch 5 — I don't know where to begin

Two large choices, nothing else:

```
  I know the bank and found the deposit   →  branch 1
  I don't know where the money is         →  the official search route
```

The search route points at UDGAM (`udgam.rbi.org.in`), the Common Landing Portal and IEPF, and **states on the page that Adhikaar runs no search** and holds no index. Once a possible deposit is found, the reader is handed into branch 1.

The `/discovery` landing-page repositioning is a separate unlinked experiment and is not in scope.

---

## 9. Conditional answers

A route may be given before every fact is known, **provided its condition is stated with it and visibly unresolved.**

```
If no court order is stopping payment, the bank must settle on para 9 —
no succession certificate, at any amount.

⚠ One thing left to confirm: is a court order stopping payment?
   [ No, none we know of ]   [ Yes, there is ]   [ We don't know ]
```

| Rule | |
|---|---|
| 1 | A claim is never stated flatly while a condition on it is open |
| 2 | The condition names the paragraph it comes from |
| 3 | Resolving a condition is always offered as an action, never left implicit |
| 4 | **No conditional answer may be printed without its condition on the sheet** |

Rule 4 matters most: the printed sheet is what reaches a bank counter, and a condition dropped in printing is the exact failure this product exists to prevent.

---

## 10. What happens to `needs-review`

One page absorbs 14 of 23 paths for four unrelated reasons. It splits:

| Reason | Becomes | Reached from |
|---|---|---|
| Court restraint | Para 8(ii) page — what a restraint means, take it to a lawyer | Branch 1 Q3; the condition control (§9); branch 2.6 |
| A will exists | Probate route | Branch 1 Q4 |
| Exactly at the threshold | Boundary confirmation — para 10 says "less than" | The two "equal" rows in §4.4 |
| Plain uncertainty | What to confirm with the bank | Any unresolved "not sure" |

**Every row names what reaches it.** A destination with no named source is an orphan, and this product has shipped two of those already (§2.3).

---

## 11. Outcome pages

All existing outcome pages keep their URLs. No content rewrite is in scope.

| Outcome | Path | Reachable today | After |
|---|---|---|---|
| `nominee` | `/nominee` | yes | yes |
| `survivorship` | `/survivorship` | yes | yes |
| `under-threshold` | `/no-nominee/under-threshold` | yes | yes |
| `over-threshold` | `/no-nominee/over-threshold` | yes | yes |
| `unknown-nominee` | `/unknown-nominee` | yes | yes |
| `dispute` | `/dispute` | yes | yes — branch 1 Q5 |
| `out-of-scope` | `/out-of-scope` | yes | yes — branch 1 Q1 |
| `already-in-court` | `/already-in-court` | **no** | **yes — branch 2.6** |

---

## 12. URLs and migration

- Opening screen at `/start`. Branches are their own routes: `/start/new`, `/start/started`, `/start/asked`, `/start/refused`, `/start/find`.
- Answers stay in the query string. The URL remains the whole state; nothing is stored.
- **Existing links must not break.** `/start?claiming=…&nominee=…` links are in bookmarks and messages. A bare `/start` carrying wizard answers routes into branch 1 at the matching point rather than showing the opening screen.
- `RETIRED_VALUES` in `lib/wizard.ts` is the mechanism for any option this rebuild retires. Retiring an option means moving its value there, never deleting it — deleting it silently strips the answer from every existing link.

---

## 13. Analytics

| Event | Change |
|---|---|
| `flow_started` | Gains a `branch` property. Without it the funnel cannot be read per branch. |
| `question_answered` | Same shape; `step` becomes branch-relative |
| `actionable_result_viewed` | Also fires for the "what to confirm" sheets — see §14 |
| `outcome_reached` | Unchanged |
| Honest-Exit outcome set | Unchanged — `already-in-court` becomes reachable (§5.6) rather than being removed |

No new personal data. No URL is transmitted; `lib/analytics.ts`'s guarantees hold.

---

## 14. Effect on the North Star, stated plainly

The NSM (`2026-09-06-north-star-metric-design.md` §1) counts journeys reaching **either** a resolved claim route **or** a resolved information gap. This rebuild converts journeys that today end at `needs-review` into the second kind.

**Weekly Claim-Ready Journeys will therefore rise, and part of that rise is definitional rather than behavioural.** It must be reported that way wherever the number appears. The Honest-Exit Rate guardrail is unaffected: no unwelcome verdict is converted into a welcome one anywhere in this design.

---

## 15. Phasing

Each phase ships on its own. No phase depends on a later one.

| Phase | Contents | Why this order |
|---|---|---|
| 1 | Opening screen; branches 3 and 4 wired to pages that already exist | Highest value per unit of work — three built pages get a front door, two have never had one |
| 2 | Branch 1: the question set and conditional answers | The determination engine; changes `resolve()`, the riskiest legal surface |
| 3 | Branch 2's five-way menu; 2.6 court door; 2.3 waiting flow | 2.3 is genuinely new content; 2.4 and 2.5 are links to phase 1's work |
| 4 | `needs-review` split (§10) | Needs phases 2 and 3 to have named sources |
| 5 | Branch 5 discovery route | Independent; gated on open question 1 |

Phase 1 alone fixes the orphaned scenario picker and gives `/what-were-you-asked-for` and `/bank-refused` real entry points without touching `resolve()`.

---

## 16. Risks

| Risk | Mitigation |
|---|---|
| A conditional answer is printed without its condition | Rule 4 (§9); a test asserting the printed sheet carries every open condition |
| Branch 2.6 reads as legal advice | The framing rule in §5.6 is quoted from the research and must appear in the page copy, not only the spec |
| Retiring wizard options breaks shared links | `RETIRED_VALUES` (§12), with the existing test asserting through `parseAnswers` |
| The NSM rise is read as a funnel win | §14, repeated wherever the number is reported |
| Branch 5 overstates what Adhikaar does | The page states it runs no search; `/discovery`'s "Start your search" wording is not reused |
| Five entries plus a five-way submenu is a lot of surface | Phase 1 ships the entries alone and can be tested before the submenu is built |

---

## 17. Open questions

1. **Branch 5 has no research behind it.** n=2 covers claiming, not finding. Worth one interview, or ship it as a links page rather than a journey.
2. **Does branch 3 need the amount?** Para 10(a)'s no-surety rule is threshold-dependent, so a surety demand above the threshold may be legitimate. Must be resolved before that branch is written, or the product will call a lawful demand unlawful.
3. ~~Branch 2.3's timeline claim needs a source.~~ **Closed 7 Sep.** `lib/rbi.ts`'s `fifteenDays` clause is para **31**, verbatim: *"within a period not exceeding 15 calendar days from the date of receipt of all the required documents"*.

   The wording carries a trap for branch 2.3. The clock starts **from receipt of all required documents**, not from the day the reader first walked into the branch. A reader who submitted an incomplete set has no 15-day claim yet, and telling them otherwise sends them to a counter with a demand that the bank can correctly refuse. Branch 2.3's first question must therefore establish *when the bank had everything*, not merely when the reader submitted something — and where that is unclear, the timeline is stated as a condition (§9), not a deadline.
