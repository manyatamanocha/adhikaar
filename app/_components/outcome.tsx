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
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { PrintButton } from "./print-button";
import { CLAUSES, NOTIFICATION, RULES_VERIFIED_ON, TACTICS, ESCALATION } from "@/lib/rbi";
import { formatDate } from "./bank-panel";
import { DOCUMENTS, type DocId } from "@/lib/documents";
import { OUTCOMES, type OutcomeId } from "@/lib/outcomes";
import { parseHave, readiness, toggleHave } from "@/lib/readiness";
import { parseAnswers, toQuery, type Answers } from "@/lib/wizard";
import { BankPanel } from "./bank-panel";
import { DeadlineTracker } from "./deadline-tracker";
import { BeliefSurvey } from "./belief-survey";
import { CounterMode } from "./counter-mode";
import { COUNTER_SCRIPT } from "@/lib/counter";

type Params = Record<string, string | string[] | undefined>;

export function OutcomePage({ id, sp = {} }: { id: OutcomeId; sp?: Params }) {
  const outcome = OUTCOMES[id];
  const answers = parseAnswers(sp);
  const bankId = typeof sp.bank === "string" ? sp.bank : undefined;

  // Counter mode: the same URL, one parameter switched, so it stays a real
  // link. Falls back to the full page for out-of-scope, which has no
  // counter script.
  if (sp.mode === "counter" && id in COUNTER_SCRIPT) {
    return (
      <>
        <RecoverNav />
        <main className="flex-1">
          <CounterMode id={id} answers={answers} />
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
    return `${outcome.path}?${q.toString()}`;
  };

  // Ticking a document is the same navigation trick as picking a bank: one
  // parameter changed on the same page. No client state, and Back unticks.
  const haveHrefFor = (id: DocId) => {
    const q = new URLSearchParams(toQuery(answers).replace(/^\?/, ""));
    if (bankId) q.set("bank", bankId);
    const next = toggleHave(have, id);
    if (next.length) q.set("have", next.join(","));
    const s = q.toString();
    return `${outcome.path}${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <RecoverNav />

      <main className="flex-1">
        <Verdict id={id} answers={answers} bankId={bankId} />

        <div className="shell max-w-[860px] py-10 sm:py-12">
          {/* Asked here, under the verdict, because the belief it measures is
              the one they walked in with. */}
          {outcome.goodNews && <BeliefSurvey outcome={id} />}
          <Steps steps={outcome.steps} />
          {/* Promoted out of the (folded) Documents section per advisor review:
              this was the single most useful sentence on the page and it was
              hidden behind a "Show" tap. The full checklist stays folded below
              — this is only the one-line summary and the "start today" call. */}
          {outcome.documents && (
            <div className="mt-8">
              <ReadinessBox ids={outcome.documents} have={have} />
              <a
                href="#documents"
                data-print="hide"
                className="mt-2 inline-block text-[0.9375rem] font-bold text-link underline underline-offset-2"
              >
                See the full checklist and tick what you have
              </a>
            </div>
          )}
          {outcome.documents && (
            <Documents
              ids={outcome.documents}
              have={have}
              hrefFor={haveHrefFor}
            />
          )}
          {id !== "out-of-scope" && <AskedChecker answers={answers} />}
          <Evidence clauses={outcome.clauses} />
          {id !== "out-of-scope" && (
            <BankPanel bankId={bankId} hrefFor={hrefFor} />
          )}
          {outcome.documents && <Tactics />}
          {outcome.tracker && <DeadlineTracker />}
          <Caveats caveats={outcome.caveats} />
          <Escalation />
          <SourceLine />
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
function AskedChecker({ answers }: { answers: Answers }) {
  return (
    <section
      data-print="hide"
      className="mt-10 rounded-xl border-2 border-saffron bg-white p-6"
    >
      <h2 className="display-md font-serif font-bold text-indigo-ink">
        Were you asked for something that is not on this list?
      </h2>
      <p className="body-fluid mt-2 max-w-[68ch] leading-relaxed text-ink-soft">
        Tick what the branch actually demanded — a surety, a family tree, an
        affidavit, witnesses — and we will show you which of them the RBI
        prescribes for your situation and which it does not, with the paragraph
        number for each.
      </p>
      <Link
        href={`/what-were-you-asked-for${toQuery(answers)}`}
        className="mt-4 inline-flex items-center gap-2 rounded-pill bg-indigo px-6 py-3 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
      >
        Check what you were asked for
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
}: {
  id: OutcomeId;
  answers: Answers;
  bankId?: string;
}) {
  const outcome = OUTCOMES[id];

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
          {outcome.verdict}
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
          <PrintButton />
          {id in COUNTER_SCRIPT && (
            <Link
              href={counterHref(outcome.path, answers, bankId)}
              className={`inline-flex items-center gap-2 rounded-pill border-2 px-6 py-3 text-[1.0625rem] font-bold transition-colors ${
                good
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-indigo text-indigo-ink hover:bg-indigo/8"
              }`}
            >
              At the counter now? Shorter version
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          <p className={`text-[0.9375rem] ${good ? "text-white/70" : "text-ink-soft"}`}>
            Take the printed page to the branch. It carries the rule and its
            paragraph number.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2 */

function Steps({ steps }: { steps: string[] }) {
  return (
    <Section id="steps" title="Your next steps">
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

/* ------------------------------------------------------------------ 3 */

function Documents({
  ids,
  have,
  hrefFor,
}: {
  ids: DocId[];
  have: DocId[];
  hrefFor: (id: DocId) => string;
}) {
  return (
    <Section
      id="documents"
      fold
      title={`The ${numberWord(ids.length)} documents the RBI names`}
      note={`What to bring, what each one costs and how long it takes. Tick the ones you already have.`}
      lede="Cost and time below are realistic, not best-case. Nothing else on this list is a court document."
    >
      <ul className="mt-5 divide-y divide-rule-faint border-y border-rule-faint">
        {ids.map((id) => {
          const doc = DOCUMENTS[id];
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
                  <Field label="Where from" value={doc.from} />
                  <Field label="Cost" value={doc.cost} />
                  <Field label="How long" value={doc.time} />
                </dl>

                {doc.note && (
                  /* Labelled, not colour-barred. A maroon rule alone carries no
                     meaning on the black-and-white sheet this page becomes. */
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink">
                    <strong className="font-bold text-maroon">Note. </strong>
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
function ReadinessBox({ ids, have }: { ids: DocId[]; have: DocId[] }) {
  const r = readiness(ids, have);

  if (r.untouched) {
    const longest = ids.filter((id) => DOCUMENTS[id].startFirst);
    if (longest.length === 0) {
      return (
        <p className="actionbox mt-5 body-fluid">
          <strong className="font-bold">
            You&apos;ll need {numberWord(r.total)} documents for this claim.
          </strong>{" "}
          None of them has a long wait — tick off what you already have below.
        </p>
      );
    }
    return (
      <p className="actionbox mt-5 body-fluid">
        <strong className="font-bold">Start today: </strong>
        {longest.map((id) => DOCUMENTS[id].name).join(", ")}
        {" — "}
        it takes the longest of anything on this list, and everything else can
        be done while you wait for it.
      </p>
    );
  }

  if (r.complete) {
    return (
      <p className="actionbox mt-5 body-fluid">
        <strong className="font-bold">
          You have all {numberWord(r.total)}.{" "}
        </strong>
        Take them to the branch together and ask for written acknowledgement of
        the claim on the day you hand them over. The bank has fifteen days from
        a complete claim.
      </p>
    );
  }

  const next = DOCUMENTS[r.startToday!];
  const others = r.missing.length - 1;

  return (
    <div className="actionbox mt-5 body-fluid">
      <p>
        <strong className="font-bold">
          You have {r.haveCount} of {r.total}.
        </strong>{" "}
        {sentenceCase(numberWord(r.missing.length))} still to get.
      </p>

      {next.leadDays > 0 ? (
        <p className="mt-2">
          <strong className="font-bold">Start today: {next.name}</strong> — it
          has the longest wait of anything you still need
          {others === 0
            ? ", and it is the last one."
            : others === 1
              ? ", and the other one can be done while you wait for it."
              : `, and the other ${numberWord(others)} can be done while you wait for it.`}
        </p>
      ) : (
        <p className="mt-2">
          {others === 0 ? (
            <>
              <strong className="font-bold">{next.name}</strong> is the last
              one, and it has no queue in front of it.
            </>
          ) : (
            <>
              Nothing still on your list has a queue in front of it —{" "}
              <strong className="font-bold">{next.name}</strong> and the rest
              are same-day or already in your hands.
            </>
          )}
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

function Evidence({ clauses }: { clauses: (keyof typeof CLAUSES)[] }) {
  return (
    <Section
      id="evidence"
      fold
      title="The rule, in the RBI's own words"
      note="The paragraphs to show the bank, quoted exactly, each one linked to the notification."
      lede="Every paragraph number below is in the notification, and the link opens it."
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
                  Paragraph {clause.para}
                </span>
                <span className="text-[1rem] font-bold text-indigo-ink">
                  {clause.label}
                </span>
              </div>

              <p className="mt-2 text-[0.875rem] text-ink-faint">
                Source: {NOTIFICATION.title.split(" (")[0]}, 2025, paragraph{" "}
                {clause.para} · Verified: {formatDate(RULES_VERIFIED_ON)}
              </p>

              {clause.verbatim ? (
                <blockquote className="body-fluid mt-3.5 border-l-4 border-saffron pl-4 font-serif leading-[1.6] text-ink">
                  &ldquo;{clause.text}&rdquo;
                </blockquote>
              ) : (
                /* NOT verbatim — must never appear inside quotation marks. */
                <p className="body-fluid mt-3.5 leading-relaxed text-ink">
                  <span className="font-bold text-ink-soft">In summary: </span>
                  {clause.text}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-[1rem] text-ink-soft">
        From{" "}
        <a
          href={NOTIFICATION.url}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-link underline underline-offset-2"
        >
          {NOTIFICATION.title}
        </a>{" "}
        · {NOTIFICATION.number} · issued {NOTIFICATION.issued}.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ 5 */

function Tactics() {
  return (
    <Section
      id="tactics"
      fold
      title="Four things to do at the branch"
      note="Procedural, not legal. Each one closes a specific way a claim stalls."
    >
      <ol className="mt-5 grid gap-4 sm:grid-cols-2">
        {TACTICS.map((tactic, i) => (
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

function Caveats({ caveats }: { caveats: (typeof OUTCOMES)[OutcomeId]["caveats"] }) {
  return (
    <Section id="caveats" title="What could change the answer">
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

function Escalation() {
  return (
    <section
      data-print="hide"
      className="mt-12 rounded-xl border-2 border-indigo bg-mist-deep p-6"
    >
      <h2 className="display-md font-serif font-bold text-indigo-ink">
        If the bank refuses anyway
      </h2>
      <p className="body-fluid mt-2 max-w-[68ch] leading-relaxed text-ink">
        Complain to the branch&apos;s Grievance Redressal Officer in writing,
        quoting the paragraph above, and give them {ESCALATION.waitDays} days.
        After that the {ESCALATION.scheme} is free to use.
      </p>
      <p className="mt-3 max-w-[68ch] text-[1rem] leading-relaxed text-ink-soft">
        It is free and it is real, and it is not a guarantee: in 2024-25, 40.78%
        of the complaints the Ombudsman accepted were dismissed on the view that
        there had been no deficiency in service.
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
        href="/bank-refused"
        className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-link underline underline-offset-2"
      >
        The full route, plus a written complaint you can fill in
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  );
}

function SourceLine() {
  return (
    <div className="mt-10 border-t border-rule pt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
      <p>
        <strong className="font-bold text-ink">
          Adhikaar — an independent public-information tool.
        </strong>{" "}
        Not a government website and not affiliated with the Reserve Bank of
        India or any bank. Rules quoted from {NOTIFICATION.number} ({NOTIFICATION.ref}),
        issued {NOTIFICATION.issued}, in force from 31 March 2026. Information,
        not legal advice.
      </p>
      {/* The site footer carries this too, but the footer does not print — and
          paragraph 6(b) has to be on the sheet that reaches the counter. */}
      <p className="mt-2">
        Nothing here applies to the Public Provident Fund, the Senior
        Citizens&apos; Savings Scheme, Mahila Samman Savings Certificate or
        Sukanya Samriddhi. Paragraph 6(b) places those outside these Directions.
      </p>
      <p className="mt-2" data-print="hide">
        <Link
          href="/start"
          className="-my-2 inline-block py-2 font-bold text-link underline underline-offset-2"
        >
          Answer the questions again
        </Link>
        {" · "}
        <Link
          href="/contact"
          className="-my-2 inline-block py-2 font-bold text-link underline underline-offset-2"
        >
          Found incorrect information? Tell us
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
}: {
  id?: string;
  title: string;
  lede?: string;
  fold?: boolean;
  /** A word on what is inside, shown on the closed heading. */
  note?: string;
  children: React.ReactNode;
}) {
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
            <span className="group-open:hidden">Show</span>
            <span className="hidden group-open:inline">Hide</span>
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

/** numberWord() at the head of a sentence. */
function sentenceCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function numberWord(n: number) {
  return (
    ["zero", "one", "two", "three", "four", "five", "six", "seven"][n] ?? String(n)
  );
}
