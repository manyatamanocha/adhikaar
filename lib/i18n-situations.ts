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
    foundIt: string;
    backToStart: string;
  };
};

const en: SituationsDict = {
  eyebrow: "Where to start",
  groupSpoken: "You have spoken to the bank",
  groupNotYet: "You have not been to the bank yet",
  heading: "My Claim Process",
  // "Not started the claim" is now framed as not knowing the PROCESS -- same
  // destination, the full wizard. "Don't know from where to start" (dontKnow,
  // below) points straight at /start/find/where since 7 Sep 2026 evening --
  // /start/find, the old two-way fork, is bypassed (still works if visited
  // directly, just has no inbound link from here any more).
  notStarted: {
    label: "I do not know the process",
    detail: "You have not been to the bank yet, and are not sure what happens next.",
  },
  alreadyStarted: {
    label: "I have started the process",
    detail: "You have been to the bank — documents submitted, waiting, or something has gone wrong.",
  },
  // Repurposed 7 Sep 2026: was "The bank asked for something I don't
  // understand" -> /what-were-you-asked-for. That page is still reachable
  // from /start/started's own menu; this slot now points at the standalone
  // document checklist instead.
  askedFor: {
    label: "Need information on documents",
    detail: "See exactly which documents your claim needs, and what the RBI actually requires.",
  },
  // Repurposed 7 Sep 2026: was "The bank refused or delayed the claim" ->
  // /bank-refused, also still reachable from /start/started. This slot is
  // now the genuine catch-all for anything the other four do not cover.
  refused: {
    label: "Others",
    detail: "Not covered above? Write to us directly.",
  },
  dontKnow: {
    label: "I do not know from where to start",
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
    foundIt: "Found an account? Start the claim →",
    backToStart: "Back to the start",
  },
};

const hi: SituationsDict = {
  eyebrow: "कहाँ से शुरू करें",
  groupSpoken: "आप बैंक जा चुके हैं",
  groupNotYet: "आप अभी बैंक नहीं गए हैं",
  heading: "मेरी दावा प्रक्रिया",
  notStarted: {
    label: "मुझे प्रक्रिया नहीं पता",
    detail: "आप अभी बैंक नहीं गए हैं, और आगे क्या होगा यह पक्का नहीं है।",
  },
  alreadyStarted: {
    label: "मैंने प्रक्रिया शुरू कर दी है",
    detail: "आप बैंक जा चुके हैं — दस्तावेज़ जमा हैं, इंतज़ार है, या कुछ गड़बड़ हुई है।",
  },
  askedFor: {
    label: "दस्तावेज़ों की जानकारी चाहिए",
    detail: "देखें आपके दावे के लिए कौन से दस्तावेज़ चाहिए, और आरबीआई असल में क्या माँगता है।",
  },
  refused: {
    label: "अन्य",
    detail: "ऊपर की सूची में नहीं है? सीधे हमें लिखें।",
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
    foundIt: "खाता मिल गया? दावा शुरू करें →",
    backToStart: "शुरुआत पर वापस",
  },
};

const kn: SituationsDict = {
  eyebrow: "ಎಲ್ಲಿಂದ ಪ್ರಾರಂಭಿಸಬೇಕು",
  groupSpoken: "ನೀವು ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿದ್ದೀರಿ",
  groupNotYet: "ನೀವು ಇನ್ನೂ ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿಲ್ಲ",
  heading: "ನನ್ನ ಹಕ್ಕಿನ ಪ್ರಕ್ರಿಯೆ",
  notStarted: {
    label: "ಪ್ರಕ್ರಿಯೆ ನನಗೆ ಗೊತ್ತಿಲ್ಲ",
    detail: "ನೀವು ಇನ್ನೂ ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿಲ್ಲ, ಮತ್ತು ಮುಂದೆ ಏನಾಗುತ್ತದೆ ಎಂದು ಖಚಿತವಿಲ್ಲ.",
  },
  alreadyStarted: {
    label: "ನಾನು ಪ್ರಕ್ರಿಯೆ ಪ್ರಾರಂಭಿಸಿದ್ದೇನೆ",
    detail: "ನೀವು ಬ್ಯಾಂಕಿಗೆ ಹೋಗಿದ್ದೀರಿ — ದಾಖಲೆ ಸಲ್ಲಿಸಿದೆ, ಕಾಯುತ್ತಿದೆ, ಅಥವಾ ಏನೋ ತಪ್ಪಾಗಿದೆ.",
  },
  askedFor: {
    label: "ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಬೇಕು",
    detail: "ನಿಮ್ಮ ಹಕ್ಕಿಗೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು, ಮತ್ತು ಆರ್‌ಬಿಐ ನಿಜವಾಗಿ ಏನು ಕೇಳುತ್ತದೆ ಎಂದು ನೋಡಿ.",
  },
  refused: {
    label: "ಇತರೆ",
    detail: "ಮೇಲಿನದರಲ್ಲಿ ಇಲ್ಲದ್ದೇ? ನೇರವಾಗಿ ನಮಗೆ ಬರೆಯಿರಿ.",
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
    foundIt: "ಖಾತೆ ಸಿಕ್ಕಿತೇ? ಹಕ್ಕು ಪ್ರಾರಂಭಿಸಿ →",
    backToStart: "ಪ್ರಾರಂಭಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  },
};

export const SITUATIONS_T: Record<Locale, SituationsDict> = { en, hi, kn };
