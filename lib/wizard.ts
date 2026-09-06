/** URL-based guidance. Unknown facts never establish eligibility.
 * Source: RBI deceased-customer directions, paragraphs 7–11.
 * Answers are sent in page URLs; never put names or account numbers here.
 *
 * Question content translated 5 Sep 2026 into Hindi and Kannada
 * (QUESTIONS_BY_LOCALE) -- these are Adhikaar's own plain-language prompts,
 * not statutory quotes, so translating them is correct. Option `value`s
 * (the enum strings like "deposit", "yes", "unknown") never change across
 * locales -- they are wizard state carried in the URL, not display text --
 * so validation in parseAnswers() checks against the English set only.
 * Unchecked by a native speaker, same as the rest of the site.
 */
import type { Locale } from "./i18n";
import type { OutcomeId } from "./outcomes";

export type QuestionId = "claiming" | "court" | "nominee" | "will" | "heirs" | "bankType" | "amount";
export type Answers = Partial<{
  claiming: "deposit-account" | "deposit-fd" | "deposit-both" | "locker" | "pension" | "other" | "minor";
  court: "yes" | "no" | "unknown";
  nominee: "yes" | "survivorship" | "no" | "unknown";
  will: "yes" | "no" | "unknown";
  heirs: "agree" | "dispute" | "unknown";
  bankType: "commercial" | "cooperative" | "unknown";
  amount: "under" | "equal" | "over" | "unknown";
}>;
export type Option = { value: string; label: string; detail?: string; unsure?: boolean };
export type Question = { id: QuestionId; number: number; prompt: string; help: string; options: Option[] };

/**
 * Reordered 6 Sep 2026 night, per direct request after live-testing showed
 * real friction: every scenario-card entry ("There was a nominee", "no
 * nominee, or not sure") landed on the unrelated court-restriction question
 * immediately after the user had just told the site their situation via the
 * card they clicked. Moved nominee ahead of court -- NOT all the way to
 * "right before bank/amount" as an earlier advisor review literally
 * suggested, which analysis (recorded in the vault's checkpoint note) showed
 * would be a real safety regression: para 8(ii) requires no restraining
 * court order even for a NOMINEE payment, and nominee/survivorship
 * short-circuit straight to an outcome in resolve() below. Court is still
 * asked -- and still gates every outcome -- immediately after nominee,
 * before any done() call; only its position in the ask order moved.
 */
export const QUESTION_ORDER: QuestionId[] = ["claiming", "nominee", "court", "will", "heirs", "bankType", "amount"];
export const TOTAL_QUESTIONS = QUESTION_ORDER.length;

const unknownEn: Option = { value: "unknown", label: "I don't know yet", unsure: true };

const en: Record<QuestionId, Question> = {
  claiming: {
    id: "claiming", number: 1, prompt: "What are you claiming?",
    help: "",
    options: [
      { value: "deposit-account", label: "A bank account", detail: "Savings or current." },
      { value: "deposit-fd", label: "A bank deposit", detail: "Term or recurring deposit." },
      { value: "deposit-both", label: "Both", detail: "A bank account and a deposit, at the same bank." },
      // The exit. Without it, someone claiming a pension, an insurance policy,
      // a locker or PPF is walked through bank-deposit guidance that does not
      // apply to them -- and resolve()'s out-of-scope branch was unreachable,
      // because no option could produce a non-deposit value.
      { value: "other", label: "Something else, or I'm not sure", detail: "A locker, pension, insurance, provident fund, shares — or you don't know yet.", unsure: true },
    ],
  },
  court: {
    id: "court", number: 3, prompt: "Is there a court order stopping the bank from paying?",
    help: "A court order stopping payment is different from simply having a court case. If you are unsure, ask the bank whether it knows of such an order.",
    options: [{ value: "no", label: "No such court order is known" }, { value: "yes", label: "Yes, a court order is stopping payment" }, unknownEn],
  },
  nominee: {
    id: "nominee", number: 2, prompt: "Was someone named in the bank records to receive the money?",
    help: "This person is called a nominee. Check the bank's records. For a joint account, a surviving holder may qualify under an 'either or survivor' instruction.",
    options: [
      { value: "yes", label: "Yes, there is a registered nominee", detail: "The sole account holder, or all joint depositors, have died." },
      { value: "survivorship", label: "A joint holder survives", detail: "The account says 'either or survivor' or similar words." },
      { value: "no", label: "No one was named, and no joint-holder instruction applies" }, unknownEn,
    ],
  },
  will: {
    id: "will", number: 4, prompt: "Did the person leave a will?",
    help: "A will can change which documents the bank asks for. If you have not checked, choose 'I don't know yet'.",
    options: [{ value: "no", label: "No will was left" }, { value: "yes", label: "Yes, there is a will" }, unknownEn],
  },
  heirs: {
    id: "heirs", number: 5, prompt: "Does everyone entitled to inherit agree?",
    help: "If family members disagree about who should receive the money, the standard checklist may not apply. Get advice before relying on it.",
    options: [{ value: "agree", label: "Yes, everyone agrees" }, { value: "dispute", label: "No, family members disagree" }, unknownEn],
  },
  bankType: {
    id: "bankType", number: 6, prompt: "What kind of bank is it?",
    help: "The RBI threshold is ₹5 lakh for co-operative banks and ₹15 lakh for other banks. Your bank may set a higher limit, so ask the branch to confirm.",
    options: [{ value: "commercial", label: "A regular commercial bank", detail: "For example, SBI, PNB, HDFC Bank or ICICI Bank." }, { value: "cooperative", label: "A co-operative bank" }, unknownEn],
  },
  amount: {
    id: "amount", number: 7, prompt: "How much money is held at this bank in total?",
    help: "Add all of this person's accounts at this bank, including interest. Money at another bank is counted separately.",
    options: [{ value: "under", label: "Below the threshold" }, { value: "equal", label: "Exactly at the threshold" }, { value: "over", label: "Above the threshold" }, unknownEn],
  },
};

const unknownHi: Option = { value: "unknown", label: "मुझे अभी नहीं पता", unsure: true };

const hi: Record<QuestionId, Question> = {
  claiming: {
    id: "claiming", number: 1, prompt: "आप किस पर दावा कर रहे हैं?",
    help: "",
    options: [
      { value: "deposit-account", label: "बैंक खाता", detail: "बचत या चालू खाता।" },
      { value: "deposit-fd", label: "बैंक जमा", detail: "सावधि या आवर्ती जमा।" },
      { value: "deposit-both", label: "दोनों", detail: "एक ही बैंक में खाता और जमा, दोनों।" },
      { value: "other", label: "कुछ और, या मुझे यक़ीन नहीं है", detail: "लॉकर, पेंशन, बीमा, भविष्य निधि, शेयर — या आपको अभी पता नहीं है।", unsure: true },
    ],
  },
  court: {
    id: "court", number: 3, prompt: "क्या कोई अदालती आदेश बैंक को भुगतान करने से रोक रहा है?",
    help: "भुगतान रोकने वाला अदालती आदेश होना केवल अदालती मामला होने से अलग है। अगर आपको यक़ीन न हो, तो बैंक से पूछें कि क्या उसे ऐसे किसी आदेश की जानकारी है।",
    options: [{ value: "no", label: "ऐसा कोई अदालती आदेश ज्ञात नहीं है" }, { value: "yes", label: "हाँ, एक अदालती आदेश भुगतान रोक रहा है" }, unknownHi],
  },
  nominee: {
    id: "nominee", number: 2, prompt: "क्या बैंक के रिकॉर्ड में पैसा पाने के लिए किसी का नाम दर्ज था?",
    help: "इस व्यक्ति को नामांकित व्यक्ति (नॉमिनी) कहा जाता है। बैंक के रिकॉर्ड जाँचें। संयुक्त खाते में, जीवित धारक 'either or survivor' निर्देश के तहत पात्र हो सकता है।",
    options: [
      { value: "yes", label: "हाँ, एक पंजीकृत नामांकित व्यक्ति है", detail: "एकल खाताधारक, या सभी संयुक्त जमाकर्ता, गुज़र चुके हैं।" },
      { value: "survivorship", label: "एक संयुक्त धारक जीवित है", detail: "खाते में 'either or survivor' या इससे मिलते-जुलते शब्द लिखे हैं।" },
      { value: "no", label: "किसी का नाम दर्ज नहीं था, और कोई संयुक्त-धारक निर्देश लागू नहीं होता" }, unknownHi,
    ],
  },
  will: {
    id: "will", number: 4, prompt: "क्या व्यक्ति ने वसीयत छोड़ी थी?",
    help: "वसीयत इस बात को बदल सकती है कि बैंक कौन से दस्तावेज़ माँगता है। अगर आपने जाँचा नहीं है, तो 'मुझे अभी नहीं पता' चुनें।",
    options: [{ value: "no", label: "कोई वसीयत नहीं छोड़ी गई" }, { value: "yes", label: "हाँ, एक वसीयत है" }, unknownHi],
  },
  heirs: {
    id: "heirs", number: 5, prompt: "क्या विरासत पाने के हक़दार सभी लोग सहमत हैं?",
    help: "अगर परिवार के सदस्य इस बात पर असहमत हैं कि पैसा किसे मिलना चाहिए, तो मानक सूची लागू नहीं हो सकती। इस पर भरोसा करने से पहले सलाह लें।",
    options: [{ value: "agree", label: "हाँ, सभी सहमत हैं" }, { value: "dispute", label: "नहीं, परिवार के सदस्य असहमत हैं" }, unknownHi],
  },
  bankType: {
    id: "bankType", number: 6, prompt: "यह किस तरह का बैंक है?",
    help: "आरबीआई की सीमा सहकारी बैंकों के लिए ₹5 लाख और अन्य बैंकों के लिए ₹15 लाख है। आपका बैंक इससे ऊँची सीमा रख सकता है, इसलिए शाखा से पुष्टि करने को कहें।",
    options: [{ value: "commercial", label: "एक सामान्य वाणिज्यिक बैंक", detail: "उदाहरण के लिए, एसबीआई, पीएनबी, एचडीएफ़सी बैंक या आईसीआईसीआई बैंक।" }, { value: "cooperative", label: "एक सहकारी बैंक" }, unknownHi],
  },
  amount: {
    id: "amount", number: 7, prompt: "इस बैंक में कुल मिलाकर कितना पैसा है?",
    help: "इस बैंक में व्यक्ति के सभी खातों को ब्याज सहित जोड़ें। किसी अन्य बैंक का पैसा अलग से गिना जाता है।",
    options: [{ value: "under", label: "सीमा से कम" }, { value: "equal", label: "ठीक सीमा के बराबर" }, { value: "over", label: "सीमा से ज़्यादा" }, unknownHi],
  },
};

const unknownKn: Option = { value: "unknown", label: "ನನಗೆ ಇನ್ನೂ ಗೊತ್ತಿಲ್ಲ", unsure: true };

const kn: Record<QuestionId, Question> = {
  claiming: {
    id: "claiming", number: 1, prompt: "ನೀವು ಯಾವುದಕ್ಕೆ ಹಕ್ಕು ಸಲ್ಲಿಸುತ್ತಿದ್ದೀರಿ?",
    help: "",
    options: [
      { value: "deposit-account", label: "ಬ್ಯಾಂಕ್ ಖಾತೆ", detail: "ಉಳಿತಾಯ ಅಥವಾ ಚಾಲ್ತಿ ಖಾತೆ." },
      { value: "deposit-fd", label: "ಬ್ಯಾಂಕ್ ಠೇವಣಿ", detail: "ಸ್ಥಿರ ಅಥವಾ ಪುನರಾವರ್ತಿತ ಠೇವಣಿ." },
      { value: "deposit-both", label: "ಎರಡೂ", detail: "ಒಂದೇ ಬ್ಯಾಂಕಿನಲ್ಲಿ ಖಾತೆ ಮತ್ತು ಠೇವಣಿ, ಎರಡೂ." },
      { value: "other", label: "ಬೇರೆ ಏನಾದರೂ, ಅಥವಾ ನನಗೆ ಖಚಿತವಿಲ್ಲ", detail: "ಲಾಕರ್, ಪಿಂಚಣಿ, ವಿಮೆ, ಭವಿಷ್ಯ ನಿಧಿ, ಷೇರುಗಳು — ಅಥವಾ ನಿಮಗೆ ಇನ್ನೂ ಗೊತ್ತಿಲ್ಲ.", unsure: true },
    ],
  },
  court: {
    id: "court", number: 3, prompt: "ಬ್ಯಾಂಕ್ ಪಾವತಿಸದಂತೆ ತಡೆಯುವ ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಆದೇಶವಿದೆಯೇ?",
    help: "ಪಾವತಿಯನ್ನು ತಡೆಯುವ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಇರುವುದು, ಕೇವಲ ನ್ಯಾಯಾಲಯದ ಪ್ರಕರಣ ಇರುವುದಕ್ಕಿಂತ ಬೇರೆ. ಖಚಿತವಿಲ್ಲದಿದ್ದರೆ, ಅಂತಹ ಆದೇಶದ ಬಗ್ಗೆ ಬ್ಯಾಂಕಿಗೆ ಗೊತ್ತಿದೆಯೇ ಎಂದು ಕೇಳಿ.",
    options: [{ value: "no", label: "ಅಂತಹ ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ತಿಳಿದಿಲ್ಲ" }, { value: "yes", label: "ಹೌದು, ಒಂದು ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಪಾವತಿಯನ್ನು ತಡೆಯುತ್ತಿದೆ" }, unknownKn],
  },
  nominee: {
    id: "nominee", number: 2, prompt: "ಹಣ ಪಡೆಯಲು ಬ್ಯಾಂಕಿನ ದಾಖಲೆಗಳಲ್ಲಿ ಯಾರಾದರೂ ಹೆಸರಿಸಲ್ಪಟ್ಟಿದ್ದರೇ?",
    help: "ಈ ವ್ಯಕ್ತಿಯನ್ನು ನಾಮನಿರ್ದೇಶಿತರು ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ಬ್ಯಾಂಕಿನ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ಜಂಟಿ ಖಾತೆಯಲ್ಲಿ, ಜೀವಂತ ಇರುವ ಧಾರಕರು 'either or survivor' ಸೂಚನೆಯಡಿ ಅರ್ಹರಾಗಬಹುದು.",
    options: [
      { value: "yes", label: "ಹೌದು, ನೋಂದಾಯಿತ ನಾಮನಿರ್ದೇಶಿತರು ಇದ್ದಾರೆ", detail: "ಏಕೈಕ ಖಾತೆದಾರರು, ಅಥವಾ ಎಲ್ಲಾ ಜಂಟಿ ಠೇವಣಿದಾರರು, ಮರಣ ಹೊಂದಿದ್ದಾರೆ." },
      { value: "survivorship", label: "ಒಬ್ಬ ಜಂಟಿ ಧಾರಕರು ಜೀವಂತ ಇದ್ದಾರೆ", detail: "ಖಾತೆಯಲ್ಲಿ 'either or survivor' ಅಥವಾ ಇದೇ ರೀತಿಯ ಪದಗಳು ಬರೆಯಲಾಗಿದೆ." },
      { value: "no", label: "ಯಾರೂ ಹೆಸರಿಸಲ್ಪಟ್ಟಿಲ್ಲ, ಮತ್ತು ಯಾವುದೇ ಜಂಟಿ-ಧಾರಕ ಸೂಚನೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ" }, unknownKn,
    ],
  },
  will: {
    id: "will", number: 4, prompt: "ವ್ಯಕ್ತಿ ವಿಲ್ ಬಿಟ್ಟುಹೋಗಿದ್ದರೇ?",
    help: "ವಿಲ್ ಬ್ಯಾಂಕ್ ಯಾವ ದಾಖಲೆಗಳನ್ನು ಕೇಳುತ್ತದೆ ಎಂಬುದನ್ನು ಬದಲಾಯಿಸಬಹುದು. ನೀವು ಪರಿಶೀಲಿಸದಿದ್ದರೆ, 'ನನಗೆ ಇನ್ನೂ ಗೊತ್ತಿಲ್ಲ' ಆಯ್ಕೆಮಾಡಿ.",
    options: [{ value: "no", label: "ಯಾವುದೇ ವಿಲ್ ಬಿಟ್ಟಿಲ್ಲ" }, { value: "yes", label: "ಹೌದು, ಒಂದು ವಿಲ್ ಇದೆ" }, unknownKn],
  },
  heirs: {
    id: "heirs", number: 5, prompt: "ಆಸ್ತಿ ಪಡೆಯಲು ಅರ್ಹರಾದ ಎಲ್ಲರೂ ಒಪ್ಪುತ್ತಾರೆಯೇ?",
    help: "ಹಣ ಯಾರಿಗೆ ಸಿಗಬೇಕು ಎಂಬುದರ ಬಗ್ಗೆ ಕುಟುಂಬ ಸದಸ್ಯರು ಭಿನ್ನಾಭಿಪ್ರಾಯ ಹೊಂದಿದ್ದರೆ, ಪ್ರಮಾಣಿತ ಪಟ್ಟಿ ಅನ್ವಯಿಸದೇ ಇರಬಹುದು. ಇದನ್ನು ಅವಲಂಬಿಸುವ ಮೊದಲು ಸಲಹೆ ಪಡೆಯಿರಿ.",
    options: [{ value: "agree", label: "ಹೌದು, ಎಲ್ಲರೂ ಒಪ್ಪುತ್ತಾರೆ" }, { value: "dispute", label: "ಇಲ್ಲ, ಕುಟುಂಬ ಸದಸ್ಯರು ಭಿನ್ನಾಭಿಪ್ರಾಯ ಹೊಂದಿದ್ದಾರೆ" }, unknownKn],
  },
  bankType: {
    id: "bankType", number: 6, prompt: "ಇದು ಯಾವ ರೀತಿಯ ಬ್ಯಾಂಕ್?",
    help: "ಆರ್‌ಬಿಐ ಮಿತಿ ಸಹಕಾರಿ ಬ್ಯಾಂಕುಗಳಿಗೆ ₹5 ಲಕ್ಷ ಮತ್ತು ಇತರ ಬ್ಯಾಂಕುಗಳಿಗೆ ₹15 ಲಕ್ಷ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಹೆಚ್ಚಿನ ಮಿತಿಯನ್ನು ನಿಗದಿಪಡಿಸಿರಬಹುದು, ಆದ್ದರಿಂದ ಶಾಖೆಯನ್ನು ಖಚಿತಪಡಿಸಲು ಕೇಳಿ.",
    options: [{ value: "commercial", label: "ಒಂದು ಸಾಮಾನ್ಯ ವಾಣಿಜ್ಯ ಬ್ಯಾಂಕ್", detail: "ಉದಾಹರಣೆಗೆ, ಎಸ್‌ಬಿಐ, ಪಿಎನ್‌ಬಿ, ಎಚ್‌ಡಿಎಫ್‌ಸಿ ಬ್ಯಾಂಕ್ ಅಥವಾ ಐಸಿಐಸಿಐ ಬ್ಯಾಂಕ್." }, { value: "cooperative", label: "ಒಂದು ಸಹಕಾರಿ ಬ್ಯಾಂಕ್" }, unknownKn],
  },
  amount: {
    id: "amount", number: 7, prompt: "ಈ ಬ್ಯಾಂಕಿನಲ್ಲಿ ಒಟ್ಟು ಎಷ್ಟು ಹಣವಿದೆ?",
    help: "ಈ ಬ್ಯಾಂಕಿನಲ್ಲಿರುವ ಈ ವ್ಯಕ್ತಿಯ ಎಲ್ಲಾ ಖಾತೆಗಳನ್ನು ಬಡ್ಡಿ ಸೇರಿಸಿ ಒಟ್ಟುಗೂಡಿಸಿ. ಬೇರೆ ಬ್ಯಾಂಕಿನ ಹಣವನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಎಣಿಸಲಾಗುತ್ತದೆ.",
    options: [{ value: "under", label: "ಮಿತಿಗಿಂತ ಕಡಿಮೆ" }, { value: "equal", label: "ಮಿತಿಗೆ ಸರಿಯಾಗಿ ಸಮ" }, { value: "over", label: "ಮಿತಿಗಿಂತ ಹೆಚ್ಚು" }, unknownKn],
  },
};

export const QUESTIONS_BY_LOCALE: Record<Locale, Record<QuestionId, Question>> = { en, hi, kn };

/** Kept for any existing import sites -- English map, same as before. */
export const QUESTIONS = en;

const AMOUNT_LIMIT_LABEL = {
  en: { under: (l: string) => `Less than ${l}`, equal: (l: string) => `Exactly ${l}`, over: (l: string) => `More than ${l}` },
  hi: { under: (l: string) => `${l} से कम`, equal: (l: string) => `ठीक ${l} के बराबर`, over: (l: string) => `${l} से ज़्यादा` },
  kn: { under: (l: string) => `${l} ಕ್ಕಿಂತ ಕಡಿಮೆ`, equal: (l: string) => `ಸರಿಯಾಗಿ ${l}`, over: (l: string) => `${l} ಕ್ಕಿಂತ ಹೆಚ್ಚು` },
} as const;

const AMOUNT_LIMIT_NOTE = {
  en: " A higher published bank limit may change the route.",
  hi: " बैंक की प्रकाशित ऊँची सीमा रास्ता बदल सकती है।",
  kn: " ಬ್ಯಾಂಕಿನ ಪ್ರಕಟಿತ ಹೆಚ್ಚಿನ ಮಿತಿ ಮಾರ್ಗವನ್ನು ಬದಲಾಯಿಸಬಹುದು.",
} as const;

const THRESHOLD_LABEL = {
  en: { cooperative: "₹5 lakh", other: "₹15 lakh" },
  hi: { cooperative: "₹5 लाख", other: "₹15 लाख" },
  kn: { cooperative: "₹5 ಲಕ್ಷ", other: "₹15 ಲಕ್ಷ" },
} as const;

export function questionFor(id: QuestionId, a: Answers, locale: Locale = "en"): Question {
  const questions = QUESTIONS_BY_LOCALE[locale];
  if (id !== "amount") return questions[id];
  const limit = a.bankType === "cooperative" ? THRESHOLD_LABEL[locale].cooperative : THRESHOLD_LABEL[locale].other;
  const labelFor = AMOUNT_LIMIT_LABEL[locale];
  return {
    ...questions.amount, help: questions.amount.help + AMOUNT_LIMIT_NOTE[locale],
    options: questions.amount.options.map(o => o.value === "unknown" ? o : {
      ...o, label: o.value === "under" ? labelFor.under(limit) : o.value === "equal" ? labelFor.equal(limit) : labelFor.over(limit),
    }),
  };
}
export type Resolution =
  | { kind: "question"; question: Question }
  | { kind: "review"; carry: Answers }
  | { kind: "outcome"; outcome: OutcomeId; carry: Answers };

export function resolve(a: Answers, locale: Locale = "en"): Resolution {
  const ask = (id: QuestionId): Resolution => ({ kind: "question", question: questionFor(id, a, locale) });
  const review = (): Resolution => ({ kind: "review", carry: a });
  const done = (outcome: OutcomeId): Resolution => ({ kind: "outcome", outcome, carry: a });
  if (!a.claiming) return ask("claiming");
  if (a.claiming !== "deposit-account" && a.claiming !== "deposit-fd" && a.claiming !== "deposit-both") return done("out-of-scope");
  if (!a.nominee) return ask("nominee");
  if (a.nominee === "unknown") return done("unknown-nominee");
  // A known dispute needs individual review, not a blanket statement that a
  // valid nominee must obtain succession documents.
  if (a.heirs === "dispute" && a.nominee !== "no") return review();
  // Court still gates every outcome below, asked right after nominee is
  // known rather than before it -- see QUESTION_ORDER's comment for why
  // this can't move any further down without becoming unsafe.
  if (!a.court) return ask("court");
  if (a.court !== "no") return review();
  if (a.nominee === "yes") return done("nominee");
  if (a.nominee === "survivorship") return done("survivorship");
  if (!a.will) return ask("will");
  if (a.will !== "no") return review();
  if (!a.heirs) return ask("heirs");
  if (a.heirs === "dispute") return done("dispute");
  if (a.heirs === "unknown") return review();
  if (!a.bankType) return ask("bankType");
  if (a.bankType === "unknown") return review();
  if (!a.amount) return ask("amount");
  // Para 10 opens with "less than"; 10(a) says "up to". At equality, confirm.
  if (a.amount === "unknown" || a.amount === "equal") return review();
  return done(a.amount === "over" ? "over-threshold" : "under-threshold");
}
export function parseAnswers(sp: Record<string, string | string[] | undefined>): Answers {
  const a: Answers = {};
  for (const id of QUESTION_ORDER) {
    const raw = sp[id];
    const v = Array.isArray(raw) ? raw[0] : raw;
    if (v && QUESTIONS[id]?.options.some(o => o.value === v)) Object.assign(a, { [id]: v });
  }
  return a;
}
export function toQuery(a: Answers): string {
  const q = new URLSearchParams();
  for (const id of QUESTION_ORDER) if (a[id]) q.set(id, a[id]!);
  return q.size ? `?${q}` : "";
}
/** Changing an earlier answer invalidates later facts (especially bank/amount). */
export function answerQuestion(a: Answers, id: QuestionId, value: string): Answers {
  // Filling a missing court check must not erase a scenario's known dispute
  // or nominee. Bank/amount is different: a new bank type invalidates a
  // previously selected numeric category, including old bookmarked URLs.
  if (a[id] === undefined && id !== "bankType") return parseAnswers({ ...a, [id]: value });
  const next: Answers = {};
  for (const key of QUESTION_ORDER.slice(0, QUESTION_ORDER.indexOf(id))) {
    if (a[key]) Object.assign(next, { [key]: a[key] });
  }
  return parseAnswers({ ...next, [id]: value });
}
export function previousAnswers(a: Answers): Answers | null {
  const answered = QUESTION_ORDER.filter(id => a[id]);
  if (!answered.length) return null;
  const previous = { ...a };
  delete previous[answered[answered.length - 1]];
  return previous;
}
