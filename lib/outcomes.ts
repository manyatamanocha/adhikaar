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

import { CLAUSES, SARBATI_DEVI } from "./rbi";
import {
  NOMINEE_PROCEDURE,
  SIMPLIFIED_PROCEDURE,
  type DocId,
} from "./documents";
import type { Locale } from "./i18n";

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
  title: "Getting the money doesn't make it yours",
  body:
    `The bank can pay this money to you because you're the nominee — but that's only about who's allowed to collect it, not who owns it. The Supreme Court has ruled that a nominee is just "${SARBATI_DEVI.text}" (${SARBATI_DEVI.case}, ${SARBATI_DEVI.citation}). The money itself still belongs to the legal heirs under inheritance law, and if you're not the only heir, you're expected to hold it for the others rather than keep it all.`,
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

/**
 * Translated 5 Sep 2026. Verdict/summary/steps/caveat text is Adhikaar's own
 * plain-language description of what a clause means — not the clause text
 * itself — so translating it is correct under the site's rule: statutory
 * RBI quotes never translate, only our own prose does. `path`, `clauses`,
 * `documents`, `tracker` and `goodNews` above are locale-invariant (they are
 * routing/data, not display text) and are read straight off `OUTCOMES` in
 * every locale; only the four text fields below are looked up per locale.
 * Unchecked by a native speaker, same as the rest of the site's translations.
 */
type OutcomeText = Pick<Outcome, "verdict" | "summary" | "steps" | "caveats">;

const DISPUTE_CAVEAT_HI: Caveat = {
  title: "अगर उत्तराधिकारी असहमत हों, तो यह बदल जाता है",
  body: "बिना नामांकित व्यक्ति या उत्तरजीविता शर्त वाले दावे के लिए, विवादित दावा होने पर पैराग्राफ 11(b) के तहत दस्तावेज़ीकरण का रास्ता बदल जाता है। एक वैध नामांकित व्यक्ति को भुगतान का रास्ता और उत्तराधिकारियों के अंतिम उत्तराधिकार अधिकार अलग-अलग सवाल हैं। विवादित नामांकन दावे के लिए, यह मान लेने के बजाय कि कोई एक रास्ता अपने आप लागू होगा, व्यक्तिगत सलाह लें।",
  weight: "hard",
};

const EXCLUSIONS_CAVEAT_HI: Caveat = {
  title: "यह PPF, SCSS, MSSC या SSA को कवर नहीं करता",
  body: "पैरा 6(b) सरकारी बचत योजनाओं को इन निर्देशों के दायरे से बाहर रखता है — पब्लिक प्रॉविडेंट फंड, वरिष्ठ नागरिक बचत योजना, महिला सम्मान बचत प्रमाणपत्र और सुकन्या समृद्धि। ये अपनी योजना के नियमों का पालन करती हैं। इस पृष्ठ पर कुछ भी इन पर लागू नहीं होता।",
  weight: "hard",
};

const TRUST_CAVEAT_HI: Caveat = {
  title: "पैसा मिलना, इसका मालिक होना नहीं है",
  body: `बैंक आपको भुगतान कर सकता है क्योंकि आप नामांकित व्यक्ति हैं — लेकिन इसका मतलब सिर्फ़ यह है कि पैसा पाने का हक़ आपको है, मालिक होने का नहीं। सर्वोच्च न्यायालय ने कहा है कि नामांकित व्यक्ति सिर्फ़ "${SARBATI_DEVI.text}" है (${SARBATI_DEVI.case}, ${SARBATI_DEVI.citation})। पैसा उत्तराधिकार क़ानून के तहत अब भी क़ानूनी उत्तराधिकारियों का ही है, और अगर आप अकेले उत्तराधिकारी नहीं हैं, तो आपको इसे अपने लिए रखने के बजाय बाक़ी सबके लिए भी रखना है।`,
  weight: "hard",
};

const NOT_ADVICE_HI: Caveat = {
  title: "यह जानकारी है, कानूनी सलाह नहीं",
  body: "यहाँ सब कुछ RBI के प्रकाशित निर्देशों और बैंकों की अपनी प्रकाशित नीतियों से उद्धृत है, साथ में लिंक भी दिए गए हैं ताकि आप स्वयं जाँच सकें। यह आपके विशेष मामले के बारे में सलाह नहीं है, और यह उन तथ्यों को ध्यान में नहीं रख सकता जो हमें ज्ञात नहीं हैं।",
  weight: "note",
};

const DISPUTE_CAVEAT_KN: Caveat = {
  title: "ವಾರಸುದಾರರು ಭಿನ್ನಾಭಿಪ್ರಾಯ ಹೊಂದಿದ್ದರೆ, ಇದು ಬದಲಾಗುತ್ತದೆ",
  body: "ನಾಮನಿರ್ದೇಶಿತ ವ್ಯಕ್ತಿ ಅಥವಾ ಉತ್ತರಜೀವಿತ್ವ ಷರತ್ತು ಇಲ್ಲದ ಹಕ್ಕುಗಾಗಿ, ವಿವಾದಿತ ಹಕ್ಕು ಇದ್ದರೆ ಪ್ಯಾರಾಗ್ರಾಫ್ 11(b) ಅಡಿಯಲ್ಲಿ ದಾಖಲೆ ಮಾರ್ಗ ಬದಲಾಗುತ್ತದೆ. ಮಾನ್ಯ ನಾಮನಿರ್ದೇಶಿತರಿಗೆ ಪಾವತಿ ಮಾರ್ಗ ಮತ್ತು ವಾರಸುದಾರರ ಅಂತಿಮ ಉತ್ತರಾಧಿಕಾರ ಹಕ್ಕುಗಳು ಬೇರೆ ಬೇರೆ ಪ್ರಶ್ನೆಗಳು. ವಿವಾದಿತ ನಾಮನಿರ್ದೇಶನ ಹಕ್ಕಿಗಾಗಿ, ಯಾವುದೇ ಮಾರ್ಗ ತಾನಾಗಿಯೇ ಅನ್ವಯಿಸುತ್ತದೆ ಎಂದು ಭಾವಿಸುವ ಬದಲು ಪ್ರತ್ಯೇಕ ಸಲಹೆ ಪಡೆಯಿರಿ.",
  weight: "hard",
};

const EXCLUSIONS_CAVEAT_KN: Caveat = {
  title: "ಇದು PPF, SCSS, MSSC ಅಥವಾ SSA ಅನ್ನು ಒಳಗೊಂಡಿಲ್ಲ",
  body: "ಪ್ಯಾರಾ 6(b) ಸರ್ಕಾರಿ ಉಳಿತಾಯ ಯೋಜನೆಗಳನ್ನು — ಸಾರ್ವಜನಿಕ ಭವಿಷ್ಯ ನಿಧಿ, ಹಿರಿಯ ನಾಗರಿಕರ ಉಳಿತಾಯ ಯೋಜನೆ, ಮಹಿಳಾ ಸಮ್ಮಾನ್ ಉಳಿತಾಯ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ — ಈ ನಿರ್ದೇಶನಗಳ ವ್ಯಾಪ್ತಿಯಿಂದ ಹೊರಗಿಡುತ್ತದೆ. ಅವು ತಮ್ಮದೇ ಯೋಜನಾ ನಿಯಮಗಳನ್ನು ಅನುಸರಿಸುತ್ತವೆ. ಈ ಪುಟದಲ್ಲಿ ಯಾವುದೂ ಅವುಗಳಿಗೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.",
  weight: "hard",
};

const TRUST_CAVEAT_KN: Caveat = {
  title: "ಹಣ ಸಿಗುವುದು ಅದರ ಮಾಲೀಕರಾಗುವುದು ಅಲ್ಲ",
  body: `ನೀವು ನಾಮನಿರ್ದೇಶಿತರಾಗಿರುವುದರಿಂದ ಬ್ಯಾಂಕ್ ನಿಮಗೆ ಹಣ ಪಾವತಿಸಬಹುದು — ಆದರೆ ಇದರ ಅರ್ಥ ಹಣ ಪಡೆಯುವ ಹಕ್ಕು ನಿಮಗಿದೆ ಎಂದಷ್ಟೇ, ಮಾಲೀಕತ್ವ ಅಲ್ಲ. ನಾಮನಿರ್ದೇಶಿತರು ಕೇವಲ "${SARBATI_DEVI.text}" ಎಂದು ಸರ್ವೋಚ್ಚ ನ್ಯಾಯಾಲಯ ತೀರ್ಪು ನೀಡಿದೆ (${SARBATI_DEVI.case}, ${SARBATI_DEVI.citation}). ಹಣ ಇನ್ನೂ ಉತ್ತರಾಧಿಕಾರ ಕಾನೂನಿನ ಪ್ರಕಾರ ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರಿಗೇ ಸೇರಿದ್ದು, ಮತ್ತು ನೀವು ಏಕೈಕ ವಾರಸುದಾರರಲ್ಲದಿದ್ದರೆ, ಇಡೀ ಹಣವನ್ನು ನೀವೊಬ್ಬರೇ ಇಟ್ಟುಕೊಳ್ಳುವ ಬದಲು ಇತರರಿಗಾಗಿಯೂ ಇಟ್ಟುಕೊಳ್ಳಬೇಕು.`,
  weight: "hard",
};

const NOT_ADVICE_KN: Caveat = {
  title: "ಇದು ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆಯಲ್ಲ",
  body: "ಇಲ್ಲಿರುವುದೆಲ್ಲಾ RBI ಪ್ರಕಟಿಸಿದ ನಿರ್ದೇಶನಗಳಿಂದ ಮತ್ತು ಬ್ಯಾಂಕುಗಳ ಸ್ವಂತ ಪ್ರಕಟಿತ ನೀತಿಗಳಿಂದ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ, ನೀವೇ ಪರಿಶೀಲಿಸಲು ಲಿಂಕ್‌ಗಳೊಂದಿಗೆ. ಇದು ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಪ್ರಕರಣದ ಬಗ್ಗೆ ಸಲಹೆಯಲ್ಲ, ಮತ್ತು ನಮಗೆ ತಿಳಿಯದ ಸಂಗತಿಗಳನ್ನು ಇದು ಗಣನೆಗೆ ತೆಗೆದುಕೊಳ್ಳಲಾಗುವುದಿಲ್ಲ.",
  weight: "note",
};

const hiOutcomeText: Record<OutcomeId, OutcomeText> = {
  nominee: {
    verdict: "आपसे उत्तराधिकार प्रमाणपत्र नहीं माँगा जाना चाहिए।",
    summary:
      "खाते में एक नामांकित व्यक्ति दर्ज था। जहाँ नामांकित व्यक्ति है, वहाँ RBI कहता है कि बैंक उत्तराधिकार प्रमाणपत्र, प्रोबेट, प्रशासन पत्र, या किसी भी क्षतिपूर्ति बॉन्ड या ज़मानत पर ज़ोर नहीं देगा — खाते में राशि चाहे जितनी हो।",
    steps: [
      "शाखा से नामांकन वाले मामलों का दावा फ़ॉर्म माँगें — RBI इसे Annex I-A कहता है।",
      "मृत्यु प्रमाणपत्र और अपना पहचान पत्र साथ ले जाएँ।",
      "अगर शाखा इनके अलावा कुछ और माँगे, तो उनसे माँग लिखित में देने और नियम बताने को कहें।",
    ],
    caveats: [TRUST_CAVEAT_HI, DISPUTE_CAVEAT_HI, EXCLUSIONS_CAVEAT_HI, NOT_ADVICE_HI],
  },
  survivorship: {
    verdict: "आपसे उत्तराधिकार प्रमाणपत्र नहीं माँगा जाना चाहिए।",
    summary:
      "यह उत्तरजीविता शर्त वाला संयुक्त खाता था — 'either or survivor', 'former or survivor', या 'anyone or survivors'। शेष राशि जीवित खाताधारक को मिलती है, और नामांकित व्यक्ति जैसा ही नियम लागू होता है: कोई उत्तराधिकार प्रमाणपत्र नहीं, कोई प्रोबेट नहीं, कोई क्षतिपूर्ति बॉन्ड नहीं, कोई ज़मानत नहीं, राशि चाहे जितनी हो।",
    steps: [
      "उत्तरजीविता वाले मामलों का दावा फ़ॉर्म शाखा से माँगें — Annex I-A।",
      "मृत्यु प्रमाणपत्र और अपना पहचान पत्र साथ ले जाएँ।",
      "अगर और कुछ माँगा जाए, तो माँग लिखित में और नियम सहित माँगें।",
    ],
    caveats: [TRUST_CAVEAT_HI, DISPUTE_CAVEAT_HI, EXCLUSIONS_CAVEAT_HI, NOT_ADVICE_HI],
  },
  "unknown-nominee": {
    verdict: "पहले, बैंक से नामांकित व्यक्ति या उत्तरजीविता विवरण की पुष्टि करने को कहें।",
    summary:
      "बैंक खाता खोलने के रिकॉर्ड देख सकता है। यह एक ज़रूरी शुरुआती कदम है, लेकिन भुगतान लागू शर्तों पर भी निर्भर करता है, जिसमें कोई भी न्यायालयीन रोक शामिल है।",
    steps: [
      "शाखा से लिखित में पूछें: क्या इस खाते में कोई नामांकित व्यक्ति दर्ज था? जवाब भी लिखित में माँगें।",
      "किसी वैध नामांकित व्यक्ति को भुगतान के लिए, बैंक पहचान, मृत्यु और किसी न्यायालयीन रोक की जाँच करता है। संयुक्त खाते में, नामांकित व्यक्ति का अधिकार सभी जमाकर्ताओं की मृत्यु के बाद बनता है।",
      "अगर कोई नामांकित व्यक्ति या लागू उत्तरजीविता शर्त नहीं है, तो सूची चुनने से पहले वसीयत की स्थिति, विवाद, न्यायालयीन रोक, बैंक के प्रकार और ब्याज सहित कुल राशि जाँच लें।",
    ],
    caveats: [EXCLUSIONS_CAVEAT_HI, NOT_ADVICE_HI],
  },
  "under-threshold": {
    verdict: "आपसे उत्तराधिकार प्रमाणपत्र नहीं माँगा जाना चाहिए।",
    summary:
      "अगर कोई नामांकित व्यक्ति या उत्तरजीविता शर्त नहीं है, कोई वसीयत नहीं है, कोई विवादित दावा नहीं है और कोई न्यायालयीन रोक नहीं है, तो सीमा-से-कम वाला रास्ता पैराग्राफ 10(a) में दिए दस्तावेज़ों का उपयोग करता है। उत्तराधिकार प्रमाणपत्र इस सूची में नहीं है। ब्याज सहित कुल राशि और बैंक की लागू सीमा की पुष्टि करें।",
    steps: [
      "शाखा से सरलीकृत-प्रक्रिया वाला दावा फ़ॉर्म माँगें — RBI इसे Annex I-B कहता है।",
      "नीचे दिए छह दस्तावेज़ों पर काम करें। सबसे पहले क़ानूनी उत्तराधिकारी प्रमाणपत्र शुरू करें; इसमें सबसे ज़्यादा समय लगता है।",
      "पूछें कि क्या बैंक प्रमाणपत्र की जगह उत्तराधिकारियों की घोषणा — Annex I-E — स्वीकार करेगा। पैरा 10(a) दोनों की अनुमति देता है, और घोषणा कहीं तेज़ है।",
      "किसी तीसरे व्यक्ति को ज़मानत देने की ज़रूरत नहीं है। अगर माँगी जाए, तो वह माँग लिखित में लें।",
    ],
    caveats: [
      {
        title: "कोई वसीयत या न्यायालयीन रोक नहीं",
        body: "यह सरलीकृत बिना-नामांकित सूची यह मानती है कि कोई वसीयत नहीं छोड़ी गई और कोई न्यायालयीन आदेश भुगतान को नहीं रोकता। वसीयत, विवाद या न्यायालयीन रोक होने पर इस रास्ते पर भरोसा करने से पहले अलग से जाँच ज़रूरी है।",
        weight: "hard",
      },
      {
        title: "सीमा कुल राशि पर है, एक खाते पर नहीं",
        body: "पैरा 10(a) वहाँ लागू होता है जहाँ आवेदन की तारीख़ तक देय कुल राशि, ब्याज सहित, सीमा से कम हो। एक ही बैंक में कई खाते एक सीमा के विरुद्ध जोड़े जाते हैं। अलग-अलग बैंकों में खाते अलग दावे हैं जिनकी सीमा भी अलग है।",
        weight: "hard",
      },
      DISPUTE_CAVEAT_HI,
      EXCLUSIONS_CAVEAT_HI,
      NOT_ADVICE_HI,
    ],
  },
  "over-threshold": {
    verdict: "बड़े दावे के लिए दस्तावेज़ीकरण का एक से ज़्यादा रास्ता है।",
    summary:
      "जहाँ कोई नामांकित व्यक्ति या उत्तरजीविता शर्त नहीं है, कोई वसीयत नहीं, कोई विवाद नहीं और कोई न्यायालयीन रोक नहीं है, वहाँ पैराग्राफ 10(b) सीमा से ऊपर के दावों के लिए विकल्प देता है। उत्तराधिकार प्रमाणपत्र एक रास्ता है, अपने आप एकमात्र रास्ता नहीं। बैंक से उसकी लिखित शर्तें माँगें।",
    steps: [
      "कुल राशि ध्यान से जाँचें। सीमा एक बैंक में कुल राशि पर लागू होती है — अलग-अलग बैंकों के खाते अलग दावे हैं, हर एक की अपनी सीमा है, और हर एक सीमा से कम भी हो सकता है।",
      "बैंक की अपनी सीमा जाँचें: RBI की न्यूनतम सीमा सहकारी बैंकों के लिए ₹5 लाख और अन्य बैंकों के लिए ₹15 लाख है। बैंक इससे ज़्यादा सीमा तय कर सकता है।",
      "शाखा से पूछें कि क्या वह क़ानूनी उत्तराधिकारी प्रमाणपत्र या किसी अधिकारी के सामने शपथ-पत्र स्वीकार करेगी — पैरा 10(b) दोनों का उल्लेख करता है।",
      "अगर न्यायालयीन दस्तावेज़ों की ज़रूरत हो, तो लागू प्रक्रिया, लागत और समय के बारे में किसी योग्य वकील से सलाह लें। कोई तय समय-सीमा न मान लें।",
    ],
    caveats: [
      {
        title: "जाँच लें कि यह वाक़ई सीमा से ऊपर है",
        body: "दो चीज़ें दावों को सीमा से नीचे ले आती हैं, अक्सर लोगों की सोच से ज़्यादा: अलग-अलग बैंकों के खाते अलग गिने जाते हैं, और किसी बैंक ने अपनी सीमा RBI की ₹15 लाख की न्यूनतम सीमा से ज़्यादा तय की हो सकती है।",
        weight: "hard",
      },
      EXCLUSIONS_CAVEAT_HI,
      NOT_ADVICE_HI,
    ],
  },
  dispute: {
    verdict: "जहाँ उत्तराधिकारियों में विवाद है, वहाँ न्यायालयीन दस्तावेज़ ज़रूरी हो सकता है।",
    summary:
      "सरलीकृत प्रक्रिया यह मानती है कि परिवार सहमत है। जहाँ क़ानूनी उत्तराधिकारियों या वसीयत के लाभार्थियों में विवादित दावे हों, वहाँ पैरा 11(b) कहता है कि बैंक को प्रोबेट, प्रशासन पत्र, उत्तराधिकार प्रमाणपत्र या न्यायालयीन आदेश चाहिए — राशि चाहे जितनी हो, और नामांकित व्यक्ति दर्ज हो या न हो।",
    steps: [
      "अगर असहमति सुलझाई जा सकती है, तो सरलीकृत रास्ता फिर से खुल सकता है। यह पता लगाना ज़रूरी है कि वाक़ई विवाद है या सिर्फ़ एक अनुत्तरित सवाल।",
      "अगर कोई नामांकित व्यक्ति दर्ज था, तो बैंक फिर भी नामांकित व्यक्ति को भुगतान कर सकता है — लेकिन पैसा सभी उत्तराधिकारियों की ओर से न्यास में रखा जाता है, और भुगतान करने से मालिकाना हक तय नहीं होता।",
      "जहाँ विवाद वाक़ई है, यह सिर्फ़ जानकारी की समस्या नहीं रह जाती। सलाह लें।",
    ],
    caveats: [EXCLUSIONS_CAVEAT_HI, NOT_ADVICE_HI],
  },
  "already-in-court": {
    verdict: "नियम 31 मार्च 2026 को बदल गए — शायद आपका मामला शुरू होने के बाद।",
    summary:
      "अगर आपने उससे पहले न्यायालयीन रास्ता अपनाया था, तो तब से स्थिति बदल गई है। हम यह नहीं बताएँगे कि पहले से चल रहे मामले में क्या करें। हम बता सकते हैं कि क्या बदला है, ताकि आप इसे अपने वकील के सामने रख सकें।",
    steps: [
      "नीचे दिए गए नियम पढ़ें और जो भी आपको सलाह दे रहा है, उसे दिखाएँ।",
      "एक सवाल पूछें: इन निर्देशों को देखते हुए, क्या बैंक हमारे मामले में अब भी उत्तराधिकार प्रमाणपत्र माँगेगा?",
      "अपने वकील से नामांकन या उत्तरजीविता, कोई वसीयत या न्यायालयीन रोक, उत्तराधिकारियों के बीच विवाद, और बैंक की लागू सीमा व देय कुल राशि पर विचार करने को कहें।",
    ],
    caveats: [
      {
        title: "हम आपको कुछ वापस लेने के लिए नहीं कह रहे",
        body: "पहले से न्यायालय में चल रहा मामला ऐसी चीज़ नहीं जिस पर यह साइट सलाह दे सके, और यहाँ कुछ भी इसे छोड़ देने के सुझाव के रूप में न लिया जाए। ये नियम इसलिए दिए गए हैं ताकि आप अपने वकील से पूछ सकें कि क्या ये आपकी स्थिति बदलते हैं।",
        weight: "hard",
      },
      NOT_ADVICE_HI,
    ],
  },
  "out-of-scope": {
    verdict: "यह हमारे दायरे से बाहर है।",
    summary:
      "यह MVP वयस्कों को एक मृत वयस्क के बैंक जमा के दावे में मार्गदर्शन देता है। लॉकर, सुरक्षित अभिरक्षा, पेंशन, सरकारी बचत योजनाएँ और अन्य संपत्तियों के लिए अलग प्रक्रियाएँ चाहिए। इनके लिए जमा-राशि वाली सूची का उपयोग न करें।",
    steps: [
      "लॉकर या सुरक्षित अभिरक्षा में रखी वस्तुओं के लिए, बैंक से RBI निर्देशों के पैराग्राफ 16–26 के तहत मृत किरायेदार पहुँच और सूची प्रक्रिया माँगें।",
      "सरकारी या पारिवारिक पेंशन: मृतक के अपने विभाग या कोषागार कार्यालय से, संबंधित राज्य या केंद्रीय पेंशन नियमों के तहत।",
      "भविष्य निधि: EPFO। बीमा: बीमाकर्ता, या IRDAI का Bima Bharosa। म्यूचुअल फंड: AMC या उसका रजिस्ट्रार। शेयर और लाभांश: कंपनी का रजिस्ट्रार, या IEPF।",
      "अगर दावेदार नाबालिग है, या कोई अभिभावक उनकी ओर से काम कर रहा है, तो कुछ भी हस्ताक्षर करने से पहले सलाह लें।",
    ],
    caveats: [
      {
        title: "एक बात जिस पर हम टिप्पणी नहीं करेंगे",
        body: "अगर आपसे कहा गया है कि आप मृतक का खाता उनके आधार, UPI या नेट बैंकिंग से चला सकते हैं, तो यह इस साइट के दायरे से बाहर है और हम इस पर सलाह नहीं देते। मृत्यु की सूचना मिलते ही खाता फ़्रीज़ होना चाहिए।",
        weight: "hard",
      },
      NOT_ADVICE_HI,
    ],
  },
};

const knOutcomeText: Record<OutcomeId, OutcomeText> = {
  nominee: {
    verdict: "ನಿಮ್ಮಿಂದ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಕೇಳಬಾರದು.",
    summary:
      "ಖಾತೆಯಲ್ಲಿ ಒಬ್ಬ ನಾಮನಿರ್ದೇಶಿತರು ದಾಖಲಾಗಿದ್ದರು. ನಾಮನಿರ್ದೇಶಿತರು ಇರುವಲ್ಲಿ, RBI ಪ್ರಕಾರ ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಪ್ರೊಬೇಟ್, ಆಡಳಿತ ಪತ್ರ, ಅಥವಾ ಯಾವುದೇ ಕ್ಷತಿಪೂರಣ ಬಾಂಡ್ ಅಥವಾ ಜಾಮೀನಿಗಾಗಿ ಒತ್ತಾಯಿಸಬಾರದು — ಖಾತೆಯಲ್ಲಿನ ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ.",
    steps: [
      "ನಾಮನಿರ್ದೇಶನ ಇರುವ ಪ್ರಕರಣಗಳ ಹಕ್ಕು ಫಾರ್ಮ್ ಶಾಖೆಯಿಂದ ಕೇಳಿ — RBI ಇದನ್ನು Annex I-A ಎಂದು ಕರೆಯುತ್ತದೆ.",
      "ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ನಿಮ್ಮ ಸ್ವಂತ ಗುರುತಿನ ಚೀಟಿಯನ್ನು ತೆಗೆದುಕೊಂಡು ಹೋಗಿ.",
      "ಶಾಖೆ ಇವುಗಳ ಹೊರತಾಗಿ ಏನಾದರೂ ಕೇಳಿದರೆ, ಅದನ್ನು ಲಿಖಿತವಾಗಿ ಕೇಳಲು ಮತ್ತು ಯಾವ ನಿಯಮದ ಆಧಾರದಲ್ಲಿ ಕೇಳುತ್ತಿದ್ದಾರೆ ಎಂದು ಹೇಳಲು ಕೇಳಿ.",
    ],
    caveats: [TRUST_CAVEAT_KN, DISPUTE_CAVEAT_KN, EXCLUSIONS_CAVEAT_KN, NOT_ADVICE_KN],
  },
  survivorship: {
    verdict: "ನಿಮ್ಮಿಂದ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಕೇಳಬಾರದು.",
    summary:
      "ಇದು ಉತ್ತರಜೀವಿತ್ವ ಷರತ್ತಿನ ಜಂಟಿ ಖಾತೆಯಾಗಿತ್ತು — 'either or survivor', 'former or survivor', ಅಥವಾ 'anyone or survivors'. ಬಾಕಿ ಮೊತ್ತ ಜೀವಂತ ಖಾತೆದಾರರಿಗೆ ಸೇರುತ್ತದೆ, ಮತ್ತು ನಾಮನಿರ್ದೇಶಿತರಂತೆಯೇ ಅದೇ ನಿಯಮ ಅನ್ವಯಿಸುತ್ತದೆ: ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಇಲ್ಲ, ಪ್ರೊಬೇಟ್ ಇಲ್ಲ, ಕ್ಷತಿಪೂರಣ ಬಾಂಡ್ ಇಲ್ಲ, ಜಾಮೀನು ಇಲ್ಲ, ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ.",
    steps: [
      "ಉತ್ತರಜೀವಿತ್ವ ಇರುವ ಪ್ರಕರಣಗಳ ಹಕ್ಕು ಫಾರ್ಮ್ ಅನ್ನು ಶಾಖೆಯಿಂದ ಕೇಳಿ — Annex I-A.",
      "ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ನಿಮ್ಮ ಸ್ವಂತ ಗುರುತಿನ ಚೀಟಿಯನ್ನು ತೆಗೆದುಕೊಂಡು ಹೋಗಿ.",
      "ಇನ್ನಷ್ಟು ಏನಾದರೂ ಕೇಳಿದರೆ, ಬೇಡಿಕೆಯನ್ನು ಲಿಖಿತವಾಗಿ ಮತ್ತು ಆಧಾರಿತ ನಿಯಮದೊಂದಿಗೆ ಕೇಳಿ.",
    ],
    caveats: [TRUST_CAVEAT_KN, DISPUTE_CAVEAT_KN, EXCLUSIONS_CAVEAT_KN, NOT_ADVICE_KN],
  },
  "unknown-nominee": {
    verdict: "ಮೊದಲು, ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉತ್ತರಜೀವಿತ್ವ ವಿವರಗಳನ್ನು ಖಚಿತಪಡಿಸಲು ಬ್ಯಾಂಕ್‌ಗೆ ಕೇಳಿ.",
    summary:
      "ಬ್ಯಾಂಕ್ ಖಾತೆ ತೆರೆದ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಬಹುದು. ಇದು ಮುಖ್ಯ ಮೊದಲ ಹೆಜ್ಜೆ, ಆದರೆ ಪಾವತಿ ಅನ್ವಯವಾಗುವ ಷರತ್ತುಗಳ ಮೇಲೂ ಅವಲಂಬಿತವಾಗಿದೆ, ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧ ಸೇರಿ.",
    steps: [
      "ಶಾಖೆಗೆ ಲಿಖಿತವಾಗಿ ಕೇಳಿ: ಈ ಖಾತೆಯಲ್ಲಿ ನಾಮನಿರ್ದೇಶಿತರು ದಾಖಲಾಗಿದ್ದಾರೆಯೇ? ಉತ್ತರವನ್ನೂ ಲಿಖಿತವಾಗಿ ಕೇಳಿ.",
      "ಮಾನ್ಯ ನಾಮನಿರ್ದೇಶಿತರಿಗೆ ಪಾವತಿಗಾಗಿ, ಬ್ಯಾಂಕ್ ಗುರುತು, ಮರಣ ಮತ್ತು ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧವನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ. ಜಂಟಿ ಖಾತೆಯಲ್ಲಿ, ಎಲ್ಲಾ ಠೇವಣಿದಾರರ ಮರಣದ ನಂತರವೇ ನಾಮನಿರ್ದೇಶಿತರ ಹಕ್ಕು ಉಂಟಾಗುತ್ತದೆ.",
      "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಅನ್ವಯವಾಗುವ ಉತ್ತರಜೀವಿತ್ವ ಷರತ್ತು ಇಲ್ಲದಿದ್ದರೆ, ಪಟ್ಟಿ ಆಯ್ಕೆಮಾಡುವ ಮೊದಲು ಉಯಿಲಿನ ಸ್ಥಿತಿ, ವಿವಾದಗಳು, ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧಗಳು, ಬ್ಯಾಂಕ್ ಪ್ರಕಾರ ಮತ್ತು ಬಡ್ಡಿ ಸೇರಿದಂತೆ ಒಟ್ಟು ಮೊತ್ತವನ್ನು ಪರಿಶೀಲಿಸಿ.",
    ],
    caveats: [EXCLUSIONS_CAVEAT_KN, NOT_ADVICE_KN],
  },
  "under-threshold": {
    verdict: "ನಿಮ್ಮಿಂದ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಕೇಳಬಾರದು.",
    summary:
      "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉತ್ತರಜೀವಿತ್ವ ಷರತ್ತು ಇಲ್ಲದಿದ್ದರೆ, ಉಯಿಲು ಇಲ್ಲದಿದ್ದರೆ, ಯಾವುದೇ ಸ್ಪರ್ಧಾತ್ಮಕ ಹಕ್ಕು ಇಲ್ಲದಿದ್ದರೆ ಮತ್ತು ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧ ಇಲ್ಲದಿದ್ದರೆ, ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಇರುವ ಮಾರ್ಗವು ಪ್ಯಾರಾಗ್ರಾಫ್ 10(a) ದಾಖಲೆಗಳನ್ನು ಬಳಸುತ್ತದೆ. ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಆ ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲ. ಬಡ್ಡಿ ಸೇರಿ ಒಟ್ಟು ಮೊತ್ತ ಮತ್ತು ಬ್ಯಾಂಕಿನ ಅನ್ವಯವಾಗುವ ಮಿತಿಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    steps: [
      "ಸರಳೀಕೃತ-ಪ್ರಕ್ರಿಯೆ ಹಕ್ಕು ಫಾರ್ಮ್ ಅನ್ನು ಶಾಖೆಯಿಂದ ಕೇಳಿ — RBI ಇದನ್ನು Annex I-B ಎಂದು ಕರೆಯುತ್ತದೆ.",
      "ಕೆಳಗಿನ ಆರು ದಾಖಲೆಗಳ ಮೇಲೆ ಕೆಲಸ ಮಾಡಿ. ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಮೊದಲು ಪ್ರಾರಂಭಿಸಿ; ಇದಕ್ಕೆ ಹೆಚ್ಚು ಸಮಯ ಬೇಕಾಗುತ್ತದೆ.",
      "ಪ್ರಮಾಣಪತ್ರದ ಬದಲು ವಾರಸುದಾರರ ಘೋಷಣೆಯನ್ನು — Annex I-E — ಬ್ಯಾಂಕ್ ಸ್ವೀಕರಿಸುತ್ತದೆಯೇ ಎಂದು ಕೇಳಿ. ಪ್ಯಾರಾ 10(a) ಎರಡನ್ನೂ ಅನುಮತಿಸುತ್ತದೆ, ಮತ್ತು ಘೋಷಣೆ ಹೆಚ್ಚು ವೇಗವಾಗಿದೆ.",
      "ಯಾವುದೇ ಮೂರನೇ ವ್ಯಕ್ತಿ ಜಾಮೀನಾಗಿ ನಿಲ್ಲಬೇಕಿಲ್ಲ. ಕೇಳಿದರೆ, ಆ ಬೇಡಿಕೆಯನ್ನು ಲಿಖಿತವಾಗಿ ಕೇಳಿ.",
    ],
    caveats: [
      {
        title: "ಉಯಿಲು ಅಥವಾ ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧ ಇಲ್ಲ",
        body: "ಈ ಸರಳೀಕೃತ ನಾಮನಿರ್ದೇಶನ-ರಹಿತ ಪಟ್ಟಿ ಯಾವುದೇ ಉಯಿಲು ಬಿಡಲಾಗಿಲ್ಲ ಮತ್ತು ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಪಾವತಿಯನ್ನು ನಿರ್ಬಂಧಿಸುವುದಿಲ್ಲ ಎಂದು ಊಹಿಸುತ್ತದೆ. ಉಯಿಲು, ವಿವಾದ ಅಥವಾ ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧ ಇದ್ದರೆ, ಈ ಮಾರ್ಗವನ್ನು ಅವಲಂಬಿಸುವ ಮೊದಲು ಪ್ರತ್ಯೇಕ ಪರಿಶೀಲನೆ ಅಗತ್ಯ.",
        weight: "hard",
      },
      {
        title: "ಮಿತಿ ಒಟ್ಟು ಮೊತ್ತದ ಮೇಲೆ, ಒಂದು ಖಾತೆಯ ಮೇಲಲ್ಲ",
        body: "ಪ್ಯಾರಾ 10(a) ಅನ್ವಯವಾಗುವುದು ಅರ್ಜಿಯ ದಿನಾಂಕದವರೆಗೆ ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ, ಬಡ್ಡಿ ಸೇರಿ, ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಇರುವಲ್ಲಿ. ಒಂದೇ ಬ್ಯಾಂಕಿನಲ್ಲಿನ ಹಲವು ಖಾತೆಗಳನ್ನು ಒಂದೇ ಮಿತಿಯ ವಿರುದ್ಧ ಒಟ್ಟುಗೂಡಿಸಲಾಗುತ್ತದೆ. ಬೇರೆ ಬೇರೆ ಬ್ಯಾಂಕುಗಳಲ್ಲಿನ ಖಾತೆಗಳು ಪ್ರತ್ಯೇಕ ಮಿತಿಗಳಿರುವ ಪ್ರತ್ಯೇಕ ಹಕ್ಕುಗಳಾಗಿವೆ.",
        weight: "hard",
      },
      DISPUTE_CAVEAT_KN,
      EXCLUSIONS_CAVEAT_KN,
      NOT_ADVICE_KN,
    ],
  },
  "over-threshold": {
    verdict: "ದೊಡ್ಡ ಹಕ್ಕಿಗೆ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ದಾಖಲೆ ಮಾರ್ಗಗಳಿವೆ.",
    summary:
      "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉತ್ತರಜೀವಿತ್ವ ಷರತ್ತು ಇಲ್ಲದಿದ್ದರೆ, ಉಯಿಲು ಇಲ್ಲದಿದ್ದರೆ, ವಿವಾದ ಇಲ್ಲದಿದ್ದರೆ ಮತ್ತು ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧ ಇಲ್ಲದಿದ್ದರೆ, ಪ್ಯಾರಾಗ್ರಾಫ್ 10(b) ಮಿತಿಗಿಂತ ಹೆಚ್ಚಿನ ಹಕ್ಕುಗಳಿಗೆ ಪರ್ಯಾಯಗಳನ್ನು ನೀಡುತ್ತದೆ. ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಒಂದು ಮಾರ್ಗ, ತಾನಾಗಿಯೇ ಏಕೈಕ ಮಾರ್ಗವಲ್ಲ. ಬ್ಯಾಂಕಿನ ಲಿಖಿತ ಅವಶ್ಯಕತೆಗಳನ್ನು ಕೇಳಿ.",
    steps: [
      "ಒಟ್ಟು ಮೊತ್ತವನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಶೀಲಿಸಿ. ಮಿತಿ ಒಂದು ಬ್ಯಾಂಕಿನಲ್ಲಿನ ಒಟ್ಟು ಮೊತ್ತಕ್ಕೆ ಅನ್ವಯಿಸುತ್ತದೆ — ಬೇರೆ ಬೇರೆ ಬ್ಯಾಂಕುಗಳಲ್ಲಿನ ಖಾತೆಗಳು ಪ್ರತ್ಯೇಕ ಹಕ್ಕುಗಳು, ಪ್ರತಿಯೊಂದಕ್ಕೂ ತನ್ನದೇ ಮಿತಿ, ಮತ್ತು ಪ್ರತಿಯೊಂದೂ ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಇರಬಹುದು.",
      "ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ಮಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ: RBI ಕನಿಷ್ಠ ಮಿತಿ ಸಹಕಾರಿ ಬ್ಯಾಂಕುಗಳಿಗೆ ₹5 ಲಕ್ಷ ಮತ್ತು ಇತರ ಬ್ಯಾಂಕುಗಳಿಗೆ ₹15 ಲಕ್ಷ. ಬ್ಯಾಂಕ್ ಹೆಚ್ಚಿನ ಮಿತಿ ನಿಗದಿಪಡಿಸಬಹುದು.",
      "ಶಾಖೆಗೆ ಕೇಳಿ ಅದು ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಅಧಿಕಾರಿಯ ಮುಂದೆ ಪ್ರಮಾಣ ಮಾಡಿದ ಅಫಿಡವಿಟ್ ಸ್ವೀಕರಿಸುತ್ತದೆಯೇ ಎಂದು — ಪ್ಯಾರಾ 10(b) ಎರಡನ್ನೂ ಉಲ್ಲೇಖಿಸುತ್ತದೆ.",
      "ನ್ಯಾಯಾಲಯದ ದಾಖಲೆಗಳು ಬೇಕಾದರೆ, ಅನ್ವಯವಾಗುವ ಪ್ರಕ್ರಿಯೆ, ವೆಚ್ಚ ಮತ್ತು ಸಮಯದ ಬಗ್ಗೆ ಅರ್ಹ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ. ನಿಗದಿತ ಪೂರ್ಣಗೊಳಿಸುವ ಸಮಯವನ್ನು ಊಹಿಸಬೇಡಿ.",
    ],
    caveats: [
      {
        title: "ಇದು ನಿಜವಾಗಿಯೂ ಮಿತಿಗಿಂತ ಮೇಲಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ",
        body: "ಜನರು ನಿರೀಕ್ಷಿಸುವುದಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಿ ಎರಡು ವಿಷಯಗಳು ಹಕ್ಕುಗಳನ್ನು ಮಿತಿಗಿಂತ ಕೆಳಗೆ ತರುತ್ತವೆ: ಬೇರೆ ಬೇರೆ ಬ್ಯಾಂಕುಗಳಲ್ಲಿನ ಖಾತೆಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಎಣಿಸಲಾಗುತ್ತದೆ, ಮತ್ತು ಒಂದು ಬ್ಯಾಂಕ್ ತನ್ನ ಮಿತಿಯನ್ನು RBI ಯ ₹15 ಲಕ್ಷ ಕನಿಷ್ಠಕ್ಕಿಂತ ಹೆಚ್ಚು ನಿಗದಿಪಡಿಸಿರಬಹುದು.",
        weight: "hard",
      },
      EXCLUSIONS_CAVEAT_KN,
      NOT_ADVICE_KN,
    ],
  },
  dispute: {
    verdict: "ವಾರಸುದಾರರಲ್ಲಿ ಭಿನ್ನಾಭಿಪ್ರಾಯವಿದ್ದಲ್ಲಿ, ನ್ಯಾಯಾಲಯದ ದಾಖಲೆ ಅಗತ್ಯವಾಗಬಹುದು.",
    summary:
      "ಸರಳೀಕೃತ ಪ್ರಕ್ರಿಯೆ ಕುಟುಂಬ ಒಪ್ಪಿಗೆಯಲ್ಲಿದೆ ಎಂದು ಊಹಿಸುತ್ತದೆ. ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರು ಅಥವಾ ಉಯಿಲಿನ ಫಲಾನುಭವಿಗಳಲ್ಲಿ ಸ್ಪರ್ಧಾತ್ಮಕ ಹಕ್ಕುಗಳಿದ್ದರೆ, ಪ್ಯಾರಾ 11(b) ಪ್ರಕಾರ ಬ್ಯಾಂಕಿಗೆ ಪ್ರೊಬೇಟ್, ಆಡಳಿತ ಪತ್ರ, ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಬೇಕು — ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ, ಮತ್ತು ನಾಮನಿರ್ದೇಶಿತರು ದಾಖಲಾಗಿದ್ದರೂ ಇಲ್ಲದಿದ್ದರೂ.",
    steps: [
      "ಭಿನ್ನಾಭಿಪ್ರಾಯವನ್ನು ಬಗೆಹರಿಸಬಹುದಾದರೆ, ಸರಳೀಕೃತ ಮಾರ್ಗ ಮತ್ತೆ ತೆರೆಯಬಹುದು. ನಿಜವಾದ ವಿವಾದವಿದೆಯೇ ಅಥವಾ ಕೇವಲ ಉತ್ತರಿಸದ ಪ್ರಶ್ನೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುವುದು ಮುಖ್ಯ.",
      "ನಾಮನಿರ್ದೇಶಿತರು ದಾಖಲಾಗಿದ್ದರೆ, ಬ್ಯಾಂಕ್ ಇನ್ನೂ ನಾಮನಿರ್ದೇಶಿತರಿಗೆ ಪಾವತಿಸಬಹುದು — ಆದರೆ ಹಣವನ್ನು ಎಲ್ಲಾ ವಾರಸುದಾರರ ಪರವಾಗಿ ಟ್ರಸ್ಟ್‌ನಲ್ಲಿ ಇಡಲಾಗುತ್ತದೆ, ಮತ್ತು ಪಾವತಿಸುವುದರಿಂದ ಮಾಲೀಕತ್ವ ಇತ್ಯರ್ಥವಾಗುವುದಿಲ್ಲ.",
      "ವಿವಾದ ನಿಜವಾಗಿದ್ದಲ್ಲಿ, ಇದು ಇನ್ನು ಮಾಹಿತಿಯ ಸಮಸ್ಯೆಯಾಗಿ ಉಳಿಯುವುದಿಲ್ಲ. ಸಲಹೆ ಪಡೆಯಿರಿ.",
    ],
    caveats: [EXCLUSIONS_CAVEAT_KN, NOT_ADVICE_KN],
  },
  "already-in-court": {
    verdict: "ನಿಯಮಗಳು 31 ಮಾರ್ಚ್ 2026 ರಂದು ಬದಲಾದವು — ಬಹುಶಃ ನಿಮ್ಮ ಪ್ರಕರಣ ಪ್ರಾರಂಭವಾದ ನಂತರ.",
    summary:
      "ಅದಕ್ಕೂ ಮೊದಲು ನೀವು ನ್ಯಾಯಾಲಯದ ಮಾರ್ಗವನ್ನು ಪ್ರಾರಂಭಿಸಿದ್ದರೆ, ಅಂದಿನಿಂದ ಪರಿಸ್ಥಿತಿ ಬದಲಾಗಿದೆ. ಈಗಾಗಲೇ ನಡೆಯುತ್ತಿರುವ ಪ್ರಕರಣದಲ್ಲಿ ಏನು ಮಾಡಬೇಕೆಂದು ನಾವು ಹೇಳುವುದಿಲ್ಲ. ಏನು ಬದಲಾಗಿದೆ ಎಂದು ನಾವು ಹೇಳಬಹುದು, ಇದರಿಂದ ನೀವು ಅದನ್ನು ನಿಮ್ಮ ವಕೀಲರ ಮುಂದೆ ಇಡಬಹುದು.",
    steps: [
      "ಕೆಳಗಿನ ನಿಯಮಗಳನ್ನು ಓದಿ ಮತ್ತು ನಿಮಗೆ ಸಲಹೆ ನೀಡುತ್ತಿರುವವರಿಗೆ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ.",
      "ಒಂದು ಪ್ರಶ್ನೆ ಕೇಳಿ: ಈ ನಿರ್ದೇಶನಗಳನ್ನು ಗಮನಿಸಿದರೆ, ಬ್ಯಾಂಕ್ ಇನ್ನೂ ನಮ್ಮ ಪ್ರಕರಣದಲ್ಲಿ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಕೇಳುತ್ತದೆಯೇ?",
      "ನಿಮ್ಮ ವಕೀಲರಿಗೆ ನಾಮನಿರ್ದೇಶನ ಅಥವಾ ಉತ್ತರಜೀವಿತ್ವ, ಯಾವುದೇ ಉಯಿಲು ಅಥವಾ ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧ, ವಾರಸುದಾರರ ನಡುವಿನ ವಿವಾದಗಳು, ಮತ್ತು ಬ್ಯಾಂಕಿನ ಅನ್ವಯವಾಗುವ ಮಿತಿ ಹಾಗೂ ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತವನ್ನು ಪರಿಗಣಿಸಲು ಕೇಳಿ.",
    ],
    caveats: [
      {
        title: "ಏನನ್ನೂ ಹಿಂಪಡೆಯಲು ನಾವು ಹೇಳುತ್ತಿಲ್ಲ",
        body: "ಈಗಾಗಲೇ ನ್ಯಾಯಾಲಯದ ಮುಂದೆ ಇರುವ ಪ್ರಕರಣದ ಬಗ್ಗೆ ಈ ಸೈಟ್ ಸಲಹೆ ನೀಡಲಾಗುವುದಿಲ್ಲ, ಮತ್ತು ಇಲ್ಲಿರುವುದನ್ನು ಅದನ್ನು ಬಿಟ್ಟುಬಿಡುವ ಸಲಹೆಯಾಗಿ ಪರಿಗಣಿಸಬಾರದು. ಈ ನಿಯಮಗಳು ಇಲ್ಲಿರುವುದು ನಿಮ್ಮ ಸ್ವಂತ ವಕೀಲರನ್ನು ಅವು ನಿಮ್ಮ ಸ್ಥಾನವನ್ನು ಬದಲಾಯಿಸುತ್ತವೆಯೇ ಎಂದು ಕೇಳಲು.",
        weight: "hard",
      },
      NOT_ADVICE_KN,
    ],
  },
  "out-of-scope": {
    verdict: "ಇದು ನಾವು ಒಳಗೊಳ್ಳುವುದರ ಹೊರಗಿದೆ.",
    summary:
      "ಈ MVP ಮೃತ ವಯಸ್ಕರ ಬ್ಯಾಂಕ್ ಠೇವಣಿಗಳನ್ನು ಪಡೆಯುವ ವಯಸ್ಕರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಲಾಕರ್‌ಗಳು, ಸುರಕ್ಷಿತ ಸಂರಕ್ಷಣೆ, ಪಿಂಚಣಿಗಳು, ಸರ್ಕಾರಿ ಉಳಿತಾಯ ಯೋಜನೆಗಳು ಮತ್ತು ಇತರ ಆಸ್ತಿಗಳಿಗೆ ಪ್ರತ್ಯೇಕ ಕಾರ್ಯವಿಧಾನಗಳು ಬೇಕಾಗುತ್ತವೆ. ಠೇವಣಿ ಪಟ್ಟಿಯನ್ನು ಅವುಗಳಿಗೆ ಬಳಸಬೇಡಿ.",
    steps: [
      "ಲಾಕರ್ ಅಥವಾ ಸುರಕ್ಷಿತ ಸಂರಕ್ಷಣೆಯಲ್ಲಿನ ವಸ್ತುಗಳಿಗಾಗಿ, RBI ನಿರ್ದೇಶನಗಳ ಪ್ಯಾರಾಗ್ರಾಫ್ 16–26 ರ ಅಡಿಯಲ್ಲಿ ಮೃತ ಬಾಡಿಗೆದಾರರ ಪ್ರವೇಶ ಮತ್ತು ದಾಸ್ತಾನು ಕಾರ್ಯವಿಧಾನವನ್ನು ಬ್ಯಾಂಕಿನಿಂದ ಕೇಳಿ.",
      "ಸರ್ಕಾರಿ ಅಥವಾ ಕುಟುಂಬ ಪಿಂಚಣಿ: ಮೃತರ ಸ್ವಂತ ಇಲಾಖೆ ಅಥವಾ ಖಜಾನೆ ಕಚೇರಿಯಿಂದ, ಸಂಬಂಧಿತ ರಾಜ್ಯ ಅಥವಾ ಕೇಂದ್ರ ಪಿಂಚಣಿ ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ.",
      "ಭವಿಷ್ಯ ನಿಧಿ: EPFO. ವಿಮೆ: ವಿಮಾದಾರ, ಅಥವಾ IRDAI ಯ Bima Bharosa. ಮ್ಯೂಚುಯಲ್ ಫಂಡ್‌ಗಳು: AMC ಅಥವಾ ಅದರ ರಿಜಿಸ್ಟ್ರಾರ್. ಷೇರುಗಳು ಮತ್ತು ಲಾಭಾಂಶಗಳು: ಕಂಪನಿಯ ರಿಜಿಸ್ಟ್ರಾರ್, ಅಥವಾ IEPF.",
      "ಹಕ್ಕುದಾರರು ಅಪ್ರಾಪ್ತರಾಗಿದ್ದರೆ, ಅಥವಾ ಪೋಷಕರು ಅವರ ಪರವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದ್ದರೆ, ಏನನ್ನಾದರೂ ಸಹಿ ಮಾಡುವ ಮೊದಲು ಸಲಹೆ ಪಡೆಯಿರಿ.",
    ],
    caveats: [
      {
        title: "ನಾವು ಕಾಮೆಂಟ್ ಮಾಡದ ಒಂದು ವಿಷಯ",
        body: "ಮೃತರ ಆಧಾರ್, UPI ಅಥವಾ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಕ ನೀವು ಖಾತೆಯನ್ನು ನಿರ್ವಹಿಸಬಹುದು ಎಂದು ನಿಮಗೆ ಹೇಳಿದ್ದರೆ, ಅದು ಈ ಸೈಟ್ ಒಳಗೊಳ್ಳುವುದರ ಹೊರಗಿದೆ ಮತ್ತು ನಾವು ಅದರ ಬಗ್ಗೆ ಸಲಹೆ ನೀಡುವುದಿಲ್ಲ. ಮರಣದ ಬಗ್ಗೆ ಬ್ಯಾಂಕಿಗೆ ತಿಳಿಸಿದ ನಂತರ ಖಾತೆ ಫ್ರೀಜ್ ಆಗಬೇಕು.",
        weight: "hard",
      },
      NOT_ADVICE_KN,
    ],
  },
};

export const OUTCOME_TEXT_BY_LOCALE: Record<Locale, Record<OutcomeId, OutcomeText>> = {
  en: OUTCOMES,
  hi: hiOutcomeText,
  kn: knOutcomeText,
};

/** Reads locale text where it varies, structural fields (path/clauses/documents/tracker/goodNews) from the base OUTCOMES. */
export function outcomeText(id: OutcomeId, locale: Locale): Outcome {
  return { ...OUTCOMES[id], ...OUTCOME_TEXT_BY_LOCALE[locale][id] };
}
