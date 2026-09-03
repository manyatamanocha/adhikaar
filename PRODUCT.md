# Product

<!-- impeccable:product-schema 1 -->

Source: this record is written from the project's own vault documents — `Scribble World/My Scribbles - Adhikaar/HANDOFF.md`, `Solution/Design Doc.md` (v2, 3 Sep 2026), `Problem Statement/As-Is Process Map.md`, and `Research Log.md` — plus the four data files in `lib/`. Those are the user's own locked decisions, not inferences.

## Platform

web

## Users

**Primary: an adult legal heir or registered nominee in India who has already been to a bank about a dead relative's deposit account and been handed a list of demands.**

Their situation is specific and it shapes everything:

- They are recently bereaved. They are doing admin they have never done before, in a state where reading is hard and being condescended to is intolerable.
- They have *already had the counter conversation*. They are not discovering that the account exists — discovery is assumed done. They arrive holding a demand, usually for a **succession certificate**.
- They are frequently the "proxy" — an adult child handling a surviving parent's paperwork, often remotely, often on a phone.
- They are not lawyers and have no intention of becoming one. They need to know whether what they were told is correct, and what to do about it on Monday morning.

**Secondary, and the entire launch test population:** people who are *not* bereaved, asked a hypothetical scenario. The product's headline metric is deliberately measurable on them (see Product Purpose), which is what makes it testable without recruiting grieving users.

## Product Purpose

Since the RBI's *Settlement of Claims in respect of Deceased Customers of Banks* Directions, 2025 — in force **31 March 2026** — a bank usually may not demand a succession certificate for a deposit claim. A succession certificate is a civil court proceeding: roughly ₹17,000 and four to seven months, longer if anyone objects.

Almost nobody knows the rule changed. Two independent deep-research passes on 3 Sep 2026 both returned the *pre-2025* answer, and a live 2026 Indian legal site still states movable assets are "legally claimable only through this document."

Adhikaar asks up to four questions, gives a straight answer at a real URL, and produces a **printable page carrying the RBI's own words and that bank's own published policy** — to hand across a bank counter.

The user does not argue their opinion against the bank's. **They show the bank its own rules.**

**Success** is the *belief correction rate*: the proportion who arrive believing a succession certificate is needed and leave knowing it is not. Explicitly **not** money recovered — nothing settles inside the test window. **Retention does not exist** for a once-in-a-lifetime utility; that is declared, not disguised with a chart.

## Positioning

The claim is **not** "this money is yours." The claim is: **you are entitled to be told the correct rule before spending ₹17,000 on a court document.**

Three things a neighbouring product could not truthfully copy:

1. **Correct paragraph attribution.** The "shall not insist on production of legal documents" sentence is **para 9 — nominee and survivorship only**. The no-nominee case runs on **para 10(a)**, which *mandates* settlement on a closed list of six documents — a stronger instrument than a prohibition. Nearly every secondary source gets this wrong, and a misquote is catchable by a branch officer at the worst possible moment.
2. **The bank table as an accountability artifact.** From 31 Mar 2026 banks *must* publish their deceased-claim policy and checklist online. A blank cell is itself a documented rule breach. The law is uniform; the practice is not — SBI implemented in Dec 2025 while PNB was still demanding a surety months later.
3. **"What were you asked for?"** — a set difference between what the branch demanded and what the RBI prescribes, each item carrying its paragraph reference. Not logic, not an opinion. Arithmetic on a published list.

## Operating Context

- **The scene is a phone, and often a branch.** The user may be standing at a counter, or sitting at home the evening before going back to one. Phone-first is not a breakpoint preference; it is the primary device.
- **The artifact is paper.** The counter sheet is printed or PDF'd via Ctrl+P and physically handed to a bank officer, who is a hostile-ish reader looking for a reason to say no. It must survive being printed black-on-white with no colour, no nav, and links expanded to full URLs.
- **The counter conversation is adversarial-polite.** The four tactics are procedural, not legal: ask in writing, get the demand in writing with the rule relied on, get a dated acknowledgement, expect the 15-day clock's start date to be disputed.
- The RBI has issued this instruction **three times** — 2005, Jan 2013, Sep 2025. A rule reissued three times in twenty years is a rule that is not reaching the counter.

## Capabilities and Constraints

**In scope:** bank deposit accounts, lockers and safe custody, claimed by an adult heir or nominee. Four banks at launch: SBI, PNB, HDFC, ICICI.

**Out of scope, hard:** account discovery · insurance · mutual funds · shares · EPF · NPS · post office · property mutation · dispute resolution · login · any stored user data · document generation beyond the printable sheet. Other rails get **one map page that points and never advises**.

**Absolute prohibitions:**

- **Quote and cite, never assert.** Never "you are entitled." Always "the RBI says X at para N, your bank says Y, here are both links."
- **Never comment on operating a deceased person's account via Aadhaar, UPI or net banking.** Out of scope, full stop.
- **Never state one universal threshold.** ₹15 lakh (commercial) / ₹5 lakh (co-operative) is a *floor*; a bank may set higher under para 7(h). The threshold is the **aggregate per claim** — several accounts at one bank add together; different banks are separate claims.
- **Never claim the Ombudsman will work.** Free and real, but 40.78% of accepted complaints were dismissed in FY2024-25.
- **A nominee is not an owner.** *Sarbati Devi v Usha Devi*, AIR 1984 SC 346 — a nominee is only "the hand which is authorised to receive the amount." Every nominee and survivorship page must say the money is held in trust for all legal heirs; omitting it causes the family dispute the product exists to prevent.
- **PPF, SCSS, MSSC and SSA are excluded** by para 6(b), on every page.
- **No login, no stored data.** "Nothing about your family reaches a server." The deadline tracker uses `localStorage` only.

**Technical constraints:** Next 16.3.4 · React 19 · Tailwind 4 · TypeScript. `next dev` with **no `--turbopack`** — it crashes this machine. Deploys to Vercel as **adhikaar**. Folder stays `claim-navigator`; the product is Adhikaar.

**Language:** English at launch. Copy is structured as data so a language is a file. **Statutory quotes are never translated** — a translated quote stops being a quote. Translated gloss above, English clause below.

## Brand Commitments

- **Name: Adhikaar** (locked 3 Sep 2026, after Haq and Adhikaa were considered). Hindi/Urdu: *right, entitlement*.
- **Voice: plain, calm, exact.** Easy to understand and navigate. Phone first. Verdict before evidence. No unglossed jargon — never a bare annexure reference without the plain name beside it.
- **The product never speaks in its own legal voice.** Plain-English lines describe what a clause says; the clause itself is quoted beside it with its paragraph number and a link.
- **Honesty over reassurance.** `/no-nominee/over-threshold` tells people a succession certificate may genuinely be required and says so plainly. Unverified bank fields render as "we haven't verified this — ask your bank" rather than a plausible guess.
- **Acknowledge the banks' side once, plainly.** Insider fraud on dormant and deceased accounts is documented and real. Caution is not the problem; undocumented, unaccountable caution is.

## Evidence on Hand

**Real, in `lib/`:** every RBI citation with a `verbatim` flag (only text read from the notification may render inside quotation marks) · 13 documents with real cost, real time, issuing authority, and a `prescribed` boolean · four bank rows, SBI and PNB verified from their own pages, **HDFC and ICICI deliberately left `null`** · eight complete outcomes.

**Primary research — 2 interviews.** R2 is the spine: *"There is no standard process. They are not given any set of documents to be brought. No website that can give them a list."* Two years, still unresolved.

**Public accounts — 3.** P3 is the strongest: father died Dec 2025, PNB, ₹46,000, no nominee, branch demanded a **surety** — which para 10(a) forbids and which PNB's own website now says is not to be insisted on.

**Absences that must not be fabricated:** P3's branch-visit date is unestablished (Reddit is unfetchable from this environment). HDFC's threshold is unread. ICICI's board-approved policy is not located — and that absence is itself a finding. No testimonials, no user counts, no press, no funding, no team page. Nothing may be invented to fill a layout.

## Product Principles

1. **The verdict comes before the evidence, and never requires scrolling.** Every outcome page runs in one fixed order — the answer, what to do, the evidence, the caveats — so the second page a user reads is already familiar.
2. **Every legal statement traces to a citation record.** Nothing in the UI states a legal position in the product's own voice. If it is in quotation marks, `verbatim` is true.
3. **A null is a better answer than a guess.** Unverified is displayed as unverified, with the date it was checked. Four verified bank rows beat fifteen half-known ones.
4. **The page is the artifact.** Print is a first-class output, not a stylesheet afterthought — the deliverable is a piece of paper in someone's hand at a counter.
5. **"I don't know" is a real answer at every question**, and routes to the safest reading. On Q1 it is the *main* path, not the fallback: most families genuinely do not know whether a nominee was registered.

## Accessibility & Inclusion

- **Phone-first**, on mid-range Android over Indian mobile data.
- Read under stress, by people who are grieving, tired, and often older. Generous type, high contrast, short lines, no dense blocks.
- Must remain fully legible **printed in black and white** — colour may never be the sole carrier of meaning (prescribed vs not-prescribed, verified vs unverified, good news vs bad news all need a non-colour cue).
- Plain English throughout, with every official term glossed on first use.
