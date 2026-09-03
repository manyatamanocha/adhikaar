/**
 * The landing page.
 *
 * Built 4 Sep 2026 from the user's own mockup: a light cream ground instead of
 * a navy block, a serif headline that turns green on its second clause, four
 * pale stat cards with pastel circular marks, the four situations as white
 * cards, a green reassurance band, and a trust strip.
 *
 * Three things in that mockup are deliberately NOT reproduced, because they
 * would be false:
 *
 *   · "Expert guidance" and "Expert support — when you need it". There are no
 *     experts. Promising a bereaved family one is the worst copy on the page.
 *   · "100% Secure", which means nothing. What is true and better is that
 *     nothing is stored at all.
 *   · The photograph of clasped hands. No image generation was available here,
 *     and a stock substitute would be worse than the composition without it.
 *     The RBI's own sentence takes that slot, and the two cards the mockup
 *     floats over the photo stay exactly where it puts them.
 *
 * Every figure is from lib/rbi.ts. The threshold card says "floor" in as many
 * words: para 7(h) lets a bank set its own higher one, and stating a single
 * universal number is a prohibition.
 */

import Link from "next/link";
import { NOTIFICATION, CLAUSES } from "@/lib/rbi";
import { SiteHeader, SiteFooter } from "./_components/chrome";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-paper">
        <Hero />
        <Numbers />
        <Situations />
        <Assurance />
        <TrustStrip />
      </main>

      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ 1 */

function Hero() {
  return (
    <section className="border-b border-rule-faint bg-mist">
      <div className="shell grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-indigo-ink">
            You probably{" "}
            <span className="text-indigo">
              do not need a succession certificate.
            </span>
          </h1>

          <p className="lede-fluid mt-5 max-w-[46ch] text-ink-soft">
            RBI rules say that in most deposit claims, a bank{" "}
            <strong className="font-bold text-ink">must not insist</strong> on
            one.
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
            {[
              { icon: <ShieldIcon />, label: "RBI-backed rules" },
              { icon: <LockIcon />, label: "No data stored" },
              { icon: <QuoteMarkIcon />, label: "Every claim cited" },
            ].map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink"
              >
                <span className="text-indigo" aria-hidden="true">
                  {t.icon}
                </span>
                {t.label}
              </li>
            ))}
          </ul>

          <Link
            href="/start"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-indigo px-8 py-4 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
          >
            Check your options
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <p className="mt-4 flex items-center gap-2 text-[0.9375rem] text-ink-soft">
            <span className="text-indigo" aria-hidden="true">
              <TickIcon />
            </span>
            Takes less than 2 minutes
          </p>
        </div>

        {/* The proof, where the mockup puts a photograph. */}
        <div className="relative">
          <div className="rounded-2xl border border-rule bg-paper p-6 shadow-[0_12px_44px_rgba(23,37,29,0.10)] sm:p-8">
            <p className="text-step font-bold uppercase tracking-[0.12em] text-maroon">
              The rule, in the RBI&apos;s own words
            </p>
            <blockquote className="body-fluid mt-4 font-serif leading-[1.6] text-ink">
              &ldquo;… the bank shall not insist on production of legal documents
              such as Succession Certificate, Letter of Administration, Probate
              of Will, etc., or seek any bond of indemnity/ surety …
              irrespective of the amount standing to the credit.&rdquo;
            </blockquote>
            <p className="mt-5 border-t border-rule-faint pt-4 text-[0.875rem] leading-relaxed text-ink-soft">
              Paragraph {CLAUSES.nomineeNoDocuments.para}, where a nominee or
              surviving joint holder is on record.{" "}
              <span className="text-ink-faint">
                {NOTIFICATION.number} · issued {NOTIFICATION.issued}
              </span>
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 lg:mt-6">
            <div className="flex flex-1 items-start gap-3 rounded-xl border border-indigo/25 bg-indigo/8 p-4">
              <span className="mt-0.5 shrink-0 text-indigo" aria-hidden="true">
                <ShieldIcon />
              </span>
              <p className="text-[0.9375rem] leading-snug text-ink">
                <strong className="font-bold">
                  Most families are surprised to learn this.
                </strong>{" "}
                <span className="text-ink-soft">The rule changed recently.</span>
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-rule bg-mist-deep p-4">
              <div>
                <p className="text-[1.0625rem] font-bold text-indigo-ink">
                  31 March 2026
                </p>
                <p className="text-[0.875rem] text-ink-soft">
                  Rule in force from
                </p>
              </div>
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-indigo"
                aria-hidden="true"
              >
                <CalendarIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2 */

const NUMBERS = [
  {
    icon: <RupeeIcon />,
    figure: "₹17,000",
    label: "What it costs",
    note: "Court fees of about 3% of the amount, plus a lawyer.",
  },
  {
    icon: <ClockIcon />,
    figure: "4–7",
    unit: "months",
    label: "How long it takes",
    note: "Uncontested. One to two years if any heir objects.",
  },
  {
    icon: <ScaleIcon />,
    figure: "₹15 lakh",
    label: "The RBI floor",
    note: "Below it a bank must follow the simplified procedure. A bank may set its own higher.",
  },
  {
    icon: <CalendarIcon />,
    figure: "31 Mar 2026",
    label: "In force from",
    note: "The date the Directions took effect.",
  },
] as const;

function Numbers() {
  return (
    <section className="bg-paper">
      <div className="shell py-14 sm:py-16">
        <h2 className="display-lg text-center font-serif font-bold text-indigo-ink">
          Four things to know first
        </h2>
        {/* The mockup's small rule-and-dot under the heading. */}
        <div
          aria-hidden="true"
          className="mt-3 flex items-center justify-center gap-2"
        >
          <span className="h-px w-10 bg-indigo/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-indigo" />
          <span className="h-px w-10 bg-indigo/40" />
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {NUMBERS.map((n) => (
            <li
              key={n.label}
              className="rounded-2xl border border-rule-faint bg-mist p-5 text-center sm:p-6"
            >
              <span
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo/10 text-indigo"
              >
                {n.icon}
              </span>
              <p className="mt-4 font-serif text-[clamp(1.5rem,4.5vw,2rem)] font-bold leading-[1.1] text-indigo-ink">
                {n.figure}
              </p>
              {"unit" in n && n.unit && (
                <p className="text-[1rem] font-bold text-ink-soft">{n.unit}</p>
              )}
              <p className="mt-2 text-[0.9375rem] font-bold text-ink">
                {n.label}
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                {n.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3 */

const PATHS = [
  {
    icon: <PersonIcon />,
    chip: "No certificate",
    tone: "green",
    title: "A nominee was registered",
    body: "Nothing further, whatever the amount.",
    href: "/nominee",
  },
  {
    icon: <TwoPeopleIcon />,
    chip: "No certificate",
    tone: "amber",
    title: "It was a joint account",
    body: "A survivorship clause works the same way.",
    href: "/survivorship",
  },
  {
    icon: <DocIcon />,
    chip: "Six documents",
    tone: "blue",
    title: "There was no nominee",
    body: "A fixed list of six documents, below the floor.",
    href: "/start?claiming=deposit&nominee=no",
  },
  {
    icon: <QuestionIcon />,
    chip: "Start here",
    tone: "violet",
    title: "I don't know",
    body: "Most families do not. We will help you find out.",
    href: "/start?claiming=deposit&nominee=unknown",
  },
] as const;

const TONE: Record<string, { tint: string; ink: string }> = {
  green: { tint: "bg-indigo/10", ink: "text-indigo" },
  amber: { tint: "bg-saffron/15", ink: "text-saffron-ink" },
  blue: { tint: "bg-accent-blue/10", ink: "text-accent-blue" },
  violet: { tint: "bg-accent-violet/10", ink: "text-accent-violet" },
};

function Situations() {
  return (
    <section className="border-y border-rule-faint bg-mist">
      <div className="shell py-14 sm:py-16">
        <h2 className="display-lg font-serif font-bold text-indigo-ink">
          What best describes your situation?
        </h2>
        <p className="body-fluid mt-2 text-ink-soft">
          We&apos;ll show you exactly what to do next.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {PATHS.map((p) => {
            const t = TONE[p.tone];
            return (
              <Link
                key={p.title}
                href={p.href}
                className="group flex items-start gap-4 rounded-2xl border border-rule-faint bg-paper p-5 transition-shadow hover:shadow-[0_10px_32px_rgba(23,37,29,0.10)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${t.tint} ${t.ink}`}
                >
                  {p.icon}
                </span>

                <span className="flex-1">
                  <span
                    className={`inline-block rounded-md px-2.5 py-1 text-[0.8125rem] font-bold ${t.tint} ${t.ink}`}
                  >
                    {p.chip}
                  </span>
                  <span className="display-md mt-2.5 block font-serif font-bold text-indigo-ink">
                    {p.title}
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ink-soft">
                    {p.body}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule text-[1.125rem] text-indigo transition-colors group-hover:border-indigo group-hover:bg-indigo group-hover:text-white sm:flex"
                >
                  &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4 */

function Assurance() {
  return (
    <section className="bg-paper">
      <div className="shell py-10 sm:py-12">
        <div className="flex flex-wrap items-center gap-5 rounded-2xl bg-indigo/8 p-6 sm:p-7">
          <span
            aria-hidden="true"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo/12 text-indigo"
          >
            <ShieldIcon />
          </span>
          <div className="min-w-[16rem] flex-1">
            <p className="display-md font-serif font-bold text-indigo-ink">
              The RBI&apos;s rules, in plain language, step by step.
            </p>
            <p className="mt-1 text-[0.9375rem] text-ink-soft">
              We quote. You decide. Every sentence carries its paragraph number.
            </p>
          </div>
          <a
            href={NOTIFICATION.url}
            target="_blank"
            rel="noreferrer"
            className="-my-2 inline-flex items-center gap-2 py-2 text-[0.9375rem] font-bold text-link underline underline-offset-2"
          >
            Read the rule itself
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 5 */

const TRUST = [
  { icon: <TickIcon />, title: "No sign-in", note: "No account needed" },
  {
    icon: <LockIcon />,
    title: "No data stored",
    note: "Nothing reaches a server",
  },
  {
    icon: <QuoteMarkIcon />,
    title: "Plain language",
    note: "No unexplained jargon",
  },
  {
    icon: <PrinterIcon />,
    title: "A page to print",
    note: "To hand across the counter",
  },
] as const;

function TrustStrip() {
  return (
    <section className="border-t border-rule-faint bg-paper">
      <div className="shell grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-indigo" aria-hidden="true">
              {t.icon}
            </span>
            <div>
              <p className="text-[0.9375rem] font-bold text-indigo-ink">
                {t.title}
              </p>
              <p className="text-[0.875rem] text-ink-soft">{t.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn marks. One stroke weight, 24px grid. */

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5l7.5 3v6.3c0 4.5-3.1 8.2-7.5 10.2-4.4-2-7.5-5.7-7.5-10.2V5.5l7.5-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.7 11.9l2.3 2.3 4.4-4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function QuoteMarkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.5 6.5C6.9 7.6 5.5 9.6 5.5 12.4v5.1h5.2v-5.1H8.1c0-1.7.7-2.9 2.2-3.6l-.8-2.3zM19.5 6.5c-2.6 1.1-4 3.1-4 5.9v5.1h5.2v-5.1h-2.6c0-1.7.7-2.9 2.2-3.6l-.8-2.3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12.3l2.6 2.6 5.4-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 9V3.5h10V9M7 19H5a1.5 1.5 0 0 1-1.5-1.5v-6A1.5 1.5 0 0 1 5 10h14a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 19 19h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="15.5" width="10" height="5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function RupeeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4h10M7 8.5h10M7 4c4.2 0 6.4 1.6 6.4 4.3S11.2 12.6 7 12.6h1.4L15.5 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.2V12l3.2 2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v16M6 20h12M4 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 9l-2.2 4.6a3 3 0 0 0 4.4 0L4 9zm16 0l-2.2 4.6a3 3 0 0 0 4.4 0L20 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 9l8-3 8 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.4 3.1-5.6 7-5.6s7 2.2 7 5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TwoPeopleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.4" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 6.2a3.2 3.2 0 0 1 0 4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 19.6c0-3 2.7-4.9 6-4.9s6 1.9 6 4.9M17.5 15.2c2.1.5 3.5 1.9 3.5 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.4 9h7.2M8.4 12.6h7.2M8.4 16.2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.7-.9 1.3v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.4" r="0.95" fill="currentColor" />
    </svg>
  );
}
