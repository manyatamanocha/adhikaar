import type { Locale } from "./i18n";

/**
 * Recognition cards for the front door of /start.
 *
 * The four-question wizard starts with "What are you claiming?" — correct,
 * but legal-shaped. Most people arrive already able to describe their own
 * situation in plain words ("there was a nominee," "the bank asked for a
 * succession certificate") and would rather recognise themselves than parse
 * a menu of asset types first.
 *
 * Each card is a real URL into the SAME wizard/outcome machinery in
 * wizard.ts and outcomes.ts — nothing here resolves an outcome on its own.
 * `claiming: "deposit"` is preset on every card because every scenario below
 * is, by its own wording, about a bank account; someone who clicks one has
 * already self-selected out of the out-of-scope exit's job (pension, minor
 * claimant, non-deposit assets), which still fires normally for anyone who
 * picks "None of these" and goes through the classic question order instead.
 *
 * "We already started court proceedings" is the one card that does not go
 * through the wizard at all: /already-in-court is a real, built page that
 * resolve() in wizard.ts can never return — nothing anywhere else in the
 * product links to it. This is its first front door.
 *
 * Cut from 7 cards to 3 primary + 4 under "Something else?" on 5 Sep 2026
 * night, per advisor review: seven choices up front felt overwhelming.
 * "There was no nominee" and "We don't know" were also merged into one
 * card ("no nominee, or not sure") -- both land on the same href, since
 * neither presets a `nominee` answer; the wizard's own nominee question
 * (with its own "I don't know yet" option, unmuted, same weight as every
 * other answer) is where that real distinction belongs, not the front door.
 *
 * Translated 5 Sep 2026 into Hindi and Kannada -- labels and details are
 * Adhikaar's own plain-language descriptions, not statutory quotes, so
 * translating them is correct. `href` never changes across locales: the
 * query values (claiming=deposit-account, nominee=yes, etc.) are wizard state, not
 * display text. Unchecked by a native speaker, same as the rest of the site.
 */

export type Scenario = {
  label: string;
  /** One line making the match unambiguous, where the label alone could read as more than one situation. */
  detail?: string;
  href: string;
};

const enPrimary: Scenario[] = [
  {
    label: "The bank asked for a succession certificate",
    detail: "We'll check whether that was the right thing to ask for.",
    href: "/start?claiming=deposit-account",
  },
  {
    label: "There was a nominee on the account",
    href: "/start?claiming=deposit-account&nominee=yes",
  },
  {
    label: "There was no nominee, or I'm not sure",
    href: "/start?claiming=deposit-account",
  },
];

const enMore: Scenario[] = [
  {
    label: "The account was joint, with a survivorship clause",
    detail: "“either or survivor”, “former or survivor”, or similar wording.",
    href: "/start?claiming=deposit-account&nominee=survivorship",
  },
  {
    label: "The legal heirs disagree with each other",
    href: "/start?claiming=deposit-account&heirs=dispute",
  },
  {
    label: "We already started court proceedings",
    detail: "Before the RBI's rules changed on 31 March 2026.",
    href: "/already-in-court",
  },
];

const hiPrimary: Scenario[] = [
  {
    label: "बैंक ने उत्तराधिकार प्रमाणपत्र माँगा",
    detail: "हम जाँचेंगे कि क्या यह माँगना सही था।",
    href: "/start?claiming=deposit-account",
  },
  {
    label: "खाते में एक नामांकित व्यक्ति दर्ज था",
    href: "/start?claiming=deposit-account&nominee=yes",
  },
  {
    label: "कोई नामांकित व्यक्ति नहीं था, या मुझे यक़ीन नहीं है",
    href: "/start?claiming=deposit-account",
  },
];

const hiMore: Scenario[] = [
  {
    label: "यह संयुक्त खाता था, उत्तरजीविता शर्त के साथ",
    detail: "“either or survivor”, “former or survivor”, या इससे मिलते-जुलते शब्द।",
    href: "/start?claiming=deposit-account&nominee=survivorship",
  },
  {
    label: "क़ानूनी उत्तराधिकारी आपस में असहमत हैं",
    href: "/start?claiming=deposit-account&heirs=dispute",
  },
  {
    label: "हम पहले ही अदालती कार्यवाही शुरू कर चुके हैं",
    detail: "आरबीआई के नियम 31 मार्च 2026 को बदलने से पहले।",
    href: "/already-in-court",
  },
];

const knPrimary: Scenario[] = [
  {
    label: "ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಕೇಳಿತು",
    detail: "ಅದನ್ನು ಕೇಳುವುದು ಸರಿಯಾಗಿತ್ತೇ ಎಂದು ನಾವು ಪರಿಶೀಲಿಸುತ್ತೇವೆ.",
    href: "/start?claiming=deposit-account",
  },
  {
    label: "ಖಾತೆಯಲ್ಲಿ ಒಬ್ಬ ನಾಮನಿರ್ದೇಶಿತರು ಇದ್ದರು",
    href: "/start?claiming=deposit-account&nominee=yes",
  },
  {
    label: "ನಾಮನಿರ್ದೇಶಿತರು ಇರಲಿಲ್ಲ, ಅಥವಾ ನನಗೆ ಖಚಿತವಿಲ್ಲ",
    href: "/start?claiming=deposit-account",
  },
];

const knMore: Scenario[] = [
  {
    label: "ಇದು ಜಂಟಿ ಖಾತೆಯಾಗಿತ್ತು, ಉತ್ತರಜೀವಿತ್ವ ಷರತ್ತಿನೊಂದಿಗೆ",
    detail: "“either or survivor”, “former or survivor”, ಅಥವಾ ಇದೇ ರೀತಿಯ ಪದಗಳು.",
    href: "/start?claiming=deposit-account&nominee=survivorship",
  },
  {
    label: "ಕಾನೂನುಬದ್ಧ ಉತ್ತರಾಧಿಕಾರಿಗಳು ಪರಸ್ಪರ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಹೊಂದಿದ್ದಾರೆ",
    href: "/start?claiming=deposit-account&heirs=dispute",
  },
  {
    label: "ನಾವು ಈಗಾಗಲೇ ನ್ಯಾಯಾಲಯದ ವಿಚಾರಣೆ ಪ್ರಾರಂಭಿಸಿದ್ದೇವೆ",
    detail: "ಆರ್‌ಬಿಐ ನಿಯಮಗಳು 31 ಮಾರ್ಚ್ 2026 ರಂದು ಬದಲಾಗುವ ಮೊದಲು.",
    href: "/already-in-court",
  },
];

export const SCENARIOS_BY_LOCALE: Record<Locale, Scenario[]> = {
  en: enPrimary,
  hi: hiPrimary,
  kn: knPrimary,
};

export const MORE_SCENARIOS_BY_LOCALE: Record<Locale, Scenario[]> = {
  en: enMore,
  hi: hiMore,
  kn: knMore,
};

/** Kept for any existing import sites -- English primary array, same as before. */
export const SCENARIOS = enPrimary;
