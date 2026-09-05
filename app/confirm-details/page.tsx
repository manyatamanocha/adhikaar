import Link from "next/link";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { parseAnswers, toQuery, QUESTIONS, QUESTION_ORDER, answerQuestion } from "@/lib/wizard";
import { parseLocale, withLang } from "@/lib/i18n";
import { NOTIFICATION } from "@/lib/rbi";

export const metadata = { title: "Confirm your claim details — Adhikaar", robots: { index: false } };

export default async function ConfirmDetails({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const a = parseAnswers(sp);
  const locale = parseLocale(sp.lang);
  const restricted = a.court === "yes";
  const will = a.will === "yes";
  const steps = [
    ...(a.court !== "no" ? [restricted
      ? "Take the restraining order to your lawyer and the bank. Payment cannot proceed while an applicable restriction remains in force; ask what subsequent court order is needed."
      : "Ask the bank whether it knows of a court order preventing payment."] : []),
    ...(a.will !== "no" && a.nominee === "no" ? [will
      ? "Give the bank a copy of the will and request its written document requirements. Probate or letters of administration may apply; the bank can sometimes act on an undisputed will, subject to applicable law. Get qualified advice."
      : "Check with the family whether a will was left. Do not treat an unknown will status as 'no will'."] : []),
    ...(a.heirs !== "agree" ? ["Confirm whether anyone contests the claim. For a known dispute, obtain individual advice; do not assume a standard document checklist resolves inheritance rights."] : []),
    ...(a.bankType === "unknown" || !a.bankType ? ["Ask the bank whether it is a co-operative bank and request its current deceased-deposit claim policy."] : []),
    ...(a.amount === "unknown" || a.amount === "equal" || !a.amount ? ["Ask for the aggregate payable at this bank, including interest, and its applicable threshold. If the amount equals the threshold, ask the bank to confirm the documentation route in writing."] : []),
  ];
  return <>
    <RecoverNav />
    <main className="shell max-w-[860px] flex-1 py-10 sm:py-14" lang="en">
      <h1 className="display-xl font-serif font-bold text-indigo-ink">{restricted ? "A court restriction needs to be resolved first." : will ? "A will needs a different documentation check." : "We need to confirm a few details first."}</h1>
      <p className="body-fluid mt-5 text-ink-soft">We cannot yet confirm that the simplified checklist applies. This does not mean you must obtain a succession certificate.</p>
      <h2 className="display-md mt-8 font-serif font-bold">What to do next</h2>
      <ol className="body-fluid mt-4 list-decimal space-y-4 pl-6">{steps.map(s => <li key={s}>{s}</li>)}</ol>
      <h2 className="display-md mt-8 font-serif font-bold">Review your answers</h2>
      <ul className="body-fluid mt-4 space-y-3">{QUESTION_ORDER.filter(id => a[id]).map(id => {
        const earlier = answerQuestion(a, id, a[id]!);
        delete earlier[id];
        return <li key={id}><Link className="text-link underline" href={withLang("/start" + (toQuery(earlier) || "?classic=1"), locale)}>Change: {QUESTIONS[id].prompt}</Link></li>;
      })}</ul>
      <p className="body-fluid mt-4"><Link className="text-link underline" href={withLang("/start?classic=1", locale)}>Start again with confirmed details</Link></p>
      <p className="mt-8 text-ink-soft">General information, not legal advice. <a href={NOTIFICATION.url} target="_blank" rel="noreferrer" className="underline">Read the RBI directions, paragraphs 7–11.</a></p>
    </main>
    <RecoverFooter />
  </>;
}
