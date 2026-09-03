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
import { SiteHeader, SiteFooter } from "./chrome";
import { PrintButton } from "./print-button";
import { CLAUSES, NOTIFICATION, TACTICS, ESCALATION } from "@/lib/rbi";
import { DOCUMENTS, type DocId } from "@/lib/documents";
import { OUTCOMES, type OutcomeId } from "@/lib/outcomes";
import { parseAnswers, toQuery, type Answers } from "@/lib/wizard";
import { BankPanel } from "./bank-panel";
import { DeadlineTracker } from "./deadline-tracker";

type Params = Record<string, string | string[] | undefined>;

export function OutcomePage({ id, sp = {} }: { id: OutcomeId; sp?: Params }) {
  const outcome = OUTCOMES[id];
  const answers = parseAnswers(sp);
  const bankId = typeof sp.bank === "string" ? sp.bank : undefined;

  // Same page, one parameter changed — so picking a bank is a normal
  // navigation and Back undoes it.
  const hrefFor = (nextBank: string) => {
    const q = new URLSearchParams(toQuery(answers).replace(/^\?/, ""));
    q.set("bank", nextBank);
    return `${outcome.path}?${q.toString()}`;
  };

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Verdict id={id} />

        <div className="shell max-w-[860px] py-10 sm:py-12">
          <Steps steps={outcome.steps} />
          {outcome.documents && <Documents ids={outcome.documents} />}
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

      <SiteFooter />
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
        className="mt-4 inline-flex items-center gap-2 rounded-pill bg-indigo px-6 py-3 text-[1rem] font-bold text-white transition-colors hover:bg-indigo-lift"
      >
        Check what you were asked for
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ 1 */

function Verdict({ id }: { id: OutcomeId }) {
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
          <p className={`text-[0.875rem] ${good ? "text-white/70" : "text-ink-soft"}`}>
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
    <Section title="Your next steps">
      <ol className="mt-5 space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-indigo text-[0.9375rem] font-bold text-indigo">
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

function Documents({ ids }: { ids: DocId[] }) {
  const longest = ids.filter((id) => DOCUMENTS[id].startFirst);

  return (
    <Section
      title={`The ${numberWord(ids.length)} documents the RBI names`}
      lede="Cost and time below are realistic, not best-case. Nothing else on this list is a court document."
    >
      {longest.length > 0 && (
        <p className="hardbox mt-5 body-fluid">
          <strong className="font-bold">Start today: </strong>
          {longest.map((id) => DOCUMENTS[id].name).join(", ")}
          {" — "}
          it takes the longest of anything on this list, and everything else can
          be done while you wait for it.
        </p>
      )}

      <ul className="mt-5 divide-y divide-rule-faint border-y border-rule-faint">
        {ids.map((id) => {
          const doc = DOCUMENTS[id];
          return (
            <li key={id} className="py-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="display-md font-serif font-bold text-indigo-ink">
                  {doc.name}
                </h3>
                {doc.official && (
                  <span className="rounded-md bg-indigo/8 px-2 py-0.5 text-[0.8125rem] font-semibold text-indigo">
                    {doc.official}
                  </span>
                )}
              </div>

              <p className="body-fluid mt-2 leading-relaxed text-ink-soft">
                {doc.what}
              </p>

              <dl className="mt-3 grid gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-3">
                <Field label="Where from" value={doc.from} />
                <Field label="Cost" value={doc.cost} />
                <Field label="How long" value={doc.time} />
              </dl>

              {doc.note && (
                /* Labelled, not colour-barred. A maroon rule alone carries no
                   meaning on the black-and-white sheet this page becomes. */
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
                  <strong className="font-bold text-maroon">Note. </strong>
                  {doc.note}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ 4 */

function Evidence({ clauses }: { clauses: (keyof typeof CLAUSES)[] }) {
  return (
    <Section
      title="The rule, in the RBI's own words"
      lede="This is the part to show the bank. Every paragraph number below is in the notification, and the link opens it."
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
                <span className="rounded-md bg-indigo px-2.5 py-1 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-white">
                  Paragraph {clause.para}
                </span>
                <span className="text-[0.9375rem] font-bold text-indigo-ink">
                  {clause.label}
                </span>
              </div>

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

      <p className="mt-4 text-[0.9375rem] text-ink-soft">
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
      title="Four things to do at the branch"
      lede="These are procedural, not legal. Each one closes a specific way a claim stalls."
    >
      <ol className="mt-5 grid gap-4 sm:grid-cols-2">
        {TACTICS.map((tactic, i) => (
          <li
            key={tactic.title}
            className="rounded-xl border border-rule bg-mist p-5"
          >
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-saffron-ink">
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
    <Section title="What could change the answer">
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
      <p className="mt-3 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-soft">
        It is free and it is real, and it is not a guarantee: in 2024-25, 40.78%
        of the complaints the Ombudsman accepted were dismissed on the view that
        there had been no deficiency in service.
      </p>
      <p className="mt-3 text-[0.9375rem] text-ink-soft">
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
    </section>
  );
}

function SourceLine() {
  return (
    <div className="mt-10 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-ink-soft">
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
        <Link href="/start" className="font-bold text-link underline underline-offset-2">
          Answer the questions again
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/* No kicker above the heading. Each one repeated what the heading beneath it
   already said, and on a phone that is a screenful of scroll bought with
   nothing — on a page a grieving reader is already scrolling too much of. */
function Section({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 first:mt-0">
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

function numberWord(n: number) {
  return (
    ["zero", "one", "two", "three", "four", "five", "six", "seven"][n] ?? String(n)
  );
}
