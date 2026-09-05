"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RecoverNav } from "./nav";
import { RecoverFooter } from "./footer";
import { Reveal } from "./reveal";
import { HomeI18nProvider, useHomeT } from "./home-i18n";
import { parseLocale } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";
import {
  ArrowRightIcon,
  BankIcon,
  SearchIcon,
  CheckIcon,
  BookIcon,
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
 *     button into the real wizard.
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
        <UdgamBand />
        <FindGrid />
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
    <section className="relative overflow-hidden bg-[#FAF5EC] pb-20 pt-14 sm:pt-16">
      <Image
        src="/images/adhikaar-indian-family-paperwork-no-phone.png"
        alt=""
        width={1536}
        height={1024}
        sizes="(max-width: 639px) 72vw, (max-width: 1023px) 60vw, 52vw"
        preload
        className="pointer-events-none absolute right-[20%] top-0 z-0 h-auto w-[72%] max-w-none object-contain object-right opacity-[0.14] mix-blend-multiply sm:w-[60%] lg:w-[52%]"
      />
      <div className="relative z-10 mx-auto max-w-[1920px] px-5 sm:px-8">
        <div className="max-w-[70rem]">
          <p className="text-[1.0625rem] font-bold uppercase tracking-[0.12em] text-[#E2653B]">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-3 whitespace-nowrap font-serif text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold leading-[1.15] tracking-[-0.01em]">
            {t.hero.headline}
          </h1>
          <p className="mt-4 text-[1.5125rem] leading-relaxed sm:text-[1.65rem] text-[#5B5344]">
            {t.hero.sub.split("\n").map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </p>

          <Reveal delay={80} className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 rounded bg-[#E2653B] px-10 py-5 text-[1.5rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
            >
              {t.hero.start}
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </Reveal>

        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------ STATS BAR */

function StatsOverlap() {
  return (
    <div className="relative mx-auto mt-4 max-w-[1920px] px-5 sm:px-8">
      <Reveal className="grid grid-cols-1 divide-y divide-[#EFE7D8] rounded-xl bg-white shadow-[0_8px_24px_rgba(22,35,63,0.1)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Link href="/start" className="group p-6 transition-colors hover:bg-[#FBF7EF] sm:p-7">
          <p className="font-serif text-[2.125rem] font-bold text-[#16233F]">
            Start your claim journey today
          </p>
          <p className="mt-1 text-[1rem] leading-snug text-[#6B6255]">
            What can Adhikaar help find? Bank deposits, fixed deposits
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[1rem] font-bold text-[#E2653B]">
            Begin your claim
            <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </p>
        </Link>
        <div className="p-6 sm:p-7">
          <a
            href="https://udgam.rbi.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-[2.125rem] font-bold text-[#16233F] underline decoration-[#E2653B]/40 decoration-2 underline-offset-4 hover:text-[#E2653B]"
          >
            Search UDGAM
          </a>
          <p className="mt-1 text-[1rem] leading-snug text-[#6B6255]">
            The RBI&apos;s own portal for finding unclaimed deposits across multiple banks in one place
          </p>
        </div>
        <div className="p-6 sm:p-7">
          <p className="font-serif text-[2.125rem] font-bold text-[#16233F]">
            No cost to use Adhikaar — no login
          </p>
        </div>
      </Reveal>
    </div>
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
            <p className="text-[1rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
              {t.udgam.eyebrow}
            </p>
            <p className="mt-2 max-w-[52ch] text-[1.1875rem] leading-relaxed text-[#5B5344]">
              {t.udgam.body}
            </p>
            <a
              href="https://udgam.rbi.org.in"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-[1.125rem] font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
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
                  <span className="text-[1rem] font-bold text-[#16233F]">
                    {s.label}
                    <span className="block text-[0.875rem] font-normal text-[#6B6255]">
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
  ];
  return (
    <section id="find" className="scroll-mt-16 bg-[#FAF5EC] py-16">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-[2.25rem] font-bold tracking-[-0.01em] text-[#16233F]">
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
              <span className="text-[1rem] font-bold text-[#16233F]">{it.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */
