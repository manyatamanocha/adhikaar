"use client";

import { useState } from "react";
import Link from "next/link";
import { RecoverNav } from "./nav";
import { Reveal } from "./reveal";
import { ArrowRightIcon } from "./icons";

/**
 * The homepage ("/", formerly /recover).
 *
 * Rebuilt 4 Sep 2026 late evening directly against a reference file the user
 * supplied (unclaimed-money-finder.html) after several rounds of guessing at
 * a look failed. Previous builds matched its colours but kept this project's
 * own, much longer and more decorated section list -- told directly "are
 * completely different" -- so this pass matches the reference's actual
 * SHAPE: a lean run of eight sections, a stats card overlapping the hero,
 * a plain top-rule 3-step list with no icon circles, a dark "sources" band,
 * and an FAQ accordion, rather than the bento grids, illustrated scenes and
 * margin notes the last few passes kept adding.
 *
 * Content that had its own section before (what can be recovered, the
 * guided-claim differentiator, the four trust facts) is real and stays --
 * folded into the FAQ, which is exactly where the reference itself put the
 * equivalent facts ("Before you search"), rather than kept as separate
 * sections the reference has no counterpart for.
 *
 * ─── No search bar ───
 *
 * The hero originally had a name-entry field that played a canned
 * animation into a fixed checklist -- honestly labelled "not a live
 * search" underneath, but still a search-shaped interaction for a product
 * that has no backend, no data source, and no API into any bank, insurer
 * or UDGAM to search against. Told directly to remove it, so the hero's
 * only action now is a plain button straight into the real wizard.
 *
 * ─── Every stat below is real, not a placeholder ───
 *
 * The reference's stat card shows aggregate figures (a real NAUPA number).
 * Adhikaar has no equivalent verified Indian aggregate to cite, so the
 * three stats here are true, checkable facts already used elsewhere on this
 * site instead: the bank count at launch (PRODUCT.md), the RBI's own
 * settlement deadline (para 31), and that the tool is free with no login.
 */
export function RecoverPage() {
  return (
    <div className="bg-[#F6F4FB] text-[#2B2361] antialiased [selection:bg-[#D9A441]/25 selection:text-[#2B2361]]">
      <NoticeBar />
      <RecoverNav />
      <Hero />
      <StatsOverlap />
      <HowItWorks />
      <SourcesBand />
      <Faq />
      <FinalCta />
      <RecoverFooter />
    </div>
  );
}

/* ------------------------------------------------------------ NOTICE BAR */

function NoticeBar() {
  return (
    <div className="bg-[#1B1740] px-4 py-2 text-center text-[0.8125rem] text-[#D9CFF0]">
      Adhikaar is an independent guidance tool, not a government service.{" "}
      <strong className="font-semibold text-[#EFCC85]">
        Verify any claim directly with your bank or the RBI&apos;s UDGAM portal.
      </strong>
    </div>
  );
}

/* ------------------------------------------------------------------ HERO */

function Hero() {
  return (
    <section className="bg-[#2B2361] pb-16 pt-12 text-white sm:pb-16 sm:pt-14">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <div className="max-w-[42rem]">
          <h1 className="font-serif text-[clamp(2rem,4.6vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.01em]">
            Money left behind shouldn&apos;t stay lost.
          </h1>
          <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.5] text-[#C7BEE8]">
            Adhikaar helps families find and claim financial assets left
            behind by a loved one — with one simple, guided process.
          </p>

          <Reveal delay={80} className="mt-8">
            <Link
              href="/start"
              className="inline-flex items-center gap-2.5 rounded bg-[#D9A441] px-8 py-4 text-[1.0625rem] font-bold text-[#1B1740] transition-colors hover:bg-[#EFCC85]"
            >
              Start
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-[0.8125rem] text-[#9C93BE]">
              Free to use. No account needed.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ STATS BAR */

/* Overlaps the hero's bottom edge, per the reference: a white card pulled
   up over the dark section below it with a negative margin, so the page
   reads as one composed object at the fold rather than a hard section
   break. Three REAL facts (see the file header note), not filler numbers. */
function StatsOverlap() {
  const STATS = [
    { num: "4", label: "banks compared at launch — SBI, PNB, HDFC, ICICI" },
    { num: "15 days", label: "the RBI's own deadline to settle a claim once filed" },
    { num: "₹0", label: "cost to use Adhikaar — no login, nothing stored" },
  ];
  return (
    <div className="relative mx-auto -mt-10 max-w-[1080px] px-5 sm:px-8">
      <Reveal className="grid grid-cols-1 divide-y divide-[#DCD5EE] rounded-lg bg-white shadow-[0_8px_24px_rgba(27,23,64,0.14)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="p-6 sm:p-7">
            <p className="font-serif text-[1.75rem] font-bold text-[#2B2361]">
              {s.num}
            </p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-[#5A5470]">
              {s.label}
            </p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------ HOW IT WORKS */

const STEPS = [
  {
    n: "01",
    color: "#B84E1E",
    title: "Tell us about your loved one",
    body: "Enter a few basic details to begin.",
  },
  {
    n: "02",
    color: "#D9A441",
    title: "See where money may be waiting",
    body: "We help you understand which institutions may hold unclaimed assets.",
  },
  {
    n: "03",
    color: "#D9A441",
    title: "Follow the claim",
    body: "Get the documents, steps and status in one place.",
  },
] as const;

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 py-16">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <Reveal className="max-w-[35rem]">
          <p className="text-[0.875rem] text-[#5A5470]">How it works</p>
          <h2 className="mt-1.5 font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#2B2361]">
            Three steps to go from search to claim
          </h2>
          <p className="mt-2.5 text-[0.9688rem] text-[#5A5470]">
            Adhikaar covers bank deposits, insurance, provident fund, shares
            and dividends — here&apos;s the general path, whichever it is.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-11 grid gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="border-t-2 border-[#2B2361] pt-4">
              <p
                className="font-serif text-[0.9375rem] font-bold"
                style={{ color: s.color }}
              >
                {s.n}
              </p>
              <p className="mt-2 font-serif text-[1.1875rem] font-bold text-[#2B2361]">
                {s.title}
              </p>
              <p className="mt-2 text-[0.9063rem] leading-relaxed text-[#5A5470]">
                {s.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ SOURCES */

/* Replaces both the old "one search, multiple places" node diagram and the
   UDGAM callout -- the reference's honest equivalent is blunter and better:
   here is exactly where the real data lives, because Adhikaar doesn't hold
   any of it itself. */
const SOURCES = [
  { n: "RBI", l: "Issues the Directions this entire tool quotes and cites" },
  { n: "UDGAM", l: "The RBI's own portal for searching unclaimed bank deposits" },
  { n: "Your bank", l: "Must publish its deceased-claim policy since 31 Mar 2026" },
  { n: "IEPF", l: "Investor Education & Protection Fund — shares and dividends" },
] as const;

function SourcesBand() {
  return (
    <div id="sources" className="scroll-mt-16 bg-[#1B1740] py-14 text-white sm:py-16">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <Reveal className="max-w-[35rem]">
          <p className="text-[0.875rem] text-[#B7ADD9]">
            Where this data actually lives
          </p>
          <h2 className="mt-1.5 font-serif text-[1.875rem] font-bold tracking-[-0.01em]">
            Adhikaar doesn&apos;t hold any of it
          </h2>
          <p className="mt-2.5 text-[0.9688rem] text-[#B7ADD9]">
            A real search checks these directly — not a guess, and not
            Adhikaar&apos;s own database, because it doesn&apos;t have one.
          </p>
        </Reveal>

        <Reveal
          delay={80}
          className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-4"
        >
          {SOURCES.map((s) => (
            <div key={s.n} className="bg-[#1B1740] p-5">
              <p className="font-serif text-[1.375rem] text-[#EFCC85]">
                {s.n}
              </p>
              <p className="mt-1 text-[0.8125rem] text-[#B7ADD9]">{s.l}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ FAQ */

/* Everything the earlier draft gave its own section (what can be recovered,
   the guided-claim differentiator, the four trust facts) lives here now --
   the reference's own answer to "where do these supporting facts go" is an
   FAQ, not four more page sections. */
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
    <section id="faq" className="scroll-mt-16 py-16">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <Reveal className="max-w-[35rem]">
          <p className="text-[0.875rem] text-[#5A5470]">Questions</p>
          <h2 className="mt-1.5 font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#2B2361]">
            Before you start
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-9 max-w-[45rem]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-[#DCD5EE]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-4 text-left text-[1rem] font-bold text-[#2B2361]"
                >
                  {f.q}
                  <span
                    aria-hidden="true"
                    className={`shrink-0 font-serif text-[1.25rem] text-[#2B2361] transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden text-[0.9375rem] leading-relaxed text-[#5A5470] transition-[grid-template-rows] duration-200 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}
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
    <section className="bg-[#EBE6F5] py-14 text-center">
      <Reveal className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <p className="font-serif text-[1.625rem] font-bold text-[#2B2361]">
          Two minutes could turn up real money.
        </p>
        <p className="mt-1.5 text-[0.9688rem] text-[#5A5470]">
          It costs nothing to look.
        </p>
        <Link
          href="/start"
          className="mt-5 inline-flex items-center gap-2.5 rounded bg-[#2B2361] px-7 py-3.5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#3D3178]"
        >
          Start
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ FOOTER */

function RecoverFooter() {
  return (
    <footer className="bg-[#1B1740] py-10 text-[0.8125rem] text-[#9C93BE]">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-white/10 pb-6">
          <p className="font-serif text-[1.125rem] font-bold text-[#D9CFF0]">
            Adhikaar
          </p>
          <div className="flex flex-wrap gap-14">
            <div>
              <p className="font-bold text-[#D9CFF0]">Product</p>
              <a href="#how" className="mt-2 block hover:text-white">
                How it works
              </a>
              <Link href="/guide" className="mt-2 block hover:text-white">
                The full RBI guide
              </Link>
            </div>
            <div>
              <p className="font-bold text-[#D9CFF0]">Learn</p>
              <a href="#faq" className="mt-2 block hover:text-white">
                FAQ
              </a>
            </div>
          </div>
        </div>
        <p className="mt-5 max-w-[70ch] leading-relaxed">
          <strong className="text-[#D9CFF0]">
            Adhikaar is an independent guidance tool.
          </strong>{" "}
          It does not represent any bank, insurer, government agency or
          other financial institution unless explicitly stated, and does
          not hold or transfer your money. Nothing here is legal advice.
        </p>
      </div>
    </footer>
  );
}
