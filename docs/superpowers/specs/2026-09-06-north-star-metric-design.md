# Adhikaar — North Star Metric and Metrics Framework

**Date:** 6 September 2026
**Status:** Agreed, pending instrumentation of three gaps (see §10)
**Frameworks applied:** Product Analytics Session 1 (Introduction to Product Analytics 101) and Session 2 (The Art of Finding the "One Metric"), Shravan Tickoo

---

## 1. The answer

> **North Star Metric: Weekly Claim-Ready Journeys**
> The number of unique claim journeys per week that reach a complete, actionable claim path.

A claim journey is **claim-ready** when the product has resolved either:

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

| | Journeys started | Claim-ready | Rate | Families actually helped |
|---|---|---|---|---|
| Week 1 | 100 | 80 | **80%** | 80 |
| Week 2 | 1,000 | 600 | **60%** | **600** |

The rate ranks Week 1 higher. Week 2 helped 7.5× more families. A North Star that prefers Week 1 is measuring the wrong thing.

This also matches every NSM in the source material — Zomato's *Weekly Orders Delivered*, Uber's *Weekly Rides*, Airbnb's *Nights Booked*, Spotify's *Time Spent Listening*. All periodic counts of completed value loops; none a conversion percentage.

**Periodic, not cumulative.** Weekly Claim-Ready Journeys can fall. That is what separates it from the vanity metrics Session 1 catalogues (p24–28) — Total Registered Users and Total App Downloads can only ever rise.

---

## 5. Validation against the three characteristics of a valid North Star

Session 1 (p18–21) sets three tests. A metric failing any one is a vanity or lagging metric.

### Characteristic 1 — Measures customer value at the "aha" moment ✅

The user arrives holding a demand they believe is lawful, thinking *"ab main kya karun?"* The aha moment is the flip: *"achha, ab mujhe yeh karna hai."*

Session 1's Zomato test (p19) is the right lens: not "App Opens" (browsing doesn't satisfy hunger), not even "Orders Placed" (food might arrive cold) — the true value is the completed loop, *"Orders Delivered On-Time with Positive Rating."*

Adhikaar's true completed loop is **"the bank settled the claim without demanding an unnecessary succession certificate."** The product structurally cannot observe that (§9). Weekly Claim-Ready Journeys is the closest **observable** point on that loop, and it is genuinely customer-centric: it counts families who left equipped, not sessions or pageviews.

### Characteristic 2 — Represents product strategy ✅

Adhikaar's strategy is not "be a comprehensive legal resource" and not "maximise engagement." It is: **arm a grieving family with the specific rule and their own bank's published words, in a form they can carry to a counter.**

The metric encodes that strategy. It rewards *resolution*, not time-on-site, pages-read, or return visits. A competitor pursuing "be the FAQ authority for Indian inheritance" would correctly choose a different North Star (content reach). Ours defines how *we* intend to win.

### Characteristic 3 — Leading indicator of revenue ⚠️ adapted

Adhikaar has no revenue — it is free, with no login and no monetisation. The characteristic cannot be satisfied literally, and pretending otherwise would be dishonest.

**Adapted:** it is a leading indicator of **mission outcome and institutional viability**. Claim-ready journeys precede claims initiated, which precede money recovered by families (§6, lagging tier). Demonstrated claim-resolution efficacy is also what would make the product fundable or adoptable by an institution, which is the closest analogue to a revenue engine it has.

---

## 6. The full metrics framework

| Tier | Metric | Formula | What it tells us |
|---|---|---|---|
| **North Star** | **Weekly Claim-Ready Journeys** | unique journeys reaching a claim-ready state per week | How many families actually got value |
| Leading | Journey Start Rate | users who start the claim journey ÷ landing-page users × 100 | Is the landing page converting visitors into starters |
| Leading | Claim-Ready Journey Rate | users reaching claim-ready ÷ users who start × 100 | How effectively the journey carries users to an outcome |
| Leading | Per-Question Drop-off Rate | users abandoning at question *n* ÷ users who reached question *n* × 100 | **Which specific question** loses people |
| Leading / intent | Next-Step Action Rate | claim-ready users who print, download or open counter mode ÷ claim-ready users × 100 | Are users signalling they'll act on the guidance |
| **Guardrail** | Honest-Exit Rate | journeys ending in dispute / above-threshold / out-of-scope verdicts ÷ all journeys × 100 | Are we still telling people the unwelcome truth (§9) |
| Lagging | Claim Initiation Rate | users who actually initiate a claim ÷ claim-ready users × 100 | Did advice convert to real-world action |
| Lagging | Successful Claim Rate | users whose claim succeeds ÷ users who initiate × 100 | Final real-world impact |

**Supporting efficiency metric: Median Time to Claim-Ready** — median elapsed time from journey start to claim-ready state (target scale: minutes, not tens of minutes). Adhikaar exists to make a complicated bank and government process simple. If a user needs twenty minutes to extract an answer, the experience has failed even at a high completion rate.

### Why Per-Question Drop-off, not whole-funnel drop-off

A whole-funnel drop-off rate (`abandoned ÷ started`) is arithmetically `100 − Claim-Ready Journey Rate` — the same number inverted, adding no information.

Per-question drop-off adds the information that matters. This is the Zerodha lesson (Session 2, p44): they did not learn "onboarding leaks," they learned it leaked *specifically at document upload*, fixed that one step with DigiLocker, and conversion jumped. A whole-funnel number could never have located that.

---

## 7. The funnel

```
Landing visitors
   │  Journey Start Rate
   ▼
Journey starters
   │  Claim-Ready Journey Rate        ← Per-Question Drop-off locates the leaks
   ▼
★ CLAIM-READY JOURNEYS  ← NORTH STAR (weekly count)
   │  Next-Step Action Rate
   ▼
Users showing intent to act
   │  Claim Initiation Rate           ← research-measured (§10)
   ▼
Claims actually initiated
   │  Successful Claim Rate           ← research-measured (§10)
   ▼
Money recovered
```

**The four-state ladder, stated once:**

- **Claim-ready** = value delivered
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
Weekly Claim-Ready Journeys
  = Landing Visitors
  × Journey Start Rate
  × Claim-Ready Journey Rate
```

Each term is a real leak point, and the chain matches the funnel in §7 exactly: visitors who arrive, the share who begin answering, and the share of those who reach an answer. The BDFE framework (Session 1, p31–38) maps each to controllable levers.

### Breadth (Reach) — more of the right families arriving

- **Input metric:** weekly journeys started, split by language and by entry source
- **Levers in the product today:** the `/learn` SEO articles (`pnb-succession-certificate-requirement`, `rbi-15-day-deceased-claim-rule`, `sbi-deceased-account-claim-process`); Hindi and Kannada availability across the whole flow
- The vernacular lever is **precisely Meesho's strategy** (Session 1, p32) — localisation to reduce the entry barrier for users the English-only product silently excluded

### Depth (Engagement) — richer, more personalised answers

- **Input metrics:** share of claim-ready journeys carrying the bank's *own published policy* rather than only the generic RBI rule (`bank_selected`); documents ticked ÷ documents required (`readiness_checked`)
- **Levers:** expanding bank coverage beyond the current eight; the `BankGapAlert` surfacing a bank's documented policy gap above the fold; document checklist quality

### Frequency → **Propagation** (substituted, per §3)

The dimension the framework assumes does not exist here. A family claims once; the recurring unit is not the person but **the case passed to the next family**.

- **Input metric:** share of journeys arriving from a shared guide link or referral
- **Structural advantage:** Adhikaar's URL-as-state architecture means *every* journey, including a half-finished one, is already a shareable link — the propagation mechanism exists and is unused
- **Levers:** carrying a short URL or QR code on the printed sheet; an explicit "send this to a sibling" affordance
- **Status:** not instrumented (§10)

### Efficiency (Friction) — faster from arrival to answer

- **Input metrics:** Median Time to Claim-Ready; per-question drop-off
- **Levers:** the scenario-card front door (recognise your own situation in one line instead of parsing a legal menu first); the field-specific "I know the answer now" routing, which returns a user to the *single* unresolved question rather than the top of the wizard

---

## 9. Guardrail and the Cobra risk

Session 1 devotes a chapter to guardrails (p43–51) because *"when a measure becomes a target, it ceases to be a good measure"* (Goodhart's Law, p44).

### Adhikaar's specific cobra

**If claim-ready journeys are the goal, the product becomes incentivised to hand out a confident answer even when the honest answer is *"your heirs are in dispute / you are above the threshold / this is out of scope — take advice."***

Suppressing or softening those verdicts would raise the North Star every single week while sending grieving families to argue a case at a bank counter that they would lose. This is a *quality and safety* guardrail failure in Session 1's taxonomy (p51), and for this product it is the most damaging thing that could happen — worse than a low metric.

### The guardrail

> **Honest-Exit Rate** = journeys ending in a dispute, above-threshold, or out-of-scope verdict ÷ all journeys × 100

**Reading it:** if Weekly Claim-Ready Journeys rises while Honest-Exit Rate falls, the product is manufacturing false confidence. That combination triggers a review of the wizard's branching logic, not a celebration.

These outcomes are already instrumented (`outcome_reached` carries the outcome id), so this guardrail costs nothing to add.

**Secondary guardrail (cheap, optional):** corrections reported through `/contact` ("found incorrect information") per 1,000 claim-ready journeys.

---

## 10. Measurement status and honest caveats

### Instrumented today

| Event | Serves |
|---|---|
| `flow_started` | Journeys Started |
| `question_answered` (carries `step`) | First-question completion; per-question drop-off |
| `actionable_result_viewed` (carries `outcome_type`) | **North Star** |
| `outcome_reached` (carries `outcome`) | Honest-Exit Rate |
| `sheet_printed` | Next-Step Action Rate |
| `next_step_intent` | Next-Step Action Rate (stated) |
| `readiness_checked`, `bank_selected` | Depth inputs |
| `survey_answered` | Belief-flip validation |

### Three gaps to close

1. **Landing-page visitors are not counted at all.** `lib/analytics.ts` sets `track_pageview: false` and `autocapture: false` (deliberately — the URL carries the family's answers, so automatic URL capture would ship the whole case by the back door), and no homepage event exists. **Journey Start Rate has no denominator today.** Fix: one explicit `landing_viewed` event on the homepage, carrying no URL and no properties — privacy-consistent, since it records only that a page was seen.
2. **Counter mode is not separately tracked.** It is a query parameter on an outcome path, so it currently reads as an ordinary `outcome_reached`. Needed for Next-Step Action Rate.
3. **Propagation source is not tracked.** Needed for the referral input metric.

### Metrics that cannot be instrumented, by design

**Claim Initiation Rate and Successful Claim Rate are not measurable by the product** and must be labelled *research-measured* wherever they appear. Adhikaar has no accounts, no backend record of a claim, and analytics runs with `disable_persistence` and `disable_cookie` — it cannot observe what happens after a family closes the tab, and that inability is a shipped privacy promise, not an oversight. These two numbers can only come from outside the product: follow-up interviews, or an opt-in "did your claim succeed?" callback.

### The North Star's own precision limit

Because no cross-session identity exists, the metric counts unique **journeys** (approximated within a browsing session), not unique **families**. A family returning tomorrow counts twice. This is stated rather than engineered away — engineering it away would mean persistent identifiers, which the product promises not to set.

---

## 11. Lifecycle: the North Star is not this quarter's focus

Session 2 (p14–15) separates the **North Star** (where we are going) from the **OMTM** — the One Metric That Matters *right now*, which is whichever single constraint is currently throttling the system.

Adhikaar is at MVP / Empathy stage. Traffic is small and unproven, and the funnel's very first step has no measurement at all (§10).

> **OMTM for this quarter: Claim-Ready Journey Rate.**

Reason: at this stage, a low completion rate means the journey itself is broken, and pouring acquisition into a broken journey wastes it (Session 1, p12 — fix conversion before acquisition; *"premature acquisition scaling with poor conversion is like filling a bucket with holes"*). Once the journey reliably carries people to an answer, the constraint shifts to Breadth, and the OMTM moves to Journeys Started.

The North Star does not change when the OMTM does. That is the point of having both.

---

## 12. What was considered and rejected

| Candidate | Why rejected |
|---|---|
| Total users / visits | Vanity: cumulative, only ever rises, says nothing about value (Session 1, p24) |
| Weekly Sheets Printed | Undercounts phone users reading at the counter; printing alone doesn't prove comprehension |
| Claim-Ready Journey **Rate** as the North Star | A rate can rise while families helped falls (§4). Retained as the primary leading metric |
| Retention / WAU / MAU | Structurally invalid for a once-per-lifetime product (§3) |
| Money recovered | The true outcome, but unobservable by design. Retained as the lagging impact tier |
| Costly-action requirement inside the North Star | Would penalise the phone user who got full value without printing (§7) |

---

## 13. If the submission template demands a percentage

If the case-study format requires the North Star expressed as a rate, present **Claim-Ready Journey Rate (%)** as the headline with the weekly count beside it — and state explicitly that the count is the true North Star and the rate is its leading indicator. Do not silently swap one for the other; the substitution changes what the metric means (§4).
