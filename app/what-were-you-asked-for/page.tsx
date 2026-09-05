/**
 * "What were you asked for?"
 *
 * The user ticks what the branch demanded; the page splits it against the list
 * the RBI prescribes for their situation, each item carrying its paragraph.
 *
 * This is arithmetic on a published list, not an argument — which is exactly
 * why it works at a counter. It came out of P3: a branch demanded a third-party
 * surety and a family-tree document for ₹46,000, and the family had no way to
 * know that neither is in the RBI's list.
 *
 * The ticks live in the URL like everything else, so it works with JavaScript
 * off, Back undoes a tick, and the finished comparison can be sent to a sibling.
 *
 * Fully localised 5 Sep 2026: this page's own prose lives in
 * lib/i18n-home.ts's HomeDict.askedForPage; document names/descriptions come
 * from lib/documents.ts's documentText(); the situation label and each
 * comparison's reason line come from lib/asked.ts's locale-aware judge()
 * and SITUATION_LABEL_BY_LOCALE.
 */

import Link from "next/link";
import { parseLocale, withLang, type Locale } from "@/lib/i18n";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { PrintButton } from "../_components/print-button";
import { documentText, ASKABLE, type DocId } from "@/lib/documents";
import { NOTIFICATION } from "@/lib/rbi";
import { parseAnswers, toQuery } from "@/lib/wizard";
import { HOME_T, type HomeDict } from "@/lib/i18n-home";
import {
  judge,
  parseAsked,
  situationFrom,
  toggle,
  SITUATION_LABEL_BY_LOCALE,
} from "@/lib/asked";

type AskedText = HomeDict["askedForPage"];

export const metadata = {
  title: "What were you asked for? — Adhikaar",
  description:
    "Tick what the branch demanded. Adhikaar splits it into what the RBI prescribes for your situation and what it does not, with the paragraph reference for each.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const t = HOME_T[locale].askedForPage;
  const answers = parseAnswers(sp);
  const asked = parseAsked(sp.asked);
  const situation = situationFrom(answers);
  const results = judge(situation, asked, locale);

  const hrefFor = (id: DocId) => {
    const next = toggle(asked, id);
    const q = new URLSearchParams(toQuery(answers).replace(/^\?/, ""));
    if (next.length) q.set("asked", next.join(","));
    const s = q.toString();
    return withLang(`/what-were-you-asked-for${s ? `?${s}` : ""}`, locale);
  };

  return (
    <>
      <RecoverNav />

      <main className="flex-1" lang={locale}>
        <section className="bg-indigo">
          <div className="shell max-w-[860px] py-10 sm:py-12">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-white">
              {t.heading}
            </h1>
            <p className="lede-fluid mt-4 max-w-[60ch] text-white/90">
              {t.sub}
            </p>
          </div>
        </section>

        <div className="shell max-w-[860px] py-10">
          <Situation situation={situation} answers={answers} locale={locale} t={t} />

          <section className="mt-8">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              {t.tickHeading}
            </h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {ASKABLE.map((id) => {
                const on = asked.includes(id);
                const doc = documentText(id, locale);
                return (
                  <li key={id}>
                    <Link
                      href={hrefFor(id)}
                      className={`flex items-start gap-3 rounded-xl border-2 p-4 transition-colors ${
                        on
                          ? "border-indigo bg-indigo/6"
                          : "border-rule bg-white hover:border-indigo/50"
                      }`}
                    >
                      {/* A drawn box, not a colour: the ticked state has to be
                          readable to someone who cannot distinguish the two
                          backgrounds, and on a printed page. */}
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[0.8125rem] font-bold ${
                          on
                            ? "border-indigo bg-indigo text-white"
                            : "border-rule text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="flex-1">
                        <span className="block text-[1.0625rem] font-bold text-indigo-ink">
                          {doc.name}
                        </span>
                        {doc.official && (
                          <span className="mt-0.5 block text-[0.875rem] text-ink-faint">
                            {doc.official}
                          </span>
                        )}
                      </span>
                      <span className="sr-only">
                        {on ? t.tickedRemove : t.tickedSelect}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {asked.length > 0 && (
            <Results results={results} situation={situation} locale={locale} t={t} />
          )}

          <p className="mt-10 border-t border-rule pt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
            <a
              href={NOTIFICATION.url}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-link underline underline-offset-2"
            >
              {t.footerCompared(NOTIFICATION.title, NOTIFICATION.number, NOTIFICATION.issued)}
            </a>
          </p>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Situation({
  situation,
  answers,
  locale,
  t,
}: {
  situation: ReturnType<typeof situationFrom>;
  answers: ReturnType<typeof parseAnswers>;
  locale: Locale;
  t: AskedText;
}) {
  const known = situation !== "unknown";

  return (
    <div
      className={
        known
          ? "rounded-xl border-2 border-indigo bg-mist p-5"
          : "hardbox"
      }
    >
      <p className="text-[0.875rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
        {t.comparingAgainst}
      </p>
      <p className="display-md mt-1.5 font-serif font-bold text-indigo-ink">
        {SITUATION_LABEL_BY_LOCALE[locale][situation]}
      </p>
      {!known && (
        <p className="body-fluid mt-2 text-ink">
          {t.confirmRouteFirst}
        </p>
      )}
      <p className="mt-3 text-[1rem]" data-print="hide">
        <Link
          href={withLang(`/start${toQuery(answers)}`, locale)}
          // Standalone control, not an inline link in a sentence — it gets a
          // thumb-sized hit area without moving anything.
          className="-my-2 inline-block py-2 font-bold text-link underline underline-offset-2"
        >
          {known ? t.changeAnswers : t.answerQuestions}
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Results({
  results,
  situation,
  locale,
  t,
}: {
  results: ReturnType<typeof judge>;
  situation: ReturnType<typeof situationFrom>;
  locale: Locale;
  t: AskedText;
}) {
  // No comparison can honestly be run above the threshold, or before we know
  // whether there was a nominee. Say why rather than showing a wrong split.
  if (!results) {
    return (
      <section className="mt-10">
        <h2 className="display-lg font-serif font-bold text-indigo-ink">
          {t.notGradingHeading}
        </h2>
        <div className="hardbox mt-4">
          <p className="body-fluid text-ink">
            {situation === "above-threshold" ? t.aboveThresholdBody : t.incompleteBody}
          </p>
        </div>
      </section>
    );
  }

  const prescribed = results.filter((r) => r.inList);
  const not = results.filter((r) => !r.inList);

  return (
    <section className="mt-10">
      <h2 className="display-lg font-serif font-bold text-indigo-ink">
        {t.whatRbiSaysHeading}
      </h2>

      {not.length > 0 && (
        <Group
          heading={t.notInListHeading(t.countWord(not.length))}
          lede={t.notInListLede}
          tone="hard"
          tag={t.notInListTag}
          items={not}
          locale={locale}
        />
      )}

      {prescribed.length > 0 && (
        <Group
          heading={t.inListHeading(t.countWord(prescribed.length))}
          lede={t.inListLede}
          tone="ok"
          tag={t.inListTag}
          items={prescribed}
          locale={locale}
        />
      )}

      {/* Below the answer, not above it. An orange button between the heading
          and the comparison interrupts the reader at the exact moment they are
          reaching for the result -- and printing is what you do once you have
          it and want to carry it to the counter. */}
      <div
        data-print="hide"
        className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-6"
      >
        <PrintButton label={HOME_T[locale].verdictPage.printButton} />
        <p className="text-[0.9375rem] text-ink-soft">
          {t.printFooterNote}
        </p>
      </div>
    </section>
  );
}

function Group({
  heading,
  lede,
  tone,
  tag,
  items,
  locale,
}: {
  heading: string;
  lede: string;
  tone: "hard" | "ok";
  tag: string;
  items: NonNullable<ReturnType<typeof judge>>;
  locale: Locale;
}) {
  return (
    <div className="mt-7">
      <h3
        className={`display-md font-serif font-bold ${
          tone === "hard" ? "text-maroon" : "text-indigo-ink"
        }`}
      >
        {heading}
      </h3>
      <p className="body-fluid mt-1.5 max-w-[68ch] text-ink-soft">{lede}</p>

      <ul className="mt-4 space-y-3">
        {items.map((r) => {
          const doc = documentText(r.id, locale);
          return (
          <li
            key={r.id}
            className={`rounded-xl border-2 bg-white p-5 ${
              tone === "hard" ? "border-maroon" : "border-accent-green"
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="display-md font-serif font-bold text-indigo-ink">
                {doc.name}
              </h4>
              <span
                className={`rounded-md px-2 py-0.5 text-[0.8125rem] font-bold uppercase tracking-[0.06em] ${
                  tone === "hard"
                    ? "bg-maroon text-white"
                    : "bg-accent-green text-white"
                }`}
              >
                {tag}
              </span>
            </div>
            <p className="body-fluid mt-2 leading-relaxed text-ink">
              {r.reason}
            </p>
            {tone === "hard" && (
              <p className="mt-2 text-[1rem] text-ink-soft">
                {doc.what} {HOME_T[locale].verdictPage.cost}: {doc.cost}. {HOME_T[locale].verdictPage.howLong}: {doc.time}.
              </p>
            )}
          </li>
          );
        })}
      </ul>
    </div>
  );
}
