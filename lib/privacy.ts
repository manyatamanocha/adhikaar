/**
 * Single maintained summary used by the FAQ and privacy page.
 *
 * Kept up to date for Saathi (live 5 Sep 2026, GROQ_API_KEY configured):
 * messages sent to Saathi are not stored by Adhikaar, but they ARE sent to
 * Groq to generate a reply. This sentence was dropped once already when
 * this file was independently rewritten by a concurrent session -- if it
 * goes missing again, restore it rather than treating its absence as a
 * deliberate decision. The vault's "landing cleanup and Saathi Groq
 * checkpoint" note explicitly requires this disclosure before AI launch,
 * and Saathi is now live, not hypothetical.
 */
export const PRIVACY_SUMMARY =
  "The claim guide does not ask for an account or document uploads. Guidance answers and checklist choices appear in page URLs, which are sent to the website server and can remain in browser history or shared links. The optional deadline date stays in browser storage. Basic usage analytics may be sent to Mixpanel when configured. If you use Saathi, the assistant, your messages are sent to Groq (the AI service that powers it) to generate a reply -- Adhikaar itself does not store that chat.";

/**
 * Translated 5 Sep 2026 for the /privacy page. `lib/faq.ts`'s hi/kn "Is my
 * information stored?" answers still carry an older, pre-Saathi Hindi/Kannada
 * wording written before this file's Saathi/Groq sentence existed -- flagged
 * as a follow-up, not fixed here, since that FAQ copy needs its own review
 * rather than a straight swap to this (longer, page-length) summary.
 */
export const PRIVACY_SUMMARY_BY_LOCALE = {
  en: PRIVACY_SUMMARY,
  hi: "क्लेम गाइड कोई खाता या दस्तावेज़ अपलोड नहीं माँगती। मार्गदर्शन के जवाब और सूची की टिक पेज URL में दिखते हैं, जो वेबसाइट सर्वर को भेजे जाते हैं और ब्राउज़र इतिहास या साझा किए गए लिंक में रह सकते हैं। वैकल्पिक डेडलाइन तारीख़ ब्राउज़र स्टोरेज में रहती है। कॉन्फ़िगर होने पर बुनियादी उपयोग विश्लेषण Mixpanel को भेजा जा सकता है। अगर आप सहायक साथी का उपयोग करते हैं, तो आपके संदेश जवाब बनाने के लिए Groq (इसे चलाने वाली AI सेवा) को भेजे जाते हैं — अधिकार ख़ुद वह बातचीत सहेजता नहीं है।",
  kn: "ಕ್ಲೇಮ್ ಗೈಡ್ ಖಾತೆ ಅಥವಾ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಕೇಳುವುದಿಲ್ಲ. ಮಾರ್ಗದರ್ಶನ ಉತ್ತರಗಳು ಮತ್ತು ಪಟ್ಟಿಯ ಟಿಕ್‌ಗಳು ಪುಟದ URL ನಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ, ಅವು ವೆಬ್‌ಸೈಟ್ ಸರ್ವರ್‌ಗೆ ಕಳುಹಿಸಲ್ಪಡುತ್ತವೆ ಮತ್ತು ಬ್ರೌಸರ್ ಇತಿಹಾಸ ಅಥವಾ ಹಂಚಿಕೊಂಡ ಲಿಂಕ್‌ಗಳಲ್ಲಿ ಉಳಿಯಬಹುದು. ಐಚ್ಛಿಕ ಗಡುವು ದಿನಾಂಕ ಬ್ರೌಸರ್ ಸಂಗ್ರಹಣೆಯಲ್ಲಿ ಉಳಿಯುತ್ತದೆ. ಕಾನ್ಫಿಗರ್ ಮಾಡಿದಾಗ ಮೂಲಭೂತ ಬಳಕೆಯ ವಿಶ್ಲೇಷಣೆಯನ್ನು Mixpanel ಗೆ ಕಳುಹಿಸಬಹುದು. ನೀವು ಸಹಾಯಕ ಸಾಥಿಯನ್ನು ಬಳಸಿದರೆ, ನಿಮ್ಮ ಸಂದೇಶಗಳು ಪ್ರತ್ಯುತ್ತರ ರಚಿಸಲು Groq (ಇದನ್ನು ಚಾಲನೆ ಮಾಡುವ AI ಸೇವೆ) ಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ — ಅಧಿಕಾರ್ ಸ್ವತಃ ಆ ಚಾಟ್ ಅನ್ನು ಉಳಿಸುವುದಿಲ್ಲ.",
} as const;
