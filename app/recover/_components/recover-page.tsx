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
import { DOCS_T } from "@/lib/i18n-documents";
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
    <div className="bg-[#16233F] px-4 py-2 text-center text-[0.875rem] text-[#D8DEEA]">
      <span className="block">{t.notice.pre}</span>
      <strong className="block font-semibold text-[#F0B892]">{t.notice.strong}</strong>
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
        sizes="(max-width: 639px) 82vw, (max-width: 1023px) 70vw, 62vw"
        preload
        // The mask fades both vertical edges into the cream. At 15% opacity
        // under mix-blend-multiply this is a background wash, and a hard
        // rectangle edge on a wash reads as a mistake -- nothing else on the
        // page has a visible box. Fading is what lets the image stay this
        // large and this dark without looking pasted on. -webkit- included
        // for older Android WebViews, which are a real share of this audience.
        className="pointer-events-none absolute right-[8%] top-0 z-0 h-auto w-[82%] max-w-none object-contain object-right opacity-[0.154] mix-blend-multiply [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_78%,transparent_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_78%,transparent_100%)] sm:w-[70%] lg:w-[62%]"
      />
      <div className="relative z-10 mx-auto max-w-[1920px] px-5 sm:px-8">
        <div className="max-w-[70rem]">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#E2653B]">
            {t.hero.eyebrow}
          </p>
          <h1 className="display-xl mt-3 font-serif font-bold tracking-[-0.01em]">
            {t.hero.headline}
          </h1>
          <p className="lede-fluid mt-4 text-[#5B5344]">
            {t.hero.sub}
            <span className="mt-1 block text-[clamp(0.88rem,0.968vw,1.1rem)] font-bold text-[#16233F]">{t.hero.subBold}</span>
          </p>

          <Reveal delay={80} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={withLang("/start", locale)}
              className="inline-flex items-center gap-1.5 rounded bg-[#E2653B] px-5 py-2.5 text-[0.75rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
            >
              {t.hero.start}
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
            {/* Second door, added 6 Sep 2026. Plenty of people arrive wanting
                only one thing -- the list of papers -- and are not ready to
                answer seven questions to get it. Deliberately a quieter
                secondary action, not a second orange button: the claim journey
                is still the primary path, and /documents ends by offering it. */}
            <Link
              href={withLang("/documents", locale)}
              className="inline-flex items-center gap-1.5 rounded border-2 border-[#16233F]/25 px-5 py-[0.5625rem] text-[0.75rem] font-bold text-[#16233F] transition-colors hover:border-[#16233F]/60 hover:bg-white/60"
            >
              {DOCS_T[locale].homeCta}
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </Reveal>

        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------ STATS BAR */

function StatsOverlap() {
  const { t, locale } = useHomeT();
  const s = t.stepsCards;
  return (
    <div id="find" className="relative mx-auto mt-4 scroll-mt-16 max-w-[1920px] px-5 sm:px-8">
      <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <a
          href="https://udgam.rbi.org.in"
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto flex w-full max-w-[30rem] flex-col justify-start rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(22,35,63,0.1)] transition-shadow hover:shadow-[0_12px_32px_rgba(22,35,63,0.16)]"
        >
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
            {s.step1Label}
          </p>
          <p className="display-md mt-2 font-serif font-bold text-[#16233F]">
            {s.step1Title}
          </p>
          <p className="body-fluid mt-3 leading-snug text-[#6B6255]">
            {s.step1Body}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-[0.6875rem] font-bold text-[#E2653B]">
            {s.step1Cta}
            <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </p>
        </a>
        <div
          className="group mx-auto flex w-full max-w-[30rem] flex-col justify-start rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(22,35,63,0.1)] transition-shadow hover:shadow-[0_12px_32px_rgba(22,35,63,0.16)]"
        >
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
            {s.step2Label}
          </p>
          <p className="display-md mt-2 font-serif font-bold text-[#16233F]">
            {s.step2Title}
          </p>
          <p className="body-fluid mt-3 leading-snug text-[#6B6255]">
            {s.step2Body.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
          <Link
            href={withLang("/start", locale)}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded bg-[#E2653B] px-3 py-1.5 text-[0.6875rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
          >
            {s.step2Cta}
            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>
        <Link
          href={withLang("/start", locale)}
          className="group mx-auto flex w-full max-w-[30rem] flex-col justify-start rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(22,35,63,0.1)] transition-shadow hover:shadow-[0_12px_32px_rgba(22,35,63,0.16)]"
        >
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.1em] text-[#E2653B]">
            {s.step3Label}
          </p>
          <p className="display-md mt-2 font-serif font-bold text-[#16233F]">
            {s.step3Title}
          </p>
          <p className="body-fluid mt-3 leading-snug text-[#6B6255]">
            {s.step3Body.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
        </Link>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ FAQ */
