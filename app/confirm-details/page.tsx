import Link from "next/link";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { parseAnswers, toQuery, QUESTIONS_BY_LOCALE, QUESTION_ORDER, answerQuestion } from "@/lib/wizard";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";
import { NOTIFICATION } from "@/lib/rbi";
import { NextStepButton } from "../_components/next-step-button";

export const metadata = { title: "Confirm your claim details — Adhikaar", robots: { index: false } };

export default async function ConfirmDetails({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const a = parseAnswers(sp);
  const locale = parseLocale(sp.lang);
  const t = HOME_T[locale].confirmDetailsPage;
  const knowAnswerNow = HOME_T[locale].verdictPage.knowAnswerNow;
  const QUESTIONS = QUESTIONS_BY_LOCALE[locale];
  const restricted = a.court === "yes";
  const will = a.will === "yes";
  // Same "clear this one field, go find out, come back" href the wizard
  // uses for its own "Change:" links -- so the primary CTA sends the reader
  // to resolve the FIRST unconfirmed condition, not just back to the top.
  const startWithout = (field: keyof typeof a) => withLang(`/start${toQuery({ ...a, [field]: undefined })}`, locale);
  const steps: { text: string; href: string }[] = [
    ...(a.court !== "no" ? [{ text: restricted ? t.stepRestrictedYes : t.stepRestrictedAsk, href: startWithout("court") }] : []),
    ...(a.will !== "no" && a.nominee === "no" ? [{ text: will ? t.stepWillYes : t.stepWillAsk, href: startWithout("will") }] : []),
    ...(a.heirs !== "agree" ? [{ text: t.stepDispute, href: startWithout("heirs") }] : []),
    ...(a.bankType === "unknown" || !a.bankType ? [{ text: t.stepBankTypeUnknown, href: startWithout("bankType") }] : []),
    ...(a.amount === "unknown" || a.amount === "equal" || !a.amount ? [{ text: t.stepAmountUnknown, href: startWithout("amount") }] : []),
  ];
  return <>
    <RecoverNav />
    <main className="shell max-w-[860px] flex-1 py-10 sm:py-14" lang={locale}>
      <h1 className="display-xl font-serif font-bold text-indigo-ink">{restricted ? t.headingRestricted : will ? t.headingWill : t.headingDefault}</h1>
      <p className="body-fluid mt-5 text-ink-soft">{t.sub}</p>
      <h2 className="display-md mt-8 font-serif font-bold">{t.whatToDoNext}</h2>
      <ol className="body-fluid mt-4 list-decimal space-y-4 pl-6">{steps.map(s => <li key={s.text}>{s.text}</li>)}</ol>
      {steps.length > 0 && (
        <NextStepButton href={steps[0].href} label={knowAnswerNow} outcomeType="information_required" />
      )}
      <h2 className="display-md mt-8 font-serif font-bold">{t.reviewAnswers}</h2>
      <ul className="body-fluid mt-4 space-y-3">{QUESTION_ORDER.filter(id => a[id]).map(id => {
        const earlier = answerQuestion(a, id, a[id]!);
        delete earlier[id];
        return <li key={id}><Link className="text-link underline" href={withLang("/start" + toQuery(earlier), locale)}>{t.change} {QUESTIONS[id].prompt}</Link></li>;
      })}</ul>
      <p className="body-fluid mt-4"><Link className="text-link underline" href={withLang("/start", locale)}>{t.startAgain}</Link></p>
      <p className="mt-8 text-ink-soft">{t.disclaimer} <a href={NOTIFICATION.url} target="_blank" rel="noreferrer" className="underline">{t.readDirections}</a></p>
    </main>
    <RecoverFooter />
  </>;
}
