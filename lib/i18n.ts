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
  const [base, hash] = href.split("#");
  const [path, query] = base.split("?");
  const q = new URLSearchParams(query ?? "");
  if (lang === "en") q.delete("lang");
  else q.set("lang", lang);
  return `${path}${q.size ? `?${q}` : ""}${hash !== undefined ? `#${hash}` : ""}`;
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
  trustFree: string;
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

  /** Numbers -- each one traces to a specific paragraph in lib/rbi.ts */
  numbersHeading: string;
  thresholdFigure: string;
  thresholdLabel: string;
  thresholdNote: string;
  docsFigure: string;
  docsLabel: string;
  docsNote: string;
  daysFigure: string;
  daysLabel: string;
  daysNote: string;
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

  /** UDGAM strip -- small, directly under the hero CTA */
  udgamStripHeading: string;
  udgamStripBody: string;
  udgamStripCta: string;

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

  /** Final CTA -- the page's actual closing action */
  finalCtaHeading: string;
  finalCtaSub: string;
  finalCta: string;
};

const en: Dict = {
  notGovernment: "Not a government website",
  theRbiRules: "The RBI rules",
  language: "Language",

  heroLead: "You probably",
  heroClaim: "do not need a succession certificate.",
  heroSub:
    "RBI rules say that in most deposit claims, a bank must not insist on one.",
  trustRules: "Based on RBI Directions",
  trustNoData: "No document uploads",
  trustCited: "Every claim cited",
  trustFree: "Free to use",
  cta: "Check your options",
  ctaNote: "Takes less than 2 minutes",

  udgamStripHeading: "Still looking for the deposit?",
  udgamStripBody:
    "The RBI's UDGAM portal can help you search for unclaimed bank deposits. Once you find one, Adhikaar helps you understand the claim route.",
  udgamStripCta: "Find it on UDGAM",

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
  thresholdFigure: "₹15 lakh",
  thresholdLabel: "Simplified-claim threshold",
  thresholdNote:
    "For banks other than co-operative banks (₹5 lakh for a co-operative bank). A bank may set its own higher limit.",
  docsFigure: "3 documents",
  docsLabel: "If a nominee or survivor is on record",
  docsNote:
    "Claim form, death certificate and ID proof. No succession certificate, whatever the amount.",
  daysFigure: "15 days",
  daysLabel: "RBI settlement deadline",
  daysNote: "From the date the bank has received every required document.",
  dateFigure: "31 Mar 2026",
  dateLabel: "Directions in force from",
  dateNote: "The date banks had to have these rules in place.",

  situationsHeading: "What best describes your situation?",
  situationsSub: "We'll show you exactly what to do next.",
  chipNoCertificate: "No certificate",
  chipSixDocuments: "Six documents",
  chipStartHere: "Start here",
  pathNominee: "A nominee was registered",
  pathNomineeBody: "You'll typically still need the claim form, death certificate and ID proof.",
  pathJoint: "It was a joint account",
  pathJointBody: "A survivorship clause works the same way — the same three documents apply.",
  pathNoNominee: "There was no nominee",
  pathNoNomineeBody: "Check the bank threshold, will status, disputes and court restrictions before using the simplified checklist.",
  pathUnknown: "I don't know",
  pathUnknownBody: "Most families do not. We will help you find out.",

  assuranceTitle: "The RBI's rules, in plain language, step by step.",
  assuranceSub:
    "We quote. You decide. Every sentence carries its paragraph number.",
  assuranceLink: "Read the rule itself",
  tNoSignIn: "No sign-in",
  tNoSignInNote: "No account needed",
  tNoData: "No document uploads",
  tNoDataNote: "See Privacy for data handling",
  tPlain: "Plain language",
  tPlainNote: "No unexplained jargon",
  tPrint: "A page to print",
  tPrintNote: "To hand across the counter",

  finalCtaHeading: "Know what applies to your claim.",
  finalCtaSub:
    "A few questions, the conditions that matter, and guidance with its paragraph number.",
  finalCta: "Check your situation",
};

const hi: Dict = {
  notGovernment: "यह सरकारी वेबसाइट नहीं है",
  theRbiRules: "आरबीआई के नियम",
  language: "भाषा",

  heroLead: "आपको शायद",
  heroClaim: "उत्तराधिकार प्रमाणपत्र की ज़रूरत नहीं है।",
  heroSub:
    "आरबीआई के नियम कहते हैं कि ज़्यादातर जमा दावों में बैंक इसके लिए ज़ोर नहीं दे सकता।",
  trustRules: "आरबीआई निर्देशों पर आधारित",
  trustNoData: "दस्तावेज़ अपलोड नहीं",
  trustCited: "हर बात का स्रोत दिया गया",
  trustFree: "उपयोग निःशुल्क",
  cta: "अपने विकल्प देखें",
  ctaNote: "दो मिनट से भी कम समय",

  udgamStripHeading: "अभी भी जमा राशि ढूँढ रहे हैं?",
  udgamStripBody:
    "आरबीआई का उद्गम पोर्टल बिना दावे की बैंक जमा खोजने में मदद कर सकता है। कुछ मिलने पर, अधिकार आपको दावा करने का तरीक़ा समझाता है।",
  udgamStripCta: "उद्गम पर खोजें",

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
  thresholdFigure: "₹15 लाख",
  thresholdLabel: "सरल दावा प्रक्रिया की सीमा",
  thresholdNote:
    "सहकारी बैंकों को छोड़कर अन्य बैंकों के लिए (सहकारी बैंक के लिए ₹5 लाख)। बैंक अपनी सीमा इससे ऊँची रख सकता है।",
  docsFigure: "3 दस्तावेज़",
  docsLabel: "नामांकित या संयुक्त धारक दर्ज होने पर",
  docsNote:
    "दावा फ़ॉर्म, मृत्यु प्रमाणपत्र और पहचान प्रमाण। रकम चाहे जितनी हो, उत्तराधिकार प्रमाणपत्र नहीं चाहिए।",
  daysFigure: "15 दिन",
  daysLabel: "आरबीआई की निपटान समय-सीमा",
  daysNote: "बैंक को सभी ज़रूरी दस्तावेज़ मिलने की तारीख़ से।",
  dateFigure: "31 मार्च 2026",
  dateLabel: "निर्देश लागू होने की तारीख़",
  dateNote: "इसी तारीख़ तक बैंकों को यह नियम लागू करना था।",

  situationsHeading: "आपकी स्थिति इनमें से कौन-सी है?",
  situationsSub: "हम बताएँगे कि आगे ठीक-ठीक क्या करना है।",
  chipNoCertificate: "प्रमाणपत्र नहीं",
  chipSixDocuments: "छह दस्तावेज़",
  chipStartHere: "यहाँ से शुरू करें",
  pathNominee: "खाते में नामांकित व्यक्ति दर्ज था",
  pathNomineeBody: "फिर भी सामान्यतः दावा फ़ॉर्म, मृत्यु प्रमाणपत्र और पहचान प्रमाण चाहिए होंगे।",
  pathJoint: "यह संयुक्त खाता था",
  pathJointBody: "उत्तरजीविता की शर्त पर भी यही नियम लागू होता है — वही तीन दस्तावेज़ चाहिए।",
  pathNoNominee: "कोई नामांकित व्यक्ति नहीं था",
  pathNoNomineeBody: "सरल दस्तावेज़ सूची इस्तेमाल करने से पहले बैंक की सीमा, वसीयत, विवाद और अदालती रोक की जाँच करें।",
  pathUnknown: "मुझे नहीं पता",
  pathUnknownBody: "ज़्यादातर परिवारों को नहीं पता होता। हम पता करने में मदद करेंगे।",

  assuranceTitle: "आरबीआई के नियम, आसान भाषा में, कदम दर कदम।",
  assuranceSub:
    "हम नियम दिखाते हैं। फ़ैसला आपका। हर बात के साथ उसका पैराग्राफ़ नंबर है।",
  assuranceLink: "नियम ख़ुद पढ़ें",
  tNoSignIn: "कोई साइन-इन नहीं",
  tNoSignInNote: "खाता बनाने की ज़रूरत नहीं",
  tNoData: "दस्तावेज़ अपलोड नहीं",
  tNoDataNote: "जानकारी के उपयोग के लिए गोपनीयता पृष्ठ पढ़ें",
  tPlain: "आसान भाषा",
  tPlainNote: "बिना समझाए कोई क़ानूनी शब्द नहीं",
  tPrint: "छापने लायक़ पन्ना",
  tPrintNote: "बैंक काउंटर पर देने के लिए",

  finalCtaHeading: "जानिए आपके दावे पर क्या लागू होता है।",
  finalCtaSub: "चार सवाल, लगभग दो मिनट, और पैराग्राफ़ नंबर के साथ सीधा जवाब।",
  finalCta: "अपनी स्थिति जानें",
};

const kn: Dict = {
  notGovernment: "ಇದು ಸರ್ಕಾರಿ ಜಾಲತಾಣವಲ್ಲ",
  theRbiRules: "ಆರ್‌ಬಿಐ ನಿಯಮಗಳು",
  language: "ಭಾಷೆ",

  heroLead: "ನಿಮಗೆ ಬಹುಶಃ",
  heroClaim: "ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರದ ಅಗತ್ಯವಿಲ್ಲ.",
  heroSub:
    "ಬಹುತೇಕ ಠೇವಣಿ ಕ್ಲೇಮ್‌ಗಳಲ್ಲಿ ಬ್ಯಾಂಕ್ ಇದನ್ನು ಕೇಳುವಂತಿಲ್ಲ ಎಂದು ಆರ್‌ಬಿಐ ನಿಯಮಗಳು ಹೇಳುತ್ತವೆ.",
  trustRules: "ಆರ್‌ಬಿಐ ನಿರ್ದೇಶನಗಳ ಆಧಾರದ ಮೇಲೆ",
  trustNoData: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಬೇಡ",
  trustCited: "ಪ್ರತಿ ಮಾತಿಗೂ ಆಧಾರ",
  trustFree: "ಉಚಿತ ಬಳಕೆ",
  cta: "ನಿಮ್ಮ ಆಯ್ಕೆಗಳನ್ನು ನೋಡಿ",
  ctaNote: "ಎರಡು ನಿಮಿಷಗಳಿಗಿಂತ ಕಡಿಮೆ",

  udgamStripHeading: "ಇನ್ನೂ ಠೇವಣಿ ಹುಡುಕುತ್ತಿದ್ದೀರಾ?",
  udgamStripBody:
    "ಆರ್‌ಬಿಐನ ಉದ್ಗಮ್ ಪೋರ್ಟಲ್ ಹಕ್ಕು ಸಲ್ಲಿಸದ ಬ್ಯಾಂಕ್ ಠೇವಣಿ ಹುಡುಕಲು ನೆರವಾಗುತ್ತದೆ. ಏನಾದರೂ ಸಿಕ್ಕರೆ, ಅದನ್ನು ಹೇಗೆ ಪಡೆಯುವುದು ಎಂದು ಅಧಿಕಾರ್ ವಿವರಿಸುತ್ತದೆ.",
  udgamStripCta: "ಉದ್ಗಮ್‌ನಲ್ಲಿ ಹುಡುಕಿ",

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
  thresholdFigure: "₹15 ಲಕ್ಷ",
  thresholdLabel: "ಸರಳ ಕ್ಲೇಮ್ ಮಿತಿ",
  thresholdNote:
    "ಸಹಕಾರಿ ಬ್ಯಾಂಕುಗಳನ್ನು ಹೊರತುಪಡಿಸಿ ಇತರ ಬ್ಯಾಂಕುಗಳಿಗೆ (ಸಹಕಾರಿ ಬ್ಯಾಂಕಿಗೆ ₹5 ಲಕ್ಷ). ಬ್ಯಾಂಕ್ ತನ್ನ ಮಿತಿಯನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.",
  docsFigure: "3 ದಾಖಲೆಗಳು",
  docsLabel: "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿದ್ದರೆ",
  docsNote:
    "ಕ್ಲೇಮ್ ಫಾರ್ಮ್, ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಗುರುತಿನ ಪುರಾವೆ. ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ, ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಬೇಕಿಲ್ಲ.",
  daysFigure: "15 ದಿನಗಳು",
  daysLabel: "ಆರ್‌ಬಿಐ ಇತ್ಯರ್ಥ ಗಡುವು",
  daysNote: "ಬ್ಯಾಂಕಿಗೆ ಎಲ್ಲಾ ಅಗತ್ಯ ದಾಖಲೆಗಳು ಸಿಕ್ಕ ದಿನಾಂಕದಿಂದ.",
  dateFigure: "31 ಮಾರ್ಚ್ 2026",
  dateLabel: "ನಿರ್ದೇಶನಗಳು ಜಾರಿಗೆ ಬಂದ ದಿನಾಂಕ",
  dateNote: "ಈ ದಿನಾಂಕದೊಳಗೆ ಬ್ಯಾಂಕುಗಳು ಈ ನಿಯಮ ಜಾರಿಗೊಳಿಸಬೇಕಿತ್ತು.",

  situationsHeading: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿ ಯಾವುದು?",
  situationsSub: "ಮುಂದೆ ನಿಖರವಾಗಿ ಏನು ಮಾಡಬೇಕೆಂದು ನಾವು ತಿಳಿಸುತ್ತೇವೆ.",
  chipNoCertificate: "ಪ್ರಮಾಣಪತ್ರ ಬೇಕಿಲ್ಲ",
  chipSixDocuments: "ಆರು ದಾಖಲೆಗಳು",
  chipStartHere: "ಇಲ್ಲಿಂದ ಆರಂಭಿಸಿ",
  pathNominee: "ಖಾತೆಯಲ್ಲಿ ನಾಮನಿರ್ದೇಶಿತರು ಇದ್ದರು",
  pathNomineeBody: "ಆದರೂ ಸಾಮಾನ್ಯವಾಗಿ ಕ್ಲೇಮ್ ಫಾರ್ಮ್, ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಗುರುತಿನ ಪುರಾವೆ ಬೇಕಾಗುತ್ತದೆ.",
  pathJoint: "ಇದು ಜಂಟಿ ಖಾತೆಯಾಗಿತ್ತು",
  pathJointBody: "ಉತ್ತರಜೀವಿತ್ವದ ಷರತ್ತಿಗೂ ಇದೇ ನಿಯಮ — ಅದೇ ಮೂರು ದಾಖಲೆಗಳು ಬೇಕು.",
  pathNoNominee: "ನಾಮನಿರ್ದೇಶಿತರು ಇರಲಿಲ್ಲ",
  pathNoNomineeBody: "ಸರಳ ದಾಖಲೆ ಪಟ್ಟಿಯನ್ನು ಬಳಸುವ ಮೊದಲು ಬ್ಯಾಂಕ್ ಮಿತಿ, ವಿಲ್, ವಿವಾದ ಮತ್ತು ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  pathUnknown: "ನನಗೆ ಗೊತ್ತಿಲ್ಲ",
  pathUnknownBody: "ಬಹುತೇಕ ಕುಟುಂಬಗಳಿಗೆ ಗೊತ್ತಿರುವುದಿಲ್ಲ. ತಿಳಿಯಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",

  assuranceTitle: "ಆರ್‌ಬಿಐ ನಿಯಮಗಳು, ಸರಳ ಭಾಷೆಯಲ್ಲಿ, ಹಂತ ಹಂತವಾಗಿ.",
  assuranceSub:
    "ನಾವು ನಿಯಮವನ್ನು ತೋರಿಸುತ್ತೇವೆ. ನಿರ್ಧಾರ ನಿಮ್ಮದು. ಪ್ರತಿ ಮಾತಿಗೂ ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆ ಇದೆ.",
  assuranceLink: "ನಿಯಮವನ್ನೇ ಓದಿ",
  tNoSignIn: "ಸೈನ್-ಇನ್ ಬೇಡ",
  tNoSignInNote: "ಖಾತೆ ತೆರೆಯುವ ಅಗತ್ಯವಿಲ್ಲ",
  tNoData: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಬೇಡ",
  tNoDataNote: "ಮಾಹಿತಿ ಬಳಕೆಗಾಗಿ ಗೌಪ್ಯತೆ ಪುಟ ಓದಿ",
  tPlain: "ಸರಳ ಭಾಷೆ",
  tPlainNote: "ವಿವರಿಸದ ಕಾನೂನು ಪದಗಳಿಲ್ಲ",
  tPrint: "ಮುದ್ರಿಸಬಹುದಾದ ಪುಟ",
  tPrintNote: "ಬ್ಯಾಂಕ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಕೊಡಲು",

  finalCtaHeading: "ನಿಮ್ಮ ಕ್ಲೇಮ್‌ಗೆ ಏನು ಅನ್ವಯಿಸುತ್ತದೆ ಎಂದು ತಿಳಿಯಿರಿ.",
  finalCtaSub: "ನಾಲ್ಕು ಪ್ರಶ್ನೆಗಳು, ಸುಮಾರು ಎರಡು ನಿಮಿಷ, ಮತ್ತು ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ನೇರ ಉತ್ತರ.",
  finalCta: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
};

export const T: Record<Locale, Dict> = { en, hi, kn };
