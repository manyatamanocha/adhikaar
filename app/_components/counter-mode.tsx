/**
 * Counter mode — the five-line version of a verdict page.
 *
 * The long verdict page is a reference document; this is the thing to have
 * open, or printed, while actually standing at the counter. Same data,
 * same paragraph numbers, no new claims — just cut down to what a person
 * needs in the next five minutes: what to say, what to show, what the bank
 * may legally ask for, and what to do if they refuse.
 *
 * Lives at the SAME url as the full page, one query parameter switched
 * (?mode=counter), so it is still a real link that can be sent to a
 * sibling or printed — consistent with every other piece of state on this
 * site living in the URL, not in a component.
 */

import Link from "next/link";
import { withLang, type Locale } from "@/lib/i18n";
import { CLAUSES, ESCALATION } from "@/lib/rbi";
import { DOCUMENTS } from "@/lib/documents";
import { OUTCOMES, type OutcomeId } from "@/lib/outcomes";
import { COUNTER_SCRIPT } from "@/lib/counter";
import { toQuery, type Answers } from "@/lib/wizard";
import { PrintButton } from "./print-button";

export function CounterMode({
  id,
  answers,
  locale,
}: {
  id: OutcomeId;
  answers: Answers;
  locale: Locale;
}) {
  const outcome = OUTCOMES[id];
  const script = COUNTER_SCRIPT[id];
  const primaryClause = CLAUSES[outcome.clauses[0]];
  const good = outcome.goodNews;

  return (
    <div className="shell max-w-[640px] py-10 sm:py-12">
      <p
        data-print="hide"
        className="text-[0.875rem] font-bold uppercase tracking-[0.08em] text-saffron-ink"
      >
        Counter mode
      </p>
      <h1 className="display-lg mt-2 font-serif font-bold text-indigo-ink">
        {outcome.verdict}
      </h1>

      <div data-print="hide" className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <PrintButton />
        <Link
          href={withLang(`${outcome.path}${toQuery(answers)}`, locale)}
          className="text-[0.9375rem] font-bold text-link underline underline-offset-2"
        >
          See the full page instead
        </Link>
      </div>

      {script && (
        <Numbered n={1} title="What to say">
          <p className="body-fluid rounded-xl border-2 border-saffron bg-white p-5 leading-relaxed text-ink">
            {script.say}
          </p>
        </Numbered>
      )}

      <Numbered n={script ? 2 : 1} title="What document to show">
        <div className="rounded-xl border-2 border-indigo/25 bg-white p-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="rounded-md bg-indigo px-2.5 py-1 text-[0.875rem] font-bold uppercase tracking-[0.06em] text-white">
              Paragraph {primaryClause.para}
            </span>
            <span className="text-[1rem] font-bold text-indigo-ink">
              {primaryClause.label}
            </span>
          </div>
          {primaryClause.verbatim ? (
            <blockquote className="body-fluid mt-3.5 border-l-4 border-saffron pl-4 font-serif leading-[1.6] text-ink">
              &ldquo;{primaryClause.text}&rdquo;
            </blockquote>
          ) : (
            <p className="body-fluid mt-3.5 leading-relaxed text-ink">
              <span className="font-bold text-ink-soft">In summary: </span>
              {primaryClause.text}
            </p>
          )}
        </div>
      </Numbered>

      <Numbered n={script ? 3 : 2} title="What the bank may legally ask for">
        {outcome.documents ? (
          <ul className="mt-1 space-y-2">
            {outcome.documents.map((docId) => (
              <li
                key={docId}
                className="flex items-baseline gap-2 body-fluid leading-relaxed text-ink"
              >
                <span aria-hidden="true" className="text-indigo">
                  &bull;
                </span>
                {DOCUMENTS[docId].name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="body-fluid leading-relaxed text-ink-soft">
            {good
              ? "No fixed document list applies to this situation — see the full page for what to ask the branch."
              : "There is no closed list here. See the full page for what may genuinely be required and why."}
          </p>
        )}
      </Numbered>

      <Numbered n={script ? 4 : 3} title="What to do if they refuse">
        <div className={good ? "hardbox" : "rounded-xl border-2 border-maroon bg-blush p-5"}>
          <p className="body-fluid leading-relaxed text-ink">
            {ESCALATION.caveat}
          </p>
          <p className="mt-2 text-[0.9375rem] text-ink-soft" data-print="hide">
            <a
              href={ESCALATION.portal}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-link underline underline-offset-2"
            >
              {ESCALATION.portal}
            </a>{" "}
            · {ESCALATION.email}
          </p>
          <Link
            href={withLang("/bank-refused", locale)}
            data-print="hide"
            className="mt-2 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-link underline underline-offset-2"
          >
            The full route, plus a written complaint you can fill in
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Numbered>

      <p className="mt-10 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-ink-soft">
        Adhikaar — an independent public-information tool, not affiliated
        with the RBI or any bank. Information, not legal advice.
      </p>
    </div>
  );
}

function Numbered({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 border-t border-rule pt-6">
      <h2 className="flex items-center gap-3 display-md font-serif font-bold text-indigo-ink">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-indigo text-[1rem] font-bold text-indigo">
          {n}
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
