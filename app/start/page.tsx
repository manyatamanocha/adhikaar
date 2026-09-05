/**
 * The wizard — one question per screen.
 *
 * Server-rendered, with every answer held in the URL. That is a deliberate
 * choice, not a shortcut:
 *
 *   · Back always works, because each answer is a real navigation.
 *   · A half-finished flow has a URL, so it can be sent to a sibling.
 *   · There is no client state to lose on a bad connection, and no JavaScript
 *     needed to answer a question on a mid-range Android phone.
 *   · Nothing about the family is stored, because there is nowhere to store it.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { OUTCOMES } from "@/lib/outcomes";
import { SCENARIOS } from "@/lib/scenarios";
import { parseLocale, withLang, type Locale } from "@/lib/i18n";
import {
  parseAnswers,
  answerQuestion,
  previousAnswers,
  resolve,
  toQuery,
  TOTAL_QUESTIONS,
  type Answers,
  type Option,
  type Question,
} from "@/lib/wizard";

export const metadata = {
  title: "Adhikaar — your claim guide",
};

export default async function Start({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const answers = parseAnswers(sp);

  // The recognition front door: shown only on a genuinely fresh /start (no
  // answers at all yet), and skippable via ?classic=1 for anyone whose
  // situation doesn't match a card and wants the question-by-question order
  // instead — including the out-of-scope exit, which the classic order still
  // asks about first.
  const isFresh = Object.values(answers).every((v) => v === undefined);
  if (isFresh && sp.classic !== "1") {
    return <ScenarioPicker locale={locale} />;
  }

  const step = resolve(answers);
  if (step.kind === "review") redirect(withLang("/confirm-details" + toQuery(step.carry), locale));

  // A verdict is a page of its own, at its own URL. The wizard never renders one.
  if (step.kind === "outcome") {
    redirect(withLang(OUTCOMES[step.outcome].path + toQuery(step.carry), locale));
  }

  const { question } = step;
  const back = previousAnswers(answers);

  return (
    <>
      <RecoverNav />

      <main className="flex-1 bg-mist">
        <div className="shell max-w-[760px] py-8 sm:py-12">
          <Progress current={question.number} />

          <h1 className="display-lg mt-6 font-serif font-bold text-indigo-ink">
            {question.prompt}
          </h1>
          <p className="body-fluid mt-3 max-w-[62ch] text-ink-soft">
            {question.help}
          </p>

          <ul className="mt-7 space-y-3">
            {question.options.map((option) => (
              <li key={option.value}>
                <AnswerLink
                  question={question}
                  option={option}
                  answers={answers}
                  locale={locale}
                />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule-faint pt-5">
            <Link
              href={withLang(back ? `/start${toQuery(back)}` : "/", locale)}
              // 23px of link is not a thumb target. The padding is cancelled by
              // the negative margin, so this is a hit-area change, not a
              // layout one -- and Back is the control a confused tester reaches
              // for first.
              className="-my-2.5 inline-flex items-center gap-2 py-2.5 text-[1rem] font-bold text-indigo"
            >
              <span aria-hidden="true">&larr;</span>
              {back ? "Back a question" : "Back to the start"}
            </Link>
            {/* Precise, because it has to be. The answers are not stored and
                nothing here identifies anyone — but we do count which branch
                of the law people land on, and saying "sent nowhere" would be
                a lie on the one page that cannot afford one. */}
            <p className="text-[0.9375rem] text-ink-faint">
              No account or document uploads. Answers appear in page links.
              <Link href={withLang("/privacy", locale)} className="ml-1 underline">Privacy details</Link>
            </p>
          </div>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The recognition front door — shown before the four legal-shaped
 * questions, so most people can find themselves in one line rather than
 * parsing "What are you claiming?" first. Every card is a real URL into
 * the same wizard/outcome machinery; nothing here is a shortcut around it.
 */
function ScenarioPicker({ locale }: { locale: Locale }) {
  return (
    <>
      <RecoverNav />

      <main className="flex-1 bg-mist">
        <div className="shell max-w-[760px] py-8 sm:py-12">
          <p className="text-[1.375rem] font-bold uppercase tracking-[0.16em] text-saffron-ink">
            Where should we start?
          </p>
          <h1 className="display-lg mt-2.5 font-serif font-bold text-indigo-ink">
            Which of these sounds like your situation?
          </h1>
          <p className="body-fluid mt-3 max-w-[62ch] text-ink-soft">
            Pick whichever is closest — you can change any answer as you go.
          </p>

          <ul className="mt-7 space-y-3">
            {SCENARIOS.map((s) => (
              <li key={s.label}>
                <Link
                  href={withLang(s.href, locale)}
                  className="group flex items-start gap-4 rounded-xl border-2 border-rule bg-white p-5 transition-all hover:border-indigo hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)]"
                >
                  <span className="flex-1">
                    <span className="display-md block font-serif font-bold text-indigo-ink">
                      {s.label}
                    </span>
                    {s.detail && (
                      <span className="body-fluid mt-1.5 block leading-relaxed text-ink-soft">
                        {s.detail}
                      </span>
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[1.25rem] font-bold text-saffron-ink"
                  >
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-rule-faint pt-5">
            <Link
              href={withLang("/start?classic=1", locale)}
              className="-my-2.5 inline-block py-2.5 text-[1rem] font-bold text-indigo underline underline-offset-2"
            >
              None of these — answer a few short questions instead
            </Link>
          </div>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}

function Progress({ current }: { current: number }) {
  return (
    <div>
      <p className="text-[0.875rem] font-bold uppercase tracking-[0.16em] text-saffron-ink">
        Question {current} of {TOTAL_QUESTIONS}
      </p>
      <ol className="mt-2.5 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
          <li
            key={i}
            className={`h-1.5 flex-1 rounded-pill ${
              i + 1 <= current ? "bg-indigo" : "bg-rule"
            }`}
          />
        ))}
      </ol>
      <p className="sr-only">
        Question {current} of {TOTAL_QUESTIONS}. Some answers finish sooner.
      </p>
    </div>
  );
}

/**
 * One answer.
 *
 * "I don't know" is given the same weight as every other option — same size,
 * same target, its own accent rather than a muted one. On the nominee question
 * it is the commonest true answer, and an interface that makes it look like a
 * failure pushes people into guessing, which is the one thing that would make
 * the verdict wrong.
 */
function AnswerLink({
  question,
  option,
  answers,
  locale,
}: {
  question: Question;
  option: Option;
  answers: Answers;
  locale: Locale;
}) {
  const next = answerQuestion(answers, question.id, option.value);
  const accent = option.unsure
    ? "border-accent-violet hover:shadow-[0_6px_24px_rgba(91,75,155,0.16)]"
    : "border-rule hover:border-indigo hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)]";

  return (
    <Link
      href={withLang(`/start${toQuery(next)}`, locale)}
      className={`group flex items-start gap-4 rounded-xl border-2 bg-white p-5 transition-all ${accent}`}
    >
      <span className="flex-1">
        <span className="display-md block font-serif font-bold text-indigo-ink">
          {option.label}
        </span>
        {option.detail && (
          <span className="body-fluid mt-1.5 block leading-relaxed text-ink-soft">
            {option.detail}
          </span>
        )}
      </span>
      <span
        aria-hidden="true"
        className={`mt-1 shrink-0 text-[1.25rem] font-bold ${
          option.unsure ? "text-accent-violet" : "text-saffron-ink"
        }`}
      >
        &rarr;
      </span>
    </Link>
  );
}
