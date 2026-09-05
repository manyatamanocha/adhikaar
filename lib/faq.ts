import type { Locale } from "./i18n";
import { PRIVACY_SUMMARY } from "./privacy";

// Shared reviewed content for the FAQ page and Saathi's bounded AI explanations.
//
// Translated 5 Sep 2026 into Hindi and Kannada. These are Adhikaar's own
// summaries, not statutory quotes, so -- unlike lib/rbi.ts -- translating
// them is correct, not a misquote risk. Every legal nuance in the English
// (para 9 vs 10(a), "does not override legal heirs' inheritance rights",
// the ₹15 lakh / ₹5 lakh split, the 15-day clock, the honest privacy
// answer) is carried into both translations rather than simplified away.
// Hindi and Kannada here have NOT been checked by a native speaker.
export type Faq = {
  q: string;
  a: string;
  link?: { label: string; href: string };
  highlight?: boolean;
};

const en: Faq[] = [
  {
    q: "What does Adhikaar do?",
    a: "Adhikaar helps families understand how to claim a deceased loved one's bank deposits. Answer a few questions to understand the process, prepare the paperwork, and know what to do next. Adhikaar guides you; the bank processes your claim.",
  },
  {
    q: "Is Adhikaar a government website?",
    a: "No. Adhikaar is an independent guidance tool, not a government, RBI, or bank website. We explain official rules in simpler language and link to the relevant sources.",
  },
  {
    q: "Does Adhikaar search bank accounts?",
    a: "No. Adhikaar cannot access bank records, check balances, or discover accounts in someone's name. It helps you understand where to look and how to proceed through the relevant official channels.",
    highlight: true,
  },
  {
    q: "Do I need a succession certificate if there was a nominee?",
    a: "Generally, no. For payment to a valid nominee, the bank must not demand a succession certificate, regardless of the amount, once identity and death are verified and no court order prevents payment. Receiving payment does not override legal heirs' inheritance rights.",
    link: { label: "RBI rules", href: "/guide" },
  },
  {
    q: "What if there was no nominee?",
    a: "Legal heirs can still claim. Where there is no nominee or survivorship clause, no will, no competing claim, and no restraining court order, a simplified process applies within the relevant threshold. Larger claims have additional documentation routes; a succession certificate is not always compulsory.",
    link: { label: "RBI guidance", href: "/guide" },
  },
  {
    q: "What is the claim threshold?",
    a: "It is the amount used to determine the paperwork route — not a limit on what you can claim. RBI sets ₹15 lakh for banks other than co-operative banks and ₹5 lakh for co-operative banks. Banks may set higher limits. The calculation includes accrued interest.",
    link: { label: "RBI definition", href: "/guide" },
  },
  {
    q: "What if the heirs disagree?",
    a: "Disputed inheritance may require a succession certificate, probate, letters of administration, or a court order, depending on the case. The bank cannot decide who should inherit. Adhikaar can explain the process, but a qualified lawyer should help with the dispute.",
    link: { label: "Claim procedures", href: "/guide" },
  },
  {
    q: "What documents will the bank ask for?",
    a: "Usually, a claim form, death certificate, and the claimant's identity and address proof. For a simplified claim without a nominee, additional documents include an indemnity bond, other heirs' no-objection letters where applicable, and either a legal heir certificate or an acceptable independent person's declaration. Your checklist depends on your circumstances.",
    link: { label: "Document requirements", href: "/what-were-you-asked-for" },
  },
  {
    q: "What if the bank asks for a surety?",
    a: "A surety is someone who guarantees the claim. Banks must not require one for valid nominee claims or simplified claims within the threshold. An indemnity bond signed by the claimant is different. Ask the bank to explain its requirement in writing.",
    link: { label: "RBI rules", href: "/guide" },
  },
  {
    q: "How long does the bank have to settle the claim?",
    a: "For deceased customers' bank deposits, the deadline is 15 calendar days after the bank receives all required documents, complete in all respects. Ask for a dated acknowledgement and written details of anything missing.",
    link: { label: "Settlement timeline", href: "/guide" },
  },
  {
    q: "Does this cover PPF, insurance, or shares?",
    a: "Adhikaar's detailed claim guidance currently focuses on bank deposits. It can point you towards official resources for other assets, but PPF, insurance, and shares have separate claim processes. Do not use the bank-deposit checklist as their document checklist.",
  },
  {
    q: "Is my information stored?",
    a: PRIVACY_SUMMARY,
    link: { label: "Read our privacy details", href: "/privacy" },
  },
  {
    q: "What can I do if the bank refuses?",
    a: "Ask for the reason in writing and submit a written complaint to the bank. If its response is unsatisfactory, or it does not reply within 30 days, you can generally approach the RBI Ombudsman through the complaint portal, subject to eligibility.",
    link: { label: "RBI complaint guidance", href: "/bank-refused" },
  },
  {
    q: "Is this legal advice?",
    a: "No. Adhikaar provides general information and practical guidance, not personalised legal advice. For disputed inheritance, complicated wills, or court proceedings, consult a qualified lawyer. Adhikaar cannot guarantee claim approval.",
  },
];

const hi: Faq[] = [
  {
    q: "अधिकार क्या करता है?",
    a: "अधिकार परिवारों को यह समझने में मदद करता है कि किसी दिवंगत प्रियजन के बैंक जमा पर दावा कैसे करें। प्रक्रिया समझने, काग़ज़ी कार्रवाई तैयार करने और आगे क्या करना है यह जानने के लिए कुछ सवालों के जवाब दें। अधिकार मार्गदर्शन करता है; दावे को बैंक ही निपटाता है।",
  },
  {
    q: "क्या अधिकार एक सरकारी वेबसाइट है?",
    a: "नहीं। अधिकार एक स्वतंत्र मार्गदर्शन उपकरण है, न कि कोई सरकारी, आरबीआई या बैंक वेबसाइट। हम आधिकारिक नियमों को आसान भाषा में समझाते हैं और संबंधित स्रोतों से जोड़ते हैं।",
  },
  {
    q: "क्या अधिकार बैंक खाते खोजता है?",
    a: "नहीं। अधिकार बैंक रिकॉर्ड तक नहीं पहुँच सकता, बैलेंस नहीं देख सकता, या किसी के नाम पर खाते नहीं खोज सकता। यह आपको यह समझने में मदद करता है कि कहाँ देखना है और संबंधित आधिकारिक माध्यमों से कैसे आगे बढ़ना है।",
    highlight: true,
  },
  {
    q: "अगर नामांकित व्यक्ति था, तो क्या मुझे उत्तराधिकार प्रमाणपत्र चाहिए?",
    a: "आमतौर पर नहीं। एक वैध नामांकित व्यक्ति को भुगतान के लिए, पहचान और मृत्यु की पुष्टि होने और कोई अदालती आदेश भुगतान रोकता न हो तो, बैंक को रकम चाहे जितनी हो, उत्तराधिकार प्रमाणपत्र नहीं माँगना चाहिए। भुगतान मिलना क़ानूनी उत्तराधिकारियों के विरासत अधिकारों को खारिज नहीं करता।",
    link: { label: "आरबीआई के नियम", href: "/guide" },
  },
  {
    q: "अगर नामांकित व्यक्ति नहीं था तो क्या होगा?",
    a: "क़ानूनी उत्तराधिकारी फिर भी दावा कर सकते हैं। जहाँ कोई नामांकित व्यक्ति या उत्तरजीविता शर्त न हो, कोई वसीयत न हो, कोई प्रतिस्पर्धी दावा न हो, और कोई रोक लगाने वाला अदालती आदेश न हो, वहाँ संबंधित सीमा के भीतर एक सरल प्रक्रिया लागू होती है। बड़े दावों के लिए अतिरिक्त दस्तावेज़ी रास्ते हैं; उत्तराधिकार प्रमाणपत्र हमेशा ज़रूरी नहीं।",
    link: { label: "आरबीआई मार्गदर्शन", href: "/guide" },
  },
  {
    q: "दावे की सीमा क्या है?",
    a: "यह वह रकम है जो काग़ज़ी कार्रवाई का रास्ता तय करती है — यह इस बात की सीमा नहीं कि आप कितना दावा कर सकते हैं। आरबीआई सहकारी बैंकों को छोड़कर अन्य बैंकों के लिए ₹15 लाख और सहकारी बैंकों के लिए ₹5 लाख तय करता है। बैंक इससे ऊँची सीमा रख सकते हैं। गणना में जमा ब्याज भी शामिल है।",
    link: { label: "आरबीआई परिभाषा", href: "/guide" },
  },
  {
    q: "अगर उत्तराधिकारी आपस में असहमत हों तो क्या होगा?",
    a: "विवादित विरासत के लिए मामले के अनुसार उत्तराधिकार प्रमाणपत्र, प्रोबेट, प्रशासन-पत्र, या अदालती आदेश चाहिए हो सकता है। बैंक यह तय नहीं कर सकता कि किसे विरासत मिलनी चाहिए। अधिकार प्रक्रिया समझा सकता है, पर विवाद में एक योग्य वकील की मदद लेनी चाहिए।",
    link: { label: "दावा प्रक्रिया", href: "/guide" },
  },
  {
    q: "बैंक कौन-से दस्तावेज़ माँगेगा?",
    a: "आमतौर पर, दावा फ़ॉर्म, मृत्यु प्रमाणपत्र, और दावेदार का पहचान व पता प्रमाण। बिना नामांकित व्यक्ति के सरल दावे के लिए, अतिरिक्त दस्तावेज़ों में क्षतिपूर्ति बॉन्ड, जहाँ लागू हो वहाँ अन्य उत्तराधिकारियों के नो-ऑब्जेक्शन पत्र, और या तो एक क़ानूनी उत्तराधिकार प्रमाणपत्र या किसी स्वीकार्य स्वतंत्र व्यक्ति की घोषणा शामिल है। आपकी सूची आपकी परिस्थितियों पर निर्भर करती है।",
    link: { label: "दस्तावेज़ आवश्यकताएँ", href: "/what-were-you-asked-for" },
  },
  {
    q: "अगर बैंक ज़मानत माँगे तो क्या होगा?",
    a: "ज़मानत वह व्यक्ति है जो दावे की गारंटी देता है। वैध नामांकित-व्यक्ति दावों या सीमा के भीतर सरल दावों के लिए बैंकों को इसकी माँग नहीं करनी चाहिए। दावेदार द्वारा हस्ताक्षरित क्षतिपूर्ति बॉन्ड अलग चीज़ है। बैंक से लिखित में अपनी माँग समझाने को कहें।",
    link: { label: "आरबीआई के नियम", href: "/guide" },
  },
  {
    q: "बैंक को दावा निपटाने में कितना समय लगता है?",
    a: "दिवंगत ग्राहकों के बैंक जमा के लिए, बैंक को सभी ज़रूरी दस्तावेज़ पूरी तरह मिलने के बाद 15 कैलेंडर दिनों की समय-सीमा है। दिनांकित पावती और जो कुछ कमी हो उसका लिखित विवरण माँगें।",
    link: { label: "निपटान समय-सीमा", href: "/guide" },
  },
  {
    q: "क्या यह पीपीएफ़, बीमा, या शेयरों को भी शामिल करता है?",
    a: "अधिकार का विस्तृत दावा मार्गदर्शन फ़िलहाल बैंक जमा पर केंद्रित है। यह अन्य संपत्तियों के लिए आधिकारिक स्रोतों की ओर इशारा कर सकता है, पर पीपीएफ़, बीमा, और शेयरों की अपनी अलग दावा प्रक्रियाएँ हैं। बैंक-जमा की सूची को उनकी दस्तावेज़ सूची के रूप में इस्तेमाल न करें।",
  },
  {
    q: "क्या मेरी जानकारी संग्रहीत होती है?",
    a: "आपको खाता बनाने या व्यक्तिगत दस्तावेज़ अपलोड करने की ज़रूरत नहीं। आपके मार्गदर्शन के जवाब पेज के लिंक में दिखते हैं, इसलिए इसे सावधानी से साझा करें। अगर आप डेडलाइन ट्रैकर इस्तेमाल करते हैं, तो उसकी तारीख़ आपके ब्राउज़र में सहेजी जाती है। बुनियादी उपयोग विश्लेषण भी एकत्र किया जा सकता है।",
  },
  {
    q: "अगर बैंक मना कर दे तो मैं क्या कर सकता/सकती हूँ?",
    a: "कारण लिखित में माँगें और बैंक को लिखित शिकायत दें। अगर उसका जवाब असंतोषजनक हो, या वह 30 दिनों में जवाब न दे, तो आप आमतौर पर पात्रता के अधीन शिकायत पोर्टल के ज़रिए आरबीआई लोकपाल से संपर्क कर सकते हैं।",
    link: { label: "आरबीआई शिकायत मार्गदर्शन", href: "/bank-refused" },
  },
  {
    q: "क्या यह क़ानूनी सलाह है?",
    a: "नहीं। अधिकार सामान्य जानकारी और व्यावहारिक मार्गदर्शन देता है, न कि व्यक्तिगत क़ानूनी सलाह। विवादित विरासत, जटिल वसीयत, या अदालती कार्यवाही के लिए, एक योग्य वकील से सलाह लें। अधिकार दावा मंज़ूरी की गारंटी नहीं दे सकता।",
  },
];

const kn: Faq[] = [
  {
    q: "ಅಧಿಕಾರ್ ಏನು ಮಾಡುತ್ತದೆ?",
    a: "ದಿವಂಗತ ಪ್ರೀತಿಪಾತ್ರರ ಬ್ಯಾಂಕ್ ಠೇವಣಿಗೆ ಹೇಗೆ ಹಕ್ಕು ಸಲ್ಲಿಸಬೇಕು ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಅಧಿಕಾರ್ ಕುಟುಂಬಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಪ್ರಕ್ರಿಯೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು, ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಮತ್ತು ಮುಂದೆ ಏನು ಮಾಡಬೇಕೆಂದು ತಿಳಿಯಲು ಕೆಲವು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ. ಅಧಿಕಾರ್ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ; ಬ್ಯಾಂಕ್ ನಿಮ್ಮ ಹಕ್ಕನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ.",
  },
  {
    q: "ಅಧಿಕಾರ್ ಸರ್ಕಾರಿ ಜಾಲತಾಣವೇ?",
    a: "ಇಲ್ಲ. ಅಧಿಕಾರ್ ಒಂದು ಸ್ವತಂತ್ರ ಮಾರ್ಗದರ್ಶನ ಸಾಧನ, ಸರ್ಕಾರಿ, ಆರ್‌ಬಿಐ ಅಥವಾ ಬ್ಯಾಂಕ್ ಜಾಲತಾಣವಲ್ಲ. ನಾವು ಅಧಿಕೃತ ನಿಯಮಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸುತ್ತೇವೆ ಮತ್ತು ಸಂಬಂಧಿತ ಮೂಲಗಳಿಗೆ ಲಿಂಕ್ ಮಾಡುತ್ತೇವೆ.",
  },
  {
    q: "ಅಧಿಕಾರ್ ಬ್ಯಾಂಕ್ ಖಾತೆಗಳನ್ನು ಹುಡುಕುತ್ತದೆಯೇ?",
    a: "ಇಲ್ಲ. ಅಧಿಕಾರ್‌ಗೆ ಬ್ಯಾಂಕ್ ದಾಖಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಲು, ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲಿಸಲು ಅಥವಾ ಯಾರೊಬ್ಬರ ಹೆಸರಿನಲ್ಲಿ ಖಾತೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಾಧ್ಯವಿಲ್ಲ. ಎಲ್ಲಿ ನೋಡಬೇಕು ಮತ್ತು ಸಂಬಂಧಿತ ಅಧಿಕೃತ ಮಾರ್ಗಗಳ ಮೂಲಕ ಹೇಗೆ ಮುಂದುವರಿಯಬೇಕು ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    highlight: true,
  },
  {
    q: "ನಾಮನಿರ್ದೇಶಿತರು ಇದ್ದರೆ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಬೇಕೇ?",
    a: "ಸಾಮಾನ್ಯವಾಗಿ ಇಲ್ಲ. ಗುರುತು ಮತ್ತು ಮರಣ ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟ ನಂತರ ಮತ್ತು ಪಾವತಿಯನ್ನು ತಡೆಯುವ ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಇಲ್ಲದಿದ್ದರೆ, ಮಾನ್ಯ ನಾಮನಿರ್ದೇಶಿತರಿಗೆ ಪಾವತಿಗಾಗಿ, ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ, ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಕೇಳಬಾರದು. ಪಾವತಿ ಪಡೆಯುವುದು ಕಾನೂನುಬದ್ಧ ಉತ್ತರಾಧಿಕಾರಿಗಳ ಉತ್ತರಾಧಿಕಾರ ಹಕ್ಕುಗಳನ್ನು ರದ್ದುಗೊಳಿಸುವುದಿಲ್ಲ.",
    link: { label: "ಆರ್‌ಬಿಐ ನಿಯಮಗಳು", href: "/guide" },
  },
  {
    q: "ನಾಮನಿರ್ದೇಶಿತರು ಇಲ್ಲದಿದ್ದರೆ ಏನಾಗುತ್ತದೆ?",
    a: "ಕಾನೂನುಬದ್ಧ ಉತ್ತರಾಧಿಕಾರಿಗಳು ಇನ್ನೂ ಹಕ್ಕು ಸಲ್ಲಿಸಬಹುದು. ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉತ್ತರಜೀವಿತ್ವ ಷರತ್ತು ಇಲ್ಲದಿದ್ದಲ್ಲಿ, ಯಾವುದೇ ವಿಲ್ ಇಲ್ಲದಿದ್ದಲ್ಲಿ, ಸ್ಪರ್ಧಾತ್ಮಕ ಹಕ್ಕು ಇಲ್ಲದಿದ್ದಲ್ಲಿ, ಮತ್ತು ತಡೆಯುವ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಇಲ್ಲದಿದ್ದಲ್ಲಿ, ಸಂಬಂಧಿತ ಮಿತಿಯೊಳಗೆ ಸರಳೀಕೃತ ಪ್ರಕ್ರಿಯೆ ಅನ್ವಯಿಸುತ್ತದೆ. ದೊಡ್ಡ ಹಕ್ಕುಗಳಿಗೆ ಹೆಚ್ಚುವರಿ ದಾಖಲೆ ಮಾರ್ಗಗಳಿವೆ; ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಯಾವಾಗಲೂ ಕಡ್ಡಾಯವಲ್ಲ.",
    link: { label: "ಆರ್‌ಬಿಐ ಮಾರ್ಗದರ್ಶನ", href: "/guide" },
  },
  {
    q: "ಹಕ್ಕಿನ ಮಿತಿ ಎಂದರೇನು?",
    a: "ಇದು ದಾಖಲೆಗಳ ಮಾರ್ಗವನ್ನು ನಿರ್ಧರಿಸಲು ಬಳಸುವ ಮೊತ್ತ — ನೀವು ಎಷ್ಟು ಹಕ್ಕು ಸಲ್ಲಿಸಬಹುದು ಎಂಬುದರ ಮಿತಿಯಲ್ಲ. ಆರ್‌ಬಿಐ ಸಹಕಾರಿ ಬ್ಯಾಂಕುಗಳನ್ನು ಹೊರತುಪಡಿಸಿ ಇತರ ಬ್ಯಾಂಕುಗಳಿಗೆ ₹15 ಲಕ್ಷ ಮತ್ತು ಸಹಕಾರಿ ಬ್ಯಾಂಕುಗಳಿಗೆ ₹5 ಲಕ್ಷ ನಿಗದಿಪಡಿಸುತ್ತದೆ. ಬ್ಯಾಂಕುಗಳು ಹೆಚ್ಚಿನ ಮಿತಿಗಳನ್ನು ನಿಗದಿಪಡಿಸಬಹುದು. ಲೆಕ್ಕಾಚಾರದಲ್ಲಿ ಸಂಚಿತ ಬಡ್ಡಿ ಸೇರಿದೆ.",
    link: { label: "ಆರ್‌ಬಿಐ ವ್ಯಾಖ್ಯಾನ", href: "/guide" },
  },
  {
    q: "ಉತ್ತರಾಧಿಕಾರಿಗಳು ಭಿನ್ನಾಭಿಪ್ರಾಯ ಹೊಂದಿದ್ದರೆ ಏನಾಗುತ್ತದೆ?",
    a: "ವಿವಾದಿತ ಉತ್ತರಾಧಿಕಾರಕ್ಕೆ, ಪ್ರಕರಣಕ್ಕೆ ಅನುಗುಣವಾಗಿ, ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಪ್ರೊಬೇಟ್, ಆಡಳಿತ ಪತ್ರಗಳು, ಅಥವಾ ನ್ಯಾಯಾಲಯದ ಆದೇಶ ಬೇಕಾಗಬಹುದು. ಯಾರು ಉತ್ತರಾಧಿಕಾರ ಪಡೆಯಬೇಕು ಎಂದು ಬ್ಯಾಂಕ್ ನಿರ್ಧರಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಅಧಿಕಾರ್ ಪ್ರಕ್ರಿಯೆಯನ್ನು ವಿವರಿಸಬಹುದು, ಆದರೆ ವಿವಾದದಲ್ಲಿ ಅರ್ಹ ವಕೀಲರ ಸಹಾಯ ಪಡೆಯಬೇಕು.",
    link: { label: "ಹಕ್ಕು ಪ್ರಕ್ರಿಯೆಗಳು", href: "/guide" },
  },
  {
    q: "ಬ್ಯಾಂಕ್ ಯಾವ ದಾಖಲೆಗಳನ್ನು ಕೇಳುತ್ತದೆ?",
    a: "ಸಾಮಾನ್ಯವಾಗಿ, ಹಕ್ಕು ಫಾರ್ಮ್, ಮರಣ ಪ್ರಮಾಣಪತ್ರ, ಮತ್ತು ಹಕ್ಕುದಾರರ ಗುರುತು ಮತ್ತು ವಿಳಾಸ ಪುರಾವೆ. ನಾಮನಿರ್ದೇಶಿತರಿಲ್ಲದ ಸರಳೀಕೃತ ಹಕ್ಕಿಗೆ, ಹೆಚ್ಚುವರಿ ದಾಖಲೆಗಳಲ್ಲಿ ನಷ್ಟಭರ್ತಿ ಬಾಂಡ್, ಅನ್ವಯಿಸುವಲ್ಲಿ ಇತರ ಉತ್ತರಾಧಿಕಾರಿಗಳ ನೋ-ಅಬ್ಜೆಕ್ಷನ್ ಪತ್ರಗಳು, ಮತ್ತು ಕಾನೂನುಬದ್ಧ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಸ್ವೀಕಾರಾರ್ಹ ಸ್ವತಂತ್ರ ವ್ಯಕ್ತಿಯ ಘೋಷಣೆ ಸೇರಿವೆ. ನಿಮ್ಮ ಪಟ್ಟಿ ನಿಮ್ಮ ಸಂದರ್ಭಗಳನ್ನು ಅವಲಂಬಿಸಿದೆ.",
    link: { label: "ದಾಖಲೆ ಅಗತ್ಯತೆಗಳು", href: "/what-were-you-asked-for" },
  },
  {
    q: "ಬ್ಯಾಂಕ್ ಜಾಮೀನು ಕೇಳಿದರೆ ಏನಾಗುತ್ತದೆ?",
    a: "ಜಾಮೀನು ಎಂದರೆ ಹಕ್ಕಿಗೆ ಖಾತರಿ ನೀಡುವ ವ್ಯಕ್ತಿ. ಮಾನ್ಯ ನಾಮನಿರ್ದೇಶಿತ ಹಕ್ಕುಗಳಿಗೆ ಅಥವಾ ಮಿತಿಯೊಳಗಿನ ಸರಳೀಕೃತ ಹಕ್ಕುಗಳಿಗೆ ಬ್ಯಾಂಕುಗಳು ಇದನ್ನು ಕೇಳಬಾರದು. ಹಕ್ಕುದಾರರೇ ಸಹಿ ಮಾಡುವ ನಷ್ಟಭರ್ತಿ ಬಾಂಡ್ ಬೇರೆಯೇ ವಿಷಯ. ಬ್ಯಾಂಕಿಗೆ ತನ್ನ ಅಗತ್ಯವನ್ನು ಲಿಖಿತವಾಗಿ ವಿವರಿಸಲು ಕೇಳಿ.",
    link: { label: "ಆರ್‌ಬಿಐ ನಿಯಮಗಳು", href: "/guide" },
  },
  {
    q: "ಬ್ಯಾಂಕ್ ಹಕ್ಕನ್ನು ಇತ್ಯರ್ಥಗೊಳಿಸಲು ಎಷ್ಟು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ?",
    a: "ದಿವಂಗತ ಗ್ರಾಹಕರ ಬ್ಯಾಂಕ್ ಠೇವಣಿಗಳಿಗೆ, ಬ್ಯಾಂಕ್ ಎಲ್ಲಾ ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು, ಎಲ್ಲಾ ರೀತಿಯಲ್ಲಿ ಪೂರ್ಣಗೊಂಡಂತೆ, ಸ್ವೀಕರಿಸಿದ ನಂತರ ಗಡುವು 15 ಕ್ಯಾಲೆಂಡರ್ ದಿನಗಳು. ದಿನಾಂಕದ ಸ್ವೀಕೃತಿ ಮತ್ತು ಕಾಣೆಯಾದ ಯಾವುದೇ ವಿಷಯದ ಲಿಖಿತ ವಿವರಗಳನ್ನು ಕೇಳಿ.",
    link: { label: "ಇತ್ಯರ್ಥ ಸಮಯಮಿತಿ", href: "/guide" },
  },
  {
    q: "ಇದು ಪಿಪಿಎಫ್, ವಿಮೆ, ಅಥವಾ ಷೇರುಗಳನ್ನು ಒಳಗೊಂಡಿದೆಯೇ?",
    a: "ಅಧಿಕಾರ್‌ನ ವಿವರವಾದ ಹಕ್ಕು ಮಾರ್ಗದರ್ಶನ ಪ್ರಸ್ತುತ ಬ್ಯಾಂಕ್ ಠೇವಣಿಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿದೆ. ಇದು ಇತರ ಆಸ್ತಿಗಳಿಗೆ ಅಧಿಕೃತ ಸಂಪನ್ಮೂಲಗಳ ಕಡೆಗೆ ನಿಮ್ಮನ್ನು ನಿರ್ದೇಶಿಸಬಹುದು, ಆದರೆ ಪಿಪಿಎಫ್, ವಿಮೆ, ಮತ್ತು ಷೇರುಗಳಿಗೆ ಪ್ರತ್ಯೇಕ ಹಕ್ಕು ಪ್ರಕ್ರಿಯೆಗಳಿವೆ. ಬ್ಯಾಂಕ್-ಠೇವಣಿ ಪಟ್ಟಿಯನ್ನು ಅವುಗಳ ದಾಖಲೆ ಪಟ್ಟಿಯಾಗಿ ಬಳಸಬೇಡಿ.",
  },
  {
    q: "ನನ್ನ ಮಾಹಿತಿ ಸಂಗ್ರಹವಾಗುತ್ತದೆಯೇ?",
    a: "ನೀವು ಖಾತೆ ರಚಿಸುವ ಅಥವಾ ವೈಯಕ್ತಿಕ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಮಾರ್ಗದರ್ಶನ ಉತ್ತರಗಳು ಪುಟದ ಲಿಂಕ್‌ನಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ, ಆದ್ದರಿಂದ ಇದನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಹಂಚಿಕೊಳ್ಳಿ. ನೀವು ಗಡುವು ಟ್ರ್ಯಾಕರ್ ಬಳಸಿದರೆ, ಅದರ ದಿನಾಂಕ ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗುತ್ತದೆ. ಮೂಲಭೂತ ಬಳಕೆಯ ವಿಶ್ಲೇಷಣೆಯನ್ನೂ ಸಂಗ್ರಹಿಸಬಹುದು.",
  },
  {
    q: "ಬ್ಯಾಂಕ್ ನಿರಾಕರಿಸಿದರೆ ನಾನು ಏನು ಮಾಡಬಹುದು?",
    a: "ಕಾರಣವನ್ನು ಲಿಖಿತವಾಗಿ ಕೇಳಿ ಮತ್ತು ಬ್ಯಾಂಕಿಗೆ ಲಿಖಿತ ದೂರು ಸಲ್ಲಿಸಿ. ಅದರ ಪ್ರತಿಕ್ರಿಯೆ ಅತೃಪ್ತಿಕರವಾಗಿದ್ದರೆ, ಅಥವಾ ಅದು 30 ದಿನಗಳಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯಿಸದಿದ್ದರೆ, ಅರ್ಹತೆಗೆ ಒಳಪಟ್ಟು ನೀವು ಸಾಮಾನ್ಯವಾಗಿ ದೂರು ಪೋರ್ಟಲ್ ಮೂಲಕ ಆರ್‌ಬಿಐ ಒಂಬುಡ್ಸ್‌ಮನ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು.",
    link: { label: "ಆರ್‌ಬಿಐ ದೂರು ಮಾರ್ಗದರ್ಶನ", href: "/bank-refused" },
  },
  {
    q: "ಇದು ಕಾನೂನು ಸಲಹೆಯೇ?",
    a: "ಇಲ್ಲ. ಅಧಿಕಾರ್ ಸಾಮಾನ್ಯ ಮಾಹಿತಿ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ, ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಕಾನೂನು ಸಲಹೆಯಲ್ಲ. ವಿವಾದಿತ ಉತ್ತರಾಧಿಕಾರ, ಸಂಕೀರ್ಣ ವಿಲ್‌ಗಳು, ಅಥವಾ ನ್ಯಾಯಾಲಯದ ವಿಚಾರಣೆಗಳಿಗೆ, ಅರ್ಹ ವಕೀಲರನ್ನು ಸಂಪರ್ಕಿಸಿ. ಅಧಿಕಾರ್ ಹಕ್ಕು ಅನುಮೋದನೆಗೆ ಖಾತರಿ ನೀಡಲಾರದು.",
  },
];

export const FAQS_BY_LOCALE: Record<Locale, Faq[]> = { en, hi, kn };

/** Kept for any existing import sites -- English array, same as before. */
export const FAQS = en;
