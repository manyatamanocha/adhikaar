/**
 * /discovery — its own dictionary.
 *
 * Kept separate from the live landing page's strings in lib/i18n.ts, because
 * the two pages make different claims and must never share a string by
 * accident. One is about a succession certificate; the other is about where
 * money may be sitting.
 *
 * ROADMAP: more Indian languages are planned. Adding one is adding one object
 * below and one entry to LOCALES — no component changes, because every string
 * on the page already comes from here. That is what "copy is structured as
 * data so a language is a file" buys.
 *
 * The Hindi and Kannada were written by Claude and have NOT been checked by a
 * native speaker. That check should happen before a tester reads them.
 */

import type { Locale } from "./i18n";

export type DiscoveryDict = {
  tagline: string;
  navHow: string;
  navWhere: string;
  navUdgam: string;
  navResources: string;
  startSearch: string;

  heroTitle: string;
  heroSub: string;
  heroNote: string;
  cardBank: string;
  cardInsurance: string;
  cardInvestments: string;

  udgamHeading: string;
  udgamLead: string;
  udgamHelp: string;
  udgamLearn: string;
  udgamVisit: string;
  udgamNotReplaceTitle: string;
  udgamNotReplaceBody: string;

  placesHeading: string;
  places: { title: string; body: string }[];

  howHeading: string;
  steps: { title: string; body: string }[];

  reassureHeading: string;
  questions: string[];
  thatsOkay: string;
  startWithWhat: string;

  trustHeading: string;
  trust: { title: string; body: string }[];

  finalHeading: string;
  finalSub: string;
  footDisclaimer: string;
  footLive: string;
  footLinks: string[];
};

const en: DiscoveryDict = {
  tagline: "Know what may be rightfully yours.",
  navHow: "How it works",
  navWhere: "Where to look",
  navUdgam: "UDGAM",
  navResources: "Resources",
  startSearch: "Start Your Search",

  heroTitle: "Find unclaimed money left behind by a loved one.",
  heroSub:
    "Adhikaar helps families understand where a deceased family member may have unclaimed financial assets — and what to do next.",
  heroNote: "You can begin with whatever information you have.",
  cardBank: "Bank Deposit",
  cardInsurance: "Insurance",
  cardInvestments: "Investments",

  udgamHeading: "Looking for unclaimed bank deposits?",
  udgamLead:
    "The RBI's UDGAM portal helps people search for certain unclaimed deposits across participating banks.",
  udgamHelp:
    "Adhikaar helps you understand where to search, which official platform to use, and what your next step should be.",
  udgamLearn: "Learn about UDGAM",
  udgamVisit: "Visit the official portal ↗",
  udgamNotReplaceTitle: "Adhikaar does not replace UDGAM.",
  udgamNotReplaceBody:
    "UDGAM is the official portal, run by the Reserve Bank. We point you to it and help you use it — we are not a substitute for it, and we are not affiliated with or endorsed by the RBI.",

  placesHeading: "Money may be lying in more than one place",
  places: [
    { title: "Bank Deposits", body: "Savings accounts, fixed deposits and dormant balances." },
    { title: "Insurance", body: "Policies and benefits left unclaimed." },
    { title: "Mutual Funds", body: "Investments across different fund houses." },
    { title: "Shares", body: "Demat holdings and other securities." },
    { title: "EPF & Pension", body: "Employment-linked savings and benefits." },
    { title: "Other Financial Assets", body: "Places your family may not know to check." },
  ],

  howHeading: "How Adhikaar works",
  steps: [
    { title: "Tell us what you know", body: "Share a few basic details about your loved one." },
    { title: "Know where to look", body: "Get a simple checklist of places and official sources worth checking." },
    { title: "Understand what comes next", body: "If you find something, Adhikaar helps explain the next steps and documents that may be required." },
  ],

  reassureHeading: "You don't need to know everything to begin.",
  questions: ["No account number?", "No investment documents?", "Not sure which bank they used?"],
  thatsOkay: "That's okay.",
  startWithWhat: "Start with what you know.",

  trustHeading: "Built around trust",
  trust: [
    { title: "Official sources first", body: "Where an official portal exists, we'll guide you towards it." },
    { title: "No false promises", body: "A possible match does not automatically mean the money belongs to you." },
    { title: "No banking passwords or OTPs", body: "Adhikaar will never ask for them." },
    { title: "Independent guidance", body: "Adhikaar is not a government website or financial institution." },
  ],

  finalHeading: "Know what may be rightfully yours.",
  finalSub:
    "Take the first step towards understanding your family's unclaimed financial assets.",
  footDisclaimer:
    "Adhikaar is an independent informational and guidance platform. It does not represent the Reserve Bank of India, banks, insurers, government agencies or other financial institutions.",
  footLive: "This is a draft direction — the live Adhikaar is here.",
  footLinks: ["Privacy", "Terms", "Contact"],
};

const hi: DiscoveryDict = {
  tagline: "जानिए क्या आपका हक़ हो सकता है।",
  navHow: "यह कैसे काम करता है",
  navWhere: "कहाँ देखें",
  navUdgam: "उद्गम",
  navResources: "संसाधन",
  startSearch: "खोज शुरू करें",

  heroTitle: "अपने प्रियजन की छूटी हुई रकम का पता लगाइए।",
  heroSub:
    "अधिकार परिवारों को समझने में मदद करता है कि दिवंगत सदस्य की कौन-सी रकम कहाँ बिना दावे के पड़ी हो सकती है — और आगे क्या करना है।",
  heroNote: "आपके पास जो भी जानकारी हो, उसी से शुरू कीजिए।",
  cardBank: "बैंक जमा",
  cardInsurance: "बीमा",
  cardInvestments: "निवेश",

  udgamHeading: "बिना दावे की बैंक जमा ढूँढ रहे हैं?",
  udgamLead:
    "आरबीआई का उद्गम पोर्टल भाग लेने वाले बैंकों में बिना दावे की कुछ जमाओं को खोजने में मदद करता है।",
  udgamHelp:
    "अधिकार आपको समझाता है कि कहाँ खोजें, कौन-सा आधिकारिक पोर्टल इस्तेमाल करें, और आपका अगला कदम क्या होना चाहिए।",
  udgamLearn: "उद्गम के बारे में जानें",
  udgamVisit: "आधिकारिक पोर्टल पर जाएँ ↗",
  udgamNotReplaceTitle: "अधिकार उद्गम की जगह नहीं लेता।",
  udgamNotReplaceBody:
    "उद्गम रिज़र्व बैंक का आधिकारिक पोर्टल है। हम आपको वहाँ भेजते हैं और उसे इस्तेमाल करने में मदद करते हैं — हम उसका विकल्प नहीं हैं, और आरबीआई से हमारा कोई संबंध या अनुमोदन नहीं है।",

  placesHeading: "रकम एक से ज़्यादा जगह पड़ी हो सकती है",
  places: [
    { title: "बैंक जमा", body: "बचत खाते, सावधि जमा और निष्क्रिय पड़ी रकम।" },
    { title: "बीमा", body: "बिना दावे की पॉलिसियाँ और लाभ।" },
    { title: "म्यूचुअल फ़ंड", body: "अलग-अलग फ़ंड हाउसों में किए गए निवेश।" },
    { title: "शेयर", body: "डीमैट होल्डिंग और अन्य प्रतिभूतियाँ।" },
    { title: "ईपीएफ़ और पेंशन", body: "नौकरी से जुड़ी बचत और लाभ।" },
    { title: "अन्य वित्तीय संपत्तियाँ", body: "वे जगहें जिनके बारे में परिवार को पता ही न हो।" },
  ],

  howHeading: "अधिकार कैसे काम करता है",
  steps: [
    { title: "जो पता है वह बताइए", body: "अपने प्रियजन के बारे में कुछ बुनियादी जानकारी साझा कीजिए।" },
    { title: "जानिए कहाँ देखना है", body: "देखने लायक़ जगहों और आधिकारिक स्रोतों की एक सरल सूची पाइए।" },
    { title: "समझिए आगे क्या", body: "कुछ मिलने पर अधिकार आगे के कदम और ज़रूरी दस्तावेज़ समझाता है।" },
  ],

  reassureHeading: "शुरू करने के लिए सब कुछ जानना ज़रूरी नहीं।",
  questions: ["खाता संख्या नहीं है?", "निवेश के काग़ज़ात नहीं हैं?", "पता नहीं कौन-सा बैंक था?"],
  thatsOkay: "कोई बात नहीं।",
  startWithWhat: "जो पता है, उसी से शुरू कीजिए।",

  trustHeading: "भरोसे पर बना",
  trust: [
    { title: "पहले आधिकारिक स्रोत", body: "जहाँ आधिकारिक पोर्टल मौजूद है, हम आपको वहीं भेजेंगे।" },
    { title: "कोई झूठा वादा नहीं", body: "संभावित मिलान का मतलब यह नहीं कि रकम आपकी ही है।" },
    { title: "बैंक पासवर्ड या ओटीपी नहीं", body: "अधिकार कभी इनके लिए नहीं पूछेगा।" },
    { title: "स्वतंत्र मार्गदर्शन", body: "अधिकार न सरकारी वेबसाइट है, न कोई वित्तीय संस्था।" },
  ],

  finalHeading: "जानिए क्या आपका हक़ हो सकता है।",
  finalSub: "अपने परिवार की बिना दावे की संपत्ति समझने की दिशा में पहला कदम उठाइए।",
  footDisclaimer:
    "अधिकार एक स्वतंत्र सूचना एवं मार्गदर्शन मंच है। यह भारतीय रिज़र्व बैंक, बैंकों, बीमा कंपनियों, सरकारी एजेंसियों या अन्य वित्तीय संस्थाओं का प्रतिनिधित्व नहीं करता।",
  footLive: "यह एक प्रस्तावित रूप है — मौजूदा अधिकार यहाँ है।",
  footLinks: ["निजता", "शर्तें", "संपर्क"],
};

const kn: DiscoveryDict = {
  tagline: "ನಿಮ್ಮ ಹಕ್ಕು ಏನಿರಬಹುದು ಎಂದು ತಿಳಿಯಿರಿ.",
  navHow: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
  navWhere: "ಎಲ್ಲಿ ನೋಡಬೇಕು",
  navUdgam: "ಉದ್ಗಮ್",
  navResources: "ಸಂಪನ್ಮೂಲಗಳು",
  startSearch: "ಹುಡುಕಾಟ ಆರಂಭಿಸಿ",

  heroTitle: "ಅಗಲಿದ ಪ್ರೀತಿಪಾತ್ರರು ಬಿಟ್ಟುಹೋದ ಹಣವನ್ನು ಪತ್ತೆ ಮಾಡಿ.",
  heroSub:
    "ಅಗಲಿದ ಕುಟುಂಬ ಸದಸ್ಯರ ಯಾವ ಹಣ ಎಲ್ಲಿ ಹಕ್ಕು ಸಲ್ಲಿಸದೆ ಉಳಿದಿರಬಹುದು — ಮತ್ತು ಮುಂದೇನು ಮಾಡಬೇಕು ಎಂದು ಅಧಿಕಾರ್ ಕುಟುಂಬಗಳಿಗೆ ತಿಳಿಸುತ್ತದೆ.",
  heroNote: "ನಿಮ್ಮ ಬಳಿ ಇರುವ ಮಾಹಿತಿಯಿಂದಲೇ ಆರಂಭಿಸಬಹುದು.",
  cardBank: "ಬ್ಯಾಂಕ್ ಠೇವಣಿ",
  cardInsurance: "ವಿಮೆ",
  cardInvestments: "ಹೂಡಿಕೆಗಳು",

  udgamHeading: "ಹಕ್ಕು ಸಲ್ಲಿಸದ ಬ್ಯಾಂಕ್ ಠೇವಣಿ ಹುಡುಕುತ್ತಿದ್ದೀರಾ?",
  udgamLead:
    "ಆರ್‌ಬಿಐನ ಉದ್ಗಮ್ ಪೋರ್ಟಲ್, ಭಾಗವಹಿಸುವ ಬ್ಯಾಂಕುಗಳಲ್ಲಿನ ಕೆಲವು ಹಕ್ಕು ಸಲ್ಲಿಸದ ಠೇವಣಿಗಳನ್ನು ಹುಡುಕಲು ನೆರವಾಗುತ್ತದೆ.",
  udgamHelp:
    "ಎಲ್ಲಿ ಹುಡುಕಬೇಕು, ಯಾವ ಅಧಿಕೃತ ವೇದಿಕೆ ಬಳಸಬೇಕು, ಮತ್ತು ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆ ಏನಿರಬೇಕು ಎಂಬುದನ್ನು ಅಧಿಕಾರ್ ತಿಳಿಸುತ್ತದೆ.",
  udgamLearn: "ಉದ್ಗಮ್ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ",
  udgamVisit: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಹೋಗಿ ↗",
  udgamNotReplaceTitle: "ಅಧಿಕಾರ್ ಉದ್ಗಮ್‌ಗೆ ಬದಲಿ ಅಲ್ಲ.",
  udgamNotReplaceBody:
    "ಉದ್ಗಮ್ ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್ ನಡೆಸುವ ಅಧಿಕೃತ ಪೋರ್ಟಲ್. ನಾವು ನಿಮ್ಮನ್ನು ಅಲ್ಲಿಗೆ ಕಳುಹಿಸುತ್ತೇವೆ ಮತ್ತು ಅದನ್ನು ಬಳಸಲು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ — ನಾವು ಅದಕ್ಕೆ ಬದಲಿ ಅಲ್ಲ, ಮತ್ತು ಆರ್‌ಬಿಐ ಜೊತೆ ನಮಗೆ ಯಾವುದೇ ಸಂಬಂಧ ಅಥವಾ ಅನುಮೋದನೆ ಇಲ್ಲ.",

  placesHeading: "ಹಣ ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಕಡೆ ಇರಬಹುದು",
  places: [
    { title: "ಬ್ಯಾಂಕ್ ಠೇವಣಿ", body: "ಉಳಿತಾಯ ಖಾತೆ, ನಿಶ್ಚಿತ ಠೇವಣಿ ಮತ್ತು ನಿಷ್ಕ್ರಿಯ ಮೊತ್ತ." },
    { title: "ವಿಮೆ", body: "ಹಕ್ಕು ಸಲ್ಲಿಸದ ಪಾಲಿಸಿ ಮತ್ತು ಸೌಲಭ್ಯಗಳು." },
    { title: "ಮ್ಯೂಚುವಲ್ ಫಂಡ್", body: "ಬೇರೆ ಬೇರೆ ಫಂಡ್ ಹೌಸ್‌ಗಳಲ್ಲಿನ ಹೂಡಿಕೆ." },
    { title: "ಷೇರುಗಳು", body: "ಡಿಮ್ಯಾಟ್ ಹೋಲ್ಡಿಂಗ್ ಮತ್ತು ಇತರ ಸೆಕ್ಯುರಿಟಿಗಳು." },
    { title: "ಇಪಿಎಫ್ ಮತ್ತು ಪಿಂಚಣಿ", body: "ಉದ್ಯೋಗ ಸಂಬಂಧಿತ ಉಳಿತಾಯ ಮತ್ತು ಸೌಲಭ್ಯ." },
    { title: "ಇತರ ಆರ್ಥಿಕ ಆಸ್ತಿಗಳು", body: "ಕುಟುಂಬಕ್ಕೆ ಗೊತ್ತಿಲ್ಲದ ಕಡೆಗಳು." },
  ],

  howHeading: "ಅಧಿಕಾರ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
  steps: [
    { title: "ನಿಮಗೆ ಗೊತ್ತಿರುವುದನ್ನು ತಿಳಿಸಿ", body: "ನಿಮ್ಮ ಪ್ರೀತಿಪಾತ್ರರ ಕುರಿತು ಕೆಲವು ಮೂಲ ವಿವರ ಹಂಚಿಕೊಳ್ಳಿ." },
    { title: "ಎಲ್ಲಿ ನೋಡಬೇಕೆಂದು ತಿಳಿಯಿರಿ", body: "ನೋಡಬೇಕಾದ ಕಡೆಗಳ ಮತ್ತು ಅಧಿಕೃತ ಮೂಲಗಳ ಸರಳ ಪಟ್ಟಿ ಪಡೆಯಿರಿ." },
    { title: "ಮುಂದೇನು ಎಂದು ತಿಳಿಯಿರಿ", body: "ಏನಾದರೂ ಸಿಕ್ಕರೆ, ಮುಂದಿನ ಹೆಜ್ಜೆ ಮತ್ತು ಬೇಕಾಗಬಹುದಾದ ದಾಖಲೆಗಳನ್ನು ಅಧಿಕಾರ್ ವಿವರಿಸುತ್ತದೆ." },
  ],

  reassureHeading: "ಆರಂಭಿಸಲು ಎಲ್ಲವೂ ಗೊತ್ತಿರಬೇಕಿಲ್ಲ.",
  questions: ["ಖಾತೆ ಸಂಖ್ಯೆ ಇಲ್ಲವೇ?", "ಹೂಡಿಕೆಯ ದಾಖಲೆ ಇಲ್ಲವೇ?", "ಯಾವ ಬ್ಯಾಂಕ್ ಎಂದು ಗೊತ್ತಿಲ್ಲವೇ?"],
  thatsOkay: "ಪರವಾಗಿಲ್ಲ.",
  startWithWhat: "ಗೊತ್ತಿರುವುದರಿಂದಲೇ ಆರಂಭಿಸಿ.",

  trustHeading: "ನಂಬಿಕೆಯ ಮೇಲೆ ಕಟ್ಟಿದ್ದು",
  trust: [
    { title: "ಮೊದಲು ಅಧಿಕೃತ ಮೂಲಗಳು", body: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಇರುವಲ್ಲಿ ನಾವು ನಿಮ್ಮನ್ನು ಅಲ್ಲಿಗೇ ಕಳುಹಿಸುತ್ತೇವೆ." },
    { title: "ಸುಳ್ಳು ಭರವಸೆ ಇಲ್ಲ", body: "ಸಂಭಾವ್ಯ ಹೊಂದಾಣಿಕೆ ಎಂದರೆ ಹಣ ನಿಮ್ಮದೇ ಎಂದಲ್ಲ." },
    { title: "ಬ್ಯಾಂಕ್ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಒಟಿಪಿ ಬೇಡ", body: "ಅಧಿಕಾರ್ ಎಂದಿಗೂ ಅವನ್ನು ಕೇಳುವುದಿಲ್ಲ." },
    { title: "ಸ್ವತಂತ್ರ ಮಾರ್ಗದರ್ಶನ", body: "ಅಧಿಕಾರ್ ಸರ್ಕಾರಿ ಜಾಲತಾಣವೂ ಅಲ್ಲ, ಹಣಕಾಸು ಸಂಸ್ಥೆಯೂ ಅಲ್ಲ." },
  ],

  finalHeading: "ನಿಮ್ಮ ಹಕ್ಕು ಏನಿರಬಹುದು ಎಂದು ತಿಳಿಯಿರಿ.",
  finalSub: "ನಿಮ್ಮ ಕುಟುಂಬದ ಹಕ್ಕು ಸಲ್ಲಿಸದ ಆಸ್ತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಮೊದಲ ಹೆಜ್ಜೆ ಇಡಿ.",
  footDisclaimer:
    "ಅಧಿಕಾರ್ ಒಂದು ಸ್ವತಂತ್ರ ಮಾಹಿತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ವೇದಿಕೆ. ಇದು ಭಾರತೀಯ ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್, ಬ್ಯಾಂಕುಗಳು, ವಿಮಾ ಕಂಪನಿಗಳು, ಸರ್ಕಾರಿ ಸಂಸ್ಥೆಗಳು ಅಥವಾ ಇತರ ಹಣಕಾಸು ಸಂಸ್ಥೆಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುವುದಿಲ್ಲ.",
  footLive: "ಇದು ಒಂದು ಕರಡು ದಿಕ್ಕು — ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಅಧಿಕಾರ್ ಇಲ್ಲಿದೆ.",
  footLinks: ["ಗೌಪ್ಯತೆ", "ನಿಯಮಗಳು", "ಸಂಪರ್ಕ"],
};

export const D: Record<Locale, DiscoveryDict> = { en, hi, kn };
