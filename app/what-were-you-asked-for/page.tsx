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
 */

import Link from "next/link";
import { SiteHeader, SiteFooter } from "../_components/chrome";
import { PrintButton } from "../_components/print-button";
import { DOCUMENTS, ASKABLE, type DocId } from "@/lib/documents";
import { NOTIFICATION } from "@/lib/rbi";
import { parseAnswers, toQuery } from "@/lib/wizard";
import {
  judge,
  parseAsked,
  situationFrom,
  toggle,
  SITUATION_LABEL,
} from "@/lib/asked";

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
  const answers = parseAnswers(sp);
  const asked = parseAsked(sp.asked);
  const situation = situationFrom(answers);
  const results = judge(situation, asked);

  const hrefFor = (id: DocId) => {
    const next = toggle(asked, id);
    const q = new URLSearchParams(toQuery(answers).replace(/^\?/, ""));
    if (next.length) q.set("asked", next.join(","));
    const s = q.toString();
    return `/what-were-you-asked-for${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-indigo">
          <div className="shell max-w-[860px] py-10 sm:py-12">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-white">
              What were you asked for?
            </h1>
            <p className="lede-fluid mt-4 max-w-[60ch] text-white/90">
              Tick everything the branch told you to bring. We will show you
              which of them the RBI actually prescribes for your situation, and
              which it does not — with the paragraph number for each.
            </p>
          </div>
        </section>

        <div className="shell max-w-[860px] py-10">
          <Situation situation={situation} answers={answers} />

          <section className="mt-8">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              Tick what the branch demanded
            </h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {ASKABLE.map((id) => {
                const on = asked.includes(id);
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
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[0.75rem] font-bold ${
                          on
                            ? "border-indigo bg-indigo text-white"
                            : "border-rule text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="flex-1">
                        <span className="block text-[1rem] font-bold text-indigo-ink">
                          {DOCUMENTS[id].name}
                        </span>
                        {DOCUMENTS[id].official && (
                          <span className="mt-0.5 block text-[0.8125rem] text-ink-faint">
                            {DOCUMENTS[id].official}
                          </span>
                        )}
                      </span>
                      <span className="sr-only">
                        {on ? "Ticked. Select to remove." : "Select to tick."}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {asked.length > 0 && (
            <Results results={results} situation={situation} />
          )}

          <p className="mt-10 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-ink-soft">
            Compared against{" "}
            <a
              href={NOTIFICATION.url}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-link underline underline-offset-2"
            >
              {NOTIFICATION.title}
            </a>{" "}
            · {NOTIFICATION.number}, issued {NOTIFICATION.issued}. Information,
            not legal advice. Nothing you tick is stored or sent anywhere.
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Situation({
  situation,
  answers,
}: {
  situation: ReturnType<typeof situationFrom>;
  answers: ReturnType<typeof parseAnswers>;
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
      <p className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
        Comparing against the list for
      </p>
      <p className="display-md mt-1.5 font-serif font-bold text-indigo-ink">
        {SITUATION_LABEL[situation]}
      </p>
      {!known && (
        <p className="body-fluid mt-2 text-ink">
          Which documents the RBI prescribes depends entirely on whether a
          nominee was registered and on the total amount. Answer those two
          questions first and this comparison becomes exact.
        </p>
      )}
      <p className="mt-3 text-[0.9375rem]" data-print="hide">
        <Link
          href={`/start${toQuery(answers)}`}
          className="font-bold text-link underline underline-offset-2"
        >
          {known ? "Change your answers" : "Answer the questions"}
        </Link>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Results({
  results,
  situation,
}: {
  results: ReturnType<typeof judge>;
  situation: ReturnType<typeof situationFrom>;
}) {
  // No comparison can honestly be run above the threshold, or before we know
  // whether there was a nominee. Say why rather than showing a wrong split.
  if (!results) {
    return (
      <section className="mt-10">
        <h2 className="display-lg font-serif font-bold text-indigo-ink">
          We are not going to grade this list
        </h2>
        <div className="hardbox mt-4">
          <p className="body-fluid text-ink">
            {situation === "above-threshold"
              ? "At or above the threshold, para 10(b) allows the bank to require a succession certificate or equivalent, or a legal heir certificate, or an affidavit sworn before an official. There is no closed list to compare your demands against, so calling any of them an overreach would be wrong — and would send you to argue a case you would lose."
              : "Until we know whether a nominee was registered, there is no single list to compare against — para 9 and para 10(a) prescribe different things. Guessing would be worse than saying so."}
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
        What the RBI&apos;s list says about each one
      </h2>

      <div data-print="hide" className="mt-4">
        <PrintButton />
      </div>

      {not.length > 0 && (
        <Group
          heading={`${count(not.length)} not in the RBI's list for your situation`}
          lede="This does not make the demand illegal. It means the RBI's own Directions do not prescribe it here — which is a reasonable thing to raise, in writing, and ask the officer to name the rule they rely on."
          tone="hard"
          items={not}
        />
      )}

      {prescribed.length > 0 && (
        <Group
          heading={`${count(prescribed.length)} the RBI does prescribe`}
          lede="These are legitimate. Asking for them is the bank following the rule, not overreaching."
          tone="ok"
          items={prescribed}
        />
      )}
    </section>
  );
}

function Group({
  heading,
  lede,
  tone,
  items,
}: {
  heading: string;
  lede: string;
  tone: "hard" | "ok";
  items: NonNullable<ReturnType<typeof judge>>;
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
        {items.map((r) => (
          <li
            key={r.id}
            className={`rounded-xl border-2 bg-white p-5 ${
              tone === "hard" ? "border-maroon" : "border-accent-green"
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="display-md font-serif font-bold text-indigo-ink">
                {DOCUMENTS[r.id].name}
              </h4>
              <span
                className={`rounded-md px-2 py-0.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] ${
                  tone === "hard"
                    ? "bg-maroon text-white"
                    : "bg-accent-green text-white"
                }`}
              >
                {tone === "hard" ? "Not in the list" : "In the list"}
              </span>
            </div>
            <p className="body-fluid mt-2 leading-relaxed text-ink">
              {r.reason}
            </p>
            {tone === "hard" && (
              <p className="mt-2 text-[0.9375rem] text-ink-soft">
                {DOCUMENTS[r.id].what} Cost {DOCUMENTS[r.id].cost.toLowerCase()},{" "}
                {DOCUMENTS[r.id].time.toLowerCase()}.
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function count(n: number) {
  return n === 1 ? "One thing" : `${["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven"][n] ?? n} things`;
}
