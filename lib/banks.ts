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

  /** Anything specific and verified worth telling the claimant. */
  notes: string[];

  /** ISO date this row was last checked against the source. */
  verifiedOn: string;
};

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
    notes: [
      "PNB's page states it follows the RBI Directions 2025.",
      "Below the threshold with no nomination, its published list is the same six documents the RBI prescribes: claim form, death certificate, ID, indemnity bond, disclaimer from non-claimant heirs, and a legal heir certificate or a declaration.",
    ],
    verifiedOn: TODAY,
  },

  {
    id: "hdfc",
    name: "HDFC Bank",
    short: "HDFC",
    type: "commercial",
    // NOT set to 1_500_000. HDFC's own no-nomination claim form is titled for
    // relationship value up to ₹50 lakh, which would be far above the RBI floor.
    // Not yet read from the form itself, so it stays null rather than guessed.
    thresholdRupees: null,
    thresholdLabel: null,
    noSuretyBelowThreshold: null,
    suretyQuote: null,
    turnaround: null,
    claimFormNames: null,
    claimFormUrl:
      "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?path=/Footer/Resource/Forms+Centre/Content/Detail+Page/Forms+Center+-personal/No-nomination-based-deceased-Claim-settlement-for-relationship-value-upto-to-Rs-50-Lacs.pdf",
    policyUrl:
      "https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/personal-banking/discover-products/our-corporate-commitment/Deceased_Claim_Process_CASA_and_Deposits.pdf",
    pageUrl: null,
    onlineClaimUrl: null,
    policyPublished: "published",
    notes: [
      "HDFC publishes a Deceased Claim Process document dated March 2026.",
      "It states the Directions do not apply to government savings schemes such as SCSS and PPF, which follow their own scheme rules.",
      "Its no-nomination claim form is titled for relationship value up to ₹50 lakh. If confirmed, that is a threshold well above the RBI's ₹15 lakh floor — para 7(h) allows a bank to set a higher limit. We have not yet read this from the form itself, so we do not state it as fact. Ask HDFC directly.",
    ],
    verifiedOn: TODAY,
  },

  {
    id: "icici",
    name: "ICICI Bank",
    short: "ICICI",
    type: "commercial",
    thresholdRupees: null,
    thresholdLabel: null,
    noSuretyBelowThreshold: null,
    suretyQuote: null,
    turnaround: null,
    claimFormNames: ["Application for Deceased Claim"],
    claimFormUrl:
      "https://www.icicibank.com/managed-assets/docs/form-center/application-for-deceased-claim.pdf",
    policyUrl: null,
    pageUrl: null,
    onlineClaimUrl: null,
    policyPublished: "unverified",
    notes: [
      "ICICI publishes an Application for Deceased Claim form.",
      "We have not located a published board-approved deceased claim policy stating its own threshold or its position on third-party surety. From 31 March 2026 banks are required to publish this. Ask ICICI for it in writing.",
    ],
    verifiedOn: TODAY,
  },
];

export function getBank(id: string): Bank | undefined {
  return BANKS.find((b) => b.id === id);
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
