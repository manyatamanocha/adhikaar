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
        <Link href={withLang("/", locale)} className="min-w-0">
          <span className="flex items-center gap-2.5">
            <LeafMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
            <span className="font-serif text-[1.5rem] font-bold leading-tight sm:text-[1.9375rem] lg:text-[2.3125rem]">Adhikaar</span>
          </span>
          <span className="mt-1 block text-[0.8125rem] text-[#6B6255] sm:text-[0.875rem] lg:text-[0.9375rem]">
            The counter companion for deceased-bank claims in India
          </span>
        </Link>
        <label className="flex flex-col gap-1 text-base font-semibold lg:justify-self-end" lang="en">
          Page language
          <select aria-label="Page language" value={locale}
            onChange={event => router.push(withLang(pathname + (searchParams.size ? "?" + searchParams.toString() : ""), event.target.value as typeof locale))}
            className="min-h-11 rounded-lg border border-[#E3D8C4] bg-white px-3 py-2 text-lg">
            {LOCALES.map(l => <option key={l} value={l}>{LOCALE_LABEL[l]}</option>)}
          </select>
        </label>
      </div>
      <nav aria-label="Quick links" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 bg-[#16233F] px-5 py-3.5 text-sm font-bold text-white sm:gap-x-8 sm:text-[0.9375rem] lg:text-[1.0625rem]">
        {links.map(link => <Link key={link.href} href={withLang(link.href, locale)}
          aria-current={pathname === link.href ? "page" : undefined}
          className="inline-flex min-h-11 items-center hover:text-[#F0B892] aria-[current=page]:underline">{link.label}</Link>)}
      </nav>
      {!translated && locale !== "en" && <p className="border-b border-rule bg-white px-5 py-3 text-base leading-relaxed">{langNotice[locale]}</p>}
    </header>
  );
}
