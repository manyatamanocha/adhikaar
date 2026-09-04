"use client";

import Link from "next/link";
import { RecoverNav } from "./nav";
import { HeroDemo } from "./hero-demo";
import { Reveal } from "./reveal";
import {
  BankIcon,
  UmbrellaIcon,
  PfIcon,
  SharesIcon,
  DividendIcon,
  OtherIcon,
  SearchIcon,
  CheckIcon,
  CircleIcon,
  LockIcon,
  BookIcon,
  CompassIcon,
  ArrowRightIcon,
} from "./icons";

/**
 * The homepage ("/", formerly /recover) -- a from-scratch visual redesign of
 * the landing surface, built directly from a fully pinned brief (palette,
 * hero copy, section list and composition rules all specified), so the
 * concept-seed direction roll was skipped per its own rule: "never run the
 * script for a precisely specified request; shape those directly."
 *
 * Moved to "/" on 4 Sep 2026, replacing the succession-certificate page that
 * used to live there -- that content moved to /guide, not discarded. This
 * page is search-first framing; /guide is where a visitor ends up once
 * there's something specific to claim (para 9 / no succession certificate).
 *
 * ─── The one thing this page may not claim ───
 *
 * The brief's hero shows a live search returning "3 possible assets found --
 * Possible Match." Adhikaar has no backend, no data source, and no API into
 * any bank, insurer or UDGAM -- it cannot search or find a match. See
 * hero-demo.tsx for the full note; every reveal on this page is a CHECKLIST
 * of where to look, never a claimed result, and says so in the UI itself.
 */
export function RecoverPage() {
  return (
    <div className="bg-[#FBF8F2] text-[#5C1B28] antialiased [selection:bg-[#A87A1E]/25 selection:text-[#5C1B28]]">
      <RecoverNav />
      <Hero />
      <OneSearchManyPlaces />
      <HowItWorks />
      <UdgamNote />
      <WhatCanBeRecovered />
      <GuidedClaim />
      <Trust />
      <FinalCta />
      <RecoverFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ HERO */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Motif, first appearance: a single dashed thread drawn low across the
          hero, the path a family's money takes back to them. Reused, never
          decorative-only -- the same line reappears in the journey section
          and once more, quietly, above the footer. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 hidden h-[1px] w-[140%] -translate-y-1/2 lg:block"
      >
        <line x1="0" y1="0" x2="100%" y2="0" stroke="#E4DCC8" strokeWidth="2" strokeDasharray="1 10" strokeLinecap="round" />
      </svg>

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div>
          <h1 className="max-w-[15ch] font-serif text-[clamp(2.5rem,5.2vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#5C1B28]">
            Money left behind shouldn&apos;t stay lost.
          </h1>

          <p className="mt-6 max-w-[46ch] text-[clamp(1.1875rem,1.6vw,1.375rem)] leading-[1.5] text-[#5A4C4E]">
            Adhikaar helps families find and claim financial assets left
            behind by a loved one — with one simple, guided process.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/start"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#5C1B28] px-8 py-4 text-[1.0625rem] font-bold text-white transition-colors hover:bg-[#7A2838]"
            >
              Start a Search
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#5C1B28]/20 px-7 py-[0.9375rem] text-[1.0625rem] font-bold text-[#5C1B28] transition-colors hover:border-[#5C1B28]/40"
            >
              See how it works
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-semibold text-[#5A4C4E]">
            {["Free to search", "Secure", "Step-by-step guidance"].map((l) => (
              <li key={l} className="flex items-center gap-2">
                <CheckIcon className="h-[1.05rem] w-[1.05rem] text-[#3F7355]" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={120} className="flex justify-center lg:justify-end">
          <HeroDemo />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ ONE SEARCH */

const PLACES = [
  { icon: BankIcon, label: "Banks" },
  { icon: UmbrellaIcon, label: "Insurance" },
  { icon: PfIcon, label: "Provident fund" },
  { icon: SharesIcon, label: "Investments" },
  { icon: OtherIcon, label: "Other assets" },
] as const;

function OneSearchManyPlaces() {
  return (
    <section className="border-y border-[#E4DCC8] bg-white py-16 sm:py-20">
      <Reveal className="mx-auto max-w-[1240px] px-5 text-center sm:px-8">
        <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#5C1B28]">
          One search. Multiple places.
        </h2>

        {/* The thread motif, second appearance: nodes strung on one line.
            Two separate lines, not one div re-angled by breakpoint -- a
            single element switched from tall+narrow to short+wide while
            keeping one gradient direction draws correctly on exactly one of
            the two layouts and a solid sliver on the other, so mobile and
            desktop each get the div shaped for them. */}
        <div className="relative mx-auto mt-12 flex max-w-[52rem] flex-col items-center gap-8 sm:flex-row sm:justify-between sm:gap-4">
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 bottom-6 w-px sm:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #E4DCC8 0 6px, transparent 6px 14px)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px sm:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #E4DCC8 0 6px, transparent 6px 14px)",
            }}
          />
          {PLACES.map((p) => (
            <div key={p.label} className="relative z-10 flex items-center gap-3 sm:flex-col sm:gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#E4DCC8] bg-[#FBF8F2] text-[#5C1B28]">
                <p.icon className="h-5 w-5" />
              </span>
              <span className="text-[0.9375rem] font-bold text-[#5A4C4E]">
                {p.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-[42ch] font-serif text-[1.375rem] font-bold text-[#5C1B28]">
          Adhikaar brings the journey together.
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ HOW IT WORKS */

const STEPS = [
  {
    n: "01",
    title: "Tell us about your loved one",
    body: "Enter a few basic details to begin.",
  },
  {
    n: "02",
    title: "See where money may be waiting",
    body: "We help you understand which institutions may hold unclaimed assets.",
  },
  {
    n: "03",
    title: "Follow the claim",
    body: "Get the documents, steps and status in one place.",
  },
] as const;

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-[16ch] font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.15] text-[#5C1B28]">
            One connected journey, not a form.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-16 sm:grid-cols-3 sm:gap-8">
          {/* Motif, third appearance: the thread running through the steps.
              Vertical on mobile, horizontal from sm -- this was "hidden"
              below sm entirely in the first pass, which left the phone
              layout (the primary device, per the brief's own words) with
              three plain numbered items and no thread at all. */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 bottom-6 w-px sm:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #E4DCC8 0 6px, transparent 6px 14px)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute left-6 right-6 top-6 hidden h-px sm:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #E4DCC8 0 6px, transparent 6px 14px)",
            }}
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110} className="relative">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#5C1B28] font-serif text-[1.0625rem] font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-5 font-serif text-[1.375rem] font-bold text-[#5C1B28]">
                {s.title}
              </p>
              <p className="mt-2 max-w-[32ch] text-[0.9375rem] leading-relaxed text-[#5A4C4E]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ UDGAM */

function UdgamNote() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Reveal className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 rounded-[1.75rem] border border-[#E4DCC8] bg-[#FBF8F2] p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <p className="font-serif text-[1.5rem] font-bold text-[#5C1B28]">
              Already heard of UDGAM?
            </p>
            <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-[#5A4C4E]">
              UDGAM is the RBI&apos;s portal for searching unclaimed bank
              deposits. Adhikaar helps you understand what to do next — and
              guides you across more than just bank deposits.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.875rem] font-bold text-[#8C6317]">
              <span className="flex items-center gap-1.5">
                <SearchIcon className="h-4 w-4" /> Search
              </span>
              <ArrowRightIcon className="h-3.5 w-3.5 text-[#A39C8A]" />
              <span className="flex items-center gap-1.5">
                <CompassIcon className="h-4 w-4" /> Understand
              </span>
              <ArrowRightIcon className="h-3.5 w-3.5 text-[#A39C8A]" />
              <span className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4" /> Claim
              </span>
            </div>

            <a
              href="https://udgam.rbi.org.in/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-[#5C1B28] underline underline-offset-2"
            >
              Learn about UDGAM
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ RECOVERABLE */

function WhatCanBeRecovered() {
  return (
    <section id="recover" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold text-[#5C1B28]">
            What can be recovered
          </h2>
        </Reveal>

        {/* A bento, not seven equal cards: one wide lead tile, the rest sized
            by how self-explanatory each label already is. */}
        <Reveal delay={80}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="col-span-2 row-span-2 rounded-[1.5rem] bg-[#5C1B28] p-6 text-white sm:p-8">
              <BankIcon className="h-9 w-9 text-[#E0B563]" />
              <p className="mt-6 font-serif text-[1.5rem] font-bold sm:text-[1.75rem]">
                Bank deposits &amp; fixed deposits
              </p>
              <p className="mt-2 max-w-[34ch] text-[0.9375rem] text-white/75">
                Savings, current and dormant accounts across any bank.
              </p>
            </div>

            {[
              { icon: UmbrellaIcon, label: "Insurance" },
              { icon: PfIcon, label: "Provident fund" },
              { icon: SharesIcon, label: "Shares & investments" },
              { icon: DividendIcon, label: "Dividends" },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-[1.5rem] border border-[#E4DCC8] bg-white p-5 sm:p-6"
              >
                <c.icon className="h-7 w-7 text-[#5C1B28]" />
                <p className="mt-4 text-[0.9375rem] font-bold leading-snug text-[#5C1B28]">
                  {c.label}
                </p>
              </div>
            ))}

            <div className="col-span-2 rounded-[1.5rem] border border-dashed border-[#D6CBA8] bg-[#F3EEE3] p-5 sm:col-span-4 sm:flex sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-3">
                <OtherIcon className="h-7 w-7 shrink-0 text-[#8C6317]" />
                <p className="text-[0.9375rem] font-bold text-[#5C1B28]">
                  Other eligible financial assets — places your family may
                  not know to check.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ GUIDED CLAIM */

const CLAIM_STEPS = [
  { label: "Identity details", done: true },
  { label: "Death certificate", done: true },
  { label: "Proof of relationship", done: false },
  { label: "Claim form", done: false },
  { label: "Submit to institution", done: false },
] as const;

function GuidedClaim() {
  const done = CLAIM_STEPS.filter((s) => s.done).length;
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="max-w-[18ch] font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold leading-[1.15] text-[#5C1B28]">
            Not just a search. A guide through the claim.
          </h2>
          <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[#5A4C4E]">
            Once something is found worth pursuing, Adhikaar walks you
            through exactly what the institution will ask for — one step at
            a time, so nothing arrives as a surprise at the counter.
          </p>
          <Link
            href="/start"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#5C1B28] px-7 py-3.5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#7A2838]"
          >
            Continue a claim
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto w-full max-w-[24rem] overflow-hidden rounded-[1.5rem] border border-[#E4DCC8] bg-[#FBF8F2] shadow-[0_24px_50px_-20px_rgba(15,25,50,0.28)]">
            <div className="border-b border-[#E4DCC8] bg-white p-5">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[#8C6317]">
                Bank deposit — worth checking
              </p>
              <p className="mt-1 text-[1.0625rem] font-bold text-[#5C1B28]">
                Your next steps
              </p>
            </div>
            <div className="p-5">
              <ul className="space-y-2.5">
                {CLAIM_STEPS.map((s) => (
                  <li key={s.label} className="flex items-center gap-3">
                    {s.done ? (
                      <CheckIcon className="h-5 w-5 shrink-0 text-[#3F7355]" />
                    ) : (
                      <CircleIcon className="h-5 w-5 shrink-0 text-[#A39C8A]" />
                    )}
                    <span
                      className={`text-[0.9375rem] ${
                        s.done
                          ? "text-[#5A4C4E] line-through decoration-[#A39C8A]"
                          : "font-semibold text-[#5C1B28]"
                      }`}
                    >
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-[#E4DCC8] pt-4">
                <div className="flex items-center justify-between text-[0.8125rem] font-bold text-[#5A4C4E]">
                  <span>Progress</span>
                  <span>
                    {done} of {CLAIM_STEPS.length} completed
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E4DCC8]">
                  <div
                    className="h-full rounded-full bg-[#3F7355] transition-[width] duration-700"
                    style={{ width: `${(done / CLAIM_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ TRUST */

const TRUST = [
  {
    icon: LockIcon,
    title: "Your information stays private",
    body: "Nothing you enter is sold or shared for marketing.",
  },
  {
    icon: BookIcon,
    title: "We explain every step",
    body: "No confusing financial jargon — plain language throughout.",
  },
  {
    icon: CompassIcon,
    title: "You stay in control",
    body: "Adhikaar guides; you decide what to do at each step.",
  },
  {
    icon: CheckIcon,
    title: "No false promises",
    body: "A possible match is never presented as a confirmed one.",
  },
] as const;

function Trust() {
  return (
    <section id="trust" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-bold text-[#5C1B28]">
            Built to be trusted
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {TRUST.map((t) => (
              <li key={t.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5C1B28]/8 text-[#5C1B28]">
                  <t.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-[1.0625rem] text-[#5C1B28]">
                    {t.title}
                  </p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-[#5A4C4E]">
                    {t.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-10 max-w-[70ch] border-t border-[#E4DCC8] pt-6 text-[0.875rem] leading-relaxed text-[#6E6062]">
            Adhikaar does not hold or transfer your money. Claims are
            ultimately processed by the relevant bank, insurer, fund or
            institution.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- FINAL CTA */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#5C1B28] py-24 sm:py-28">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-[0.06]">
        <line x1="-10%" y1="30%" x2="110%" y2="60%" stroke="#E0B563" strokeWidth="1.4" strokeDasharray="1 12" strokeLinecap="round" />
      </svg>
      <Reveal className="relative mx-auto max-w-[1240px] px-5 text-center sm:px-8">
        <p className="mx-auto max-w-[24ch] font-serif text-[clamp(2rem,3.6vw,2.75rem)] font-bold leading-[1.15] text-white">
          Something may still be waiting for your family.
        </p>
        <p className="mx-auto mt-4 max-w-[42ch] text-[1.0625rem] text-white/75">
          Start with a simple search. We&apos;ll help you understand what
          comes next.
        </p>
        <Link
          href="/start"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[1.0625rem] font-bold text-[#5C1B28] transition-colors hover:bg-[#E0B563]"
        >
          Start a Search
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ FOOTER */

function RecoverFooter() {
  return (
    <footer className="bg-[#3D1119] py-12">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* Motif, final and quietest appearance. */}
        <div
          aria-hidden="true"
          className="mb-8 h-px w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #2A3555 0 6px, transparent 6px 14px)",
          }}
        />
        <p className="font-serif text-[1.25rem] font-bold text-white">
          Adhikaar
        </p>
        <p className="mt-3 max-w-[60ch] text-[0.875rem] leading-relaxed text-white/55">
          Adhikaar is an independent guidance platform. It does not represent
          any bank, insurer, government agency or other financial
          institution unless explicitly stated, and does not hold or
          transfer your money.
        </p>
        <Link
          href="/guide"
          className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-bold text-white/75 underline underline-offset-2 hover:text-white"
        >
          Read the RBI rules on bank deposit claims, paragraph by paragraph
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </footer>
  );
}
