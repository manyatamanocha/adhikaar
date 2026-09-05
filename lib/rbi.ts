/**
 * Single source of truth for every citation in the product.
 *
 * SAFETY RULE: quote and cite, never assert. Nothing in the UI may state a
 * legal position in our own voice. Everything traces back to an entry here.
 *
 * `verbatim: true` means the text was read from the notification itself and
 * may be rendered inside quotation marks. `verbatim: false` means it is our
 * summary of a paragraph and must NEVER be rendered as a quote.
 *
 * Ellipses inside verbatim text mark omitted words, not paraphrase.
 */

export const NOTIFICATION = {
  title:
    "Reserve Bank of India (Settlement of Claims in respect of Deceased Customers of Banks) Directions, 2025",
  number: "RBI/2025-26/82",
  ref: "DoR.MCS.REC.50/01.01.003/2025-26",
  issued: "26 September 2025",
  url: "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12901&Mode=0",
} as const;

/**
 * The date every clause below was last read against the notification text
 * itself (not the date it was issued). One date for the whole file: every
 * clause was checked in the same research pass, on 3 September 2026, and
 * nothing has changed here since — a per-clause date would imply
 * independent re-checks that never happened.
 */
export const RULES_VERIFIED_ON = "2026-09-03";

export type Clause = {
  para: string;
  label: string;
  text: string;
  verbatim: boolean;
};

export const CLAUSES = {
  /** Nominee / survivorship. Unconditional — no threshold, no heir test. */
  nomineeNoDocuments: {
    para: "9",
    label: "Nominee or survivor — no legal documents, any amount",
    text:
      "Payment made to the nominee(s)/ survivor(s)… shall constitute a full and valid discharge of a bank's liability. Therefore… the bank shall not insist on production of legal documents such as Succession Certificate, Letter of Administration, Probate of Will, etc., or seek any bond of indemnity/ surety from the nominee(s)/ survivor(s)/ third-party, irrespective of the amount standing to the credit.",
    verbatim: true,
  },

  /** The simplified procedure's stated purpose. The best framing quote available. */
  simplifiedPurpose: {
    para: "10",
    label: "Simplified Procedure for settlement of claims",
    text:
      "Keeping in view the imperative need to avoid inconvenience and undue hardship to the legal heir(s)/ claimant(s), a bank shall follow a simplified procedure for settlement of claims in respect of deposit accounts where the aggregate amount payable, including accrued interest, as on the date of the application is less than the threshold limit, provided…",
    verbatim: true,
  },

  /** The mandate. Stronger than a prohibition — the bank is REQUIRED to settle on a closed list. */
  simplifiedMandate: {
    para: "10(a)",
    label: "The bank must settle on a fixed list of documents",
    text: "The bank shall settle the claim up to the threshold limit based on…",
    verbatim: true,
  },

  noSurety: {
    para: "10(a)",
    label: "No third-party surety below the threshold",
    text:
      "No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit.",
    verbatim: true,
  },

  aboveThreshold: {
    para: "10(b)",
    label: "At or above the threshold",
    text:
      "For claims at or above the threshold limit, the bank may require a Succession Certificate or equivalent legal documentation, or a Legal Heir Certificate or affidavit sworn before an official.",
    verbatim: false,
  },

  threshold: {
    para: "7(h)",
    label: "Threshold limit",
    text:
      "'Threshold limit' means ₹5 lakh in case of a co-operative bank and ₹15 lakh in case of any other bank or such higher limit as may be fixed by the bank including a co-operative bank.",
    verbatim: true,
  },

  dispute: {
    para: "11(b)",
    label: "Where the heirs disagree",
    text:
      "Where there are contesting claims or a dispute amongst the legal heir(s) or beneficiaries of a Will, the bank requires a Probate of Will, Letter of Administration, Succession Certificate or a court order or decree, as applicable.",
    verbatim: false,
  },

  courtOrder: {
    para: "8(ii)",
    label: "Where a court has restrained payment",
    text:
      "there is no order from the competent court in the knowledge of the bank, as on the date of settlement/ payment, restraining the nominee(s)/ survivor(s)",
    verbatim: true,
  },

  fifteenDays: {
    para: "31",
    label: "Settlement deadline",
    text:
      "within a period not exceeding 15 calendar days from the date of receipt of all the required documents",
    verbatim: true,
  },

  delayCompensation: {
    para: "33",
    label: "Compensation if the bank is late",
    text:
      "Where the delay is attributable to the bank, compensation is payable as interest at Bank Rate + 4% per annum on the amount of settlement. For safe deposit lockers and articles in safe custody, ₹5,000 for each day of delay.",
    verbatim: false,
  },

  postDeathCredits: {
    para: "12",
    label: "Money credited after the death",
    text:
      "Post settlement… any credit received in the name of a deceased depositor, the bank shall return the same to the remitter with the remark 'Account holder deceased.'",
    verbatim: true,
  },

  implementation: {
    para: "5",
    label: "When it took effect",
    text:
      "Instructions issued vide these Directions shall be implemented as expeditiously as possible but not later than March 31, 2026.",
    verbatim: true,
  },

  exclusions: {
    para: "6(b)",
    label: "What these Directions do NOT cover",
    text:
      "Government savings schemes — Public Provident Fund (PPF), Senior Citizens' Savings Scheme (SCSS), Mahila Samman Savings Certificate (MSSC) and Sukanya Samriddhi Account (SSA) — are outside the scope of these Directions.",
    verbatim: false,
  },
} as const satisfies Record<string, Clause>;

/**
 * Supreme Court, not RBI. Load-bearing on every nominee and survivorship page.
 *
 * Without this a nominee reads "the money is released to you" as "the money is
 * yours" — and walks into the family dispute this product exists to prevent.
 */
export const SARBATI_DEVI = {
  case: "Sarbati Devi v. Usha Devi",
  citation: "AIR 1984 SC 346",
  court: "Supreme Court of India",
  text: "the hand which is authorised to receive the amount",
  verbatim: true,
  plain:
    "A nominee is the person the bank is allowed to pay. They do not become the owner. The money still belongs to the legal heirs under succession law, and a nominee who is not the sole heir holds it in trust for the others.",
} as const;

/** RBI's own framing of what payment to a claimant means. Use verbatim. */
export const IN_TRUST =
  "in trust for all legal heirs, and not as an adjudication of succession rights";

export const THRESHOLDS = {
  commercial: 1_500_000,
  cooperative: 500_000,
  commercialLabel: "₹15 lakh",
  cooperativeLabel: "₹5 lakh",
} as const;

/** Escalation route. Free, real, and not a guarantee — see ombudsmanCaveat. */
export const ESCALATION = {
  scheme: "Reserve Bank – Integrated Ombudsman Scheme, 2026 (RB-IOS 2026)",
  portal: "https://cms.rbi.org.in",
  email: "cpc@rbi.org.in",
  post: "Centralised Receipt and Processing Centre, 4th Floor, Sector 17, Chandigarh 160017",
  waitDays: 30,
  caveat:
    "Complain to your bank's Grievance Redressal Officer in writing first, and give them 30 days. This route is free — but it is not a guarantee. In 2024-25, 40.78% of complaints the Ombudsman accepted were dismissed on the view that there was no deficiency in service.",
} as const;

/**
 * Procedural tactics. Not legal advice — each one is a step the claimant
 * takes themselves, and each closes a specific, documented failure.
 */
export const TACTICS = [
  {
    title: "Ask the branch in writing whether a nomination exists",
    detail:
      "The bank can see this in the account-opening records. Ask for the answer in writing. It decides which of the paths below applies to you, and most families do not know it.",
  },
  {
    title: "If a document is demanded, ask for the demand in writing",
    detail:
      "Ask the officer to state, on paper, which document they require and which rule they rely on. This is a reasonable request and it frequently ends the demand by itself.",
  },
  {
    title: "Get a dated acknowledgement when you submit",
    detail:
      "The 15-day clock starts only when the bank holds a complete set of documents. Get the submission acknowledged with a date. If staff will not acknowledge it, send the documents by registered post and keep the receipt.",
  },
  {
    title: "Expect the clock's start date to be disputed",
    detail:
      "The common way a deadline is avoided is to raise a fresh document objection so the file is never 'complete'. Your dated acknowledgement is the answer to that.",
  },
] as const;
