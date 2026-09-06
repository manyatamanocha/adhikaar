import type { Locale } from "./i18n";

/**
 * Copy for /documents — the "what will the bank need?" reference page.
 *
 * Its own dictionary, not an addition to HomeDict, for the same reason
 * i18n-home.ts is separate from i18n.ts: this page's prose did not exist when
 * either was written, and this file is edited by one page only.
 *
 * Nothing here is a statutory quote. Every RBI clause on the page is rendered
 * from lib/rbi.ts's CLAUSES in English in all three locales, with the `gloss`
 * strings below sitting above it as a plain-language reading — a translated
 * quote stops being a quote, and this page is meant to be handed across a
 * counter. Document names, cost and time come from documentText() in
 * lib/documents.ts, which is already translated.
 *
 * Rewritten 6 Sep 2026 for plain language, after the original ownership
 * section ("Being paid is not the same as owning it") was flagged as unclear
 * — both here and on the verdict pages, which had the same problem in
 * lib/outcomes.ts's TRUST_CAVEAT. Two concrete fixes carried through both
 * places: (1) short, direct sentences instead of legal-contrast constructions
 * ("not merely X — it Y"), and (2) actual rupee figures in the headings
 * instead of the word "threshold" standing alone — a reader should not have
 * to hold an abstract term in their head to know which list is theirs.
 *
 * Hindi and Kannada here have NOT been checked by a native speaker, same as
 * the rest of the site.
 */

export type DocsDict = {
  /** Label for the homepage entry link. */
  homeCta: string;
  eyebrow: string;
  heading: string;
  sub: string;
  /** Sits above the two routes: which one applies is not a free choice. */
  routeNote: string;

  nomineeHeading: string;
  nomineeSub: string;
  nomineeGloss: string;
  /** Sarbati Devi. Load-bearing on every nominee surface. Matches outcomes.ts's TRUST_CAVEAT wording. */
  ownershipHeading: string;
  ownership: string;

  /** Takes the RBI's own rupee figures so the amount is stated, not just "the threshold." */
  simplifiedHeading: (commercial: string, cooperative: string) => string;
  simplifiedSub: string;
  simplifiedGloss: string;
  noSuretyGloss: string;

  notOnListHeading: string;
  notOnList: string;

  aboveHeading: (commercial: string, cooperative: string) => string;
  aboveGloss: string;
  disputeGloss: string;

  ctaHeading: string;
  ctaSub: string;
  cta: string;

  /** "RBI Directions, paragraph 9" */
  paraLabel: (para: string) => string;
  glossLabel: string;
  /** Prefix for a clause we have summarised rather than quoted. */
  summaryLabel: string;
  sourceLine: string;
};

const en: DocsDict = {
  homeCta: "See what documents you'll need",
  eyebrow: "Before you go to the branch",
  heading: "What documents will the bank need?",
  sub: "There are two possible lists — one short, one longer. Which one is yours comes down to a single fact: was a nominee, or a surviving joint holder, named on the account?",
  routeNote:
    "You don't get to choose which list applies — it depends on what was already set up on the account. Not sure which is yours? The claim journey works it out in a few questions.",

  nomineeHeading: "If a nominee or surviving joint holder is on record",
  nomineeSub: "Three documents. Any amount.",
  nomineeGloss:
    "If a nominee or surviving joint holder was registered, the bank must pay out without asking for a succession certificate, probate, or any court paperwork like it — no matter how much money is in the account.",
  ownershipHeading: "Getting the money doesn't make it yours",
  ownership:
    "The bank can pay this money to you because you're the nominee — but that's only about who's allowed to collect it, not who owns it. The money itself still belongs to the legal heirs under inheritance law. If there are other heirs — siblings, parents, anyone else with a legal share — you're expected to hold it for them too, not keep it all.",

  simplifiedHeading: (commercial, cooperative) =>
    `If there was no nominee, and the total is under ${commercial} (${cooperative} at a co-operative bank)`,
  simplifiedSub: "Six documents. Nothing more.",
  simplifiedGloss:
    "Below that amount, this is the bank's complete list. It can't ask you for anything beyond these six, and it can't refuse to settle once you've handed them over.",
  noSuretyGloss:
    "Below that amount, the bank also can't ask a third person to act as guarantor for your claim.",

  notOnListHeading: "What the bank should not ask you for",
  notOnList:
    "A succession certificate. Probate. A family-tree document (vanshavali). Witnesses. A guarantor. If a branch asks for any of these below the limit, they're asking for more than the rule allows.",

  aboveHeading: (commercial, cooperative) =>
    `If the total is ${commercial} or more (${cooperative} or more at a co-operative bank)`,
  aboveGloss:
    "The six-document list above no longer applies. The bank can ask for a succession certificate (or a similar court document), or for a legal heir certificate plus a sworn affidavit. One thing to check: this limit is added up across every account you hold at that one bank — it isn't counted separately for each account.",
  disputeGloss:
    "If the legal heirs disagree with each other, the bank will ask for a court document no matter how much money is involved — a probate, letter of administration, succession certificate, or court order.",

  ctaHeading: "Not sure which list is yours?",
  ctaSub: "Answer a few questions and we'll tell you exactly which list applies, and which rule it comes from.",
  cta: "Start the claim journey",

  paraLabel: (para) => `RBI Directions, paragraph ${para}`,
  glossLabel: "In plain words",
  summaryLabel: "In summary:",
  sourceLine:
    "Quoted from the RBI's Settlement of Claims in respect of Deceased Customers of Banks Directions, 2025. Not affiliated with the RBI or any bank. Information, not legal advice.",
};

const hi: DocsDict = {
  homeCta: "देखें आपको कौन-से दस्तावेज़ चाहिए होंगे",
  eyebrow: "शाखा जाने से पहले",
  heading: "बैंक को कौन-से दस्तावेज़ चाहिए होंगे?",
  sub: "दो सूचियाँ हो सकती हैं — एक छोटी, एक बड़ी। आपकी कौन-सी है, यह एक बात से तय होता है: क्या खाते में नामांकित व्यक्ति या जीवित संयुक्त धारक दर्ज था?",
  routeNote:
    "कौन-सी सूची लागू होगी, यह आपकी पसंद नहीं है — यह इस बात पर निर्भर करता है कि खाते में पहले से क्या दर्ज था। यक़ीन नहीं है कि आपकी कौन-सी है? दावा यात्रा कुछ सवालों में यह बता देती है।",

  nomineeHeading: "यदि नामांकित व्यक्ति या जीवित संयुक्त धारक दर्ज है",
  nomineeSub: "तीन दस्तावेज़। कितनी भी राशि हो।",
  nomineeGloss:
    "यदि नामांकित व्यक्ति या जीवित संयुक्त धारक दर्ज था, तो बैंक को उत्तराधिकार प्रमाणपत्र, प्रोबेट, या ऐसा कोई न्यायालयीन काग़ज़ माँगे बिना भुगतान करना होगा — खाते में राशि चाहे जितनी भी हो।",
  ownershipHeading: "पैसा मिलना, इसका मालिक होना नहीं है",
  ownership:
    "बैंक आपको यह पैसा दे सकता है क्योंकि आप नामांकित व्यक्ति हैं — लेकिन इसका मतलब सिर्फ़ यह है कि पैसा पाने का हक़ आपको है, मालिक होने का नहीं। यह पैसा उत्तराधिकार क़ानून के तहत अब भी क़ानूनी उत्तराधिकारियों का ही है। अगर भाई-बहन, माता-पिता, या कोई और क़ानूनी उत्तराधिकारी हैं, तो आपको यह पैसा उनके लिए भी रखना है, सिर्फ़ अपने लिए नहीं।",

  simplifiedHeading: (commercial, cooperative) =>
    `यदि कोई नामांकित व्यक्ति नहीं था, और कुल राशि ${commercial} से कम है (सहकारी बैंक में ${cooperative} से कम)`,
  simplifiedSub: "छह दस्तावेज़। इनसे ज़्यादा कुछ नहीं।",
  simplifiedGloss:
    "इस राशि से कम होने पर, यही बैंक की पूरी सूची है। बैंक इन छह के अलावा कुछ नहीं माँग सकता, और इन्हें देने के बाद दावा निपटाने से मना नहीं कर सकता।",
  noSuretyGloss:
    "इस राशि से कम होने पर, बैंक आपके दावे की ज़मानत देने के लिए किसी तीसरे व्यक्ति को भी नहीं माँग सकता।",

  notOnListHeading: "बैंक को आपसे यह नहीं माँगना चाहिए",
  notOnList:
    "उत्तराधिकार प्रमाणपत्र। प्रोबेट। वंशावली। गवाह। कोई ज़मानतदार। सीमा से कम राशि पर शाखा इनमें से कुछ भी माँगे, तो वह नियम से ज़्यादा माँग रही है।",

  aboveHeading: (commercial, cooperative) =>
    `यदि कुल राशि ${commercial} या उससे अधिक है (सहकारी बैंक में ${cooperative} या उससे अधिक)`,
  aboveGloss:
    "ऊपर वाली छह-दस्तावेज़ सूची अब लागू नहीं होती। बैंक उत्तराधिकार प्रमाणपत्र (या ऐसा ही कोई न्यायालयीन दस्तावेज़), या क़ानूनी उत्तराधिकारी प्रमाणपत्र और शपथपत्र माँग सकता है। एक बात ध्यान रखें: यह सीमा उस एक बैंक के आपके सभी खातों की कुल राशि पर लगती है, हर खाते पर अलग से नहीं।",
  disputeGloss:
    "अगर क़ानूनी उत्तराधिकारी आपस में असहमत हैं, तो राशि चाहे जितनी हो, बैंक न्यायालय का दस्तावेज़ माँगेगा — प्रोबेट, प्रशासन पत्र, उत्तराधिकार प्रमाणपत्र, या न्यायालयीन आदेश।",

  ctaHeading: "यक़ीन नहीं कि कौन-सी सूची आपकी है?",
  ctaSub: "कुछ सवालों के जवाब दें, और हम आपको बताएँगे कि आप पर कौन-सी सूची लागू होती है, और यह किस नियम से आती है।",
  cta: "दावा यात्रा शुरू करें",

  paraLabel: (para) => `आरबीआई निर्देश, पैराग्राफ़ ${para}`,
  glossLabel: "सरल शब्दों में",
  summaryLabel: "संक्षेप में:",
  sourceLine:
    "आरबीआई के Settlement of Claims in respect of Deceased Customers of Banks Directions, 2025 से उद्धृत। आरबीआई या किसी बैंक से संबद्ध नहीं। यह जानकारी है, क़ानूनी सलाह नहीं।",
};

const kn: DocsDict = {
  homeCta: "ನಿಮಗೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕಾಗುತ್ತವೆ ಎಂದು ನೋಡಿ",
  eyebrow: "ಶಾಖೆಗೆ ಹೋಗುವ ಮೊದಲು",
  heading: "ಬ್ಯಾಂಕಿಗೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕಾಗುತ್ತವೆ?",
  sub: "ಎರಡು ಪಟ್ಟಿಗಳು ಇರಬಹುದು — ಒಂದು ಚಿಕ್ಕದು, ಒಂದು ದೊಡ್ಡದು. ನಿಮ್ಮದು ಯಾವುದು ಎಂಬುದು ಒಂದೇ ಸಂಗತಿಯಿಂದ ನಿರ್ಧಾರವಾಗುತ್ತದೆ: ಖಾತೆಯಲ್ಲಿ ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉಳಿದ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿದ್ದರೇ?",
  routeNote:
    "ಯಾವ ಪಟ್ಟಿ ಅನ್ವಯಿಸುತ್ತದೆ ಎಂಬುದು ನಿಮ್ಮ ಆಯ್ಕೆಯಲ್ಲ — ಖಾತೆಯಲ್ಲಿ ಮೊದಲೇ ಏನಿತ್ತು ಎಂಬುದರ ಮೇಲೆ ಅದು ಅವಲಂಬಿತ. ನಿಮ್ಮದು ಯಾವುದು ಎಂದು ಖಚಿತವಿಲ್ಲವೇ? ಕ್ಲೇಮ್ ಪ್ರಯಾಣ ಕೆಲವು ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಅದನ್ನು ಕಂಡುಹಿಡಿಯುತ್ತದೆ.",

  nomineeHeading: "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉಳಿದ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿದ್ದರೆ",
  nomineeSub: "ಮೂರು ದಾಖಲೆಗಳು. ಎಷ್ಟೇ ಮೊತ್ತವಿರಲಿ.",
  nomineeGloss:
    "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉಳಿದ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿದ್ದರೆ, ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಪ್ರೊಬೇಟ್, ಅಥವಾ ಅಂತಹ ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಕಾಗದಪತ್ರ ಕೇಳದೆಯೇ ಪಾವತಿಸಬೇಕು — ಖಾತೆಯಲ್ಲಿ ಎಷ್ಟೇ ಮೊತ್ತವಿರಲಿ.",
  ownershipHeading: "ಹಣ ಸಿಗುವುದು ಅದರ ಮಾಲೀಕರಾಗುವುದು ಅಲ್ಲ",
  ownership:
    "ನೀವು ನಾಮನಿರ್ದೇಶಿತರಾಗಿರುವುದರಿಂದ ಬ್ಯಾಂಕ್ ನಿಮಗೆ ಈ ಹಣ ಪಾವತಿಸಬಹುದು — ಆದರೆ ಇದರ ಅರ್ಥ ಹಣ ಪಡೆಯುವ ಹಕ್ಕು ನಿಮಗಿದೆ ಎಂದಷ್ಟೇ, ಮಾಲೀಕತ್ವ ಅಲ್ಲ. ಈ ಹಣ ಇನ್ನೂ ಉತ್ತರಾಧಿಕಾರ ಕಾನೂನಿನ ಪ್ರಕಾರ ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರಿಗೇ ಸೇರಿದ್ದು. ಒಡಹುಟ್ಟಿದವರು, ಪೋಷಕರು, ಅಥವಾ ಇತರ ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರು ಇದ್ದರೆ, ನೀವು ಈ ಹಣವನ್ನು ಅವರಿಗಾಗಿಯೂ ಇಟ್ಟುಕೊಳ್ಳಬೇಕು, ನಿಮಗೊಬ್ಬರಿಗೇ ಅಲ್ಲ.",

  simplifiedHeading: (commercial, cooperative) =>
    `ನಾಮನಿರ್ದೇಶಿತರು ಇಲ್ಲದಿದ್ದರೆ, ಮತ್ತು ಒಟ್ಟು ಮೊತ್ತ ${commercial} ಕ್ಕಿಂತ ಕಡಿಮೆಯಿದ್ದರೆ (ಸಹಕಾರಿ ಬ್ಯಾಂಕಿನಲ್ಲಿ ${cooperative} ಕ್ಕಿಂತ ಕಡಿಮೆ)`,
  simplifiedSub: "ಆರು ದಾಖಲೆಗಳು. ಅದಕ್ಕಿಂತ ಹೆಚ್ಚೇನೂ ಇಲ್ಲ.",
  simplifiedGloss:
    "ಈ ಮೊತ್ತಕ್ಕಿಂತ ಕಡಿಮೆಯಿದ್ದರೆ, ಇದೇ ಬ್ಯಾಂಕಿನ ಸಂಪೂರ್ಣ ಪಟ್ಟಿ. ಈ ಆರರ ಆಚೆ ಬ್ಯಾಂಕ್ ಏನನ್ನೂ ಕೇಳುವಂತಿಲ್ಲ, ಮತ್ತು ಇವುಗಳನ್ನು ನೀಡಿದ ನಂತರ ಕ್ಲೇಮ್ ಇತ್ಯರ್ಥಗೊಳಿಸಲು ನಿರಾಕರಿಸುವಂತಿಲ್ಲ.",
  noSuretyGloss:
    "ಈ ಮೊತ್ತಕ್ಕಿಂತ ಕಡಿಮೆಯಿದ್ದರೆ, ನಿಮ್ಮ ಕ್ಲೇಮಿಗೆ ಜಾಮೀನುದಾರರಾಗಿ ಯಾವುದೇ ಮೂರನೇ ವ್ಯಕ್ತಿಯನ್ನು ಬ್ಯಾಂಕ್ ಕೇಳುವಂತಿಲ್ಲ.",

  notOnListHeading: "ಬ್ಯಾಂಕ್ ನಿಮ್ಮಿಂದ ಇವನ್ನು ಕೇಳಬಾರದು",
  notOnList:
    "ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ. ಪ್ರೊಬೇಟ್. ವಂಶಾವಳಿ ದಾಖಲೆ. ಸಾಕ್ಷಿಗಳು. ಜಾಮೀನುದಾರರು. ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಮೊತ್ತದಲ್ಲಿ ಶಾಖೆ ಇವುಗಳಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಕೇಳಿದರೆ, ಅದು ನಿಯಮಕ್ಕಿಂತ ಹೆಚ್ಚು ಕೇಳುತ್ತಿದೆ.",

  aboveHeading: (commercial, cooperative) =>
    `ಒಟ್ಟು ಮೊತ್ತ ${commercial} ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿದ್ದರೆ (ಸಹಕಾರಿ ಬ್ಯಾಂಕಿನಲ್ಲಿ ${cooperative} ಅಥವಾ ಹೆಚ್ಚು)`,
  aboveGloss:
    "ಮೇಲಿನ ಆರು-ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಇನ್ನು ಅನ್ವಯಿಸುವುದಿಲ್ಲ. ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ (ಅಥವಾ ಅಂತಹ ಇನ್ನೊಂದು ನ್ಯಾಯಾಲಯದ ದಾಖಲೆ), ಅಥವಾ ಕಾನೂನುಬದ್ಧ ಉತ್ತರಾಧಿಕಾರಿ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರ ಅಫಿಡವಿಟ್ ಕೇಳಬಹುದು. ಒಂದು ಗಮನಿಸಬೇಕಾದ ಸಂಗತಿ: ಈ ಮಿತಿಯು ಆ ಒಂದೇ ಬ್ಯಾಂಕಿನಲ್ಲಿ ನಿಮ್ಮ ಎಲ್ಲ ಖಾತೆಗಳ ಒಟ್ಟು ಮೊತ್ತಕ್ಕೆ ಅನ್ವಯಿಸುತ್ತದೆ, ಪ್ರತಿ ಖಾತೆಗೆ ಪ್ರತ್ಯೇಕವಾಗಿ ಅಲ್ಲ.",
  disputeGloss:
    "ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರು ಪರಸ್ಪರ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಹೊಂದಿದ್ದರೆ, ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ ಬ್ಯಾಂಕ್ ನ್ಯಾಯಾಲಯದ ದಾಖಲೆ ಕೇಳುತ್ತದೆ — ಪ್ರೊಬೇಟ್, ಆಡಳಿತ ಪತ್ರ, ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಅಥವಾ ನ್ಯಾಯಾಲಯದ ಆದೇಶ.",

  ctaHeading: "ಯಾವ ಪಟ್ಟಿ ನಿಮ್ಮದು ಎಂದು ಖಚಿತವಿಲ್ಲವೇ?",
  ctaSub: "ಕೆಲವು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ, ಮತ್ತು ನಿಮಗೆ ಯಾವ ಪಟ್ಟಿ ಅನ್ವಯಿಸುತ್ತದೆ ಮತ್ತು ಅದು ಯಾವ ನಿಯಮದಿಂದ ಬರುತ್ತದೆ ಎಂದು ನಾವು ನಿಖರವಾಗಿ ಹೇಳುತ್ತೇವೆ.",
  cta: "ಕ್ಲೇಮ್ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",

  paraLabel: (para) => `ಆರ್‌ಬಿಐ ನಿರ್ದೇಶನಗಳು, ಪ್ಯಾರಾಗ್ರಾಫ್ ${para}`,
  glossLabel: "ಸರಳ ಮಾತಿನಲ್ಲಿ",
  summaryLabel: "ಸಂಕ್ಷಿಪ್ತವಾಗಿ:",
  sourceLine:
    "ಆರ್‌ಬಿಐನ Settlement of Claims in respect of Deceased Customers of Banks Directions, 2025 ರಿಂದ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ. ಆರ್‌ಬಿಐ ಅಥವಾ ಯಾವುದೇ ಬ್ಯಾಂಕಿನೊಂದಿಗೆ ಸಂಬಂಧ ಹೊಂದಿಲ್ಲ. ಇದು ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆ ಅಲ್ಲ.",
};

export const DOCS_T: Record<Locale, DocsDict> = { en, hi, kn };
