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
import { parseLocale, withLang, type Locale } from "@/lib/i18n";
import { HOME_T, type HomeDict } from "@/lib/i18n-home";
import { BankSummary } from "../_components/bank-panel";
import { SITUATIONS_T, type Situation } from "@/lib/i18n-situations";
import {
  parseAnswers,
  parseEntry,
  answerQuestion,
  previousAnswers,
  progressFor,
  resolve,
  toQuery,
  QUESTION_ORDER,
  type Answers,
  type Entry,
  type Option,
  type Question,
} from "@/lib/wizard";

export const metadata = {
  title: "Adhikaar — your claim guide",
};

/**
 * `entry` rides along the same way, and for the same reason: it is not an
 * answer to any question, so toQuery() must not serialise it and
 * previousAnswers() must not be able to delete it.
 *
 * It has to survive all the way to the verdict page, not just to the end of
 * the wizard -- OutcomePage re-runs resolve() to reject hand-edited URLs, and
 * without `entry` there it would decide the court question was still owed and
 * bounce the reader back to a question this path never asks.
 */
function withEntry(href: string, entry: Entry | undefined): string {
  if (!entry) return href;
  const [path, query] = href.split("?");
  const q = new URLSearchParams(query ?? "");
  q.set("entry", entry);
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
  const entry = parseEntry(sp.entry);
  const link = (href: string) => withLang(withEntry(href, entry), locale);

  // Over QUESTION_ORDER, which includes `bank` (Q2) since 7 Sep 2026 evening.
  // A URL carrying only ?bank=sbi therefore counts as fresh no longer: it is
  // a real, contiguous answer now, so that reader lands on question one
  // (claiming) rather than being sent to the situation picker.
  const isFresh = QUESTION_ORDER.every((id) => answers[id] === undefined);

  // A fresh visit meets the five situations, not question one.
  //
  // The wizard walked the RBI's decision tree in the RBI's order, which meant
  // someone whose bank had already demanded a succession certificate had to
  // answer seven questions about nominees, wills and thresholds before the
  // product engaged with what had actually happened to them. See
  // docs/superpowers/specs/2026-09-07-claim-journey-rebuild-design.md.
  //
  // `?begin=1` is the wizard's own door, used by the "I have not started"
  // situation. A URL already carrying answers skips the picker entirely, so
  // every link already shared or bookmarked lands exactly where it used to.
  if (isFresh && sp.begin !== "1") {
    return <SituationPicker locale={locale} />;
  }

  const step = resolve(answers, locale, entry);
  if (step.kind === "review") redirect(link("/needs-review" + toQuery(step.carry)));

  // A verdict is a page of its own, at its own URL. The wizard never renders one.
  if (step.kind === "outcome") {
    redirect(link(OUTCOMES[step.outcome].path + toQuery(step.carry)));
  }

  const { question } = step;
  const back = previousAnswers(answers);
  // Cleared, not omitted: toQuery's `if (a[id])` guard already treats a
  // falsy value as absent, so this reaches the bank question again without
  // needing a second code path to "remove a key".
  const changeHref = link(`/start${toQuery({ ...answers, bank: undefined })}`);

  return (
    <>
      <RecoverNav />

      <main className="flex-1 bg-mist">
        <div className="shell max-w-[760px] py-8 sm:py-12">
          <Progress {...progressFor(answers, entry)} t={t} />
          <p className="mt-3 text-[1rem] font-semibold text-ink-soft">{t.timeEstimate}</p>

          {/* Above the question, not under the options -- direct request,
              7 Sep 2026. A reader who mis-taps an answer should find the way
              back without scrolling past the thing they are trying to undo,
              and on a phone the options push it below the fold.

              Above the HEADING rather than immediately above the list: a link
              sitting between a question and its answers breaks the one
              adjacency on this screen that has to stay tight. */}
          <Link
            href={back ? link(`/start${toQuery(back)}`) : withLang("/", locale)}
            // 23px of link is not a thumb target. The padding is cancelled by
            // the negative margin, so this is a hit-area change, not a layout
            // one -- and Back is the control a confused tester reaches for
            // first.
            className="-my-2.5 mt-4 inline-flex items-center gap-2 py-2.5 text-[1rem] font-bold text-indigo"
          >
            <span aria-hidden="true">&larr;</span>
            {back ? t.backAQuestion : t.backToStart}
          </Link>

          {/* Every screen from the bank question onward -- never on the bank
              question screen itself (answers.bank is unset until it's
              answered, and this page never renders past it in the same
              request since resolve() would already have moved on). */}
          {answers.bank && (
            <div className="mt-4">
              <BankSummary bankId={answers.bank} changeHref={changeHref} t={HOME_T[locale].verdictPage} />
            </div>
          )}

          <h1 className="display-lg mt-4 font-serif font-bold text-indigo-ink">
            {question.prompt}
          </h1>
          {question.help && (
            <p className="body-fluid mt-3 max-w-[62ch] text-ink-soft">
              {question.help}
            </p>
          )}

          {/* Nine banks as nine full-height answer cards would be four
              screens of scrolling on a phone, on the one question whose
              answer the reader knows instantly and without reading. Named
              things get a compact list; everything else keeps the cards,
              where the detail line is doing real work. */}
          {question.id === "bank" ? (
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {question.options.map((option) => (
                <li key={option.value}>
                  <AnswerLink
                    question={question}
                    option={option}
                    answers={answers}
                    link={link}
                    compact
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-7 space-y-3">
              {question.options.map((option) => (
                <li key={option.value}>
                  <AnswerLink
                    question={question}
                    option={option}
                    answers={answers}
                    link={link}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 border-t border-rule-faint pt-5">
            {/* Escape hatch for a doubt that can surface on any question, not
                just "bank" -- same copy and destination as the front door's
                demoted "I don't know where the money is" link. Placed here,
                below the answers, not beside Back: inserting it near Back
                would push every question's actual options further down the
                screen on a phone, for a link almost nobody needs on any
                given visit. */}
            <p className="text-[0.9375rem] leading-relaxed">
              <Link
                href={withLang("/start/find/where", locale)}
                className="font-bold text-indigo underline underline-offset-2"
              >
                {SITUATIONS_T[locale].dontKnow.label}
              </Link>
              <span className="text-ink-faint"> — {SITUATIONS_T[locale].dontKnow.detail}</span>
            </p>
            {/* Precise, because it has to be. The answers are not stored and
                nothing here identifies anyone — but we do count which branch
                of the law people land on, and saying "sent nowhere" would be
                a lie on the one page that cannot afford one. */}
            <p className="mt-3 text-[0.9375rem] text-ink-faint">
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
 * The opening screen — "My Claim Journey".
 *
 * Three real situations, full-weight, plus one smaller link underneath.
 *
 * Cut down 8 Sep 2026 from the 7 Sep evening version's flat list of five
 * equal cards, per direct request that the front door itself had become
 * "a lot and confusing." "Need information on documents" -> /documents was
 * removed outright: the homepage already links /documents directly, so the
 * card was a second door to a page one click away, and its label collided
 * with started.askedFor's very different, personalised RBI-comparison tool
 * one level deeper. The other two survivors, "I don't know where to start"
 * and "Others" (an explicit catch-all, never a situation), were both
 * demoted from cards to plain links rather than cut.
 *
 * 🔴 Re-promoted 9 Sep 2026, on direct request: "I don't know where the
 * money is" back to a full card alongside the other two -- it is a real,
 * common situation (the primary research base's own spine quote is "no
 * website that can give them a list," a family who does not yet know where
 * to look), not a secondary catch-all like "Others" beside it. That one
 * stays a small link.
 *
 * Each option is still something the reader KNOWS happened or wants, not a
 * judgement about which stage they are in.
 */
function SituationPicker({ locale }: { locale: Locale }) {
  const t = SITUATIONS_T[locale];

  const primary: (Situation & { href: string })[] = [
    // The wizard's own door. `begin=1` rather than a bare /start, which would
    // land back here. `entry=new` marks the reader as someone who has not
    // been to a counter, which is what drops the court-order question -- see
    // lib/wizard.ts's Entry.
    { ...t.notStarted, href: "/start?begin=1&entry=new" },
    { ...t.alreadyStarted, href: "/start/started" },
    // Goes straight to the search page, not a two-way fork -- an earlier
    // fork's content turned out to just restate Q1 rather than address the
    // actual problem this option names. /start/find/where already serves
    // exactly that reader.
    { ...t.dontKnow, href: "/start/find/where" },
  ];

  const secondary: (Situation & { href: string })[] = [
    { ...t.refused, href: "/contact" },
  ];

  return (
    <>
      <RecoverNav />
      <main className="flex-1 bg-mist">
        <div className="shell max-w-[680px] py-8 sm:py-12">
          <h1 className="display-lg font-serif font-bold text-indigo-ink">
            {t.heading}
          </h1>
          <SituationGroup options={primary} locale={locale} />
          <ul className="mt-5 space-y-1.5">
            {secondary.map((option) => (
              <li key={option.href} className="text-[0.9375rem] leading-relaxed">
                <Link
                  href={withLang(option.href, locale)}
                  className="font-bold text-indigo underline underline-offset-2"
                >
                  {option.label}
                </Link>
                <span className="text-ink-faint"> — {option.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <RecoverFooter />
    </>
  );
}

/**
 * `label` and `lead` are unused since the 7 Sep flattening -- the type keeps
 * them because SituationGroup's card styling still branches on `lead`, kept
 * rather than deleted in case a future screen wants a two-tier list again.
 * No current caller sets either.
 */
function SituationGroup({
  label,
  options,
  locale,
}: {
  label?: string;
  options: (Situation & { href: string; lead?: boolean })[];
  locale: Locale;
}) {
  return (
    <section className="mt-8">
      {label && (
        <h2 className="text-[0.875rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
          {label}
        </h2>
      )}
      {/* Every option is its own box -- direct instruction, 7 Sep. */}
      <ul className={`space-y-2.5 ${label ? "mt-3" : ""}`}>
        {options.map((option) => (
          <li key={option.href}>
            <Link
              href={withLang(option.href, locale)}
              className={`group flex items-center gap-4 rounded-xl bg-white px-5 py-4 transition-all hover:shadow-[0_6px_24px_rgba(45,48,121,0.14)] ${
                option.lead
                  ? "border-2 border-indigo"
                  : "border border-rule hover:border-indigo"
              }`}
            >
              <span className="flex-1">
                <span
                  className={
                    option.lead
                      ? "display-md block font-serif font-bold text-indigo-ink"
                      : "block font-serif text-[1.125rem] font-bold text-indigo-ink sm:text-[1.25rem]"
                  }
                >
                  {option.label}
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-soft sm:text-[1rem]">
                  {option.detail}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-[1.25rem] font-bold text-saffron-ink transition-transform group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
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
  link,
  compact = false,
}: {
  question: Question;
  option: Option;
  answers: Answers;
  /** Carries lang and entry onto the next question. */
  link: (href: string) => string;
  /** Tighter padding and no detail line — for a list of named things. */
  compact?: boolean;
}) {
  const next = answerQuestion(answers, question.id, option.value);
  const accent = option.unsure
    ? "border-accent-violet hover:shadow-[0_6px_24px_rgba(91,75,155,0.16)]"
    : "border-rule hover:border-indigo hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)]";

  if (compact) {
    return (
      <Link
        href={link(`/start${toQuery(next)}`)}
        className={`flex min-h-14 items-center justify-between gap-3 rounded-xl border-2 bg-white px-5 py-3.5 transition-all ${accent}`}
      >
        <span className="text-[1.0625rem] font-bold text-indigo-ink">
          {option.label}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-[1.125rem] font-bold ${
            option.unsure ? "text-accent-violet" : "text-saffron-ink"
          }`}
        >
          &rarr;
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={link(`/start${toQuery(next)}`)}
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
