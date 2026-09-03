import Link from "next/link";
import { NOTIFICATION, CLAUSES } from "@/lib/rbi";
import { SiteHeader, SiteFooter } from "./_components/chrome";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <RuleStrip />
        <WhereDoYouStand />
        <TheArgument />
        <SecondDoors />
      </main>

      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="bg-indigo">
      <div className="shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-pill bg-white/12 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-saffron-lift ring-1 ring-inset ring-white/25">
            <ShieldIcon />
            Independent public-information tool
          </span>

          <h1 className="display-xl mt-5 font-serif font-bold tracking-[-0.015em] text-white">
            <span className="block font-deva text-[0.82em] leading-[1.3] text-saffron-lift">
              उत्तराधिकार प्रमाणपत्र
            </span>
            <span className="mt-1 block">You probably do not need one.</span>
          </h1>

          <p className="lede-fluid mt-5 max-w-[54ch] text-white/90">
            A bank has asked your family for a succession certificate. Since{" "}
            <strong className="font-semibold text-white">31 March 2026</strong>,
            the Reserve Bank&apos;s rules say that in most deposit claims a bank
            must not insist on one.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
            {[
              "No sign-in needed",
              "No cookie, nothing that identifies you",
              "Free to use",
            ].map((t) => (
              <li
                key={t}
                className="body-fluid flex items-center gap-2 text-white/85"
              >
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-pill bg-saffron px-8 py-3.5 text-[1.0625rem] font-bold text-indigo-ink transition-colors hover:bg-[#ab6314]"
            >
              Start — four questions
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <p className="text-[0.875rem] text-white/70">About two minutes</p>
          </div>
        </div>

        {/* Where the reference portal puts a ministerial portrait, we put the
            sentence itself. It is the only thing here with real authority. */}
        <figure className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.18)] sm:p-7">
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
            nominee or surviving joint holder is on record.
            <br />
            <span className="text-ink-faint">
              {NOTIFICATION.number} · issued {NOTIFICATION.issued}
            </span>
          </p>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function RuleStrip() {
  return (
    <div className="border-b border-rule-faint bg-white">
      <div className="shell flex items-center gap-4 py-4">
        <span className="hidden h-px flex-1 bg-rule-faint sm:block" />
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-serif text-[clamp(1rem,1.4vw,1.375rem)] font-bold text-indigo-ink">
          Read the Directions themselves
          <a
            href={NOTIFICATION.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-saffron text-indigo-ink"
            aria-label="Open the RBI notification"
          >
            <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
        <span className="hidden h-px flex-1 bg-rule-faint sm:block" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/* Each card is a door into the flow at the point the user already knows they
   are at. The first two resolve outright under para 9, so they link straight to
   the verdict; the other two still need the amount and the dispute question. */
const PATHS = [
  {
    chip: "para 9",
    tone: "green",
    title: "A nominee was registered",
    body: "No succession certificate, no probate, no indemnity bond and no surety — whatever the amount in the account.",
    cta: "See what applies",
    href: "/nominee",
  },
  {
    chip: "para 9",
    tone: "saffron",
    title: "It was a joint account",
    body: "Where the account carries a survivorship clause, the same rule applies as for a registered nominee.",
    cta: "See what applies",
    href: "/survivorship",
  },
  {
    chip: "para 10",
    tone: "indigo",
    title: "There was no nominee",
    body: "A simplified procedure applies below a threshold — the bank must settle on a fixed list of six documents.",
    cta: "Answer two more questions",
    href: "/start?claiming=deposit&nominee=no",
  },
  {
    chip: "start here",
    tone: "violet",
    title: "I don't know",
    body: "Most families do not know, and it is the one fact that changes everything. We will tell you how to find out.",
    cta: "Find out first",
    href: "/start?claiming=deposit&nominee=unknown",
  },
] as const;

const TONE: Record<
  string,
  { border: string; chipBg: string; chipText: string; link: string }
> = {
  green: {
    border: "border-accent-green",
    chipBg: "bg-accent-green/10",
    chipText: "text-accent-green",
    link: "text-accent-green",
  },
  saffron: {
    border: "border-saffron",
    chipBg: "bg-saffron/12",
    chipText: "text-saffron-ink",
    link: "text-saffron-ink",
  },
  indigo: {
    border: "border-indigo",
    chipBg: "bg-indigo/10",
    chipText: "text-indigo",
    link: "text-indigo",
  },
  violet: {
    border: "border-accent-violet",
    chipBg: "bg-accent-violet/10",
    chipText: "text-accent-violet",
    link: "text-accent-violet",
  },
};

function WhereDoYouStand() {
  return (
    <section className="border-b border-rule-faint bg-mist">
      <div className="shell py-14 sm:py-16">
        <h2 className="display-lg text-center font-serif font-bold text-indigo-ink">
          Was a nominee on the account?
        </h2>
        <p className="body-fluid mx-auto mt-2.5 max-w-[60ch] text-center text-ink-soft">
          The law splits here first, so the questions do too. Pick the one that
          describes your situation, or start at the beginning.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((p) => {
            const t = TONE[p.tone];
            return (
              <Link
                key={p.title}
                href={p.href}
                className={`group flex flex-col rounded-xl border-2 bg-white p-5 transition-shadow hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)] ${t.border}`}
              >
                <span
                  className={`inline-flex w-fit rounded-md px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-[0.08em] ${t.chipBg} ${t.chipText}`}
                >
                  {p.chip}
                </span>
                <h3 className="display-md mt-3.5 font-serif font-bold text-indigo-ink">
                  {p.title}
                </h3>
                <p className="body-fluid mt-2 flex-1 leading-relaxed text-ink-soft">
                  {p.body}
                </p>
                <span
                  className={`mt-4 text-[0.9375rem] font-bold group-hover:underline ${t.link}`}
                >
                  {p.cta} &rarr;
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
    <section className="shell py-14 sm:py-16">
      <h2 className="display-lg max-w-[24ch] font-serif font-bold text-indigo-ink">
        The rule changed recently. Most of the internet has not caught up.
      </h2>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-rule bg-blush p-6">
          <p className="text-step font-bold uppercase tracking-[0.1em] text-maroon">
            What a search usually tells you
          </p>
          <p className="body-fluid mt-3 text-ink">
            That money in a dead person&apos;s bank account is claimable only
            through a{" "}
            <strong className="font-semibold">succession certificate</strong> —
            a civil court proceeding.
          </p>
          <ul className="body-fluid mt-4 space-y-2 text-ink-soft">
            <li>A petition before a District Judge</li>
            <li>Notice to every heir, and a newspaper advertisement</li>
            <li>Roughly ₹17,000, and four to seven months</li>
          </ul>
        </div>

        <div className="rounded-xl border-2 border-indigo bg-white p-6">
          <p className="text-step font-bold uppercase tracking-[0.1em] text-indigo">
            What the Directions actually say
          </p>
          <p className="body-fluid mt-3 text-ink">
            Where a nominee or surviving joint holder is on record, a bank{" "}
            <strong className="font-semibold">
              must not insist on one at all
            </strong>{" "}
            — whatever the amount.
          </p>
          <ul className="body-fluid mt-4 space-y-2 text-ink-soft">
            <li>No succession certificate, probate or administration</li>
            <li>No indemnity bond, and no third-party surety</li>
            <li>
              With no nominee, a simplified procedure applies below a threshold
            </li>
          </ul>
        </div>
      </div>

      <p className="body-fluid mt-7 max-w-[70ch] text-ink-soft">
        The Reserve Bank has issued this instruction three times — in 2005, in
        January 2013, and again in September 2025. A rule that has to be
        reissued three times in twenty years is one that is not reaching the
        counter.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SecondDoors() {
  return (
    <section className="border-t border-rule-faint bg-mist-deep">
      <div className="shell grid gap-5 py-12 lg:grid-cols-2">
        <div className="rounded-xl border border-rule bg-white p-6">
          <h3 className="display-md font-serif font-bold text-indigo-ink">
            Already started court proceedings?
          </h3>
          <p className="body-fluid mt-2 text-ink-soft">
            These Directions took effect after many cases began. We will not
            tell you what to do about a case that is already running — but we
            can show you what changed, so you can put it to your lawyer.
          </p>
          <Link
            href="/already-in-court"
            className="mt-3 inline-block font-bold text-link"
          >
            What changed on 31 March 2026 &rarr;
          </Link>
        </div>

        <div className="rounded-xl border border-rule bg-white p-6">
          <h3 className="display-md font-serif font-bold text-indigo-ink">
            What Adhikaar does not cover
          </h3>
          <p className="body-fluid mt-2 text-ink-soft">
            Bank deposits, lockers and safe custody only. Insurance, mutual
            funds, shares, provident fund, pension and post office savings each
            run on their own rails.
          </p>
          <Link href="/other-assets" className="mt-3 inline-block font-bold text-link">
            Where those are claimed &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.8 8.2l2.1 2.1 4.3-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M8 1.5l5 2v4.2c0 3-2.1 5.5-5 6.8-2.9-1.3-5-3.8-5-6.8V3.5l5-2z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
