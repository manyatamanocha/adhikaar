/**
 * The verdict page — one component, eight routes.
 *
 * Always in this order, so the second page a user reads is already familiar:
 *
 *   1. THE ANSWER      plain words, largest type, above the fold
 *   2. WHAT TO DO      numbered, each step something a person can actually do
 *   3. WHAT TO BRING   the documents, with real cost and real time
 *   4. THE EVIDENCE    the RBI's own sentences, quoted, numbered, linked
 *   5. AT THE COUNTER  the four procedural tactics
 *   6. THE CAVEATS     hard ones boxed and uncollapsible
 *
 * Two rules run through the whole file:
 *
 *   · Quote and cite, never assert. A clause with `verbatim: false` is our
 *     summary of a paragraph and is rendered as plain text with "in summary" —
 *     never inside quotation marks. The data layer carries the flag; this
 *     component is what makes it mean something.
 *   · Colour is never the sole carrier of meaning. Good news and hard news
 *     differ by their words and by a rule weight that survives a black-and-white
 *     printout, because the deliverable is a sheet of paper at a bank counter.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { parseLocale, withLang } from "@/lib/i18n";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { PrintButton } from "./print-button";
import { NextStepButton } from "./next-step-button";
import { CLAUSES, NOTIFICATION, RULES_VERIFIED_ON, TACTICS_BY_LOCALE, ESCALATION, ESCALATION_CAVEAT_BY_LOCALE } from "@/lib/rbi";
import { formatDate } from "./bank-panel";
import { DOCUMENTS, documentText, type DocId } from "@/lib/documents";
import { OUTCOMES, outcomeText, type OutcomeId, type Outcome } from "@/lib/outcomes";
import { parseHave, readiness, toggleHave } from "@/lib/readiness";
import { parseAnswers, resolve, toQuery, type Answers } from "@/lib/wizard";
import { BankPanel } from "./bank-panel";
import { DeadlineTracker } from "./deadline-tracker";
import { BeliefSurvey } from "./belief-survey";
import { CounterMode } from "./counter-mode";
import { COUNTER_SCRIPT } from "@/lib/counter";
import { HOME_T, type HomeDict } from "@/lib/i18n-home";
import type { Locale } from "@/lib/i18n";

type Params = Record<string, string | string[] | undefined>;
type VerdictText = HomeDict["verdictPage"];

export function OutcomePage({ id, sp = {} }: { id: OutcomeId; sp?: Params }) {
  const answers = parseAnswers(sp);
  const locale = parseLocale(sp.lang);
  const outcome = outcomeText(id, locale);
  const t = HOME_T[locale].verdictPage;
  const hasAnswers = Object.values(answers).some(Boolean);
  if (hasAnswers && id !== "already-in-court") {
    const route = resolve(answers);
    if (route.kind === "question") redirect(withLang("/start" + toQuery(answers), locale));
    if (route.kind === "review") redirect(withLang("/confirm-details" + toQuery(answers), locale));
    if (route.kind === "outcome" && route.outcome !== id) redirect(withLang(OUTCOMES[route.outcome].path + toQuery(answers), locale));
  }
  const bankId = typeof sp.bank === "string" ? sp.bank : undefined;

  // Counter mode: the same URL, one parameter switched, so it stays a real
  // link. Falls back to the full page for out-of-scope, which has no
  // counter script.
  if (hasAnswers && sp.mode === "counter" && id in COUNTER_SCRIPT) {
    return (
      <>
        <RecoverNav />
        <main className="flex-1">
          <CounterMode id={id} answers={answers} locale={locale} />
        </main>
        <RecoverFooter />
      </>
    );
  }

  // Which documents the reader already has. Constrained to this claim's own
  // list, so a hand-edited URL cannot claim one that does not apply.
  const have = parseHave(sp.have, outcome.documents ?? []);

  // Same page, one parameter changed — so picking a bank is a normal
  // navigation and Back undoes it. Ticks are carried across so choosing a bank
  // does not silently discard them.
  const hrefFor = (nextBank: string) => {
    const q = new URLSearchParams(toQuery(answers).replace(/^\?/, ""));
    if (have.length) q.set("have", have.join(","));
    q.set("bank", nextBank);
    return withLang(`${outcome.path}?${q.toString()}`, locale);
  };

  // Ticking a document is the same navigation trick as picking a bank: one
  // parameter changed on the same page. No client state, and Back unticks.
  const haveHrefFor = (id: DocId) => {
    const q = new URLSearchParams(toQuery(answers).replace(/^\?/, ""));
    if (bankId) q.set("bank", bankId);
    const next = toggleHave(have, id);
    if (next.length) q.set("have", next.join(","));
    const s = q.toString();
    return withLang(`${outcome.path}${s ? `?${s}` : ""}`, locale);
  };

  return (
    <>
      <RecoverNav />

      <main className="flex-1">
        {!hasAnswers && <div className="shell max-w-[860px] py-5"><p className="body-fluid"><strong>{t.generalGuidanceLabel}</strong> <Link href={withLang("/start", locale)} className="text-link underline">{t.checkSituationFirst}</Link></p></div>}
        <Verdict id={id} answers={answers} bankId={bankId} locale={locale} outcome={outcome} t={t} />

        <div className="shell max-w-[860px] py-10 sm:py-12">
          <Caveats id="eligibility" caveats={outcome.caveats.filter(c => c.weight === "hard")} t={t} />
          <Steps steps={outcome.steps} t={t} />
          <TodayBox outcome={id} t={t} answers={answers} locale={locale} hasDocuments={!!outcome.documents} />
          {/* Promoted out of the (folded) Documents section per advisor review:
              this was the single most useful sentence on the page and it was
              hidden behind a "Show" tap. The full checklist stays folded below
              — this is only the one-line summary and the "start today" call. */}
          {outcome.documents && (
            <div className="mt-8">
              <ReadinessBox ids={outcome.documents} have={have} t={t} locale={locale} />
              <a
                href="#documents"
                data-print="hide"
                className="mt-2 inline-block text-[0.9375rem] font-bold text-link underline underline-offset-2"
              >
                {t.seeFullChecklist}
              </a>
            </div>
          )}
          {outcome.documents && (
            <Documents
              ids={outcome.documents}
              have={have}
              hrefFor={haveHrefFor}
              t={t}
              locale={locale}
            />
          )}

          {/* The core path ends here: answer, steps, checklist. Repeating
              Print/Counter-mode right after the checklist — not just once,
              up in the header, before the reader has seen what to bring —
              gives an explicit "you're done, do this now" moment before
              anything else on the page competes for attention. Everything
              below is reference material for later (the counter, an
              appeal, a bank comparison), not part of what to do right now. */}
          <DoneBand id={id} answers={answers} bankId={bankId} outcome={outcome} t={t} locale={locale} />

          <details className="group mt-10 border-t-2 border-rule pt-6">
            <summary className="-my-2 flex cursor-pointer list-none items-center gap-2 py-2 [&::-webkit-details-marker]:hidden">
              <span className="display-lg font-serif font-bold text-indigo-ink">
                {t.moreDetailTitle}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-saffron-ink"
              >
                <span className="group-open:hidden">{t.show}</span>
                <span className="hidden group-open:inline">{t.hide}</span>
              </span>
            </summary>
            <p className="body-fluid mt-2 max-w-[68ch] text-ink-soft">{t.moreDetailNote}</p>
            <div className="mt-2">
              {hasAnswers && id !== "out-of-scope" && <AskedChecker answers={answers} locale={locale} t={t} />}
              <Evidence clauses={outcome.clauses} t={t} />
              {id !== "out-of-scope" && (
                <BankPanel bankId={bankId} hrefFor={hrefFor} t={t} />
              )}
              {outcome.documents && <Tactics locale={locale} t={t} />}
              {outcome.tracker && <DeadlineTracker locale={locale} />}
              <Caveats caveats={outcome.caveats.filter(c => c.weight !== "hard")} t={t} />
              <Escalation locale={locale} t={t} />
              <SourceLine locale={locale} t={t} />
              {hasAnswers && outcome.goodNews && <BeliefSurvey outcome={id} />}
            </div>
          </details>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The door into the set difference. It sits directly under the document list,
 * because that is the moment the reader thinks "but the branch asked me for
 * three other things as well."
 */
function AskedChecker({ answers, locale, t }: { answers: Answers; locale: ReturnType<typeof parseLocale>; t: VerdictText }) {
  return (
    <section
      data-print="hide"
      className="mt-10 rounded-xl border-2 border-saffron bg-white p-6"
    >
      <h2 className="display-md font-serif font-bold text-indigo-ink">
        {t.askedCheckerHeading}
      </h2>
      <p className="body-fluid mt-2 max-w-[68ch] leading-relaxed text-ink-soft">
        {t.askedCheckerBody}
      </p>
      <Link
        href={withLang(`/what-were-you-asked-for${toQuery(answers)}`, locale)}
        className="mt-4 inline-flex items-center gap-2 rounded-pill bg-indigo px-6 py-3 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
      >
        {t.askedCheckerCta}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ 1 */

function Verdict({
  id,
  answers,
  bankId,
  locale,
  outcome,
  t,
}: {
  id: OutcomeId;
  answers: Answers;
  bankId?: string;
  locale: ReturnType<typeof parseLocale>;
  outcome: Outcome;
  t: VerdictText;
}) {
  // Good news is indigo, hard news is maroon on blush — but the sentence itself
  // is the carrier. "You should not be asked for a succession certificate" and
  // "A succession certificate may genuinely be required here" say which this is
  // in words, so it survives a mono printout with no label needed above it.
  const good = outcome.goodNews;

  return (
    <section className={good ? "bg-indigo" : "bg-blush border-b-4 border-maroon"}>
      <div className="shell max-w-[860px] py-10 sm:py-14">
        <h1
          className={`display-xl font-serif font-bold tracking-[-0.015em] ${
            good ? "text-white" : "text-indigo-ink"
          }`}
        >
          {outcome.goodNews && !Object.values(answers).some(Boolean) ? t.whenRouteApplies : outcome.verdict}
        </h1>

        <p
          className={`lede-fluid mt-5 max-w-[62ch] ${
            good ? "text-white/90" : "text-ink"
          }`}
        >
          {outcome.summary}
        </p>

        <div
          data-print="hide"
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <PrintButton label={t.printButton} />
          {Object.values(answers).some(Boolean) && id in COUNTER_SCRIPT && (
            <Link
              href={withLang(counterHref(outcome.path, answers, bankId), locale)}
              className={`inline-flex items-center gap-2 rounded-pill border-2 px-6 py-3 text-[1.0625rem] font-bold transition-colors ${
                good
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-indigo text-indigo-ink hover:bg-indigo/8"
              }`}
            >
              {t.counterShorter}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          <p className={`text-[0.9375rem] ${good ? "text-white/70" : "text-ink-soft"}`}>
            {t.printNote}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * The end of the core path -- answer, steps, checklist, then this. Same
 * Print/Counter-mode controls as the header (`Verdict`), repeated here on
 * purpose: the header pair fires before the reader has seen what to bring,
 * so it can't be the "you're done" moment. This one can.
 */
function DoneBand({
  id,
  answers,
  bankId,
  locale,
  outcome,
  t,
}: {
  id: OutcomeId;
  answers: Answers;
  bankId?: string;
  locale: ReturnType<typeof parseLocale>;
  outcome: Outcome;
  t: VerdictText;
}) {
  return (
    <div
      data-print="hide"
      className="actionbox mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
    >
      <PrintButton label={t.printButton} />
      {Object.values(answers).some(Boolean) && id in COUNTER_SCRIPT && (
        <Link
          href={withLang(counterHref(outcome.path, answers, bankId), locale)}
          className="inline-flex items-center gap-2 rounded-pill border-2 border-indigo px-6 py-3 text-[1.0625rem] font-bold text-indigo-ink transition-colors hover:bg-indigo/8"
        >
          {t.counterShorter}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
      <p className="text-[0.9375rem] text-ink-soft">{t.printNote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ 2 */

function Steps({ steps, t }: { steps: string[]; t: VerdictText }) {
  return (
    <Section id="steps" title={t.yourNextSteps}>
      <ol className="mt-5 space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-indigo text-[1rem] font-bold text-indigo">
              {i + 1}
            </span>
            <p className="body-fluid flex-1 leading-relaxed text-ink">{step}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function TodayBox({
  outcome,
  t,
  answers,
  locale,
  hasDocuments,
}: {
  outcome: OutcomeId;
  t: VerdictText;
  answers: Answers;
  locale: Locale;
  hasDocuments: boolean;
}) {
  const action =
    outcome === "nominee" || outcome === "survivorship"
      ? t.todayAction.nomineeOrSurvivorship
      : outcome === "under-threshold"
        ? t.todayAction.underThreshold
        : outcome === "unknown-nominee"
          ? t.todayAction.unknownNominee
          : outcome === "out-of-scope"
            ? t.todayAction.outOfScope
            : t.todayAction.default;

  // "unknown-nominee" is the one outcome where the product could not resolve
  // the claim route -- only what to find out next. The button sends the
  // reader back into the wizard with the nominee answer cleared, so the
  // question is asked again once they actually have the fact.
  const info = outcome === "unknown-nominee";
  const cta = info
    ? { href: withLang(`/start${toQuery({ ...answers, nominee: undefined })}`, locale), label: t.knowAnswerNow, type: "information_required" as const }
    : { href: `${hasDocuments ? "#documents" : "#evidence"}`, label: t.readyToProceed, type: "claim_route" as const };

  return (
    <section className="mt-8 rounded-xl border-2 border-saffron bg-[#FFF7E8] p-6">
      <h2 className="display-md font-serif font-bold text-indigo-ink">{t.todayHeading}</h2>
      <p className="body-fluid mt-2 leading-relaxed text-ink">{action}</p>
      <NextStepButton href={cta.href} label={cta.label} outcomeType={cta.type} />
    </section>
  );
}

/* ------------------------------------------------------------------ 3 */

function Documents({
  ids,
  have,
  hrefFor,
  t,
  locale,
}: {
  ids: DocId[];
  have: DocId[];
  hrefFor: (id: DocId) => string;
  t: VerdictText;
  locale: Locale;
}) {
  return (
    <Section
      id="documents"
      title={t.documentsTitle(ids.length)}
      note={t.documentsNote}
      lede={t.documentsLede}
    >
      <ul className="mt-5 divide-y divide-rule-faint border-y border-rule-faint">
        {ids.map((id) => {
          const doc = documentText(id, locale);
          const on = have.includes(id);
          return (
            <li key={id} className="py-5">
              {/* The name row is the toggle, not the whole card: the cost, the
                  time and the note stay ordinary selectable text rather than
                  becoming link text. */}
              <Link
                href={hrefFor(id)}
                // Negative margin cancels the padding, so the row looks
                // identical while the thumb gets a 44px target instead of 30.
                // These readers are grieving, tired and often older, and this
                // is the primary control on the page.
                className="group -my-2 flex items-start gap-3 py-2"
                aria-label={
                  on
                    ? `${doc.name} — you have this. Select to untick.`
                    : `${doc.name} — select to tick as something you already have.`
                }
              >
                {/* A drawn box, not a colour. The ticked state has to survive
                    the black-and-white sheet this page becomes. */}
                <span
                  aria-hidden="true"
                  className={`mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 text-[0.9375rem] font-bold ${
                    on
                      ? "border-indigo bg-indigo text-white"
                      : "border-rule text-transparent group-hover:border-indigo/60"
                  }`}
                >
                  ✓
                </span>
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className={`display-md font-serif font-bold ${
                      on ? "text-ink-soft" : "text-indigo-ink"
                    }`}
                  >
                    {doc.name}
                  </h3>
                  {doc.official && (
                    <span className="rounded-md bg-indigo/8 px-2 py-0.5 text-[0.875rem] font-semibold text-indigo">
                      {doc.official}
                    </span>
                  )}
                </span>
              </Link>

              {/* Indented to hang under the name, clear of the tick box. */}
              <div className="pl-9">
                <p className="body-fluid mt-2 leading-relaxed text-ink-soft">
                  {doc.what}
                </p>

                <dl className="mt-3 grid gap-x-6 gap-y-2 text-[1rem] sm:grid-cols-3">
                  <Field label={t.whereFrom} value={doc.from} />
                  <Field label={t.cost} value={doc.cost} />
                  <Field label={t.howLong} value={doc.time} />
                </dl>

                {doc.note && (
                  /* Labelled, not colour-barred. A maroon rule alone carries no
                     meaning on the black-and-white sheet this page becomes. */
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink">
                    <strong className="font-bold text-maroon">{t.noteLabel} </strong>
                    {doc.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/**
 * What to do next, given what they say they already have.
 *
 * Three states, and the difference between them is the whole point of the
 * feature. Before anyone ticks anything the only honest thing to say is which
 * document is the long pole. Once they start ticking, the useful sentence
 * changes: it is no longer "this takes longest" but "of what you still need,
 * this takes longest" — and the two stop agreeing the moment the long pole is
 * the thing they already have.
 *
 * The "everything else can be done while you wait" promise is only made when
 * the next document actually has a wait. Saying it about a same-day form would
 * be inventing urgency, and this product does not do that.
 */
function ReadinessBox({ ids, have, t, locale }: { ids: DocId[]; have: DocId[]; t: VerdictText; locale: Locale }) {
  const r = readiness(ids, have);

  if (r.untouched) {
    const longest = ids.filter((id) => DOCUMENTS[id].startFirst);
    if (longest.length === 0) {
      return (
        <p className="actionbox mt-5 body-fluid">
          <strong className="font-bold">{t.readinessNeed(r.total)}</strong>{" "}
          {t.readinessNoLongWait}
        </p>
      );
    }
    return (
      <p className="actionbox mt-5 body-fluid">
        {t.readinessStartTodayLongest(longest.map((id) => documentText(id, locale).name).join(", "))}
      </p>
    );
  }

  if (r.complete) {
    return (
      <p className="actionbox mt-5 body-fluid">
        <strong className="font-bold">{t.readinessHaveAll(r.total)} </strong>
        {t.readinessTakeToBranch}
      </p>
    );
  }

  const next = documentText(r.startToday!, locale);
  const others = r.missing.length - 1;

  return (
    <div className="actionbox mt-5 body-fluid">
      <p>
        <strong className="font-bold">{t.readinessHaveOf(r.haveCount, r.total)}</strong>{" "}
        {t.readinessStillToGet(r.missing.length)}
      </p>

      {next.leadDays > 0 ? (
        <p className="mt-2">
          <strong className="font-bold">{t.readinessStartToday(next.name)}</strong>
          {t.readinessLongestWait}
          {others === 0
            ? t.readinessLastOne
            : others === 1
              ? t.readinessOtherOneWaits
              : t.readinessOthersWait(others)}
        </p>
      ) : (
        <p className="mt-2">
          {others === 0
            ? t.readinessIsLastNoQueue(next.name)
            : t.readinessNothingHasQueue(next.name)}
        </p>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    // Label beside the value on a phone, above it once there is room for three
    // columns. Stacking all three on a 390px screen cost about fifty pixels a
    // document for no gain in scanability.
    <div className="flex gap-3 sm:block">
      {/* Fixed label column on a phone so the three values share a left edge;
          "WHERE FROM" is wider than "COST" and a ragged column reads as sloppy. */}
      <dt className="w-[5.25rem] shrink-0 text-[0.8125rem] font-bold uppercase leading-[1.6] tracking-[0.1em] text-ink-faint sm:w-auto sm:leading-normal">
        {label}
      </dt>
      <dd className="text-ink sm:mt-0.5">{value}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ 4 */

function Evidence({ clauses, t }: { clauses: (keyof typeof CLAUSES)[]; t: VerdictText }) {
  return (
    <Section
      id="evidence"
      title={t.evidenceTitle}
      lede={t.evidenceLede}
    >
      <ul className="mt-5 space-y-5">
        {clauses.map((key) => {
          const clause = CLAUSES[key];
          return (
            <li
              key={key}
              className="rounded-xl border-2 border-indigo/25 bg-white p-5"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded-md bg-indigo px-2.5 py-1 text-[0.875rem] font-bold uppercase tracking-[0.06em] text-white">
                  {t.paragraphLabel(clause.para)}
                </span>
                <span className="text-[1rem] font-bold text-indigo-ink">
                  {clause.label}
                </span>
              </div>

              <p className="mt-2 text-[0.875rem] text-ink-faint">
                {t.sourceLabel(NOTIFICATION.title.split(" (")[0], clause.para, formatDate(RULES_VERIFIED_ON))}
              </p>

              {clause.verbatim ? (
                <blockquote className="body-fluid mt-3.5 border-l-2 border-rule pl-4 font-serif leading-[1.6] text-ink">
                  &ldquo;{clause.text}&rdquo;
                </blockquote>
              ) : (
                /* NOT verbatim — must never appear inside quotation marks. */
                <p className="body-fluid mt-3.5 leading-relaxed text-ink">
                  <span className="font-bold text-ink-soft">{t.inSummaryLabel} </span>
                  {clause.text}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-[1rem] text-ink-soft">
        {t.fromLabel}{" "}
        <a
          href={NOTIFICATION.url}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-link underline underline-offset-2"
        >
          {NOTIFICATION.title}
        </a>{" "}
        · {NOTIFICATION.number} · {t.issuedLabel} {NOTIFICATION.issued}.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ 5 */

function Tactics({ locale, t }: { locale: Locale; t: VerdictText }) {
  return (
    <Section
      id="tactics"
      title={t.tacticsTitle}
      lede={t.tacticsNote}
    >
      <ol className="mt-5 grid gap-4 sm:grid-cols-2">
        {TACTICS_BY_LOCALE[locale].map((tactic, i) => (
          <li
            key={tactic.title}
            className="rounded-xl border border-rule bg-mist p-5"
          >
            <p className="text-[0.875rem] font-bold uppercase tracking-[0.1em] text-saffron-ink">
              {i + 1}
            </p>
            <h3 className="display-md mt-1.5 font-serif font-bold text-indigo-ink">
              {tactic.title}
            </h3>
            <p className="body-fluid mt-2 leading-relaxed text-ink-soft">
              {tactic.detail}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ 6 */

function Caveats({ caveats, id = "caveats", t }: { caveats: (typeof OUTCOMES)[OutcomeId]["caveats"]; id?: string; t: VerdictText }) {
  if (!caveats.length) return null;
  return (
    <Section id={id} title={id === "eligibility" ? t.conditionsForRoute : t.otherImportantNotes}>
      <ul className="mt-5 space-y-4">
        {caveats.map((caveat) => (
          <li
            key={caveat.title}
            className={
              caveat.weight === "hard"
                ? "hardbox"
                : "rounded-xl border border-rule bg-mist p-5"
            }
          >
            <h3
              className={`display-md font-serif font-bold ${
                caveat.weight === "hard" ? "text-maroon" : "text-indigo-ink"
              }`}
            >
              {caveat.title}
            </h3>
            <p className="body-fluid mt-2 leading-relaxed text-ink">
              {caveat.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Escalation({ locale, t }: { locale: ReturnType<typeof parseLocale>; t: VerdictText }) {
  return (
    <section
      data-print="hide"
      className="mt-12 rounded-xl border-2 border-indigo bg-mist-deep p-6"
    >
      <h2 className="display-md font-serif font-bold text-indigo-ink">
        {t.refusedHeading}
      </h2>
      <p className="body-fluid mt-2 max-w-[68ch] leading-relaxed text-ink">
        {ESCALATION_CAVEAT_BY_LOCALE[locale]}
      </p>
      <p className="mt-3 max-w-[68ch] text-[1rem] leading-relaxed text-ink-soft">
        <a href={ESCALATION.faq} target="_blank" rel="noreferrer" className="underline">{t.readComplaintEligibility}</a>
      </p>
      <p className="mt-3 text-[1rem] text-ink-soft">
        <a
          href={ESCALATION.portal}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-link underline underline-offset-2"
        >
          {ESCALATION.portal}
        </a>{" "}
        · {ESCALATION.email} · {ESCALATION.post}
      </p>
      <Link
        href={withLang("/bank-refused", locale)}
        className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-link underline underline-offset-2"
      >
        {t.fullRouteCta}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  );
}

function SourceLine({ locale, t }: { locale: ReturnType<typeof parseLocale>; t: VerdictText }) {
  return (
    <div className="mt-10 border-t border-rule pt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
      <p>
        <strong className="font-bold text-ink">
          {t.sourceLineBrand}
        </strong>{" "}
        {t.sourceLineBody(NOTIFICATION.number, NOTIFICATION.ref, NOTIFICATION.issued)}
      </p>
      {/* The site footer carries this too, but the footer does not print — and
          paragraph 6(b) has to be on the sheet that reaches the counter. */}
      <p className="mt-2">
        {t.exclusionNote}
      </p>
      <p className="mt-2" data-print="hide">
        <Link
          href={withLang("/start", locale)}
          className="-my-2 inline-block py-2 font-bold text-link underline underline-offset-2"
        >
          {t.answerAgain}
        </Link>
        {" · "}
        <Link
          href={withLang("/contact", locale)}
          className="-my-2 inline-block py-2 font-bold text-link underline underline-offset-2"
        >
          {t.foundIncorrect}
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/* No kicker above the heading. Each one repeated what the heading beneath it
   already said, and on a phone that is a screenful of scroll bought with
   nothing — on a page a grieving reader is already scrolling too much of. */
/**
 * `fold` collapses a section behind its own heading.
 *
 * A verdict page carries about ten thousand pixels of legitimate content, and
 * showing all of it at once was too much: the reader gets their answer and then
 * twelve screens of material, with no signal about which part is for now and
 * which is for the bank counter later. The answer, the next steps and the hard
 * caveats stay open. The reference matter folds.
 *
 * Nothing is removed. Every folded section is still in the DOM, still found by
 * in-page search, and still on the printed sheet — the print rules force every
 * <details> open, because the artifact handed across a counter has to be
 * complete whether or not the reader happened to tap that heading.
 *
 * <details> is native: no JavaScript, no client state, and the open/closed
 * state is the browser's, not ours.
 */
function Section({
  id,
  title,
  lede,
  fold,
  note,
  children,
  showHide,
}: {
  id?: string;
  title: string;
  lede?: string;
  fold?: boolean;
  /** A word on what is inside, shown on the closed heading. */
  note?: string;
  children: React.ReactNode;
  showHide?: { show: string; hide: string };
}) {
  const show = showHide?.show ?? "Show";
  const hide = showHide?.hide ?? "Hide";
  if (fold) {
    return (
      <details id={id} className="group mt-8 border-t border-rule pt-6 first:mt-0">
        <summary className="-my-2 flex cursor-pointer list-none items-baseline justify-between gap-4 py-2 [&::-webkit-details-marker]:hidden">
          <span>
            {/* A folded heading is a label in a list of sections, not a title
                on a page of its own. At display-lg it wrapped to two lines and
                crowded the Show control; the open sections keep the big size,
                so the difference also tells you which is which. */}
            <span className="display-md block font-serif font-bold text-indigo-ink">
              {title}
            </span>
            {note && (
              <span className="mt-1 block text-[1rem] text-ink-soft">
                {note}
              </span>
            )}
          </span>
          {/* Drawn, not a glyph: a rule that rotates. Reads as open/closed
              without relying on an icon font or an emoji. */}
          <span
            aria-hidden="true"
            className="mt-2 shrink-0 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-saffron-ink"
          >
            <span className="group-open:hidden">{show}</span>
            <span className="hidden group-open:inline">{hide}</span>
          </span>
        </summary>
        <div className="mt-4">
          {lede && (
            <p className="body-fluid max-w-[68ch] text-ink-soft">{lede}</p>
          )}
          {children}
        </div>
      </details>
    );
  }

  return (
    <section id={id} className="mt-12 scroll-mt-20 first:mt-0">
      <h2 className="display-lg font-serif font-bold text-indigo-ink">
        {title}
      </h2>
      {lede && (
        <p className="body-fluid mt-2.5 max-w-[68ch] text-ink-soft">{lede}</p>
      )}
      {children}
    </section>
  );
}

function counterHref(path: string, answers: Answers, bankId?: string) {
  const q = new URLSearchParams(toQuery(answers).replace(/^\?/, ""));
  if (bankId) q.set("bank", bankId);
  q.set("mode", "counter");
  return `${path}?${q.toString()}`;
}

