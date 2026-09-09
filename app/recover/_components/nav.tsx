"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AdhikaarMark } from "./brand";
import { LOCALES, LOCALE_LABEL, withLang, type Locale } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";
import { useHomeT } from "./home-i18n";

/**
 * Shared, responsive navigation. Native select supports keyboard and touch.
 *
 * `locale` is optional and only affects the Suspense FALLBACK below --
 * Navigation itself always reads its own locale from useSearchParams() once
 * mounted, so the two can never disagree once hydrated. The fallback exists
 * because locale lives only in the URL's `?lang=` query param, never a
 * cookie (lib/i18n.ts), so the server rendering this fallback has no other
 * way to know it -- a caller that already computed `locale` server-side
 * (nearly every page does, via parseLocale(sp.lang)) should pass it through
 * so the very first paint is in the reader's language, not a hardcoded
 * English flash before the client hook resolves.
 */
export function RecoverNav({ locale }: { locale?: Locale } = {}) {
  const l = locale ?? "en";
  const t = HOME_T[l];
  return (
    <Suspense
      fallback={
        <header data-print="hide" className="bg-[#FAF5EC] p-5">
          <Link href={withLang("/", l)} className="font-serif text-3xl font-bold">Adhikaar</Link>
          <nav aria-label="Quick links" className="mt-4 flex flex-wrap gap-6">
            <Link href={withLang("/start", l)}>{t.nav.claimGuide}</Link>
            <Link href={withLang("/banks", l)}>
              {l === "hi" ? "बैंक की नीतियाँ" : l === "kn" ? "ಬ್ಯಾಂಕ್ ನೀತಿಗಳು" : "Bank policies"}
            </Link>
            <Link href={withLang("/faq", l)}>{t.nav.faq}</Link>
            <Link href={withLang("/contact", l)}>{t.nav.contact}</Link>
          </nav>
        </header>
      }
    >
      <Navigation />
    </Suspense>
  );
}

function Navigation() {
  const { t, locale } = useHomeT();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const translated = ["/", "/guide", "/faq", "/banks", "/contact"].includes(pathname);
  const langNotice = {
    en: "The detailed claim guide is currently in English. Your language choice is kept for translated pages.",
    hi: "विस्तृत दावा मार्गदर्शिका अभी अंग्रेज़ी में है। अनुवादित पृष्ठों के लिए आपकी भाषा का चयन बना रहेगा।",
    kn: "ವಿವರವಾದ ಕ್ಲೈಮ್ ಮಾರ್ಗದರ್ಶಿ ಪ್ರಸ್ತುತ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿದೆ. ಅನುವಾದಿತ ಪುಟಗಳಿಗೆ ನಿಮ್ಮ ಭಾಷೆಯ ಆಯ್ಕೆ ಉಳಿಯುತ್ತದೆ.",
  };
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/start", label: t.nav.claimGuide },
    { href: "/banks", label: locale === "hi" ? "बैंक की नीतियाँ" : locale === "kn" ? "ಬ್ಯಾಂಕ್ ನೀತಿಗಳು" : "Bank policies" },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ];
  return (
    <header data-print="hide" className="bg-[#FAF5EC] text-[#16233F]" lang={locale}>
      <div className="mx-auto flex max-w-[1920px] flex-wrap items-center justify-between gap-4 px-5 pt-4 pb-7 sm:px-8 sm:pb-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:pb-9">
        <div aria-hidden="true" className="hidden lg:block" />
        <Link href={withLang("/", locale)} className="flex min-w-0 -translate-x-[11px] flex-col items-center sm:-translate-x-[6px] lg:-translate-x-[3px]">
          <span className="flex items-center gap-3">
            <AdhikaarMark className="h-[4.8rem] w-[4.8rem] shrink-0 sm:h-24 sm:w-24 lg:h-[7.2rem] lg:w-[7.2rem]" />
            <span className="font-serif text-[1.425rem] font-bold leading-tight sm:text-[1.875rem] lg:text-[2.25rem]">Adhikaar</span>
          </span>
          <span className="mt-1.5 block max-w-[20rem] text-center text-[0.78125rem] text-[#6B6255] sm:max-w-[24rem] sm:text-[0.859375rem] lg:text-[0.9375rem]">
            The counter companion for deceased-bank claims in India
          </span>
        </Link>
        <label className="flex flex-col gap-1 text-xs font-semibold lg:justify-self-end" lang="en">
          Page language
          <select aria-label="Page language" value={locale}
            onChange={event => router.push(withLang(pathname + (searchParams.size ? "?" + searchParams.toString() : ""), event.target.value as typeof locale))}
            className="min-h-11 rounded-lg border border-[#E3D8C4] bg-white px-2.5 py-1.5 text-[0.8125rem]">
            {LOCALES.map(l => <option key={l} value={l}>{LOCALE_LABEL[l]}</option>)}
          </select>
        </label>
      </div>
      <nav aria-label="Quick links" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 bg-[#16233F] px-5 py-3 text-[0.8125rem] font-bold text-white sm:gap-x-10 sm:text-[0.875rem] lg:gap-x-12 lg:text-[0.9375rem]">
        {links.map(link => <Link key={link.href} href={withLang(link.href, locale)}
          aria-current={pathname === link.href ? "page" : undefined}
          className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-4 py-2 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-[#F0B892] aria-[current=page]:border-[#E2653B] aria-[current=page]:bg-[#E2653B]/20 aria-[current=page]:text-[#F0B892]">{link.label}</Link>)}
      </nav>
      {!translated && locale !== "en" && <p className="border-b border-rule bg-white px-5 py-3 text-base leading-relaxed">{langNotice[locale]}</p>}
    </header>
  );
}
