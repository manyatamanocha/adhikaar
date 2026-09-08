import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { RecoverFooter } from "../../recover/_components/footer";
import { parseLocale, withLang } from "@/lib/i18n";

export const metadata = { title: "Waiting for the bank — Adhikaar" };

const COPY = {
  en: {
    title: "Does the bank have all the required documents?",
    help: "Check your acknowledgement or ask the bank to confirm. The date you first handed in papers may be different from the date the file became complete.",
    yes: "Yes, the bank confirmed it", no: "Some documents are still missing", unsure: "I'm not sure",
    confirmed: "Keep the date and acknowledgement",
    confirmedBody: "Ask the bank for a written status update using the date it received the complete documents. Keep a copy of your acknowledgement and the bank's reply.",
    missing: "Find out exactly what is missing",
    missingBody: "Ask the bank for a written list of the missing documents. If a request is unclear, check it before arranging more paperwork.",
    unknown: "Ask the bank to confirm your file is complete",
    unknownBody: "Ask: Have you received all the required documents? If yes, on what date? If not, please list what is still missing. Keep the reply with your claim papers.",
    check: "Check a document request", complaint: "Need help with a delay or refusal?", change: "Change my answer", back: "Back to my options",
  },
  hi: {
    title: "क्या बैंक को सभी ज़रूरी दस्तावेज़ मिल गए हैं?",
    help: "पावती जाँचें या बैंक से पुष्टि लें। पहली बार काग़ज़ जमा करने और फ़ाइल पूरी होने की तारीख़ अलग हो सकती है।",
    yes: "हाँ, बैंक ने पुष्टि की है", no: "कुछ दस्तावेज़ अभी बाकी हैं", unsure: "मुझे पक्का नहीं पता",
    confirmed: "तारीख़ और पावती संभालकर रखें", confirmedBody: "सभी दस्तावेज़ मिलने की तारीख़ बताकर बैंक से लिखित स्थिति पूछें। पावती और बैंक का जवाब संभालकर रखें।",
    missing: "जानें कि कौन से दस्तावेज़ बाकी हैं", missingBody: "बैंक से बाकी दस्तावेज़ों की लिखित सूची माँगें। कोई माँग समझ न आए तो और काग़ज़ तैयार करने से पहले उसे जाँचें।",
    unknown: "बैंक से फ़ाइल पूरी होने की पुष्टि माँगें", unknownBody: "पूछें: क्या सभी ज़रूरी दस्तावेज़ मिल गए हैं? अगर हाँ, किस तारीख़ को? अगर नहीं, तो क्या बाकी है? जवाब संभालकर रखें।",
    check: "दस्तावेज़ की माँग जाँचें", complaint: "देरी या इनकार पर मदद चाहिए?", change: "जवाब बदलें", back: "मेरे विकल्पों पर वापस",
  },
  kn: {
    title: "ಬ್ಯಾಂಕಿಗೆ ಎಲ್ಲಾ ಅಗತ್ಯ ದಾಖಲೆಗಳು ಸಿಕ್ಕಿವೆಯೇ?",
    help: "ಸ್ವೀಕೃತಿ ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಬ್ಯಾಂಕನ್ನು ಕೇಳಿ. ಮೊದಲು ದಾಖಲೆ ಕೊಟ್ಟ ದಿನ ಮತ್ತು ಎಲ್ಲಾ ದಾಖಲೆ ತಲುಪಿದ ದಿನ ಬೇರೆ ಇರಬಹುದು.",
    yes: "ಹೌದು, ಬ್ಯಾಂಕ್ ಖಚಿತಪಡಿಸಿದೆ", no: "ಕೆಲವು ದಾಖಲೆಗಳು ಇನ್ನೂ ಬಾಕಿ ಇವೆ", unsure: "ನನಗೆ ಖಚಿತವಿಲ್ಲ",
    confirmed: "ದಿನಾಂಕ ಮತ್ತು ಸ್ವೀಕೃತಿ ಇಟ್ಟುಕೊಳ್ಳಿ", confirmedBody: "ಎಲ್ಲಾ ದಾಖಲೆ ತಲುಪಿದ ದಿನಾಂಕ ತಿಳಿಸಿ ಬ್ಯಾಂಕಿನಿಂದ ಲಿಖಿತ ಸ್ಥಿತಿ ಕೇಳಿ. ಸ್ವೀಕೃತಿ ಮತ್ತು ಉತ್ತರದ ಪ್ರತಿ ಇಟ್ಟುಕೊಳ್ಳಿ.",
    missing: "ಯಾವ ದಾಖಲೆಗಳು ಬಾಕಿ ಇವೆ ಎಂದು ತಿಳಿಯಿರಿ", missingBody: "ಬಾಕಿ ದಾಖಲೆಗಳ ಲಿಖಿತ ಪಟ್ಟಿ ಕೇಳಿ. ಬೇಡಿಕೆ ಸ್ಪಷ್ಟವಿಲ್ಲದಿದ್ದರೆ ಇನ್ನಷ್ಟು ದಾಖಲೆ ಸಿದ್ಧಪಡಿಸುವ ಮೊದಲು ಪರಿಶೀಲಿಸಿ.",
    unknown: "ಎಲ್ಲಾ ದಾಖಲೆ ಸಿಕ್ಕಿವೆಯೇ ಎಂದು ಬ್ಯಾಂಕನ್ನು ಕೇಳಿ", unknownBody: "ಎಲ್ಲಾ ಅಗತ್ಯ ದಾಖಲೆ ಸಿಕ್ಕಿವೆಯೇ? ಹೌದಾದರೆ ಯಾವ ದಿನಾಂಕಕ್ಕೆ? ಇಲ್ಲವಾದರೆ ಏನು ಬಾಕಿ ಇದೆ? ಎಂದು ಕೇಳಿ. ಉತ್ತರವನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ.",
    check: "ದಾಖಲೆಯ ಬೇಡಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ", complaint: "ವಿಳಂಬ ಅಥವಾ ನಿರಾಕರಣೆಗೆ ಸಹಾಯ ಬೇಕೇ?", change: "ಉತ್ತರ ಬದಲಿಸಿ", back: "ನನ್ನ ಆಯ್ಕೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
  },
};

export default async function Waiting({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const t = COPY[locale];
  const answer = typeof sp.complete === "string" && ["yes", "no", "unknown"].includes(sp.complete) ? sp.complete : undefined;
  const title = answer === "yes" ? t.confirmed : answer === "no" ? t.missing : t.unknown;
  const body = answer === "yes" ? t.confirmedBody : answer === "no" ? t.missingBody : t.unknownBody;
  return <>
    <RecoverNav />
    <main className="shell max-w-[760px] flex-1 py-8 sm:py-12" lang={locale}>
      <Link href={withLang("/start/started", locale)} className="inline-flex min-h-11 items-center font-bold text-indigo underline">{t.back}</Link>
      <h1 className="display-lg mt-5 font-serif font-bold text-indigo-ink">{answer ? title : t.title}</h1>
      <p className="body-fluid mt-4 leading-relaxed text-ink-soft">{answer ? body : t.help}</p>
      {!answer ? <ul className="mt-6 space-y-3">{[["yes", t.yes], ["no", t.no], ["unknown", t.unsure]].map(([value, label]) => <li key={value}>
        <Link className="block rounded-xl border-2 border-rule bg-white p-5 text-lg font-bold text-indigo hover:border-indigo" href={withLang("/start/waiting?complete=" + value, locale)}>{label}</Link>
      </li>)}</ul> : <div className="mt-6 flex flex-col items-start gap-3">
        <Link className="inline-flex min-h-11 items-center rounded-full bg-indigo px-6 py-3 font-bold text-white" href={withLang(answer === "yes" ? "/bank-refused" : "/what-were-you-asked-for", locale)}>{answer === "yes" ? t.complaint : t.check}</Link>
        <Link className="inline-flex min-h-11 items-center font-bold text-indigo underline" href={withLang("/start/waiting", locale)}>{t.change}</Link>
      </div>}
    </main>
    <RecoverFooter />
  </>;
}
