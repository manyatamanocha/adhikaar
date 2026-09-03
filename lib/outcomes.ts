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
    "Everything on this page assumes the family is not in dispute. Where there are contesting claims among the legal heirs, para 11(b) says the bank requires a probate, letter of administration, succession certificate or court order. That overrides the rest of this page.",
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
    verdict: "Ask the bank one question first. It decides everything else.",
    summary:
      "Most families do not know whether a nominee was registered — and it is the single fact that changes the answer. The bank can see it in the account-opening records.",
    goodNews: false,
    steps: [
      "Ask the branch, in writing: was a nominee registered on this account? Ask for the answer in writing too.",
      "If a nominee was registered — no succession certificate is required, whatever the amount.",
      "If no nominee was registered — the answer depends on the total amount, and on whether the heirs agree.",
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
      "There was no nominee, but the total is below the threshold and the heirs agree. The RBI does not merely discourage a succession certificate here — it requires the bank to settle on a fixed list of six documents, and a succession certificate is not one of them.",
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
    verdict: "A succession certificate may genuinely be required here.",
    summary:
      "There was no nominee and the total is at or above the threshold. This is the situation the simplified procedure does not cover, and courts have upheld banks that asked for a succession certificate in it. We are not going to tell you otherwise.",
    goodNews: false,
    steps: [
      "Check the total carefully. The threshold applies to the aggregate at one bank — accounts at different banks are separate claims, each with its own limit, and each may fall below it.",
      "Check your bank's own threshold. The RBI sets a floor of ₹15 lakh for commercial banks, and a bank may set it higher. Some do.",
      "Ask the branch whether it will accept a legal heir certificate or an affidavit sworn before an official instead — para 10(b) mentions both.",
      "If a succession certificate is genuinely needed, expect a court petition, notice to every heir, a newspaper advertisement, and hearings. Four to seven months if nobody objects.",
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
      "The answer turns on three things — whether a nominee was registered, whether the aggregate at that bank is below the threshold, and whether the heirs are in dispute.",
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
      "We only cover bank deposit accounts, lockers and safe custody, claimed by an adult heir or nominee. Your situation falls outside that, and giving you a bank-deposit answer would be wrong.",
    goodNews: false,
    steps: [
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
