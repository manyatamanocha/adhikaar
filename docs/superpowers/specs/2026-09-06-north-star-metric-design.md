# Adhikaar — North Star Metric and Metrics Framework

**Date:** 6 September 2026 · **revised 7 September 2026**
**Status:** Agreed and instrumented. §10's three gaps are closed; the guardrail set was extended on 7 Sep (§9).
**Frameworks applied:** Product Analytics Session 1 (Introduction to Product Analytics 101) and Session 2 (The Art of Finding the "One Metric"), Shravan Tickoo

### What changed on 7 September 2026

**The metric was renamed, not redefined.** "Claim-Ready Journeys" became **Weekly Resolved Journeys**. Same event, same arithmetic — but "claim-ready" reads oddly for a journey whose honest resolution is *"this is out of scope"* or *"here is what you must go and establish,"* both of which §1 has always counted.

Four things did change, and each is marked in place below:

1. **Instrumentation caught up to §1.** Until 7 Sep, `actionable_result_viewed` fired only on the eight wizard verdicts and `/needs-review` — so the "resolved information gap" half of §1's definition, written 6 Sep, was never actually counted. Situation-branch resolutions now fire it. **Part of the resulting rise is definitional, not behavioural, and must be reported that way against any figure from before 7 Sep.**
2. **Resolution Rate is now a cohort** — the journeys that started in the window, and how many of *those* resolved. It was previously all resolutions ÷ all starts, two populations that need not overlap, which could exceed 100%.
3. **Two guardrails added** (§9): Situation Resolution Share and Stale Citation Share.
4. **`flow_started` now means "entered a branch"**, carrying which one, rather than "arrived at `/start`". Events either side of 7 Sep are not directly comparable.

The arithmetic for every metric below lives in `lib/metrics.ts` and is proved in `tests/metrics.test.cjs`.

---

## 1. The answer

> **North Star Metric: Weekly Resolved Journeys**
> The count of unique journeys per week that receive a valid, situation-appropriate resolution.

**Unit: journeys, not families.** A journey is approximated within a browsing session. A family returning tomorrow counts twice. There is no cross-session identity and there will not be one — `lib/analytics.ts` runs with `disable_persistence` and `disable_cookie`, which is a shipped privacy promise, not an oversight (§10).

**"Valid" is a precondition, not a filter.** Every citation carries a `verbatim` flag; unverified bank fields stay `null` rather than being guessed; nothing invalid ships. So the word is true of 100% of the numerator and excludes nothing. The invalidity you would most want to exclude — a misattributed clause — is a bug, and the product cannot observe its own bugs. The invalidity it *can* observe is staleness, which is a guardrail (§9), not a deduction from the count.

**"Situation-appropriate" is a design claim, not a filter.** The picker routes: choose "the bank refused" and you reach the refusal page. Appropriateness is guaranteed by construction. What the phrase earns is the *segmentation* — `flow_started` carries `branch`, so the North Star and Resolution Rate can be read per door.

A journey is **resolved** when the product has delivered either:

- **A resolved claim route** — the family knows which RBI route applies, what documents it needs, and what to ask the bank for; or
- **A resolved information gap** — the product could not determine the claim route, but has resolved *what the family must go and find out next* (e.g. "ask the bank in writing whether a nominee was registered").

Both are actionable outcomes. The product's promise is not "we will always resolve your claim route" — it is **"you will leave knowing what to do next."** Both states honour that promise; only an abandoned or unresolved journey fails it.

---

## 2. Product context

Adhikaar helps Indian families claim a deceased relative's bank deposits without being wrongly pushed into obtaining a succession certificate (₹17,000, 4–7 months) that the RBI's 2025 Directions usually do not require. It is an independent guidance tool: no accounts, no stored family data, no backend record of a claim. Its deliverable is a printable page carrying the RBI's own sentence and the bank's own published policy, to hand across a counter.

**Lifecycle stage:** MVP / Empathy (Session 2, p38) — the question is still *"do people care?"*, not *"can we monetise?"*

---

## 3. The framework-fit problem, stated honestly

Both decks treat **retention** as the ultimate proof of product-market fit (Session 1, p8: *"retention rate is the single best metric to measure product-market fit"*).

**That test cannot apply to Adhikaar.** A family claims a deceased relative's deposits once in a lifetime. There is no habit loop, no frequency dimension, no meaningful WAU/MAU. Measuring retention here would produce a number guaranteed to look catastrophic while telling us nothing true. Optimising for it would be actively harmful — it would mean designing reasons for a grieving family to come back to a bereavement product.

**Adaptation:** for a once-per-lifetime product, **Referral replaces Retention as the PMF proof.** The user never returns, but their cousin, neighbour and colleague have the identical problem. Word-of-mouth is the survival mechanism that recurring products get from habit. This substitution is carried through to the input metrics in §8.

---

## 4. Why a count, not a rate

The North Star is a **periodic count**, not a conversion percentage. A rate can improve while delivered value shrinks:

| | Journeys started | Resolved | Rate | Families actually helped |
|---|---|---|---|---|
| Week 1 | 100 | 80 | **80%** | 80 |
| Week 2 | 1,000 | 600 | **60%** | **600** |

The rate ranks Week 1 higher. Week 2 helped 7.5× more families. A North Star that prefers Week 1 is measuring the wrong thing.

This also matches every NSM in the source material — Zomato's *Weekly Orders Delivered*, Uber's *Weekly Rides*, Airbnb's *Nights Booked*, Spotify's *Time Spent Listening*. All periodic counts of completed value loops; none a conversion percentage.

**Periodic, not cumulative.** Weekly Resolved Journeys can fall. That is what separates it from the vanity metrics Session 1 catalogues (p24–28) — Total Registered Users and Total App Downloads can only ever rise.

---

## 5. Validation against the three characteristics of a valid North Star

Session 1 (p18–21) sets three tests. A metric failing any one is a vanity or lagging metric.

### Characteristic 1 — Measures customer value at the "aha" moment ✅

The user arrives holding a demand they believe is lawful, thinking *"ab main kya karun?"* The aha moment is the flip: *"achha, ab mujhe yeh karna hai."*

Session 1's Zomato test (p19) is the right lens: not "App Opens" (browsing doesn't satisfy hunger), not even "Orders Placed" (food might arrive cold) — the true value is the completed loop, *"Orders Delivered On-Time with Positive Rating."*

Adhikaar's true completed loop is **"the bank settled the claim without demanding an unnecessary succession certificate."** The product structurally cannot observe that (§9). Weekly Resolved Journeys is the closest **observable** point on that loop, and it is genuinely customer-centric: it counts families who left equipped, not sessions or pageviews.

### Characteristic 2 — Represents product strategy ✅

Adhikaar's strategy is not "be a comprehensive legal resource" and not "maximise engagement." It is: **arm a grieving family with the specific rule and their own bank's published words, in a form they can carry to a counter.**

The metric encodes that strategy. It rewards *resolution*, not time-on-site, pages-read, or return visits. A competitor pursuing "be the FAQ authority for Indian inheritance" would correctly choose a different North Star (content reach). Ours defines how *we* intend to win.

### Characteristic 3 — Leading indicator of revenue ⚠️ adapted

Adhikaar has no revenue — it is free, with no login and no monetisation. The characteristic cannot be satisfied literally, and pretending otherwise would be dishonest.

**Adapted:** it is a leading indicator of **mission outcome and institutional viability**. Claim-ready journeys precede claims initiated, which precede money recovered by families (§6, lagging tier). Demonstrated claim-resolution efficacy is also what would make the product fundable or adoptable by an institution, which is the closest analogue to a revenue engine it has.

---

## 6. The full metrics framework

Four layers, in order: **value → efficiency → behaviour → safety.**

| Tier | Metric | Formula | What it tells us |
|---|---|---|---|
| **North Star** | **Weekly Resolved Journeys** | unique journeys receiving a resolution per week | How many families actually got value |
| **OMTM** (this quarter) | **Resolution Rate** | journeys started in the window that resolved ÷ journeys started in that window × 100 | Whether the core experience works (§11) |
| Leading | Journey Start Rate | journeys that enter a branch ÷ landing-page visitors × 100 | Is the landing page converting visitors into starters |
| Leading | Journeys Started | count of journeys entering any branch | Demand and entry volume — a diagnostic, never the OMTM |
| Leading | Per-Question Drop-off Rate | journeys abandoning at question *n* ÷ journeys reaching question *n* × 100 | **Which specific question** loses people |
| Behaviour | Next-Step Action Rate | resolved journeys that print, open counter mode or click the next step ÷ resolved journeys **eligible to** ÷ × 100 | Are users signalling they'll act |
| **Guardrail** | Honest-Exit Rate | unique journeys ending in a dispute / above-threshold / out-of-scope verdict ÷ unique journeys reaching any verdict × 100 | Are we still telling the unwelcome truth (§9) |
| **Guardrail** | Situation Resolution Share | resolved journeys from situation branches ÷ all resolved journeys × 100 | Is the North Star growing by delivery or by definition (§9) |
| **Guardrail** | Stale Citation Share | resolved journeys citing a bank row past its 182-day window ÷ journeys citing any bank × 100 | Is the compiled bank table rotting (§9) |
| Validation | Belief Correction Rate | survey answers of "yes, I thought I needed one" ÷ all survey answers × 100 | Is the myth actually being corrected |
| Lagging | Claim Initiation Rate | journeys that initiate a claim ÷ resolved journeys × 100 | Did advice convert to real-world action |
| Lagging | Successful Claim Rate | claims that succeed ÷ claims initiated × 100 | Final real-world impact |

**Supporting efficiency metric: Median Time to Resolution** — median elapsed time from a journey's start to its resolution (target scale: minutes, not tens of minutes). Adhikaar exists to make a complicated process simple; if a user needs twenty minutes to extract an answer, the experience has failed even at a high completion rate.

**Two denominators are deliberately not "all journeys."** Next-Step Action Rate divides by journeys *eligible* to act — `NextStepButton` renders on verdicts and `/needs-review` only, so a situation resolution has no control to click and would otherwise be scored as a failure to act. Belief Correction Rate divides by *survey responses*, not journeys: `BeliefSurvey` renders only where `hasAnswers && outcome.goodNews`, so it cannot appear on over-threshold, out-of-scope, already-in-court, `/needs-review` or either situation branch. Both limits are stated in the response body itself.

### Why Per-Question Drop-off, not whole-funnel drop-off

A whole-funnel drop-off rate (`abandoned ÷ started`) is arithmetically `100 − Resolution Rate` — the same number inverted, adding no information.

Per-question drop-off adds the information that matters. This is the Zerodha lesson (Session 2, p44): they did not learn "onboarding leaks," they learned it leaked *specifically at document upload*, fixed that one step with DigiLocker, and conversion jumped. A whole-funnel number could never have located that.

---

## 7. The funnel

```
Landing visitors
   │  Journey Start Rate
   ▼
Journey starters (by branch)
   │  Resolution Rate  ← OMTM        ← Per-Question Drop-off locates the leaks
   ▼
★ RESOLVED JOURNEYS  ← NORTH STAR (weekly count)
   │  Next-Step Action Rate          ← over ELIGIBLE journeys only
   ▼
Users showing intent to act
   │  Claim Initiation Rate           ← research-measured (§10)
   ▼
Claims actually initiated
   │  Successful Claim Rate           ← research-measured (§10)
   ▼
Money recovered
```

Every rung from "journey starters" down can also be read **per branch**, because `flow_started` carries the door the reader came in through. Without that, Resolution Rate is one number averaged over five very different journeys.

**The four-state ladder, stated once:**

- **Resolved** = value delivered
- **Print / download / counter mode** = intent signal
- **Claim initiated** = behavioural outcome
- **Claim successful** = final impact

### Why print/download/counter-mode is deliberately NOT in the North Star

A family that reads the answer on a phone screen and holds it up at the bank counter received the product's full value. **Not printing is not failure.** Folding a costly-action requirement into the North Star would systematically undercount phone users — the majority of this product's likely audience — and would bias the metric toward desktop users with printers.

Intent therefore sits *below* the North Star as its own rate, where a fall in it is a signal about trust and usability rather than a deduction from delivered value.

---

## 8. Metric tree and input metrics

Session 2's anatomy (p22): trunk → branches (mathematical levers) → leaves (daily work), decomposed the way Swiggy's GOV is (p23).

```
Weekly Resolved Journeys
  = Landing Visitors
  × Journey Start Rate
  × Resolution Rate
```

Each term is a real leak point, and the chain matches the funnel in §7 exactly: visitors who arrive, the share who begin answering, and the share of those who reach an answer. The BDFE framework (Session 1, p31–38) maps each to controllable levers.

### Breadth (Reach) — more of the right families arriving

- **Input metric:** weekly journeys started, split by language and by entry source
- **Levers in the product today:** the `/learn` SEO articles (`pnb-succession-certificate-requirement`, `rbi-15-day-deceased-claim-rule`, `sbi-deceased-account-claim-process`); Hindi and Kannada availability across the whole flow
- The vernacular lever is **precisely Meesho's strategy** (Session 1, p32) — localisation to reduce the entry barrier for users the English-only product silently excluded

### Depth (Engagement) — richer, more personalised answers

- **Input metrics:** share of resolved journeys carrying the bank's *own published policy* rather than only the generic RBI rule (`bank_selected`); documents ticked ÷ documents required (`readiness_checked`)
- **Levers:** expanding bank coverage beyond the current eight; the `BankGapAlert` surfacing a bank's documented policy gap above the fold; document checklist quality

### Frequency → **Propagation** (substituted, per §3)

The dimension the framework assumes does not exist here. A family claims once; the recurring unit is not the person but **the case passed to the next family**.

- **Input metric:** share of journeys arriving from a shared guide link or referral
- **Structural advantage:** Adhikaar's URL-as-state architecture means *every* journey, including a half-finished one, is already a shareable link — the propagation mechanism exists and is unused
- **Levers:** carrying a short URL or QR code on the printed sheet; an explicit "send this to a sibling" affordance
- **Status:** not instrumented (§10)

### Efficiency (Friction) — faster from arrival to answer

- **Input metrics:** Median Time to Resolution; per-question drop-off
- **Levers:** the scenario-card front door (recognise your own situation in one line instead of parsing a legal menu first); the field-specific "I know the answer now" routing, which returns a user to the *single* unresolved question rather than the top of the wizard

---

## 9. Guardrail and the Cobra risk

Session 1 devotes a chapter to guardrails (p43–51) because *"when a measure becomes a target, it ceases to be a good measure"* (Goodhart's Law, p44).

### Adhikaar's specific cobra

**If resolved journeys are the goal, the product becomes incentivised to hand out a confident answer even when the honest answer is *"your heirs are in dispute / you are above the threshold / this is out of scope — take advice."***

Suppressing or softening those verdicts would raise the North Star every single week while sending grieving families to argue a case at a bank counter that they would lose. This is a *quality and safety* guardrail failure in Session 1's taxonomy (p51), and for this product it is the most damaging thing that could happen — worse than a low metric.

### The guardrail

> **Honest-Exit Rate** = unique journeys ending in a dispute, above-threshold, or out-of-scope verdict ÷ unique journeys reaching **any** verdict × 100

**Corrected 7 Sep.** This section previously said *"÷ all journeys,"* which the code never implemented and which would have mixed journeys that reached a verdict with journeys that never got near one. It also counted events rather than journeys, so a reader who reloaded a verdict page three times counted three times.

**Reading it:** if Weekly Resolved Journeys rises while Honest-Exit Rate falls, the product is manufacturing false confidence. That combination triggers a review of the wizard's branching logic, not a celebration.

### The second cobra, found 7 Sep

**Honest-Exit answers the wrong question now.** It reads `outcome_reached`, which only the eight verdicts fire. Situation resolutions do not. So it cannot see what became the cheapest way to raise a resolution count: **declaring more pages resolutions.**

That is not hypothetical. On 7 Sep two entries were added to a lookup table and the North Star's reachable numerator grew by two pages, with no product change and no family better served. Nothing objected. Left unchecked, adding `/bank-refused`, `/guide`, `/faq` and `/banks` would multiply the number the same way — each addition individually arguable, collectively meaningless.

> **Situation Resolution Share** = unique resolved journeys from situation branches ÷ all unique resolved journeys × 100

🔴 **No threshold, deliberately.** A high share is not bad. A situation resolution is real delivered value and §1 counts it on purpose. What the number is for is the **move**: if it climbs while verdict resolutions stay flat, ask whether traffic mix genuinely changed or whether the definition of "resolution" was loosened. Set a baseline once real users exist; read it per branch, since a shift driven by one door getting more traffic is product mix, not gaming.

### The third guardrail: is the evidence still true?

The compiled bank-by-bank table is the product's moat, and it decays silently. `lib/banks.ts` already carries `verifiedOn` per row and an `isStale()` at 182 days.

> **Stale Citation Share** = unique resolved journeys citing a bank row past its window ÷ unique journeys citing any bank × 100

Computed server-side from the table itself, so it needs no new event. `RULES_VERIFIED_ON` is reported alongside it as a single flag rather than a rate — every RBI clause was verified in one pass, so if that goes stale the whole product does at once.

**Secondary guardrail (cheap, optional, still not built):** corrections reported through `/contact` ("found incorrect information") per 1,000 resolved journeys.

---

## 10. Measurement status and honest caveats

### Instrumented today

| Event | Carries | Serves |
|---|---|---|
| `landing_viewed` | `entry`, `arrived_via` | Journey Start Rate denominator; propagation |
| `flow_started` | **`branch`** | Journeys Started; Resolution Rate denominator; per-door funnel |
| `question_answered` | `step` | Per-question drop-off |
| `actionable_result_viewed` | `outcome_type`, **`resolution_source`** | **North Star**; Resolution Rate; Situation Resolution Share |
| `outcome_reached` | `outcome` | Honest-Exit Rate |
| `sheet_printed`, `counter_mode_opened`, `next_step_intent` | — | Next-Step Action Rate |
| `readiness_checked`, `bank_selected` | — | Depth inputs; Stale Citation Share |
| `survey_answered` | `believed_certificate_needed` | Belief Correction Rate |

All of it is aggregated in `lib/metrics.ts`, exposed at `/api/metrics`, and proved in `tests/metrics.test.cjs`.

### The three gaps — all closed

1. ~~**Landing-page visitors are not counted.**~~ **Closed.** `landing_viewed` fires once per session on the first page seen, carrying two coarse enums and no URL. Journey Start Rate has its denominator.
2. ~~**Counter mode is not separately tracked.**~~ **Closed.** `counter_mode_opened` fires on `?mode=counter`.
3. ~~**Propagation source is not tracked.**~~ **Closed.** `arrived_via` buckets the referrer, and `"shared_link"` — a first page view whose URL already carries answers — is the propagation signal §3 substitutes for retention.

### What is still not built

- **Per-Question Drop-off *Rate*.** `perQuestion` returns raw counts by step; the rate is derived by the reader, not computed.
- **The `/contact` corrections guardrail** (§9).
- **Everything downstream of intent** — see below, and that is by design.

### Metrics that cannot be instrumented, by design

**Claim Initiation Rate and Successful Claim Rate are not measurable by the product** and must be labelled *research-measured* wherever they appear. Adhikaar has no accounts, no backend record of a claim, and analytics runs with `disable_persistence` and `disable_cookie` — it cannot observe what happens after a family closes the tab, and that inability is a shipped privacy promise, not an oversight. These two numbers can only come from outside the product: follow-up interviews, or an opt-in "did your claim succeed?" callback.

### The North Star's own precision limit

Because no cross-session identity exists, the metric counts unique **journeys** (approximated within a browsing session), not unique **families**. A family returning tomorrow counts twice. This is stated rather than engineered away — engineering it away would mean persistent identifiers, which the product promises not to set.

---

## 11. Lifecycle: the North Star is not this quarter's focus

Session 2 (p14–15) separates the **North Star** (where we are going) from the **OMTM** — the One Metric That Matters *right now*, which is whichever single constraint is currently throttling the system.

Adhikaar is at MVP / Empathy stage. Traffic is small and unproven, and the funnel's very first step has no measurement at all (§10).

> **OMTM for this quarter: Resolution Rate.**

Reason: at this stage, a low completion rate means the journey itself is broken, and pouring acquisition into a broken journey wastes it (Session 1, p12 — fix conversion before acquisition; *"premature acquisition scaling with poor conversion is like filling a bucket with holes"*). If 100 people start and 10 get a useful resolution, the product is not healthy however much traffic arrives. Start volume tells you about demand; Resolution Rate tells you whether the core experience works. Once the journey reliably carries people to an answer, the constraint shifts to Breadth, and the OMTM moves to Journeys Started.

**It stays the OMTM while it reads `null`.** With no production traffic, Resolution Rate has an empty denominator and `rate()` returns `null` rather than a false `0%`. The correct report is **"Resolution Rate — N/A, insufficient production data,"** not a temporary promotion of Journeys Started because that one happens to be computable. A metric hierarchy that reshuffles itself according to how much data exists is not a hierarchy — it moves every time traffic does, and nothing can be tracked across the change.

The North Star does not change when the OMTM does. That is the point of having both.

---

## 12. What was considered and rejected

| Candidate | Why rejected |
|---|---|
| Total users / visits | Vanity: cumulative, only ever rises, says nothing about value (Session 1, p24) |
| Weekly Sheets Printed | Undercounts phone users reading at the counter; printing alone doesn't prove comprehension |
| Resolution Rate as the North Star | A rate can rise while families helped falls (§4). Retained one level down, as the OMTM (§11) |
| Retention / WAU / MAU | Structurally invalid for a once-per-lifetime product (§3) |
| Money recovered | The true outcome, but unobservable by design. Retained as the lagging impact tier |
| Costly-action requirement inside the North Star | Would penalise the phone user who got full value without printing (§7) |

---

## 13. If the submission template demands a percentage

If the case-study format requires the North Star expressed as a rate, present **Resolution Rate (%)** as the headline with the weekly count beside it — and state explicitly that the count is the true North Star and the rate is the OMTM beneath it. Do not silently swap one for the other; the substitution changes what the metric means (§4).

**This is now the standing architecture, not a fallback.** §11 names Resolution Rate the OMTM outright, so the two numbers are always reported together: the count is the value delivered, the rate is the efficiency of delivering it. §4's argument against a rate is why the *North Star* is a count — it is not an argument against having the rate at all.
