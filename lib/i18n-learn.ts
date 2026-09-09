/**
 * Translation for the /learn SEO pages -- the index and its five articles.
 *
 * Added 9 Sep 2026: these pages had no locale mechanism at all until now (the
 * only 0%-translated surface left, per the 9 Sep translation audit). Same
 * standing rule as everywhere else in this codebase: a statutory RBI clause
 * (lib/rbi.ts's CLAUSES, SARBATI_DEVI's quoted text) stays English in every
 * locale -- a translated quote is not a quote a branch officer will accept --
 * so only the surrounding prose written here is translated. Bank names,
 * threshold labels ("₹15 lakh") and quoted bank wording also stay English,
 * matching /banks. Document names and TACTICS reuse the existing
 * documentText()/TACTICS_BY_LOCALE translations rather than re-authoring them.
 *
 * Unreviewed by a native speaker, same as the rest of the site's Hindi and
 * Kannada.
 */
import type { Locale } from "./i18n";

type ArticleCopy = {
  /** Shared between the /learn index card and the article's own hero. */
  navTitle: string;
  /** Shorter blurb, shown only on the index card. */
  indexDek: string;
  eyebrow: string;
  /** Longer dek, shown only in the article's own hero. */
  dek: string;
};

export type LearnDict = {
  indexTitle: string;
  indexIntro: string;
  /** Article component's default CTA label. */
  ctaDefault: string;
  /** Article component's closing "find out exactly" box. */
  shellHeading: string;
  shellBody: string;
  /** Footer note for the two rule-only articles (nominee, 15-day, no-nominee-docs). */
  footerRbiOnly: string;
  /** Footer note for the two bank-specific articles (SBI, PNB). */
  footerCheckedFrom: (date: string, bank: string) => string;
  /** Link label pointing at NOTIFICATION.url. */
  directionsLinkLabel: string;

  sbi: ArticleCopy & {
    s1Heading: string;
    s1Pre: (threshold: string) => string;
    s1Post: string;
    s2Heading: string;
    s2Body: (names: string) => string;
    s3Heading: string;
    s3Body: string;
    s4Heading: string;
    s4Intro: string;
  };
  pnb: ArticleCopy & {
    s1Heading: string;
    s1Para1: string;
    s1Para2: (threshold: string) => string;
    s2Heading: string;
    s2Intro: string;
    s3Heading: string;
    s3Body: (threshold: string) => string;
  };
  nominee: ArticleCopy & {
    s1Heading: string;
    s1Para1: string;
    s1Para2: string;
    s2Heading: string;
    s2Closing: string;
    s3Heading: string;
    s3Before: string;
    s3After: string;
    s3Closing: string;
    s4Heading: string;
    s4Body: string;
  };
  fifteenDay: ArticleCopy & {
    s1Heading: string;
    s1Intro: string;
    s2Heading: string;
    s2Prefix: string;
    s3Heading: string;
    s3Intro: string;
  };
  noNomineeDocs: ArticleCopy & {
    s1Heading: string;
    s1Prefix: string;
    s2Heading: string;
    s3Heading: string;
    s3Body: string;
    s4Heading: string;
    s4Body: string;
  };
};

export const LEARN_T: Record<Locale, LearnDict> = {
  en: {
    indexTitle: "Learn",
    indexIntro:
      "Rule-by-rule and bank-by-bank articles, each one traced to the RBI's own wording or a bank's own published page.",
    ctaDefault: "Answer four short questions about your claim",
    shellHeading: "Find out exactly what applies to your claim",
    shellBody:
      "This page covers the general rule. Adhikaar asks a few short questions and gives you the specific answer for your situation, with the RBI's own wording to show the bank.",
    footerRbiOnly:
      "Rules quoted from the RBI's 2025 Directions. Not affiliated with the RBI or any bank. Information, not legal advice.",
    footerCheckedFrom: (date, bank) =>
      `Checked ${date}, from ${bank}'s own published page. Not affiliated with ${bank} or the RBI. Information, not legal advice.`,
    directionsLinkLabel: "2025 Directions",

    sbi: {
      navTitle: "SBI deceased account claim process",
      indexDek: "What State Bank of India itself publishes, not what the RBI floor implies.",
      eyebrow: "Bank-specific",
      dek: "What State Bank of India itself has published, read from its own pages and checked on the date below — not inferred from the RBI's general rule.",
      s1Heading: "SBI's own threshold and surety position",
      s1Pre: (threshold) =>
        `SBI states that it settles claims below ${threshold} without requiring a third-party surety — the same figure as the RBI's own floor for a commercial bank (paragraph 7(h) of the `,
      s1Post: "). Its published wording:",
      s2Heading: "Its claim forms",
      s2Body: (names) =>
        `SBI revised its deceased-claim settlement process with effect from 16 December 2025 and issued revised claim forms effective 18 December 2025 — ahead of the RBI's 31 March 2026 deadline. Its forms use the same annexure names as the RBI's own — ${names} — so you can ask a branch for them by name.`,
      s3Heading: "Where SBI goes beyond the RBI floor",
      s3Body:
        "Above ₹15 lakh, SBI states a surety is required — consistent with paragraph 10(b), which allows a bank to ask for more once a claim is at or above the threshold. Locker and loan claims are settled only at the account's home branch, and government savings schemes — SCSS, PPF, MSSC, SSA — are excluded from all of this, per paragraph 6(b).",
      s4Heading: "The underlying rule",
      s4Intro:
        "Every bank in India is working from the same instruction. The paragraph that matters most depends on whether a nominee was registered:",
    },
    pnb: {
      navTitle: "PNB succession certificate requirement",
      indexDek: "When PNB actually requires one, and when its own page says it should not.",
      eyebrow: "Bank-specific",
      dek: "Punjab National Bank does not require a succession certificate for most deceased-customer claims. Here is when it does, and when its own published page says it should not.",
      s1Heading: "When PNB does not require one",
      s1Para1:
        "Where there is a registered nominee or a surviving joint holder, paragraph 9 of the RBI's 2025 Directions applies at every bank, PNB included — no succession certificate, whatever the amount:",
      s1Para2: (threshold) =>
        `Where there is no nominee but the claim is below ${threshold} in total, PNB's own published list matches the RBI's simplified procedure: a claim form, death certificate, ID, an indemnity bond you sign yourself, a disclaimer from the other heirs, and a legal heir certificate or declaration — six documents, and a succession certificate is not one of them.`,
      s2Heading: "Its position on third-party surety",
      s2Intro: "PNB's own published wording on surety below the threshold:",
      s3Heading: "When a succession certificate genuinely applies",
      s3Body: (threshold) =>
        `At or above ${threshold} with no nominee, or wherever the legal heirs are in disagreement, a succession certificate — or an equivalent court document — may genuinely be required. That is not PNB being difficult; it is what paragraphs 10(b) and 11(b) of the Directions provide for.`,
    },
    nominee: {
      navTitle: "Nominee bank account claim after death",
      indexDek:
        "No succession certificate, whatever the amount — and what a nominee actually receives.",
      eyebrow: "Nominee claims",
      dek: "Where a nominee is registered, the claim is meant to be simple: three documents, no court paperwork, whatever the amount in the account.",
      s1Heading: "The rule",
      s1Para1:
        "A nominee is someone named on the account, in the bank's own records, to receive the balance after the account holder dies. Where one was registered — or the account was joint with a survivorship clause — the RBI's Directions are unconditional:",
      s1Para2:
        "No succession certificate. No probate. No letter of administration. No indemnity bond or surety. This applies whatever the amount standing in the account — there is no threshold test for a nominee claim.",
      s2Heading: "What a nominee claim actually needs",
      s2Closing: "That is the whole list — three documents, all same-day.",
      s3Heading: "A nominee is not the owner",
      s3Before: "Being paid as a nominee is not the same as owning the money. The Supreme Court held in ",
      s3After: " that a nominee is only:",
      s3Closing:
        "A nominee is the person the bank is allowed to pay. They do not become the owner. The money still belongs to the legal heirs under succession law, and a nominee who is not the sole heir holds it in trust for the others.",
      s4Heading: "Where this does not apply",
      s4Body:
        "If the legal heirs are in dispute about the estate, a court document can still be required regardless of the nominee. And this does not cover Public Provident Fund, the Senior Citizens' Savings Scheme, Mahila Samman Savings Certificate or Sukanya Samriddhi — those follow their own scheme rules, not these Directions.",
    },
    fifteenDay: {
      navTitle: "RBI 15-day deceased claim rule",
      indexDek: "What starts the clock, what happens if a bank is late, and how to prove the date.",
      eyebrow: "Deadlines",
      dek: "Once a bank has every document it needs, it has 15 calendar days to settle the claim — and the Directions say what happens if it doesn't.",
      s1Heading: "The rule, verbatim",
      s1Intro: "The deadline runs from a complete set of documents, not from the date of death:",
      s2Heading: "What happens if the bank is late",
      s2Prefix: "In summary: ",
      s3Heading: "Why the clock's start date gets disputed",
      s3Intro:
        'The 15 days count from a complete set of documents — which is exactly the point branches sometimes reopen by raising a fresh document objection, so the file is never quite "complete." Two things close that off:',
    },
    noNomineeDocs: {
      navTitle: "Documents required when there is no nominee",
      indexDek: "The fixed list of six, with real cost and time for each — and what is not on it.",
      eyebrow: "No nominee",
      dek: "Below the threshold, with no nominee registered, the RBI does not just discourage extra paperwork — it requires the bank to settle on a closed list of six documents.",
      s1Heading: "The rule",
      s1Prefix: "In summary: ",
      s2Heading: "The six documents, with real cost and time",
      s3Heading: "What is deliberately NOT on this list",
      s3Body:
        "A succession certificate, probate, a family-tree document, witnesses, or a third-party surety are not among the six — a branch asking for any of them, below the threshold, is asking for more than the rule allows.",
      s4Heading: "Where the threshold sits",
      s4Body:
        "The threshold is the aggregate across every account at that one bank, not per account — and a bank may set its own limit higher than this floor.",
    },
  },

  hi: {
    indexTitle: "जानें",
    indexIntro:
      "नियम-दर-नियम और बैंक-दर-बैंक लेख, हर एक आरबीआई के अपने शब्दों या किसी बैंक के अपने प्रकाशित पन्ने पर आधारित।",
    ctaDefault: "अपने दावे के बारे में कुछ छोटे सवालों के जवाब दें",
    shellHeading: "आपके दावे पर क्या लागू होता है, ठीक-ठीक जानें",
    shellBody:
      "यह पन्ना सामान्य नियम बताता है। Adhikaar कुछ छोटे सवाल पूछकर आपकी स्थिति के लिए सटीक जवाब देता है, साथ में बैंक को दिखाने के लिए आरबीआई के अपने शब्द।",
    footerRbiOnly:
      "नियम आरबीआई के 2025 निर्देशों से उद्धृत हैं। न आरबीआई से जुड़े हैं, न किसी बैंक से। यह जानकारी है, क़ानूनी सलाह नहीं।",
    footerCheckedFrom: (date, bank) =>
      `${date} को जाँचा गया, ${bank} के अपने प्रकाशित पन्ने से। न ${bank} से जुड़े हैं, न आरबीआई से। यह जानकारी है, क़ानूनी सलाह नहीं।`,
    directionsLinkLabel: "2025 के निर्देश",

    sbi: {
      navTitle: "SBI मृतक खाता दावा प्रक्रिया",
      indexDek: "SBI ख़ुद क्या प्रकाशित करता है, न कि आरबीआई की न्यूनतम सीमा से क्या माना जाता है।",
      eyebrow: "बैंक-विशेष",
      dek: "State Bank of India ने ख़ुद अपने पन्नों से जो प्रकाशित किया है, और नीचे दी तारीख़ को जाँचा गया है — आरबीआई के सामान्य नियम से अनुमान नहीं लगाया गया।",
      s1Heading: "SBI की अपनी सीमा और ज़मानत नीति",
      s1Pre: (threshold) =>
        `SBI कहता है कि वह ${threshold} से कम के दावे बिना किसी तीसरे-पक्ष की ज़मानत के निपटाता है — यह एक सामान्य बैंक के लिए आरबीआई की अपनी न्यूनतम सीमा जितना ही है (धारा 7(h), `,
      s1Post: ")। इसके प्रकाशित शब्द:",
      s2Heading: "इसके दावा फ़ॉर्म",
      s2Body: (names) =>
        `SBI ने 16 दिसंबर 2025 से अपनी मृतक-दावा निपटान प्रक्रिया संशोधित की और 18 दिसंबर 2025 से संशोधित दावा फ़ॉर्म जारी किए — आरबीआई की 31 मार्च 2026 की समय-सीमा से पहले। इसके फ़ॉर्म आरबीआई के अपने ही अनुबंध नामों का उपयोग करते हैं — ${names} — तो आप शाखा से इन्हें नाम लेकर माँग सकते हैं।`,
      s3Heading: "जहाँ SBI आरबीआई की न्यूनतम सीमा से आगे जाता है",
      s3Body:
        "₹15 लाख से ऊपर, SBI कहता है कि ज़मानत ज़रूरी है — यह धारा 10(b) के अनुरूप है, जो दावा सीमा पर या उससे ऊपर होने पर बैंक को ज़्यादा माँगने की अनुमति देती है। लॉकर और ऋण से जुड़े दावे सिर्फ़ खाते की मूल शाखा में निपटाए जाते हैं, और सरकारी बचत योजनाएँ — SCSS, PPF, MSSC, SSA — इन सबसे बाहर हैं, धारा 6(b) के अनुसार।",
      s4Heading: "मूल नियम",
      s4Intro:
        "भारत का हर बैंक एक ही निर्देश पर काम कर रहा है। सबसे ज़रूरी धारा इस पर निर्भर करती है कि नामांकित व्यक्ति दर्ज था या नहीं:",
    },
    pnb: {
      navTitle: "PNB उत्तराधिकार प्रमाणपत्र आवश्यकता",
      indexDek: "PNB वाक़ई कब इसकी माँग करता है, और कब उसका अपना पन्ना कहता है कि नहीं करनी चाहिए।",
      eyebrow: "बैंक-विशेष",
      dek: "Punjab National Bank ज़्यादातर मृतक-ग्राहक दावों के लिए उत्तराधिकार प्रमाणपत्र की माँग नहीं करता। यहाँ बताया गया है कि यह कब माँगता है, और कब इसका अपना प्रकाशित पन्ना कहता है कि नहीं माँगनी चाहिए।",
      s1Heading: "जब PNB को इसकी ज़रूरत नहीं होती",
      s1Para1:
        "जहाँ कोई पंजीकृत नामांकित व्यक्ति या जीवित संयुक्त धारक है, वहाँ आरबीआई के 2025 निर्देशों की धारा 9 हर बैंक पर लागू होती है, PNB सहित — कोई उत्तराधिकार प्रमाणपत्र नहीं, चाहे राशि कितनी भी हो:",
      s1Para2: (threshold) =>
        `जहाँ नामांकित व्यक्ति नहीं है लेकिन दावा कुल मिलाकर ${threshold} से कम है, वहाँ PNB की अपनी प्रकाशित सूची आरबीआई की सरल प्रक्रिया से मेल खाती है: दावा फ़ॉर्म, मृत्यु प्रमाणपत्र, पहचान प्रमाण, आप स्वयं हस्ताक्षरित क्षतिपूर्ति बॉन्ड, अन्य उत्तराधिकारियों से अस्वीकरण, और क़ानूनी उत्तराधिकार प्रमाणपत्र या घोषणा — छह दस्तावेज़, और उत्तराधिकार प्रमाणपत्र इनमें से एक नहीं है।`,
      s2Heading: "तीसरे-पक्ष की ज़मानत पर इसकी नीति",
      s2Intro: "सीमा से कम राशि पर ज़मानत को लेकर PNB के अपने प्रकाशित शब्द:",
      s3Heading: "जब उत्तराधिकार प्रमाणपत्र वाक़ई लागू होता है",
      s3Body: (threshold) =>
        `${threshold} पर या उससे ऊपर बिना नामांकित व्यक्ति के, या जहाँ भी क़ानूनी उत्तराधिकारियों में असहमति हो, वहाँ उत्तराधिकार प्रमाणपत्र — या उसके बराबर कोई न्यायालयीन दस्तावेज़ — वाक़ई ज़रूरी हो सकता है। यह PNB की मनमानी नहीं है; यह निर्देशों की धारा 10(b) और 11(b) में तय है।`,
    },
    nominee: {
      navTitle: "मृत्यु के बाद नामांकित व्यक्ति का बैंक खाता दावा",
      indexDek:
        "कोई उत्तराधिकार प्रमाणपत्र नहीं, चाहे राशि कितनी भी हो — और नामांकित व्यक्ति को वाक़ई क्या मिलता है।",
      eyebrow: "नामांकित व्यक्ति का दावा",
      dek: "जहाँ नामांकित व्यक्ति दर्ज है, वहाँ दावा सरल होना चाहिए: तीन दस्तावेज़, कोई न्यायालयीन काग़ज़ी कार्रवाई नहीं, खाते में राशि चाहे जितनी भी हो।",
      s1Heading: "नियम",
      s1Para1:
        "नामांकित व्यक्ति वह है जिसे बैंक के अपने रिकॉर्ड में खाताधारक की मृत्यु के बाद शेष राशि पाने के लिए नामित किया गया है। जहाँ ऐसा व्यक्ति दर्ज था — या खाता संयुक्त था और उसमें उत्तरजीविता खंड था — वहाँ आरबीआई के निर्देश बिना शर्त हैं:",
      s1Para2:
        "कोई उत्तराधिकार प्रमाणपत्र नहीं। कोई प्रोबेट नहीं। प्रशासन-पत्र नहीं। कोई क्षतिपूर्ति बॉन्ड या ज़मानत नहीं। यह खाते में जमा राशि चाहे जितनी भी हो, लागू होता है — नामांकित व्यक्ति के दावे के लिए कोई सीमा-जाँच नहीं है।",
      s2Heading: "नामांकित व्यक्ति के दावे के लिए वाक़ई क्या चाहिए",
      s2Closing: "यही पूरी सूची है — तीन दस्तावेज़, सब एक ही दिन में।",
      s3Heading: "नामांकित व्यक्ति मालिक नहीं होता",
      s3Before: "नामांकित व्यक्ति के रूप में पैसा मिलना, उसका मालिक होना नहीं है। सुप्रीम कोर्ट ने ",
      s3After: " में कहा कि नामांकित व्यक्ति केवल यही है:",
      s3Closing:
        "नामांकित व्यक्ति वह है जिसे बैंक भुगतान करने के लिए अधिकृत है। इससे वह मालिक नहीं बन जाता। यह पैसा उत्तराधिकार क़ानून के तहत अब भी क़ानूनी उत्तराधिकारियों का ही है, और जो नामांकित व्यक्ति अकेला उत्तराधिकारी नहीं है, वह इसे बाक़ी उत्तराधिकारियों के लिए न्यास में रखता है।",
      s4Heading: "यह कहाँ लागू नहीं होता",
      s4Body:
        "अगर क़ानूनी उत्तराधिकारियों के बीच संपत्ति को लेकर विवाद है, तो नामांकित व्यक्ति के बावजूद न्यायालयीन दस्तावेज़ की ज़रूरत पड़ सकती है। और यह सार्वजनिक भविष्य निधि (PPF), वरिष्ठ नागरिक बचत योजना, महिला सम्मान बचत प्रमाणपत्र या सुकन्या समृद्धि को कवर नहीं करता — वे अपनी योजना के नियमों के तहत चलती हैं, इन निर्देशों के नहीं।",
    },
    fifteenDay: {
      navTitle: "आरबीआई का 15-दिन मृतक दावा नियम",
      indexDek: "घड़ी कब शुरू होती है, बैंक देर करे तो क्या होता है, और तारीख़ कैसे साबित करें।",
      eyebrow: "समय-सीमा",
      dek: "जब बैंक के पास ज़रूरी हर दस्तावेज़ आ जाए, तो उसके पास दावा निपटाने के लिए 15 कैलेंडर दिन होते हैं — और निर्देश बताते हैं कि अगर ऐसा न हो तो क्या होता है।",
      s1Heading: "नियम, ज्यों का त्यों",
      s1Intro: "यह समय-सीमा दस्तावेज़ों के पूरे सेट मिलने से शुरू होती है, मृत्यु की तारीख़ से नहीं:",
      s2Heading: "अगर बैंक देर करे तो क्या होता है",
      s2Prefix: "संक्षेप में: ",
      s3Heading: "क्लॉक की शुरुआत की तारीख़ पर विवाद क्यों होता है",
      s3Intro:
        'यह 15 दिन दस्तावेज़ों के पूरे सेट से गिने जाते हैं — और यही वह बिंदु है जहाँ शाखाएँ कभी-कभी कोई नई दस्तावेज़ी आपत्ति उठाकर फ़ाइल को फिर से खोल देती हैं, ताकि फ़ाइल कभी पूरी तरह "पूर्ण" न हो। दो चीज़ें इसे रोकती हैं:',
    },
    noNomineeDocs: {
      navTitle: "बिना नामांकित व्यक्ति के आवश्यक दस्तावेज़",
      indexDek: "छह की तय सूची, हर एक की वास्तविक लागत और समय के साथ — और इसमें क्या नहीं है।",
      eyebrow: "बिना नामांकित व्यक्ति",
      dek: "सीमा से कम राशि पर, बिना नामांकित व्यक्ति दर्ज हुए, आरबीआई सिर्फ़ अतिरिक्त काग़ज़ी कार्रवाई को हतोत्साहित नहीं करता — यह बैंक को छह दस्तावेज़ों की एक तय सूची पर निपटाने के लिए बाध्य करता है।",
      s1Heading: "नियम",
      s1Prefix: "संक्षेप में: ",
      s2Heading: "छह दस्तावेज़, वास्तविक लागत और समय के साथ",
      s3Heading: "जो जान-बूझकर इस सूची में नहीं है",
      s3Body:
        "उत्तराधिकार प्रमाणपत्र, प्रोबेट, परिवार-वृक्ष दस्तावेज़, गवाह, या तीसरे-पक्ष की ज़मानत — इनमें से कोई भी इन छह में नहीं है। सीमा से कम राशि पर शाखा का इनमें से कुछ भी माँगना, नियम की अनुमति से ज़्यादा माँगना है।",
      s4Heading: "सीमा कहाँ है",
      s4Body:
        "यह सीमा उस एक बैंक में हर खाते का कुल जोड़ है, प्रति खाता नहीं — और कोई बैंक इस न्यूनतम सीमा से ऊँची अपनी सीमा तय कर सकता है।",
    },
  },

  kn: {
    indexTitle: "ತಿಳಿಯಿರಿ",
    indexIntro:
      "ನಿಯಮ-ಅನುಸಾರ ಮತ್ತು ಬ್ಯಾಂಕ್-ಅನುಸಾರ ಲೇಖನಗಳು, ಪ್ರತಿಯೊಂದೂ ಆರ್‌ಬಿಐನ ಸ್ವಂತ ಪದಗಳಿಗೆ ಅಥವಾ ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ಪ್ರಕಟಿತ ಪುಟಕ್ಕೆ ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ.",
    ctaDefault: "ನಿಮ್ಮ ಹಕ್ಕಿನ ಬಗ್ಗೆ ಕೆಲವು ಚಿಕ್ಕ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ",
    shellHeading: "ನಿಮ್ಮ ಹಕ್ಕಿಗೆ ನಿಖರವಾಗಿ ಏನು ಅನ್ವಯಿಸುತ್ತದೆ ಎಂದು ತಿಳಿಯಿರಿ",
    shellBody:
      "ಈ ಪುಟ ಸಾಮಾನ್ಯ ನಿಯಮವನ್ನು ತಿಳಿಸುತ್ತದೆ. Adhikaar ಕೆಲವು ಚಿಕ್ಕ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ನಿಮ್ಮ ಸ್ಥಿತಿಗೆ ನಿಖರವಾದ ಉತ್ತರ ನೀಡುತ್ತದೆ, ಬ್ಯಾಂಕಿಗೆ ತೋರಿಸಲು ಆರ್‌ಬಿಐನ ಸ್ವಂತ ಪದಗಳೊಂದಿಗೆ.",
    footerRbiOnly:
      "ನಿಯಮಗಳು ಆರ್‌ಬಿಐನ 2025ರ ನಿರ್ದೇಶನಗಳಿಂದ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ. ಆರ್‌ಬಿಐ ಅಥವಾ ಯಾವುದೇ ಬ್ಯಾಂಕಿನೊಂದಿಗೆ ಸಂಬಂಧವಿಲ್ಲ. ಇದು ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆಯಲ್ಲ.",
    footerCheckedFrom: (date, bank) =>
      `${bank} ಯ ಸ್ವಂತ ಪ್ರಕಟಿತ ಪುಟದಿಂದ, ${date} ರಂದು ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ${bank} ಅಥವಾ ಆರ್‌ಬಿಐನೊಂದಿಗೆ ಸಂಬಂಧವಿಲ್ಲ. ಇದು ಮಾಹಿತಿ, ಕಾನೂನು ಸಲಹೆಯಲ್ಲ.`,
    directionsLinkLabel: "2025ರ ನಿರ್ದೇಶನಗಳು",

    sbi: {
      navTitle: "SBI ಮೃತ ಖಾತೆ ಹಕ್ಕು ಪ್ರಕ್ರಿಯೆ",
      indexDek:
        "ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ ಸ್ವತಃ ಏನನ್ನು ಪ್ರಕಟಿಸುತ್ತದೆ, ಆರ್‌ಬಿಐನ ಕನಿಷ್ಠ ಮಿತಿ ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ ಎಂಬುದಲ್ಲ.",
      eyebrow: "ಬ್ಯಾಂಕ್-ನಿರ್ದಿಷ್ಟ",
      dek: "ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ ತನ್ನ ಸ್ವಂತ ಪುಟಗಳಿಂದ ಪ್ರಕಟಿಸಿದ್ದನ್ನು ಓದಿ, ಕೆಳಗಿನ ದಿನಾಂಕದಂದು ಪರಿಶೀಲಿಸಲಾಗಿದೆ — ಆರ್‌ಬಿಐನ ಸಾಮಾನ್ಯ ನಿಯಮದಿಂದ ಊಹಿಸಿದ್ದಲ್ಲ.",
      s1Heading: "SBI ಯ ಸ್ವಂತ ಮಿತಿ ಮತ್ತು ಜಾಮೀನು ನಿಲುವು",
      s1Pre: (threshold) =>
        `SBI ${threshold} ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರುವ ಹಕ್ಕುಗಳನ್ನು ಯಾವುದೇ ಮೂರನೇ-ವ್ಯಕ್ತಿ ಜಾಮೀನು ಇಲ್ಲದೆ ಇತ್ಯರ್ಥಪಡಿಸುತ್ತದೆ ಎಂದು ಹೇಳುತ್ತದೆ — ಇದು ಸಾಮಾನ್ಯ ಬ್ಯಾಂಕಿಗೆ ಆರ್‌ಬಿಐನ ಸ್ವಂತ ಕನಿಷ್ಠ ಮಿತಿಯಷ್ಟೇ (ಪ್ಯಾರಾಗ್ರಾಫ್ 7(h), `,
      s1Post: "). ಇದರ ಪ್ರಕಟಿತ ಪದಗಳು:",
      s2Heading: "ಇದರ ಹಕ್ಕು ಫಾರಂಗಳು",
      s2Body: (names) =>
        `SBI 16 ಡಿಸೆಂಬರ್ 2025 ರಿಂದ ತನ್ನ ಮೃತ-ಹಕ್ಕು ಇತ್ಯರ್ಥ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪರಿಷ್ಕರಿಸಿತು ಮತ್ತು 18 ಡಿಸೆಂಬರ್ 2025 ರಿಂದ ಪರಿಷ್ಕೃತ ಹಕ್ಕು ಫಾರಂಗಳನ್ನು ಹೊರಡಿಸಿತು — ಆರ್‌ಬಿಐನ 31 ಮಾರ್ಚ್ 2026 ರ ಗಡುವಿಗಿಂತ ಮೊದಲೇ. ಇದರ ಫಾರಂಗಳು ಆರ್‌ಬಿಐನ ಸ್ವಂತ ಅನುಬಂಧ ಹೆಸರುಗಳನ್ನೇ ಬಳಸುತ್ತವೆ — ${names} — ಆದ್ದರಿಂದ ನೀವು ಶಾಖೆಯಿಂದ ಇವುಗಳನ್ನು ಹೆಸರಿನಿಂದ ಕೇಳಬಹುದು.`,
      s3Heading: "SBI ಆರ್‌ಬಿಐನ ಕನಿಷ್ಠ ಮಿತಿಯನ್ನು ಮೀರಿ ಹೋಗುವಲ್ಲಿ",
      s3Body:
        "₹15 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು, SBI ಜಾಮೀನು ಅಗತ್ಯ ಎಂದು ಹೇಳುತ್ತದೆ — ಇದು ಪ್ಯಾರಾಗ್ರಾಫ್ 10(b) ಗೆ ಅನುಗುಣವಾಗಿದೆ, ಇದು ಹಕ್ಕು ಮಿತಿಗೆ ಸಮ ಅಥವಾ ಮೀರಿದಾಗ ಬ್ಯಾಂಕ್ ಹೆಚ್ಚಿನದನ್ನು ಕೇಳಲು ಅನುಮತಿಸುತ್ತದೆ. ಲಾಕರ್ ಮತ್ತು ಸಾಲ ಸಂಬಂಧಿತ ಹಕ್ಕುಗಳನ್ನು ಖಾತೆಯ ಮೂಲ ಶಾಖೆಯಲ್ಲಿ ಮಾತ್ರ ಇತ್ಯರ್ಥಪಡಿಸಲಾಗುತ್ತದೆ, ಮತ್ತು ಸರ್ಕಾರಿ ಉಳಿತಾಯ ಯೋಜನೆಗಳು — SCSS, PPF, MSSC, SSA — ಇವೆಲ್ಲದರಿಂದ ಹೊರಗಿವೆ, ಪ್ಯಾರಾಗ್ರಾಫ್ 6(b) ಪ್ರಕಾರ.",
      s4Heading: "ಆಧಾರ ನಿಯಮ",
      s4Intro:
        "ಭಾರತದ ಪ್ರತಿಯೊಂದು ಬ್ಯಾಂಕ್ ಒಂದೇ ನಿರ್ದೇಶನದ ಮೇಲೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ. ಅತ್ಯಂತ ಮುಖ್ಯವಾದ ಪ್ಯಾರಾಗ್ರಾಫ್ ನಾಮನಿರ್ದೇಶಿತರು ದಾಖಲಾಗಿದ್ದರೇ ಎಂಬುದರ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿದೆ:",
    },
    pnb: {
      navTitle: "PNB ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಅಗತ್ಯತೆ",
      indexDek: "PNB ನಿಜವಾಗಿಯೂ ಯಾವಾಗ ಇದನ್ನು ಕೇಳುತ್ತದೆ, ಮತ್ತು ಅದರ ಸ್ವಂತ ಪುಟ ಯಾವಾಗ ಬೇಡ ಎಂದು ಹೇಳುತ್ತದೆ.",
      eyebrow: "ಬ್ಯಾಂಕ್-ನಿರ್ದಿಷ್ಟ",
      dek: "Punjab National Bank ಹೆಚ್ಚಿನ ಮೃತ-ಗ್ರಾಹಕ ಹಕ್ಕುಗಳಿಗೆ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಕೇಳುವುದಿಲ್ಲ. ಇದು ಯಾವಾಗ ಕೇಳುತ್ತದೆ, ಮತ್ತು ಅದರ ಸ್ವಂತ ಪ್ರಕಟಿತ ಪುಟ ಯಾವಾಗ ಬೇಡ ಎಂದು ಹೇಳುತ್ತದೆ ಎಂಬುದು ಇಲ್ಲಿದೆ.",
      s1Heading: "PNB ಗೆ ಇದು ಅಗತ್ಯವಿಲ್ಲದಾಗ",
      s1Para1:
        "ನೋಂದಾಯಿತ ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉಳಿದ ಜಂಟಿ ಖಾತೆದಾರರು ಇದ್ದಲ್ಲಿ, ಆರ್‌ಬಿಐನ 2025ರ ನಿರ್ದೇಶನಗಳ ಪ್ಯಾರಾಗ್ರಾಫ್ 9 ಪ್ರತಿ ಬ್ಯಾಂಕಿಗೂ ಅನ್ವಯಿಸುತ್ತದೆ, PNB ಸೇರಿದಂತೆ — ಎಷ್ಟೇ ಮೊತ್ತವಿರಲಿ, ಯಾವುದೇ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಬೇಕಿಲ್ಲ:",
      s1Para2: (threshold) =>
        `ನಾಮನಿರ್ದೇಶಿತರು ಇಲ್ಲದಿದ್ದರೂ ಹಕ್ಕು ಒಟ್ಟಾರೆ ${threshold} ಕ್ಕಿಂತ ಕಡಿಮೆ ಇದ್ದರೆ, PNB ಯ ಸ್ವಂತ ಪ್ರಕಟಿತ ಪಟ್ಟಿ ಆರ್‌ಬಿಐನ ಸರಳ ಪ್ರಕ್ರಿಯೆಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ: ಹಕ್ಕು ಫಾರಂ, ಮರಣ ಪ್ರಮಾಣಪತ್ರ, ಗುರುತಿನ ಪುರಾವೆ, ನೀವೇ ಸಹಿ ಮಾಡುವ ಕ್ಷತಿಪೂರಣ ಬಾಂಡ್, ಇತರ ವಾರಸುದಾರರಿಂದ ನಿರಾಕರಣೆ, ಮತ್ತು ಕಾನೂನು ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಘೋಷಣೆ — ಆರು ದಾಖಲೆಗಳು, ಮತ್ತು ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಇವುಗಳಲ್ಲಿ ಒಂದಲ್ಲ.`,
      s2Heading: "ಮೂರನೇ-ವ್ಯಕ್ತಿ ಜಾಮೀನಿನ ಬಗ್ಗೆ ಇದರ ನಿಲುವು",
      s2Intro: "ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಮೊತ್ತದಲ್ಲಿ ಜಾಮೀನಿನ ಬಗ್ಗೆ PNB ಯ ಸ್ವಂತ ಪ್ರಕಟಿತ ಪದಗಳು:",
      s3Heading: "ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ನಿಜವಾಗಿಯೂ ಅನ್ವಯಿಸುವಾಗ",
      s3Body: (threshold) =>
        `${threshold} ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು ನಾಮನಿರ್ದೇಶಿತರಿಲ್ಲದೆ, ಅಥವಾ ಕಾನೂನು ವಾರಸುದಾರರಲ್ಲಿ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಇರುವಲ್ಲಿ, ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ — ಅಥವಾ ಅದಕ್ಕೆ ಸಮಾನವಾದ ನ್ಯಾಯಾಲಯದ ದಾಖಲೆ — ನಿಜವಾಗಿಯೂ ಅಗತ್ಯವಾಗಬಹುದು. ಇದು PNB ಯ ಸ್ವೇಚ್ಛೆಯಲ್ಲ; ಇದು ನಿರ್ದೇಶನಗಳ ಪ್ಯಾರಾಗ್ರಾಫ್ 10(b) ಮತ್ತು 11(b) ರಲ್ಲಿ ಇರುವುದು.`,
    },
    nominee: {
      navTitle: "ಮರಣದ ನಂತರ ನಾಮನಿರ್ದೇಶಿತ ಬ್ಯಾಂಕ್ ಖಾತೆ ಹಕ್ಕು",
      indexDek:
        "ಎಷ್ಟೇ ಮೊತ್ತವಿರಲಿ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಬೇಕಿಲ್ಲ — ಮತ್ತು ನಾಮನಿರ್ದೇಶಿತರಿಗೆ ನಿಜವಾಗಿಯೂ ಏನು ಸಿಗುತ್ತದೆ.",
      eyebrow: "ನಾಮನಿರ್ದೇಶಿತ ಹಕ್ಕು",
      dek: "ನಾಮನಿರ್ದೇಶಿತರು ದಾಖಲಾಗಿರುವಲ್ಲಿ, ಹಕ್ಕು ಸರಳವಾಗಿರಬೇಕು: ಮೂರು ದಾಖಲೆಗಳು, ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಕಾಗದಪತ್ರ ಇಲ್ಲ, ಖಾತೆಯಲ್ಲಿ ಎಷ್ಟೇ ಮೊತ್ತವಿರಲಿ.",
      s1Heading: "ನಿಯಮ",
      s1Para1:
        "ನಾಮನಿರ್ದೇಶಿತರು ಎಂದರೆ ಖಾತೆದಾರರ ಮರಣದ ನಂತರ ಬಾಕಿ ಮೊತ್ತ ಪಡೆಯಲು ಬ್ಯಾಂಕಿನ ಸ್ವಂತ ದಾಖಲೆಗಳಲ್ಲಿ ಹೆಸರಿಸಲಾದ ವ್ಯಕ್ತಿ. ಅಂತಹ ವ್ಯಕ್ತಿ ದಾಖಲಾಗಿದ್ದರೆ — ಅಥವಾ ಖಾತೆ ಜಂಟಿಯಾಗಿದ್ದು ಉಳಿಯುವಿಕೆಯ ಷರತ್ತು ಇದ್ದರೆ — ಆರ್‌ಬಿಐನ ನಿರ್ದೇಶನಗಳು ಬೇಷರತ್ತಾಗಿವೆ:",
      s1Para2:
        "ಯಾವುದೇ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಇಲ್ಲ. ಪ್ರೊಬೇಟ್ ಇಲ್ಲ. ಆಡಳಿತ ಪತ್ರ ಇಲ್ಲ. ಕ್ಷತಿಪೂರಣ ಬಾಂಡ್ ಅಥವಾ ಜಾಮೀನು ಇಲ್ಲ. ಖಾತೆಯಲ್ಲಿ ಎಷ್ಟೇ ಮೊತ್ತವಿರಲಿ ಇದು ಅನ್ವಯಿಸುತ್ತದೆ — ನಾಮನಿರ್ದೇಶಿತ ಹಕ್ಕಿಗೆ ಯಾವುದೇ ಮಿತಿ-ಪರೀಕ್ಷೆ ಇಲ್ಲ.",
      s2Heading: "ನಾಮನಿರ್ದೇಶಿತ ಹಕ್ಕಿಗೆ ನಿಜವಾಗಿಯೂ ಏನು ಬೇಕು",
      s2Closing: "ಇದೇ ಪೂರ್ಣ ಪಟ್ಟಿ — ಮೂರು ದಾಖಲೆಗಳು, ಎಲ್ಲವೂ ಅದೇ ದಿನ.",
      s3Heading: "ನಾಮನಿರ್ದೇಶಿತರು ಮಾಲೀಕರಲ್ಲ",
      s3Before: "ನಾಮನಿರ್ದೇಶಿತರಾಗಿ ಹಣ ಪಡೆಯುವುದು ಅದರ ಮಾಲೀಕರಾಗುವುದು ಅಲ್ಲ. ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ",
      s3After: " ಪ್ರಕರಣದಲ್ಲಿ ನಾಮನಿರ್ದೇಶಿತರು ಕೇವಲ ಇಷ್ಟೇ ಎಂದು ತೀರ್ಪು ನೀಡಿತು:",
      s3Closing:
        "ನಾಮನಿರ್ದೇಶಿತರು ಬ್ಯಾಂಕ್ ಪಾವತಿಸಲು ಅಧಿಕೃತಗೊಳಿಸಿದ ವ್ಯಕ್ತಿ. ಇದರಿಂದ ಅವರು ಮಾಲೀಕರಾಗುವುದಿಲ್ಲ. ಈ ಹಣ ಉತ್ತರಾಧಿಕಾರ ಕಾನೂನಿನ ಪ್ರಕಾರ ಇನ್ನೂ ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರಿಗೇ ಸೇರಿದ್ದು, ಮತ್ತು ಏಕೈಕ ವಾರಸುದಾರರಲ್ಲದ ನಾಮನಿರ್ದೇಶಿತರು ಇದನ್ನು ಇತರರಿಗಾಗಿ ನಂಬಿಕೆಯಲ್ಲಿ ಇಟ್ಟುಕೊಳ್ಳುತ್ತಾರೆ.",
      s4Heading: "ಇದು ಎಲ್ಲಿ ಅನ್ವಯಿಸುವುದಿಲ್ಲ",
      s4Body:
        "ಆಸ್ತಿಯ ಬಗ್ಗೆ ಕಾನೂನು ವಾರಸುದಾರರ ನಡುವೆ ವಿವಾದವಿದ್ದರೆ, ನಾಮನಿರ್ದೇಶಿತರು ಇದ್ದರೂ ನ್ಯಾಯಾಲಯದ ದಾಖಲೆ ಅಗತ್ಯವಾಗಬಹುದು. ಮತ್ತು ಇದು ಸಾರ್ವಜನಿಕ ಭವಿಷ್ಯ ನಿಧಿ (PPF), ಹಿರಿಯ ನಾಗರಿಕರ ಉಳಿತಾಯ ಯೋಜನೆ, ಮಹಿಳಾ ಸಮ್ಮಾನ್ ಉಳಿತಾಯ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿಯನ್ನು ಒಳಗೊಳ್ಳುವುದಿಲ್ಲ — ಅವು ತಮ್ಮದೇ ಯೋಜನೆಯ ನಿಯಮಗಳ ಪ್ರಕಾರ ನಡೆಯುತ್ತವೆ, ಈ ನಿರ್ದೇಶನಗಳ ಪ್ರಕಾರ ಅಲ್ಲ.",
    },
    fifteenDay: {
      navTitle: "ಆರ್‌ಬಿಐನ 15-ದಿನ ಮೃತ ಹಕ್ಕು ನಿಯಮ",
      indexDek: "ಗಡಿಯಾರ ಯಾವಾಗ ಆರಂಭವಾಗುತ್ತದೆ, ಬ್ಯಾಂಕ್ ತಡ ಮಾಡಿದರೆ ಏನಾಗುತ್ತದೆ, ಮತ್ತು ದಿನಾಂಕವನ್ನು ಹೇಗೆ ಸಾಬೀತುಪಡಿಸುವುದು.",
      eyebrow: "ಗಡುವು",
      dek: "ಬ್ಯಾಂಕಿಗೆ ಅಗತ್ಯವಿರುವ ಪ್ರತಿ ದಾಖಲೆ ಸಿಕ್ಕ ನಂತರ, ಹಕ್ಕನ್ನು ಇತ್ಯರ್ಥಪಡಿಸಲು ಅದಕ್ಕೆ 15 ಕ್ಯಾಲೆಂಡರ್ ದಿನಗಳಿವೆ — ಮತ್ತು ಹಾಗೆ ಮಾಡದಿದ್ದರೆ ಏನಾಗುತ್ತದೆ ಎಂದು ನಿರ್ದೇಶನಗಳು ಹೇಳುತ್ತವೆ.",
      s1Heading: "ನಿಯಮ, ಯಥಾವತ್ತಾಗಿ",
      s1Intro: "ಈ ಗಡುವು ದಾಖಲೆಗಳ ಪೂರ್ಣ ಸೆಟ್ ಸಿಕ್ಕ ದಿನದಿಂದ ಆರಂಭವಾಗುತ್ತದೆ, ಮರಣದ ದಿನಾಂಕದಿಂದ ಅಲ್ಲ:",
      s2Heading: "ಬ್ಯಾಂಕ್ ತಡ ಮಾಡಿದರೆ ಏನಾಗುತ್ತದೆ",
      s2Prefix: "ಸಂಕ್ಷಿಪ್ತವಾಗಿ: ",
      s3Heading: "ಗಡುವಿನ ಆರಂಭದ ದಿನಾಂಕದ ಬಗ್ಗೆ ಏಕೆ ವಿವಾದವಾಗುತ್ತದೆ",
      s3Intro:
        'ಈ 15 ದಿನಗಳನ್ನು ದಾಖಲೆಗಳ ಪೂರ್ಣ ಸೆಟ್‌ನಿಂದ ಎಣಿಸಲಾಗುತ್ತದೆ — ಇದೇ ಬಿಂದುವಿನಲ್ಲಿ ಶಾಖೆಗಳು ಕೆಲವೊಮ್ಮೆ ಹೊಸ ದಾಖಲೆ ಆಕ್ಷೇಪಣೆ ಎತ್ತಿ ಫೈಲ್ ಅನ್ನು ಮತ್ತೆ ತೆರೆಯುತ್ತವೆ, ಇದರಿಂದ ಫೈಲ್ ಎಂದಿಗೂ ಸಂಪೂರ್ಣವಾಗಿ "ಪೂರ್ಣ" ಆಗುವುದೇ ಇಲ್ಲ. ಇದನ್ನು ತಡೆಯುವ ಎರಡು ವಿಷಯಗಳು:',
    },
    noNomineeDocs: {
      navTitle: "ನಾಮನಿರ್ದೇಶಿತರಿಲ್ಲದಾಗ ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು",
      indexDek: "ಆರರ ನಿಗದಿತ ಪಟ್ಟಿ, ಪ್ರತಿಯೊಂದಕ್ಕೂ ನಿಜವಾದ ವೆಚ್ಚ ಮತ್ತು ಸಮಯದೊಂದಿಗೆ — ಮತ್ತು ಇದರಲ್ಲಿ ಇಲ್ಲದಿರುವುದು.",
      eyebrow: "ನಾಮನಿರ್ದೇಶಿತರಿಲ್ಲದೆ",
      dek: "ಮಿತಿಗಿಂತ ಕಡಿಮೆ, ನಾಮನಿರ್ದೇಶಿತರು ಇಲ್ಲದಿದ್ದಾಗ, ಆರ್‌ಬಿಐ ಹೆಚ್ಚುವರಿ ಕಾಗದಪತ್ರವನ್ನು ನಿರುತ್ಸಾಹಗೊಳಿಸುವುದಷ್ಟೇ ಅಲ್ಲ — ಇದು ಬ್ಯಾಂಕ್ ಆರು ದಾಖಲೆಗಳ ನಿಗದಿತ ಪಟ್ಟಿಯ ಮೇಲೆ ಇತ್ಯರ್ಥಪಡಿಸುವಂತೆ ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ.",
      s1Heading: "ನಿಯಮ",
      s1Prefix: "ಸಂಕ್ಷಿಪ್ತವಾಗಿ: ",
      s2Heading: "ಆರು ದಾಖಲೆಗಳು, ನಿಜವಾದ ವೆಚ್ಚ ಮತ್ತು ಸಮಯದೊಂದಿಗೆ",
      s3Heading: "ಈ ಪಟ್ಟಿಯಲ್ಲಿ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಇಲ್ಲದಿರುವುದು",
      s3Body:
        "ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಪ್ರೊಬೇಟ್, ಕುಟುಂಬ-ವೃಕ್ಷ ದಾಖಲೆ, ಸಾಕ್ಷಿಗಳು, ಅಥವಾ ಮೂರನೇ-ವ್ಯಕ್ತಿ ಜಾಮೀನು — ಇವು ಆ ಆರರಲ್ಲಿ ಇಲ್ಲ. ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಮೊತ್ತದಲ್ಲಿ ಶಾಖೆ ಇವುಗಳಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಕೇಳುವುದು, ನಿಯಮ ಅನುಮತಿಸುವುದಕ್ಕಿಂತ ಹೆಚ್ಚು ಕೇಳಿದಂತೆ.",
      s4Heading: "ಮಿತಿ ಎಲ್ಲಿದೆ",
      s4Body:
        "ಈ ಮಿತಿ ಆ ಒಂದು ಬ್ಯಾಂಕಿನಲ್ಲಿರುವ ಪ್ರತಿ ಖಾತೆಯ ಒಟ್ಟು ಮೊತ್ತ, ಪ್ರತಿ ಖಾತೆಗೆ ಅಲ್ಲ — ಮತ್ತು ಬ್ಯಾಂಕ್ ಈ ಕನಿಷ್ಠ ಮಿತಿಗಿಂತ ಹೆಚ್ಚಿನ ತನ್ನದೇ ಮಿತಿಯನ್ನು ನಿಗದಿಪಡಿಸಬಹುದು.",
    },
  },
};
