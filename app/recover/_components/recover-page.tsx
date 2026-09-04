"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RecoverNav } from "./nav";
import { Reveal } from "./reveal";
import { LeafMark } from "./brand";
import { HomeI18nProvider, useHomeT } from "./home-i18n";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";
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
 *
 * Fully localised (English / Hindi / Kannada) 5 Sep 2026 -- own dictionary
 * in lib/i18n-home.ts, separate from the older /guide flow's Dict, since
 * none of this page's copy existed when that one was written. Same rule
 * as that file: Hindi and Kannada here have NOT been checked by a native
 * speaker yet.
 */
export function RecoverPage() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = HOME_T[locale];

  return (
    <HomeI18nProvider value={{ t, locale }}>
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
        <RecoverFooter />
      </div>
    </HomeI18nProvider>
  );
}

/* ------------------------------------------------------------ NOTICE BAR */

function NoticeBar() {
  const { t } = useHomeT();
  return (
    <div className="bg-[#16233F] px-4 py-3 text-center text-[1.625rem] text-[#D8DEEA]">
      {t.notice.pre}{" "}
      <strong className="font-semibold text-[#F0B892]">{t.notice.strong}</strong>
    </div>
  );
}

/* ------------------------------------------------------------------ HERO */

function Hero() {
  const { t } = useHomeT();
  return (
    <section className="bg-[#FAF5EC] pb-20 pt-14 sm:pt-16">
      <div className="mx-auto grid max-w-[1920px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#E2653B]">
            {t.hero.eyebrow}
          </p>
          <h1 className="mx-auto mt-3 whitespace-normal font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.01em] lg:mx-0 lg:whitespace-nowrap">
            {t.hero.headline}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.5] text-[#5B5344]">
            {t.hero.sub}
          </p>

          <Reveal delay={80} className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/start"
              className="inline-flex items-center gap-2.5 rounded bg-[#E2653B] px-8 py-4 text-[1.0625rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
            >
              {t.hero.start}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 text-[1rem] font-bold text-[#16233F] transition-colors hover:text-[#E2653B]"
            >
              <PlayIcon className="h-7 w-7" />
              {t.hero.seeHow}
            </a>
          </Reveal>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-[#6B6255]">
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-[#E2653B]">₹</span> {t.hero.trustFree}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LockIcon className="h-3.5 w-3.5" /> {t.hero.trustSecure}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon className="h-3.5 w-3.5" /> {t.hero.trustGuidance}
            </span>
          </div>
        </div>

        {/* Static guidance illustration -- NOT a live search. The artwork
            makes the product promise visible: a confusing problem becomes
            a clear set of next steps. */}
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl bg-[#F5EBDD] shadow-[0_20px_50px_rgba(22,35,63,0.12)]">
            <Image
              src="/images/adhikaar-guided-tool.png"
              alt="A person uses Adhikaar to turn a confusing problem into clear next steps."
              width={1536}
              height={1024}
              sizes="(max-width: 1023px) 100vw, 42vw"
              preload
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ STATS BAR */

function StatsOverlap() {
  const { t } = useHomeT();
  const STATS = [
    { num: "4", label: t.stats.banks },
    { num: t.stats.daysFigure, label: t.stats.days },
    { num: "₹0", label: t.stats.free },
  ];
  return (
    <div className="relative mx-auto -mt-6 max-w-[1920px] px-5 sm:px-8">
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

function Timeline() {
  const { t } = useHomeT();
  const ASSET_NODES = [
    { icon: BankIcon, label: t.timeline.banks, bg: "#E6EEFA", fg: "#3B5EA8" },
    { icon: UmbrellaIcon, label: t.timeline.insurance, bg: "#FBE4D8", fg: "#E2653B" },
    { icon: PfIcon, label: t.timeline.pf, bg: "#E1F0E6", fg: "#3F7A5D" },
    { icon: SharesIcon, label: t.timeline.investments, bg: "#F1E9FB", fg: "#7147C4" },
    { icon: DividendIcon, label: t.timeline.dividends, bg: "#FCEFCF", fg: "#B8860B" },
    { icon: OtherIcon, label: t.timeline.other, bg: "#EDEAE3", fg: "#6B6255" },
  ];
  return (
    <section className="bg-[#E9EFF9] py-16">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            {t.timeline.heading}
          </h2>
          <p className="mt-2 text-[0.9688rem] text-[#5B6478]">{t.timeline.sub}</p>
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

function HowItWorks() {
  const { t } = useHomeT();
  const STEPS = [
    {
      n: "01",
      icon: BookIcon,
      bg: "#FBE4D8",
      fg: "#E2653B",
      title: t.how.step1Title,
      body: t.how.step1Body,
    },
    {
      n: "02",
      icon: SearchIcon,
      bg: "#E1F0E6",
      fg: "#3F7A5D",
      title: t.how.step2Title,
      body: t.how.step2Body,
    },
    {
      n: "03",
      icon: CheckIcon,
      bg: "#E6EEFA",
      fg: "#3B5EA8",
      title: t.how.step3Title,
      body: t.how.step3Body,
    },
  ];
  return (
    <section id="how" className="scroll-mt-16 bg-[#FAF5EC] py-16">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <Reveal className="max-w-[35rem]">
          <h2 className="font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            {t.how.heading}
          </h2>
          <p className="mt-2.5 text-[0.9688rem] text-[#6B6255]">{t.how.sub}</p>
          <a
            href="#find"
            className="mt-5 inline-flex items-center gap-2 rounded bg-[#FBE4D8] px-5 py-2.5 text-[0.9375rem] font-bold text-[#E2653B] transition-colors hover:bg-[#F6D4C0]"
          >
            {t.how.cta}
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
  const { t } = useHomeT();
  const CHECKLIST = [
    { label: t.tracker.identity, done: true },
    { label: t.tracker.death, done: true },
    { label: t.tracker.relationship, done: false },
    { label: t.tracker.claimForm, done: false },
    { label: t.tracker.submit, done: false },
  ];
  const doneCount = CHECKLIST.filter((c) => c.done).length;

  return (
    <section className="bg-[#FAF5EC] py-16">
      <div className="mx-auto grid max-w-[1920px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#E2653B]">
            {t.tracker.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            {t.tracker.heading}
          </h2>
          <p className="mt-3 max-w-[46ch] text-[0.9688rem] leading-relaxed text-[#6B6255]">
            {t.tracker.sub}
          </p>
          <Link
            href="/start"
            className="mt-5 inline-flex items-center gap-2.5 rounded bg-[#16233F] px-6 py-3 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#243257]"
          >
            {t.tracker.cta}
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
                    {t.tracker.cardTitle}
                  </span>
                  <span className="block text-[0.8125rem] text-[#6B6255]">
                    {t.tracker.illustrative}
                  </span>
                </span>
              </div>
              <span className="shrink-0 rounded-full bg-[#EFE7D8] px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-[#6B6255]">
                {t.tracker.exampleTag}
              </span>
            </div>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#EFE7D8]">
              <div
                className="h-full rounded-full bg-[#3B5EA8]"
                style={{ width: `${(doneCount / CHECKLIST.length) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-[0.75rem] text-[#6B6255]">
              {t.tracker.progress(doneCount, CHECKLIST.length)}
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
                    {c.done ? t.tracker.completed : t.tracker.pending}
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

function UdgamBand() {
  const { t } = useHomeT();
  const UDGAM_STEPS = [
    { icon: SearchIcon, label: t.udgam.search, sub: "UDGAM" },
    { icon: BookIcon, label: t.udgam.understand, sub: "Adhikaar" },
    { icon: CheckIcon, label: t.udgam.claim, sub: "Adhikaar" },
  ];
  return (
    <section id="sources" className="scroll-mt-16 bg-[#F1E7D6] py-14">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
              {t.udgam.eyebrow}
            </p>
            <p className="mt-2 max-w-[52ch] text-[0.9688rem] leading-relaxed text-[#5B5344]">
              {t.udgam.body}
            </p>
            <a
              href="https://udgam.rbi.org.in"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-[0.9375rem] font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
            >
              {t.udgam.link}
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

function FindGrid() {
  const { t } = useHomeT();
  const FIND_ITEMS = [
    { icon: BankIcon, label: t.find.bank },
    { icon: BankIcon, label: t.find.fixed },
    { icon: ShieldIcon, label: t.find.insurance },
    { icon: PfIcon, label: t.find.pf },
    { icon: SharesIcon, label: t.find.shares },
    { icon: DividendIcon, label: t.find.dividends },
    { icon: OtherIcon, label: t.find.other },
  ];
  return (
    <section id="find" className="scroll-mt-16 bg-[#FAF5EC] py-16">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            {t.find.heading}
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

function TrustRow() {
  const { t } = useHomeT();
  const TRUST_ITEMS = [
    { icon: LockIcon, label: t.trust.privacy },
    { icon: BookIcon, label: t.trust.plain },
    { icon: CheckIcon, label: t.trust.jargon },
    { icon: ShieldIcon, label: t.trust.control },
  ];
  return (
    <section className="bg-[#F1E7D6] py-14">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="font-serif text-[1.5rem] font-bold tracking-[-0.01em] text-[#16233F]">
              {t.trust.heading}
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
            {t.trust.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */

function Faq() {
  const { t } = useHomeT();
  const [open, setOpen] = useState<number | null>(null);
  const FAQS = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
  ];
  return (
    <section id="faq" className="scroll-mt-16 bg-[#FAF5EC] py-16">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <Reveal className="max-w-[35rem]">
          <p className="text-[0.875rem] text-[#6B6255]">{t.faq.eyebrow}</p>
          <h2 className="mt-1.5 font-serif text-[1.875rem] font-bold tracking-[-0.01em] text-[#16233F]">
            {t.faq.heading}
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

/* ------------------------------------------------------------------ FOOTER */

function RecoverFooter() {
  const { t, locale } = useHomeT();
  return (
    <footer className="border-t border-[#EFE7D8] bg-white py-10 text-[0.8125rem] text-[#6B6255]">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-8 pb-6">
          <Link href={withLang("/", locale)} className="flex items-center gap-2.5">
            <LeafMark className="h-7 w-7" />
            <span className="leading-tight">
              <span className="block font-serif text-[1.0625rem] font-bold text-[#16233F]">
                Adhikaar
              </span>
              <span className="block text-[0.6875rem] text-[#6B6255]">{t.tagline}</span>
            </span>
          </Link>
          <div className="flex flex-wrap gap-6 text-[0.875rem]">
            <Link href="/guide" className="hover:text-[#16233F]">{t.footer.about}</Link>
            <a href="#" className="hover:text-[#16233F]">{t.footer.privacy}</a>
            <a href="#" className="hover:text-[#16233F]">{t.footer.terms}</a>
            <a href="#" className="hover:text-[#16233F]">{t.footer.help}</a>
            <a href="#faq" className="hover:text-[#16233F]">{t.footer.faqs}</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EFE7D8] pt-5">
          <p>{t.footer.madeFor}</p>
          <p className="max-w-[60ch]">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
