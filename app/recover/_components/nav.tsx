"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LeafMark } from "./brand";
import { LOCALES, LOCALE_LABEL, withLang } from "@/lib/i18n";
import { useHomeT } from "./home-i18n";

/** Shared, responsive navigation. Native select supports keyboard and touch. */
export function RecoverNav() {
  return <Suspense fallback={<header data-print="hide" className="bg-[#FAF5EC] p-5"><Link href="/" className="font-serif text-3xl font-bold">Adhikaar</Link><nav aria-label="Quick links" className="mt-4 flex flex-wrap gap-6"><Link href="/start">Claim Guide</Link><Link href="/banks">Bank policies</Link><Link href="/faq">FAQs</Link><Link href="/contact">Contact</Link></nav></header>}><Navigation /></Suspense>;
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
      <div className="mx-auto flex max-w-[1920px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div aria-hidden="true" className="hidden lg:block" />
        <Link href={withLang("/", locale)} className="flex min-w-0 flex-col items-center">
          <span className="flex items-center gap-2">
            <LeafMark className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
            <span className="font-serif text-[1.1875rem] font-bold leading-tight sm:text-[1.5625rem] lg:text-[1.875rem]">Adhikaar</span>
          </span>
          <span className="mt-1 block text-center text-[0.625rem] text-[#6B6255] sm:text-[0.6875rem] lg:text-[0.75rem]">
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
