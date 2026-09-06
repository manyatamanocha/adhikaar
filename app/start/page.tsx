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
 *
 * Fully localised 5 Sep 2026: question content lives in
 * lib/wizard.ts's QUESTIONS_BY_LOCALE, scenario cards in
 * lib/scenarios.ts's SCENARIOS_BY_LOCALE, and this page's own static text
 * in lib/i18n-home.ts's HomeDict.startPage.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { OUTCOMES } from "@/lib/outcomes";
import { SCENARIOS_BY_LOCALE, MORE_SCENARIOS_BY_LOCALE } from "@/lib/scenarios";
import { parseLocale, withLang, type Locale } from "@/lib/i18n";
import { HOME_T, type HomeDict } from "@/lib/i18n-home";
import {
  parseAnswers,
  answerQuestion,
  previousAnswers,
  progressFor,
  resolve,
  toQuery,
  type Answers,
  type Option,
  type Question,
} from "@/lib/wizard";

export const metadata = {
  title: "Adhikaar — your claim guide",
};

/**
 * `bank` is deliberately NOT part of Answers/QUESTION_ORDER -- it never
 * changes the verdict logic, only which bank's own published policy is
 * checked against it afterwards (see lib/banks.ts's honesty rule). It rides
 * along on every wizard link the same way `lang` already does via withLang,
 * rather than becoming wizard state resolve() has to reason about.
 */
function withBank(href: string, bankId: string | undefined): string {
  if (!bankId) return href;
  const [path, query] = href.split("?");
  const q = new URLSearchParams(query ?? "");
  q.set("bank", bankId);
  return `${path}?${q}`;
}

export default async function Start({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const t = HOME_T[locale].startPage;
  const answers = parseAnswers(sp);
  const bankId = typeof sp.bank === "string" ? sp.bank : undefined;

  // Default is the question-by-question order, starting at question 1 --
  // direct request, 6 Sep 2026: the claim journey should start with the
  // seven questions, not an interstitial. The scenario-card picker (below)
  // stays available, opt-in, via ?cards=1 for anyone who'd rather recognise
  // their situation from a short list first.
  const isFresh = Object.values(answers).every((v) => v === undefined);
  if (isFresh && sp.cards === "1") {
    return <ScenarioPicker locale={locale} t={t} />;
  }

  const step = resolve(answers, locale);
  if (step.kind === "review") redirect(withLang(withBank("/needs-review" + toQuery(step.carry), bankId), locale));

  // A verdict is a page of its own, at its own URL. The wizard never renders one.
  if (step.kind === "outcome") {
    redirect(withLang(withBank(OUTCOMES[step.outcome].path + toQuery(step.carry), bankId), locale));
  }

  const { question } = step;
  const back = previousAnswers(answers);

  return (
    <>
      <RecoverNav />

      <main className="flex-1 bg-mist">
        <div className="shell max-w-[760px] py-8 sm:py-12">
          <Progress {...progressFor(answers)} t={t} />
          <p className="mt-3 text-[1rem] font-semibold text-ink-soft">{t.timeEstimate}</p>

          {/* Above the question, not under the options -- direct request,
              7 Sep 2026. A reader who mis-taps an answer should find the way
              back without scrolling past the thing they are trying to undo,
              and on a phone the options push it below the fold.

              Above the HEADING rather than immediately above the list: a link
              sitting between a question and its answers breaks the one
              adjacency on this screen that has to stay tight. */}
          <Link
            href={withLang(back ? withBank(`/start${toQuery(back)}`, bankId) : "/", locale)}
            // 23px of link is not a thumb target. The padding is cancelled by
            // the negative margin, so this is a hit-area change, not a layout
            // one -- and Back is the control a confused tester reaches for
            // first.
            className="-my-2.5 mt-4 inline-flex items-center gap-2 py-2.5 text-[1rem] font-bold text-indigo"
          >
            <span aria-hidden="true">&larr;</span>
            {back ? t.backAQuestion : t.backToStart}
          </Link>

          <h1 className="display-lg mt-4 font-serif font-bold text-indigo-ink">
            {question.prompt}
          </h1>
          {question.help && (
            <p className="body-fluid mt-3 max-w-[62ch] text-ink-soft">
              {question.help}
            </p>
          )}

          <ul className="mt-7 space-y-3">
            {question.options.map((option) => (
              <li key={option.value}>
                <AnswerLink
                  question={question}
                  option={option}
                  answers={answers}
                  locale={locale}
                  bankId={bankId}
                />
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-rule-faint pt-5">
            {/* Precise, because it has to be. The answers are not stored and
                nothing here identifies anyone — but we do count which branch
                of the law people land on, and saying "sent nowhere" would be
                a lie on the one page that cannot afford one. */}
            <p className="text-[0.9375rem] text-ink-faint">
              {t.privacyNote}
              <Link href={withLang("/privacy", locale)} className="ml-1 underline">{t.privacyLink}</Link>
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
function ScenarioPicker({ locale, t }: { locale: Locale; t: HomeDict["startPage"] }) {
  const scenarios = SCENARIOS_BY_LOCALE[locale];
  return (
    <>
      <RecoverNav />

      <main className="flex-1 bg-mist">
        <div className="shell max-w-[760px] py-8 sm:py-12">
          <p className="text-[1.375rem] font-bold uppercase tracking-[0.16em] text-saffron-ink">
            {t.eyebrow}
          </p>
          <h1 className="display-lg mt-2.5 font-serif font-bold text-indigo-ink">
            {t.heading}
          </h1>
          <p className="body-fluid mt-3 max-w-[62ch] text-ink-soft">
            {t.sub}
          </p>
          <p className="mt-3 text-[1.05rem] font-semibold text-indigo-ink">
            {t.timeEstimate}
          </p>

          <ul className="mt-7 space-y-3">
            {scenarios.map((s) => (
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
            <details open>
              <summary className="cursor-pointer text-[1.45rem] font-bold text-indigo underline underline-offset-2">
                {t.somethingElse}
              </summary>
              <ul className="mt-4 space-y-3">
                {MORE_SCENARIOS_BY_LOCALE[locale].map((s) => (
                  <li key={s.label}>
                    <Link href={withLang(s.href, locale)} className="group flex items-start gap-4 rounded-xl border border-rule bg-white p-4 transition-colors hover:border-indigo">
                      <span className="flex-1">
                        <span className="block text-[1.32rem] font-bold text-indigo-ink">{s.label}</span>
                        {s.detail && <span className="mt-1 block text-[1.13rem] leading-relaxed text-ink-soft">{s.detail}</span>}
                      </span>
                      <span aria-hidden="true" className="text-lg font-bold text-saffron-ink">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          <div className="mt-5">
            <Link
              href={withLang("/start", locale)}
              className="-my-2.5 inline-block py-2.5 text-[1.375rem] font-bold text-indigo underline underline-offset-2"
            >
              {t.noneOfThese}
            </Link>
          </div>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}

/**
 * The bar is always the full seven questions wide, on every screen of every
 * path -- that fixed scale is the point.
 *
 * The journey's real length is path-dependent and usually shorter: a
 * registered nominee resolves under para 9 at any amount, so four questions
 * stop existing the moment that answer is given. An earlier version made the
 * bar itself that short, which meant the counter said "of up to 7" twice and
 * then "of up to 3", and the bar jumped from two sevenths filled to
 * completely full in one click. The reader had done nothing wrong -- their
 * answer had shortened their own journey -- but it read as the product moving
 * the goalposts mid-flow.
 *
 * So the ruled-out questions stay on the scale as hollow segments and are
 * named in words underneath. Shrinking becomes visible progress ("four of
 * these are not your problem") instead of a silently rewritten total.
 */
function Progress({
  current,
  reachable,
  total,
  t,
}: {
  current: number;
  reachable: number;
  total: number;
  t: HomeDict["startPage"];
}) {
  const ruledOut = total - reachable;
  const isLast = current === reachable;
  return (
    <div>
      <p className="text-[0.875rem] font-bold uppercase tracking-[0.16em] text-saffron-ink">
        {t.questionOf(current, total)}
        {ruledOut > 0 && (
          // Sentence case inside a caps eyebrow on purpose: it is a sentence,
          // and setting it in caps alongside the step number reads as a second
          // label rather than an explanation of the one beside it.
          <span className="ml-2 font-semibold normal-case tracking-normal text-ink-soft">
            · {t.questionsRuledOut(ruledOut)}
          </span>
        )}
      </p>
      <ol className="mt-2.5 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1;
          // Answered or current; still ahead of you; or ruled out by an
          // answer you already gave -- three states, three weights.
          const fill =
            step <= current
              ? "bg-indigo"
              : step <= reachable
                ? "bg-rule"
                : "border border-dashed border-rule bg-transparent";
          return <li key={i} className={`h-1.5 flex-1 rounded-pill ${fill}`} />;
        })}
      </ol>
      {isLast && (
        <p className="mt-2 text-[0.9375rem] font-semibold text-indigo-ink">
          {t.lastQuestion}
        </p>
      )}
      {/* One sentence for a screen reader, rather than three fragments it
          would have to assemble. */}
      <p className="sr-only">
        {t.questionOf(current, total)}
        {ruledOut > 0 && ` — ${t.questionsRuledOut(ruledOut)}`}
        {isLast && ` — ${t.lastQuestion}`}
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
  bankId,
}: {
  question: Question;
  option: Option;
  answers: Answers;
  locale: Locale;
  bankId?: string;
}) {
  const next = answerQuestion(answers, question.id, option.value);
  const accent = option.unsure
    ? "border-accent-violet hover:shadow-[0_6px_24px_rgba(91,75,155,0.16)]"
    : "border-rule hover:border-indigo hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)]";

  return (
    <Link
      href={withLang(withBank(`/start${toQuery(next)}`, bankId), locale)}
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
