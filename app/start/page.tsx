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
import { SiteHeader, SiteFooter } from "../_components/chrome";
import { OUTCOMES } from "@/lib/outcomes";
import {
  parseAnswers,
  previousAnswers,
  resolve,
  toQuery,
  TOTAL_QUESTIONS,
  type Answers,
  type Option,
  type Question,
} from "@/lib/wizard";

export const metadata = {
  title: "Adhikaar — four questions",
};

export default async function Start({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const answers = parseAnswers(await searchParams);
  const step = resolve(answers);

  // A verdict is a page of its own, at its own URL. The wizard never renders one.
  if (step.kind === "outcome") {
    redirect(OUTCOMES[step.outcome].path + toQuery(step.carry));
  }

  const { question } = step;
  const back = previousAnswers(answers);

  return (
    <>
      <SiteHeader />

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
                />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule-faint pt-5">
            <Link
              href={back ? `/start${toQuery(back)}` : "/"}
              className="inline-flex items-center gap-2 text-[0.9375rem] font-bold text-indigo"
            >
              <span aria-hidden="true">&larr;</span>
              {back ? "Back a question" : "Back to the start"}
            </Link>
            <p className="text-[0.875rem] text-ink-faint">
              Nothing you tap here is stored or sent anywhere.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Progress({ current }: { current: number }) {
  return (
    <div>
      <p className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-saffron-ink">
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
}: {
  question: Question;
  option: Option;
  answers: Answers;
}) {
  const next: Answers = { ...answers, [question.id]: option.value };
  const accent = option.unsure
    ? "border-accent-violet hover:shadow-[0_6px_24px_rgba(91,75,155,0.16)]"
    : "border-rule hover:border-indigo hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)]";

  return (
    <Link
      href={`/start${toQuery(next)}`}
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
