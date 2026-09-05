/**
 * The verdicts.
 *
 * Every outcome is a real page at a real URL, so it can be linked, sent to a
 * sibling, or printed and carried to a counter.
 *
 * Structure of every page, always in this order, so it is learnable:
 *   1. the answer, in plain words
 *   2. what to do
 *   3. the evidence — the RBI's own sentence, quoted and numbered
 *   4. the caveats
 *
 * Nothing here asserts a legal position in our own voice. Plain-English lines
 * describe what a clause says; the clause itself is quoted beside it.
 */

import { CLAUSES, SARBATI_DEVI, IN_TRUST } from "./rbi";
import {
  NOMINEE_PROCEDURE,
  SIMPLIFIED_PROCEDURE,
  type DocId,
} from "./documents";

export type OutcomeId =
  | "nominee"
  | "survivorship"
  | "unknown-nominee"
  | "under-threshold"
  | "over-threshold"
  | "dispute"
  | "already-in-court"
  | "out-of-scope";

export type Caveat = {
  title: string;
  body: string;
  /** "hard" caveats are boxed and cannot be collapsed. */
  weight: "hard" | "note";
};

export type Outcome = {
  id: OutcomeId;
  path: string;
  /** The answer, in the fewest possible words. Shown first, largest. */
  verdict: string;
  /** One sentence expanding it. Still plain. */
  summary: string;
  /** Does this outcome mean they should NOT be asked for a succession certificate? */
  goodNews: boolean;
  /** What to do next, in order. */
  steps: string[];
  /** Keys into CLAUSES. Rendered as quotes with paragraph numbers. */
  clauses: (keyof typeof CLAUSES)[];
  documents: DocId[] | null;
  caveats: Caveat[];
  /** Show the 15-day deadline tracker on this page? */
  tracker: boolean;
};

const DISPUTE_CAVEAT: Caveat = {
  title: "If the heirs disagree, this changes",
  body:
    "For a claim without a nominee or survivorship clause, a contesting claim changes the documentation route under paragraph 11(b). A valid nominee's payment route and the heirs' ultimate inheritance rights are different questions. For a disputed nominee claim, get individual advice rather than assuming either route applies automatically.",
  weight: "hard",
};

const EXCLUSIONS_CAVEAT: Caveat = {
  title: "This does not cover PPF, SCSS, MSSC or SSA",
  body:
    "Para 6(b) puts government savings schemes outside these Directions — Public Provident Fund, Senior Citizens' Savings Scheme, Mahila Samman Savings Certificate and Sukanya Samriddhi. Those follow their own scheme rules. Nothing on this page applies to them.",
  weight: "hard",
};

const TRUST_CAVEAT: Caveat = {
  title: "Being paid is not the same as owning it",
  body:
    `The bank is allowed to pay you. That does not make the money yours alone. The Supreme Court held in ${SARBATI_DEVI.case} (${SARBATI_DEVI.citation}) that a nominee is only "${SARBATI_DEVI.text}" — the money still passes to the legal heirs under succession law. The bank pays ${IN_TRUST}. If you are not the only heir, you hold it for the others.`,
  weight: "hard",
};

const NOT_ADVICE: Caveat = {
  title: "This is information, not legal advice",
  body:
    "Everything here is quoted from the RBI's published Directions and from banks' own published policies, with links so you can check each one yourself. It is not advice about your particular case, and it cannot account for facts we do not know.",
  weight: "note",
};

export const OUTCOMES: Record<OutcomeId, Outcome> = {
  nominee: {
    id: "nominee",
    path: "/nominee",
    verdict: "You should not be asked for a succession certificate.",
    summary:
      "A nominee was registered. Where there is a nominee, the RBI says the bank shall not insist on a succession certificate, probate, letter of administration, or any indemnity bond or surety — whatever the amount in the account.",
    goodNews: true,
    steps: [
      "Ask the branch for the claim form for cases with a nomination — the RBI calls it Annex I-A.",
      "Take the death certificate and your own ID.",
      "If the branch asks for anything beyond those, ask them to put the demand in writing and say which rule they rely on.",
    ],
    clauses: ["nomineeNoDocuments", "fifteenDays", "delayCompensation"],
    documents: NOMINEE_PROCEDURE,
    caveats: [TRUST_CAVEAT, DISPUTE_CAVEAT, EXCLUSIONS_CAVEAT, NOT_ADVICE],
    tracker: true,
  },

  survivorship: {
    id: "survivorship",
    path: "/survivorship",
    verdict: "You should not be asked for a succession certificate.",
    summary:
      "This was a joint account with a survivorship clause — 'either or survivor', 'former or survivor', or 'anyone or survivors'. The balance goes to the surviving holder, and the same rule applies as for a nominee: no succession certificate, no probate, no indemnity bond, no surety, whatever the amount.",
    goodNews: true,
    steps: [
      "Ask the branch for the claim form for cases with survivorship — Annex I-A.",
      "Take the death certificate and your own ID.",
      "If more is demanded, ask for the demand in writing with the rule relied on.",
    ],
    clauses: ["nomineeNoDocuments", "fifteenDays", "delayCompensation"],
    documents: NOMINEE_PROCEDURE,
    caveats: [TRUST_CAVEAT, DISPUTE_CAVEAT, EXCLUSIONS_CAVEAT, NOT_ADVICE],
    tracker: true,
  },

  "unknown-nominee": {
    id: "unknown-nominee",
    path: "/unknown-nominee",
    verdict: "First, ask the bank to confirm the nominee or survivorship details.",
    summary:
      "The bank can check the account-opening records. This is an important starting point, but payment also depends on the applicable conditions, including any court restriction.",
    goodNews: false,
    steps: [
      "Ask the branch, in writing: was a nominee registered on this account? Ask for the answer in writing too.",
      "For payment to a valid nominee, the bank checks identity, death and any court restriction. On a joint account, the nominee's right arises after all depositors have died.",
      "If there is no nominee or applicable survivorship clause, check will status, disputes, court restrictions, bank type and the total including interest before choosing a checklist.",
    ],
    clauses: ["nomineeNoDocuments", "simplifiedPurpose"],
    documents: null,
    caveats: [EXCLUSIONS_CAVEAT, NOT_ADVICE],
    tracker: false,
  },

  "under-threshold": {
    id: "under-threshold",
    path: "/no-nominee/under-threshold",
    verdict: "You should not be asked for a succession certificate.",
    summary:
      "If there is no nominee or survivorship clause, no will, no contesting claim and no restraining court order, the below-threshold route uses the documents in paragraph 10(a). A succession certificate is not on that list. Confirm the aggregate, including interest, and the bank's applicable threshold.",
    goodNews: true,
    steps: [
      "Ask the branch for the simplified-procedure claim form — the RBI calls it Annex I-B.",
      "Work through the six documents below. Start the legal heir certificate first; it takes the longest.",
      "Ask whether the bank will accept a declaration about the heirs — Annex I-E — instead of the certificate. Para 10(a) allows either, and the declaration is much faster.",
      "No third person has to stand as surety. If one is demanded, ask for that demand in writing.",
    ],
    clauses: [
      "simplifiedPurpose",
      "simplifiedMandate",
      "noSurety",
      "threshold",
      "fifteenDays",
      "delayCompensation",
    ],
    documents: SIMPLIFIED_PROCEDURE,
    caveats: [
      {
        title: "No will or restraining court order",
        body: "This simplified no-nominee checklist assumes no will was left and no court order restricts payment. A will, dispute or court restriction needs a separate check before you rely on this route.",
        weight: "hard",
      },
      {
        title: "The threshold is the total, not one account",
        body:
          "Para 10(a) applies where the aggregate amount payable, including accrued interest, is less than the threshold limit. Several accounts at the same bank are added together against one limit. Accounts at different banks are separate claims with separate limits.",
        weight: "hard",
      },
      DISPUTE_CAVEAT,
      EXCLUSIONS_CAVEAT,
      NOT_ADVICE,
    ],
    tracker: true,
  },

  "over-threshold": {
    id: "over-threshold",
    path: "/no-nominee/over-threshold",
    verdict: "A larger claim has more than one documentation route.",
    summary:
      "Where there is no nominee or survivorship clause, no will, no dispute and no restraining order, paragraph 10(b) provides alternatives for claims above the threshold. A succession certificate is one route, not automatically the only route. Ask the bank for its written requirements.",
    goodNews: false,
    steps: [
      "Check the total carefully. The threshold applies to the aggregate at one bank — accounts at different banks are separate claims, each with its own limit, and each may fall below it.",
      "Check the bank's own threshold: the RBI floor is ₹5 lakh for co-operative banks and ₹15 lakh for other banks. A bank may set a higher limit.",
      "Ask the branch whether it will accept a legal heir certificate or an affidavit sworn before an official instead — para 10(b) mentions both.",
      "If court documents are needed, consult a qualified lawyer about the applicable procedure, cost and timing. Do not assume a fixed completion time.",
    ],
    clauses: ["aboveThreshold", "threshold"],
    documents: null,
    caveats: [
      {
        title: "Check whether it is really above the line",
        body:
          "Two things move claims below the threshold more often than people expect: accounts held at different banks are counted separately, and an individual bank may have set its own limit higher than the RBI's ₹15 lakh floor.",
        weight: "hard",
      },
      EXCLUSIONS_CAVEAT,
      NOT_ADVICE,
    ],
    tracker: false,
  },

  dispute: {
    id: "dispute",
    path: "/dispute",
    verdict: "Where the heirs are in dispute, a court document can be required.",
    summary:
      "The simplified procedure assumes the family agrees. Where there are contesting claims among the legal heirs, para 11(b) says the bank requires a probate, letter of administration, succession certificate or court order — whatever the amount, and whether or not a nominee was registered.",
    goodNews: false,
    steps: [
      "If the disagreement can be resolved, the simplified route may reopen. It is worth establishing whether there is a real contest or only an unanswered question.",
      "If a nominee was registered, the bank may still be able to pay the nominee — but the money is held in trust for all the heirs, and paying it does not settle who owns it.",
      "Where the dispute is real, this stops being an information problem. Take advice.",
    ],
    clauses: ["dispute", "courtOrder"],
    documents: null,
    caveats: [EXCLUSIONS_CAVEAT, NOT_ADVICE],
    tracker: false,
  },

  "already-in-court": {
    id: "already-in-court",
    path: "/already-in-court",
    verdict: "The rules changed on 31 March 2026 — possibly after your case began.",
    summary:
      "If you started down the court route before then, the ground has moved since. We are not going to tell you what to do about a case that is already running. We can tell you what changed, so you can put it to your lawyer.",
    goodNews: false,
    steps: [
      "Read the clauses below and take them to whoever is advising you.",
      "Ask one question: given these Directions, does the bank still require a succession certificate in our case?",
      "Ask your lawyer to consider nomination or survivorship, any will or court restriction, disputes between heirs, and the bank's applicable threshold and aggregate payable.",
    ],
    clauses: [
      "implementation",
      "nomineeNoDocuments",
      "simplifiedPurpose",
      "simplifiedMandate",
      "dispute",
    ],
    documents: null,
    caveats: [
      {
        title: "We are not telling you to withdraw anything",
        body:
          "A case that is already before a court is not something this site can advise on, and nothing here should be read as suggesting you drop it. The clauses are here so you can ask your own lawyer whether they change your position.",
        weight: "hard",
      },
      NOT_ADVICE,
    ],
    tracker: false,
  },

  "out-of-scope": {
    id: "out-of-scope",
    path: "/out-of-scope",
    verdict: "This is outside what we cover.",
    summary:
      "This MVP guides adults claiming a deceased adult's bank deposits. Lockers, safe custody, pensions, government savings schemes and other assets need separate procedures. Do not use the deposit checklist for them.",
    goodNews: false,
    steps: [
      "For a locker or articles in safe custody, ask the bank for its deceased-hirer access and inventory procedure under paragraphs 16–26 of the RBI directions.",
      "Government or family pension: the deceased's own department or treasury office, under the relevant state or central pension rules.",
      "Provident fund: EPFO. Insurance: the insurer, or Bima Bharosa at IRDAI. Mutual funds: the AMC or its registrar. Shares and dividends: the company's registrar, or IEPF.",
      "Where a claimant is a minor, or a guardian is acting on their behalf, take advice before signing anything.",
    ],
    clauses: ["exclusions"],
    documents: null,
    caveats: [
      {
        title: "One thing we will not comment on",
        body:
          "If you have been told you can operate the deceased person's account through their Aadhaar, UPI or net banking, that is outside anything this site covers and we do not advise on it. The account is meant to be frozen once the bank is told of the death.",
        weight: "hard",
      },
      NOT_ADVICE,
    ],
    tracker: false,
  },
};

export const ALL_OUTCOMES = Object.values(OUTCOMES);
