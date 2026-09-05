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

  /**
   * /banks — structural text only. Bank names, thresholds, quotes and notes
   * stay English everywhere: they are read verbatim from each bank's own
   * published page, and a translated quote stops being a quote a branch
   * officer will accept — same rule as the RBI's own statutory text.
   */
  banksPage: {
    eyebrow: string;
    heading: string;
    sub: string;
    cta: string;
    everyCellStrong: string;
    everyCellBody: string;
    emptyRowHeading: string;
    emptyRowBefore: string;
    emptyRowAfter: string;
    pageOnlyAfter: string;
    swipeHint: string;
    thBank: string;
    thThreshold: string;
    thSurety: string;
    thPolicy: string;
    thForm: string;
    thChecked: string;
    suretyNotRequired: string;
    suretyRequired: string;
    policyNothingFound: string;
    policyDocument: string;
    policyPageOnly: string;
    formLink: string;
    confirmStale: string;
    whatEachSaysHeading: string;
    gapLabel: string;
    readFullArticle: (short: string) => string;
    linkPage: string;
    linkForm: string;
    linkPolicy: string;
    linkOnline: string;
    footerReadFrom: string;
    footerInfoNote: string;
    findClaim: string;
    tellUs: string;
  };

  /** /faq -- the question/answer content itself lives in lib/faq.ts (its own per-locale arrays), since it is Adhikaar's own summarised prose, not part of this homepage dictionary. Only the page's own chrome text lives here. */
  faqPage: {
    heading: string;
    mostAsked: string;
  };

  /** /start -- the scenario picker's own static text. Wizard questions live in lib/wizard.ts (its own per-locale QUESTIONS_BY_LOCALE), scenario cards in lib/scenarios.ts (SCENARIOS_BY_LOCALE) -- both separate from this dictionary since they are structured data, not simple strings. */
  startPage: {
    eyebrow: string;
    heading: string;
    sub: string;
    somethingElse: string;
    noneOfThese: string;
    questionOf: (current: number, total: number) => string;
    timeEstimate: string;
    backAQuestion: string;
    backToStart: string;
    privacyNote: string;
    privacyLink: string;
  };

  /** /confirm-details -- shown when the wizard needs a human review step (a court restriction, a will, a dispute, or an unconfirmed bank type/amount) instead of a clean outcome. */
  confirmDetailsPage: {
    headingRestricted: string;
    headingWill: string;
    headingDefault: string;
    sub: string;
    whatToDoNext: string;
    stepRestrictedYes: string;
    stepRestrictedAsk: string;
    stepWillYes: string;
    stepWillAsk: string;
    stepDispute: string;
    stepBankTypeUnknown: string;
    stepAmountUnknown: string;
    reviewAnswers: string;
    change: string;
    startAgain: string;
    disclaimer: string;
    readDirections: string;
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
    policy: "Bank policies",
    updates: "Updates",
    contact: "Contact",
    start: "Begin your claim journey today",
  },
  tagline: "What's yours should find its way home.",
  notice: {
    pre: "Adhikaar is an independent guidance tool, not a government service.",
    strong: "Verify any claim directly with your bank or the RBI's UDGAM portal.",
  },

  hero: {
    eyebrow: "For families. For what matters.",
    headline: "Money left behind shouldn't stay lost.",
    sub: "Adhikaar gives families a clear, printable path for claiming\na deceased person's bank deposits—no account or document uploads needed.",
    start: "Begin your claim journey today",
    seeHow: "See how it works",
    trustFree: "Free to use",
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
    free: "cost to use Adhikaar — no account or document uploads",
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
    cta: "Begin your claim journey today",
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
    a4: "No account or document uploads are needed. Answers appear in page URLs; the deadline tool uses browser storage. Read the Privacy page for server and analytics details.",
  },

  finalCta: {
    heading: "Something may still be waiting for your family.",
    sub: "Start with a simple search. We'll help you understand what comes next.",
    cta: "Begin your claim journey today",
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
      "A few questions, a check of the relevant conditions, and printable guidance carrying the RBI's rules and the bank's published policy.",
    whyHeading: "Why it exists",
    whyBody:
      "Since the RBI's 2025 Directions on the settlement of claims for deceased bank customers, in force from 31 March 2026, a bank usually cannot demand a succession certificate — a civil court process that typically costs around ₹17,000 and takes four to seven months. Almost nobody knows the rule changed. Adhikaar exists so a family can show the bank its own rules, instead of arguing an opinion against it.",
    whoHeading: "Who it's for",
    whoBody:
      "Anyone who has already been to a bank about a deceased relative's account and been handed a list of demands — usually an adult legal heir or a registered nominee, often doing this for the first time, often on a phone, often while still grieving.",
    notHeading: "What Adhikaar does not do",
    notBody:
      "Adhikaar provides bank-deposit claim guidance, not account searches or claim submission. Answers are carried in page URLs. See Privacy for browser storage, server requests and optional analytics.",
    nameHeading: "The name",
    nameBody:
      "Adhikaar means right, entitlement, in Hindi and Urdu. The claim isn't that the money is yours — it's that you're entitled to be told the correct rule before spending money and months on a document you may not need.",
    cta: "Read the full RBI-cited guide",
  },

  banksPage: {
    eyebrow: "Bank-by-bank",
    heading: "The rule is the same everywhere. The practice is not.",
    sub: "The RBI sets a floor and every bank builds its own practice on top. This is what each bank publishes about deceased claims, read from their own pages — including where they publish nothing at all.",
    cta: "Start your claim journey today",
    everyCellStrong: "Every cell is read or blank.",
    everyCellBody:
      "Nothing here is inferred. Where a bank has not published a figure we leave it empty and say so, rather than filling it with the RBI floor and letting you believe it is that bank's own number. A checked row is worth more than a guessed one.",
    emptyRowHeading: "An empty row is itself a finding",
    emptyRowBefore:
      "Since 31 March 2026 a bank has been required to publish its board-approved deceased-claim policy and its document checklist. We could not find one for",
    emptyRowAfter:
      ". If you are claiming there, ask the branch in writing for the board-approved policy and the checklist.",
    pageOnlyAfter:
      "publish a deceased-claim page with real detail on it, but we did not find the board-approved policy document itself. A page is not the same thing as the policy the rule asks for, so the table says which one we actually found.",
    swipeHint: "Swipe the table sideways for the rest of the columns. The bank names stay put.",
    thBank: "Bank",
    thThreshold: "Its own threshold",
    thSurety: "Third-party surety below it",
    thPolicy: "Policy published",
    thForm: "Form to download",
    thChecked: "Checked",
    suretyNotRequired: "Not to be insisted on",
    suretyRequired: "Required",
    policyNothingFound: "Nothing found",
    policyDocument: "Policy document",
    policyPageOnly: "A claims page, no policy document",
    formLink: "Its form",
    confirmStale: "Confirm before relying on this",
    whatEachSaysHeading: "What each one actually says",
    gapLabel: "Documented gap between policy and practice:",
    readFullArticle: (short) => `Read the full article on ${short}`,
    linkPage: "Its deceased-claim page",
    linkForm: "Its claim form",
    linkPolicy: "Its published policy",
    linkOnline: "Lodge online",
    footerReadFrom: "Read from each bank's own published pages on the dates shown. The rule they are all working from is",
    footerInfoNote: "Information, not legal advice. A bank may have changed its page since we checked — the date is there so you can tell.",
    findClaim: "Find out what applies to your claim",
    tellUs: "Found an outdated bank policy? Tell us",
  },

  faqPage: {
    heading: "Frequently asked questions",
    mostAsked: "Most asked",
  },

  startPage: {
    eyebrow: "Where should we start?",
    heading: "Which of these sounds like your situation?",
    sub: "Pick whichever is closest — you can change any answer as you go.",
    somethingElse: "Something else?",
    noneOfThese: "None of these — answer a few short questions instead",
    questionOf: (current, total) => `Step ${current} of ${total}`,
    timeEstimate: "This takes about 2–3 minutes. You do not need documents or exact information to begin.",
    backAQuestion: "Back a question",
    backToStart: "Back to the start",
    privacyNote: "No account or document uploads. Answers appear in page links.",
    privacyLink: "Privacy details",
  },

  confirmDetailsPage: {
    headingRestricted: "A court restriction needs to be resolved first.",
    headingWill: "A will needs a different documentation check.",
    headingDefault: "We need to confirm a few details first.",
    sub: "We cannot yet confirm that the simplified checklist applies. This does not mean you must obtain a succession certificate.",
    whatToDoNext: "What to do next",
    stepRestrictedYes: "Take the restraining order to your lawyer and the bank. Payment cannot proceed while an applicable restriction remains in force; ask what subsequent court order is needed.",
    stepRestrictedAsk: "Ask the bank whether it knows of a court order preventing payment.",
    stepWillYes: "Give the bank a copy of the will and request its written document requirements. Probate or letters of administration may apply; the bank can sometimes act on an undisputed will, subject to applicable law. Get qualified advice.",
    stepWillAsk: "Check with the family whether a will was left. Do not treat an unknown will status as 'no will'.",
    stepDispute: "Confirm whether anyone contests the claim. For a known dispute, obtain individual advice; do not assume a standard document checklist resolves inheritance rights.",
    stepBankTypeUnknown: "Ask the bank whether it is a co-operative bank and request its current deceased-deposit claim policy.",
    stepAmountUnknown: "Ask for the aggregate payable at this bank, including interest, and its applicable threshold. If the amount equals the threshold, ask the bank to confirm the documentation route in writing.",
    reviewAnswers: "Review your answers",
    change: "Change:",
    startAgain: "Start again with confirmed details",
    disclaimer: "General information, not legal advice.",
    readDirections: "Read the RBI directions, paragraphs 7–11.",
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
    start: "आज ही अपनी दावा यात्रा शुरू करें",
  },
  tagline: "आपकी चीज़ें, उन्हीं तक वापस पहुँचें।",
  notice: {
    pre: "अधिकार एक स्वतंत्र मार्गदर्शन उपकरण है, कोई सरकारी सेवा नहीं।",
    strong: "किसी भी दावे की पुष्टि सीधे अपने बैंक या आरबीआई के उद्गम पोर्टल से करें।",
  },

  hero: {
    eyebrow: "परिवारों के लिए। ज़रूरी बातों के लिए।",
    headline: "पीछे छूटा पैसा खोया नहीं रहना चाहिए।",
    sub: "अधिकार दिवंगत परिजन की बैंक जमा पर दावा करने के लिए\nस्पष्ट, छापने योग्य मार्गदर्शन देता है—खाता या दस्तावेज़ अपलोड ज़रूरी नहीं।",
    start: "आज ही अपनी दावा यात्रा शुरू करें",
    seeHow: "देखें यह कैसे काम करता है",
    trustFree: "उपयोग मुफ़्त है",
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
    free: "अधिकार इस्तेमाल करने की लागत — खाता या दस्तावेज़ अपलोड ज़रूरी नहीं",
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
    cta: "आज ही अपनी दावा यात्रा शुरू करें",
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
    a4: "उत्तर पृष्ठ के लिंक में रहते हैं और पृष्ठ दिखाने के लिए सर्वर तक जाते हैं। वैकल्पिक समय-सीमा की तारीख़ ब्राउज़र में रहती है। सर्वर और उपयोग विश्लेषण की जानकारी के लिए गोपनीयता पृष्ठ पढ़ें।",
  },

  finalCta: {
    heading: "आपके परिवार का कुछ अब भी इंतज़ार कर रहा हो सकता है।",
    sub: "एक सरल खोज से शुरू करें। हम आगे क्या करना है यह समझने में मदद करेंगे।",
    cta: "आज ही अपनी दावा यात्रा शुरू करें",
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

  banksPage: {
    eyebrow: "बैंक के अनुसार",
    heading: "नियम हर जगह एक जैसा है। व्यवहार नहीं।",
    sub: "आरबीआई एक न्यूनतम सीमा तय करता है, और हर बैंक उस पर अपनी प्रक्रिया बनाता है। यह वही है जो हर बैंक दिवंगत दावों के बारे में अपने पन्नों पर प्रकाशित करता है — जिसमें वे मामले भी शामिल हैं जहाँ वे कुछ भी प्रकाशित नहीं करते।",
    cta: "आज ही अपना दावा शुरू करें",
    everyCellStrong: "हर सेल या तो पढ़ी गई है या ख़ाली है।",
    everyCellBody:
      "यहाँ कुछ भी अनुमान से नहीं भरा गया। जहाँ किसी बैंक ने कोई आँकड़ा प्रकाशित नहीं किया, वहाँ हमने उसे ख़ाली छोड़ा और यह बताया, बजाय इसके कि आरबीआई की सीमा भरकर आपको यह विश्वास दिलाएँ कि यह उसी बैंक का अपना आँकड़ा है। एक जाँची गई पंक्ति एक अनुमानित पंक्ति से बेहतर है।",
    emptyRowHeading: "एक ख़ाली पंक्ति भी अपने आप में एक निष्कर्ष है",
    emptyRowBefore:
      "31 मार्च 2026 से हर बैंक के लिए अपनी बोर्ड-अनुमोदित दिवंगत-दावा नीति और दस्तावेज़ सूची प्रकाशित करना ज़रूरी है। हमें इसके लिए कोई नीति नहीं मिली:",
    emptyRowAfter:
      "। अगर आप वहाँ दावा कर रहे हैं, तो शाखा से लिखित में बोर्ड-अनुमोदित नीति और सूची माँगें।",
    pageOnlyAfter:
      "दिवंगत-दावे के बारे में एक असली जानकारी वाला पन्ना प्रकाशित करते हैं, पर हमें बोर्ड-अनुमोदित नीति दस्तावेज़ नहीं मिला। एक पन्ना उस नीति के बराबर नहीं है जो नियम माँगता है, इसलिए यह तालिका बताती है कि हमें असल में क्या मिला।",
    swipeHint: "बाक़ी कॉलम देखने के लिए तालिका को बग़ल में सरकाएँ। बैंक के नाम अपनी जगह रहते हैं।",
    thBank: "बैंक",
    thThreshold: "उसकी अपनी सीमा",
    thSurety: "सीमा से नीचे तीसरे पक्ष की ज़मानत",
    thPolicy: "नीति प्रकाशित",
    thForm: "फ़ॉर्म डाउनलोड करें",
    thChecked: "जाँचा गया",
    suretyNotRequired: "ज़ोर नहीं दिया जाना",
    suretyRequired: "ज़रूरी",
    policyNothingFound: "कुछ नहीं मिला",
    policyDocument: "नीति दस्तावेज़",
    policyPageOnly: "एक जानकारी पन्ना, कोई नीति दस्तावेज़ नहीं",
    formLink: "इसका फ़ॉर्म",
    confirmStale: "इस पर भरोसा करने से पहले पुष्टि करें",
    whatEachSaysHeading: "हर बैंक असल में क्या कहता है",
    gapLabel: "नीति और व्यवहार के बीच दर्ज अंतर:",
    readFullArticle: (short) => `${short} पर पूरा लेख पढ़ें`,
    linkPage: "इसका दिवंगत-दावा पन्ना",
    linkForm: "इसका दावा फ़ॉर्म",
    linkPolicy: "इसकी प्रकाशित नीति",
    linkOnline: "ऑनलाइन दर्ज करें",
    footerReadFrom: "हर बैंक के अपने प्रकाशित पन्नों से, दी गई तारीख़ों पर पढ़ा गया। जिस नियम पर सब काम कर रहे हैं वह है",
    footerInfoNote: "जानकारी, क़ानूनी सलाह नहीं। हमारे जाँचने के बाद बैंक ने अपना पन्ना बदला हो सकता है — इसलिए तारीख़ दी गई है ताकि आप जान सकें।",
    findClaim: "जानें आपके दावे पर क्या लागू होता है",
    tellUs: "पुरानी बैंक नीति मिली? हमें बताएँ",
  },

  faqPage: {
    heading: "अक्सर पूछे जाने वाले सवाल",
    mostAsked: "सबसे ज़्यादा पूछा गया",
  },

  startPage: {
    eyebrow: "हम कहाँ से शुरू करें?",
    heading: "इनमें से कौन-सी आपकी स्थिति जैसी लगती है?",
    sub: "जो सबसे क़रीब लगे उसे चुनें — आप कोई भी जवाब बाद में बदल सकते हैं।",
    somethingElse: "कुछ और?",
    noneOfThese: "इनमें से कोई नहीं — इसके बजाय कुछ छोटे सवालों के जवाब दें",
    questionOf: (current, total) => `${total} में से चरण ${current}`,
    backAQuestion: "एक सवाल पीछे",
    backToStart: "शुरुआत पर वापस",
    privacyNote: "कोई खाता या दस्तावेज़ अपलोड नहीं। जवाब पेज के लिंक में दिखते हैं।",
    privacyLink: "गोपनीयता विवरण",
    timeEstimate: "इसमें लगभग 2–3 मिनट लगते हैं। शुरू करने के लिए दस्तावेज़ या सटीक जानकारी ज़रूरी नहीं है।",
  },

  confirmDetailsPage: {
    headingRestricted: "पहले एक अदालती रोक को सुलझाना ज़रूरी है।",
    headingWill: "वसीयत के लिए एक अलग दस्तावेज़ जाँच चाहिए।",
    headingDefault: "हमें पहले कुछ विवरणों की पुष्टि करनी होगी।",
    sub: "हम अभी यह पुष्टि नहीं कर सकते कि सरल सूची लागू होती है। इसका मतलब यह नहीं कि आपको उत्तराधिकार प्रमाणपत्र लेना ही होगा।",
    whatToDoNext: "आगे क्या करें",
    stepRestrictedYes: "रोक-आदेश अपने वकील और बैंक के पास ले जाएँ। जब तक लागू रोक जारी है, भुगतान आगे नहीं बढ़ सकता; पूछें कि आगे कौन-सा अदालती आदेश चाहिए।",
    stepRestrictedAsk: "बैंक से पूछें कि क्या उसे भुगतान रोकने वाले किसी अदालती आदेश की जानकारी है।",
    stepWillYes: "बैंक को वसीयत की एक प्रति दें और उसकी लिखित दस्तावेज़ आवश्यकताएँ माँगें। प्रोबेट या प्रशासन-पत्र लागू हो सकते हैं; बैंक कभी-कभी लागू क़ानून के तहत एक अविवादित वसीयत पर काम कर सकता है। योग्य सलाह लें।",
    stepWillAsk: "परिवार से पूछें कि क्या कोई वसीयत छोड़ी गई थी। अज्ञात वसीयत स्थिति को 'कोई वसीयत नहीं' न मानें।",
    stepDispute: "पुष्टि करें कि क्या कोई दावे पर विवाद कर रहा है। ज्ञात विवाद के लिए, व्यक्तिगत सलाह लें; यह न मानें कि एक मानक दस्तावेज़ सूची विरासत अधिकारों को सुलझा देती है।",
    stepBankTypeUnknown: "बैंक से पूछें कि क्या यह एक सहकारी बैंक है और उसकी मौजूदा दिवंगत-जमा दावा नीति माँगें।",
    stepAmountUnknown: "इस बैंक में देय कुल रकम, ब्याज सहित, और लागू सीमा पूछें। अगर रकम सीमा के बराबर है, तो बैंक से लिखित में दस्तावेज़ी रास्ते की पुष्टि माँगें।",
    reviewAnswers: "अपने जवाब देखें",
    change: "बदलें:",
    startAgain: "पुष्टि किए गए विवरणों के साथ फिर से शुरू करें",
    disclaimer: "सामान्य जानकारी, क़ानूनी सलाह नहीं।",
    readDirections: "आरबीआई निर्देश, पैराग्राफ़ 7–11 पढ़ें।",
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
    start: "ಇಂದೇ ನಿಮ್ಮ ಕ್ಲೈಮ್ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
  },
  tagline: "ನಿಮ್ಮದು ನಿಮ್ಮ ದಾರಿ ಕಂಡುಕೊಳ್ಳಲಿ.",
  notice: {
    pre: "ಅಧಿಕಾರ್ ಒಂದು ಸ್ವತಂತ್ರ ಮಾರ್ಗದರ್ಶನ ಸಾಧನ, ಸರ್ಕಾರಿ ಸೇವೆಯಲ್ಲ.",
    strong: "ಯಾವುದೇ ಹಕ್ಕನ್ನು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಅಥವಾ ಆರ್‌ಬಿಐನ ಉದ್ಗಮ್ ಪೋರ್ಟಲ್‌ನಿಂದ ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
  },

  hero: {
    eyebrow: "ಕುಟುಂಬಗಳಿಗಾಗಿ. ಮುಖ್ಯವಾದುದಕ್ಕಾಗಿ.",
    headline: "ಉಳಿದ ಹಣ ಕಳೆದುಹೋಗಬಾರದು.",
    sub: "ಮೃತ ಕುಟುಂಬ ಸದಸ್ಯರ ಬ್ಯಾಂಕ್ ಠೇವಣಿ ಕ್ಲೈಮ್ ಮಾಡಲು\nಅಧಿಕಾರ್ ಸ್ಪಷ್ಟ, ಮುದ್ರಿಸಬಹುದಾದ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ—ಖಾತೆ ಅಥವಾ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಬೇಡ.",
    start: "ಇಂದೇ ನಿಮ್ಮ ಕ್ಲೈಮ್ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
    seeHow: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ನೋಡಿ",
    trustFree: "ಬಳಕೆ ಉಚಿತ",
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
    free: "ಅಧಿಕಾರ್ ಬಳಸಲು ವೆಚ್ಚ — ಖಾತೆ ಅಥವಾ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಬೇಡ",
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
    cta: "ಇಂದೇ ನಿಮ್ಮ ಕ್ಲೈಮ್ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
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
    a4: "ಉತ್ತರಗಳು ಪುಟದ ಲಿಂಕ್‌ನಲ್ಲಿ ಇರುತ್ತವೆ ಮತ್ತು ಪುಟ ತೋರಿಸಲು ಸರ್ವರ್‌ಗೆ ಹೋಗುತ್ತವೆ. ಐಚ್ಛಿಕ ಗಡುವಿನ ದಿನಾಂಕ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಉಳಿಯುತ್ತದೆ. ಸರ್ವರ್ ಮತ್ತು ಬಳಕೆ ವಿಶ್ಲೇಷಣೆಯ ವಿವರಗಳಿಗೆ ಗೌಪ್ಯತೆ ಪುಟ ಓದಿ.",
  },

  finalCta: {
    heading: "ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕಾಗಿ ಇನ್ನೂ ಏನೋ ಕಾಯುತ್ತಿರಬಹುದು.",
    sub: "ಸರಳ ಹುಡುಕಾಟದೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ. ಮುಂದೆ ಏನು ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
    cta: "ಇಂದೇ ನಿಮ್ಮ ಕ್ಲೈಮ್ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
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

  banksPage: {
    eyebrow: "ಬ್ಯಾಂಕ್-ವಾರು",
    heading: "ನಿಯಮ ಎಲ್ಲೆಡೆ ಒಂದೇ. ಆಚರಣೆ ಅಲ್ಲ.",
    sub: "ಆರ್‌ಬಿಐ ಒಂದು ಕನಿಷ್ಠ ಮಿತಿಯನ್ನು ನಿಗದಿಪಡಿಸುತ್ತದೆ, ಮತ್ತು ಪ್ರತಿ ಬ್ಯಾಂಕ್ ಅದರ ಮೇಲೆ ತನ್ನದೇ ಆದ ಆಚರಣೆಯನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ. ಇದು ಪ್ರತಿ ಬ್ಯಾಂಕ್ ದಿವಂಗತ ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ತಮ್ಮ ಸ್ವಂತ ಪುಟಗಳಲ್ಲಿ ಪ್ರಕಟಿಸುವುದು — ಏನನ್ನೂ ಪ್ರಕಟಿಸದಿರುವ ಸಂದರ್ಭಗಳನ್ನೂ ಒಳಗೊಂಡಂತೆ.",
    cta: "ಇಂದೇ ನಿಮ್ಮ ಹಕ್ಕು ಪ್ರಾರಂಭಿಸಿ",
    everyCellStrong: "ಪ್ರತಿ ಸೆಲ್ ಒಂದೋ ಓದಲಾಗಿದೆ ಅಥವಾ ಖಾಲಿ ಇದೆ.",
    everyCellBody:
      "ಇಲ್ಲಿ ಏನೂ ಊಹಿಸಿ ತುಂಬಿಲ್ಲ. ಒಂದು ಬ್ಯಾಂಕ್ ಒಂದು ಅಂಕಿ ಪ್ರಕಟಿಸದಿದ್ದಲ್ಲಿ, ಅದನ್ನು ಖಾಲಿ ಬಿಟ್ಟು ಹಾಗೆಂದು ಹೇಳುತ್ತೇವೆ, ಆರ್‌ಬಿಐ ಮಿತಿಯನ್ನು ತುಂಬಿ ಅದು ಆ ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ಸಂಖ್ಯೆ ಎಂದು ನಿಮಗೆ ನಂಬಿಸುವ ಬದಲು. ಒಂದು ಪರಿಶೀಲಿಸಿದ ಸಾಲು ಊಹಿಸಿದ ಹಲವು ಸಾಲುಗಳಿಗಿಂತ ಉತ್ತಮ.",
    emptyRowHeading: "ಖಾಲಿ ಸಾಲು ಕೂಡ ಒಂದು ಸಂಶೋಧನೆಯೇ",
    emptyRowBefore:
      "31 ಮಾರ್ಚ್ 2026 ರಿಂದ ಪ್ರತಿ ಬ್ಯಾಂಕ್ ತನ್ನ ಬೋರ್ಡ್-ಅನುಮೋದಿತ ದಿವಂಗತ-ಹಕ್ಕು ನೀತಿ ಮತ್ತು ದಾಖಲೆ ಪಟ್ಟಿಯನ್ನು ಪ್ರಕಟಿಸಬೇಕು. ಇವರಿಗೆ ನಮಗೆ ಅದು ಸಿಗಲಿಲ್ಲ:",
    emptyRowAfter:
      ". ನೀವು ಅಲ್ಲಿ ಹಕ್ಕು ಸಲ್ಲಿಸುತ್ತಿದ್ದರೆ, ಬೋರ್ಡ್-ಅನುಮೋದಿತ ನೀತಿ ಮತ್ತು ಪಟ್ಟಿಯನ್ನು ಶಾಖೆಯಿಂದ ಲಿಖಿತವಾಗಿ ಕೇಳಿ.",
    pageOnlyAfter:
      "ದಿವಂಗತ-ಹಕ್ಕಿನ ಬಗ್ಗೆ ನಿಜವಾದ ವಿವರವಿರುವ ಪುಟವನ್ನು ಪ್ರಕಟಿಸುತ್ತಾರೆ, ಆದರೆ ನಮಗೆ ಬೋರ್ಡ್-ಅನುಮೋದಿತ ನೀತಿ ದಾಖಲೆ ಸಿಗಲಿಲ್ಲ. ಒಂದು ಪುಟ ಎಂದರೆ ನಿಯಮ ಕೇಳುವ ನೀತಿಯಲ್ಲ, ಆದ್ದರಿಂದ ಈ ಕೋಷ್ಟಕ ನಮಗೆ ನಿಜವಾಗಿ ಸಿಕ್ಕಿದ್ದನ್ನು ಹೇಳುತ್ತದೆ.",
    swipeHint: "ಉಳಿದ ಕಾಲಂಗಳಿಗಾಗಿ ಕೋಷ್ಟಕವನ್ನು ಪಕ್ಕಕ್ಕೆ ಸರಿಸಿ. ಬ್ಯಾಂಕ್ ಹೆಸರುಗಳು ಸ್ಥಿರವಾಗಿರುತ್ತವೆ.",
    thBank: "ಬ್ಯಾಂಕ್",
    thThreshold: "ಅದರ ಸ್ವಂತ ಮಿತಿ",
    thSurety: "ಮಿತಿಗಿಂತ ಕೆಳಗೆ ಮೂರನೇ ವ್ಯಕ್ತಿಯ ಜಾಮೀನು",
    thPolicy: "ನೀತಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ",
    thForm: "ಫಾರ್ಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    thChecked: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    suretyNotRequired: "ಒತ್ತಾಯಿಸಬಾರದು",
    suretyRequired: "ಅಗತ್ಯವಿದೆ",
    policyNothingFound: "ಏನೂ ಸಿಗಲಿಲ್ಲ",
    policyDocument: "ನೀತಿ ದಾಖಲೆ",
    policyPageOnly: "ಒಂದು ಮಾಹಿತಿ ಪುಟ, ನೀತಿ ದಾಖಲೆ ಇಲ್ಲ",
    formLink: "ಇದರ ಫಾರ್ಮ್",
    confirmStale: "ಇದನ್ನು ನಂಬುವ ಮೊದಲು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ",
    whatEachSaysHeading: "ಪ್ರತಿ ಬ್ಯಾಂಕ್ ನಿಜವಾಗಿ ಏನು ಹೇಳುತ್ತದೆ",
    gapLabel: "ನೀತಿ ಮತ್ತು ಆಚರಣೆಯ ನಡುವಿನ ದಾಖಲಿತ ಅಂತರ:",
    readFullArticle: (short) => `${short} ಕುರಿತು ಪೂರ್ಣ ಲೇಖನ ಓದಿ`,
    linkPage: "ಇದರ ದಿವಂಗತ-ಹಕ್ಕು ಪುಟ",
    linkForm: "ಇದರ ಹಕ್ಕು ಫಾರ್ಮ್",
    linkPolicy: "ಇದರ ಪ್ರಕಟಿತ ನೀತಿ",
    linkOnline: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಸಲ್ಲಿಸಿ",
    footerReadFrom: "ತೋರಿಸಿದ ದಿನಾಂಕಗಳಂದು ಪ್ರತಿ ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ಪ್ರಕಟಿತ ಪುಟಗಳಿಂದ ಓದಲಾಗಿದೆ. ಎಲ್ಲರೂ ಕೆಲಸ ಮಾಡುತ್ತಿರುವ ನಿಯಮ ಇದು",
    footerInfoNote: "ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆ ಅಲ್ಲ. ನಾವು ಪರಿಶೀಲಿಸಿದ ನಂತರ ಬ್ಯಾಂಕ್ ತನ್ನ ಪುಟವನ್ನು ಬದಲಾಯಿಸಿರಬಹುದು — ಆದ್ದರಿಂದ ನಿಮಗೆ ತಿಳಿಯಲು ದಿನಾಂಕ ನೀಡಲಾಗಿದೆ.",
    findClaim: "ನಿಮ್ಮ ಹಕ್ಕಿಗೆ ಏನು ಅನ್ವಯಿಸುತ್ತದೆ ಎಂದು ತಿಳಿಯಿರಿ",
    tellUs: "ಹಳೆಯ ಬ್ಯಾಂಕ್ ನೀತಿ ಕಂಡುಬಂದಿದೆಯೇ? ನಮಗೆ ತಿಳಿಸಿ",
  },

  faqPage: {
    heading: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    mostAsked: "ಹೆಚ್ಚು ಕೇಳಲಾದ",
  },

  startPage: {
    eyebrow: "ನಾವು ಎಲ್ಲಿಂದ ಪ್ರಾರಂಭಿಸಬೇಕು?",
    heading: "ಇವುಗಳಲ್ಲಿ ಯಾವುದು ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಯಂತೆ ಕಾಣುತ್ತದೆ?",
    sub: "ಹತ್ತಿರವಾದದ್ದನ್ನು ಆರಿಸಿ — ನೀವು ಯಾವುದೇ ಉತ್ತರವನ್ನು ನಂತರ ಬದಲಾಯಿಸಬಹುದು.",
    somethingElse: "ಬೇರೆ ಏನಾದರೂ?",
    noneOfThese: "ಇವುಗಳಲ್ಲಿ ಯಾವುದೂ ಇಲ್ಲ — ಬದಲಿಗೆ ಕೆಲವು ಸಣ್ಣ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ",
    questionOf: (current, total) => `${total} ರಲ್ಲಿ ಹಂತ ${current}`,
    backAQuestion: "ಒಂದು ಪ್ರಶ್ನೆ ಹಿಂದೆ",
    backToStart: "ಪ್ರಾರಂಭಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    privacyNote: "ಯಾವುದೇ ಖಾತೆ ಅಥವಾ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಇಲ್ಲ. ಉತ್ತರಗಳು ಪುಟದ ಲಿಂಕ್‌ಗಳಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
    privacyLink: "ಗೌಪ್ಯತೆ ವಿವರಗಳು",
    timeEstimate: "ಇದಕ್ಕೆ ಸುಮಾರು 2–3 ನಿಮಿಷಗಳು ಬೇಕಾಗುತ್ತವೆ. ಪ್ರಾರಂಭಿಸಲು ದಾಖಲೆಗಳು ಅಥವಾ ನಿಖರ ಮಾಹಿತಿ ಅಗತ್ಯವಿಲ್ಲ.",
  },

  confirmDetailsPage: {
    headingRestricted: "ಮೊದಲು ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧವನ್ನು ಪರಿಹರಿಸಬೇಕು.",
    headingWill: "ವಿಲ್‌ಗೆ ಬೇರೆ ದಾಖಲೆ ಪರಿಶೀಲನೆ ಬೇಕು.",
    headingDefault: "ನಾವು ಮೊದಲು ಕೆಲವು ವಿವರಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬೇಕು.",
    sub: "ಸರಳೀಕೃತ ಪಟ್ಟಿ ಅನ್ವಯಿಸುತ್ತದೆ ಎಂದು ನಾವು ಇನ್ನೂ ಖಚಿತಪಡಿಸಲಾಗುವುದಿಲ್ಲ. ಇದರರ್ಥ ನೀವು ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲೇಬೇಕು ಎಂದಲ್ಲ.",
    whatToDoNext: "ಮುಂದೆ ಏನು ಮಾಡಬೇಕು",
    stepRestrictedYes: "ತಡೆ-ಆದೇಶವನ್ನು ನಿಮ್ಮ ವಕೀಲರ ಮತ್ತು ಬ್ಯಾಂಕಿನ ಬಳಿ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ. ಅನ್ವಯಿಸುವ ನಿರ್ಬಂಧ ಜಾರಿಯಲ್ಲಿರುವವರೆಗೆ ಪಾವತಿ ಮುಂದುವರಿಯಲು ಸಾಧ್ಯವಿಲ್ಲ; ಮುಂದೆ ಯಾವ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಬೇಕು ಎಂದು ಕೇಳಿ.",
    stepRestrictedAsk: "ಪಾವತಿಯನ್ನು ತಡೆಯುವ ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಆದೇಶದ ಬಗ್ಗೆ ಬ್ಯಾಂಕಿಗೆ ತಿಳಿದಿದೆಯೇ ಎಂದು ಕೇಳಿ.",
    stepWillYes: "ಬ್ಯಾಂಕಿಗೆ ವಿಲ್‌ನ ಪ್ರತಿಯನ್ನು ನೀಡಿ ಮತ್ತು ಅದರ ಲಿಖಿತ ದಾಖಲೆ ಅಗತ್ಯತೆಗಳನ್ನು ಕೇಳಿ. ಪ್ರೊಬೇಟ್ ಅಥವಾ ಆಡಳಿತ ಪತ್ರಗಳು ಅನ್ವಯಿಸಬಹುದು; ಅನ್ವಯಿಸುವ ಕಾನೂನಿಗೆ ಒಳಪಟ್ಟು ಬ್ಯಾಂಕ್ ಕೆಲವೊಮ್ಮೆ ವಿವಾದವಿಲ್ಲದ ವಿಲ್ ಮೇಲೆ ಕಾರ್ಯನಿರ್ವಹಿಸಬಹುದು. ಅರ್ಹ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    stepWillAsk: "ವಿಲ್ ಬಿಟ್ಟಿತ್ತೇ ಎಂದು ಕುಟುಂಬದೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ. ಗೊತ್ತಿಲ್ಲದ ವಿಲ್ ಸ್ಥಿತಿಯನ್ನು 'ವಿಲ್ ಇಲ್ಲ' ಎಂದು ಪರಿಗಣಿಸಬೇಡಿ.",
    stepDispute: "ಯಾರಾದರೂ ಹಕ್ಕನ್ನು ವಿವಾದಿಸುತ್ತಿದ್ದಾರೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ತಿಳಿದಿರುವ ವಿವಾದಕ್ಕೆ, ವೈಯಕ್ತಿಕ ಸಲಹೆ ಪಡೆಯಿರಿ; ಪ್ರಮಾಣಿತ ದಾಖಲೆ ಪಟ್ಟಿ ಉತ್ತರಾಧಿಕಾರ ಹಕ್ಕುಗಳನ್ನು ಪರಿಹರಿಸುತ್ತದೆ ಎಂದು ಭಾವಿಸಬೇಡಿ.",
    stepBankTypeUnknown: "ಇದು ಸಹಕಾರಿ ಬ್ಯಾಂಕೇ ಎಂದು ಬ್ಯಾಂಕನ್ನು ಕೇಳಿ ಮತ್ತು ಅದರ ಪ್ರಸ್ತುತ ದಿವಂಗತ-ಠೇವಣಿ ಹಕ್ಕು ನೀತಿಯನ್ನು ಕೇಳಿ.",
    stepAmountUnknown: "ಈ ಬ್ಯಾಂಕಿನಲ್ಲಿ ಬಡ್ಡಿ ಸೇರಿದಂತೆ ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ ಮತ್ತು ಅನ್ವಯಿಸುವ ಮಿತಿಯನ್ನು ಕೇಳಿ. ಮೊತ್ತ ಮಿತಿಗೆ ಸಮನಾಗಿದ್ದರೆ, ದಾಖಲೆ ಮಾರ್ಗವನ್ನು ಲಿಖಿತವಾಗಿ ಖಚಿತಪಡಿಸಲು ಬ್ಯಾಂಕನ್ನು ಕೇಳಿ.",
    reviewAnswers: "ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    change: "ಬದಲಾಯಿಸಿ:",
    startAgain: "ಖಚಿತಪಡಿಸಿದ ವಿವರಗಳೊಂದಿಗೆ ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
    disclaimer: "ಸಾಮಾನ್ಯ ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆ ಅಲ್ಲ.",
    readDirections: "ಆರ್‌ಬಿಐ ನಿರ್ದೇಶನಗಳು, ಪ್ಯಾರಾಗ್ರಾಫ್ 7–11 ಓದಿ.",
  },
};

export const HOME_T: Record<Locale, HomeDict> = { en, hi, kn };
