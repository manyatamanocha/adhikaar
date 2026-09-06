/**
 * The document catalogue.
 *
 * Every document a claimant might be told to bring — the ones the RBI actually
 * prescribes, and the ones branches ask for that it does not.
 *
 * `prescribed` drives the "What were you asked for?" comparison. It is the
 * single most load-bearing field in the file: if it is wrong, the product tells
 * someone a legitimate demand is illegitimate, and they argue with a bank and lose.
 *
 * Plain-English `name` first, official name in `official`. Never show a bare
 * annexure reference without the plain name beside it.
 */

export type DocId =
  | "claim-form"
  | "death-certificate"
  | "id-proof"
  | "indemnity-bond"
  | "disclaimer-letter"
  | "legal-heir-certificate"
  | "heir-declaration"
  | "succession-certificate"
  | "third-party-surety"
  | "witnesses"
  | "vanshavali"
  | "affidavit"
  | "probate";

export type ClaimDoc = {
  id: DocId;
  /** Plain English. This is what the user reads. */
  name: string;
  /** The official name, shown in brackets after the plain one. */
  official?: string;
  /** Is this in the RBI's prescribed list for the simplified procedure? */
  prescribed: boolean;
  /** Where you get it. */
  from: string;
  /** Realistic cost. Never optimistic. */
  cost: string;
  /** Realistic time. Never optimistic. */
  time: string;
  /**
   * The worst case of `time`, in days, for ORDERING ONLY.
   *
   * This number is never rendered — `time` is the string a user reads, and it
   * keeps the range and the caveats. This exists so "start this one today" can
   * still answer correctly after the long pole has been ticked off: with only
   * the `startFirst` boolean there is no way to name the second-longest.
   *
   * Read off the `time` string above it, rounded to the pessimistic end. Where
   * a document waits on people rather than on a process (the no-objection
   * letter), the figure is a placeholder for "not instant", not a prediction.
   */
  leadDays: number;
  /** One line on what it is, for someone who has never heard of it. */
  what: string;
  /** Shown when the bank asks for something it should not. */
  note?: string;
  /** Start this one first — it is the long pole. */
  startFirst?: boolean;
  url?: string;
};

export const DOCUMENTS: Record<DocId, ClaimDoc> = {
  "claim-form": {
    id: "claim-form",
    name: "The bank's claim form",
    official: "Annex I-A with a nominee, Annex I-B without one",
    prescribed: true,
    from: "Your bank — branch or its website",
    cost: "Free",
    time: "Same day",
    leadDays: 0,
    what:
      "The form that starts the claim. There are two versions: one if a nominee was registered, one if not. Ask for the right one by name.",
  },

  "death-certificate": {
    id: "death-certificate",
    name: "Death certificate",
    prescribed: true,
    from: "The municipal body or panchayat where the death was registered",
    cost: "Nominal",
    time: "7–14 days after applying",
    leadDays: 14,
    what:
      "The registered certificate of death. Get several certified copies — every institution wants to keep its own.",
    note: "Deaths must be registered within 21 days. After a year it needs a court order.",
  },

  "id-proof": {
    id: "id-proof",
    name: "Your own ID and address proof",
    official: "Officially Valid Document (OVD)",
    prescribed: true,
    from: "You already have it — Aadhaar, passport, voter ID or driving licence",
    cost: "Free",
    time: "Immediate",
    leadDays: 0,
    what: "Proof of who you are. This is about you, not the person who died.",
  },

  "indemnity-bond": {
    id: "indemnity-bond",
    name: "An indemnity bond you sign yourself",
    official: "Annex I-C",
    prescribed: true,
    from: "The bank provides the form",
    cost: "Stamp paper only",
    time: "Same day",
    leadDays: 0,
    what:
      "Your written undertaking to cover the bank if a rival claim appears later. You sign it. It is not the same as a surety.",
    note:
      "This is you signing for yourself. A bank asking a THIRD PERSON to stand as surety below the threshold is asking for something different — and para 10(a) says it shall not be obtained.",
  },

  "disclaimer-letter": {
    id: "disclaimer-letter",
    name: "A no-objection letter from the other heirs",
    official: "Annex I-D",
    prescribed: true,
    from: "The other legal heirs sign it",
    cost: "Free",
    time: "As long as it takes to reach them",
    // Waits on people, not on an office. Ranked above the same-day documents
    // so it is not left to last, below anything with a real queue.
    leadDays: 7,
    what:
      "The other heirs confirming they do not object to the money being released to you. Needed only where there are other heirs.",
  },

  "legal-heir-certificate": {
    id: "legal-heir-certificate",
    // Named as the either/or it actually is. Para 10(a) accepts a legal heir
    // certificate OR an acceptable declaration about the heirs, and the
    // difference is weeks: the certificate takes 30-45 days, the declaration
    // takes days. Showing only the certificate as the line item -- with the
    // alternative in small print -- cost families time they never had to lose.
    name: "Legal heir certificate (or an acceptable declaration)",
    official: "Annex I-E accepts either one",
    prescribed: true,
    from: "Certificate: the Tehsildar or revenue office, or your state's e-district portal. Declaration: an independent person the bank accepts",
    cost: "Certificate ₹20–200, varies by state. Declaration: stamp paper only",
    time: "Certificate 30–45 days typically (Karnataka ~21, Tamil Nadu ~30, Maharashtra ~45). Declaration: days",
    leadDays: 45,
    what:
      "Para 10(a) accepts EITHER a revenue officer's certificate naming the legal heirs, OR a declaration about who the heirs are made by an independent person the bank accepts. Neither is a succession certificate, and neither comes from a court. Ask the bank whether it will take the declaration — it often can, and it is much faster.",
    note:
      "The certificate is online in some states only, and its timelines are service targets, not guarantees. If it will take six weeks, ask about the declaration before you start queueing.",
    startFirst: true,
  },

  "heir-declaration": {
    id: "heir-declaration",
    name: "Or: a declaration about who the heirs are",
    official: "Annex I-E",
    prescribed: true,
    from: "A declaration by an independent person the bank accepts",
    cost: "Stamp paper only",
    time: "Days",
    leadDays: 3,
    what:
      "The alternative to a legal heir certificate. Para 10(a) accepts either. If the certificate will take six weeks, ask the bank whether it will take this instead — it often can.",
  },

  "succession-certificate": {
    id: "succession-certificate",
    name: "Succession certificate",
    prescribed: false,
    from: "A District Judge's court, under the Indian Succession Act 1925",
    cost: "Around 3% of the asset value in court fees, plus ₹5,000–25,000 for a lawyer",
    time: "4–7 months uncontested. One to two years if anyone objects",
    leadDays: 210,
    what:
      "A civil court proceeding — a petition, notice to every heir, a newspaper advertisement inviting objections, and hearings at which you must prove the accounts exist.",
    note:
      "Below the threshold with no nominee, para 10(a) requires the bank to settle on the six documents above. Para 10(b) reserves this for claims at or above the threshold, and para 11(b) for cases where the heirs are in dispute.",
  },

  "third-party-surety": {
    id: "third-party-surety",
    name: "A third person to stand as surety",
    prescribed: false,
    from: "Someone the bank accepts, who agrees to be liable",
    cost: "The favour of finding one",
    time: "—",
    leadDays: 0,
    what:
      "A person other than you who guarantees the claim. Different from the indemnity bond you sign yourself.",
    note:
      "Para 10(a): \"No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit.\"",
  },

  witnesses: {
    id: "witnesses",
    name: "Witnesses to attend with you",
    prescribed: false,
    from: "People you bring to the branch",
    cost: "—",
    time: "—",
    leadDays: 0,
    what: "Branches sometimes ask for two people to attend and sign.",
    note:
      "Witnesses are not among the six documents para 10(a) lists for the simplified procedure.",
  },

  vanshavali: {
    id: "vanshavali",
    name: "A family tree document",
    official: "vanshavali",
    prescribed: false,
    from: "Revenue or local authority, in some states",
    cost: "Varies",
    time: "Weeks",
    leadDays: 21,
    what: "A genealogy establishing the family line.",
    note:
      "Not among the six documents para 10(a) lists. What it lists is a legal heir certificate OR a declaration regarding heirs — Annex I-E.",
  },

  affidavit: {
    id: "affidavit",
    name: "An affidavit",
    prescribed: false,
    from: "Notary or magistrate, on stamp paper",
    cost: "₹100–500",
    time: "Days",
    leadDays: 3,
    what: "A sworn statement.",
    note:
      "Para 10(b) mentions an affidavit sworn before an official as an option for claims AT OR ABOVE the threshold. It is not in the para 10(a) list for claims below it.",
  },

  probate: {
    id: "probate",
    name: "Probate of a will",
    prescribed: false,
    from: "A civil court",
    cost: "Court fees plus a lawyer",
    time: "Many months",
    leadDays: 210,
    what: "A court certifying a will and the executor's authority.",
    note:
      "Para 9 says the bank shall not insist on this where there is a nominee or survivor, irrespective of the amount. Para 11(b) requires it where the heirs are in dispute.",
  },
};

/** The six the RBI prescribes for the simplified procedure — para 10(a). */
export const SIMPLIFIED_PROCEDURE: DocId[] = [
  "claim-form",
  "death-certificate",
  "id-proof",
  "indemnity-bond",
  "disclaimer-letter",
  "legal-heir-certificate",
];

/** Nominee or survivor — para 9. Notably short. */
export const NOMINEE_PROCEDURE: DocId[] = [
  "claim-form",
  "death-certificate",
  "id-proof",
];

/**
 * Translated 5 Sep 2026. `name`, `official`, `from`, `cost`, `time`, `what`
 * and `note` are Adhikaar's own plain-English description of each document
 * -- not RBI-verbatim text -- so translating them is correct under the
 * site's rule. The one exception is the direct RBI quote inside
 * `third-party-surety`'s note ("No bond of surety..."), which stays in
 * English in every locale, same as every other statutory quote on the site.
 * `id`, `prescribed`, `leadDays`, `startFirst` and `url` are locale-invariant
 * (routing/ordering data, not display text) and are read from `DOCUMENTS`
 * itself in every locale. Unchecked by a native speaker, same as the rest
 * of the site's translations.
 */
type DocText = Pick<ClaimDoc, "name" | "official" | "from" | "cost" | "time" | "what" | "note">;

const hiDocText: Record<DocId, DocText> = {
  "claim-form": {
    name: "बैंक का दावा फ़ॉर्म",
    official: "नामांकित व्यक्ति होने पर Annex I-A, न होने पर Annex I-B",
    from: "आपका बैंक — शाखा या उसकी वेबसाइट",
    cost: "मुफ़्त",
    time: "उसी दिन",
    what: "वह फ़ॉर्म जिससे दावा शुरू होता है। इसके दो संस्करण हैं: एक अगर नामांकित व्यक्ति दर्ज था, एक अगर नहीं। सही वाला नाम लेकर माँगें।",
  },
  "death-certificate": {
    name: "मृत्यु प्रमाणपत्र",
    from: "नगर निकाय या पंचायत जहाँ मृत्यु दर्ज हुई थी",
    cost: "मामूली",
    time: "आवेदन के बाद 7–14 दिन",
    what: "मृत्यु का पंजीकृत प्रमाणपत्र। कई प्रमाणित प्रतियाँ लें — हर संस्था अपनी प्रति रखना चाहती है।",
    note: "मृत्यु 21 दिनों के भीतर दर्ज होनी चाहिए। एक साल बाद इसके लिए न्यायालयीन आदेश चाहिए।",
  },
  "id-proof": {
    name: "आपका अपना पहचान और पता प्रमाण",
    official: "आधिकारिक रूप से मान्य दस्तावेज़ (OVD)",
    from: "यह आपके पास पहले से है — आधार, पासपोर्ट, वोटर आईडी या ड्राइविंग लाइसेंस",
    cost: "मुफ़्त",
    time: "तुरंत",
    what: "यह साबित करता है कि आप कौन हैं। यह आपके बारे में है, मृतक के बारे में नहीं।",
  },
  "indemnity-bond": {
    name: "एक क्षतिपूर्ति बॉन्ड जो आप खुद हस्ताक्षर करते हैं",
    official: "Annex I-C",
    from: "फ़ॉर्म बैंक देता है",
    cost: "सिर्फ़ स्टाम्प पेपर",
    time: "उसी दिन",
    what: "अगर बाद में कोई प्रतिस्पर्धी दावा आए तो बैंक को कवर करने का आपका लिखित वचन। इस पर आप हस्ताक्षर करते हैं। यह ज़मानत जैसा नहीं है।",
    note: "यह आप खुद के लिए हस्ताक्षर करना है। किसी तीसरे व्यक्ति को सीमा से नीचे ज़मानत के लिए कहना अलग चीज़ है — और पैरा 10(a) कहता है कि इसे नहीं लिया जाना चाहिए।",
  },
  "disclaimer-letter": {
    name: "अन्य उत्तराधिकारियों का अनापत्ति पत्र",
    official: "Annex I-D",
    from: "अन्य क़ानूनी उत्तराधिकारी इस पर हस्ताक्षर करते हैं",
    cost: "मुफ़्त",
    time: "जितना समय उन तक पहुँचने में लगे",
    what: "अन्य उत्तराधिकारियों की पुष्टि कि उन्हें पैसा आपको दिए जाने पर कोई आपत्ति नहीं। यह सिर्फ़ तब चाहिए जब अन्य उत्तराधिकारी हों।",
  },
  "legal-heir-certificate": {
    name: "क़ानूनी उत्तराधिकारी प्रमाणपत्र (या एक स्वीकार्य घोषणा)",
    official: "Annex I-E दोनों में से किसी एक को स्वीकार करता है",
    from: "प्रमाणपत्र: तहसीलदार या राजस्व कार्यालय, या आपके राज्य का ई-डिस्ट्रिक्ट पोर्टल। घोषणा: बैंक द्वारा स्वीकार्य कोई स्वतंत्र व्यक्ति",
    cost: "प्रमाणपत्र ₹20–200, राज्य के अनुसार अलग। घोषणा: सिर्फ़ स्टाम्प पेपर",
    time: "प्रमाणपत्र आमतौर पर 30–45 दिन (कर्नाटक ~21, तमिलनाडु ~30, महाराष्ट्र ~45)। घोषणा: कुछ दिन",
    what: "पैरा 10(a) दोनों में से किसी एक को स्वीकार करता है — राजस्व अधिकारी का प्रमाणपत्र जो क़ानूनी उत्तराधिकारियों के नाम बताता है, या बैंक द्वारा स्वीकार्य किसी स्वतंत्र व्यक्ति की घोषणा कि उत्तराधिकारी कौन हैं। इनमें से कोई भी उत्तराधिकार प्रमाणपत्र नहीं है, और कोई भी न्यायालय से नहीं आता। बैंक से पूछें कि क्या वह घोषणा स्वीकार करेगा — अक्सर कर लेता है, और यह कहीं तेज़ है।",
    note: "प्रमाणपत्र कुछ राज्यों में ही ऑनलाइन है, और उसकी समय-सीमाएँ सेवा लक्ष्य हैं, गारंटी नहीं। अगर इसमें छह हफ़्ते लगेंगे, तो क़तार में लगने से पहले घोषणा के बारे में पूछें।",
  },
  "heir-declaration": {
    name: "या: उत्तराधिकारी कौन हैं इसकी घोषणा",
    official: "Annex I-E",
    from: "बैंक द्वारा स्वीकार्य किसी स्वतंत्र व्यक्ति की घोषणा",
    cost: "सिर्फ़ स्टाम्प पेपर",
    time: "कुछ दिन",
    what: "क़ानूनी उत्तराधिकारी प्रमाणपत्र का विकल्प। पैरा 10(a) दोनों में से कोई भी स्वीकार करता है। अगर प्रमाणपत्र में छह हफ़्ते लगेंगे, तो बैंक से पूछें कि क्या वह इसके बदले यह स्वीकार करेगा — अक्सर कर सकता है।",
  },
  "succession-certificate": {
    name: "उत्तराधिकार प्रमाणपत्र",
    from: "भारतीय उत्तराधिकार अधिनियम 1925 के तहत ज़िला न्यायाधीश की अदालत",
    cost: "संपत्ति मूल्य का लगभग 3% अदालती फ़ीस में, साथ में वकील के लिए ₹5,000–25,000",
    time: "बिना विरोध के 4–7 महीने। कोई आपत्ति करे तो एक से दो साल",
    what: "एक सिविल अदालती कार्यवाही — एक याचिका, हर उत्तराधिकारी को सूचना, आपत्ति आमंत्रित करता समाचार-पत्र विज्ञापन, और सुनवाई जिसमें आपको खातों का अस्तित्व साबित करना होता है।",
    note: "बिना नामांकित व्यक्ति के सीमा से कम राशि के लिए, पैरा 10(a) बैंक को ऊपर दिए छह दस्तावेज़ों पर निपटाने के लिए कहता है। पैरा 10(b) इसे सीमा पर या उससे ऊपर के दावों के लिए, और पैरा 11(b) जहाँ उत्तराधिकारी विवाद में हों उनके लिए सुरक्षित रखता है।",
  },
  "third-party-surety": {
    name: "ज़मानत के लिए एक तीसरा व्यक्ति",
    from: "कोई ऐसा व्यक्ति जिसे बैंक स्वीकार करे और जो ज़िम्मेदारी लेने को राज़ी हो",
    cost: "किसी को ढूँढने का एहसान",
    time: "—",
    what: "आपके अलावा कोई व्यक्ति जो दावे की गारंटी देता है। यह आपके खुद हस्ताक्षर किए क्षतिपूर्ति बॉन्ड से अलग है।",
    note: 'पैरा 10(a): "No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit."',
  },
  witnesses: {
    name: "आपके साथ आने वाले गवाह",
    from: "वे लोग जिन्हें आप शाखा में लाते हैं",
    cost: "—",
    time: "—",
    what: "शाखाएँ कभी-कभी दो लोगों से मौजूद रहने और हस्ताक्षर करने को कहती हैं।",
    note: "गवाह सरलीकृत प्रक्रिया के लिए पैरा 10(a) की सूची के छह दस्तावेज़ों में शामिल नहीं हैं।",
  },
  vanshavali: {
    name: "एक परिवार-वृक्ष दस्तावेज़",
    official: "वंशावली",
    from: "कुछ राज्यों में राजस्व या स्थानीय प्राधिकरण",
    cost: "अलग-अलग",
    time: "हफ़्ते",
    what: "परिवार की वंशावली स्थापित करने वाला दस्तावेज़।",
    note: "पैरा 10(a) की सूची के छह दस्तावेज़ों में शामिल नहीं। सूची में क़ानूनी उत्तराधिकारी प्रमाणपत्र या उत्तराधिकारियों के बारे में घोषणा है — Annex I-E।",
  },
  affidavit: {
    name: "एक शपथ-पत्र",
    from: "नोटरी या मजिस्ट्रेट, स्टाम्प पेपर पर",
    cost: "₹100–500",
    time: "कुछ दिन",
    what: "एक शपथ पर दिया गया बयान।",
    note: "पैरा 10(b) सीमा पर या उससे ऊपर के दावों के लिए किसी अधिकारी के सामने ली गई शपथ का ज़िक्र करता है। यह सीमा से कम दावों के लिए पैरा 10(a) की सूची में नहीं है।",
  },
  probate: {
    name: "वसीयत का प्रोबेट",
    from: "एक सिविल अदालत",
    cost: "अदालती फ़ीस और वकील",
    time: "कई महीने",
    what: "एक अदालत जो वसीयत और निष्पादक के अधिकार को प्रमाणित करती है।",
    note: "पैरा 9 कहता है कि जहाँ नामांकित व्यक्ति या उत्तरजीवी हो, वहाँ बैंक इस पर ज़ोर नहीं देगा, राशि चाहे जितनी हो। पैरा 11(b) जहाँ उत्तराधिकारी विवाद में हों, वहाँ इसकी माँग करता है।",
  },
};

const knDocText: Record<DocId, DocText> = {
  "claim-form": {
    name: "ಬ್ಯಾಂಕಿನ ಹಕ್ಕು ಫಾರ್ಮ್",
    official: "ನಾಮನಿರ್ದೇಶಿತರಿದ್ದರೆ Annex I-A, ಇಲ್ಲದಿದ್ದರೆ Annex I-B",
    from: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ — ಶಾಖೆ ಅಥವಾ ಅದರ ವೆಬ್‌ಸೈಟ್",
    cost: "ಉಚಿತ",
    time: "ಅದೇ ದಿನ",
    what: "ಹಕ್ಕು ಪ್ರಾರಂಭಿಸುವ ಫಾರ್ಮ್. ಇದರಲ್ಲಿ ಎರಡು ಆವೃತ್ತಿಗಳಿವೆ: ನಾಮನಿರ್ದೇಶಿತರು ದಾಖಲಾಗಿದ್ದರೆ ಒಂದು, ಇಲ್ಲದಿದ್ದರೆ ಒಂದು. ಸರಿಯಾದುದನ್ನು ಹೆಸರಿನಿಂದ ಕೇಳಿ.",
  },
  "death-certificate": {
    name: "ಮರಣ ಪ್ರಮಾಣಪತ್ರ",
    from: "ಮರಣ ನೋಂದಣಿಯಾದ ಪುರಸಭೆ ಅಥವಾ ಪಂಚಾಯತ್",
    cost: "ಅಲ್ಪ",
    time: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ ನಂತರ 7–14 ದಿನಗಳು",
    what: "ಮರಣದ ನೋಂದಾಯಿತ ಪ್ರಮಾಣಪತ್ರ. ಹಲವಾರು ದೃಢೀಕೃತ ಪ್ರತಿಗಳನ್ನು ಪಡೆಯಿರಿ — ಪ್ರತಿ ಸಂಸ್ಥೆಯೂ ತನ್ನದೇ ಪ್ರತಿ ಇಟ್ಟುಕೊಳ್ಳಲು ಬಯಸುತ್ತದೆ.",
    note: "ಮರಣವನ್ನು 21 ದಿನಗಳೊಳಗೆ ನೋಂದಾಯಿಸಬೇಕು. ಒಂದು ವರ್ಷದ ನಂತರ ಇದಕ್ಕೆ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಬೇಕಾಗುತ್ತದೆ.",
  },
  "id-proof": {
    name: "ನಿಮ್ಮ ಸ್ವಂತ ಗುರುತು ಮತ್ತು ವಿಳಾಸ ಪುರಾವೆ",
    official: "ಅಧಿಕೃತವಾಗಿ ಮಾನ್ಯ ದಾಖಲೆ (OVD)",
    from: "ಇದು ನಿಮ್ಮ ಬಳಿ ಈಗಾಗಲೇ ಇದೆ — ಆಧಾರ್, ಪಾಸ್‌ಪೋರ್ಟ್, ಮತದಾರ ಗುರುತಿನ ಚೀಟಿ ಅಥವಾ ಚಾಲನಾ ಪರವಾನಗಿ",
    cost: "ಉಚಿತ",
    time: "ತಕ್ಷಣ",
    what: "ನೀವು ಯಾರೆಂಬುದರ ಪುರಾವೆ. ಇದು ನಿಮ್ಮ ಬಗ್ಗೆ, ಮೃತರ ಬಗ್ಗೆ ಅಲ್ಲ.",
  },
  "indemnity-bond": {
    name: "ನೀವೇ ಸಹಿ ಮಾಡುವ ಕ್ಷತಿಪೂರಣ ಬಾಂಡ್",
    official: "Annex I-C",
    from: "ಬ್ಯಾಂಕ್ ಫಾರ್ಮ್ ಒದಗಿಸುತ್ತದೆ",
    cost: "ಸ್ಟ್ಯಾಂಪ್ ಪೇಪರ್ ಮಾತ್ರ",
    time: "ಅದೇ ದಿನ",
    what: "ನಂತರ ಪ್ರತಿಸ್ಪರ್ಧಿ ಹಕ್ಕು ಬಂದರೆ ಬ್ಯಾಂಕನ್ನು ಕಾಪಾಡುವ ನಿಮ್ಮ ಲಿಖಿತ ವಚನ. ಇದಕ್ಕೆ ನೀವು ಸಹಿ ಮಾಡುತ್ತೀರಿ. ಇದು ಜಾಮೀನಿನಂತಲ್ಲ.",
    note: "ಇದು ನೀವೇ ನಿಮಗಾಗಿ ಸಹಿ ಮಾಡುವುದು. ಮಿತಿಗಿಂತ ಕೆಳಗೆ ಮೂರನೇ ವ್ಯಕ್ತಿಯನ್ನು ಜಾಮೀನಾಗಿ ನಿಲ್ಲಲು ಕೇಳುವುದು ಬೇರೆ ವಿಷಯ — ಮತ್ತು ಪ್ಯಾರಾ 10(a) ಇದನ್ನು ಪಡೆಯಬಾರದು ಎಂದು ಹೇಳುತ್ತದೆ.",
  },
  "disclaimer-letter": {
    name: "ಇತರ ವಾರಸುದಾರರಿಂದ ನಿರಾಕ್ಷೇಪಣಾ ಪತ್ರ",
    official: "Annex I-D",
    from: "ಇತರ ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರು ಇದಕ್ಕೆ ಸಹಿ ಮಾಡುತ್ತಾರೆ",
    cost: "ಉಚಿತ",
    time: "ಅವರನ್ನು ತಲುಪಲು ಎಷ್ಟು ಸಮಯ ಬೇಕೋ ಅಷ್ಟು",
    what: "ಹಣವನ್ನು ನಿಮಗೆ ಬಿಡುಗಡೆ ಮಾಡುವುದಕ್ಕೆ ತಮಗೆ ಆಕ್ಷೇಪವಿಲ್ಲ ಎಂದು ಇತರ ವಾರಸುದಾರರು ದೃಢೀಕರಿಸುವುದು. ಇತರ ವಾರಸುದಾರರು ಇದ್ದಾಗ ಮಾತ್ರ ಅಗತ್ಯ.",
  },
  "legal-heir-certificate": {
    name: "ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರ (ಅಥವಾ ಸ್ವೀಕಾರಾರ್ಹ ಘೋಷಣೆ)",
    official: "Annex I-E ಇವೆರಡರಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಸ್ವೀಕರಿಸುತ್ತದೆ",
    from: "ಪ್ರಮಾಣಪತ್ರ: ತಹಸೀಲ್ದಾರ್ ಅಥವಾ ಕಂದಾಯ ಕಚೇರಿ, ಅಥವಾ ನಿಮ್ಮ ರಾಜ್ಯದ ಇ-ಡಿಸ್ಟ್ರಿಕ್ಟ್ ಪೋರ್ಟಲ್. ಘೋಷಣೆ: ಬ್ಯಾಂಕ್ ಸ್ವೀಕರಿಸುವ ಸ್ವತಂತ್ರ ವ್ಯಕ್ತಿ",
    cost: "ಪ್ರಮಾಣಪತ್ರ ₹20–200, ರಾಜ್ಯದಿಂದ ರಾಜ್ಯಕ್ಕೆ ಬದಲಾಗುತ್ತದೆ. ಘೋಷಣೆ: ಸ್ಟ್ಯಾಂಪ್ ಪೇಪರ್ ಮಾತ್ರ",
    time: "ಪ್ರಮಾಣಪತ್ರ ಸಾಮಾನ್ಯವಾಗಿ 30–45 ದಿನಗಳು (ಕರ್ನಾಟಕ ~21, ತಮಿಳುನಾಡು ~30, ಮಹಾರಾಷ್ಟ್ರ ~45). ಘೋಷಣೆ: ಕೆಲವು ದಿನಗಳು",
    what: "ಪ್ಯಾರಾ 10(a) ಇವೆರಡರಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಸ್ವೀಕರಿಸುತ್ತದೆ — ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರನ್ನು ಹೆಸರಿಸುವ ಕಂದಾಯ ಅಧಿಕಾರಿಯ ಪ್ರಮಾಣಪತ್ರ, ಅಥವಾ ವಾರಸುದಾರರು ಯಾರೆಂಬ ಬಗ್ಗೆ ಬ್ಯಾಂಕ್ ಸ್ವೀಕರಿಸುವ ಸ್ವತಂತ್ರ ವ್ಯಕ್ತಿಯ ಘೋಷಣೆ. ಇವೆರಡೂ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರವಲ್ಲ, ಮತ್ತು ಇವೆರಡೂ ನ್ಯಾಯಾಲಯದಿಂದ ಬರುವುದಿಲ್ಲ. ಬ್ಯಾಂಕ್ ಘೋಷಣೆಯನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆಯೇ ಎಂದು ಕೇಳಿ — ಆಗಾಗ್ಗೆ ಸ್ವೀಕರಿಸುತ್ತದೆ, ಮತ್ತು ಅದು ಹೆಚ್ಚು ವೇಗವಾಗಿದೆ.",
    note: "ಪ್ರಮಾಣಪತ್ರ ಕೆಲವು ರಾಜ್ಯಗಳಲ್ಲಿ ಮಾತ್ರ ಆನ್‌ಲೈನ್, ಮತ್ತು ಅದರ ಸಮಯಮಿತಿಗಳು ಸೇವಾ ಗುರಿಗಳು, ಖಾತರಿಗಳಲ್ಲ. ಇದಕ್ಕೆ ಆರು ವಾರ ಬೇಕಾದರೆ, ಸಾಲಿನಲ್ಲಿ ನಿಲ್ಲುವ ಮೊದಲು ಘೋಷಣೆಯ ಬಗ್ಗೆ ಕೇಳಿ.",
  },
  "heir-declaration": {
    name: "ಅಥವಾ: ವಾರಸುದಾರರು ಯಾರೆಂಬ ಘೋಷಣೆ",
    official: "Annex I-E",
    from: "ಬ್ಯಾಂಕ್ ಸ್ವೀಕರಿಸುವ ಸ್ವತಂತ್ರ ವ್ಯಕ್ತಿಯ ಘೋಷಣೆ",
    cost: "ಸ್ಟ್ಯಾಂಪ್ ಪೇಪರ್ ಮಾತ್ರ",
    time: "ಕೆಲವು ದಿನಗಳು",
    what: "ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಪರ್ಯಾಯ. ಪ್ಯಾರಾ 10(a) ಎರಡನ್ನೂ ಸ್ವೀಕರಿಸುತ್ತದೆ. ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಆರು ವಾರ ಬೇಕಾದರೆ, ಬ್ಯಾಂಕ್ ಇದನ್ನು ಬದಲಿಗೆ ಸ್ವೀಕರಿಸುತ್ತದೆಯೇ ಎಂದು ಕೇಳಿ — ಆಗಾಗ್ಗೆ ಸ್ವೀಕರಿಸುತ್ತದೆ.",
  },
  "succession-certificate": {
    name: "ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ",
    from: "ಭಾರತೀಯ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆ 1925 ರ ಅಡಿಯಲ್ಲಿ ಜಿಲ್ಲಾ ನ್ಯಾಯಾಧೀಶರ ನ್ಯಾಯಾಲಯ",
    cost: "ಆಸ್ತಿ ಮೌಲ್ಯದ ಸುಮಾರು 3% ನ್ಯಾಯಾಲಯ ಶುಲ್ಕದಲ್ಲಿ, ಜೊತೆಗೆ ವಕೀಲರಿಗೆ ₹5,000–25,000",
    time: "ವಿರೋಧವಿಲ್ಲದಿದ್ದರೆ 4–7 ತಿಂಗಳು. ಯಾರಾದರೂ ಆಕ್ಷೇಪಿಸಿದರೆ ಒಂದರಿಂದ ಎರಡು ವರ್ಷ",
    what: "ಸಿವಿಲ್ ನ್ಯಾಯಾಲಯದ ಪ್ರಕ್ರಿಯೆ — ಅರ್ಜಿ, ಪ್ರತಿ ವಾರಸುದಾರರಿಗೆ ಸೂಚನೆ, ಆಕ್ಷೇಪಣೆಗಳನ್ನು ಆಹ್ವಾನಿಸುವ ಪತ್ರಿಕಾ ಜಾಹೀರಾತು, ಮತ್ತು ಖಾತೆಗಳು ಅಸ್ತಿತ್ವದಲ್ಲಿವೆ ಎಂದು ನೀವು ಸಾಬೀತುಪಡಿಸಬೇಕಾದ ವಿಚಾರಣೆಗಳು.",
    note: "ನಾಮನಿರ್ದೇಶಿತರಿಲ್ಲದೆ ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಇದ್ದಾಗ, ಪ್ಯಾರಾ 10(a) ಬ್ಯಾಂಕ್ ಮೇಲಿನ ಆರು ದಾಖಲೆಗಳ ಮೇಲೆ ಇತ್ಯರ್ಥಗೊಳಿಸಬೇಕೆಂದು ಹೇಳುತ್ತದೆ. ಪ್ಯಾರಾ 10(b) ಇದನ್ನು ಮಿತಿಯಲ್ಲಿ ಅಥವಾ ಅದಕ್ಕಿಂತ ಮೇಲಿನ ಹಕ್ಕುಗಳಿಗೆ, ಮತ್ತು ಪ್ಯಾರಾ 11(b) ವಾರಸುದಾರರು ವಿವಾದದಲ್ಲಿರುವ ಪ್ರಕರಣಗಳಿಗೆ ಕಾಯ್ದಿರಿಸುತ್ತದೆ.",
  },
  "third-party-surety": {
    name: "ಜಾಮೀನಾಗಿ ನಿಲ್ಲಲು ಮೂರನೇ ವ್ಯಕ್ತಿ",
    from: "ಬ್ಯಾಂಕ್ ಒಪ್ಪುವ, ಹೊಣೆಗಾರಿಕೆ ಒಪ್ಪುವ ಯಾರಾದರೂ",
    cost: "ಒಬ್ಬರನ್ನು ಹುಡುಕುವ ಉಪಕಾರ",
    time: "—",
    what: "ನಿಮ್ಮ ಹೊರತು ಬೇರೆ ವ್ಯಕ್ತಿ ಹಕ್ಕನ್ನು ಖಾತರಿಪಡಿಸುತ್ತಾರೆ. ನೀವೇ ಸಹಿ ಮಾಡುವ ಕ್ಷತಿಪೂರಣ ಬಾಂಡ್‌ಗಿಂತ ಭಿನ್ನ.",
    note: 'ಪ್ಯಾರಾ 10(a): "No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit."',
  },
  witnesses: {
    name: "ನಿಮ್ಮೊಂದಿಗೆ ಹಾಜರಾಗಲು ಸಾಕ್ಷಿಗಳು",
    from: "ನೀವು ಶಾಖೆಗೆ ಕರೆತರುವ ಜನರು",
    cost: "—",
    time: "—",
    what: "ಶಾಖೆಗಳು ಕೆಲವೊಮ್ಮೆ ಇಬ್ಬರು ಹಾಜರಾಗಿ ಸಹಿ ಮಾಡಬೇಕೆಂದು ಕೇಳುತ್ತವೆ.",
    note: "ಸರಳೀಕೃತ ಪ್ರಕ್ರಿಯೆಗಾಗಿ ಪ್ಯಾರಾ 10(a) ಪಟ್ಟಿ ಮಾಡುವ ಆರು ದಾಖಲೆಗಳಲ್ಲಿ ಸಾಕ್ಷಿಗಳು ಸೇರಿಲ್ಲ.",
  },
  vanshavali: {
    name: "ಕುಟುಂಬ ವೃಕ್ಷ ದಾಖಲೆ",
    official: "ವಂಶಾವಳಿ",
    from: "ಕೆಲವು ರಾಜ್ಯಗಳಲ್ಲಿ ಕಂದಾಯ ಅಥವಾ ಸ್ಥಳೀಯ ಪ್ರಾಧಿಕಾರ",
    cost: "ಬದಲಾಗುತ್ತದೆ",
    time: "ವಾರಗಳು",
    what: "ಕುಟುಂಬದ ವಂಶಾವಳಿಯನ್ನು ಸ್ಥಾಪಿಸುವ ದಾಖಲೆ.",
    note: "ಪ್ಯಾರಾ 10(a) ಪಟ್ಟಿ ಮಾಡುವ ಆರು ದಾಖಲೆಗಳಲ್ಲಿ ಇಲ್ಲ. ಅದು ಪಟ್ಟಿ ಮಾಡುವುದು ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ವಾರಸುದಾರರ ಬಗ್ಗೆ ಘೋಷಣೆ — Annex I-E.",
  },
  affidavit: {
    name: "ಅಫಿಡವಿಟ್",
    from: "ನೋಟರಿ ಅಥವಾ ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್, ಸ್ಟ್ಯಾಂಪ್ ಪೇಪರ್ ಮೇಲೆ",
    cost: "₹100–500",
    time: "ಕೆಲವು ದಿನಗಳು",
    what: "ಪ್ರಮಾಣ ಮಾಡಿದ ಹೇಳಿಕೆ.",
    note: "ಪ್ಯಾರಾ 10(b) ಮಿತಿಯಲ್ಲಿ ಅಥವಾ ಅದಕ್ಕಿಂತ ಮೇಲಿನ ಹಕ್ಕುಗಳಿಗೆ ಅಧಿಕಾರಿಯ ಮುಂದೆ ಪ್ರಮಾಣ ಮಾಡಿದ ಅಫಿಡವಿಟ್ ಅನ್ನು ಆಯ್ಕೆಯಾಗಿ ಉಲ್ಲೇಖಿಸುತ್ತದೆ. ಇದು ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಹಕ್ಕುಗಳಿಗೆ ಪ್ಯಾರಾ 10(a) ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲ.",
  },
  probate: {
    name: "ಉಯಿಲಿನ ಪ್ರೊಬೇಟ್",
    from: "ಸಿವಿಲ್ ನ್ಯಾಯಾಲಯ",
    cost: "ನ್ಯಾಯಾಲಯ ಶುಲ್ಕ ಮತ್ತು ವಕೀಲರು",
    time: "ಹಲವು ತಿಂಗಳುಗಳು",
    what: "ಉಯಿಲು ಮತ್ತು ಎಕ್ಸಿಕ್ಯೂಟರ್‌ನ ಅಧಿಕಾರವನ್ನು ಪ್ರಮಾಣೀಕರಿಸುವ ನ್ಯಾಯಾಲಯ.",
    note: "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉತ್ತರಜೀವಿ ಇರುವಲ್ಲಿ, ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ, ಬ್ಯಾಂಕ್ ಇದನ್ನು ಒತ್ತಾಯಿಸಬಾರದು ಎಂದು ಪ್ಯಾರಾ 9 ಹೇಳುತ್ತದೆ. ವಾರಸುದಾರರು ವಿವಾದದಲ್ಲಿರುವಲ್ಲಿ ಪ್ಯಾರಾ 11(b) ಇದನ್ನು ಕೇಳುತ್ತದೆ.",
  },
};

export const DOCUMENT_TEXT_BY_LOCALE: Record<import("./i18n").Locale, Record<DocId, DocText>> = {
  en: DOCUMENTS,
  hi: hiDocText,
  kn: knDocText,
};

/** Reads locale text where it varies, structural fields from the base DOCUMENTS. */
export function documentText(id: DocId, locale: import("./i18n").Locale): ClaimDoc {
  return { ...DOCUMENTS[id], ...DOCUMENT_TEXT_BY_LOCALE[locale][id] };
}

/** Everything the "What were you asked for?" checklist offers. */
export const ASKABLE: DocId[] = [
  "succession-certificate",
  "third-party-surety",
  "witnesses",
  "vanshavali",
  "affidavit",
  "probate",
  "indemnity-bond",
  "legal-heir-certificate",
  "death-certificate",
  "id-proof",
  "claim-form",
];
