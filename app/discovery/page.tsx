/**
 * /discovery — the repositioning test.
 *
 * A SECOND landing page, built alongside the live one, not replacing it. The
 * advisor's brief repositions Adhikaar from "you probably do not need a
 * succession certificate" to "where is my deceased family member's unclaimed
 * money, and what do I do?" — and their own next step is the right one: build
 * the first three sections only, show five people, and ask "what do you think
 * this website does?" If they independently say roughly the same thing, the
 * hero passes.
 *
 * So this is exactly three sections. Navbar + hero, UDGAM, and where money may
 * exist. Nothing below that, deliberately: the rest of the brief describes a
 * product that does not exist yet, and mocking it would make the test measure
 * a promise instead of a position.
 *
 * ─── What this page may NOT claim, and does not ───
 *
 * Adhikaar runs no search. It has no backend, no data source, no index of
 * anyone's accounts. The brief is careful about this and so is this page: it
 * says where to look and what to prepare, and it sends people to the
 * institution's own portal. "Adhikaar does not replace UDGAM" is in the brief
 * and is on the page in those words.
 *
 * One card in the brief was reworded. "Your search stays organised — know what
 * you've checked and what's next" describes a tracker that would need storage,
 * and this product stores nothing. It now claims what is true: that the places
 * worth checking are organised into one list.
 *
 * "Start a family asset search" is kept as the brief wrote it, even though
 * "search" could be read as Adhikaar doing the searching. That ambiguity is
 * precisely what five people looking at this page will reveal, and pre-fixing
 * it would defeat the test.
 */

import Link from "next/link";
import { BannerCarousel } from "../_components/banner-carousel";

export const metadata = {
  title: "Adhikaar — find unclaimed money left behind by a loved one",
  description:
    "Bank accounts, investments and other financial assets can be hard for families to trace after a death. Adhikaar helps you understand where to look, what to check and what to do next.",
};

const UDGAM_URL = "https://udgam.rbi.org.in/";

export default function DiscoveryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-mist">
        <BannerCarousel />
        <Hero />
        <Udgam />
        <WhereMoneyMayBe />
        <TestNote />
      </main>
    </>
  );
}

/* ------------------------------------------------------------------ 1 */

function Navbar() {
  return (
    <header className="border-b border-rule-faint bg-paper">
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-3.5">
        <Link href="/discovery" className="-my-1.5 py-1.5">
          <span className="block font-serif text-[1.375rem] font-bold leading-none text-indigo">
            Adhikaar
          </span>
          <span className="mt-1 block text-[0.8125rem] text-ink-soft">
            Know what may be rightfully yours.
          </span>
        </Link>

        <nav
          aria-label="Sections"
          className="order-3 flex flex-wrap items-center gap-x-6 gap-y-2 lg:order-none"
        >
          {["How it works", "Where to look", "UDGAM", "Resources"].map((l) => (
            <span
              key={l}
              className="text-[0.9375rem] font-semibold text-ink-soft"
            >
              {l}
            </span>
          ))}
        </nav>

        <Link
          href="/start"
          className="rounded-xl bg-indigo px-5 py-2.5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-indigo-lift"
        >
          Start your search &rarr;
        </Link>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ 2 */

function Hero() {
  return (
    <section className="border-b border-rule-faint bg-mist">
      <div className="shell grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <h2 className="display-lg font-serif font-bold tracking-[-0.015em] text-indigo-ink">
            Start with whatever you know.
          </h2>
          <p className="lede-fluid mt-4 max-w-[52ch] text-ink-soft">
            You don&apos;t need every document, or every account number. Adhikaar
            helps you understand where to look, what to check, and what to do
            next.
          </p>

          <ul className="mt-7 flex flex-col gap-2.5">
            {[
              { icon: <LockIcon />, label: "Never share your banking OTP or password" },
              { icon: <BookIcon />, label: "Plain-language guidance" },
              { icon: <PillarIcon />, label: "Guided towards official sources" },
            ].map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-2.5 text-[0.9375rem] text-ink"
              >
                <span className="shrink-0 text-indigo" aria-hidden="true">
                  {t.icon}
                </span>
                {t.label}
              </li>
            ))}
          </ul>
        </div>

        {/* The brief puts an illustration here. There is no image generation in
            this session, so the three cards it floats over that illustration
            carry the panel on their own. */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-rule bg-paper p-6">
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
              Possible places to check
            </p>
            <p className="display-md mt-2 font-serif font-bold text-indigo-ink">
              Bank deposits · Investments · Insurance
            </p>
          </div>

          <div className="rounded-2xl border border-rule bg-paper p-6">
            <p className="display-md font-serif font-bold text-indigo-ink">
              Not sure where to start?
            </p>
            <p className="mt-1.5 text-[0.9375rem] text-ink-soft">
              We&apos;ll guide you step by step.
            </p>
          </div>

          {/* Reworded from the brief: "your search stays organised — know what
              you've checked and what's next" is a tracker, and a tracker needs
              storage this product does not have. */}
          <div className="rounded-2xl border border-indigo/25 bg-indigo/8 p-6">
            <p className="display-md font-serif font-bold text-indigo-ink">
              One list, not ten searches
            </p>
            <p className="mt-1.5 text-[0.9375rem] text-ink-soft">
              The places worth checking, organised in the order worth doing
              them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3 */

function Udgam() {
  return (
    <section className="border-b border-rule-faint bg-paper">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              Looking for unclaimed bank deposits?
            </h2>
            <p className="lede-fluid mt-4 max-w-[48ch] text-ink">
              The RBI&apos;s <strong className="font-bold">UDGAM</strong> portal
              is the official place to search for certain unclaimed bank
              deposits.
            </p>

            {/* The most important sentence on the page. */}
            <p className="hardbox mt-5 body-fluid">
              <strong className="font-bold">
                Adhikaar does not replace UDGAM.
              </strong>{" "}
              It is the official portal, run by the Reserve Bank. We point you
              to it and help you use it.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/other-assets"
                className="rounded-xl bg-indigo px-6 py-3 text-[0.9375rem] font-bold text-white transition-colors hover:bg-indigo-lift"
              >
                Understand UDGAM &rarr;
              </Link>
              <a
                href={UDGAM_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border-2 border-indigo px-6 py-3 text-[0.9375rem] font-bold text-indigo transition-colors hover:bg-indigo/8"
              >
                Visit the official UDGAM portal ↗
              </a>
            </div>

            <p className="mt-5 max-w-[56ch] text-[0.875rem] italic leading-relaxed text-ink-soft">
              Adhikaar is an independent guidance platform and is not affiliated
              with or endorsed by the Reserve Bank of India.
            </p>
          </div>

          <div className="rounded-2xl border border-rule bg-mist p-6 sm:p-8">
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
              What we help you understand
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {[
                "When UDGAM may be useful, and when it will not have your answer",
                "What information to prepare before you search",
                "Where else money may exist, beyond bank deposits",
                "What to do after finding a possible match",
              ].map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 text-indigo"
                    aria-hidden="true"
                  >
                    <TickIcon />
                  </span>
                  <span className="body-fluid text-ink">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4 */

const PLACES = [
  {
    icon: <BankIcon />,
    title: "Bank deposits",
    body: "Savings accounts, fixed deposits and dormant balances.",
  },
  {
    icon: <UmbrellaIcon />,
    title: "Insurance",
    body: "Policies and benefits that may require follow-up.",
  },
  {
    icon: <ChartIcon />,
    title: "Mutual funds",
    body: "Investments held across different fund houses.",
  },
  {
    icon: <CertificateIcon />,
    title: "Shares",
    body: "Demat holdings and other securities.",
  },
  {
    icon: <PillarIcon />,
    title: "EPF & pension",
    body: "Employment-linked savings and benefits.",
  },
  {
    icon: <BoxIcon />,
    title: "Other assets",
    body: "Places you may not know you need to check.",
  },
] as const;

function WhereMoneyMayBe() {
  return (
    <section className="border-b border-rule-faint bg-mist">
      <div className="shell py-14 sm:py-16">
        <h2 className="display-lg max-w-[24ch] font-serif font-bold text-indigo-ink">
          A bank account may only be one part of the story.
        </h2>
        <p className="body-fluid mt-3 max-w-[56ch] text-ink-soft">
          A family&apos;s financial assets can be spread across different
          institutions, each with its own process.
        </p>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLACES.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-rule-faint bg-paper p-5 sm:p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo/10 text-indigo"
              >
                {p.icon}
              </span>
              <p className="display-md mt-4 font-serif font-bold text-indigo-ink">
                {p.title}
              </p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        <Link
          href="/other-assets"
          className="mt-9 inline-flex items-center gap-3 rounded-xl bg-indigo px-7 py-3.5 text-[1rem] font-bold text-white transition-colors hover:bg-indigo-lift"
        >
          See where I should look
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Visible on the page, because a tester should know what they are looking at. */
function TestNote() {
  return (
    <section className="bg-paper">
      <div className="shell py-10">
        <p className="mx-auto max-w-[62ch] border-t border-rule pt-6 text-center text-[0.875rem] leading-relaxed text-ink-soft">
          This is a draft of a possible new direction for Adhikaar, built to be
          shown to a handful of people and nothing more. The page ends here on
          purpose.{" "}
          <Link href="/" className="font-bold text-link underline underline-offset-2">
            The live Adhikaar is here
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn marks. One stroke weight, 24px grid. No coins, no rupee confetti. */

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4.5h6a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h6v14h-6a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 5.5v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PillarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 9.5h17L12 4 3.5 9.5zM5 20h14M6.5 12v6M11 12v6M15.5 12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function BankIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 9.5h17L12 4 3.5 9.5zM5 20h14M6.5 12v6M11 12v6M15.5 12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UmbrellaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5c4.7 0 8.5 3.8 8.5 8.5H3.5c0-4.7 3.8-8.5 8.5-8.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 12v6.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19.5h16M6.5 19.5v-6M11 19.5V8M15.5 19.5v-4M20 19.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 8.5h9M7.5 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 16.5v4l2.5-1.5L14 20.5v-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
