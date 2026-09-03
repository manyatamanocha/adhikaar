/**
 * The landing page.
 *
 * Rebuilt 4 Sep 2026 in the structural grammar of web.umang.gov.in, which the
 * user pinned as the reference. What was taken is the STRUCTURE, not the
 * identity: UMANG carries the state emblem and the Digital India mark, and
 * PRODUCT.md forbids Adhikaar from wearing either.
 *
 * What UMANG does that this page was not doing:
 *
 *   · every block is a short bold heading, one grey line beneath it, then a
 *     grid of tiles — almost no prose anywhere
 *   · a band of stat tiles near the top: a drawn line mark, a large number,
 *     a small tracked label, one line of context
 *   · two tiles across on a phone, not one, so a section is scannable in a
 *     glance instead of a scroll
 *
 * The stat band is the biggest gain here, because this product's argument IS
 * four numbers: what the court document costs, how long it takes, the floor
 * below which a bank must not insist, and the date the rule changed. Set as
 * tiles they land in about a second. Set as paragraphs they were being skipped.
 *
 * Every figure below is in lib/rbi.ts or lib/documents.ts. The threshold tile
 * says "floor" in as many words, because para 7(h) lets a bank set its own
 * higher one and stating a single universal number is a prohibition.
 */

import Link from "next/link";
import { NOTIFICATION, CLAUSES } from "@/lib/rbi";
import { SiteHeader, SiteFooter } from "./_components/chrome";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <Numbers />
        <WhereDoYouStand />
        <TheArgument />
        <SecondDoors />
      </main>

      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

/** Short bold heading, one grey line, then the grid. Used by every block. */
function Head({
  title,
  sub,
  center,
}: {
  title: string;
  sub: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="display-lg font-serif font-bold text-indigo-ink">
        {title}
      </h2>
      <p
        className={`body-fluid mt-2 max-w-[62ch] text-ink-soft ${
          center ? "mx-auto" : ""
        }`}
      >
        {sub}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="bg-indigo">
      <div className="shell grid gap-9 py-11 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
        <div>
        <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-white">
          <span className="block font-deva text-[0.82em] leading-[1.3] text-saffron-lift">
            उत्तराधिकार प्रमाणपत्र
          </span>
          <span className="mt-1 block">You probably do not need one.</span>
        </h1>

        <p className="lede-fluid mt-4 max-w-[56ch] text-white/90">
          A bank has asked your family for a succession certificate. Since{" "}
          <strong className="font-semibold text-white">31 March 2026</strong> the
          Reserve Bank&apos;s rules say that in most deposit claims a bank must
          not insist on one.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href="/start"
            className="inline-flex items-center gap-2 rounded-pill bg-saffron px-8 py-3.5 text-[1.0625rem] font-bold text-indigo-ink transition-colors hover:bg-[#ab6314]"
          >
            Start — four questions
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <p className="text-[0.875rem] text-white/75">
            About two minutes. No sign-in, no cookie, nothing that identifies
            you.
          </p>
        </div>
        </div>

        {/* The proof, beside the claim. Where the reference portal puts a
            ministerial portrait we put the sentence itself: it is the only
            thing on this page with real authority. */}
        <figure className="rounded-2xl bg-paper p-6 shadow-[0_10px_40px_rgba(0,0,0,0.22)] sm:p-7">
          <figcaption className="text-step font-bold uppercase tracking-[0.12em] text-maroon">
            The rule, in the RBI&apos;s own words
          </figcaption>
          <blockquote className="body-fluid mt-3.5 font-serif leading-[1.6] text-ink">
            &ldquo;… the bank shall not insist on production of legal documents
            such as Succession Certificate, Letter of Administration, Probate of
            Will, etc., or seek any bond of indemnity/ surety … irrespective of
            the amount standing to the credit.&rdquo;
          </blockquote>
          <p className="mt-4 border-t border-rule-faint pt-3.5 text-[0.875rem] text-ink-soft">
            Paragraph {CLAUSES.nomineeNoDocuments.para}, applying where a
            nominee or surviving joint holder is on record.{" "}
            <span className="text-ink-faint">
              {NOTIFICATION.number} · issued {NOTIFICATION.issued}
            </span>
          </p>
          <a
            href={NOTIFICATION.url}
            target="_blank"
            rel="noreferrer"
            className="-my-2 mt-2 inline-block py-2 font-bold text-link underline underline-offset-2"
          >
            Read the Directions themselves &rarr;
          </a>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/* The argument, as four numbers. Two across on a phone. */
const NUMBERS = [
  {
    icon: <RupeeIcon />,
    figure: "₹17,000",
    label: "What it costs",
    note: "Court fees of about 3% of the amount, plus a lawyer, for a succession certificate.",
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
    note: "Below it, a commercial bank must follow the simplified procedure. A bank may set its own higher — never assume this is yours.",
  },
  {
    icon: <CalendarIcon />,
    figure: "31 Mar",
    unit: "2026",
    label: "In force from",
    note: "The date the Directions took effect. Most advice online still predates it.",
  },
] as const;

function Numbers() {
  return (
    <section className="border-b border-rule-faint bg-white">
      <div className="shell py-11 sm:py-14">
        <Head
          title="What a court document actually costs"
          sub="The four figures this whole site turns on. Every one is from the RBI's own Directions or a published court-fee schedule."
        />

        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-rule bg-rule lg:grid-cols-4">
          {NUMBERS.map((n) => (
            <li key={n.label} className="bg-paper p-5 sm:p-6">
              <span className="block text-indigo" aria-hidden="true">
                {n.icon}
              </span>
              <p className="mt-3 font-serif text-[clamp(1.75rem,5vw,2.5rem)] font-bold leading-[1.05] text-indigo-ink">
                {n.figure}
                {"unit" in n && n.unit && (
                  <span className="block font-sans text-[0.9375rem] font-bold tracking-normal text-ink-soft">
                    {n.unit}
                  </span>
                )}
              </p>
              <p className="mt-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
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


/* ------------------------------------------------------------------ */

/* Each tile is a door into the flow at the point the user already knows they
   are at. The first two resolve outright under para 9, so they link straight to
   the verdict; the other two still need the amount and the dispute question. */
const PATHS = [
  {
    chip: "para 9",
    tone: "green",
    title: "A nominee was registered",
    body: "Nothing further, whatever the amount.",
    href: "/nominee",
  },
  {
    chip: "para 9",
    tone: "saffron",
    title: "It was a joint account",
    body: "A survivorship clause works the same way.",
    href: "/survivorship",
  },
  {
    chip: "para 10",
    tone: "indigo",
    title: "There was no nominee",
    body: "A fixed list of six documents, below the floor.",
    href: "/start?claiming=deposit&nominee=no",
  },
  {
    chip: "start here",
    tone: "violet",
    title: "I don't know",
    body: "Most families do not. We will tell you how to find out.",
    href: "/start?claiming=deposit&nominee=unknown",
  },
] as const;

const TONE: Record<string, { border: string; chipBg: string; chipText: string }> =
  {
    green: {
      border: "border-accent-green",
      chipBg: "bg-accent-green/10",
      chipText: "text-accent-green",
    },
    saffron: {
      border: "border-saffron",
      chipBg: "bg-saffron/12",
      chipText: "text-saffron-ink",
    },
    indigo: {
      border: "border-indigo",
      chipBg: "bg-indigo/10",
      chipText: "text-indigo",
    },
    violet: {
      border: "border-accent-violet",
      chipBg: "bg-accent-violet/10",
      chipText: "text-accent-violet",
    },
  };

function WhereDoYouStand() {
  return (
    <section className="border-y border-rule-faint bg-paper">
      <div className="shell py-12 sm:py-16">
        <Head
          center
          title="Was a nominee on the account?"
          sub="The law splits here first, so the questions do too. Pick the one that describes your situation."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PATHS.map((p) => {
            const t = TONE[p.tone];
            return (
              <Link
                key={p.title}
                href={p.href}
                className={`group flex flex-col rounded-xl border-2 bg-paper p-4 transition-shadow hover:shadow-[0_6px_24px_rgba(29,52,97,0.14)] sm:p-5 ${t.border}`}
              >
                <span
                  className={`inline-flex w-fit rounded-md px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] sm:text-[0.75rem] ${t.chipBg} ${t.chipText}`}
                >
                  {p.chip}
                </span>
                <h3 className="display-md mt-3 font-serif font-bold text-indigo-ink">
                  {p.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">
                  {p.body}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-3 text-[0.9375rem] font-bold text-indigo group-hover:underline"
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

/* ------------------------------------------------------------------ */

function TheArgument() {
  return (
    <section className="bg-mist">
      <div className="shell py-12 sm:py-16">
        <Head
          title="The rule changed. Most of the internet has not caught up."
          sub="The Reserve Bank has issued this instruction three times — 2005, January 2013, and September 2025. A rule reissued three times in twenty years is one that is not reaching the counter."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-rule bg-blush p-5 sm:p-6">
            <p className="text-step font-bold uppercase tracking-[0.1em] text-maroon">
              What a search usually tells you
            </p>
            <ul className="body-fluid mt-3 space-y-2 text-ink">
              <li>Claimable only through a succession certificate</li>
              <li>A petition before a District Judge</li>
              <li>Notice to every heir, and a newspaper advertisement</li>
              <li>Roughly ₹17,000, and four to seven months</li>
            </ul>
          </div>

          <div className="rounded-xl border-2 border-indigo bg-paper p-5 sm:p-6">
            <p className="text-step font-bold uppercase tracking-[0.1em] text-indigo">
              What the Directions actually say
            </p>
            <ul className="body-fluid mt-3 space-y-2 text-ink">
              <li>
                With a nominee or survivor on record, a bank must not insist at
                all — whatever the amount
              </li>
              <li>No succession certificate, probate or administration</li>
              <li>No indemnity bond, and no third-party surety</li>
              <li>With no nominee, a simplified procedure below the floor</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const DOORS = [
  {
    title: "Already in court?",
    body: "These Directions took effect after many cases began. We can show you what changed, to put to your lawyer.",
    cta: "What changed on 31 March 2026",
    href: "/already-in-court",
  },
  {
    title: "What this does not cover",
    body: "Bank deposits, lockers and safe custody only. Insurance, mutual funds, shares, provident fund, pension and post office savings run on their own rails.",
    cta: "Where those are claimed",
    href: "/other-assets",
  },
] as const;

function SecondDoors() {
  return (
    <section className="border-t border-rule-faint bg-mist-deep">
      <div className="shell grid gap-4 py-12 lg:grid-cols-2">
        {DOORS.map((d) => (
          <div
            key={d.title}
            className="rounded-xl border border-rule bg-paper p-5 sm:p-6"
          >
            <h3 className="display-md font-serif font-bold text-indigo-ink">
              {d.title}
            </h3>
            <p className="body-fluid mt-2 text-ink-soft">{d.body}</p>
            <Link
              href={d.href}
              className="-my-2 mt-2 inline-block py-2 font-bold text-link underline underline-offset-2"
            >
              {d.cta} &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn marks, one stroke weight, matching the existing icon pair below. */

function RupeeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 4h10M7 8.5h10M7 4c4.2 0 6.4 1.6 6.4 4.3S11.2 12.6 7 12.6h1.4L15.5 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7.2V12l3.2 2.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4v16M6 20h12M4 9h16M4 9l-2.2 4.6a3 3 0 0 0 4.4 0L4 9zm16 0l-2.2 4.6a3 3 0 0 0 4.4 0L20 9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 9l8-3 8 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 10h17M8 3.5v4M16 3.5v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
