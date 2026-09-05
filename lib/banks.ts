/**
 * The bank table — the moat.
 *
 * The RBI sets a floor. Each bank sets its own practice on top of it, and the
 * practices differ. This table is the only place those differences are collected.
 *
 * HONESTY RULE, non-negotiable:
 * Every field is either read from that bank's own published page or PDF, or it
 * is `null`. There is no inference, no "probably ₹15 lakh because that's the
 * RBI floor", no filling a gap with a reasonable guess. A null renders as
 * "we haven't verified this — ask your bank" and that is a perfectly good answer.
 *
 * Getting a row wrong sends a grieving person to a counter with a false
 * document. Four verified rows beat fifteen half-known ones.
 */

export type Verification = "published" | "unverified";

export type Bank = {
  id: string;
  name: string;
  short: string;
  type: "commercial" | "cooperative";

  /** The bank's OWN threshold. null = not verified. Never inferred from the RBI floor. */
  thresholdRupees: number | null;
  thresholdLabel: string | null;

  /** Does it say no third-party surety below the threshold? null = not verified. */
  noSuretyBelowThreshold: boolean | null;
  /** Their exact wording, if published. Rendered as a quote. */
  suretyQuote: string | null;

  /** Their stated settlement turnaround, if published. */
  turnaround: string | null;

  claimFormNames: string[] | null;
  claimFormUrl: string | null;
  policyUrl: string | null;
  /** Their deceased-claim landing page. */
  pageUrl: string | null;
  /** Online claim lodging, where one exists. */
  onlineClaimUrl: string | null;

  /** From 31 Mar 2026 banks must publish policy and checklist. Blank = a rule breach. */
  policyPublished: Verification;

  /**
   * A DOCUMENTED, dated instance of this bank's own branch practice not
   * matching what its published policy says — never an inference from a
   * single undated complaint. null unless we have a source we would print.
   * See P3 in the Research Log for why PNB is not yet set: the branch-visit
   * date needed to call it a genuine post-policy conflict is still
   * unconfirmed, so the honesty rule keeps this null until it is.
   */
  practiceConflict: string | null;

  /** Anything specific and verified worth telling the claimant. */
  notes: string[];

  /** ISO date this row was last checked against the source. */
  verifiedOn: string;
};

/** A verification older than this is flagged, not silently trusted. */
export const STALE_AFTER_DAYS = 182;

/** True once a row's `verifiedOn` is more than six months old. */
export function isStale(verifiedOn: string): boolean {
  const ageMs = Date.now() - new Date(verifiedOn).getTime();
  return ageMs > STALE_AFTER_DAYS * 24 * 60 * 60 * 1000;
}

const TODAY = "2026-09-03";

export const BANKS: Bank[] = [
  {
    id: "sbi",
    name: "State Bank of India",
    short: "SBI",
    type: "commercial",
    thresholdRupees: 1_500_000,
    thresholdLabel: "₹15 lakh",
    noSuretyBelowThreshold: true,
    suretyQuote:
      "Bank has introduced Simplified Procedure (where nomination is not registered) for settlement of deceased cases for bank deposits without surety upto ₹15.00 lacs.",
    turnaround: null,
    claimFormNames: ["Annex I-A", "Annex I-B", "Annex I-C", "Annex I-D"],
    claimFormUrl:
      "https://sbi.bank.in/documents/16012/22770835/18122025_Revised+Deceased+Claim+Forms+for+Deposits+and+Safe+Deposit+Lockers.pdf",
    policyUrl: null,
    pageUrl:
      "https://sbi.bank.in/web/personal-banking/information-services/deceased-settlement",
    onlineClaimUrl: "https://crcf.bank.sbi/ccf/Home/ClaimRequest",
    policyPublished: "published",
    practiceConflict: null,
    notes: [
      "SBI states it revised deceased claim settlement with effect from 16 December 2025, and issued revised claim forms effective 18 December 2025 — ahead of the RBI's 31 March 2026 deadline.",
      "Its forms use the same Annex I-A / I-B / I-C / I-D names as the RBI's annexures, so you can ask for them by name.",
      "Above ₹15 lakh, SBI states a surety is required.",
      "Locker and loan claims are settled at the home branch only.",
      "Government savings schemes — SCSS, PPF, MSSC, SSA — are excluded.",
    ],
    verifiedOn: TODAY,
  },

  {
    id: "pnb",
    name: "Punjab National Bank",
    short: "PNB",
    type: "commercial",
    thresholdRupees: 1_500_000,
    thresholdLabel: "₹15 lakh",
    noSuretyBelowThreshold: true,
    suretyQuote:
      "No bond of surety from a third-party is to be insisted in case of claims up to the threshold limit.",
    turnaround:
      "The Bank shall settle claims within 15 calendar days from receipt of all required documents from claimants.",
    claimFormNames: [
      "Claim Form – With Nomination / Survivorship",
      "Claim Form – Without Nomination",
    ],
    claimFormUrl: null,
    policyUrl: null,
    pageUrl: "https://pnb.bank.in/Deceased-Claim-cases.html",
    onlineClaimUrl: null,
    policyPublished: "published",
    practiceConflict: null,
    notes: [
      "PNB's page states it follows the RBI Directions 2025.",
      "Below the threshold with no nomination, its published list is the same six documents the RBI prescribes: claim form, death certificate, ID, indemnity bond, disclaimer from non-claimant heirs, and a legal heir certificate or a declaration.",
      "A real account describes a PNB branch demanding a family-tree document, an affidavit and a third-party surety on a ₹46,000 no-nominee claim — a surety para 10(a) says shall not be obtained below the threshold. The visit date isn't confirmed and most likely predates 31 March 2026, so this shows practice before the compliance deadline, not a current breach of PNB's own published page above.",
    ],
    verifiedOn: TODAY,
  },

  {
    id: "hdfc",
    name: "HDFC Bank",
    short: "HDFC",
    type: "commercial",
    // Still NOT set to 1_500_000. The claim-form PDF (below) 403s to a
    // non-browser fetch, so its "relationship value up to Rs 50 Lacs" title
    // remains unread and unconfirmed — this stays null rather than guessed,
    // same reasoning as before, now actually re-tested on 5 Sep 2026.
    thresholdRupees: null,
    thresholdLabel: null,
    // Read directly from HDFC's own policy PDF on 5 Sep 2026 — the document
    // repeats the RBI's own sentence rather than paraphrasing it.
    noSuretyBelowThreshold: true,
    suretyQuote:
      "No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit.",
    turnaround:
      "Branches should settle the claims... within a period not exceeding 15 calendar days... In the case of accounts without survivor / nominee clause the claim should be settled within 1 month from the date on which the requisite documents have been submitted.",
    claimFormNames: [
      "Annex I-A (with nomination or survivorship)",
      "Annex I-B (fast track, no nomination)",
      "Annex I-C (bond of indemnity)",
      "Annex I-D (letter of disclaimer / no objection)",
      "Annex I-E (legal heir declaration or affidavit)",
    ],
    claimFormUrl:
      "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?path=/Footer/Resource/Forms+Centre/Content/Detail+Page/Forms+Center+-personal/No-nomination-based-deceased-Claim-settlement-for-relationship-value-upto-to-Rs-50-Lacs.pdf",
    policyUrl:
      "https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/personal-banking/discover-products/our-corporate-commitment/Deceased_Claim_Process_CASA_and_Deposits.pdf",
    pageUrl: null,
    onlineClaimUrl: null,
    policyPublished: "published",
    practiceConflict: null,
    notes: [
      "HDFC publishes a Deceased Claim Process document dated March 2026, and its Fast Track (no-nomination) document list matches the RBI's six exactly — same Annex I-A to I-E names as SBI and PNB use.",
      "It states the Directions do not apply to government savings schemes such as SCSS and PPF, which follow their own scheme rules.",
      "Its own document states 1 month for a no-nominee claim, not 15 days — longer than the RBI's own 15-day rule in para 31, which does not distinguish nominee from no-nominee cases. This is HDFC's own published wording, not a branch report — worth asking about directly if a claim without a nominee is running past 15 days.",
      "Its no-nomination claim form is titled for relationship value up to ₹50 lakh. If confirmed, that is a threshold well above the RBI's ₹15 lakh floor — para 7(h) allows a bank to set a higher limit. The form itself 403s to a non-browser fetch, so this remains unread and unconfirmed — ask HDFC directly rather than treating the title as settled.",
    ],
    verifiedOn: "2026-09-05",
  },

  {
    id: "icici",
    name: "ICICI Bank",
    short: "ICICI",
    type: "commercial",
    // Read directly from ICICI's own Annex 3 (Bond of Indemnity/Surety) form
    // on 5 Sep 2026: "Surety is applicable for cases where the settlement
    // amount is above the threshold limit (2 Crore and above)." Far above
    // the RBI's ₹15 lakh floor — the largest gap of any bank checked so far.
    thresholdRupees: 20_000_000,
    thresholdLabel: "₹2 crore",
    noSuretyBelowThreshold: true,
    suretyQuote:
      "Surety is applicable for cases where the settlement amount is above the threshold limit (2 Crore and above).",
    turnaround: null,
    claimFormNames: [
      "Annex 2 (claim form, no nominee or survivorship)",
      "Annex 3 (bond of indemnity, or indemnity + surety above ₹2 crore)",
      "Annex 4 (letter of disclaimer / no objection)",
      "Annex 5 (declaration or affidavit regarding legal heirs)",
    ],
    claimFormUrl:
      "https://www.icicibank.com/content/dam/icicibank/india/managed-assets/docs/pdf/annex-2-claim-form-for-accounts-without-nominee-and-survivorship_clause.pdf",
    policyUrl: null,
    pageUrl: "https://www.icicibank.com/form-center.page",
    onlineClaimUrl: null,
    policyPublished: "unverified",
    practiceConflict: null,
    notes: [
      "ICICI's own claim form (Annex 2) matches the RBI's document logic: death certificate, ID, bond of indemnity, letter of disclaimer from non-claimant heirs, and a legal heir certificate or declaration — the same structure as the RBI's six, under ICICI's own Annex numbering rather than the RBI's Annex I-A to I-E letters.",
      "The URL originally listed for ICICI's claim form (application-for-deceased-claim.pdf) returns HTTP 200 with 0 bytes as of 5 Sep 2026 — confirmed by direct request with headers, a genuinely empty file on ICICI's own server, not a fetch error. The working links above were found via ICICI's Form Centre page instead.",
      "We have not located a published board-approved deceased-claim POLICY document (as HDFC, SBI and PNB each have) — only these individual claim forms. From 31 March 2026 banks are required to publish one. Ask ICICI for it in writing.",
    ],
    verifiedOn: "2026-09-05",
  },

  {
    id: "bob",
    name: "Bank of Baroda",
    short: "BoB",
    type: "commercial",
    // Read from BoB's own deceased-claim page on 5 Sep 2026.
    thresholdRupees: 1_500_000,
    thresholdLabel: "₹15 lakh",
    noSuretyBelowThreshold: true,
    suretyQuote:
      "No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit.",
    turnaround:
      "within a period not exceeding 15 calendar days from the date of receipt of all the required documents",
    claimFormNames: [
      "Annex I-A (with nomination)",
      "Annex I-B (without nomination)",
      "Annex I-C (indemnity/surety bond)",
      "Annex I-D (disclaimer/no objection)",
      "Annex I-E (declaration/affidavit)",
      "Annex I-F (locker inventory)",
      "Annex I-G (safe custody inventory)",
      "Annex I-H (locker delivery indemnity)",
    ],
    claimFormUrl: null,
    policyUrl: null,
    pageUrl: "https://bankofbaroda.bank.in/personal-banking/other-services/settlement-of-claims",
    onlineClaimUrl: null,
    policyPublished: "published",
    practiceConflict: null,
    notes: [
      "Of the four banks added 5 Sep 2026, BoB is the only one whose published wording matches the RBI's ₹15 lakh floor exactly, with the same verbatim no-surety sentence and the same Annex I-A to I-E naming as SBI, PNB and HDFC — extended further with its own I-F to I-H for lockers.",
      "Above ₹15 lakh, BoB's own page says it may ask for a bond of surety from third parties (which may include non-claimant legal heirs) — consistent with para 10(b).",
    ],
    verifiedOn: "2026-09-05",
  },

  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    short: "Kotak",
    type: "commercial",
    // Read directly from Kotak's own "Documentation Required for Claim
    // Settlement — Without Nomination" sheet on 5 Sep 2026. This is Kotak's
    // OWN number, not the RBI floor — and it is LOWER than the RBI's ₹15
    // lakh, not higher. Left as its own field, not folded into
    // practiceConflict: this is Kotak's published document requiring more
    // than the RBI mandates, not a branch ignoring a policy.
    thresholdRupees: 1_000_000,
    thresholdLabel: "₹10 lakh",
    noSuretyBelowThreshold: null,
    suretyQuote: null,
    turnaround: "Usual turnaround time of processing a claim — 15 days",
    claimFormNames: [
      "Annexure 1 (request letter)",
      "Annexure 2 (declaration-cum-request, survivor)",
      "Annexure 3 (declaration-cum-request, joint)",
      "Annexure 4 (receipt)",
      "Annexure 6 (undertaking-cum-indemnity + NOC)",
      "Annexure 15 (NOC for premature FD withdrawal)",
    ],
    claimFormUrl:
      "https://www.kotak.bank.in/content/dam/Kotak/others/Claim-Settlement-without-nomination.pdf",
    policyUrl: null,
    pageUrl: "https://www.kotak.bank.in/en/customer-service/important-customer-information/deceased-claim.html",
    onlineClaimUrl: null,
    policyPublished: "unverified",
    practiceConflict: null,
    notes: [
      "🔴 Kotak's own documentation sheet requires a Probate, Letters of Administration or Succession Certificate once a single-holder no-nomination claim exceeds ₹10 lakh — below the RBI's ₹15 lakh floor, not above it. For a claim between ₹10 lakh and ₹15 lakh, this is Kotak's own document asking for more than paragraph 10(a) permits.",
      "The sheet is undated — we could not confirm whether it has been revised since the RBI's 2025 Directions took effect. Worth asking Kotak directly whether this figure has changed before relying on it.",
      "No board-approved policy narrative document was found — only this documentation sheet and the claim forms it references.",
    ],
    verifiedOn: "2026-09-05",
  },

  {
    id: "axis",
    name: "Axis Bank",
    short: "Axis",
    type: "commercial",
    thresholdRupees: null,
    thresholdLabel: null,
    noSuretyBelowThreshold: null,
    suretyQuote: null,
    turnaround:
      "within a period not exceeding 15days from the date of receipt of the claim... In the case of accounts without survivor/ nominee clause the claim should be settled within 1 month",
    claimFormNames: [
      "Annex VI (claim form, no nominee/survivorship)",
      "Annex VII (bond of indemnity/surety)",
    ],
    claimFormUrl:
      "https://www.axis.bank.in/docs/default-source/default-document-library/download-document/personal/accounts/deceased-claim-form-for-accounts-without-nominee--or-survivorship-clause.pdf",
    policyUrl:
      "https://www.axis.bank.in/docs/default-source/comprehensive-notice-board/important-notices/bank's-policies/policy-on-settlement-of-claims-in-respect-of-deceased-depositors.pdf",
    pageUrl: null,
    onlineClaimUrl: null,
    policyPublished: "published",
    practiceConflict: null,
    notes: [
      "🔴 Axis's own published policy document is dated October 2023 — before the RBI's 2025 Directions existed — and its full text never mentions them. Read directly: it still describes indemnity thresholds of its own (unstamped up to ₹1,000, stamped above that, a third-party surety once a no-nomination claim exceeds ₹10,000) that are far below the RBI's ₹15 lakh no-surety floor and were written for an older framework.",
      "Its Annex VI/VII claim forms use the RBI's newer Annex-letter naming convention (matching SBI, PNB, HDFC, BoB), which the 2023 policy document does not — suggesting the forms have been updated more recently than the policy narrative that is meant to explain them. That gap between an old policy PDF and newer forms is itself worth asking Axis about directly.",
      "The bond of indemnity/surety form (Annex VII) says surety applies 'only in case of claims above the threshold limit' without stating a number — unlike ICICI's equivalent form, no rupee figure could be confirmed.",
    ],
    verifiedOn: "2026-09-05",
  },

  {
    id: "canara",
    name: "Canara Bank",
    short: "Canara",
    type: "commercial",
    // Read from Canara's own 15-page "Death Claim Settlement Policy for the
    // FY 2025-26" (Version 4.00). Canara runs its own tiered structure, not
    // the RBI's single ₹15 lakh line — see notes.
    thresholdRupees: 500_000,
    thresholdLabel: "₹5 lakh (Canara's own indemnity-cum-surety line — see notes)",
    noSuretyBelowThreshold: false,
    suretyQuote:
      "Where the Claim amount is above Rs. 5 Lakhs, the Claimants will have to furnish Indemnity cum Surety in the prescribed formats from two persons who shall be other than claimants, who are good for the amount.",
    turnaround:
      "within a period not exceeding 15 days from the date of receipt of the claim",
    claimFormNames: ["NF 1020 (application for settlement of claim of deceased constituents)"],
    claimFormUrl: "https://csis.canarabank.bank.in/DCS_WEB/Content/PDF/NF-1020-(English).pdf",
    policyUrl: "https://www.canarabank.bank.in/documents/d/guest/5-death-claim-settlement-policy",
    pageUrl: null,
    onlineClaimUrl: "https://canarabankcsis.in/DCS_WEB/",
    policyPublished: "published",
    practiceConflict: null,
    notes: [
      "🔴 Canara's own current policy (Version 4.00, for FY 2025-26 — read in full, all 15 pages) does not mention the RBI's 2025 Directions anywhere, and runs a different, older tiered structure entirely: claims up to ₹10,000 settle to any claimant with minimal formality; ₹10,000–₹50,000 may still need indemnity/surety at the bank's discretion; above ₹50,000 needs the full application, and a third-party indemnity-cum-surety becomes mandatory above ₹5 lakh — a fraction of the RBI's ₹15 lakh no-surety floor.",
      "Nomination and survivorship claims are unaffected by any of this: Canara settles those at branch level 'irrespective of the amount,' matching para 9. The gap is specifically in the no-nominee route.",
      "This isn't a branch ignoring head office policy — it's what Canara's own head-office document, current for this financial year, itself says. Worth a direct question to Canara about whether this policy has been updated to reflect the 2025 Directions.",
    ],
    verifiedOn: "2026-09-05",
  },
];

export function getBank(id: string): Bank | undefined {
  return BANKS.find((b) => b.id === id);
}

/**
 * The gap-flagged notes for a bank — the ones marked 🔴 in `notes` above,
 * meaning this bank's own published practice asks for more than the RBI
 * rule requires. Used to surface the gap above the fold on the verdict
 * page, not just inside the folded bank panel — a claimant picking a bank
 * with a real gap should see it before they need to expand anything.
 */
export function policyGapNotes(bank: Bank): string[] {
  return bank.notes.filter((n) => n.startsWith("🔴"));
}

/**
 * The threshold that applies to a claimant, and how confident we are.
 * Falls back to the RBI floor for the bank TYPE, clearly labelled as the floor
 * rather than as that bank's own figure.
 */
export function thresholdFor(bank: Bank | undefined): {
  rupees: number;
  label: string;
  source: "bank" | "rbi-floor";
} {
  if (bank?.thresholdRupees && bank.thresholdLabel) {
    return {
      rupees: bank.thresholdRupees,
      label: bank.thresholdLabel,
      source: "bank",
    };
  }
  const cooperative = bank?.type === "cooperative";
  return {
    rupees: cooperative ? 500_000 : 1_500_000,
    label: cooperative ? "₹5 lakh" : "₹15 lakh",
    source: "rbi-floor",
  };
}
