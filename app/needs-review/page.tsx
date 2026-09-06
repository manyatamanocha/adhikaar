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
  // A real stuck loop: clicking "I know the answer now" cleared one field
  // (e.g. court) and sent the reader back to /start, but resolve() checks
  // court, then will, then heirs IN THAT FIXED ORDER (see lib/wizard.ts) --
  // whichever of the three is a CONFIRMED blocking value (court "yes", a
  // real will with no nominee, a real heir dispute) makes resolve() return
  // to this exact review page again, unconditionally, no matter what any
  // other field is. Re-asking a different field the reader hasn't touched
  // yet (say, heirs, when court is genuinely "yes") never even gets read --
  // resolve() dies at the court check first. So the only correct fix is:
  // once ANY confirmed blocker is present, there is nothing left to ask.
  // This case needs a lawyer, not another trip through the wizard.
  const disputeConfirmed = a.heirs === "dispute" && a.nominee !== "no";
  const blocked = restricted || (will && a.nominee === "no") || disputeConfirmed;
  const steps: { text: string; href?: string }[] = [
    ...(a.court !== "no" ? [{ text: restricted ? t.stepRestrictedYes : t.stepRestrictedAsk, href: restricted ? undefined : startWithout("court") }] : []),
    ...(a.will !== "no" && a.nominee === "no" ? [{ text: will ? t.stepWillYes : t.stepWillAsk, href: will ? undefined : startWithout("will") }] : []),
    ...(a.heirs !== "agree" ? [{ text: t.stepDispute, href: a.heirs === "dispute" ? undefined : startWithout("heirs") }] : []),
    ...(a.bankType === "unknown" || !a.bankType ? [{ text: t.stepBankTypeUnknown, href: startWithout("bankType") }] : []),
    // "equal" is the same shape of bug as court "yes" -- a confirmed fact,
    // not an unknown. Re-asking the amount and truthfully answering "equal"
    // again just returns here; only genuinely unknown/unset amounts are
    // fixable by looking the figure up and coming back.
    ...(a.amount === "unknown" || a.amount === "equal" || !a.amount ? [{ text: t.stepAmountUnknown, href: a.amount === "equal" ? undefined : startWithout("amount") }] : []),
  ];
  // No button at all once a confirmed blocker exists -- no other field's
  // answer changes the outcome, so there is nothing left to "come back"
  // from. Otherwise, target the first genuinely re-askable field.
  const nextAskable = blocked ? undefined : steps.find(s => s.href);
  return <>
    <RecoverNav />
    <main className="shell max-w-[860px] flex-1 py-10 sm:py-14" lang={locale}>
      <h1 className="display-xl font-serif font-bold text-indigo-ink">{restricted ? t.headingRestricted : will ? t.headingWill : t.headingDefault}</h1>
      <p className="body-fluid mt-5 text-ink-soft">{t.sub}</p>
      <h2 className="display-md mt-8 font-serif font-bold">{t.whatToDoNext}</h2>
      <ol className="body-fluid mt-4 list-decimal space-y-4 pl-6">{steps.map(s => <li key={s.text}>{s.text}</li>)}</ol>
      {nextAskable && (
        <NextStepButton href={nextAskable.href!} label={knowAnswerNow} outcomeType="information_required" />
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
