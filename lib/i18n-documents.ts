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
  /** Sarbati Devi. Load-bearing on every nominee surface. */
  ownershipHeading: string;
  ownership: string;

  simplifiedHeading: string;
  simplifiedSub: string;
  simplifiedGloss: string;
  noSuretyGloss: string;

  notOnListHeading: string;
  notOnList: string;

  aboveHeading: string;
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
  homeCta: "See what documents are required",
  eyebrow: "Before you go to the branch",
  heading: "What documents will the bank need?",
  sub: "There are two lists, and they are very different lengths. Which one applies to you is decided by one fact: whether a nominee or a surviving joint holder was on record.",
  routeNote:
    "This is not a choice. The bank decides which list applies from what is already on the account. If you are not sure which is yours, the claim journey confirms it in a few questions.",

  nomineeHeading: "If a nominee or surviving joint holder is on record",
  nomineeSub: "Three documents. No amount limit.",
  nomineeGloss:
    "Where a nominee or a surviving joint holder is registered, the bank is not allowed to ask for a succession certificate, letter of administration or probate, or for an indemnity or surety — whatever the balance is.",
  ownershipHeading: "Being paid is not the same as owning it",
  ownership:
    "A nominee is the person the bank is allowed to pay. They do not become the owner. The money still belongs to the legal heirs under succession law, and a nominee who is not the sole heir holds it in trust for the others.",

  simplifiedHeading: "If there was no nominee, and the total is below the threshold",
  simplifiedSub: "Six documents. Nothing beyond them.",
  simplifiedGloss:
    "Below the threshold, the rule does not merely discourage extra paperwork — it requires the bank to settle the claim on this list.",
  noSuretyGloss:
    "A third party who signs to guarantee the claim cannot be demanded at all below the threshold.",

  notOnListHeading: "What is deliberately not on either list",
  notOnList:
    "A succession certificate, probate, a family-tree document (vanshavali), witnesses to the indemnity, or a third-party surety. Below the threshold, a branch asking for any of these is asking for more than the rule allows.",

  aboveHeading: "If the total is at or above the threshold",
  aboveGloss:
    "The simplified list stops applying. The bank may ask for a succession certificate or equivalent, or a legal heir certificate or a sworn affidavit. The threshold is the total across every account at that one bank, not per account.",
  disputeGloss:
    "Where the heirs are contesting each other, the bank requires a court document whatever the amount — a probate, letter of administration, succession certificate, or a court order.",

  ctaHeading: "Not sure which list is yours?",
  ctaSub: "A few questions, and you get the list for your situation with the paragraph it comes from.",
  cta: "Start the claim journey",

  paraLabel: (para) => `RBI Directions, paragraph ${para}`,
  glossLabel: "In plain words",
  summaryLabel: "In summary:",
  sourceLine:
    "Quoted from the RBI's Settlement of Claims in respect of Deceased Customers of Banks Directions, 2025. Not affiliated with the RBI or any bank. Information, not legal advice.",
};

const hi: DocsDict = {
  homeCta: "देखें कौन-से दस्तावेज़ चाहिए",
  eyebrow: "शाखा जाने से पहले",
  heading: "बैंक को कौन-से दस्तावेज़ चाहिए होंगे?",
  sub: "दो सूचियाँ हैं, और उनकी लंबाई में बड़ा फ़र्क़ है। आप पर कौन-सी लागू होगी, यह एक बात से तय होता है: खाते में नामांकित व्यक्ति या जीवित संयुक्त धारक दर्ज था या नहीं।",
  routeNote:
    "यह आपकी पसंद नहीं है। बैंक खाते में पहले से दर्ज जानकारी से तय करता है कि कौन-सी सूची लागू होगी। यदि आपको यक़ीन नहीं है कि आपका मामला कौन-सा है, तो दावा यात्रा कुछ सवालों में इसकी पुष्टि कर देती है।",

  nomineeHeading: "यदि नामांकित व्यक्ति या जीवित संयुक्त धारक दर्ज है",
  nomineeSub: "तीन दस्तावेज़। कोई राशि सीमा नहीं।",
  nomineeGloss:
    "जहाँ नामांकित व्यक्ति या जीवित संयुक्त धारक दर्ज है, वहाँ बैंक उत्तराधिकार प्रमाणपत्र, प्रशासन पत्र या प्रोबेट, या क्षतिपूर्ति बॉन्ड या ज़मानत नहीं माँग सकता — शेष राशि चाहे जितनी हो।",
  ownershipHeading: "भुगतान मिलना और मालिक होना एक बात नहीं है",
  ownership:
    "नामांकित व्यक्ति वह है जिसे बैंक भुगतान कर सकता है। वे मालिक नहीं बन जाते। उत्तराधिकार क़ानून के अनुसार पैसा अब भी क़ानूनी उत्तराधिकारियों का है, और जो नामांकित व्यक्ति अकेला उत्तराधिकारी नहीं है, वह उसे बाक़ी सबके लिए न्यास (ट्रस्ट) में रखता है।",

  simplifiedHeading: "यदि कोई नामांकित व्यक्ति नहीं था, और कुल राशि सीमा से कम है",
  simplifiedSub: "छह दस्तावेज़। इनसे आगे कुछ नहीं।",
  simplifiedGloss:
    "सीमा से कम राशि पर नियम केवल अतिरिक्त काग़ज़ी कार्रवाई को हतोत्साहित नहीं करता — वह बैंक से अपेक्षा करता है कि वह इसी सूची के आधार पर दावा निपटाए।",
  noSuretyGloss:
    "सीमा से कम राशि के दावों में दावे की ज़मानत देने वाला कोई तीसरा व्यक्ति माँगा ही नहीं जा सकता।",

  notOnListHeading: "दोनों सूचियों में जानबूझकर क्या नहीं है",
  notOnList:
    "उत्तराधिकार प्रमाणपत्र, प्रोबेट, वंशावली, क्षतिपूर्ति बॉन्ड के गवाह, या तीसरे पक्ष की ज़मानत। सीमा से कम राशि पर इनमें से कुछ भी माँगने वाली शाखा नियम से ज़्यादा माँग रही है।",

  aboveHeading: "यदि कुल राशि सीमा के बराबर या उससे अधिक है",
  aboveGloss:
    "सरल सूची लागू होना बंद हो जाती है। बैंक उत्तराधिकार प्रमाणपत्र या समकक्ष, या क़ानूनी उत्तराधिकारी प्रमाणपत्र या शपथपत्र माँग सकता है। सीमा उस एक बैंक के सभी खातों की कुल राशि पर लगती है, प्रति खाता नहीं।",
  disputeGloss:
    "जहाँ उत्तराधिकारी आपस में विवाद कर रहे हों, वहाँ राशि चाहे जितनी हो, बैंक न्यायालय का दस्तावेज़ माँगता है — प्रोबेट, प्रशासन पत्र, उत्तराधिकार प्रमाणपत्र, या न्यायालयीन आदेश।",

  ctaHeading: "यक़ीन नहीं कि कौन-सी सूची आपकी है?",
  ctaSub: "कुछ सवाल, और आपको अपनी स्थिति की सूची उस पैराग्राफ़ के साथ मिलेगी जिससे वह आती है।",
  cta: "दावा यात्रा शुरू करें",

  paraLabel: (para) => `आरबीआई निर्देश, पैराग्राफ़ ${para}`,
  glossLabel: "सरल शब्दों में",
  summaryLabel: "संक्षेप में:",
  sourceLine:
    "आरबीआई के Settlement of Claims in respect of Deceased Customers of Banks Directions, 2025 से उद्धृत। आरबीआई या किसी बैंक से संबद्ध नहीं। यह जानकारी है, क़ानूनी सलाह नहीं।",
};

const kn: DocsDict = {
  homeCta: "ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು ಎಂದು ನೋಡಿ",
  eyebrow: "ಶಾಖೆಗೆ ಹೋಗುವ ಮೊದಲು",
  heading: "ಬ್ಯಾಂಕಿಗೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕಾಗುತ್ತವೆ?",
  sub: "ಎರಡು ಪಟ್ಟಿಗಳಿವೆ, ಮತ್ತು ಅವುಗಳ ಉದ್ದದಲ್ಲಿ ದೊಡ್ಡ ವ್ಯತ್ಯಾಸವಿದೆ. ನಿಮಗೆ ಯಾವುದು ಅನ್ವಯಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಒಂದೇ ಸಂಗತಿ ನಿರ್ಧರಿಸುತ್ತದೆ: ಖಾತೆಯಲ್ಲಿ ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉಳಿದ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿದ್ದರೇ ಎಂಬುದು.",
  routeNote:
    "ಇದು ನಿಮ್ಮ ಆಯ್ಕೆಯಲ್ಲ. ಖಾತೆಯಲ್ಲಿ ಈಗಾಗಲೇ ಇರುವ ಮಾಹಿತಿಯಿಂದ ಯಾವ ಪಟ್ಟಿ ಅನ್ವಯಿಸುತ್ತದೆ ಎಂದು ಬ್ಯಾಂಕ್ ನಿರ್ಧರಿಸುತ್ತದೆ. ನಿಮ್ಮದು ಯಾವುದು ಎಂಬ ಬಗ್ಗೆ ಖಚಿತವಿಲ್ಲದಿದ್ದರೆ, ಕ್ಲೇಮ್ ಪ್ರಯಾಣವು ಕೆಲವು ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಅದನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.",

  nomineeHeading: "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉಳಿದ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿದ್ದರೆ",
  nomineeSub: "ಮೂರು ದಾಖಲೆಗಳು. ಮೊತ್ತದ ಮಿತಿ ಇಲ್ಲ.",
  nomineeGloss:
    "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉಳಿದ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿರುವಲ್ಲಿ, ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಆಡಳಿತ ಪತ್ರ ಅಥವಾ ಪ್ರೊಬೇಟ್, ಅಥವಾ ನಷ್ಟಭರ್ತಿ ಬಾಂಡ್ ಅಥವಾ ಜಾಮೀನು ಕೇಳುವಂತಿಲ್ಲ — ಬಾಕಿ ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ.",
  ownershipHeading: "ಹಣ ಪಡೆಯುವುದು ಮತ್ತು ಮಾಲೀಕರಾಗುವುದು ಒಂದೇ ಅಲ್ಲ",
  ownership:
    "ನಾಮನಿರ್ದೇಶಿತರು ಎಂದರೆ ಬ್ಯಾಂಕ್ ಹಣ ಪಾವತಿಸಬಹುದಾದ ವ್ಯಕ್ತಿ. ಅವರು ಮಾಲೀಕರಾಗುವುದಿಲ್ಲ. ಉತ್ತರಾಧಿಕಾರ ಕಾನೂನಿನ ಪ್ರಕಾರ ಹಣ ಇನ್ನೂ ಕಾನೂನುಬದ್ಧ ಉತ್ತರಾಧಿಕಾರಿಗಳಿಗೇ ಸೇರಿದ್ದು, ಏಕೈಕ ಉತ್ತರಾಧಿಕಾರಿಯಲ್ಲದ ನಾಮನಿರ್ದೇಶಿತರು ಅದನ್ನು ಉಳಿದವರ ಪರವಾಗಿ ಟ್ರಸ್ಟ್‌ನಲ್ಲಿ ಹೊಂದಿರುತ್ತಾರೆ.",

  simplifiedHeading: "ನಾಮನಿರ್ದೇಶಿತರು ಇಲ್ಲದಿದ್ದರೆ, ಮತ್ತು ಒಟ್ಟು ಮೊತ್ತ ಮಿತಿಗಿಂತ ಕಡಿಮೆಯಿದ್ದರೆ",
  simplifiedSub: "ಆರು ದಾಖಲೆಗಳು. ಅವುಗಳ ಆಚೆ ಏನೂ ಇಲ್ಲ.",
  simplifiedGloss:
    "ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಮೊತ್ತಕ್ಕೆ ನಿಯಮವು ಹೆಚ್ಚುವರಿ ಕಾಗದಪತ್ರವನ್ನು ಕೇವಲ ನಿರುತ್ಸಾಹಗೊಳಿಸುವುದಿಲ್ಲ — ಈ ಪಟ್ಟಿಯ ಆಧಾರದ ಮೇಲೆ ಕ್ಲೇಮ್ ಇತ್ಯರ್ಥಗೊಳಿಸುವಂತೆ ಬ್ಯಾಂಕಿಗೆ ಸೂಚಿಸುತ್ತದೆ.",
  noSuretyGloss:
    "ಮಿತಿಯೊಳಗಿನ ಕ್ಲೇಮ್‌ಗಳಲ್ಲಿ ಕ್ಲೇಮಿಗೆ ಜಾಮೀನು ನೀಡುವ ಮೂರನೇ ವ್ಯಕ್ತಿಯನ್ನು ಕೇಳುವಂತೆಯೇ ಇಲ್ಲ.",

  notOnListHeading: "ಎರಡೂ ಪಟ್ಟಿಗಳಲ್ಲಿ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಇಲ್ಲದಿರುವುದು",
  notOnList:
    "ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಪ್ರೊಬೇಟ್, ವಂಶಾವಳಿ ದಾಖಲೆ, ನಷ್ಟಭರ್ತಿ ಬಾಂಡ್‌ಗೆ ಸಾಕ್ಷಿಗಳು, ಅಥವಾ ಮೂರನೇ ವ್ಯಕ್ತಿಯ ಜಾಮೀನು. ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಮೊತ್ತದಲ್ಲಿ ಇವುಗಳಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಕೇಳುವ ಶಾಖೆ ನಿಯಮಕ್ಕಿಂತ ಹೆಚ್ಚು ಕೇಳುತ್ತಿದೆ.",

  aboveHeading: "ಒಟ್ಟು ಮೊತ್ತ ಮಿತಿಗೆ ಸಮ ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿದ್ದರೆ",
  aboveGloss:
    "ಸರಳ ಪಟ್ಟಿ ಅನ್ವಯವಾಗುವುದು ನಿಲ್ಲುತ್ತದೆ. ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಸಮಾನವಾದದ್ದು, ಅಥವಾ ಕಾನೂನುಬದ್ಧ ಉತ್ತರಾಧಿಕಾರಿ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಪ್ರಮಾಣಪತ್ರ ಅಫಿಡವಿಟ್ ಕೇಳಬಹುದು. ಮಿತಿಯು ಆ ಒಂದೇ ಬ್ಯಾಂಕಿನ ಎಲ್ಲ ಖಾತೆಗಳ ಒಟ್ಟು ಮೊತ್ತಕ್ಕೆ ಅನ್ವಯಿಸುತ್ತದೆ, ಪ್ರತಿ ಖಾತೆಗೆ ಅಲ್ಲ.",
  disputeGloss:
    "ಉತ್ತರಾಧಿಕಾರಿಗಳು ಪರಸ್ಪರ ವಿವಾದದಲ್ಲಿದ್ದರೆ, ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ ಬ್ಯಾಂಕ್ ನ್ಯಾಯಾಲಯದ ದಾಖಲೆ ಕೇಳುತ್ತದೆ — ಪ್ರೊಬೇಟ್, ಆಡಳಿತ ಪತ್ರ, ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಅಥವಾ ನ್ಯಾಯಾಲಯದ ಆದೇಶ.",

  ctaHeading: "ಯಾವ ಪಟ್ಟಿ ನಿಮ್ಮದು ಎಂದು ಖಚಿತವಿಲ್ಲವೇ?",
  ctaSub: "ಕೆಲವು ಪ್ರಶ್ನೆಗಳು, ಮತ್ತು ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಯ ಪಟ್ಟಿಯನ್ನು ಅದು ಬರುವ ಪ್ಯಾರಾಗ್ರಾಫ್‌ನೊಂದಿಗೆ ಪಡೆಯುತ್ತೀರಿ.",
  cta: "ಕ್ಲೇಮ್ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",

  paraLabel: (para) => `ಆರ್‌ಬಿಐ ನಿರ್ದೇಶನಗಳು, ಪ್ಯಾರಾಗ್ರಾಫ್ ${para}`,
  glossLabel: "ಸರಳ ಮಾತಿನಲ್ಲಿ",
  summaryLabel: "ಸಂಕ್ಷಿಪ್ತವಾಗಿ:",
  sourceLine:
    "ಆರ್‌ಬಿಐನ Settlement of Claims in respect of Deceased Customers of Banks Directions, 2025 ರಿಂದ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ. ಆರ್‌ಬಿಐ ಅಥವಾ ಯಾವುದೇ ಬ್ಯಾಂಕಿನೊಂದಿಗೆ ಸಂಬಂಧ ಹೊಂದಿಲ್ಲ. ಇದು ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆ ಅಲ್ಲ.",
};

export const DOCS_T: Record<Locale, DocsDict> = { en, hi, kn };
