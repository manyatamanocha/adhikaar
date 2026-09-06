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

  stepsCards: {
    step1Label: string;
    step1Title: string;
    step1Body: string;
    step1Cta: string;
    step2Label: string;
    step2Title: string;
    step2Body: string;
    step2Cta: string;
    step3Label: string;
    step3Title: string;
    step3Body: string;
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
    bankStepHeading: string;
    bankStepBody: string;
    bankStepSkip: string;
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
  verdictPage: {
    generalGuidanceLabel: string;
    checkSituationFirst: string;
    askedCheckerHeading: string;
    askedCheckerBody: string;
    askedCheckerCta: string;
    whenRouteApplies: string;
    printNote: string;
    printButton: string;
    deadlineHeading: (days: number) => string;
    deadlineBefore: (paraFifteen: string, quote: string) => string;
    deadlineDateLabel: string;
    deadlineClear: string;
    deadlineKeptLocal: string;
    deadlineDayOfTotal: (day: number, total: number) => string;
    deadlineDayUp: (day: number, total: number) => string;
    deadlineWindowClosed: (dateLabel: string) => string;
    deadlineWindowEnds: (dateLabel: string) => string;
    deadlineWhatNow: string;
    deadlineComplaintText: (para15: string, para33: string) => string;
    deadlineOmbudsman: (waitDays: number, scheme: string) => string;
    deadlineOmbudsmanFree: string;
    deadlineExpectDispute: string;
    bankPanelHeading: (bankShort: string) => string;
    bankPanelSub: (bankShort: string, dateLabel: string) => string;
    bankPanelStaleHeading: string;
    bankPanelStaleBody: string;
    bankPanelConflictHeading: (bankShort: string) => string;
    bankGapHeading: (bankShort: string) => string;
    bankGapSeeDetail: string;
    bankPanelThresholdLabel: (bankShort: string) => string;
    bankPanelSuretyLabel: string;
    bankPanelSuretyNotRequired: string;
    bankPanelSuretyRequired: string;
    bankPanelTurnaroundLabel: string;
    bankPanelFormsLabel: string;
    bankPanelPageLink: string;
    bankPanelFormLink: string;
    bankPanelPolicyLink: string;
    bankPanelOnlineLink: string;
    bankPanelNoPolicyHeading: (bankShort: string) => string;
    bankPanelNoPolicyBody: (bankShort: string) => string;
    bankPanelDifferentBank: string;
    bankPanelWholeTable: string;
    bankPanelFoundOutdated: string;
    bankPanelTellUs: string;
    bankPanelNotVerified: string;
    bankPickerHeading: string;
    bankPickerBody: string;
    bankPickerAnotherBank: string;
    bankPickerSeeWhatWeHave: string;
    counterShorter: string;
    yourNextSteps: string;
    todayHeading: string;
    readyToProceed: string;
    knowAnswerNow: string;
    todayAction: {
      nomineeOrSurvivorship: string;
      underThreshold: string;
      unknownNominee: string;
      outOfScope: string;
      default: string;
    };
    documentsTitle: (n: number) => string;
    documentsNote: string;
    documentsLede: string;
    seeFullChecklist: string;
    whereFrom: string;
    cost: string;
    howLong: string;
    noteLabel: string;
    readinessNeed: (n: number) => string;
    readinessNoLongWait: string;
    readinessStartTodayLongest: (names: string) => string;
    readinessHaveAll: (n: number) => string;
    readinessTakeToBranch: string;
    readinessHaveOf: (have: number, total: number) => string;
    readinessStillToGet: (n: number) => string;
    readinessStartToday: (name: string) => string;
    readinessLongestWait: string;
    readinessLastOne: string;
    readinessOtherOneWaits: string;
    readinessOthersWait: (n: number) => string;
    readinessIsLastNoQueue: (name: string) => string;
    readinessNothingHasQueue: (name: string) => string;
    evidenceTitle: string;
    evidenceNote: string;
    evidenceLede: string;
    paragraphLabel: (para: string) => string;
    sourceLabel: (title: string, para: string, date: string) => string;
    inSummaryLabel: string;
    fromLabel: string;
    issuedLabel: string;
    tacticsTitle: string;
    tacticsNote: string;
    conditionsForRoute: string;
    otherImportantNotes: string;
    refusedHeading: string;
    readComplaintEligibility: string;
    fullRouteCta: string;
    sourceLineBrand: string;
    sourceLineBody: (number: string, ref: string, issued: string) => string;
    exclusionNote: string;
    answerAgain: string;
    foundIncorrect: string;
    show: string;
    hide: string;
    moreDetailTitle: string;
    moreDetailNote: string;
    numberWords: string[];
    counterModeLabel: string;
    seeFullPageInstead: string;
    whatToSay: string;
    whatDocToShow: string;
    whatBankMayAsk: string;
    whatToDoIfRefuse: string;
    noFixedListGood: string;
    noFixedListHard: string;
    counterFooter: string;
  };
  privacyPage: {
    heading: string;
    updated: string;
    linkSectionHeading: string;
    linkSectionBody: string;
    deviceSectionHeading: string;
    deviceSectionBody: string;
    analyticsSectionHeading: string;
    analyticsSectionBody: string;
    contactSectionHeading: string;
    contactSectionBody: string;
    chatNote: string;
    questionsSectionHeading: string;
    contactAdhikaar: string;
    questionsSectionBody: string;
  };
  bankRefusedPage: {
    heading: string;
    sub: string;
    fourSteps: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step4Title: string;
    step4Body: (scheme: string) => string;
    escalationHeading: string;
    complaintHeading: string;
    complaintSub: string;
    checkSituationInstead: string;
  };
  otherAssetsPage: {
    heading: string;
    sub: string;
    pointsNotAdvises: string;
    pointsNotAdvisesBody: string;
    railsHeading: string;
    whoHolds: string;
    routeCalled: string;
    findingOutHeading: string;
    findingOutBody: string;
    linksChecked: (date: string) => string;
    backToQuestions: string;
  };
  askedForPage: {
    heading: string;
    sub: string;
    tickHeading: string;
    tickedRemove: string;
    tickedSelect: string;
    comparingAgainst: string;
    confirmRouteFirst: string;
    changeAnswers: string;
    answerQuestions: string;
    notGradingHeading: string;
    aboveThresholdBody: string;
    incompleteBody: string;
    whatRbiSaysHeading: string;
    notInListHeading: (count: string) => string;
    notInListLede: string;
    notInListTag: string;
    inListHeading: (count: string) => string;
    inListLede: string;
    inListTag: string;
    printFooterNote: string;
    footerCompared: (title: string, number: string, issued: string) => string;
    countWord: (n: number) => string;
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

  stepsCards: {
    step1Label: "Step 1",
    step1Title: "Find the deposit through UDGAM",
    step1Body: "UDGAM means Unclaimed Deposits–Gateway to Access Information. It is the RBI's portal for searching unclaimed deposits across multiple banks. UDGAM helps you find the deposit; Adhikaar helps you understand how to claim it.",
    step1Cta: "Find it on UDGAM",
    step2Label: "Step 2",
    step2Title: "Understand the claim with Adhikaar",
    step2Body: "Answer a few simple questions about your claim.\nWe show the conditions, documents and next step that apply.",
    step2Cta: "Let's start your claim journey today",
    step3Label: "Step 3",
    step3Title: "Claim your money from the bank",
    step3Body: "Get a clear checklist of the documents you actually need.\nNo sign-in or document uploads. Read our privacy details before sharing a guide link.",
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
    somethingElse: "More situations",
    noneOfThese: "None of these — answer a few short questions instead",
    questionOf: (current, total) => `Step ${current} of ${total}`,
    timeEstimate: "This takes about 2–3 minutes. You do not need documents or exact information to begin.",
    backAQuestion: "Back a question",
    backToStart: "Back to the start",
    privacyNote: "No account or document uploads. Answers appear in page links.",
    privacyLink: "Privacy details",
    bankStepHeading: "Which bank is the account with?",
    bankStepBody: "If your bank is one of these, we can skip a question later and check its published policy against the RBI rule at the end.",
    bankStepSkip: "Not sure, or not listed — continue without picking a bank",
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
  verdictPage: {
    generalGuidanceLabel: "General guidance — your eligibility has not been checked.",
    checkSituationFirst: "Check your situation first.",
    askedCheckerHeading: "Were you asked for something that is not on this list?",
    askedCheckerBody: "Tick what the branch actually demanded — a surety, a family tree, an affidavit, witnesses — and we will show you which of them the RBI prescribes for your situation and which it does not, with the paragraph number for each.",
    askedCheckerCta: "Check what you were asked for",
    whenRouteApplies: "When this route applies, a succession certificate is not required.",
    printNote: "Take the printed page to the branch. It carries the rule and its paragraph number.",
    printButton: "Print this page",
    deadlineHeading: (days) => `The bank has ${days} days`,
    deadlineBefore: (paraFifteen, quote) => `Para ${paraFifteen} gives the bank ${quote}. The clock starts when the bank holds a complete set — which is why the date that matters is the date on your acknowledgement, not the day you first walked in.`,
    deadlineDateLabel: "Date on your acknowledgement",
    deadlineClear: "Clear",
    deadlineKeptLocal: "Kept in this browser only. It is never sent anywhere, it is not visible to us, and it will be gone if you clear your browsing data.",
    deadlineDayOfTotal: (day, total) => `Day ${day} of ${total}`,
    deadlineDayUp: (day, total) => `Day ${day} — the ${total} days are up`,
    deadlineWindowClosed: (dateLabel) => `The window closed on ${dateLabel}.`,
    deadlineWindowEnds: (dateLabel) => `The 15 days end on ${dateLabel}.`,
    deadlineWhatNow: "What you can do now",
    deadlineComplaintText: (para15, para33) => `Put the complaint to the branch's Grievance Redressal Officer in writing. Quote para ${para15}, give the date of your acknowledgement, and ask for the settlement and for compensation under para ${para33} — interest at Bank Rate plus 4% per annum where the delay is attributable to the bank, and ₹5,000 for each day of delay on a locker or articles in safe custody.`,
    deadlineOmbudsman: (waitDays, scheme) => `If ${waitDays} days pass after that without a resolution, ${scheme} is free to use at`,
    deadlineOmbudsmanFree: "It is free and it is real, and it is not a guarantee.",
    deadlineExpectDispute: "Expect the bank to argue about when the clock started. Your dated acknowledgement is the answer to that.",
    bankPanelHeading: (bankShort) => `What ${bankShort} itself publishes`,
    bankPanelSub: (bankShort, dateLabel) => `Read from ${bankShort}'s own website, not from us. Checked ${dateLabel}.`,
    bankPanelStaleHeading: "This was checked over six months ago",
    bankPanelStaleBody: "This policy may have changed. Confirm with the bank before relying on it.",
    bankPanelConflictHeading: (bankShort) => `A documented gap between ${bankShort}'s policy and its branch practice`,
    bankGapHeading: (bankShort) => `${bankShort} may ask for more than the RBI rule requires`,
    bankGapSeeDetail: "Full details below, under “More detail.”",
    bankPanelThresholdLabel: (bankShort) => `${bankShort}'s own threshold`,
    bankPanelSuretyLabel: "Third-party surety below it",
    bankPanelSuretyNotRequired: "Says it is not to be insisted on",
    bankPanelSuretyRequired: "Says one is required",
    bankPanelTurnaroundLabel: "Stated turnaround",
    bankPanelFormsLabel: "Claim forms it names",
    bankPanelPageLink: "Its deceased-claim page",
    bankPanelFormLink: "Its claim form",
    bankPanelPolicyLink: "Its published policy",
    bankPanelOnlineLink: "Lodge the claim online",
    bankPanelNoPolicyHeading: (bankShort) => `We could not find ${bankShort}'s published policy`,
    bankPanelNoPolicyBody: (bankShort) => `From 31 March 2026 a bank is required to publish its deceased-claim policy and document checklist. We looked and did not find ${bankShort}'s. That absence is itself worth raising — ask the branch, in writing, for the board-approved policy and the checklist.`,
    bankPanelDifferentBank: "Different bank?",
    bankPanelWholeTable: "the whole table",
    bankPanelFoundOutdated: "Found an outdated bank policy or incorrect information?",
    bankPanelTellUs: "Tell us",
    bankPanelNotVerified: "Not verified — ask your bank",
    bankPickerHeading: "Which bank is the account with?",
    bankPickerBody: "The answer above is the same at every commercial bank — that is what the RBI's Directions do. What changes is the evidence: we will add your bank's own published words to this page, so the officer is reading their employer, not us.",
    bankPickerAnotherBank: "Another bank? The RBI's rule above applies to it just the same. We have only compiled eight so far —",
    bankPickerSeeWhatWeHave: "see what we have and how it was checked",
    counterShorter: "At the counter now? Shorter version",
    yourNextSteps: "Your next steps",
    todayHeading: "What should you do today?",
    readyToProceed: "I'm ready to proceed",
    knowAnswerNow: "I know the answer now",
    todayAction: {
      nomineeOrSurvivorship: "Ask the bank for the deceased-customer claim form, and take the death certificate and your ID.",
      underThreshold: "Ask the bank for its simplified deceased-deposit claim form and confirm the total balance at that bank.",
      unknownNominee: "Ask the bank to confirm in writing whether a nominee or survivorship clause is recorded.",
      outOfScope: "Contact the institution that holds this asset and ask for its deceased-customer claim checklist.",
      default: "Ask the bank for the written claim checklist, its applicable threshold and the documents it will accept.",
    },
    documentsTitle: (n) => `The ${["zero", "one", "two", "three", "four", "five", "six", "seven"][n] ?? n} documents the RBI names`,
    documentsNote: "What to bring, what each one costs and how long it takes. Tick the ones you already have.",
    documentsLede: "Cost and time below are realistic, not best-case. Nothing else on this list is a court document.",
    seeFullChecklist: "See the full checklist and tick what you have",
    whereFrom: "Where from",
    cost: "Cost",
    howLong: "How long",
    noteLabel: "Note.",
    readinessNeed: (n) => `You'll need ${["zero", "one", "two", "three", "four", "five", "six", "seven"][n] ?? n} documents for this claim.`,
    readinessNoLongWait: "None of them has a long wait — tick off what you already have below.",
    readinessStartTodayLongest: (names) => `Start today: ${names} — it takes the longest of anything on this list, and everything else can be done while you wait for it.`,
    readinessHaveAll: (n) => `You have all ${["zero", "one", "two", "three", "four", "five", "six", "seven"][n] ?? n}.`,
    readinessTakeToBranch: "Take them to the branch together and ask for written acknowledgement of the claim on the day you hand them over. The bank has fifteen days from a complete claim.",
    readinessHaveOf: (have, total) => `You have ${have} of ${total}.`,
    readinessStillToGet: (n) => {
      const word = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven"][n] ?? String(n);
      return `${word} still to get.`;
    },
    readinessStartToday: (name) => `Start today: ${name}`,
    readinessLongestWait: " — it has the longest wait of anything you still need",
    readinessLastOne: ", and it is the last one.",
    readinessOtherOneWaits: ", and the other one can be done while you wait for it.",
    readinessOthersWait: (n) => `, and the other ${["zero", "one", "two", "three", "four", "five", "six", "seven"][n] ?? n} can be done while you wait for it.`,
    readinessIsLastNoQueue: (name) => `${name} is the last one, and it has no queue in front of it.`,
    readinessNothingHasQueue: (name) => `Nothing still on your list has a queue in front of it — ${name} and the rest are same-day or already in your hands.`,
    evidenceTitle: "The rule, in the RBI's own words",
    evidenceNote: "The paragraphs to show the bank, quoted exactly, each one linked to the notification.",
    evidenceLede: "Every paragraph number below is in the notification, and the link opens it.",
    paragraphLabel: (para) => `Paragraph ${para}`,
    sourceLabel: (title, para, date) => `Source: ${title}, 2025, paragraph ${para} · Verified: ${date}`,
    inSummaryLabel: "In summary:",
    fromLabel: "From",
    issuedLabel: "issued",
    tacticsTitle: "Four things to do at the branch",
    tacticsNote: "Procedural, not legal. Each one closes a specific way a claim stalls.",
    conditionsForRoute: "Conditions for this route",
    otherImportantNotes: "Other important notes",
    refusedHeading: "If the bank refuses anyway",
    readComplaintEligibility: "Read the RBI's current complaint eligibility and time limits.",
    fullRouteCta: "The full route, plus a written complaint you can fill in",
    sourceLineBrand: "Adhikaar — an independent public-information tool.",
    sourceLineBody: (number, ref, issued) => `Not a government website and not affiliated with the Reserve Bank of India or any bank. Rules quoted from ${number} (${ref}), issued ${issued}, in force from 31 March 2026. Information, not legal advice.`,
    exclusionNote: "Nothing here applies to the Public Provident Fund, the Senior Citizens' Savings Scheme, Mahila Samman Savings Certificate or Sukanya Samriddhi. Paragraph 6(b) places those outside these Directions.",
    answerAgain: "Answer the questions again",
    foundIncorrect: "Found incorrect information? Tell us",
    show: "Show",
    hide: "Hide",
    moreDetailTitle: "More detail",
    moreDetailNote: "The RBI's exact wording, your bank's own policy, procedural tips, the deadline tracker and the escalation route — useful, but not what you need to do first.",
    numberWords: ["zero", "one", "two", "three", "four", "five", "six", "seven"],
    counterModeLabel: "Counter mode",
    seeFullPageInstead: "See the full page instead",
    whatToSay: "What to say",
    whatDocToShow: "What document to show",
    whatBankMayAsk: "What the bank may legally ask for",
    whatToDoIfRefuse: "What to do if they refuse",
    noFixedListGood: "No fixed document list applies to this situation — see the full page for what to ask the branch.",
    noFixedListHard: "There is no closed list here. See the full page for what may genuinely be required and why.",
    counterFooter: "Adhikaar — an independent public-information tool, not affiliated with the RBI or any bank. Information, not legal advice.",
  },
  privacyPage: {
    heading: "Privacy",
    updated: "Claim guide · Updated 5 September 2026",
    linkSectionHeading: "What is in a guide link?",
    linkSectionBody: "Your selections, such as nominee status, amount category, selected bank and checklist ticks, can be included in the URL. They are not account balances or account numbers. The server receives that URL to render the page; browser history and hosting logs may retain it. Share links only with people you trust.",
    deviceSectionHeading: "What stays on your device?",
    deviceSectionBody: "The optional deadline tracker saves its date in your browser's local storage. Clear the tracker or the site's browser data to remove it. Printing and downloading a guide create copies under your control; Adhikaar cannot delete copies you have shared.",
    analyticsSectionHeading: "Usage analytics",
    analyticsSectionBody: "When configured, Mixpanel receives basic events such as a question being answered, the outcome reached, a checklist interaction or a print action. Analytics is configured without persistent browser identifiers, analytics cookies, automatic page views or session recording. It is not a promise that no data reaches a server: network providers can process technical information when handling requests.",
    contactSectionHeading: "Contact and external services",
    contactSectionBody: "If you email us, your email provider and ours process the message and address. Do not send passwords, OTPs, Aadhaar/PAN numbers, bank credentials or personal documents. RBI UDGAM, bank websites and other external services have their own privacy practices; this guide does not search their records or submit claims for you.",
    chatNote: "This notice describes the claim guide. Any separate chat service must explain its own data handling before you send information; do not enter sensitive information in chat.",
    questionsSectionHeading: "Questions",
    contactAdhikaar: "Contact Adhikaar",
    questionsSectionBody: "about privacy or a message you sent us. Hosting, email and external providers may retain technical records under their own policies; we do not promise instant deletion from those systems.",
  },
  bankRefusedPage: {
    heading: "The bank refused. Here is the route that follows.",
    sub: "Four steps, in order, and a written complaint you can fill in and hand over. Escalation is real and it is free — it is not a guarantee, and this page says so plainly rather than promising more than the route delivers.",
    fourSteps: "The four steps",
    step1Title: "Ask for the demand in writing",
    step1Body: "Ask the officer to state, on paper, exactly which document they require and which rule they rely on. Many demands that would not survive being written down are dropped the moment you ask this.",
    step2Title: "Submit a written complaint to the branch",
    step2Body: "Address it to the branch's Grievance Redressal Officer, quoting the paragraph number that applies to your claim. Keep a copy and get it acknowledged with a date — or send it by registered post and keep the receipt.",
    step3Title: "Check the bank's response",
    step4Title: "Escalate through the RBI's Ombudsman route",
    step4Body: (scheme) => `Use the RBI complaint portal if eligible under the ${scheme}. Check its current time limits and exclusions, including matters already before a court or tribunal. Filing a complaint is free and does not guarantee a favourable decision.`,
    escalationHeading: "Escalation is available — it is not a guarantee",
    complaintHeading: "A written complaint you can use",
    complaintSub: "Download the text file and edit it, or print it and fill in the bracketed fields by hand. Every blank is left blank on purpose — we don't know your bank, your account number or the document that was actually demanded, and guessing at any of those would make this less useful, not more.",
    checkSituationInstead: "Check your claim situation instead",
  },
  otherAssetsPage: {
    heading: "Everything else you will have to deal with",
    sub: "Adhikaar covers bank deposits, lockers and safe custody, and nothing else. The rest of an estate runs on separate rails, each with its own regulator and its own form. This page tells you which door to knock on.",
    pointsNotAdvises: "This page points. It does not advise.",
    pointsNotAdvisesBody: "We verified the bank rules line by line against the RBI's own notification. We have not done that on these rails, so you will find no verdict and no checklist here — only the authority, the name of the route, and a link. Anything more would be a guess dressed up as an answer.",
    railsHeading: "Six other rails",
    whoHolds: "Who holds it",
    routeCalled: "What the route is called",
    findingOutHeading: "Finding out what exists",
    findingOutBody: "Both of these are the government's own. They help you find an account or a policy. What to do once you have found one is a different problem — which is the one Adhikaar exists for.",
    linksChecked: (date) => `Links checked ${date}. Naming an authority is not a recommendation, and none of these bodies is connected with Adhikaar.`,
    backToQuestions: "Back to the bank deposit questions",
  },
  askedForPage: {
    heading: "What were you asked for?",
    sub: "Tick everything the branch told you to bring. We will show you which of them the RBI actually prescribes for your situation, and which it does not — with the paragraph number for each.",
    tickHeading: "Tick what the branch demanded",
    tickedRemove: "Ticked. Select to remove.",
    tickedSelect: "Select to tick.",
    comparingAgainst: "Comparing against the list for",
    confirmRouteFirst: "Confirm the claim route first, including any will, court restriction, dispute and applicable bank threshold. Until then, this page cannot judge the bank's document requests for your situation.",
    changeAnswers: "Change your answers",
    answerQuestions: "Answer the questions",
    notGradingHeading: "We are not going to grade this list",
    aboveThresholdBody: "At or above the threshold, para 10(b) allows the bank to require a succession certificate or equivalent, or a legal heir certificate, or an affidavit sworn before an official. There is no closed list to compare your demands against, so calling any of them an overreach would be wrong — and would send you to argue a case you would lose.",
    incompleteBody: "Your eligibility checks are incomplete or need individual review. Confirm the details in the claim guide before comparing the bank's demands against a checklist.",
    whatRbiSaysHeading: "What the RBI's list says about each one",
    notInListHeading: (count) => `${count} not in the RBI's list for your situation`,
    notInListLede: "This does not make the demand illegal. It means the RBI's own Directions do not prescribe it here — which is a reasonable thing to raise, in writing, and ask the officer to name the rule they rely on.",
    notInListTag: "Not in the list",
    inListHeading: (count) => `${count} the RBI does prescribe`,
    inListLede: "These are legitimate. Asking for them is the bank following the rule, not overreaching.",
    inListTag: "In the list",
    printFooterNote: "Takes the paragraph numbers with it, so the officer can check each one.",
    footerCompared: (title, number, issued) => `Compared against ${title} · ${number}, issued ${issued}. Information, not legal advice. Your ticks appear in the page URL, and nothing here identifies you — we count only how many items were checked, never which ones.`,
    countWord: (n) => n === 1 ? "One thing" : `${["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven"][n] ?? n} things`,
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

  stepsCards: {
    step1Label: "चरण 1",
    step1Title: "UDGAM के ज़रिए जमा राशि ढूँढें",
    step1Body: "UDGAM का मतलब है Unclaimed Deposits–Gateway to Access Information। यह RBI का पोर्टल है, जो कई बैंकों में लावारिस जमा राशि खोजने के लिए है। UDGAM आपको जमा राशि ढूँढने में मदद करता है; अधिकार आपको यह समझने में मदद करता है कि उसे कैसे क्लेम करें।",
    step1Cta: "इसे UDGAM पर ढूँढें",
    step2Label: "चरण 2",
    step2Title: "अधिकार के साथ दावे को समझें",
    step2Body: "अपने दावे के बारे में कुछ सरल सवालों के जवाब दें।\nहम लागू होने वाली शर्तें, दस्तावेज़ और अगला कदम दिखाते हैं।",
    step2Cta: "आज ही अपनी दावे की यात्रा शुरू करें",
    step3Label: "चरण 3",
    step3Title: "बैंक से अपना पैसा पाएँ",
    step3Body: "आपको वाक़ई जिन दस्तावेज़ों की ज़रूरत है, उनकी स्पष्ट सूची पाएँ।\nकोई साइन-इन या दस्तावेज़ अपलोड नहीं। गाइड लिंक साझा करने से पहले हमारी गोपनीयता जानकारी पढ़ें।",
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
    somethingElse: "अन्य स्थितियाँ",
    noneOfThese: "इनमें से कोई नहीं — इसके बजाय कुछ छोटे सवालों के जवाब दें",
    questionOf: (current, total) => `${total} में से चरण ${current}`,
    backAQuestion: "एक सवाल पीछे",
    backToStart: "शुरुआत पर वापस",
    privacyNote: "कोई खाता या दस्तावेज़ अपलोड नहीं। जवाब पेज के लिंक में दिखते हैं।",
    privacyLink: "गोपनीयता विवरण",
    timeEstimate: "इसमें लगभग 2–3 मिनट लगते हैं। शुरू करने के लिए दस्तावेज़ या सटीक जानकारी ज़रूरी नहीं है।",
    bankStepHeading: "खाता किस बैंक में है?",
    bankStepBody: "अगर आपका बैंक इनमें से एक है, तो हम बाद का एक सवाल छोड़ सकते हैं और आख़िर में उस बैंक की प्रकाशित नीति को RBI के नियम से जाँच सकते हैं।",
    bankStepSkip: "पता नहीं, या सूची में नहीं है — बैंक चुने बिना आगे बढ़ें",
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
  verdictPage: {
    generalGuidanceLabel: "सामान्य मार्गदर्शन — आपकी पात्रता की जाँच अभी नहीं हुई है।",
    checkSituationFirst: "पहले अपनी स्थिति जाँचें।",
    askedCheckerHeading: "क्या आपसे कुछ ऐसा माँगा गया जो इस सूची में नहीं है?",
    askedCheckerBody: "शाखा ने वाक़ई क्या-क्या माँगा टिक करें — ज़मानत, परिवार-वृक्ष, शपथ-पत्र, गवाह — और हम दिखाएँगे कि इनमें से RBI आपकी स्थिति के लिए क्या तय करता है और क्या नहीं, हर एक के पैराग्राफ नंबर सहित।",
    askedCheckerCta: "आपसे क्या माँगा गया, जाँचें",
    whenRouteApplies: "जहाँ यह रास्ता लागू होता है, वहाँ उत्तराधिकार प्रमाणपत्र ज़रूरी नहीं है।",
    printNote: "छपा हुआ पन्ना शाखा में ले जाएँ। इसमें नियम और उसका पैराग्राफ नंबर दोनों हैं।",
    printButton: "यह पन्ना छापें",
    deadlineHeading: (days) => `बैंक के पास ${days} दिन हैं`,
    deadlineBefore: (paraFifteen, quote) => `पैरा ${paraFifteen} बैंक को ${quote} देता है। घड़ी तभी शुरू होती है जब बैंक के पास पूरा सेट हो — इसीलिए ज़रूरी तारीख़ आपकी पावती की तारीख़ है, न कि जिस दिन आप पहली बार गए थे।`,
    deadlineDateLabel: "आपकी पावती की तारीख़",
    deadlineClear: "हटाएँ",
    deadlineKeptLocal: "यह सिर्फ़ इस ब्राउज़र में रखी जाती है। यह कहीं नहीं भेजी जाती, हमें दिखाई नहीं देती, और आपके ब्राउज़िंग डेटा साफ़ करने पर खो जाएगी।",
    deadlineDayOfTotal: (day, total) => `दिन ${day} में से ${total}`,
    deadlineDayUp: (day, total) => `दिन ${day} — ${total} दिन पूरे हो गए हैं`,
    deadlineWindowClosed: (dateLabel) => `समय-सीमा ${dateLabel} को समाप्त हो गई।`,
    deadlineWindowEnds: (dateLabel) => `15 दिन ${dateLabel} को समाप्त होते हैं।`,
    deadlineWhatNow: "अभी आप क्या कर सकते हैं",
    deadlineComplaintText: (para15, para33) => `शाखा के शिकायत निवारण अधिकारी को लिखित शिकायत दें। पैरा ${para15} का हवाला दें, अपनी पावती की तारीख़ बताएँ, और भुगतान के साथ पैरा ${para33} के तहत मुआवज़ा माँगें — जहाँ देरी बैंक की वजह से है वहाँ बैंक दर + 4% प्रति वर्ष ब्याज, और लॉकर या सुरक्षित अभिरक्षा में देरी के हर दिन के लिए ₹5,000।`,
    deadlineOmbudsman: (waitDays, scheme) => `अगर उसके बाद ${waitDays} दिन बिना समाधान के बीत जाएँ, तो ${scheme} मुफ़्त इस्तेमाल के लिए उपलब्ध है`,
    deadlineOmbudsmanFree: "यह मुफ़्त और वास्तविक है, लेकिन गारंटी नहीं है।",
    deadlineExpectDispute: "उम्मीद रखें कि बैंक घड़ी कब शुरू हुई इस पर बहस करेगा। आपकी तारीख़ वाली पावती इसी का जवाब है।",
    bankPanelHeading: (bankShort) => `${bankShort} खुद क्या प्रकाशित करता है`,
    bankPanelSub: (bankShort, dateLabel) => `${bankShort} की अपनी वेबसाइट से पढ़ा गया, हमसे नहीं। जाँचा गया ${dateLabel}.`,
    bankPanelStaleHeading: "यह छह महीने से ज़्यादा पहले जाँचा गया था",
    bankPanelStaleBody: "यह नीति बदल गई हो सकती है। इस पर भरोसा करने से पहले बैंक से पुष्टि करें।",
    bankPanelConflictHeading: (bankShort) => `${bankShort} की नीति और उसकी शाखा व्यवहार के बीच एक दर्ज अंतर`,
    bankGapHeading: (bankShort) => `${bankShort} RBI के नियम से ज़्यादा मांग सकता है`,
    bankGapSeeDetail: "पूरी जानकारी नीचे “और विवरण” में।",
    bankPanelThresholdLabel: (bankShort) => `${bankShort} की अपनी सीमा`,
    bankPanelSuretyLabel: "उससे नीचे तीसरे पक्ष की ज़मानत",
    bankPanelSuretyNotRequired: "कहता है कि इस पर ज़ोर नहीं दिया जाना चाहिए",
    bankPanelSuretyRequired: "कहता है कि एक चाहिए",
    bankPanelTurnaroundLabel: "बताया गया समय",
    bankPanelFormsLabel: "जिन दावा फ़ॉर्मों का नाम लेता है",
    bankPanelPageLink: "इसका दिवंगत-दावा पन्ना",
    bankPanelFormLink: "इसका दावा फ़ॉर्म",
    bankPanelPolicyLink: "इसकी प्रकाशित नीति",
    bankPanelOnlineLink: "ऑनलाइन दावा दर्ज करें",
    bankPanelNoPolicyHeading: (bankShort) => `हमें ${bankShort} की प्रकाशित नीति नहीं मिली`,
    bankPanelNoPolicyBody: (bankShort) => `31 मार्च 2026 से हर बैंक को अपनी दिवंगत-दावा नीति और दस्तावेज़ सूची प्रकाशित करनी ज़रूरी है। हमने खोजा और ${bankShort} की नहीं मिली। यह कमी भी ज़िक्र लायक है — शाखा से लिखित में बोर्ड-अनुमोदित नीति और सूची माँगें।`,
    bankPanelDifferentBank: "अलग बैंक?",
    bankPanelWholeTable: "पूरी तालिका",
    bankPanelFoundOutdated: "कोई पुरानी बैंक नीति या ग़लत जानकारी मिली?",
    bankPanelTellUs: "हमें बताएँ",
    bankPanelNotVerified: "सत्यापित नहीं — अपने बैंक से पूछें",
    bankPickerHeading: "खाता किस बैंक में है?",
    bankPickerBody: "ऊपर दिया जवाब हर वाणिज्यिक बैंक में एक जैसा है — यही RBI के निर्देश करते हैं। जो बदलता है वह है सबूत: हम आपके बैंक के अपने प्रकाशित शब्द इस पन्ने में जोड़ेंगे, ताकि अधिकारी हमें नहीं, अपने नियोक्ता को पढ़ रहा हो।",
    bankPickerAnotherBank: "कोई अलग बैंक? ऊपर का RBI नियम उस पर भी वैसे ही लागू होता है। हमने अभी तक सिर्फ़ आठ जोड़े हैं —",
    bankPickerSeeWhatWeHave: "देखें हमारे पास क्या है और कैसे जाँचा गया",
    counterShorter: "अभी काउंटर पर हैं? छोटा संस्करण",
    yourNextSteps: "आपके अगले कदम",
    todayHeading: "आज आपको क्या करना चाहिए?",
    readyToProceed: "मैं आगे बढ़ने के लिए तैयार हूँ",
    knowAnswerNow: "अब मुझे जवाब पता है",
    todayAction: {
      nomineeOrSurvivorship: "बैंक से दिवंगत-ग्राहक दावा फ़ॉर्म माँगें, और मृत्यु प्रमाणपत्र व अपना पहचान पत्र साथ ले जाएँ।",
      underThreshold: "बैंक से उसका सरलीकृत दिवंगत-जमा दावा फ़ॉर्म माँगें और उस बैंक में कुल शेष राशि की पुष्टि करें।",
      unknownNominee: "बैंक से लिखित में पुष्टि माँगें कि क्या कोई नामांकित व्यक्ति या उत्तरजीविता शर्त दर्ज है।",
      outOfScope: "इस संपत्ति को रखने वाली संस्था से संपर्क करें और उसकी दिवंगत-ग्राहक दावा सूची माँगें।",
      default: "बैंक से लिखित दावा सूची, उसकी लागू सीमा और वे कौन-से दस्तावेज़ स्वीकार करेंगे, माँगें।",
    },
    documentsTitle: (n) => `RBI द्वारा बताए गए ${["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात"][n] ?? n} दस्तावेज़`,
    documentsNote: "क्या लाना है, हर एक की लागत क्या है और कितना समय लगता है। जो आपके पास पहले से हैं उन्हें टिक करें।",
    documentsLede: "नीचे लागत और समय व्यावहारिक हैं, सबसे-अच्छी-स्थिति वाले नहीं। इस सूची में और कुछ भी अदालती दस्तावेज़ नहीं है।",
    seeFullChecklist: "पूरी सूची देखें और जो आपके पास है उसे टिक करें",
    whereFrom: "कहाँ से मिलेगा",
    cost: "लागत",
    howLong: "कितना समय",
    noteLabel: "नोट।",
    readinessNeed: (n) => `इस दावे के लिए आपको ${["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात"][n] ?? n} दस्तावेज़ चाहिए होंगे।`,
    readinessNoLongWait: "इनमें से किसी में लंबा इंतज़ार नहीं है — नीचे जो आपके पास पहले से है उसे टिक करें।",
    readinessStartTodayLongest: (names) => `आज शुरू करें: ${names} — इस सूची में सबसे ज़्यादा समय यही लेता है, और बाक़ी सब इसका इंतज़ार करते हुए किया जा सकता है।`,
    readinessHaveAll: (n) => `आपके पास सभी ${["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात"][n] ?? n} हैं।`,
    readinessTakeToBranch: "इन्हें साथ लेकर शाखा जाएँ और जिस दिन जमा करें उसी दिन दावे की लिखित पावती माँगें। पूरे दावे के बाद बैंक के पास पंद्रह दिन हैं।",
    readinessHaveOf: (have, total) => `आपके पास ${total} में से ${have} हैं।`,
    readinessStillToGet: (n) => {
      const word = ["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात"][n] ?? String(n);
      return `अभी ${word} लेने बाक़ी हैं।`;
    },
    readinessStartToday: (name) => `आज शुरू करें: ${name}`,
    readinessLongestWait: " — अभी आपको जो भी चाहिए, उनमें सबसे लंबा इंतज़ार इसी में है",
    readinessLastOne: ", और यही आख़िरी है।",
    readinessOtherOneWaits: ", और दूसरा एक इसका इंतज़ार करते हुए किया जा सकता है।",
    readinessOthersWait: (n) => `, और बाक़ी ${["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात"][n] ?? n} इसका इंतज़ार करते हुए किए जा सकते हैं।`,
    readinessIsLastNoQueue: (name) => `${name} आख़िरी है, और इसके आगे कोई इंतज़ार नहीं है।`,
    readinessNothingHasQueue: (name) => `आपकी सूची में अब कुछ भी ऐसा नहीं जिसमें इंतज़ार हो — ${name} और बाक़ी सब उसी दिन मिल जाते हैं या पहले से आपके पास हैं।`,
    evidenceTitle: "नियम, RBI के अपने शब्दों में",
    evidenceNote: "बैंक को दिखाने वाले पैराग्राफ, ठीक वैसे ही उद्धृत जैसे हैं, हर एक अधिसूचना से जुड़ा हुआ।",
    evidenceLede: "नीचे हर पैराग्राफ नंबर अधिसूचना में है, और लिंक उसे खोलता है।",
    paragraphLabel: (para) => `पैराग्राफ ${para}`,
    sourceLabel: (title, para, date) => `स्रोत: ${title}, 2025, पैराग्राफ ${para} · सत्यापित: ${date}`,
    inSummaryLabel: "सार में:",
    fromLabel: "स्रोत",
    issuedLabel: "जारी",
    tacticsTitle: "शाखा में करने योग्य चार बातें",
    tacticsNote: "प्रक्रियागत, क़ानूनी नहीं। हर एक दावे के अटकने का एक ख़ास तरीक़ा बंद करता है।",
    conditionsForRoute: "इस रास्ते की शर्तें",
    otherImportantNotes: "अन्य महत्वपूर्ण बातें",
    refusedHeading: "अगर बैंक फिर भी मना करे",
    readComplaintEligibility: "RBI की मौजूदा शिकायत पात्रता और समय-सीमा पढ़ें।",
    fullRouteCta: "पूरा रास्ता, साथ में भरने के लिए एक लिखित शिकायत",
    sourceLineBrand: "अधिकार — एक स्वतंत्र सार्वजनिक-जानकारी उपकरण।",
    sourceLineBody: (number, ref, issued) => `यह कोई सरकारी वेबसाइट नहीं है और भारतीय रिज़र्व बैंक या किसी भी बैंक से संबद्ध नहीं है। नियम ${number} (${ref}) से उद्धृत, जारी ${issued}, 31 मार्च 2026 से लागू। जानकारी, क़ानूनी सलाह नहीं।`,
    exclusionNote: "यहाँ कुछ भी पब्लिक प्रॉविडेंट फंड, वरिष्ठ नागरिक बचत योजना, महिला सम्मान बचत प्रमाणपत्र या सुकन्या समृद्धि पर लागू नहीं होता। पैराग्राफ 6(b) इन्हें इन निर्देशों के दायरे से बाहर रखता है।",
    answerAgain: "सवालों के जवाब फिर से दें",
    foundIncorrect: "कोई ग़लत जानकारी मिली? हमें बताएँ",
    show: "दिखाएँ",
    hide: "छिपाएँ",
    numberWords: ["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात"],
    moreDetailTitle: "और विवरण",
    moreDetailNote: "बैंक को दिखाने वाला सबूत, बैंक का अपना पन्ना, आगे की कार्रवाई का रास्ता और बाक़ी शर्तें — सब यहीं हैं, बस मोड़ी हुई हैं ताकि पन्ना अभी क्या करना है, उस पर खुले।",
    counterModeLabel: "काउंटर मोड",
    seeFullPageInstead: "इसके बजाय पूरा पन्ना देखें",
    whatToSay: "क्या कहना है",
    whatDocToShow: "कौन-सा दस्तावेज़ दिखाना है",
    whatBankMayAsk: "बैंक क़ानूनी रूप से क्या माँग सकता है",
    whatToDoIfRefuse: "अगर वे मना करें तो क्या करें",
    noFixedListGood: "इस स्थिति पर कोई तय दस्तावेज़ सूची लागू नहीं होती — शाखा से क्या पूछें, इसके लिए पूरा पन्ना देखें।",
    noFixedListHard: "यहाँ कोई बंद सूची नहीं है। वाक़ई क्या ज़रूरी हो सकता है और क्यों, इसके लिए पूरा पन्ना देखें।",
    counterFooter: "अधिकार — एक स्वतंत्र सार्वजनिक-जानकारी उपकरण, RBI या किसी बैंक से संबद्ध नहीं। जानकारी, क़ानूनी सलाह नहीं।",
  },
  privacyPage: {
    heading: "गोपनीयता",
    updated: "क्लेम गाइड · अपडेट किया गया 5 सितंबर 2026",
    linkSectionHeading: "गाइड लिंक में क्या होता है?",
    linkSectionBody: "आपके चुनाव, जैसे नामांकित स्थिति, राशि श्रेणी, चुना गया बैंक और सूची की टिक, URL में शामिल हो सकते हैं। ये खाते की शेष राशि या खाता नंबर नहीं हैं। पन्ना दिखाने के लिए सर्वर उस URL को प्राप्त करता है; ब्राउज़र इतिहास और होस्टिंग लॉग इसे रख सकते हैं। लिंक सिर्फ़ उन्हीं लोगों के साथ साझा करें जिन पर आप भरोसा करते हैं।",
    deviceSectionHeading: "आपके डिवाइस पर क्या रहता है?",
    deviceSectionBody: "वैकल्पिक डेडलाइन ट्रैकर अपनी तारीख़ आपके ब्राउज़र के लोकल स्टोरेज में सहेजता है। इसे हटाने के लिए ट्रैकर या साइट का ब्राउज़र डेटा साफ़ करें। गाइड छापने और डाउनलोड करने से आपके नियंत्रण में प्रतियाँ बनती हैं; आपने साझा की गई प्रतियों को अधिकार मिटा नहीं सकता।",
    analyticsSectionHeading: "उपयोग विश्लेषण",
    analyticsSectionBody: "कॉन्फ़िगर होने पर, Mixpanel को कुछ बुनियादी घटनाएँ मिलती हैं जैसे किसी सवाल का जवाब देना, पहुँचा गया नतीजा, सूची से जुड़ी कार्रवाई या प्रिंट करना। विश्लेषण स्थायी ब्राउज़र पहचानकर्ताओं, विश्लेषण कुकीज़, स्वचालित पेज-व्यू या सेशन रिकॉर्डिंग के बिना कॉन्फ़िगर किया गया है। यह वादा नहीं कि कोई डेटा सर्वर तक नहीं पहुँचता: अनुरोध संभालते समय नेटवर्क प्रदाता तकनीकी जानकारी संसाधित कर सकते हैं।",
    contactSectionHeading: "संपर्क और बाहरी सेवाएँ",
    contactSectionBody: "अगर आप हमें ईमेल करते हैं, तो आपका और हमारा ईमेल प्रदाता संदेश और पता संसाधित करता है। पासवर्ड, OTP, आधार/पैन नंबर, बैंक क्रेडेंशियल या व्यक्तिगत दस्तावेज़ न भेजें। RBI UDGAM, बैंक वेबसाइट और अन्य बाहरी सेवाओं की अपनी गोपनीयता प्रथाएँ हैं; यह गाइड उनके रिकॉर्ड नहीं खोजती या आपकी ओर से दावा दर्ज नहीं करती।",
    chatNote: "यह सूचना क्लेम गाइड के बारे में है। कोई भी अलग चैट सेवा जानकारी भेजने से पहले अपनी डेटा हैंडलिंग समझाए; चैट में संवेदनशील जानकारी न डालें।",
    questionsSectionHeading: "सवाल",
    contactAdhikaar: "अधिकार से संपर्क करें",
    questionsSectionBody: "गोपनीयता या आपके भेजे किसी संदेश के बारे में। होस्टिंग, ईमेल और बाहरी प्रदाता अपनी नीतियों के तहत तकनीकी रिकॉर्ड रख सकते हैं; हम उन प्रणालियों से तुरंत हटाने का वादा नहीं करते।",
  },
  bankRefusedPage: {
    heading: "बैंक ने मना कर दिया। यह रहा आगे का रास्ता।",
    sub: "चार कदम, क्रम में, और एक लिखित शिकायत जिसे आप भरकर सौंप सकते हैं। आगे की कार्रवाई वास्तविक और मुफ़्त है — यह गारंटी नहीं है, और यह पन्ना उतना ही वादा करता है जितना यह रास्ता वाक़ई देता है, ज़्यादा नहीं।",
    fourSteps: "चार कदम",
    step1Title: "माँग लिखित में देने को कहें",
    step1Body: "अधिकारी से कहें कि वे कागज़ पर बिल्कुल बताएँ कि उन्हें कौन-सा दस्तावेज़ चाहिए और वे किस नियम पर भरोसा कर रहे हैं। कई माँगें, जो लिखित में टिकतीं नहीं, आपके यह पूछते ही छोड़ दी जाती हैं।",
    step2Title: "शाखा को लिखित शिकायत दें",
    step2Body: "इसे शाखा के शिकायत निवारण अधिकारी को संबोधित करें, अपने दावे पर लागू पैराग्राफ नंबर का हवाला देते हुए। एक प्रति रखें और उसे तारीख़ सहित स्वीकृत करवाएँ — या रजिस्टर्ड डाक से भेजें और रसीद रखें।",
    step3Title: "बैंक के जवाब की जाँच करें",
    step4Title: "RBI के लोकपाल रास्ते से आगे बढ़ें",
    step4Body: (scheme) => `अगर ${scheme} के तहत पात्र हों, तो RBI शिकायत पोर्टल का उपयोग करें। इसकी मौजूदा समय-सीमा और अपवाद जाँचें, जिसमें वे मामले भी शामिल हैं जो पहले से किसी अदालत या न्यायाधिकरण के सामने हैं। शिकायत दर्ज करना मुफ़्त है और अनुकूल फ़ैसले की गारंटी नहीं देता।`,
    escalationHeading: "आगे की कार्रवाई उपलब्ध है — यह गारंटी नहीं है",
    complaintHeading: "इस्तेमाल के लिए एक लिखित शिकायत",
    complaintSub: "टेक्स्ट फ़ाइल डाउनलोड करके संपादित करें, या छापकर कोष्ठक वाले खानों को हाथ से भरें। हर खाली जगह जानबूझकर खाली छोड़ी गई है — हमें आपका बैंक, आपका खाता नंबर या असल में माँगा गया दस्तावेज़ पता नहीं, और इनमें से किसी का अनुमान लगाना इसे कम, ज़्यादा नहीं, उपयोगी बनाएगा।",
    checkSituationInstead: "इसके बजाय अपनी दावे की स्थिति जाँचें",
  },
  otherAssetsPage: {
    heading: "बाक़ी सब कुछ जिससे आपको निपटना होगा",
    sub: "अधिकार बैंक जमा, लॉकर और सुरक्षित अभिरक्षा को कवर करता है, और कुछ नहीं। संपत्ति का बाक़ी हिस्सा अलग रास्तों पर चलता है, हर एक का अपना नियामक और अपना फ़ॉर्म है। यह पन्ना बताता है कि किस दरवाज़े पर दस्तक दें।",
    pointsNotAdvises: "यह पन्ना दिशा बताता है। यह सलाह नहीं देता।",
    pointsNotAdvisesBody: "हमने बैंक नियमों को RBI की अपनी अधिसूचना के विरुद्ध पंक्ति दर पंक्ति जाँचा। इन रास्तों पर हमने वह नहीं किया, इसलिए यहाँ कोई फ़ैसला और कोई सूची नहीं मिलेगी — सिर्फ़ प्राधिकरण, रास्ते का नाम, और एक लिंक। इससे ज़्यादा कुछ भी जवाब की तरह सजाया गया अनुमान होगा।",
    railsHeading: "छह अन्य रास्ते",
    whoHolds: "इसे कौन रखता है",
    routeCalled: "रास्ते का नाम क्या है",
    findingOutHeading: "यह पता लगाना कि क्या मौजूद है",
    findingOutBody: "ये दोनों ही सरकार के अपने हैं। ये आपको खाता या पॉलिसी ढूँढने में मदद करते हैं। मिलने के बाद क्या करना है, यह अलग समस्या है — जिसके लिए अधिकार बना है।",
    linksChecked: (date) => `लिंक ${date} को जाँचे गए। किसी प्राधिकरण का नाम लेना सिफ़ारिश नहीं है, और इनमें से कोई भी संस्था अधिकार से जुड़ी नहीं है।`,
    backToQuestions: "बैंक जमा वाले सवालों पर वापस जाएँ",
  },
  askedForPage: {
    heading: "आपसे क्या माँगा गया था?",
    sub: "शाखा ने आपको जो कुछ लाने को कहा, उसे टिक करें। हम दिखाएँगे कि इनमें से RBI आपकी स्थिति के लिए वाक़ई क्या तय करता है, और क्या नहीं — हर एक के पैराग्राफ नंबर सहित।",
    tickHeading: "शाखा ने क्या माँगा, टिक करें",
    tickedRemove: "टिक किया गया। हटाने के लिए चुनें।",
    tickedSelect: "टिक करने के लिए चुनें।",
    comparingAgainst: "इसकी सूची से तुलना कर रहे हैं",
    confirmRouteFirst: "पहले दावे का रास्ता तय करें, जिसमें कोई वसीयत, न्यायालयीन रोक, विवाद और लागू बैंक सीमा शामिल है। तब तक, यह पन्ना आपकी स्थिति के लिए बैंक की दस्तावेज़ माँगों का आकलन नहीं कर सकता।",
    changeAnswers: "अपने जवाब बदलें",
    answerQuestions: "सवालों के जवाब दें",
    notGradingHeading: "हम इस सूची को आँकने नहीं जा रहे",
    aboveThresholdBody: "सीमा पर या उससे ऊपर, पैरा 10(b) बैंक को उत्तराधिकार प्रमाणपत्र या समकक्ष, या क़ानूनी उत्तराधिकारी प्रमाणपत्र, या किसी अधिकारी के सामने ली गई शपथ माँगने की अनुमति देता है। आपकी माँगों की तुलना करने के लिए कोई बंद सूची नहीं है, इसलिए इनमें से किसी को भी ज़्यादती कहना ग़लत होगा — और आपको एक ऐसा मामला लड़ने भेजेगा जिसे आप हार जाएँगे।",
    incompleteBody: "आपकी पात्रता जाँच अधूरी है या अलग समीक्षा चाहती है। बैंक की माँगों की सूची से तुलना करने से पहले क्लेम गाइड में विवरण की पुष्टि करें।",
    whatRbiSaysHeading: "RBI की सूची हर एक के बारे में क्या कहती है",
    notInListHeading: (count) => `${count} आपकी स्थिति के लिए RBI की सूची में नहीं`,
    notInListLede: "इससे माँग ग़ैर-क़ानूनी नहीं बन जाती। इसका मतलब है कि RBI के अपने निर्देश इसे यहाँ तय नहीं करते — जो लिखित में उठाने और अधिकारी से यह नाम बताने को कहने लायक बात है कि वे किस नियम पर भरोसा कर रहे हैं।",
    notInListTag: "सूची में नहीं",
    inListHeading: (count) => `${count} जो RBI वाक़ई तय करता है`,
    inListLede: "ये वैध हैं। इन्हें माँगना बैंक का नियम मानना है, ज़्यादती नहीं।",
    inListTag: "सूची में",
    printFooterNote: "पैराग्राफ नंबर भी साथ ले जाता है, ताकि अधिकारी हर एक जाँच सके।",
    footerCompared: (title, number, issued) => `${title} · ${number} से तुलना की गई, जारी ${issued}। जानकारी, क़ानूनी सलाह नहीं। आपकी टिक पेज URL में दिखती हैं, और यहाँ कुछ भी आपकी पहचान नहीं बताता — हम सिर्फ़ यह गिनते हैं कि कितनी चीज़ें जाँची गईं, कौन-सी नहीं।`,
    countWord: (n) => n === 1 ? "एक चीज़" : `${["", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ", "दस", "ग्यारह"][n] ?? n} चीज़ें`,
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

  stepsCards: {
    step1Label: "ಹಂತ 1",
    step1Title: "UDGAM ಮೂಲಕ ಠೇವಣಿಯನ್ನು ಹುಡುಕಿ",
    step1Body: "UDGAM ಎಂದರೆ Unclaimed Deposits–Gateway to Access Information. ಇದು ಅನೇಕ ಬ್ಯಾಂಕುಗಳಾದ್ಯಂತ ಹಕ್ಕು ಪಡೆಯದ ಠೇವಣಿಗಳನ್ನು ಹುಡುಕಲು RBI ಯ ಪೋರ್ಟಲ್. UDGAM ನಿಮಗೆ ಠೇವಣಿ ಹುಡುಕಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ; ಅಧಿಕಾರ್ ಅದನ್ನು ಹೇಗೆ ಪಡೆಯುವುದು ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    step1Cta: "ಇದನ್ನು UDGAM ನಲ್ಲಿ ಹುಡುಕಿ",
    step2Label: "ಹಂತ 2",
    step2Title: "ಅಧಿಕಾರ್‌ನೊಂದಿಗೆ ಹಕ್ಕನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    step2Body: "ನಿಮ್ಮ ಹಕ್ಕಿನ ಬಗ್ಗೆ ಕೆಲವು ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.\nಅನ್ವಯಿಸುವ ಷರತ್ತುಗಳು, ದಾಖಲೆಗಳು ಮತ್ತು ಮುಂದಿನ ಹೆಜ್ಜೆಯನ್ನು ನಾವು ತೋರಿಸುತ್ತೇವೆ.",
    step2Cta: "ಇಂದೇ ನಿಮ್ಮ ಹಕ್ಕಿನ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
    step3Label: "ಹಂತ 3",
    step3Title: "ಬ್ಯಾಂಕಿನಿಂದ ನಿಮ್ಮ ಹಣ ಪಡೆಯಿರಿ",
    step3Body: "ನಿಮಗೆ ನಿಜವಾಗಿಯೂ ಬೇಕಾದ ದಾಖಲೆಗಳ ಸ್ಪಷ್ಟ ಪಟ್ಟಿಯನ್ನು ಪಡೆಯಿರಿ.\nಯಾವುದೇ ಸೈನ್-ಇನ್ ಅಥವಾ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಇಲ್ಲ. ಗೈಡ್ ಲಿಂಕ್ ಹಂಚಿಕೊಳ್ಳುವ ಮೊದಲು ನಮ್ಮ ಗೌಪ್ಯತೆ ವಿವರಗಳನ್ನು ಓದಿ.",
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
    somethingElse: "ಇತರ ಸಂದರ್ಭಗಳು",
    noneOfThese: "ಇವುಗಳಲ್ಲಿ ಯಾವುದೂ ಇಲ್ಲ — ಬದಲಿಗೆ ಕೆಲವು ಸಣ್ಣ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ",
    questionOf: (current, total) => `${total} ರಲ್ಲಿ ಹಂತ ${current}`,
    backAQuestion: "ಒಂದು ಪ್ರಶ್ನೆ ಹಿಂದೆ",
    backToStart: "ಪ್ರಾರಂಭಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    privacyNote: "ಯಾವುದೇ ಖಾತೆ ಅಥವಾ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಇಲ್ಲ. ಉತ್ತರಗಳು ಪುಟದ ಲಿಂಕ್‌ಗಳಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
    privacyLink: "ಗೌಪ್ಯತೆ ವಿವರಗಳು",
    timeEstimate: "ಇದಕ್ಕೆ ಸುಮಾರು 2–3 ನಿಮಿಷಗಳು ಬೇಕಾಗುತ್ತವೆ. ಪ್ರಾರಂಭಿಸಲು ದಾಖಲೆಗಳು ಅಥವಾ ನಿಖರ ಮಾಹಿತಿ ಅಗತ್ಯವಿಲ್ಲ.",
    bankStepHeading: "ಖಾತೆ ಯಾವ ಬ್ಯಾಂಕಿನಲ್ಲಿದೆ?",
    bankStepBody: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಇವುಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದರೆ, ನಾವು ನಂತರದ ಒಂದು ಪ್ರಶ್ನೆಯನ್ನು ಬಿಟ್ಟುಬಿಡಬಹುದು ಮತ್ತು ಕೊನೆಯಲ್ಲಿ ಆ ಬ್ಯಾಂಕಿನ ಪ್ರಕಟಿತ ನೀತಿಯನ್ನು RBI ನಿಯಮದ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸಬಹುದು.",
    bankStepSkip: "ಗೊತ್ತಿಲ್ಲ, ಅಥವಾ ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲ — ಬ್ಯಾಂಕ್ ಆಯ್ಕೆ ಮಾಡದೆ ಮುಂದುವರಿಸಿ",
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
  verdictPage: {
    generalGuidanceLabel: "ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನ — ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಇನ್ನೂ ಪರಿಶೀಲಿಸಲಾಗಿಲ್ಲ.",
    checkSituationFirst: "ಮೊದಲು ನಿಮ್ಮ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    askedCheckerHeading: "ಈ ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲದ ಏನನ್ನಾದರೂ ನಿಮ್ಮಿಂದ ಕೇಳಲಾಗಿತ್ತೇ?",
    askedCheckerBody: "ಶಾಖೆ ನಿಜವಾಗಿಯೂ ಏನು ಕೇಳಿತು ಎಂದು ಟಿಕ್ ಮಾಡಿ — ಜಾಮೀನು, ಕುಟುಂಬ ವೃಕ್ಷ, ಅಫಿಡವಿಟ್, ಸಾಕ್ಷಿಗಳು — ಮತ್ತು ಇವುಗಳಲ್ಲಿ RBI ನಿಮ್ಮ ಸ್ಥಿತಿಗೆ ಯಾವುದನ್ನು ನಿಗದಿಪಡಿಸುತ್ತದೆ ಮತ್ತು ಯಾವುದನ್ನು ಇಲ್ಲ ಎಂದು ನಾವು ತೋರಿಸುತ್ತೇವೆ, ಪ್ರತಿಯೊಂದಕ್ಕೂ ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ.",
    askedCheckerCta: "ನಿಮ್ಮಿಂದ ಏನು ಕೇಳಲಾಗಿತ್ತು ಎಂದು ಪರಿಶೀಲಿಸಿ",
    whenRouteApplies: "ಈ ಮಾರ್ಗ ಅನ್ವಯಿಸುವಲ್ಲಿ, ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಅಗತ್ಯವಿಲ್ಲ.",
    printNote: "ಮುದ್ರಿತ ಪುಟವನ್ನು ಶಾಖೆಗೆ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ. ಇದು ನಿಯಮ ಮತ್ತು ಅದರ ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆಯನ್ನು ಹೊಂದಿದೆ.",
    printButton: "ಈ ಪುಟವನ್ನು ಮುದ್ರಿಸಿ",
    deadlineHeading: (days) => `ಬ್ಯಾಂಕಿಗೆ ${days} ದಿನಗಳಿವೆ`,
    deadlineBefore: (paraFifteen, quote) => `ಪ್ಯಾರಾ ${paraFifteen} ಬ್ಯಾಂಕಿಗೆ ${quote} ನೀಡುತ್ತದೆ. ಬ್ಯಾಂಕಿನ ಬಳಿ ಪೂರ್ಣ ಸೆಟ್ ಇದ್ದಾಗ ಮಾತ್ರ ಗಡಿಯಾರ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ — ಅದಕ್ಕಾಗಿಯೇ ಮುಖ್ಯವಾದ ದಿನಾಂಕ ನಿಮ್ಮ ಸ್ವೀಕೃತಿಯ ದಿನಾಂಕ, ನೀವು ಮೊದಲು ಹೋದ ದಿನವಲ್ಲ.`,
    deadlineDateLabel: "ನಿಮ್ಮ ಸ್ವೀಕೃತಿಯ ಮೇಲಿನ ದಿನಾಂಕ",
    deadlineClear: "ತೆರವುಗೊಳಿಸಿ",
    deadlineKeptLocal: "ಇದನ್ನು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಇಡಲಾಗಿದೆ. ಇದನ್ನು ಎಲ್ಲಿಗೂ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ, ನಮಗೆ ಕಾಣಿಸುವುದಿಲ್ಲ, ಮತ್ತು ನಿಮ್ಮ ಬ್ರೌಸಿಂಗ್ ಡೇಟಾ ತೆರವುಗೊಳಿಸಿದರೆ ಇದು ಹೋಗುತ್ತದೆ.",
    deadlineDayOfTotal: (day, total) => `ದಿನ ${day} ರಲ್ಲಿ ${total}`,
    deadlineDayUp: (day, total) => `ದಿನ ${day} — ${total} ದಿನಗಳು ಮುಗಿದಿವೆ`,
    deadlineWindowClosed: (dateLabel) => `ಗಡುವು ${dateLabel} ರಂದು ಮುಗಿಯಿತು.`,
    deadlineWindowEnds: (dateLabel) => `15 ದಿನಗಳು ${dateLabel} ರಂದು ಮುಗಿಯುತ್ತವೆ.`,
    deadlineWhatNow: "ಈಗ ನೀವು ಏನು ಮಾಡಬಹುದು",
    deadlineComplaintText: (para15, para33) => `ಶಾಖೆಯ ಕುಂದುಕೊರತೆ ಪರಿಹಾರ ಅಧಿಕಾರಿಗೆ ಲಿಖಿತ ದೂರು ನೀಡಿ. ಪ್ಯಾರಾ ${para15} ಉಲ್ಲೇಖಿಸಿ, ನಿಮ್ಮ ಸ್ವೀಕೃತಿಯ ದಿನಾಂಕ ನೀಡಿ, ಮತ್ತು ಇತ್ಯರ್ಥ ಹಾಗೂ ಪ್ಯಾರಾ ${para33} ಅಡಿಯಲ್ಲಿ ಪರಿಹಾರ ಕೇಳಿ — ವಿಳಂಬ ಬ್ಯಾಂಕಿನ ಕಾರಣದಿಂದಾಗಿದ್ದರೆ ಬ್ಯಾಂಕ್ ದರ + ವಾರ್ಷಿಕ 4% ಬಡ್ಡಿ, ಮತ್ತು ಲಾಕರ್ ಅಥವಾ ಸುರಕ್ಷಿತ ಸಂರಕ್ಷಣೆಯ ವಿಳಂಬದ ಪ್ರತಿ ದಿನಕ್ಕೆ ₹5,000.`,
    deadlineOmbudsman: (waitDays, scheme) => `ಅದರ ನಂತರ ${waitDays} ದಿನಗಳು ಪರಿಹಾರವಿಲ್ಲದೆ ಕಳೆದರೆ, ${scheme} ಉಚಿತವಾಗಿ ಬಳಸಲು ಲಭ್ಯವಿದೆ`,
    deadlineOmbudsmanFree: "ಇದು ಉಚಿತ ಮತ್ತು ನಿಜ, ಆದರೆ ಖಾತರಿಯಲ್ಲ.",
    deadlineExpectDispute: "ಗಡಿಯಾರ ಯಾವಾಗ ಪ್ರಾರಂಭವಾಯಿತು ಎಂದು ಬ್ಯಾಂಕ್ ವಾದಿಸುತ್ತದೆ ಎಂದು ನಿರೀಕ್ಷಿಸಿ. ನಿಮ್ಮ ದಿನಾಂಕವಿರುವ ಸ್ವೀಕೃತಿ ಇದಕ್ಕೆ ಉತ್ತರ.",
    bankPanelHeading: (bankShort) => `${bankShort} ಸ್ವತಃ ಏನು ಪ್ರಕಟಿಸುತ್ತದೆ`,
    bankPanelSub: (bankShort, dateLabel) => `${bankShort} ಯ ಸ್ವಂತ ವೆಬ್‌ಸೈಟ್‌ನಿಂದ ಓದಲಾಗಿದೆ, ನಮ್ಮಿಂದಲ್ಲ. ಪರಿಶೀಲಿಸಲಾಗಿದೆ ${dateLabel}.`,
    bankPanelStaleHeading: "ಇದನ್ನು ಆರು ತಿಂಗಳಿಗಿಂತ ಹೆಚ್ಚು ಹಿಂದೆ ಪರಿಶೀಲಿಸಲಾಗಿತ್ತು",
    bankPanelStaleBody: "ಈ ನೀತಿ ಬದಲಾಗಿರಬಹುದು. ಇದನ್ನು ಅವಲಂಬಿಸುವ ಮೊದಲು ಬ್ಯಾಂಕಿನೊಂದಿಗೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    bankPanelConflictHeading: (bankShort) => `${bankShort} ಯ ನೀತಿ ಮತ್ತು ಅದರ ಶಾಖಾ ಆಚರಣೆಯ ನಡುವಿನ ದಾಖಲಿತ ಅಂತರ`,
    bankGapHeading: (bankShort) => `${bankShort} RBI ನಿಯಮಕ್ಕಿಂತ ಹೆಚ್ಚಿನದನ್ನು ಕೇಳಬಹುದು`,
    bankGapSeeDetail: "ಪೂರ್ಣ ವಿವರ ಕೆಳಗೆ “ಹೆಚ್ಚಿನ ವಿವರ”ದಲ್ಲಿ.",
    bankPanelThresholdLabel: (bankShort) => `${bankShort} ಯ ಸ್ವಂತ ಮಿತಿ`,
    bankPanelSuretyLabel: "ಅದಕ್ಕಿಂತ ಕೆಳಗೆ ಮೂರನೇ ವ್ಯಕ್ತಿ ಜಾಮೀನು",
    bankPanelSuretyNotRequired: "ಇದನ್ನು ಒತ್ತಾಯಿಸಬಾರದು ಎಂದು ಹೇಳುತ್ತದೆ",
    bankPanelSuretyRequired: "ಒಂದು ಅಗತ್ಯವಿದೆ ಎಂದು ಹೇಳುತ್ತದೆ",
    bankPanelTurnaroundLabel: "ಹೇಳಲಾದ ಸಮಯ",
    bankPanelFormsLabel: "ಇದು ಹೆಸರಿಸುವ ಹಕ್ಕು ಫಾರ್ಮ್‌ಗಳು",
    bankPanelPageLink: "ಅದರ ದಿವಂಗತ-ಹಕ್ಕು ಪುಟ",
    bankPanelFormLink: "ಅದರ ಹಕ್ಕು ಫಾರ್ಮ್",
    bankPanelPolicyLink: "ಅದರ ಪ್ರಕಟಿತ ನೀತಿ",
    bankPanelOnlineLink: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಹಕ್ಕು ಸಲ್ಲಿಸಿ",
    bankPanelNoPolicyHeading: (bankShort) => `${bankShort} ಯ ಪ್ರಕಟಿತ ನೀತಿ ನಮಗೆ ಸಿಗಲಿಲ್ಲ`,
    bankPanelNoPolicyBody: (bankShort) => `31 ಮಾರ್ಚ್ 2026 ರಿಂದ ಪ್ರತಿ ಬ್ಯಾಂಕ್ ತನ್ನ ದಿವಂಗತ-ಹಕ್ಕು ನೀತಿ ಮತ್ತು ದಾಖಲೆ ಪಟ್ಟಿಯನ್ನು ಪ್ರಕಟಿಸಬೇಕು. ನಾವು ಹುಡುಕಿದೆವು ಮತ್ತು ${bankShort} ಯದನ್ನು ಕಂಡುಕೊಳ್ಳಲಿಲ್ಲ. ಆ ಕೊರತೆಯೂ ಪ್ರಸ್ತಾಪಿಸಲು ಯೋಗ್ಯ — ಶಾಖೆಗೆ ಲಿಖಿತವಾಗಿ ಮಂಡಳಿ-ಅನುಮೋದಿತ ನೀತಿ ಮತ್ತು ಪಟ್ಟಿಯನ್ನು ಕೇಳಿ.`,
    bankPanelDifferentBank: "ಬೇರೆ ಬ್ಯಾಂಕ್?",
    bankPanelWholeTable: "ಪೂರ್ಣ ಕೋಷ್ಟಕ",
    bankPanelFoundOutdated: "ಹಳೆಯ ಬ್ಯಾಂಕ್ ನೀತಿ ಅಥವಾ ತಪ್ಪಾದ ಮಾಹಿತಿ ಕಂಡುಬಂದಿದೆಯೇ?",
    bankPanelTellUs: "ನಮಗೆ ತಿಳಿಸಿ",
    bankPanelNotVerified: "ಪರಿಶೀಲಿಸಲಾಗಿಲ್ಲ — ನಿಮ್ಮ ಬ್ಯಾಂಕನ್ನು ಕೇಳಿ",
    bankPickerHeading: "ಖಾತೆ ಯಾವ ಬ್ಯಾಂಕಿನಲ್ಲಿದೆ?",
    bankPickerBody: "ಮೇಲಿನ ಉತ್ತರ ಪ್ರತಿ ವಾಣಿಜ್ಯ ಬ್ಯಾಂಕಿನಲ್ಲೂ ಒಂದೇ — ಇದೇ RBI ಯ ನಿರ್ದೇಶನಗಳು ಮಾಡುತ್ತವೆ. ಬದಲಾಗುವುದು ಸಾಕ್ಷ್ಯ: ನಾವು ನಿಮ್ಮ ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ಪ್ರಕಟಿತ ಪದಗಳನ್ನು ಈ ಪುಟಕ್ಕೆ ಸೇರಿಸುತ್ತೇವೆ, ಇದರಿಂದ ಅಧಿಕಾರಿ ನಮ್ಮನ್ನಲ್ಲ, ತಮ್ಮ ಉದ್ಯೋಗದಾತರನ್ನು ಓದುತ್ತಿದ್ದಾರೆ.",
    bankPickerAnotherBank: "ಬೇರೆ ಬ್ಯಾಂಕ್? ಮೇಲಿನ RBI ನಿಯಮ ಅದಕ್ಕೂ ಅದೇ ರೀತಿ ಅನ್ವಯಿಸುತ್ತದೆ. ನಾವು ಇದುವರೆಗೆ ಎಂಟನ್ನು ಮಾತ್ರ ಸಂಗ್ರಹಿಸಿದ್ದೇವೆ —",
    bankPickerSeeWhatWeHave: "ನಮ್ಮ ಬಳಿ ಏನಿದೆ ಮತ್ತು ಅದನ್ನು ಹೇಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಎಂದು ನೋಡಿ",
    counterShorter: "ಈಗ ಕೌಂಟರ್‌ನಲ್ಲಿದ್ದೀರಾ? ಚಿಕ್ಕ ಆವೃತ್ತಿ",
    yourNextSteps: "ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆಗಳು",
    todayHeading: "ಇಂದು ನೀವು ಏನು ಮಾಡಬೇಕು?",
    readyToProceed: "ನಾನು ಮುಂದುವರಿಯಲು ಸಿದ್ಧ",
    knowAnswerNow: "ಈಗ ನನಗೆ ಉತ್ತರ ಗೊತ್ತಿದೆ",
    todayAction: {
      nomineeOrSurvivorship: "ಬ್ಯಾಂಕಿನಿಂದ ದಿವಂಗತ-ಗ್ರಾಹಕ ಹಕ್ಕು ಫಾರ್ಮ್ ಕೇಳಿ, ಮತ್ತು ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಹಾಗೂ ನಿಮ್ಮ ಗುರುತಿನ ಚೀಟಿಯನ್ನು ತೆಗೆದುಕೊಂಡು ಹೋಗಿ.",
      underThreshold: "ಬ್ಯಾಂಕಿನಿಂದ ಅದರ ಸರಳೀಕೃತ ದಿವಂಗತ-ಠೇವಣಿ ಹಕ್ಕು ಫಾರ್ಮ್ ಕೇಳಿ ಮತ್ತು ಆ ಬ್ಯಾಂಕಿನಲ್ಲಿನ ಒಟ್ಟು ಬ್ಯಾಲೆನ್ಸ್ ಅನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      unknownNominee: "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉತ್ತರಜೀವಿತ್ವ ಷರತ್ತು ದಾಖಲಾಗಿದೆಯೇ ಎಂದು ಲಿಖಿತವಾಗಿ ಖಚಿತಪಡಿಸಲು ಬ್ಯಾಂಕಿಗೆ ಕೇಳಿ.",
      outOfScope: "ಈ ಆಸ್ತಿಯನ್ನು ಹೊಂದಿರುವ ಸಂಸ್ಥೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ಅದರ ದಿವಂಗತ-ಗ್ರಾಹಕ ಹಕ್ಕು ಪಟ್ಟಿಯನ್ನು ಕೇಳಿ.",
      default: "ಬ್ಯಾಂಕಿನಿಂದ ಲಿಖಿತ ಹಕ್ಕು ಪಟ್ಟಿ, ಅದರ ಅನ್ವಯವಾಗುವ ಮಿತಿ ಮತ್ತು ಅದು ಸ್ವೀಕರಿಸುವ ದಾಖಲೆಗಳನ್ನು ಕೇಳಿ.",
    },
    documentsTitle: (n) => `RBI ಹೆಸರಿಸುವ ${["ಸೊನ್ನೆ", "ಒಂದು", "ಎರಡು", "ಮೂರು", "ನಾಲ್ಕು", "ಐದು", "ಆರು", "ಏಳು"][n] ?? n} ದಾಖಲೆಗಳು`,
    documentsNote: "ಏನನ್ನು ತರಬೇಕು, ಪ್ರತಿಯೊಂದರ ವೆಚ್ಚ ಎಷ್ಟು ಮತ್ತು ಎಷ್ಟು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ. ನಿಮ್ಮ ಬಳಿ ಈಗಾಗಲೇ ಇರುವುದನ್ನು ಟಿಕ್ ಮಾಡಿ.",
    documentsLede: "ಕೆಳಗಿನ ವೆಚ್ಚ ಮತ್ತು ಸಮಯ ವಾಸ್ತವಿಕ, ಅತ್ಯುತ್ತಮ-ಸ್ಥಿತಿಯದ್ದಲ್ಲ. ಈ ಪಟ್ಟಿಯಲ್ಲಿ ಬೇರೆ ಯಾವುದೂ ನ್ಯಾಯಾಲಯದ ದಾಖಲೆಯಲ್ಲ.",
    seeFullChecklist: "ಪೂರ್ಣ ಪಟ್ಟಿಯನ್ನು ನೋಡಿ ಮತ್ತು ನಿಮ್ಮ ಬಳಿ ಇರುವುದನ್ನು ಟಿಕ್ ಮಾಡಿ",
    whereFrom: "ಎಲ್ಲಿಂದ ಸಿಗುತ್ತದೆ",
    cost: "ವೆಚ್ಚ",
    howLong: "ಎಷ್ಟು ಸಮಯ",
    noteLabel: "ಸೂಚನೆ.",
    readinessNeed: (n) => `ಈ ಹಕ್ಕಿಗಾಗಿ ನಿಮಗೆ ${["ಸೊನ್ನೆ", "ಒಂದು", "ಎರಡು", "ಮೂರು", "ನಾಲ್ಕು", "ಐದು", "ಆರು", "ಏಳು"][n] ?? n} ದಾಖಲೆಗಳು ಬೇಕಾಗುತ್ತವೆ.`,
    readinessNoLongWait: "ಇವುಗಳಲ್ಲಿ ಯಾವುದಕ್ಕೂ ದೀರ್ಘ ಕಾಯುವಿಕೆ ಇಲ್ಲ — ಕೆಳಗೆ ನಿಮ್ಮ ಬಳಿ ಈಗಾಗಲೇ ಇರುವುದನ್ನು ಟಿಕ್ ಮಾಡಿ.",
    readinessStartTodayLongest: (names) => `ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ: ${names} — ಈ ಪಟ್ಟಿಯಲ್ಲಿ ಇದು ಅತಿ ಹೆಚ್ಚು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ, ಮತ್ತು ಇದಕ್ಕಾಗಿ ಕಾಯುತ್ತಿರುವಾಗ ಉಳಿದೆಲ್ಲವನ್ನೂ ಮಾಡಬಹುದು.`,
    readinessHaveAll: (n) => `ನಿಮ್ಮ ಬಳಿ ಎಲ್ಲಾ ${["ಸೊನ್ನೆ", "ಒಂದು", "ಎರಡು", "ಮೂರು", "ನಾಲ್ಕು", "ಐದು", "ಆರು", "ಏಳು"][n] ?? n} ಇವೆ.`,
    readinessTakeToBranch: "ಇವುಗಳನ್ನು ಒಟ್ಟಿಗೆ ಶಾಖೆಗೆ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ ಮತ್ತು ಒಪ್ಪಿಸಿದ ದಿನವೇ ಹಕ್ಕಿನ ಲಿಖಿತ ಸ್ವೀಕೃತಿ ಕೇಳಿ. ಪೂರ್ಣ ಹಕ್ಕಿನ ನಂತರ ಬ್ಯಾಂಕಿಗೆ ಹದಿನೈದು ದಿನಗಳಿವೆ.",
    readinessHaveOf: (have, total) => `ನಿಮ್ಮ ಬಳಿ ${total} ರಲ್ಲಿ ${have} ಇವೆ.`,
    readinessStillToGet: (n) => {
      const word = ["ಸೊನ್ನೆ", "ಒಂದು", "ಎರಡು", "ಮೂರು", "ನಾಲ್ಕು", "ಐದು", "ಆರು", "ಏಳು"][n] ?? String(n);
      return `ಇನ್ನೂ ${word} ಪಡೆಯಬೇಕಾಗಿದೆ.`;
    },
    readinessStartToday: (name) => `ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ: ${name}`,
    readinessLongestWait: " — ನಿಮಗೆ ಇನ್ನೂ ಬೇಕಾದವುಗಳಲ್ಲಿ ಇದಕ್ಕೆ ಅತಿ ಹೆಚ್ಚು ಕಾಯುವಿಕೆ ಇದೆ",
    readinessLastOne: ", ಮತ್ತು ಇದೇ ಕೊನೆಯದು.",
    readinessOtherOneWaits: ", ಮತ್ತು ಇನ್ನೊಂದನ್ನು ಇದಕ್ಕಾಗಿ ಕಾಯುತ್ತಿರುವಾಗ ಮಾಡಬಹುದು.",
    readinessOthersWait: (n) => `, ಮತ್ತು ಉಳಿದ ${["ಸೊನ್ನೆ", "ಒಂದು", "ಎರಡು", "ಮೂರು", "ನಾಲ್ಕು", "ಐದು", "ಆರು", "ಏಳು"][n] ?? n} ಅನ್ನು ಇದಕ್ಕಾಗಿ ಕಾಯುತ್ತಿರುವಾಗ ಮಾಡಬಹುದು.`,
    readinessIsLastNoQueue: (name) => `${name} ಕೊನೆಯದು, ಮತ್ತು ಇದರ ಮುಂದೆ ಯಾವುದೇ ಸಾಲು ಇಲ್ಲ.`,
    readinessNothingHasQueue: (name) => `ನಿಮ್ಮ ಪಟ್ಟಿಯಲ್ಲಿ ಇನ್ನು ಯಾವುದಕ್ಕೂ ಮುಂದೆ ಸಾಲು ಇಲ್ಲ — ${name} ಮತ್ತು ಉಳಿದವು ಅದೇ ದಿನ ಸಿಗುತ್ತವೆ ಅಥವಾ ಈಗಾಗಲೇ ನಿಮ್ಮ ಬಳಿ ಇವೆ.`,
    evidenceTitle: "ನಿಯಮ, RBI ಯ ಸ್ವಂತ ಪದಗಳಲ್ಲಿ",
    evidenceNote: "ಬ್ಯಾಂಕಿಗೆ ತೋರಿಸಬೇಕಾದ ಪ್ಯಾರಾಗ್ರಾಫ್‌ಗಳು, ಇರುವಂತೆಯೇ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ, ಪ್ರತಿಯೊಂದೂ ಅಧಿಸೂಚನೆಗೆ ಜೋಡಿಸಲಾಗಿದೆ.",
    evidenceLede: "ಕೆಳಗಿನ ಪ್ರತಿ ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆ ಅಧಿಸೂಚನೆಯಲ್ಲಿದೆ, ಮತ್ತು ಲಿಂಕ್ ಅದನ್ನು ತೆರೆಯುತ್ತದೆ.",
    paragraphLabel: (para) => `ಪ್ಯಾರಾಗ್ರಾಫ್ ${para}`,
    sourceLabel: (title, para, date) => `ಮೂಲ: ${title}, 2025, ಪ್ಯಾರಾಗ್ರಾಫ್ ${para} · ಪರಿಶೀಲಿಸಲಾಗಿದೆ: ${date}`,
    inSummaryLabel: "ಸಾರಾಂಶದಲ್ಲಿ:",
    fromLabel: "ಮೂಲ",
    issuedLabel: "ಬಿಡುಗಡೆ",
    tacticsTitle: "ಶಾಖೆಯಲ್ಲಿ ಮಾಡಬೇಕಾದ ನಾಲ್ಕು ವಿಷಯಗಳು",
    tacticsNote: "ಕಾರ್ಯವಿಧಾನಾತ್ಮಕ, ಕಾನೂನು ಅಲ್ಲ. ಪ್ರತಿಯೊಂದೂ ಹಕ್ಕು ಸ್ಥಗಿತಗೊಳ್ಳುವ ನಿರ್ದಿಷ್ಟ ವಿಧಾನವನ್ನು ಮುಚ್ಚುತ್ತದೆ.",
    conditionsForRoute: "ಈ ಮಾರ್ಗದ ಷರತ್ತುಗಳು",
    otherImportantNotes: "ಇತರ ಪ್ರಮುಖ ಟಿಪ್ಪಣಿಗಳು",
    refusedHeading: "ಬ್ಯಾಂಕ್ ಆದರೂ ನಿರಾಕರಿಸಿದರೆ",
    readComplaintEligibility: "RBI ಯ ಪ್ರಸ್ತುತ ದೂರು ಅರ್ಹತೆ ಮತ್ತು ಸಮಯ ಮಿತಿಗಳನ್ನು ಓದಿ.",
    fullRouteCta: "ಪೂರ್ಣ ಮಾರ್ಗ, ಜೊತೆಗೆ ಭರ್ತಿ ಮಾಡಬಹುದಾದ ಲಿಖಿತ ದೂರು",
    sourceLineBrand: "ಅಧಿಕಾರ್ — ಒಂದು ಸ್ವತಂತ್ರ ಸಾರ್ವಜನಿಕ-ಮಾಹಿತಿ ಸಾಧನ.",
    sourceLineBody: (number, ref, issued) => `ಇದು ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್ ಅಲ್ಲ ಮತ್ತು ಭಾರತೀಯ ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್ ಅಥವಾ ಯಾವುದೇ ಬ್ಯಾಂಕಿನೊಂದಿಗೆ ಸಂಬಂಧ ಹೊಂದಿಲ್ಲ. ನಿಯಮಗಳು ${number} (${ref}) ನಿಂದ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ, ಬಿಡುಗಡೆ ${issued}, 31 ಮಾರ್ಚ್ 2026 ರಿಂದ ಜಾರಿಯಲ್ಲಿದೆ. ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆ ಅಲ್ಲ.`,
    exclusionNote: "ಇಲ್ಲಿ ಯಾವುದೂ ಸಾರ್ವಜನಿಕ ಭವಿಷ್ಯ ನಿಧಿ, ಹಿರಿಯ ನಾಗರಿಕರ ಉಳಿತಾಯ ಯೋಜನೆ, ಮಹಿಳಾ ಸಮ್ಮಾನ್ ಉಳಿತಾಯ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿಗೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ. ಪ್ಯಾರಾಗ್ರಾಫ್ 6(b) ಇವುಗಳನ್ನು ಈ ನಿರ್ದೇಶನಗಳ ವ್ಯಾಪ್ತಿಯಿಂದ ಹೊರಗಿಡುತ್ತದೆ.",
    answerAgain: "ಪ್ರಶ್ನೆಗಳಿಗೆ ಮತ್ತೆ ಉತ್ತರಿಸಿ",
    foundIncorrect: "ತಪ್ಪಾದ ಮಾಹಿತಿ ಕಂಡುಬಂದಿದೆಯೇ? ನಮಗೆ ತಿಳಿಸಿ",
    show: "ತೋರಿಸಿ",
    hide: "ಮರೆಮಾಡಿ",
    numberWords: ["ಸೊನ್ನೆ", "ಒಂದು", "ಎರಡು", "ಮೂರು", "ನಾಲ್ಕು", "ಐದು", "ಆರು", "ಏಳು"],
    moreDetailTitle: "ಹೆಚ್ಚಿನ ವಿವರ",
    moreDetailNote: "ಬ್ಯಾಂಕಿಗೆ ತೋರಿಸಬೇಕಾದ ಸಾಕ್ಷ್ಯ, ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ಪುಟ, ಮುಂದುವರಿಕೆ ಮಾರ್ಗ ಮತ್ತು ಇತರ ಷರತ್ತುಗಳು — ಎಲ್ಲವೂ ಇನ್ನೂ ಇಲ್ಲಿವೆ, ಈಗ ಏನು ಮಾಡಬೇಕು ಎಂಬುದರ ಮೇಲೆ ಪುಟ ತೆರೆಯುವಂತೆ ಮಡಚಲಾಗಿದೆ.",
    counterModeLabel: "ಕೌಂಟರ್ ಮೋಡ್",
    seeFullPageInstead: "ಬದಲಿಗೆ ಪೂರ್ಣ ಪುಟವನ್ನು ನೋಡಿ",
    whatToSay: "ಏನು ಹೇಳಬೇಕು",
    whatDocToShow: "ಯಾವ ದಾಖಲೆ ತೋರಿಸಬೇಕು",
    whatBankMayAsk: "ಬ್ಯಾಂಕ್ ಕಾನೂನುಬದ್ಧವಾಗಿ ಏನು ಕೇಳಬಹುದು",
    whatToDoIfRefuse: "ಅವರು ನಿರಾಕರಿಸಿದರೆ ಏನು ಮಾಡಬೇಕು",
    noFixedListGood: "ಈ ಸ್ಥಿತಿಗೆ ಯಾವುದೇ ನಿಗದಿತ ದಾಖಲೆ ಪಟ್ಟಿ ಅನ್ವಯಿಸುವುದಿಲ್ಲ — ಶಾಖೆಗೆ ಏನು ಕೇಳಬೇಕು ಎಂಬುದಕ್ಕೆ ಪೂರ್ಣ ಪುಟವನ್ನು ನೋಡಿ.",
    noFixedListHard: "ಇಲ್ಲಿ ಯಾವುದೇ ಮುಚ್ಚಿದ ಪಟ್ಟಿ ಇಲ್ಲ. ನಿಜವಾಗಿಯೂ ಏನು ಬೇಕಾಗಬಹುದು ಮತ್ತು ಏಕೆ ಎಂಬುದಕ್ಕೆ ಪೂರ್ಣ ಪುಟವನ್ನು ನೋಡಿ.",
    counterFooter: "ಅಧಿಕಾರ್ — ಒಂದು ಸ್ವತಂತ್ರ ಸಾರ್ವಜನಿಕ-ಮಾಹಿತಿ ಸಾಧನ, RBI ಅಥವಾ ಯಾವುದೇ ಬ್ಯಾಂಕಿನೊಂದಿಗೆ ಸಂಬಂಧ ಹೊಂದಿಲ್ಲ. ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆ ಅಲ್ಲ.",
  },
  privacyPage: {
    heading: "ಗೌಪ್ಯತೆ",
    updated: "ಕ್ಲೇಮ್ ಗೈಡ್ · ನವೀಕರಿಸಲಾಗಿದೆ 5 ಸೆಪ್ಟೆಂಬರ್ 2026",
    linkSectionHeading: "ಗೈಡ್ ಲಿಂಕ್‌ನಲ್ಲಿ ಏನಿದೆ?",
    linkSectionBody: "ನಾಮನಿರ್ದೇಶಿತ ಸ್ಥಿತಿ, ಮೊತ್ತ ವರ್ಗ, ಆಯ್ಕೆ ಮಾಡಿದ ಬ್ಯಾಂಕ್ ಮತ್ತು ಪಟ್ಟಿಯ ಟಿಕ್‌ಗಳಂತಹ ನಿಮ್ಮ ಆಯ್ಕೆಗಳು URL ನಲ್ಲಿ ಸೇರಿಸಲ್ಪಡಬಹುದು. ಅವು ಖಾತೆ ಬ್ಯಾಲೆನ್ಸ್ ಅಥವಾ ಖಾತೆ ಸಂಖ್ಯೆಗಳಲ್ಲ. ಪುಟವನ್ನು ರೆಂಡರ್ ಮಾಡಲು ಸರ್ವರ್ ಆ URL ಅನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ; ಬ್ರೌಸರ್ ಇತಿಹಾಸ ಮತ್ತು ಹೋಸ್ಟಿಂಗ್ ಲಾಗ್‌ಗಳು ಅದನ್ನು ಉಳಿಸಿಕೊಳ್ಳಬಹುದು. ನೀವು ನಂಬುವ ಜನರೊಂದಿಗೆ ಮಾತ್ರ ಲಿಂಕ್‌ಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
    deviceSectionHeading: "ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಏನು ಉಳಿಯುತ್ತದೆ?",
    deviceSectionBody: "ಐಚ್ಛಿಕ ಗಡುವು ಟ್ರ್ಯಾಕರ್ ತನ್ನ ದಿನಾಂಕವನ್ನು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನ ಲೋಕಲ್ ಸ್ಟೋರೇಜ್‌ನಲ್ಲಿ ಉಳಿಸುತ್ತದೆ. ಇದನ್ನು ತೆಗೆದುಹಾಕಲು ಟ್ರ್ಯಾಕರ್ ಅಥವಾ ಸೈಟಿನ ಬ್ರೌಸರ್ ಡೇಟಾ ತೆರವುಗೊಳಿಸಿ. ಗೈಡ್ ಅನ್ನು ಮುದ್ರಿಸುವುದು ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡುವುದು ನಿಮ್ಮ ನಿಯಂತ್ರಣದಲ್ಲಿ ಪ್ರತಿಗಳನ್ನು ರಚಿಸುತ್ತದೆ; ನೀವು ಹಂಚಿಕೊಂಡ ಪ್ರತಿಗಳನ್ನು ಅಧಿಕಾರ್ ಅಳಿಸಲಾಗುವುದಿಲ್ಲ.",
    analyticsSectionHeading: "ಬಳಕೆಯ ವಿಶ್ಲೇಷಣೆ",
    analyticsSectionBody: "ಕಾನ್ಫಿಗರ್ ಮಾಡಿದಾಗ, ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸುವುದು, ತಲುಪಿದ ಫಲಿತಾಂಶ, ಪಟ್ಟಿಯ ಕ್ರಿಯೆ ಅಥವಾ ಮುದ್ರಣ ಕ್ರಿಯೆಯಂತಹ ಮೂಲಭೂತ ಘಟನೆಗಳನ್ನು Mixpanel ಸ್ವೀಕರಿಸುತ್ತದೆ. ಶಾಶ್ವತ ಬ್ರೌಸರ್ ಗುರುತಿಸುವಿಕೆಗಳು, ವಿಶ್ಲೇಷಣೆ ಕುಕೀಗಳು, ಸ್ವಯಂಚಾಲಿತ ಪುಟ-ವೀಕ್ಷಣೆಗಳು ಅಥವಾ ಸೆಷನ್ ರೆಕಾರ್ಡಿಂಗ್ ಇಲ್ಲದೆ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗಿದೆ. ಯಾವುದೇ ಡೇಟಾ ಸರ್ವರ್‌ಗೆ ತಲುಪುವುದಿಲ್ಲ ಎಂಬ ಭರವಸೆ ಇದಲ್ಲ: ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸುವಾಗ ನೆಟ್‌ವರ್ಕ್ ಪೂರೈಕೆದಾರರು ತಾಂತ್ರಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಸ್ಕರಿಸಬಹುದು.",
    contactSectionHeading: "ಸಂಪರ್ಕ ಮತ್ತು ಬಾಹ್ಯ ಸೇವೆಗಳು",
    contactSectionBody: "ನೀವು ನಮಗೆ ಇಮೇಲ್ ಮಾಡಿದರೆ, ನಿಮ್ಮ ಮತ್ತು ನಮ್ಮ ಇಮೇಲ್ ಪೂರೈಕೆದಾರರು ಸಂದೇಶ ಮತ್ತು ವಿಳಾಸವನ್ನು ಸಂಸ್ಕರಿಸುತ್ತಾರೆ. ಪಾಸ್‌ವರ್ಡ್‌ಗಳು, OTP ಗಳು, ಆಧಾರ್/ಪ್ಯಾನ್ ಸಂಖ್ಯೆಗಳು, ಬ್ಯಾಂಕ್ ರುಜುವಾತುಗಳು ಅಥವಾ ವೈಯಕ್ತಿಕ ದಾಖಲೆಗಳನ್ನು ಕಳುಹಿಸಬೇಡಿ. RBI UDGAM, ಬ್ಯಾಂಕ್ ವೆಬ್‌ಸೈಟ್‌ಗಳು ಮತ್ತು ಇತರ ಬಾಹ್ಯ ಸೇವೆಗಳು ತಮ್ಮದೇ ಗೌಪ್ಯತಾ ಅಭ್ಯಾಸಗಳನ್ನು ಹೊಂದಿವೆ; ಈ ಗೈಡ್ ಅವರ ದಾಖಲೆಗಳನ್ನು ಹುಡುಕುವುದಿಲ್ಲ ಅಥವಾ ನಿಮ್ಮ ಪರವಾಗಿ ಹಕ್ಕುಗಳನ್ನು ಸಲ್ಲಿಸುವುದಿಲ್ಲ.",
    chatNote: "ಈ ಸೂಚನೆ ಕ್ಲೇಮ್ ಗೈಡ್ ಬಗ್ಗೆ ವಿವರಿಸುತ್ತದೆ. ಯಾವುದೇ ಪ್ರತ್ಯೇಕ ಚಾಟ್ ಸೇವೆ ಮಾಹಿತಿ ಕಳುಹಿಸುವ ಮೊದಲು ತನ್ನದೇ ಡೇಟಾ ನಿರ್ವಹಣೆಯನ್ನು ವಿವರಿಸಬೇಕು; ಚಾಟ್‌ನಲ್ಲಿ ಸೂಕ್ಷ್ಮ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸಬೇಡಿ.",
    questionsSectionHeading: "ಪ್ರಶ್ನೆಗಳು",
    contactAdhikaar: "ಅಧಿಕಾರ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಿ",
    questionsSectionBody: "ಗೌಪ್ಯತೆ ಅಥವಾ ನೀವು ಕಳುಹಿಸಿದ ಸಂದೇಶದ ಬಗ್ಗೆ. ಹೋಸ್ಟಿಂಗ್, ಇಮೇಲ್ ಮತ್ತು ಬಾಹ್ಯ ಪೂರೈಕೆದಾರರು ತಮ್ಮದೇ ನೀತಿಗಳ ಅಡಿಯಲ್ಲಿ ತಾಂತ್ರಿಕ ದಾಖಲೆಗಳನ್ನು ಉಳಿಸಿಕೊಳ್ಳಬಹುದು; ಆ ವ್ಯವಸ್ಥೆಗಳಿಂದ ತಕ್ಷಣದ ಅಳಿಸುವಿಕೆಯ ಭರವಸೆ ನಾವು ನೀಡುವುದಿಲ್ಲ.",
  },
  bankRefusedPage: {
    heading: "ಬ್ಯಾಂಕ್ ನಿರಾಕರಿಸಿತು. ಮುಂದಿನ ಮಾರ್ಗ ಇಲ್ಲಿದೆ.",
    sub: "ಕ್ರಮವಾಗಿ ನಾಲ್ಕು ಹಂತಗಳು, ಮತ್ತು ನೀವು ಭರ್ತಿ ಮಾಡಿ ಒಪ್ಪಿಸಬಹುದಾದ ಲಿಖಿತ ದೂರು. ಮುಂದುವರಿಕೆ ನಿಜ ಮತ್ತು ಉಚಿತ — ಇದು ಖಾತರಿಯಲ್ಲ, ಮತ್ತು ಈ ಪುಟ ಮಾರ್ಗ ನೀಡುವುದಕ್ಕಿಂತ ಹೆಚ್ಚು ಭರವಸೆ ನೀಡದೆ ಇದನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳುತ್ತದೆ.",
    fourSteps: "ನಾಲ್ಕು ಹಂತಗಳು",
    step1Title: "ಬೇಡಿಕೆಯನ್ನು ಲಿಖಿತವಾಗಿ ಕೇಳಿ",
    step1Body: "ಅವರಿಗೆ ಯಾವ ದಾಖಲೆ ಬೇಕು ಮತ್ತು ಯಾವ ನಿಯಮದ ಆಧಾರದಲ್ಲಿ ಎಂದು ಕಾಗದದ ಮೇಲೆ ನಿಖರವಾಗಿ ಬರೆಯಲು ಅಧಿಕಾರಿಯನ್ನು ಕೇಳಿ. ಲಿಖಿತವಾಗಿ ಬರೆದರೆ ಉಳಿಯದ ಅನೇಕ ಬೇಡಿಕೆಗಳನ್ನು ನೀವು ಇದನ್ನು ಕೇಳಿದ ಕ್ಷಣವೇ ಕೈಬಿಡಲಾಗುತ್ತದೆ.",
    step2Title: "ಶಾಖೆಗೆ ಲಿಖಿತ ದೂರು ಸಲ್ಲಿಸಿ",
    step2Body: "ಅದನ್ನು ಶಾಖೆಯ ಕುಂದುಕೊರತೆ ಪರಿಹಾರ ಅಧಿಕಾರಿಗೆ ವಿಳಾಸ ಮಾಡಿ, ನಿಮ್ಮ ಹಕ್ಕಿಗೆ ಅನ್ವಯಿಸುವ ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆಯನ್ನು ಉಲ್ಲೇಖಿಸಿ. ಒಂದು ಪ್ರತಿ ಇಟ್ಟುಕೊಳ್ಳಿ ಮತ್ತು ದಿನಾಂಕದೊಂದಿಗೆ ಸ್ವೀಕೃತಿ ಪಡೆಯಿರಿ — ಅಥವಾ ನೋಂದಾಯಿತ ಅಂಚೆಯ ಮೂಲಕ ಕಳುಹಿಸಿ ಮತ್ತು ರಸೀದಿ ಇಟ್ಟುಕೊಳ್ಳಿ.",
    step3Title: "ಬ್ಯಾಂಕಿನ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    step4Title: "RBI ಯ ಒಂಬುಡ್ಸ್‌ಮನ್ ಮಾರ್ಗದ ಮೂಲಕ ಮುಂದುವರಿಸಿ",
    step4Body: (scheme) => `${scheme} ಅಡಿಯಲ್ಲಿ ಅರ್ಹರಾಗಿದ್ದರೆ RBI ದೂರು ಪೋರ್ಟಲ್ ಬಳಸಿ. ಈಗಾಗಲೇ ನ್ಯಾಯಾಲಯ ಅಥವಾ ನ್ಯಾಯಮಂಡಳಿಯ ಮುಂದೆ ಇರುವ ವಿಷಯಗಳು ಸೇರಿದಂತೆ, ಅದರ ಪ್ರಸ್ತುತ ಸಮಯ ಮಿತಿಗಳು ಮತ್ತು ಹೊರಗಿಡುವಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ದೂರು ಸಲ್ಲಿಸುವುದು ಉಚಿತ ಮತ್ತು ಅನುಕೂಲಕರ ತೀರ್ಪಿನ ಖಾತರಿ ನೀಡುವುದಿಲ್ಲ.`,
    escalationHeading: "ಮುಂದುವರಿಕೆ ಲಭ್ಯವಿದೆ — ಇದು ಖಾತರಿಯಲ್ಲ",
    complaintHeading: "ಬಳಸಬಹುದಾದ ಲಿಖಿತ ದೂರು",
    complaintSub: "ಟೆಕ್ಸ್ಟ್ ಫೈಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಸಂಪಾದಿಸಿ, ಅಥವಾ ಮುದ್ರಿಸಿ ಆವರಣದಲ್ಲಿರುವ ಕ್ಷೇತ್ರಗಳನ್ನು ಕೈಯಿಂದ ಭರ್ತಿ ಮಾಡಿ. ಪ್ರತಿ ಖಾಲಿ ಜಾಗವನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಖಾಲಿ ಬಿಡಲಾಗಿದೆ — ನಿಮ್ಮ ಬ್ಯಾಂಕ್, ನಿಮ್ಮ ಖಾತೆ ಸಂಖ್ಯೆ ಅಥವಾ ನಿಜವಾಗಿ ಕೇಳಿದ ದಾಖಲೆ ನಮಗೆ ತಿಳಿದಿಲ್ಲ, ಮತ್ತು ಇವುಗಳಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಊಹಿಸುವುದು ಇದನ್ನು ಕಡಿಮೆ, ಹೆಚ್ಚು ಅಲ್ಲ, ಉಪಯುಕ್ತವಾಗಿಸುತ್ತದೆ.",
    checkSituationInstead: "ಬದಲಿಗೆ ನಿಮ್ಮ ಹಕ್ಕಿನ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
  },
  otherAssetsPage: {
    heading: "ನೀವು ವ್ಯವಹರಿಸಬೇಕಾದ ಉಳಿದೆಲ್ಲವೂ",
    sub: "ಅಧಿಕಾರ್ ಬ್ಯಾಂಕ್ ಠೇವಣಿಗಳು, ಲಾಕರ್‌ಗಳು ಮತ್ತು ಸುರಕ್ಷಿತ ಸಂರಕ್ಷಣೆಯನ್ನು ಒಳಗೊಳ್ಳುತ್ತದೆ, ಇನ್ನೇನೂ ಅಲ್ಲ. ಆಸ್ತಿಯ ಉಳಿದ ಭಾಗ ಪ್ರತ್ಯೇಕ ಮಾರ್ಗಗಳಲ್ಲಿ ಚಲಿಸುತ್ತದೆ, ಪ್ರತಿಯೊಂದಕ್ಕೂ ತನ್ನದೇ ನಿಯಂತ್ರಕ ಮತ್ತು ತನ್ನದೇ ಫಾರ್ಮ್ ಇದೆ. ಈ ಪುಟ ಯಾವ ಬಾಗಿಲನ್ನು ತಟ್ಟಬೇಕೆಂದು ಹೇಳುತ್ತದೆ.",
    pointsNotAdvises: "ಈ ಪುಟ ದಿಕ್ಕು ತೋರಿಸುತ್ತದೆ. ಇದು ಸಲಹೆ ನೀಡುವುದಿಲ್ಲ.",
    pointsNotAdvisesBody: "ನಾವು ಬ್ಯಾಂಕ್ ನಿಯಮಗಳನ್ನು RBI ಯ ಸ್ವಂತ ಅಧಿಸೂಚನೆಯ ವಿರುದ್ಧ ಸಾಲಿನಿಂದ ಸಾಲಿಗೆ ಪರಿಶೀಲಿಸಿದ್ದೇವೆ. ಈ ಮಾರ್ಗಗಳಲ್ಲಿ ನಾವು ಅದನ್ನು ಮಾಡಿಲ್ಲ, ಆದ್ದರಿಂದ ಇಲ್ಲಿ ಯಾವುದೇ ತೀರ್ಪು ಮತ್ತು ಯಾವುದೇ ಪಟ್ಟಿ ಸಿಗುವುದಿಲ್ಲ — ಕೇವಲ ಪ್ರಾಧಿಕಾರ, ಮಾರ್ಗದ ಹೆಸರು, ಮತ್ತು ಒಂದು ಲಿಂಕ್. ಇದಕ್ಕಿಂತ ಹೆಚ್ಚಿನದು ಉತ್ತರದ ವೇಷದಲ್ಲಿನ ಊಹೆಯಾಗುತ್ತದೆ.",
    railsHeading: "ಇತರ ಆರು ಮಾರ್ಗಗಳು",
    whoHolds: "ಇದನ್ನು ಯಾರು ಹಿಡಿದಿದ್ದಾರೆ",
    routeCalled: "ಮಾರ್ಗವನ್ನು ಏನೆಂದು ಕರೆಯಲಾಗುತ್ತದೆ",
    findingOutHeading: "ಏನಿದೆ ಎಂದು ಕಂಡುಹಿಡಿಯುವುದು",
    findingOutBody: "ಇವೆರಡೂ ಸರ್ಕಾರದ ಸ್ವಂತವೇ. ಇವು ಖಾತೆ ಅಥವಾ ಪಾಲಿಸಿಯನ್ನು ಹುಡುಕಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ. ಒಂದನ್ನು ಕಂಡುಕೊಂಡ ನಂತರ ಏನು ಮಾಡಬೇಕು ಎಂಬುದು ಬೇರೆ ಸಮಸ್ಯೆ — ಅದಕ್ಕಾಗಿಯೇ ಅಧಿಕಾರ್ ಇರುವುದು.",
    linksChecked: (date) => `ಲಿಂಕ್‌ಗಳನ್ನು ${date} ರಂದು ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಪ್ರಾಧಿಕಾರವನ್ನು ಹೆಸರಿಸುವುದು ಶಿಫಾರಸು ಅಲ್ಲ, ಮತ್ತು ಈ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಯಾವುದೂ ಅಧಿಕಾರ್‌ನೊಂದಿಗೆ ಸಂಪರ್ಕ ಹೊಂದಿಲ್ಲ.`,
    backToQuestions: "ಬ್ಯಾಂಕ್ ಠೇವಣಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
  },
  askedForPage: {
    heading: "ನಿಮ್ಮಿಂದ ಏನು ಕೇಳಲಾಗಿತ್ತು?",
    sub: "ಶಾಖೆ ನಿಮಗೆ ತರಲು ಹೇಳಿದ ಎಲ್ಲವನ್ನೂ ಟಿಕ್ ಮಾಡಿ. ಇವುಗಳಲ್ಲಿ RBI ನಿಮ್ಮ ಸ್ಥಿತಿಗೆ ನಿಜವಾಗಿ ಯಾವುದನ್ನು ನಿಗದಿಪಡಿಸುತ್ತದೆ ಮತ್ತು ಯಾವುದನ್ನು ಇಲ್ಲ ಎಂದು ನಾವು ತೋರಿಸುತ್ತೇವೆ — ಪ್ರತಿಯೊಂದಕ್ಕೂ ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ.",
    tickHeading: "ಶಾಖೆ ಏನು ಕೇಳಿತು ಎಂದು ಟಿಕ್ ಮಾಡಿ",
    tickedRemove: "ಟಿಕ್ ಮಾಡಲಾಗಿದೆ. ತೆಗೆದುಹಾಕಲು ಆಯ್ಕೆಮಾಡಿ.",
    tickedSelect: "ಟಿಕ್ ಮಾಡಲು ಆಯ್ಕೆಮಾಡಿ.",
    comparingAgainst: "ಇದರ ಪಟ್ಟಿಯೊಂದಿಗೆ ಹೋಲಿಸಲಾಗುತ್ತಿದೆ",
    confirmRouteFirst: "ಮೊದಲು ಹಕ್ಕಿನ ಮಾರ್ಗವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ, ಯಾವುದೇ ಉಯಿಲು, ನ್ಯಾಯಾಲಯದ ನಿರ್ಬಂಧ, ವಿವಾದ ಮತ್ತು ಅನ್ವಯವಾಗುವ ಬ್ಯಾಂಕ್ ಮಿತಿ ಸೇರಿ. ಅಲ್ಲಿಯವರೆಗೆ, ಈ ಪುಟ ನಿಮ್ಮ ಸ್ಥಿತಿಗೆ ಬ್ಯಾಂಕಿನ ದಾಖಲೆ ಬೇಡಿಕೆಗಳನ್ನು ನಿರ್ಣಯಿಸಲಾಗುವುದಿಲ್ಲ.",
    changeAnswers: "ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಬದಲಾಯಿಸಿ",
    answerQuestions: "ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ",
    notGradingHeading: "ನಾವು ಈ ಪಟ್ಟಿಯನ್ನು ಗ್ರೇಡ್ ಮಾಡುವುದಿಲ್ಲ",
    aboveThresholdBody: "ಮಿತಿಯಲ್ಲಿ ಅಥವಾ ಅದಕ್ಕಿಂತ ಮೇಲೆ, ಪ್ಯಾರಾ 10(b) ಬ್ಯಾಂಕಿಗೆ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಸಮಾನ, ಅಥವಾ ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರ, ಅಥವಾ ಅಧಿಕಾರಿಯ ಮುಂದೆ ಪ್ರಮಾಣ ಮಾಡಿದ ಅಫಿಡವಿಟ್ ಕೇಳಲು ಅನುಮತಿಸುತ್ತದೆ. ನಿಮ್ಮ ಬೇಡಿಕೆಗಳನ್ನು ಹೋಲಿಸಲು ಯಾವುದೇ ಮುಚ್ಚಿದ ಪಟ್ಟಿ ಇಲ್ಲ, ಆದ್ದರಿಂದ ಅವುಗಳಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಅತಿರೇಕ ಎಂದು ಕರೆಯುವುದು ತಪ್ಪಾಗುತ್ತದೆ — ಮತ್ತು ನೀವು ಸೋಲುವ ಪ್ರಕರಣವನ್ನು ವಾದಿಸಲು ಕಳುಹಿಸುತ್ತದೆ.",
    incompleteBody: "ನಿಮ್ಮ ಅರ್ಹತಾ ಪರಿಶೀಲನೆಗಳು ಅಪೂರ್ಣವಾಗಿವೆ ಅಥವಾ ಪ್ರತ್ಯೇಕ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ. ಬ್ಯಾಂಕಿನ ಬೇಡಿಕೆಗಳನ್ನು ಪಟ್ಟಿಯೊಂದಿಗೆ ಹೋಲಿಸುವ ಮೊದಲು ಕ್ಲೇಮ್ ಗೈಡ್‌ನಲ್ಲಿ ವಿವರಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    whatRbiSaysHeading: "RBI ಯ ಪಟ್ಟಿ ಪ್ರತಿಯೊಂದರ ಬಗ್ಗೆ ಏನು ಹೇಳುತ್ತದೆ",
    notInListHeading: (count) => `${count} ನಿಮ್ಮ ಸ್ಥಿತಿಗೆ RBI ಯ ಪಟ್ಟಿಯಲ್ಲಿ ಇಲ್ಲ`,
    notInListLede: "ಇದರಿಂದ ಬೇಡಿಕೆ ಅಕ್ರಮವಾಗುವುದಿಲ್ಲ. ಇದರರ್ಥ RBI ಯ ಸ್ವಂತ ನಿರ್ದೇಶನಗಳು ಇದನ್ನು ಇಲ್ಲಿ ನಿಗದಿಪಡಿಸುವುದಿಲ್ಲ — ಇದನ್ನು ಲಿಖಿತವಾಗಿ ಎತ್ತುವುದು ಮತ್ತು ಅವರು ಯಾವ ನಿಯಮದ ಆಧಾರದಲ್ಲಿ ಎಂದು ಹೆಸರಿಸಲು ಅಧಿಕಾರಿಯನ್ನು ಕೇಳುವುದು ಸಮಂಜಸ.",
    notInListTag: "ಪಟ್ಟಿಯಲ್ಲಿ ಇಲ್ಲ",
    inListHeading: (count) => `${count} RBI ನಿಜವಾಗಿ ನಿಗದಿಪಡಿಸುತ್ತದೆ`,
    inListLede: "ಇವು ಕಾನೂನುಬದ್ಧ. ಇವುಗಳನ್ನು ಕೇಳುವುದು ಬ್ಯಾಂಕ್ ನಿಯಮವನ್ನು ಅನುಸರಿಸುವುದು, ಅತಿರೇಕವಲ್ಲ.",
    inListTag: "ಪಟ್ಟಿಯಲ್ಲಿ",
    printFooterNote: "ಪ್ಯಾರಾಗ್ರಾಫ್ ಸಂಖ್ಯೆಗಳನ್ನೂ ಜೊತೆಗೆ ತೆಗೆದುಕೊಂಡು ಹೋಗುತ್ತದೆ, ಇದರಿಂದ ಅಧಿಕಾರಿ ಪ್ರತಿಯೊಂದನ್ನೂ ಪರಿಶೀಲಿಸಬಹುದು.",
    footerCompared: (title, number, issued) => `${title} · ${number} ನೊಂದಿಗೆ ಹೋಲಿಸಲಾಗಿದೆ, ಬಿಡುಗಡೆ ${issued}. ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆ ಅಲ್ಲ. ನಿಮ್ಮ ಟಿಕ್‌ಗಳು ಪುಟದ URL ನಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ, ಮತ್ತು ಇಲ್ಲಿ ಯಾವುದೂ ನಿಮ್ಮನ್ನು ಗುರುತಿಸುವುದಿಲ್ಲ — ನಾವು ಎಷ್ಟು ವಸ್ತುಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಎಂದು ಮಾತ್ರ ಎಣಿಸುತ್ತೇವೆ, ಯಾವುದನ್ನೂ ಅಲ್ಲ.`,
    countWord: (n) => n === 1 ? "ಒಂದು ವಸ್ತು" : `${["", "ಒಂದು", "ಎರಡು", "ಮೂರು", "ನಾಲ್ಕು", "ಐದು", "ಆರು", "ಏಳು", "ಎಂಟು", "ಒಂಬತ್ತು", "ಹತ್ತು", "ಹನ್ನೊಂದು"][n] ?? n} ವಸ್ತುಗಳು`,
  },
};

export const HOME_T: Record<Locale, HomeDict> = { en, hi, kn };
