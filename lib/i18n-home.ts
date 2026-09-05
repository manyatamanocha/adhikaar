/**
 * Homepage copy, English / Hindi / Kannada.
 *
 * Separate from the Dict in lib/i18n.ts, which is the older /guide flow's
 * dictionary and shares none of these keys -- this homepage was rebuilt
 * from scratch 5 Sep 2026 with entirely different copy. Same standing
 * rules as that file: locale lives in the URL (?lang=), never a cookie;
 * Hindi and Kannada here were written by Claude and have NOT been checked
 * by a native speaker -- get that done before a tester sees them. Unlike
 * the /guide dictionary, nothing on this page is a statutory quote, so
 * everything below is fully translated (no English-only carve-out needed).
 */

import type { Locale } from "./i18n";

export type HomeDict = {
  nav: {
    home: string;
    how: string;
    find: string;
    faq: string;
    about: string;
    aboutAdhikaar: string;
    policy: string;
    updates: string;
    contact: string;
    start: string;
  };
  tagline: string;
  notice: { pre: string; strong: string };

  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    start: string;
    seeHow: string;
    trustFree: string;
    trustSecure: string;
    trustGuidance: string;
    cardTitle: string;
    cardSub: string;
    rowBank: string;
    rowBankSub: string;
    rowInsurance: string;
    rowInsuranceSub: string;
    rowPf: string;
    rowPfSub: string;
  };

  stats: { daysFigure: string; banks: string; days: string; free: string };

  timeline: {
    heading: string;
    sub: string;
    banks: string;
    insurance: string;
    pf: string;
    investments: string;
    dividends: string;
    other: string;
  };

  how: {
    heading: string;
    sub: string;
    cta: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
  };

  tracker: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta: string;
    cardTitle: string;
    exampleTag: string;
    illustrative: string;
    identity: string;
    death: string;
    relationship: string;
    claimForm: string;
    submit: string;
    completed: string;
    pending: string;
    progress: (done: number, total: number) => string;
  };

  udgam: {
    eyebrow: string;
    body: string;
    link: string;
    search: string;
    understand: string;
    claim: string;
  };

  find: {
    heading: string;
    bank: string;
    fixed: string;
    insurance: string;
    pf: string;
    shares: string;
    dividends: string;
    other: string;
  };

  trust: {
    heading: string;
    privacy: string;
    plain: string;
    jargon: string;
    control: string;
    disclaimer: string;
  };

  faq: {
    eyebrow: string;
    heading: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };

  finalCta: { heading: string; sub: string; cta: string; note: string };

  footer: {
    about: string;
    privacy: string;
    terms: string;
    help: string;
    faqs: string;
    madeFor: string;
    disclaimer: string;
  };

  contact: {
    heading: string;
    sub: string;
    intro: string;
    phoneLabel: string;
    emailLabel: string;
  };

  about: {
    heading: string;
    intro: string;
    whatHeading: string;
    whatBody: string;
    whyHeading: string;
    whyBody: string;
    whoHeading: string;
    whoBody: string;
    notHeading: string;
    notBody: string;
    nameHeading: string;
    nameBody: string;
    cta: string;
  };
};

const en: HomeDict = {
  nav: {
    home: "Home",
    how: "How it works",
    find: "What you can find",
    faq: "FAQs",
    about: "About",
    aboutAdhikaar: "About Adhikaar",
    policy: "Policy",
    updates: "Updates",
    contact: "Contact",
    start: "Start a Search",
  },
  tagline: "What's yours should find its way home.",
  notice: {
    pre: "Adhikaar is an independent guidance tool, not a government service.",
    strong: "Verify any claim directly with your bank or the RBI's UDGAM portal.",
  },

  hero: {
    eyebrow: "For families. For what matters.",
    headline: "Money left behind shouldn't stay lost.",
    sub: "Adhikaar gives families a clear, printable path for claiming\na deceased person's bank deposits—without storing personal information.",
    start: "Start your claim journey today",
    seeHow: "See how it works",
    trustFree: "Free to search",
    trustSecure: "Secure",
    trustGuidance: "Step-by-step guidance",
    cardTitle: "What Adhikaar helps you check",
    cardSub: "A guided walkthrough for each asset type below.",
    rowBank: "Bank Deposit",
    rowBankSub: "Savings, current, FD",
    rowInsurance: "Insurance Policy",
    rowInsuranceSub: "Life, general",
    rowPf: "Provident Fund",
    rowPfSub: "EPF, PPF balances",
  },

  stats: {
    daysFigure: "15 days",
    banks: "banks compared at launch — SBI, PNB, HDFC, ICICI",
    days: "the RBI's own deadline to settle a claim once filed",
    free: "cost to use Adhikaar — no login, nothing stored",
  },

  timeline: {
    heading: "One search. Multiple places.",
    sub: "Adhikaar brings the journey together — across more than just banks.",
    banks: "Banks",
    insurance: "Insurance",
    pf: "Provident Fund",
    investments: "Investments",
    dividends: "Dividends",
    other: "Other assets",
  },

  how: {
    heading: "A complicated process, made simple.",
    sub: "Three simple steps to go from search to claim.",
    cta: "See what you can find",
    step1Title: "Tell us about your loved one",
    step1Body: "Enter a few basic details to begin.",
    step2Title: "See where money may be waiting",
    step2Body: "We help you understand which institutions may hold unclaimed assets.",
    step3Title: "Follow the claim",
    step3Body: "Get the documents, steps and status in one place.",
  },

  tracker: {
    eyebrow: "Not just find it.",
    heading: "Help you claim it.",
    sub: "Once a possible asset is found, Adhikaar guides you through every next step.",
    cta: "Start a Search",
    cardTitle: "Bank deposit claim",
    exampleTag: "Example",
    illustrative: "Illustrative example",
    identity: "Identity details",
    death: "Death certificate",
    relationship: "Proof of relationship",
    claimForm: "Claim form",
    submit: "Submit to institution",
    completed: "Completed",
    pending: "Pending",
    progress: (done, total) => `${done} of ${total} completed`,
  },

  udgam: {
    eyebrow: "Already heard of UDGAM?",
    body: "UDGAM is the RBI's own portal for searching unclaimed bank deposits. Adhikaar helps you understand what to do next — and guides you across more than just bank deposits.",
    link: "Learn about UDGAM →",
    search: "Search",
    understand: "Understand",
    claim: "Claim",
  },

  find: {
    heading: "What can Adhikaar help find?",
    bank: "Bank deposits",
    fixed: "Fixed deposits",
    insurance: "Insurance",
    pf: "Provident fund",
    shares: "Shares & investments",
    dividends: "Dividends",
    other: "Other eligible assets",
  },

  trust: {
    heading: "Designed around trust",
    privacy: "Your information stays private",
    plain: "We explain every step in plain language",
    jargon: "No confusing jargon",
    control: "You stay in control",
    disclaimer:
      "Adhikaar does not hold or transfer your money. Claims are ultimately processed by the relevant bank, insurer or fund.",
  },

  faq: {
    eyebrow: "Questions",
    heading: "Before you start",
    q1: "What kinds of assets does this cover?",
    a1: "Bank deposits and fixed deposits, insurance policies, provident fund, shares and dividends — and a general path for anything else that doesn't fit those.",
    q2: "Will Adhikaar ever tell me it found a match?",
    a2: "No. Adhikaar has no backend or database of accounts — it cannot search or confirm anything. What it gives you is a checklist of where to look and, once something is found, exactly what the institution will ask for.",
    q3: "What happens after I find something?",
    a3: "Adhikaar walks you through the documents and steps that institution will ask for, one at a time, so nothing arrives as a surprise at the counter.",
    q4: "Is my information safe?",
    a4: "Nothing you enter is stored or shared for marketing. There's no account, no login, and no data reaches a server beyond what a page needs to render.",
  },

  finalCta: {
    heading: "Something may still be waiting for your family.",
    sub: "Start with a simple search. We'll help you understand what comes next.",
    cta: "Start a Search",
    note: "It's free, secure and takes just a few minutes.",
  },

  footer: {
    about: "About",
    privacy: "Privacy",
    terms: "Terms",
    help: "Help",
    faqs: "FAQs",
    madeFor: "Made for Indian families",
    disclaimer:
      "Adhikaar is an independent guidance tool. It does not represent any bank, insurer, government agency or other financial institution unless explicitly stated. Nothing here is legal advice.",
  },

  contact: {
    heading: "Happy to Help",
    sub: "Please reach out to us.",
    intro: "Please contact us using the details below:",
    phoneLabel: "Mobile",
    emailLabel: "Email",
  },

  about: {
    heading: "About Adhikaar",
    intro:
      "Adhikaar is a free, guided tool that helps a family understand what a bank can and cannot ask for when claiming a deceased relative's bank deposit.",
    whatHeading: "What it is",
    whatBody:
      "Three questions, a straight answer, and a printable page carrying the RBI's own words alongside that bank's own published policy — to hand across the counter.",
    whyHeading: "Why it exists",
    whyBody:
      "Since the RBI's 2025 Directions on the settlement of claims for deceased bank customers, in force from 31 March 2026, a bank usually cannot demand a succession certificate — a civil court process that typically costs around ₹17,000 and takes four to seven months. Almost nobody knows the rule changed. Adhikaar exists so a family can show the bank its own rules, instead of arguing an opinion against it.",
    whoHeading: "Who it's for",
    whoBody:
      "Anyone who has already been to a bank about a deceased relative's account and been handed a list of demands — usually an adult legal heir or a registered nominee, often doing this for the first time, often on a phone, often while still grieving.",
    notHeading: "What Adhikaar does not do",
    notBody:
      "No login, no account, and nothing about your family is stored or sent to a server beyond what a page needs to render. Adhikaar has no backend and cannot search bank records — it quotes and cites, and never asserts a legal position on its own.",
    nameHeading: "The name",
    nameBody:
      "Adhikaar means right, entitlement, in Hindi and Urdu. The claim isn't that the money is yours — it's that you're entitled to be told the correct rule before spending money and months on a document you may not need.",
    cta: "Read the full RBI-cited guide",
  },
};

const hi: HomeDict = {
  nav: {
    home: "होम",
    how: "यह कैसे काम करता है",
    find: "आप क्या ढूँढ सकते हैं",
    faq: "सवाल-जवाब",
    about: "जानकारी",
    aboutAdhikaar: "अधिकार के बारे में",
    policy: "नीति",
    updates: "अपडेट",
    contact: "संपर्क करें",
    start: "खोज शुरू करें",
  },
  tagline: "आपकी चीज़ें, उन्हीं तक वापस पहुँचें।",
  notice: {
    pre: "अधिकार एक स्वतंत्र मार्गदर्शन उपकरण है, कोई सरकारी सेवा नहीं।",
    strong: "किसी भी दावे की पुष्टि सीधे अपने बैंक या आरबीआई के उद्गम पोर्टल से करें।",
  },

  hero: {
    eyebrow: "परिवारों के लिए। ज़रूरी बातों के लिए।",
    headline: "पीछे छूटा पैसा खोया नहीं रहना चाहिए।",
    sub: "अधिकार परिवारों को किसी अपने की छोड़ी गई वित्तीय संपत्ति ढूँढने और उस पर दावा करने में मदद करता है — एक सरल, मार्गदर्शित प्रक्रिया के ज़रिए।",
    start: "खोज शुरू करें",
    seeHow: "देखें यह कैसे काम करता है",
    trustFree: "खोजना मुफ़्त है",
    trustSecure: "सुरक्षित",
    trustGuidance: "क़दम-दर-क़दम मार्गदर्शन",
    cardTitle: "अधिकार आपको क्या जाँचने में मदद करता है",
    cardSub: "नीचे दिए हर तरह की संपत्ति के लिए मार्गदर्शित प्रक्रिया।",
    rowBank: "बैंक जमा",
    rowBankSub: "बचत, चालू, एफ़डी",
    rowInsurance: "बीमा पॉलिसी",
    rowInsuranceSub: "जीवन, सामान्य",
    rowPf: "भविष्य निधि",
    rowPfSub: "ईपीएफ़, पीपीएफ़ शेष राशि",
  },

  stats: {
    daysFigure: "15 दिन",
    banks: "लॉन्च पर तुलना किए गए बैंक — एसबीआई, पीएनबी, एचडीएफ़सी, आईसीआईसीआई",
    days: "दावा दर्ज होने के बाद निपटान की आरबीआई की अपनी समय-सीमा",
    free: "अधिकार इस्तेमाल करने की लागत — कोई लॉगिन नहीं, कुछ भी संग्रहीत नहीं",
  },

  timeline: {
    heading: "एक खोज। कई जगहें।",
    sub: "अधिकार पूरी यात्रा को एक साथ लाता है — सिर्फ़ बैंकों से कहीं आगे।",
    banks: "बैंक",
    insurance: "बीमा",
    pf: "भविष्य निधि",
    investments: "निवेश",
    dividends: "लाभांश",
    other: "अन्य संपत्तियाँ",
  },

  how: {
    heading: "एक उलझी प्रक्रिया, अब आसान।",
    sub: "खोज से दावे तक जाने के तीन सरल क़दम।",
    cta: "देखें आप क्या ढूँढ सकते हैं",
    step1Title: "अपने प्रियजन के बारे में बताएँ",
    step1Body: "शुरू करने के लिए कुछ बुनियादी जानकारी दर्ज करें।",
    step2Title: "देखें पैसा कहाँ रुका हो सकता है",
    step2Body: "हम आपको यह समझने में मदद करते हैं कि कौन-सी संस्थाओं में लावारिस संपत्ति हो सकती है।",
    step3Title: "दावे का पीछा करें",
    step3Body: "दस्तावेज़, क़दम और स्थिति — सब एक जगह पाएँ।",
  },

  tracker: {
    eyebrow: "सिर्फ़ ढूँढना ही नहीं।",
    heading: "दावा करने में भी मदद।",
    sub: "संभावित संपत्ति मिलने के बाद, अधिकार आपको हर अगले क़दम में मार्गदर्शन देता है।",
    cta: "खोज शुरू करें",
    cardTitle: "बैंक जमा दावा",
    exampleTag: "उदाहरण",
    illustrative: "उदाहरण मात्र",
    identity: "पहचान विवरण",
    death: "मृत्यु प्रमाणपत्र",
    relationship: "रिश्ते का प्रमाण",
    claimForm: "दावा फ़ॉर्म",
    submit: "संस्था में जमा करें",
    completed: "पूर्ण",
    pending: "बाक़ी",
    progress: (done, total) => `${total} में से ${done} पूर्ण`,
  },

  udgam: {
    eyebrow: "उद्गम के बारे में सुना है?",
    body: "उद्गम आरबीआई का अपना पोर्टल है, जो लावारिस बैंक जमाओं को खोजने में मदद करता है। कुछ मिलने पर, अधिकार आपको आगे क्या करना है यह समझाता है — और सिर्फ़ बैंक जमाओं से आगे भी मार्गदर्शन देता है।",
    link: "उद्गम के बारे में जानें →",
    search: "खोजें",
    understand: "समझें",
    claim: "दावा करें",
  },

  find: {
    heading: "अधिकार किन चीज़ों को ढूँढने में मदद करता है?",
    bank: "बैंक जमा",
    fixed: "सावधि जमा",
    insurance: "बीमा",
    pf: "भविष्य निधि",
    shares: "शेयर और निवेश",
    dividends: "लाभांश",
    other: "अन्य पात्र संपत्तियाँ",
  },

  trust: {
    heading: "भरोसे पर बना",
    privacy: "आपकी जानकारी निजी रहती है",
    plain: "हम हर क़दम आसान भाषा में समझाते हैं",
    jargon: "कोई उलझाने वाले क़ानूनी शब्द नहीं",
    control: "नियंत्रण हमेशा आपके हाथ में",
    disclaimer:
      "अधिकार आपका पैसा न तो रखता है, न ही स्थानांतरित करता है। दावों का निपटान अंततः संबंधित बैंक, बीमा कंपनी या फ़ंड द्वारा किया जाता है।",
  },

  faq: {
    eyebrow: "सवाल",
    heading: "शुरू करने से पहले",
    q1: "यह किस तरह की संपत्तियों को कवर करता है?",
    a1: "बैंक जमा और सावधि जमा, बीमा पॉलिसी, भविष्य निधि, शेयर और लाभांश — और बाक़ी सब चीज़ों के लिए एक सामान्य रास्ता।",
    q2: "क्या अधिकार कभी बताएगा कि उसे कोई मिलान मिला?",
    a2: "नहीं। अधिकार के पास खातों का कोई बैकएंड या डेटाबेस नहीं है — यह कुछ भी खोज या पुष्टि नहीं कर सकता। यह आपको बस यह बताता है कि कहाँ देखना है, और कुछ मिलने पर, संस्था वास्तव में क्या माँगेगी।",
    q3: "कुछ मिलने के बाद क्या होता है?",
    a3: "अधिकार आपको उस संस्था द्वारा माँगे जाने वाले दस्तावेज़ों और क़दमों में, एक-एक करके, मार्गदर्शन देता है, ताकि काउंटर पर कुछ भी अचानक सामने न आए।",
    q4: "क्या मेरी जानकारी सुरक्षित है?",
    a4: "आप जो भी दर्ज करते हैं, वह न तो संग्रहीत होता है, न ही मार्केटिंग के लिए साझा किया जाता है। न कोई खाता, न लॉगिन, और पेज को दिखाने के लिए ज़रूरी जानकारी के अलावा कुछ भी सर्वर तक नहीं पहुँचता।",
  },

  finalCta: {
    heading: "आपके परिवार का कुछ अब भी इंतज़ार कर रहा हो सकता है।",
    sub: "एक सरल खोज से शुरू करें। हम आगे क्या करना है यह समझने में मदद करेंगे।",
    cta: "खोज शुरू करें",
    note: "यह मुफ़्त, सुरक्षित है और बस कुछ मिनट लेता है।",
  },

  footer: {
    about: "जानकारी",
    privacy: "गोपनीयता",
    terms: "नियम",
    help: "मदद",
    faqs: "सवाल-जवाब",
    madeFor: "भारतीय परिवारों के लिए बनाया गया",
    disclaimer:
      "अधिकार एक स्वतंत्र मार्गदर्शन उपकरण है। यह किसी बैंक, बीमा कंपनी, सरकारी एजेंसी या अन्य वित्तीय संस्था का प्रतिनिधित्व नहीं करता, जब तक स्पष्ट रूप से न बताया जाए। यहाँ कुछ भी क़ानूनी सलाह नहीं है।",
  },

  contact: {
    heading: "हम मदद के लिए यहाँ हैं",
    sub: "कृपया हमसे संपर्क करें।",
    intro: "कृपया नीचे दिए गए विवरण से हमसे संपर्क करें:",
    phoneLabel: "मोबाइल",
    emailLabel: "ईमेल",
  },

  about: {
    heading: "अधिकार के बारे में",
    intro:
      "अधिकार एक मुफ़्त, मार्गदर्शित उपकरण है जो परिवारों को यह समझने में मदद करता है कि किसी दिवंगत रिश्तेदार के बैंक जमा पर दावा करते समय बैंक क्या माँग सकता है और क्या नहीं।",
    whatHeading: "यह क्या है",
    whatBody:
      "तीन सवाल, एक सीधा जवाब, और एक छापने लायक़ पन्ना जो आरबीआई के अपने शब्दों के साथ-साथ उस बैंक की अपनी प्रकाशित नीति भी बताता है — काउंटर पर देने के लिए।",
    whyHeading: "यह क्यों ज़रूरी है",
    whyBody:
      "दिवंगत बैंक ग्राहकों के दावों के निपटान पर आरबीआई के 2025 निर्देश, जो 31 मार्च 2026 से लागू हैं, के बाद बैंक आमतौर पर उत्तराधिकार प्रमाणपत्र नहीं माँग सकता — एक सिविल अदालती प्रक्रिया जिसमें आमतौर पर लगभग ₹17,000 और चार से सात महीने लगते हैं। लगभग किसी को नहीं पता कि नियम बदल गया है। अधिकार इसलिए है ताकि एक परिवार बैंक को उसके अपने नियम दिखा सके, न कि उससे राय पर बहस करे।",
    whoHeading: "यह किसके लिए है",
    whoBody:
      "हर उस व्यक्ति के लिए जो पहले ही किसी दिवंगत रिश्तेदार के खाते के बारे में बैंक जा चुका है और उसे माँगों की एक सूची थमाई गई है — आमतौर पर एक वयस्क क़ानूनी उत्तराधिकारी या पंजीकृत नामांकित व्यक्ति, अक्सर पहली बार यह कर रहा, अक्सर फ़ोन पर, अक्सर अभी भी दुख में।",
    notHeading: "अधिकार क्या नहीं करता",
    notBody:
      "कोई लॉगिन नहीं, कोई खाता नहीं, और आपके परिवार के बारे में कुछ भी संग्रहीत या सर्वर तक नहीं पहुँचता, सिवाय उसके जो पेज को दिखाने के लिए ज़रूरी है। अधिकार के पास कोई बैकएंड नहीं है और यह बैंक रिकॉर्ड नहीं खोज सकता — यह क़ानून बताता और उद्धृत करता है, कभी अपनी ओर से क़ानूनी राय नहीं देता।",
    nameHeading: "नाम",
    nameBody:
      "अधिकार का अर्थ है हक़, स्वत्व। दावा यह नहीं कि पैसा आपका ही है — दावा यह है कि पैसे और महीनों को उस दस्तावेज़ पर ख़र्च करने से पहले आपको सही नियम बताया जाना चाहिए, जिसकी शायद ज़रूरत ही न हो।",
    cta: "पूरी आरबीआई-उद्धृत गाइड पढ़ें",
  },
};

const kn: HomeDict = {
  nav: {
    home: "ಮುಖಪುಟ",
    how: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    find: "ನೀವು ಏನನ್ನು ಕಂಡುಕೊಳ್ಳಬಹುದು",
    faq: "ಪ್ರಶ್ನೋತ್ತರಗಳು",
    about: "ಮಾಹಿತಿ",
    aboutAdhikaar: "ಅಧಿಕಾರ್ ಬಗ್ಗೆ",
    policy: "ನೀತಿ",
    updates: "ಅಪ್‌ಡೇಟ್‌ಗಳು",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    start: "ಹುಡುಕಾಟ ಪ್ರಾರಂಭಿಸಿ",
  },
  tagline: "ನಿಮ್ಮದು ನಿಮ್ಮ ದಾರಿ ಕಂಡುಕೊಳ್ಳಲಿ.",
  notice: {
    pre: "ಅಧಿಕಾರ್ ಒಂದು ಸ್ವತಂತ್ರ ಮಾರ್ಗದರ್ಶನ ಸಾಧನ, ಸರ್ಕಾರಿ ಸೇವೆಯಲ್ಲ.",
    strong: "ಯಾವುದೇ ಹಕ್ಕನ್ನು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಅಥವಾ ಆರ್‌ಬಿಐನ ಉದ್ಗಮ್ ಪೋರ್ಟಲ್‌ನಿಂದ ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
  },

  hero: {
    eyebrow: "ಕುಟುಂಬಗಳಿಗಾಗಿ. ಮುಖ್ಯವಾದುದಕ್ಕಾಗಿ.",
    headline: "ಉಳಿದ ಹಣ ಕಳೆದುಹೋಗಬಾರದು.",
    sub: "ಅಧಿಕಾರ್ ಕುಟುಂಬಗಳಿಗೆ ಪ್ರೀತಿಪಾತ್ರರು ಬಿಟ್ಟುಹೋದ ಹಣಕಾಸಿನ ಆಸ್ತಿಗಳನ್ನು ಹುಡುಕಲು ಮತ್ತು ಪಡೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ — ಒಂದೇ ಸರಳ, ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ.",
    start: "ಹುಡುಕಾಟ ಪ್ರಾರಂಭಿಸಿ",
    seeHow: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ನೋಡಿ",
    trustFree: "ಹುಡುಕುವುದು ಉಚಿತ",
    trustSecure: "ಸುರಕ್ಷಿತ",
    trustGuidance: "ಹಂತ ಹಂತದ ಮಾರ್ಗದರ್ಶನ",
    cardTitle: "ಅಧಿಕಾರ್ ನಿಮಗೆ ಏನನ್ನು ಪರಿಶೀಲಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ",
    cardSub: "ಕೆಳಗಿನ ಪ್ರತಿ ಆಸ್ತಿ ಪ್ರಕಾರಕ್ಕೂ ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಕ್ರಿಯೆ.",
    rowBank: "ಬ್ಯಾಂಕ್ ಠೇವಣಿ",
    rowBankSub: "ಉಳಿತಾಯ, ಚಾಲ್ತಿ, ಎಫ್‌ಡಿ",
    rowInsurance: "ವಿಮಾ ಪಾಲಿಸಿ",
    rowInsuranceSub: "ಜೀವ, ಸಾಮಾನ್ಯ",
    rowPf: "ಭವಿಷ್ಯ ನಿಧಿ",
    rowPfSub: "ಇಪಿಎಫ್, ಪಿಪಿಎಫ್ ಬಾಕಿ",
  },

  stats: {
    daysFigure: "15 ದಿನಗಳು",
    banks: "ಲಾಂಚ್‌ನಲ್ಲಿ ಹೋಲಿಸಲಾದ ಬ್ಯಾಂಕುಗಳು — ಎಸ್‌ಬಿಐ, ಪಿಎನ್‌ಬಿ, ಎಚ್‌ಡಿಎಫ್‌ಸಿ, ಐಸಿಐಸಿಐ",
    days: "ಹಕ್ಕು ಸಲ್ಲಿಸಿದ ನಂತರ ಇತ್ಯರ್ಥಗೊಳಿಸಲು ಆರ್‌ಬಿಐನ ಸ್ವಂತ ಗಡುವು",
    free: "ಅಧಿಕಾರ್ ಬಳಸಲು ವೆಚ್ಚ — ಲಾಗಿನ್ ಇಲ್ಲ, ಏನೂ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ",
  },

  timeline: {
    heading: "ಒಂದು ಹುಡುಕಾಟ. ಹಲವು ಸ್ಥಳಗಳು.",
    sub: "ಅಧಿಕಾರ್ ಇಡೀ ಪ್ರಯಾಣವನ್ನು ಒಟ್ಟಿಗೆ ತರುತ್ತದೆ — ಬ್ಯಾಂಕುಗಳಿಗಿಂತ ಹೆಚ್ಚಿನವುಗಳ ಮೂಲಕ.",
    banks: "ಬ್ಯಾಂಕುಗಳು",
    insurance: "ವಿಮೆ",
    pf: "ಭವಿಷ್ಯ ನಿಧಿ",
    investments: "ಹೂಡಿಕೆಗಳು",
    dividends: "ಲಾಭಾಂಶಗಳು",
    other: "ಇತರ ಆಸ್ತಿಗಳು",
  },

  how: {
    heading: "ಸಂಕೀರ್ಣ ಪ್ರಕ್ರಿಯೆ, ಈಗ ಸರಳ.",
    sub: "ಹುಡುಕಾಟದಿಂದ ಹಕ್ಕಿನವರೆಗೆ ಮೂರು ಸರಳ ಹಂತಗಳು.",
    cta: "ನೀವು ಏನನ್ನು ಕಂಡುಕೊಳ್ಳಬಹುದು ನೋಡಿ",
    step1Title: "ನಿಮ್ಮ ಪ್ರೀತಿಪಾತ್ರರ ಬಗ್ಗೆ ತಿಳಿಸಿ",
    step1Body: "ಪ್ರಾರಂಭಿಸಲು ಕೆಲವು ಮೂಲ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
    step2Title: "ಹಣ ಎಲ್ಲಿ ಕಾಯುತ್ತಿರಬಹುದು ಎಂದು ನೋಡಿ",
    step2Body: "ಯಾವ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಹಕ್ಕು ಸಲ್ಲಿಸದ ಆಸ್ತಿ ಇರಬಹುದು ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
    step3Title: "ಹಕ್ಕನ್ನು ಅನುಸರಿಸಿ",
    step3Body: "ದಾಖಲೆಗಳು, ಹಂತಗಳು ಮತ್ತು ಸ್ಥಿತಿ — ಎಲ್ಲವನ್ನೂ ಒಂದೇ ಕಡೆ ಪಡೆಯಿರಿ.",
  },

  tracker: {
    eyebrow: "ಕಂಡುಹಿಡಿಯುವುದು ಮಾತ್ರವಲ್ಲ.",
    heading: "ಹಕ್ಕು ಪಡೆಯಲೂ ಸಹಾಯ.",
    sub: "ಸಂಭವನೀಯ ಆಸ್ತಿ ಸಿಕ್ಕ ನಂತರ, ಅಧಿಕಾರ್ ಪ್ರತಿ ಮುಂದಿನ ಹಂತದಲ್ಲೂ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.",
    cta: "ಹುಡುಕಾಟ ಪ್ರಾರಂಭಿಸಿ",
    cardTitle: "ಬ್ಯಾಂಕ್ ಠೇವಣಿ ಹಕ್ಕು",
    exampleTag: "ಉದಾಹರಣೆ",
    illustrative: "ಉದಾಹರಣೆ ಮಾತ್ರ",
    identity: "ಗುರುತಿನ ವಿವರಗಳು",
    death: "ಮರಣ ಪ್ರಮಾಣಪತ್ರ",
    relationship: "ಸಂಬಂಧದ ಪುರಾವೆ",
    claimForm: "ಹಕ್ಕು ಫಾರ್ಮ್",
    submit: "ಸಂಸ್ಥೆಗೆ ಸಲ್ಲಿಸಿ",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    pending: "ಬಾಕಿ ಇದೆ",
    progress: (done, total) => `${total} ರಲ್ಲಿ ${done} ಪೂರ್ಣಗೊಂಡಿದೆ`,
  },

  udgam: {
    eyebrow: "ಉದ್ಗಮ್ ಬಗ್ಗೆ ಕೇಳಿದ್ದೀರಾ?",
    body: "ಉದ್ಗಮ್ ಆರ್‌ಬಿಐನ ಸ್ವಂತ ಪೋರ್ಟಲ್ ಆಗಿದ್ದು, ಹಕ್ಕು ಸಲ್ಲಿಸದ ಬ್ಯಾಂಕ್ ಠೇವಣಿಗಳನ್ನು ಹುಡುಕಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಏನಾದರೂ ಸಿಕ್ಕರೆ, ಮುಂದೆ ಏನು ಮಾಡಬೇಕೆಂದು ಅಧಿಕಾರ್ ನಿಮಗೆ ತಿಳಿಸುತ್ತದೆ — ಮತ್ತು ಬ್ಯಾಂಕ್ ಠೇವಣಿಗಳಿಗಿಂತ ಹೆಚ್ಚಿನವುಗಳ ಮೂಲಕ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.",
    link: "ಉದ್ಗಮ್ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ →",
    search: "ಹುಡುಕಿ",
    understand: "ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    claim: "ಹಕ್ಕು ಪಡೆಯಿರಿ",
  },

  find: {
    heading: "ಅಧಿಕಾರ್ ಯಾವುದನ್ನು ಕಂಡುಹಿಡಿಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ?",
    bank: "ಬ್ಯಾಂಕ್ ಠೇವಣಿಗಳು",
    fixed: "ಸ್ಥಿರ ಠೇವಣಿಗಳು",
    insurance: "ವಿಮೆ",
    pf: "ಭವಿಷ್ಯ ನಿಧಿ",
    shares: "ಷೇರುಗಳು ಮತ್ತು ಹೂಡಿಕೆಗಳು",
    dividends: "ಲಾಭಾಂಶಗಳು",
    other: "ಇತರ ಅರ್ಹ ಆಸ್ತಿಗಳು",
  },

  trust: {
    heading: "ನಂಬಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ",
    privacy: "ನಿಮ್ಮ ಮಾಹಿತಿ ಖಾಸಗಿಯಾಗಿ ಉಳಿಯುತ್ತದೆ",
    plain: "ನಾವು ಪ್ರತಿ ಹಂತವನ್ನೂ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸುತ್ತೇವೆ",
    jargon: "ಗೊಂದಲಮಯ ಕಾನೂನು ಪದಗಳಿಲ್ಲ",
    control: "ನಿಯಂತ್ರಣ ಯಾವಾಗಲೂ ನಿಮ್ಮದೇ",
    disclaimer:
      "ಅಧಿಕಾರ್ ನಿಮ್ಮ ಹಣವನ್ನು ಇಟ್ಟುಕೊಳ್ಳುವುದಿಲ್ಲ ಅಥವಾ ವರ್ಗಾಯಿಸುವುದಿಲ್ಲ. ಹಕ್ಕುಗಳನ್ನು ಅಂತಿಮವಾಗಿ ಸಂಬಂಧಪಟ್ಟ ಬ್ಯಾಂಕ್, ವಿಮಾದಾರ ಅಥವಾ ನಿಧಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ.",
  },

  faq: {
    eyebrow: "ಪ್ರಶ್ನೆಗಳು",
    heading: "ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು",
    q1: "ಇದು ಯಾವ ರೀತಿಯ ಆಸ್ತಿಗಳನ್ನು ಒಳಗೊಂಡಿದೆ?",
    a1: "ಬ್ಯಾಂಕ್ ಠೇವಣಿಗಳು ಮತ್ತು ಸ್ಥಿರ ಠೇವಣಿಗಳು, ವಿಮಾ ಪಾಲಿಸಿಗಳು, ಭವಿಷ್ಯ ನಿಧಿ, ಷೇರುಗಳು ಮತ್ತು ಲಾಭಾಂಶಗಳು — ಮತ್ತು ಇವುಗಳಿಗೆ ಹೊಂದದ ಇತರ ಎಲ್ಲದಕ್ಕೂ ಸಾಮಾನ್ಯ ಮಾರ್ಗ.",
    q2: "ಅಧಿಕಾರ್ ಎಂದಾದರೂ ಹೊಂದಾಣಿಕೆ ಸಿಕ್ಕಿದೆ ಎಂದು ಹೇಳುತ್ತದೆಯೇ?",
    a2: "ಇಲ್ಲ. ಅಧಿಕಾರ್‌ಗೆ ಖಾತೆಗಳ ಯಾವುದೇ ಬ್ಯಾಕೆಂಡ್ ಅಥವಾ ಡೇಟಾಬೇಸ್ ಇಲ್ಲ — ಇದು ಏನನ್ನೂ ಹುಡುಕಲು ಅಥವಾ ದೃಢೀಕರಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಇದು ನಿಮಗೆ ಎಲ್ಲಿ ನೋಡಬೇಕು ಎಂಬ ಪಟ್ಟಿಯನ್ನು ಮತ್ತು ಏನಾದರೂ ಸಿಕ್ಕ ನಂತರ, ಸಂಸ್ಥೆ ನಿಖರವಾಗಿ ಏನು ಕೇಳುತ್ತದೆ ಎಂಬುದನ್ನು ನೀಡುತ್ತದೆ.",
    q3: "ಏನಾದರೂ ಸಿಕ್ಕ ನಂತರ ಏನಾಗುತ್ತದೆ?",
    a3: "ಅಧಿಕಾರ್ ಆ ಸಂಸ್ಥೆ ಕೇಳುವ ದಾಖಲೆಗಳು ಮತ್ತು ಹಂತಗಳ ಮೂಲಕ, ಒಂದೊಂದಾಗಿ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ, ಇದರಿಂದ ಕೌಂಟರ್‌ನಲ್ಲಿ ಏನೂ ಅನಿರೀಕ್ಷಿತವಾಗಿ ಬರುವುದಿಲ್ಲ.",
    q4: "ನನ್ನ ಮಾಹಿತಿ ಸುರಕ್ಷಿತವೇ?",
    a4: "ನೀವು ನಮೂದಿಸುವುದು ಯಾವುದೂ ಸಂಗ್ರಹವಾಗುವುದಿಲ್ಲ ಅಥವಾ ಮಾರ್ಕೆಟಿಂಗ್‌ಗಾಗಿ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ. ಖಾತೆ ಇಲ್ಲ, ಲಾಗಿನ್ ಇಲ್ಲ, ಮತ್ತು ಪುಟವನ್ನು ತೋರಿಸಲು ಬೇಕಾದುದನ್ನು ಹೊರತುಪಡಿಸಿ ಏನೂ ಸರ್ವರ್‌ಗೆ ತಲುಪುವುದಿಲ್ಲ.",
  },

  finalCta: {
    heading: "ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕಾಗಿ ಇನ್ನೂ ಏನೋ ಕಾಯುತ್ತಿರಬಹುದು.",
    sub: "ಸರಳ ಹುಡುಕಾಟದೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ. ಮುಂದೆ ಏನು ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
    cta: "ಹುಡುಕಾಟ ಪ್ರಾರಂಭಿಸಿ",
    note: "ಇದು ಉಚಿತ, ಸುರಕ್ಷಿತ ಮತ್ತು ಕೆಲವೇ ನಿಮಿಷಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.",
  },

  footer: {
    about: "ಮಾಹಿತಿ",
    privacy: "ಗೌಪ್ಯತೆ",
    terms: "ನಿಯಮಗಳು",
    help: "ಸಹಾಯ",
    faqs: "ಪ್ರಶ್ನೋತ್ತರಗಳು",
    madeFor: "ಭಾರತೀಯ ಕುಟುಂಬಗಳಿಗಾಗಿ ರೂಪಿಸಲಾಗಿದೆ",
    disclaimer:
      "ಅಧಿಕಾರ್ ಒಂದು ಸ್ವತಂತ್ರ ಮಾರ್ಗದರ್ಶನ ಸಾಧನ. ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳದ ಹೊರತು, ಇದು ಯಾವುದೇ ಬ್ಯಾಂಕ್, ವಿಮಾದಾರ, ಸರ್ಕಾರಿ ಸಂಸ್ಥೆ ಅಥವಾ ಇತರ ಹಣಕಾಸು ಸಂಸ್ಥೆಯನ್ನು ಪ್ರತಿನಿಧಿಸುವುದಿಲ್ಲ. ಇಲ್ಲಿ ಯಾವುದೂ ಕಾನೂನು ಸಲಹೆಯಲ್ಲ.",
  },

  contact: {
    heading: "ಸಹಾಯ ಮಾಡಲು ಸಂತೋಷ",
    sub: "ದಯವಿಟ್ಟು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    intro: "ದಯವಿಟ್ಟು ಕೆಳಗಿನ ವಿವರಗಳ ಮೂಲಕ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ:",
    phoneLabel: "ಮೊಬೈಲ್",
    emailLabel: "ಇಮೇಲ್",
  },

  about: {
    heading: "ಅಧಿಕಾರ್ ಬಗ್ಗೆ",
    intro:
      "ಅಧಿಕಾರ್ ಒಂದು ಉಚಿತ, ಮಾರ್ಗದರ್ಶಿತ ಸಾಧನವಾಗಿದ್ದು, ದಿವಂಗತ ಸಂಬಂಧಿಕರ ಬ್ಯಾಂಕ್ ಠೇವಣಿಗೆ ಹಕ್ಕು ಸಲ್ಲಿಸುವಾಗ ಬ್ಯಾಂಕ್ ಏನನ್ನು ಕೇಳಬಹುದು ಮತ್ತು ಏನನ್ನು ಕೇಳಲಾಗುವುದಿಲ್ಲ ಎಂಬುದನ್ನು ಕುಟುಂಬಗಳಿಗೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    whatHeading: "ಇದು ಏನು",
    whatBody:
      "ಮೂರು ಪ್ರಶ್ನೆಗಳು, ಒಂದು ನೇರ ಉತ್ತರ, ಮತ್ತು ಆರ್‌ಬಿಐನ ಸ್ವಂತ ಮಾತುಗಳ ಜೊತೆಗೆ ಆ ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ಪ್ರಕಟಿತ ನೀತಿಯನ್ನೂ ಹೊಂದಿರುವ ಮುದ್ರಿಸಬಹುದಾದ ಪುಟ — ಕೌಂಟರ್‌ನಲ್ಲಿ ಕೊಡಲು.",
    whyHeading: "ಇದು ಏಕೆ ಇದೆ",
    whyBody:
      "31 ಮಾರ್ಚ್ 2026 ರಿಂದ ಜಾರಿಗೆ ಬಂದ, ದಿವಂಗತ ಬ್ಯಾಂಕ್ ಗ್ರಾಹಕರ ಹಕ್ಕುಗಳ ಇತ್ಯರ್ಥದ ಕುರಿತ ಆರ್‌ಬಿಐನ 2025 ನಿರ್ದೇಶನಗಳ ನಂತರ, ಬ್ಯಾಂಕ್ ಸಾಮಾನ್ಯವಾಗಿ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಕೇಳುವಂತಿಲ್ಲ — ಇದು ಸಾಮಾನ್ಯವಾಗಿ ಸುಮಾರು ₹17,000 ಮತ್ತು ನಾಲ್ಕರಿಂದ ಏಳು ತಿಂಗಳು ತೆಗೆದುಕೊಳ್ಳುವ ಸಿವಿಲ್ ನ್ಯಾಯಾಲಯ ಪ್ರಕ್ರಿಯೆ. ನಿಯಮ ಬದಲಾಗಿದೆ ಎಂದು ಬಹುತೇಕ ಯಾರಿಗೂ ತಿಳಿದಿಲ್ಲ. ಒಂದು ಕುಟುಂಬ ಬ್ಯಾಂಕಿಗೆ ಅದರದೇ ನಿಯಮಗಳನ್ನು ತೋರಿಸಲು ಸಾಧ್ಯವಾಗಲಿ, ಅಭಿಪ್ರಾಯದ ಮೇಲೆ ವಾದಿಸುವ ಬದಲು — ಇದಕ್ಕಾಗಿ ಅಧಿಕಾರ್ ಇದೆ.",
    whoHeading: "ಇದು ಯಾರಿಗಾಗಿ",
    whoBody:
      "ದಿವಂಗತ ಸಂಬಂಧಿಕರ ಖಾತೆಯ ಬಗ್ಗೆ ಈಗಾಗಲೇ ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿ, ಬೇಡಿಕೆಗಳ ಪಟ್ಟಿಯನ್ನು ಪಡೆದ ಯಾರಿಗಾದರೂ — ಸಾಮಾನ್ಯವಾಗಿ ವಯಸ್ಕ ಕಾನೂನುಬದ್ಧ ಉತ್ತರಾಧಿಕಾರಿ ಅಥವಾ ನೋಂದಾಯಿತ ನಾಮನಿರ್ದೇಶಿತ ವ್ಯಕ್ತಿ, ಆಗಾಗ್ಗೆ ಇದನ್ನು ಮೊದಲ ಬಾರಿಗೆ ಮಾಡುತ್ತಿರುವ, ಆಗಾಗ್ಗೆ ಫೋನ್‌ನಲ್ಲಿ, ಆಗಾಗ್ಗೆ ಇನ್ನೂ ದುಃಖದಲ್ಲಿರುವ.",
    notHeading: "ಅಧಿಕಾರ್ ಏನು ಮಾಡುವುದಿಲ್ಲ",
    notBody:
      "ಲಾಗಿನ್ ಇಲ್ಲ, ಖಾತೆ ಇಲ್ಲ, ಮತ್ತು ಪುಟವನ್ನು ತೋರಿಸಲು ಬೇಕಾದುದನ್ನು ಹೊರತುಪಡಿಸಿ ನಿಮ್ಮ ಕುಟುಂಬದ ಬಗ್ಗೆ ಏನೂ ಸಂಗ್ರಹವಾಗುವುದಿಲ್ಲ ಅಥವಾ ಸರ್ವರ್‌ಗೆ ತಲುಪುವುದಿಲ್ಲ. ಅಧಿಕಾರ್‌ಗೆ ಯಾವುದೇ ಬ್ಯಾಕೆಂಡ್ ಇಲ್ಲ ಮತ್ತು ಇದು ಬ್ಯಾಂಕ್ ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಲು ಸಾಧ್ಯವಿಲ್ಲ — ಇದು ಉಲ್ಲೇಖಿಸುತ್ತದೆ ಮತ್ತು ಉದ್ಧರಿಸುತ್ತದೆ, ಎಂದಿಗೂ ತನ್ನದೇ ಆದ ಕಾನೂನು ಅಭಿಪ್ರಾಯವನ್ನು ಹೇಳುವುದಿಲ್ಲ.",
    nameHeading: "ಹೆಸರು",
    nameBody:
      "ಅಧಿಕಾರ್ ಎಂದರೆ ಹಕ್ಕು, ಸ್ವತ್ವ. ಹಣ ನಿಮ್ಮದೇ ಎಂಬುದು ಹಕ್ಕುದಾವೆಯಲ್ಲ — ಅಗತ್ಯವಿಲ್ಲದಿರಬಹುದಾದ ದಾಖಲೆಗಾಗಿ ಹಣ ಮತ್ತು ತಿಂಗಳುಗಳನ್ನು ಖರ್ಚು ಮಾಡುವ ಮೊದಲು ಸರಿಯಾದ ನಿಯಮವನ್ನು ನಿಮಗೆ ತಿಳಿಸಬೇಕು ಎಂಬುದೇ ಹಕ್ಕುದಾವೆ.",
    cta: "ಪೂರ್ಣ ಆರ್‌ಬಿಐ-ಉಲ್ಲೇಖಿತ ಮಾರ್ಗದರ್ಶಿ ಓದಿ",
  },
};

export const HOME_T: Record<Locale, HomeDict> = { en, hi, kn };
