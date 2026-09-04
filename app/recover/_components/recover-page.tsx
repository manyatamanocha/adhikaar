"use client";

import { useState } from "react";
import Link from "next/link";
import { RecoverNav } from "./nav";
import { Reveal } from "./reveal";
import { LeafMark } from "./brand";
import {
  ArrowRightIcon,
  PlayIcon,
  BankIcon,
  UmbrellaIcon,
  PfIcon,
  SharesIcon,
  DividendIcon,
  OtherIcon,
  ShieldIcon,
  SearchIcon,
  CheckIcon,
  BookIcon,
  LockIcon,
  HouseIcon,
} from "./icons";

/**
 * The homepage ("/") -- rebuilt again 5 Sep 2026 against a user-supplied
 * reference image (a warm cream / terracotta-orange / navy concept, leaf
 * mark, hand-drawn margin notes). Full section list confirmed one at a
 * time before building -- see the per-section notes below for what was
 * kept, dropped, or changed from the reference and why.
 *
 * Two things the reference itself has that are NOT reproduced anywhere on
 * this page, on standing product rules re-confirmed directly when this
 * reference came back a second time:
 *   - The tricolour flag icon ("Made for Indian families") and the
 *     circular RBI-seal-style badge next to the UDGAM mention. No state
 *     emblem, no ministry mark, no tricolour, ever.
 *   - The live search form (name / PAN / bank fields) and its
 *     "3 possible assets found" results card. Adhikaar has no backend to
 *     search anything; this exact interaction was removed once already
 *     for being dishonest about that. The hero's action stays a plain
 *     button into the real wizard, and the "found it" illustration later
 *     on the page is explicitly labelled an example, never live data.
 */
export function RecoverPage() {
  return (
    <div className="bg-[#FAF5EC] text-[#16233F] antialiased selection:bg-[#E2653B]/20 selection:text-[#16233F]">
      <NoticeBar />
      <RecoverNav />
      <Hero />
      <StatsOverlap />
      <Timeline />
      <HowItWorks />
      <ClaimTracker />
      <UdgamBand />
      <FindGrid />
      <TrustRow />
      <Faq />
      <FinalCta />
      <RecoverFooter />
    </div>
  );
}

/* ------------------------------------------------------------ NOTICE BAR */

function NoticeBar() {
  return (
    <div className="bg-[#16233F] px-4 py-2 text-center text-[0.8125rem] text-[#D8DEEA]">
      Adhikaar is an independent guidance tool, not a government service.{" "}
      <strong className="font-semibold text-[#F0B892]">
        Verify any claim directly with your bank or the RBI&apos;s UDGAM portal.
      </strong>
    </div>
  );
}

/* ------------------------------------------------------------------ HERO */

function Hero() {
  return (
    <section className="bg-[#FAF5EC] pb-20 pt-14 sm:pt-16">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#E2653B]">
            For families. For what matters.
          </p>
          <h1 className="mx-auto mt-3 whitespace-normal font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.01em] lg:mx-0 lg:whitespace-nowrap">
            Money left behind shouldn&apos;t stay lost.
          </h1>
          <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.5] text-[#5B5344]">
            Adhikaar helps families find and claim financial assets left
            behind by a loved one — with one simple, guided process.
          </p>

          <Reveal delay={80} className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/start"
              className="inline-flex items-center gap-2.5 rounded bg-[#E2653B] px-8 py-4 text-[1.0625rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
            >
              Start a Search
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 text-[1rem] font-bold text-[#16233F] transition-colors hover:text-[#E2653B]"
            >
              <PlayIcon className="h-7 w-7" />
              See how it works
            </a>
          </Reveal>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-[#6B6255]">
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-[#E2653B]">₹</span> Free to search
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LockIcon className="h-3.5 w-3.5" /> Secure
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon className="h-3.5 w-3.5" /> Step-by-step guidance
            </span>
          </div>
        </div>

        {/* Static illustration -- NOT a live search. Real categories, no
            fabricated match status; the old name/PAN form and its "3
            possible assets found" card are deliberately not reproduced. */}
        <Reveal delay={120}>
          <div className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(22,35,63,0.12)]">
            <p className="text-[0.9375rem] font-bold text-[#16233F]">
              What Adhikaar helps you check
            </p>
            <p className="mt-1 text-[0.8125rem] text-[#6B6255]">
              A guided walkthrough for each asset type below.
            </p>
            <div className="mt-5 space-y-3">
              {[
                { icon: BankIcon, label: "Bank Deposit", sub: "Savings, current, FD" },
                { icon: ShieldIcon, label: "Insurance Policy", sub: "Life, general" },
                { icon: PfIcon, label: "Provident Fund", sub: "EPF, PPF balances" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 rounded-lg border border-[#EFE7D8] p-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FBE4D8] text-[#E2653B]">
                    <row.icon className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-bold text-[#16233F]">
                      {row.label}
                    </span>
                    <span className="block text-[0.8125rem] text-[#6B6255]">{row.sub}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ STATS BAR */

function StatsOverlap() {
  const STATS = [
    { num: "4", label: "banks compared at launch — SBI, PNB, HDFC, ICICI" },
    { num: "15 days", label: "the RBI's own deadline to settle a claim once filed" },
    { num: "₹0", label: "cost to use Adhikaar — no login, nothing stored" },
  ];
  return (
    <div className="relative mx-auto -mt-6 max-w-[1440px] px-5 sm:px-8">
      <Reveal className="grid grid-cols-1 divide-y divide-[#EFE7D8] rounded-xl bg-white shadow-[0_8px_24px_rgba(22,35,63,0.1)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="p-6 sm:p-7">
            <p className="font-serif text-[1.75rem] font-bold text-[#16233F]">{s.num}</p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-[#6B6255]">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------- TIMELINE */

const ASSET_NODES = [
  { icon: BankIcon, label: "Banks", bg: "#E6EEFA", fg: "#3B5EA8" },
  { icon: UmbrellaIcon, label: "Insurance", bg: "#FBE4D8", fg: "#E2653B" },
  { icon: PfIcon, label: "Provident Fund", bg: "#E1F0E6", fg: "#3F7A5D" },
  { icon: SharesIcon, label: "Investments", bg: "#F1E9FB", fg: "#7147C4" },
  { icon: DividendIcon, label: "Dividends", bg: "#FCEFCF", fg: "#B8860B" },
  { icon: OtherIcon, label: "Other assets", bg: "#EDEAE3", fg: "#6B6255" },
] as const;

function Timeline() {
  return (
    <section className="bg-[#E9EFF9] py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            One search. Multiple places.
          </h2>
          <p className="mt-2 text-[0.9688rem] text-[#5B6478]">
            Adhikaar brings the journey together — across more than just banks.
          </p>
        </Reveal>

        <Reveal
          delay={80}
          className="relative mt-12 grid grid-cols-3 gap-y-10 sm:grid-cols-6"
        >
          <div
            aria-hidden="true"
            className="absolute left-[8%] right-[8%] top-6 hidden border-t border-dashed border-[#B9C4DC] sm:block"
          />
          {ASSET_NODES.map((n) => (
            <div key={n.label} className="relative flex flex-col items-center gap-2.5 text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: n.bg, color: n.fg }}
              >
                <n.icon className="h-5 w-5" />
              </span>
              <span className="text-[0.8125rem] font-bold text-[#16233F]">{n.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ HOW IT WORKS */

const STEPS = [
  {
    n: "01",
    icon: BookIcon,
    bg: "#FBE4D8",
    fg: "#E2653B",
    title: "Tell us about your loved one",
    body: "Enter a few basic details to begin.",
  },
  {
    n: "02",
    icon: SearchIcon,
    bg: "#E1F0E6",
    fg: "#3F7A5D",
    title: "See where money may be waiting",
    body: "We help you understand which institutions may hold unclaimed assets.",
  },
  {
    n: "03",
    icon: CheckIcon,
    bg: "#E6EEFA",
    fg: "#3B5EA8",
    title: "Follow the claim",
    body: "Get the documents, steps and status in one place.",
  },
] as const;

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 bg-[#FAF5EC] py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal className="max-w-[35rem]">
          <h2 className="font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            A complicated process, made simple.
          </h2>
          <p className="mt-2.5 text-[0.9688rem] text-[#6B6255]">
            Three simple steps to go from search to claim.
          </p>
          <a
            href="#find"
            className="mt-5 inline-flex items-center gap-2 rounded bg-[#FBE4D8] px-5 py-2.5 text-[0.9375rem] font-bold text-[#E2653B] transition-colors hover:bg-[#F6D4C0]"
          >
            See what you can find
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </Reveal>

        <Reveal delay={80} className="mt-11 grid gap-10 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center sm:text-left">
              <span
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:mx-0"
                style={{ background: s.bg, color: s.fg }}
              >
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-serif text-[1.1875rem] font-bold text-[#16233F]">
                {s.title}
              </p>
              <p className="mt-2 text-[0.9063rem] leading-relaxed text-[#6B6255]">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ CLAIM TRACKER */

/* An illustration, not live data -- clearly labelled "Example" on the card
   itself so it reads the same honest way the FAQ already does ("Adhikaar
   has no backend to search or confirm anything"). The button goes to the
   real wizard rather than promising a "demo" that doesn't exist. */
function ClaimTracker() {
  const CHECKLIST = [
    { label: "Identity details", done: true },
    { label: "Death certificate", done: true },
    { label: "Proof of relationship", done: false },
    { label: "Claim form", done: false },
    { label: "Submit to institution", done: false },
  ];
  const doneCount = CHECKLIST.filter((c) => c.done).length;

  return (
    <section className="bg-[#FAF5EC] py-16">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#E2653B]">
            Not just find it.
          </p>
          <h2 className="mt-2 font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            Help you claim it.
          </h2>
          <p className="mt-3 max-w-[46ch] text-[0.9688rem] leading-relaxed text-[#6B6255]">
            Once a possible asset is found, Adhikaar guides you through
            every next step.
          </p>
          <Link
            href="/start"
            className="mt-5 inline-flex items-center gap-2.5 rounded bg-[#16233F] px-6 py-3 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#243257]"
          >
            Start a Search
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <Reveal delay={100} className="relative">
          <div className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(22,35,63,0.12)]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6EEFA] text-[#3B5EA8]">
                  <BankIcon className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[0.9375rem] font-bold text-[#16233F]">
                    Bank deposit claim
                  </span>
                  <span className="block text-[0.8125rem] text-[#6B6255]">
                    Illustrative example
                  </span>
                </span>
              </div>
              <span className="shrink-0 rounded-full bg-[#EFE7D8] px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-[#6B6255]">
                Example
              </span>
            </div>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#EFE7D8]">
              <div
                className="h-full rounded-full bg-[#3B5EA8]"
                style={{ width: `${(doneCount / CHECKLIST.length) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-[0.75rem] text-[#6B6255]">
              {doneCount} of {CHECKLIST.length} completed
            </p>

            <div className="mt-4 divide-y divide-[#EFE7D8]">
              {CHECKLIST.map((c) => (
                <div key={c.label} className="flex items-center justify-between py-2.5">
                  <span className="flex items-center gap-2.5 text-[0.9063rem] text-[#16233F]">
                    <CheckIcon
                      className={`h-4 w-4 ${c.done ? "text-[#3F7A5D]" : "text-[#D8CFBB]"}`}
                    />
                    {c.label}
                  </span>
                  <span
                    className={`text-[0.75rem] font-bold uppercase tracking-[0.04em] ${
                      c.done ? "text-[#3F7A5D]" : "text-[#B8AE96]"
                    }`}
                  >
                    {c.done ? "Completed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <HouseIcon className="pointer-events-none absolute -bottom-8 -right-4 hidden h-16 w-16 text-[#3F7A5D]/25 sm:block" />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ UDGAM BAND */

const UDGAM_STEPS = [
  { icon: SearchIcon, label: "Search", sub: "UDGAM" },
  { icon: BookIcon, label: "Understand", sub: "Adhikaar" },
  { icon: CheckIcon, label: "Claim", sub: "Adhikaar" },
] as const;

function UdgamBand() {
  return (
    <section id="sources" className="scroll-mt-16 bg-[#F1E7D6] py-14">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
              Already heard of UDGAM?
            </p>
            <p className="mt-2 max-w-[52ch] text-[0.9688rem] leading-relaxed text-[#5B5344]">
              UDGAM is the RBI&apos;s own portal for searching unclaimed bank
              deposits. Adhikaar helps you understand what to do next — and
              guides you across more than just bank deposits.
            </p>
            <a
              href="https://udgam.rbi.org.in"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-[0.9375rem] font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
            >
              Learn about UDGAM →
            </a>
          </div>

          <div className="flex items-center justify-between gap-2 sm:justify-center sm:gap-8">
            {UDGAM_STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 sm:gap-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#16233F] text-[#16233F]">
                    <s.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-[0.8125rem] font-bold text-[#16233F]">
                    {s.label}
                    <span className="block text-[0.6875rem] font-normal text-[#6B6255]">
                      {s.sub}
                    </span>
                  </span>
                </div>
                {i < UDGAM_STEPS.length - 1 && (
                  <span aria-hidden="true" className="h-px w-6 bg-[#C9BFA6] sm:w-10" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ FIND GRID */

const FIND_ITEMS = [
  { icon: BankIcon, label: "Bank deposits" },
  { icon: BankIcon, label: "Fixed deposits" },
  { icon: ShieldIcon, label: "Insurance" },
  { icon: PfIcon, label: "Provident fund" },
  { icon: SharesIcon, label: "Shares & investments" },
  { icon: DividendIcon, label: "Dividends" },
  { icon: OtherIcon, label: "Other eligible assets" },
] as const;

function FindGrid() {
  return (
    <section id="find" className="scroll-mt-16 bg-[#FAF5EC] py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            What can Adhikaar help find?
          </h2>
        </Reveal>

        <Reveal
          delay={80}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-7"
        >
          {FIND_ITEMS.map((it) => (
            <div key={it.label} className="flex flex-col items-center gap-2.5 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FBE4D8] text-[#E2653B]">
                <it.icon className="h-5 w-5" />
              </span>
              <span className="text-[0.8125rem] font-bold text-[#16233F]">{it.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ TRUST ROW */

const TRUST_ITEMS = [
  { icon: LockIcon, label: "Your information stays private" },
  { icon: BookIcon, label: "We explain every step in plain language" },
  { icon: CheckIcon, label: "No confusing jargon" },
  { icon: ShieldIcon, label: "You stay in control" },
] as const;

function TrustRow() {
  return (
    <section className="bg-[#F1E7D6] py-14">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="font-serif text-[1.5rem] font-bold tracking-[-0.01em] text-[#16233F]">
              Designed around trust
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {TRUST_ITEMS.map((it) => (
                <div key={it.label} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#16233F]">
                    <it.icon className="h-4 w-4" />
                  </span>
                  <span className="text-[0.9063rem] leading-snug text-[#16233F]">{it.label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[0.875rem] leading-relaxed text-[#6B6255] lg:pt-1">
            Adhikaar does not hold or transfer your money. Claims are
            ultimately processed by the relevant bank, insurer or fund.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */

const FAQS = [
  {
    q: "What kinds of assets does this cover?",
    a: "Bank deposits and fixed deposits, insurance policies, provident fund, shares and dividends — and a general path for anything else that doesn't fit those.",
  },
  {
    q: "Will Adhikaar ever tell me it found a match?",
    a: "No. Adhikaar has no backend or database of accounts — it cannot search or confirm anything. What it gives you is a checklist of where to look and, once something is found, exactly what the institution will ask for.",
  },
  {
    q: "What happens after I find something?",
    a: "Adhikaar walks you through the documents and steps that institution will ask for, one at a time, so nothing arrives as a surprise at the counter.",
  },
  {
    q: "Is my information safe?",
    a: "Nothing you enter is stored or shared for marketing. There's no account, no login, and no data reaches a server beyond what a page needs to render.",
  },
] as const;

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="scroll-mt-16 bg-[#FAF5EC] py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal className="max-w-[35rem]">
          <p className="text-[0.875rem] text-[#6B6255]">Questions</p>
          <h2 className="mt-1.5 font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            Before you start
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-9 max-w-[45rem]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-[#EFE7D8]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-4 text-left text-[1rem] font-bold text-[#16233F]"
                >
                  {f.q}
                  <span
                    aria-hidden="true"
                    className={`shrink-0 font-serif text-[1.25rem] text-[#16233F] transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden text-[0.9375rem] leading-relaxed text-[#6B6255] transition-[grid-template-rows] duration-200 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}
                >
                  <p className="min-h-0 max-w-[58ch]">{f.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- FINAL CTA */

function FinalCta() {
  return (
    <section className="bg-[#FAF5EC] py-16 text-center">
      <Reveal className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <p className="font-serif text-[1.625rem] font-bold text-[#16233F]">
          Something may still be waiting for your family.
        </p>
        <p className="mt-1.5 text-[0.9688rem] text-[#6B6255]">
          Start with a simple search. We&apos;ll help you understand what comes next.
        </p>
        <Link
          href="/start"
          className="mt-6 inline-flex items-center gap-2.5 rounded bg-[#E2653B] px-8 py-4 text-[1.0625rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
        >
          Start a Search
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-[0.8125rem] text-[#6B6255]">
          It&apos;s free, secure and takes just a few minutes.
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ FOOTER */

function RecoverFooter() {
  return (
    <footer className="border-t border-[#EFE7D8] bg-white py-10 text-[0.8125rem] text-[#6B6255]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-8 pb-6">
          <Link href="/" className="flex items-center gap-2.5">
            <LeafMark className="h-7 w-7" />
            <span className="leading-tight">
              <span className="block font-serif text-[1.0625rem] font-bold text-[#16233F]">
                Adhikaar
              </span>
              <span className="block text-[0.6875rem] text-[#6B6255]">
                What&apos;s yours should find its way home.
              </span>
            </span>
          </Link>
          <div className="flex flex-wrap gap-6 text-[0.875rem]">
            <Link href="/guide" className="hover:text-[#16233F]">About</Link>
            <a href="#" className="hover:text-[#16233F]">Privacy</a>
            <a href="#" className="hover:text-[#16233F]">Terms</a>
            <a href="#" className="hover:text-[#16233F]">Help</a>
            <a href="#faq" className="hover:text-[#16233F]">FAQs</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EFE7D8] pt-5">
          <p>Made for Indian families</p>
          <p className="max-w-[60ch]">
            Adhikaar is an independent guidance tool. It does not represent
            any bank, insurer, government agency or other financial
            institution unless explicitly stated. Nothing here is legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
