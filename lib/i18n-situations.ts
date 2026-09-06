import type { Locale } from "./i18n";

/**
 * Copy for the opening screen and the "where to look" page.
 *
 * Its own dictionary, following i18n-documents.ts and i18n-discovery.ts: a
 * surface that did not exist when HomeDict was written, edited by two pages
 * only.
 *
 * ─── Why the opening screen exists ───
 *
 * The journey used to walk the RBI's decision tree in the RBI's order, which
 * meant a reader whose bank had already demanded a succession certificate had
 * to answer seven questions about nominees, wills and thresholds before the
 * product would engage with the thing that had actually happened to them.
 * See docs/superpowers/specs/2026-09-07-claim-journey-rebuild-design.md.
 *
 * The five options are mutually exclusive by construction. Each is something
 * the reader KNOWS happened, never a judgement about which stage they are in:
 * "did the bank ask you for something you didn't understand" is a memory,
 * "are you in the claim process" is an opinion. Two earlier drafts failed
 * this test -- "I have not started" competing with "I don't know where to
 * begin" (the same person), and "I've already started" competing with its own
 * two children.
 *
 * ─── The search page's one hard rule ───
 *
 * Adhikaar runs no search. It has no backend, no data source and no index of
 * anyone's accounts, and the page says so in its own words rather than
 * leaving a reader to infer it from the absence of a search box. Every verb
 * on it is a guidance verb. /discovery's "Start Your Search" wording is
 * deliberately not reused here.
 *
 * Hindi and Kannada have NOT been checked by a native speaker, same standing
 * caveat as the rest of the site.
 */

export type Situation = {
  label: string;
  detail: string;
};

export type SituationsDict = {
  eyebrow: string;
  heading: string;
  sub: string;
  /**
   * The two group labels.
   *
   * The five options are ordered by who actually arrives. PRODUCT.md's primary
   * user "has already been to a bank and been handed a list of demands... they
   * arrive holding a demand, usually for a succession certificate" -- so that
   * situation reads first and carries the weight, and the two not-yet cases sit
   * below their own label rather than competing with it.
   */
  groupSpoken: string;
  groupNotYet: string;
  /** The five options. */
  notStarted: Situation;
  alreadyStarted: Situation;
  askedFor: Situation;
  refused: Situation;
  dontKnow: Situation;

  /**
   * /start/started — the "already started" menu.
   *
   * `notSubmitted` and `inCourt` are the two entries that exist nowhere else.
   * `askedFor` and `refused` repeat the top-level options deliberately: the
   * opening screen serves a reader who identifies by their PROBLEM, this menu
   * serves one who identifies by their STAGE, and both must reach the same
   * page. A reader is never wrong here, only one screen slower.
   */
  started: {
    eyebrow: string;
    heading: string;
    sub: string;
    notSubmitted: Situation;
    askedFor: Situation;
    refused: Situation;
    inCourt: Situation;
    back: string;
  };

  /** /start/find — the two large choices. */
  find: {
    eyebrow: string;
    heading: string;
    sub: string;
    knowBank: Situation;
    dontKnowWhere: Situation;
  };

  /** /start/find/where — the links page. */
  where: {
    eyebrow: string;
    heading: string;
    /** The honesty line. Not optional, not a footnote. */
    noSearch: string;
    udgamName: string;
    udgamWhat: string;
    udgamHow: string;
    portalName: string;
    portalWhat: string;
    iepfName: string;
    iepfWhat: string;
    foundIt: string;
    backToStart: string;
  };
};

const en: SituationsDict = {
  eyebrow: "Where to start",
  groupSpoken: "You have spoken to the bank",
  groupNotYet: "You have not been to the bank yet",
  heading: "What best describes your situation?",
  sub: "Pick the one closest to where you are. You will only be asked the questions that change your answer.",
  notStarted: {
    label: "I have not started the claim",
    detail: "Nobody has been to the bank yet, or you have only been told what to expect.",
  },
  alreadyStarted: {
    label: "I've already started the claim",
    detail: "You have been to the bank — documents submitted, waiting, or something has gone wrong.",
  },
  askedFor: {
    label: "The bank asked for something I don't understand",
    detail: "A succession certificate, a surety or bond, an affidavit, a genealogy, a legal-heir certificate.",
  },
  refused: {
    label: "The bank refused or delayed the claim",
    detail: "No answer, repeated visits, or a flat refusal.",
  },
  dontKnow: {
    label: "I don't know where to begin",
    detail: "You are not sure the money exists, or where it is held.",
  },

  started: {
    eyebrow: "Already started",
    heading: "Where are you now?",
    sub: "You will not be asked to repeat anything that does not change your answer.",
    notSubmitted: {
      label: "I have not submitted documents yet",
      detail: "The bank knows about the death, but nothing has been handed in.",
    },
    askedFor: {
      label: "The bank asked for extra documents",
      detail: "Check what was demanded against what the RBI actually permits.",
    },
    refused: {
      label: "The bank refused, delayed, or has gone quiet",
      detail: "Including a claim submitted and still waiting.",
    },
    inCourt: {
      label: "I have started a court case",
      detail: "Proceedings are already under way over this money.",
    },
    back: "Back to the start",
  },

  find: {
    eyebrow: "Finding the money",
    heading: "Do you know where the money is held?",
    sub: "The two are different problems. Finding an account and claiming one need different places to start.",
    knowBank: {
      label: "Yes — I know the bank and found the deposit",
      detail: "Start the claim journey.",
    },
    dontKnowWhere: {
      label: "No — I don't know where the money is",
      detail: "See the official places to search.",
    },
  },

  where: {
    eyebrow: "Official search tools",
    heading: "Where to look for accounts you don't know about",
    noSearch:
      "Adhikaar does not search for you. We hold no records and no index of anyone's accounts. These are the official services that do.",
    udgamName: "UDGAM — the RBI's search for unclaimed deposits",
    udgamWhat:
      "The Reserve Bank's own portal for deposits left inoperative for ten years or more, searchable across participating banks.",
    udgamHow:
      "You will need the depositor's name and their PAN, date of birth, or another identifier the bank held.",
    portalName: "Your bank's own branch records",
    portalWhat:
      "UDGAM only lists deposits already classified as unclaimed. An account that has been dormant for less than ten years will not appear there — ask the branch directly instead.",
    iepfName: "IEPF — shares and dividends transferred to the government",
    iepfWhat:
      "For company shares, dividends and matured deposits moved to the Investor Education and Protection Fund. A separate process from a bank claim.",
    foundIt: "Found an account? Start the claim →",
    backToStart: "Back to the start",
  },
};

const hi: SituationsDict = {
  eyebrow: "कहाँ से शुरू करें",
  groupSpoken: "आप बैंक जा चुके हैं",
  groupNotYet: "आप अभी बैंक नहीं गए हैं",
  heading: "आपकी स्थिति इनमें से किससे मिलती है?",
  sub: "जो सबसे क़रीब हो उसे चुनें। आपसे केवल वही सवाल पूछे जाएँगे जो आपके जवाब को बदलते हैं।",
  notStarted: {
    label: "मैंने अभी दावा शुरू नहीं किया है",
    detail: "अभी तक कोई बैंक नहीं गया, या आपको केवल बताया गया है कि क्या होगा।",
  },
  alreadyStarted: {
    label: "मैंने दावा शुरू कर दिया है",
    detail: "आप बैंक जा चुके हैं — दस्तावेज़ जमा हैं, इंतज़ार है, या कुछ गड़बड़ हुई है।",
  },
  askedFor: {
    label: "बैंक ने कुछ ऐसा माँगा जो मुझे समझ नहीं आया",
    detail: "उत्तराधिकार प्रमाणपत्र, ज़मानत या बॉन्ड, शपथपत्र, वंशावली, विधिक वारिस प्रमाणपत्र।",
  },
  refused: {
    label: "बैंक ने दावा ठुकरा दिया या टाल रहा है",
    detail: "कोई जवाब नहीं, बार-बार चक्कर, या साफ़ इनकार।",
  },
  dontKnow: {
    label: "मुझे नहीं पता कहाँ से शुरू करूँ",
    detail: "आपको यक़ीन नहीं कि पैसा है, या वह कहाँ रखा है।",
  },

  started: {
    eyebrow: "पहले से शुरू",
    heading: "आप अभी कहाँ हैं?",
    sub: "जो बात आपके जवाब को नहीं बदलती, वह दोबारा नहीं पूछी जाएगी।",
    notSubmitted: {
      label: "मैंने अभी दस्तावेज़ जमा नहीं किए",
      detail: "बैंक को मृत्यु की जानकारी है, पर कुछ जमा नहीं हुआ है।",
    },
    askedFor: {
      label: "बैंक ने अतिरिक्त दस्तावेज़ माँगे",
      detail: "जो माँगा गया उसे RBI की अनुमति से मिलाकर देखें।",
    },
    refused: {
      label: "बैंक ने इनकार किया, देरी की, या चुप है",
      detail: "जमा किया हुआ दावा जो अब भी लंबित है, वह भी इसमें शामिल है।",
    },
    inCourt: {
      label: "मैंने अदालत में मामला शुरू कर दिया है",
      detail: "इस पैसे को लेकर कार्यवाही पहले से चल रही है।",
    },
    back: "शुरुआत पर वापस",
  },

  find: {
    eyebrow: "पैसा ढूँढ़ना",
    heading: "क्या आपको पता है कि पैसा कहाँ रखा है?",
    sub: "ये दो अलग समस्याएँ हैं। खाता ढूँढ़ना और दावा करना — दोनों की शुरुआत अलग जगह से होती है।",
    knowBank: {
      label: "हाँ — मुझे बैंक पता है और जमा मिल गई है",
      detail: "दावे की प्रक्रिया शुरू करें।",
    },
    dontKnowWhere: {
      label: "नहीं — मुझे नहीं पता पैसा कहाँ है",
      detail: "खोज के आधिकारिक साधन देखें।",
    },
  },

  where: {
    eyebrow: "आधिकारिक खोज साधन",
    heading: "अनजान खातों को कहाँ ढूँढ़ें",
    noSearch:
      "अधिकार आपके लिए खोज नहीं करता। हमारे पास किसी के खातों का कोई रिकॉर्ड या सूची नहीं है। नीचे दी गई आधिकारिक सेवाएँ यह काम करती हैं।",
    udgamName: "UDGAM — बिना दावे की जमाओं के लिए RBI की खोज",
    udgamWhat:
      "रिज़र्व बैंक का अपना पोर्टल, उन जमाओं के लिए जो दस साल या उससे अधिक निष्क्रिय रही हैं, कई बैंकों में खोजने योग्य।",
    udgamHow:
      "आपको जमाकर्ता का नाम और उनका PAN, जन्मतिथि, या बैंक के पास मौजूद कोई अन्य पहचान चाहिए होगी।",
    portalName: "आपके अपने बैंक की शाखा के रिकॉर्ड",
    portalWhat:
      "UDGAM केवल उन्हीं जमाओं को दिखाता है जो पहले से बिना दावे की मानी गई हैं। दस साल से कम निष्क्रिय खाता वहाँ नहीं दिखेगा — उसके लिए सीधे शाखा से पूछें।",
    iepfName: "IEPF — सरकार को हस्तांतरित शेयर और लाभांश",
    iepfWhat:
      "कंपनी के शेयर, लाभांश और परिपक्व जमाएँ जो निवेशक शिक्षा एवं संरक्षण कोष में चली गई हैं। यह बैंक दावे से अलग प्रक्रिया है।",
    foundIt: "खाता मिल गया? दावा शुरू करें →",
    backToStart: "शुरुआत पर वापस",
  },
};

const kn: SituationsDict = {
  eyebrow: "ಎಲ್ಲಿಂದ ಪ್ರಾರಂಭಿಸಬೇಕು",
  groupSpoken: "ನೀವು ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿದ್ದೀರಿ",
  groupNotYet: "ನೀವು ಇನ್ನೂ ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿಲ್ಲ",
  heading: "ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿಯನ್ನು ಇವುಗಳಲ್ಲಿ ಯಾವುದು ಸರಿಯಾಗಿ ವಿವರಿಸುತ್ತದೆ?",
  sub: "ಹತ್ತಿರವಾದದ್ದನ್ನು ಆರಿಸಿ. ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಬದಲಾಯಿಸುವ ಪ್ರಶ್ನೆಗಳನ್ನು ಮಾತ್ರ ಕೇಳಲಾಗುತ್ತದೆ.",
  notStarted: {
    label: "ನಾನು ಇನ್ನೂ ಹಕ್ಕು ಸಲ್ಲಿಸಲು ಪ್ರಾರಂಭಿಸಿಲ್ಲ",
    detail: "ಇನ್ನೂ ಯಾರೂ ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿಲ್ಲ, ಅಥವಾ ಏನಾಗುತ್ತದೆ ಎಂದು ಮಾತ್ರ ಹೇಳಲಾಗಿದೆ.",
  },
  alreadyStarted: {
    label: "ನಾನು ಈಗಾಗಲೇ ಹಕ್ಕು ಸಲ್ಲಿಸಲು ಪ್ರಾರಂಭಿಸಿದ್ದೇನೆ",
    detail: "ನೀವು ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿದ್ದೀರಿ — ದಾಖಲೆ ಸಲ್ಲಿಸಿದೆ, ಕಾಯುತ್ತಿದೆ, ಅಥವಾ ಏನೋ ತಪ್ಪಾಗಿದೆ.",
  },
  askedFor: {
    label: "ಬ್ಯಾಂಕ್ ನನಗೆ ಅರ್ಥವಾಗದ ಏನನ್ನೋ ಕೇಳಿತು",
    detail: "ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಜಾಮೀನು ಅಥವಾ ಬಾಂಡ್, ಪ್ರಮಾಣಪತ್ರ, ವಂಶಾವಳಿ, ಕಾನೂನುಬದ್ಧ ವಾರಸು ಪ್ರಮಾಣಪತ್ರ.",
  },
  refused: {
    label: "ಬ್ಯಾಂಕ್ ಹಕ್ಕನ್ನು ನಿರಾಕರಿಸಿತು ಅಥವಾ ವಿಳಂಬ ಮಾಡಿತು",
    detail: "ಉತ್ತರವಿಲ್ಲ, ಪದೇ ಪದೇ ಭೇಟಿ, ಅಥವಾ ಸ್ಪಷ್ಟ ನಿರಾಕರಣೆ.",
  },
  dontKnow: {
    label: "ಎಲ್ಲಿಂದ ಪ್ರಾರಂಭಿಸಬೇಕೆಂದು ನನಗೆ ಗೊತ್ತಿಲ್ಲ",
    detail: "ಹಣ ಇದೆಯೇ, ಅಥವಾ ಎಲ್ಲಿದೆ ಎಂಬ ಬಗ್ಗೆ ನಿಮಗೆ ಖಚಿತವಿಲ್ಲ.",
  },

  started: {
    eyebrow: "ಈಗಾಗಲೇ ಪ್ರಾರಂಭವಾಗಿದೆ",
    heading: "ನೀವು ಈಗ ಎಲ್ಲಿದ್ದೀರಿ?",
    sub: "ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಬದಲಾಯಿಸದ ಯಾವುದನ್ನೂ ಮತ್ತೆ ಕೇಳಲಾಗುವುದಿಲ್ಲ.",
    notSubmitted: {
      label: "ನಾನು ಇನ್ನೂ ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಿಲ್ಲ",
      detail: "ಸಾವಿನ ಬಗ್ಗೆ ಬ್ಯಾಂಕಿಗೆ ಗೊತ್ತಿದೆ, ಆದರೆ ಏನನ್ನೂ ಸಲ್ಲಿಸಿಲ್ಲ.",
    },
    askedFor: {
      label: "ಬ್ಯಾಂಕ್ ಹೆಚ್ಚುವರಿ ದಾಖಲೆಗಳನ್ನು ಕೇಳಿತು",
      detail: "ಕೇಳಿದ್ದನ್ನು RBI ವಾಸ್ತವವಾಗಿ ಅನುಮತಿಸುವುದರೊಂದಿಗೆ ಹೋಲಿಸಿ ನೋಡಿ.",
    },
    refused: {
      label: "ಬ್ಯಾಂಕ್ ನಿರಾಕರಿಸಿತು, ವಿಳಂಬ ಮಾಡಿತು, ಅಥವಾ ಸುಮ್ಮನಿದೆ",
      detail: "ಸಲ್ಲಿಸಿದ ನಂತರ ಇನ್ನೂ ಕಾಯುತ್ತಿರುವ ಹಕ್ಕೂ ಇದರಲ್ಲಿ ಸೇರಿದೆ.",
    },
    inCourt: {
      label: "ನಾನು ನ್ಯಾಯಾಲಯದ ಪ್ರಕರಣ ಪ್ರಾರಂಭಿಸಿದ್ದೇನೆ",
      detail: "ಈ ಹಣದ ಬಗ್ಗೆ ಈಗಾಗಲೇ ವಿಚಾರಣೆ ನಡೆಯುತ್ತಿದೆ.",
    },
    back: "ಪ್ರಾರಂಭಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  },

  find: {
    eyebrow: "ಹಣವನ್ನು ಹುಡುಕುವುದು",
    heading: "ಹಣ ಎಲ್ಲಿದೆ ಎಂದು ನಿಮಗೆ ಗೊತ್ತೇ?",
    sub: "ಇವು ಎರಡು ಬೇರೆ ಸಮಸ್ಯೆಗಳು. ಖಾತೆ ಹುಡುಕುವುದು ಮತ್ತು ಹಕ್ಕು ಸಲ್ಲಿಸುವುದು ಬೇರೆ ಬೇರೆ ಸ್ಥಳದಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತವೆ.",
    knowBank: {
      label: "ಹೌದು — ಬ್ಯಾಂಕ್ ಗೊತ್ತು ಮತ್ತು ಠೇವಣಿ ಸಿಕ್ಕಿದೆ",
      detail: "ಹಕ್ಕಿನ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ.",
    },
    dontKnowWhere: {
      label: "ಇಲ್ಲ — ಹಣ ಎಲ್ಲಿದೆ ಎಂದು ಗೊತ್ತಿಲ್ಲ",
      detail: "ಅಧಿಕೃತ ಹುಡುಕಾಟ ಸಾಧನಗಳನ್ನು ನೋಡಿ.",
    },
  },

  where: {
    eyebrow: "ಅಧಿಕೃತ ಹುಡುಕಾಟ ಸಾಧನಗಳು",
    heading: "ಗೊತ್ತಿಲ್ಲದ ಖಾತೆಗಳನ್ನು ಎಲ್ಲಿ ಹುಡುಕಬೇಕು",
    noSearch:
      "ಅಧಿಕಾರ್ ನಿಮಗಾಗಿ ಹುಡುಕುವುದಿಲ್ಲ. ಯಾರದೇ ಖಾತೆಗಳ ದಾಖಲೆ ಅಥವಾ ಸೂಚಿ ನಮ್ಮ ಬಳಿ ಇಲ್ಲ. ಕೆಳಗಿನ ಅಧಿಕೃತ ಸೇವೆಗಳು ಆ ಕೆಲಸ ಮಾಡುತ್ತವೆ.",
    udgamName: "UDGAM — ಹಕ್ಕು ಸಲ್ಲಿಸದ ಠೇವಣಿಗಳಿಗೆ RBI ಯ ಹುಡುಕಾಟ",
    udgamWhat:
      "ಹತ್ತು ವರ್ಷ ಅಥವಾ ಹೆಚ್ಚು ಕಾಲ ನಿಷ್ಕ್ರಿಯವಾಗಿರುವ ಠೇವಣಿಗಳಿಗಾಗಿ ರಿಸರ್ವ್ ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ಪೋರ್ಟಲ್, ಹಲವು ಬ್ಯಾಂಕುಗಳಲ್ಲಿ ಹುಡುಕಬಹುದು.",
    udgamHow:
      "ಠೇವಣಿದಾರರ ಹೆಸರು ಮತ್ತು ಅವರ PAN, ಜನ್ಮ ದಿನಾಂಕ, ಅಥವಾ ಬ್ಯಾಂಕಿನ ಬಳಿ ಇದ್ದ ಬೇರೆ ಗುರುತು ಬೇಕಾಗುತ್ತದೆ.",
    portalName: "ನಿಮ್ಮ ಸ್ವಂತ ಬ್ಯಾಂಕಿನ ಶಾಖೆಯ ದಾಖಲೆಗಳು",
    portalWhat:
      "UDGAM ಈಗಾಗಲೇ ಹಕ್ಕು ಸಲ್ಲಿಸದವು ಎಂದು ಗುರುತಿಸಿದ ಠೇವಣಿಗಳನ್ನು ಮಾತ್ರ ತೋರಿಸುತ್ತದೆ. ಹತ್ತು ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ನಿಷ್ಕ್ರಿಯವಾದ ಖಾತೆ ಅಲ್ಲಿ ಕಾಣಿಸುವುದಿಲ್ಲ — ಅದಕ್ಕಾಗಿ ನೇರವಾಗಿ ಶಾಖೆಯನ್ನು ಕೇಳಿ.",
    iepfName: "IEPF — ಸರ್ಕಾರಕ್ಕೆ ವರ್ಗಾಯಿಸಿದ ಷೇರುಗಳು ಮತ್ತು ಲಾಭಾಂಶ",
    iepfWhat:
      "ಹೂಡಿಕೆದಾರರ ಶಿಕ್ಷಣ ಮತ್ತು ಸಂರಕ್ಷಣಾ ನಿಧಿಗೆ ಹೋದ ಕಂಪನಿ ಷೇರುಗಳು, ಲಾಭಾಂಶ ಮತ್ತು ಪಕ್ವವಾದ ಠೇವಣಿಗಳು. ಇದು ಬ್ಯಾಂಕ್ ಹಕ್ಕಿಗಿಂತ ಬೇರೆ ಪ್ರಕ್ರಿಯೆ.",
    foundIt: "ಖಾತೆ ಸಿಕ್ಕಿತೇ? ಹಕ್ಕು ಪ್ರಾರಂಭಿಸಿ →",
    backToStart: "ಪ್ರಾರಂಭಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  },
};

export const SITUATIONS_T: Record<Locale, SituationsDict> = { en, hi, kn };
