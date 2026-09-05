"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RecoverNav } from "./nav";
import { RecoverFooter } from "./footer";
import { Reveal } from "./reveal";
import { HomeI18nProvider, useHomeT } from "./home-i18n";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";
import { ArrowRightIcon } from "./icons";

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
      <div lang={locale} className="bg-[#FAF5EC] text-[#16233F] antialiased selection:bg-[#E2653B]/20 selection:text-[#16233F]">
        <NoticeBar />
        <RecoverNav />
        <main>
          <Hero />
          <StatsOverlap />
        </main>
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
  const { t, locale } = useHomeT();
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
          <h1 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.15] tracking-[-0.01em]">
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
              href={withLang("/start", locale)}
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
  const { locale } = useHomeT();
  return (
    <div id="find" lang="en" className="relative mx-auto mt-4 scroll-mt-16 max-w-[1920px] px-5 sm:px-8">
      <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <a
          href="https://udgam.rbi.org.in"
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto flex w-full max-w-[30rem] flex-col justify-start rounded-2xl bg-white p-9 shadow-[0_8px_24px_rgba(22,35,63,0.1)] transition-shadow hover:shadow-[0_12px_32px_rgba(22,35,63,0.16)]"
        >
          <p className="text-[1.4rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
            Step 1
          </p>
          <p className="mt-2 font-serif text-[2rem] leading-tight font-bold text-[#16233F]">
            Find the deposit through UDGAM
          </p>
          <p className="mt-3 text-[1.386rem] leading-snug text-[#6B6255]">
            UDGAM means Unclaimed Deposits–Gateway to Access Information.
            It is the RBI&apos;s portal for searching unclaimed deposits across multiple banks.
            UDGAM helps you find the deposit; Adhikaar helps you understand how to claim it.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-[1.35rem] font-bold text-[#E2653B]">
            Find it on UDGAM
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </p>
        </a>
        <div
          className="group mx-auto flex w-full max-w-[30rem] flex-col justify-start rounded-2xl bg-white p-9 shadow-[0_8px_24px_rgba(22,35,63,0.1)] transition-shadow hover:shadow-[0_12px_32px_rgba(22,35,63,0.16)]"
        >
          <p className="text-[1.68rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
            Step 2
          </p>
          <p className="mt-2 font-serif text-[2.4rem] leading-tight font-bold text-[#16233F]">
            Understand the claim with Adhikaar
          </p>
          <p className="mt-3 text-[1.386rem] leading-snug text-[#6B6255]">
            Answer a few simple questions about your claim.
            <br />
            We show the conditions, documents and next step that apply.
          </p>
          <Link
            href={withLang("/start", locale)}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded bg-[#E2653B] px-5 py-3 text-[1.15rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
          >
            Let&apos;s start your claim journey today
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <Link
          href={withLang("/start", locale)}
          className="group mx-auto flex w-full max-w-[30rem] flex-col justify-start rounded-2xl bg-white p-9 shadow-[0_8px_24px_rgba(22,35,63,0.1)] transition-shadow hover:shadow-[0_12px_32px_rgba(22,35,63,0.16)]"
        >
          <p className="text-[1.4rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
            Step 3
          </p>
          <p className="mt-2 font-serif text-[2rem] leading-tight font-bold text-[#16233F]">
            Claim your money from the bank
          </p>
          <p className="mt-3 text-[1.386rem] leading-snug text-[#6B6255]">
            Get a clear checklist of the documents you actually need.
            <br />
            No sign-in or document uploads. Read our privacy details before sharing a guide link.
          </p>
        </Link>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ FAQ */
