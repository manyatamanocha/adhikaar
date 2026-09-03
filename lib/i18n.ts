/**
 * Language.
 *
 * PRODUCT.md anticipated this: "Copy is structured as data so a language is a
 * file." This is that file.
 *
 * ─── Two rules that are not negotiable ───
 *
 * 1. STATUTORY QUOTES ARE NEVER TRANSLATED. A translated quote stops being a
 *    quote. The RBI published those sentences in English; a Hindi rendering of
 *    para 9 is our paraphrase, and a branch officer can refuse it on exactly
 *    that ground. So the quote stays English in every locale, and the plain
 *    translated gloss goes ABOVE it. Same for paragraph numbers, annexure
 *    references, and the notification number.
 *
 * 2. THE LOCALE LIVES IN THE URL, never in a cookie. "No cookie, nothing that
 *    identifies you" is shipped copy on five screens, and a language cookie
 *    would make it false. `?lang=hi` is a normal navigation: Back works, the
 *    page can be sent to a sibling in their language, and nothing is stored.
 *
 * Hindi and Kannada below were written by Claude and have NOT been checked by
 * a native speaker. Before this goes in front of testers, someone who reads
 * each language should go through it — a clumsy translation on a page about a
 * death is worse than English.
 */

export const LOCALES = ["en", "hi", "kn"] as const;
export type Locale = (typeof LOCALES)[number];

/** Each language named in itself, never in English. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  kn: "ಕನ್ನಡ",
};

/** Short form for the switcher on a narrow phone. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  hi: "हि",
  kn: "ಕ",
};

export function parseLocale(raw: string | string[] | undefined): Locale {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return (LOCALES as readonly string[]).includes(v ?? "")
    ? (v as Locale)
    : "en";
}

/** Add the locale to an internal href. English is the default and carries none. */
export function withLang(href: string, lang: Locale): string {
  if (lang === "en") return href;
  const [path, query] = href.split("?");
  const q = new URLSearchParams(query ?? "");
  q.set("lang", lang);
  return `${path}?${q.toString()}`;
}

type Dict = {
  /** Header */
  notGovernment: string;
  theRbiRules: string;
  language: string;

  /** Hero */
  heroLead: string;
  heroClaim: string;
  heroSub: string;
  trustRules: string;
  trustNoData: string;
  trustCited: string;
  cta: string;
  ctaNote: string;

  /** The quote panel. The quote itself is never in here. */
  quoteLabel: string;
  quoteGloss: string;
  quoteAttribution: string;
  surpriseStrong: string;
  surpriseRest: string;
  inForceDate: string;
  inForceLabel: string;

  /** Numbers */
  numbersHeading: string;
  costFigure: string;
  costLabel: string;
  costNote: string;
  timeFigure: string;
  timeUnit: string;
  timeLabel: string;
  timeNote: string;
  floorFigure: string;
  floorLabel: string;
  floorNote: string;
  dateFigure: string;
  dateLabel: string;
  dateNote: string;

  /** Situations */
  situationsHeading: string;
  situationsSub: string;
  chipNoCertificate: string;
  chipSixDocuments: string;
  chipStartHere: string;
  pathNominee: string;
  pathNomineeBody: string;
  pathJoint: string;
  pathJointBody: string;
  pathNoNominee: string;
  pathNoNomineeBody: string;
  pathUnknown: string;
  pathUnknownBody: string;

  /** Assurance + trust strip */
  assuranceTitle: string;
  assuranceSub: string;
  assuranceLink: string;
  tNoSignIn: string;
  tNoSignInNote: string;
  tNoData: string;
  tNoDataNote: string;
  tPlain: string;
  tPlainNote: string;
  tPrint: string;
  tPrintNote: string;
};

const en: Dict = {
  notGovernment: "Not a government website",
  theRbiRules: "The RBI rules",
  language: "Language",

  heroLead: "You probably",
  heroClaim: "do not need a succession certificate.",
  heroSub:
    "RBI rules say that in most deposit claims, a bank must not insist on one.",
  trustRules: "RBI-backed rules",
  trustNoData: "No data stored",
  trustCited: "Every claim cited",
  cta: "Check your options",
  ctaNote: "Takes less than 2 minutes",

  quoteLabel: "The rule, in the RBI's own words",
  quoteGloss:
    "The bank must not ask for a succession certificate, probate, an indemnity bond or a surety — whatever the amount.",
  quoteAttribution:
    "Paragraph 9, where a nominee or surviving joint holder is on record.",
  surpriseStrong: "Most families are surprised to learn this.",
  surpriseRest: "The rule changed recently.",
  inForceDate: "31 March 2026",
  inForceLabel: "Rule in force from",

  numbersHeading: "Four things to know first",
  costFigure: "₹17,000",
  costLabel: "What it costs",
  costNote: "Court fees of about 3% of the amount, plus a lawyer.",
  timeFigure: "4–7",
  timeUnit: "months",
  timeLabel: "How long it takes",
  timeNote: "Uncontested. One to two years if any heir objects.",
  floorFigure: "₹15 lakh",
  floorLabel: "The RBI floor",
  floorNote:
    "Below it a bank must follow the simplified procedure. A bank may set its own higher.",
  dateFigure: "31 Mar 2026",
  dateLabel: "In force from",
  dateNote: "The date the Directions took effect.",

  situationsHeading: "What best describes your situation?",
  situationsSub: "We'll show you exactly what to do next.",
  chipNoCertificate: "No certificate",
  chipSixDocuments: "Six documents",
  chipStartHere: "Start here",
  pathNominee: "A nominee was registered",
  pathNomineeBody: "Nothing further, whatever the amount.",
  pathJoint: "It was a joint account",
  pathJointBody: "A survivorship clause works the same way.",
  pathNoNominee: "There was no nominee",
  pathNoNomineeBody: "A fixed list of six documents, below the floor.",
  pathUnknown: "I don't know",
  pathUnknownBody: "Most families do not. We will help you find out.",

  assuranceTitle: "The RBI's rules, in plain language, step by step.",
  assuranceSub:
    "We quote. You decide. Every sentence carries its paragraph number.",
  assuranceLink: "Read the rule itself",
  tNoSignIn: "No sign-in",
  tNoSignInNote: "No account needed",
  tNoData: "No data stored",
  tNoDataNote: "Nothing reaches a server",
  tPlain: "Plain language",
  tPlainNote: "No unexplained jargon",
  tPrint: "A page to print",
  tPrintNote: "To hand across the counter",
};

const hi: Dict = {
  notGovernment: "यह सरकारी वेबसाइट नहीं है",
  theRbiRules: "आरबीआई के नियम",
  language: "भाषा",

  heroLead: "आपको शायद",
  heroClaim: "उत्तराधिकार प्रमाणपत्र की ज़रूरत नहीं है।",
  heroSub:
    "आरबीआई के नियम कहते हैं कि ज़्यादातर जमा दावों में बैंक इसके लिए ज़ोर नहीं दे सकता।",
  trustRules: "आरबीआई के नियमों पर आधारित",
  trustNoData: "कोई जानकारी संग्रहीत नहीं",
  trustCited: "हर बात का स्रोत दिया गया",
  cta: "अपने विकल्प देखें",
  ctaNote: "दो मिनट से भी कम समय",

  quoteLabel: "नियम, आरबीआई के अपने शब्दों में",
  quoteGloss:
    "बैंक उत्तराधिकार प्रमाणपत्र, प्रोबेट, क्षतिपूर्ति बॉन्ड या ज़मानत नहीं माँग सकता — रकम चाहे जितनी हो।",
  quoteAttribution:
    "पैराग्राफ़ 9, जहाँ खाते में नामांकित व्यक्ति या जीवित संयुक्त धारक दर्ज हो।",
  surpriseStrong: "ज़्यादातर परिवारों को यह जानकर हैरानी होती है।",
  surpriseRest: "नियम हाल ही में बदला है।",
  inForceDate: "31 मार्च 2026",
  inForceLabel: "नियम इस तारीख़ से लागू",

  numbersHeading: "पहले ये चार बातें जान लें",
  costFigure: "₹17,000",
  costLabel: "कितना ख़र्च",
  costNote: "रकम का लगभग 3% अदालती शुल्क, और वकील का ख़र्च अलग।",
  timeFigure: "4–7",
  timeUnit: "महीने",
  timeLabel: "कितना समय",
  timeNote: "बिना विवाद के। कोई वारिस आपत्ति करे तो एक से दो साल।",
  floorFigure: "₹15 लाख",
  floorLabel: "आरबीआई की न्यूनतम सीमा",
  floorNote:
    "इससे कम पर बैंक को सरल प्रक्रिया अपनानी होगी। बैंक अपनी सीमा इससे ऊँची रख सकता है।",
  dateFigure: "31 मार्च 2026",
  dateLabel: "लागू होने की तारीख़",
  dateNote: "इसी दिन से ये निर्देश प्रभावी हुए।",

  situationsHeading: "आपकी स्थिति इनमें से कौन-सी है?",
  situationsSub: "हम बताएँगे कि आगे ठीक-ठीक क्या करना है।",
  chipNoCertificate: "प्रमाणपत्र नहीं",
  chipSixDocuments: "छह दस्तावेज़",
  chipStartHere: "यहाँ से शुरू करें",
  pathNominee: "खाते में नामांकित व्यक्ति दर्ज था",
  pathNomineeBody: "इसके आगे कुछ नहीं, रकम चाहे जितनी हो।",
  pathJoint: "यह संयुक्त खाता था",
  pathJointBody: "उत्तरजीविता की शर्त पर भी यही नियम लागू होता है।",
  pathNoNominee: "कोई नामांकित व्यक्ति नहीं था",
  pathNoNomineeBody: "सीमा से कम रकम पर छह दस्तावेज़ों की तय सूची।",
  pathUnknown: "मुझे नहीं पता",
  pathUnknownBody: "ज़्यादातर परिवारों को नहीं पता होता। हम पता करने में मदद करेंगे।",

  assuranceTitle: "आरबीआई के नियम, आसान भाषा में, कदम दर कदम।",
  assuranceSub:
    "हम नियम दिखाते हैं। फ़ैसला आपका। हर बात के साथ उसका पैराग्राफ़ नंबर है।",
  assuranceLink: "नियम ख़ुद पढ़ें",
  tNoSignIn: "कोई साइन-इन नहीं",
  tNoSignInNote: "खाता बनाने की ज़रूरत नहीं",
  tNoData: "कोई जानकारी संग्रहीत नहीं",
  tNoDataNote: "कुछ भी सर्वर तक नहीं जाता",
  tPlain: "आसान भाषा",
  tPlainNote: "बिना समझाए कोई क़ानूनी शब्द नहीं",
  tPrint: "छापने लायक़ पन्ना",
  tPrintNote: "बैंक काउंटर पर देने के लिए",
};

const kn: Dict = {
  notGovernment: "ಇದು ಸರ್ಕಾರಿ ಜಾಲತಾಣವಲ್ಲ",
  theRbiRules: "ಆರ್‌ಬಿಐ ನಿಯಮಗಳು",
  language: "ಭಾಷೆ",

  heroLead: "ನಿಮಗೆ ಬಹುಶಃ",
  heroClaim: "ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರದ ಅಗತ್ಯವಿಲ್ಲ.",
  heroSub:
    "ಬಹುತೇಕ ಠೇವಣಿ ಕ್ಲೇಮ್‌ಗಳಲ್ಲಿ ಬ್ಯಾಂಕ್ ಇದನ್ನು ಕೇಳುವಂತಿಲ್ಲ ಎಂದು ಆರ್‌ಬಿಐ ನಿಯಮಗಳು ಹೇಳುತ್ತವೆ.",
  trustRules: "ಆರ್‌ಬಿಐ ನಿಯಮಗಳ ಆಧಾರದ ಮೇಲೆ",
  trustNoData: "ಯಾವುದೇ ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ",
  trustCited: "ಪ್ರತಿ ಮಾತಿಗೂ ಆಧಾರ",
  cta: "ನಿಮ್ಮ ಆಯ್ಕೆಗಳನ್ನು ನೋಡಿ",
  ctaNote: "ಎರಡು ನಿಮಿಷಗಳಿಗಿಂತ ಕಡಿಮೆ",

  quoteLabel: "ನಿಯಮ, ಆರ್‌ಬಿಐ ಅವರದೇ ಮಾತುಗಳಲ್ಲಿ",
  quoteGloss:
    "ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಪ್ರೊಬೇಟ್, ನಷ್ಟಭರ್ತಿ ಬಾಂಡ್ ಅಥವಾ ಜಾಮೀನು ಕೇಳುವಂತಿಲ್ಲ — ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ.",
  quoteAttribution:
    "ಪ್ಯಾರಾಗ್ರಾಫ್ 9, ಖಾತೆಯಲ್ಲಿ ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉಳಿದ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿದ್ದಲ್ಲಿ.",
  surpriseStrong: "ಬಹುತೇಕ ಕುಟುಂಬಗಳಿಗೆ ಇದು ತಿಳಿದಿರುವುದಿಲ್ಲ.",
  surpriseRest: "ನಿಯಮ ಇತ್ತೀಚೆಗೆ ಬದಲಾಗಿದೆ.",
  inForceDate: "31 ಮಾರ್ಚ್ 2026",
  inForceLabel: "ನಿಯಮ ಜಾರಿಗೆ ಬಂದ ದಿನಾಂಕ",

  numbersHeading: "ಮೊದಲು ತಿಳಿಯಬೇಕಾದ ನಾಲ್ಕು ಸಂಗತಿಗಳು",
  costFigure: "₹17,000",
  costLabel: "ಎಷ್ಟು ವೆಚ್ಚ",
  costNote: "ಮೊತ್ತದ ಸುಮಾರು 3% ನ್ಯಾಯಾಲಯ ಶುಲ್ಕ, ಜೊತೆಗೆ ವಕೀಲರ ವೆಚ್ಚ.",
  timeFigure: "4–7",
  timeUnit: "ತಿಂಗಳು",
  timeLabel: "ಎಷ್ಟು ಸಮಯ",
  timeNote: "ವಿವಾದವಿಲ್ಲದಿದ್ದರೆ. ಯಾರಾದರೂ ಆಕ್ಷೇಪಿಸಿದರೆ ಒಂದರಿಂದ ಎರಡು ವರ್ಷ.",
  floorFigure: "₹15 ಲಕ್ಷ",
  floorLabel: "ಆರ್‌ಬಿಐ ನಿಗದಿಪಡಿಸಿದ ಕನಿಷ್ಠ ಮಿತಿ",
  floorNote:
    "ಇದಕ್ಕಿಂತ ಕಡಿಮೆಗೆ ಬ್ಯಾಂಕ್ ಸರಳ ಪ್ರಕ್ರಿಯೆ ಅನುಸರಿಸಬೇಕು. ಬ್ಯಾಂಕ್ ತನ್ನ ಮಿತಿಯನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.",
  dateFigure: "31 ಮಾರ್ಚ್ 2026",
  dateLabel: "ಜಾರಿಗೆ ಬಂದದ್ದು",
  dateNote: "ಈ ದಿನದಿಂದ ಈ ನಿರ್ದೇಶನಗಳು ಜಾರಿಗೆ ಬಂದವು.",

  situationsHeading: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿ ಯಾವುದು?",
  situationsSub: "ಮುಂದೆ ನಿಖರವಾಗಿ ಏನು ಮಾಡಬೇಕೆಂದು ನಾವು ತಿಳಿಸುತ್ತೇವೆ.",
  chipNoCertificate: "ಪ್ರಮಾಣಪತ್ರ ಬೇಕಿಲ್ಲ",
  chipSixDocuments: "ಆರು ದಾಖಲೆಗಳು",
  chipStartHere: "ಇಲ್ಲಿಂದ ಆರಂಭಿಸಿ",
  pathNominee: "ಖಾತೆಯಲ್ಲಿ ನಾಮನಿರ್ದೇಶಿತರು ಇದ್ದರು",
  pathNomineeBody: "ಇದಕ್ಕಿಂತ ಹೆಚ್ಚೇನೂ ಬೇಡ, ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ.",
  pathJoint: "ಇದು ಜಂಟಿ ಖಾತೆಯಾಗಿತ್ತು",
  pathJointBody: "ಉತ್ತರಜೀವಿತ್ವದ ಷರತ್ತಿಗೂ ಇದೇ ನಿಯಮ.",
  pathNoNominee: "ನಾಮನಿರ್ದೇಶಿತರು ಇರಲಿಲ್ಲ",
  pathNoNomineeBody: "ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಮೊತ್ತಕ್ಕೆ ಆರು ದಾಖಲೆಗಳ ನಿಗದಿತ ಪಟ್ಟಿ.",
  pathUnknown: "ನನಗೆ ಗೊತ್ತಿಲ್ಲ",
  pathUnknownBody: "ಬಹುತೇಕ ಕುಟುಂಬಗಳಿಗೆ ಗೊತ್ತಿರುವುದಿಲ್ಲ. ತಿಳಿಯಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",

  assuranceTitle: "ಆರ್‌ಬಿಐ ನಿಯಮಗಳು, ಸರಳ ಭಾಷೆಯಲ್ಲಿ, ಹಂತ ಹಂತವಾಗಿ.",
  assuranceSub:
    "ನಾವು ನಿಯಮವನ್ನು ತೋರಿಸುತ್ತೇವೆ. ನಿರ್ಧಾರ ನಿಮ್ಮದು. ಪ್ರತಿ ಮಾತಿಗೂ ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆ ಇದೆ.",
  assuranceLink: "ನಿಯಮವನ್ನೇ ಓದಿ",
  tNoSignIn: "ಸೈನ್-ಇನ್ ಬೇಡ",
  tNoSignInNote: "ಖಾತೆ ತೆರೆಯುವ ಅಗತ್ಯವಿಲ್ಲ",
  tNoData: "ಯಾವುದೇ ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ",
  tNoDataNote: "ಏನೂ ಸರ್ವರ್‌ಗೆ ಹೋಗುವುದಿಲ್ಲ",
  tPlain: "ಸರಳ ಭಾಷೆ",
  tPlainNote: "ವಿವರಿಸದ ಕಾನೂನು ಪದಗಳಿಲ್ಲ",
  tPrint: "ಮುದ್ರಿಸಬಹುದಾದ ಪುಟ",
  tPrintNote: "ಬ್ಯಾಂಕ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಕೊಡಲು",
};

export const T: Record<Locale, Dict> = { en, hi, kn };
