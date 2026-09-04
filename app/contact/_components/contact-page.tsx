"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { HomeI18nProvider, useHomeT } from "../../recover/_components/home-i18n";
import { LeafMark } from "../../recover/_components/brand";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";

const PHONE = "+91 98765 43210";
const EMAIL = "adhikaarapka@gmail.com";

/**
 * A plain contact page -- the number and address here are real, not
 * placeholders, so this page renders them as-is rather than through any
 * "example" styling used elsewhere on the site.
 */
export function ContactPage() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = HOME_T[locale];

  return (
    <HomeI18nProvider value={{ t, locale }}>
      <div className="min-h-screen bg-[#FAF5EC] text-[#16233F] antialiased">
        <RecoverNav />
        <Body />
        <Footer />
      </div>
    </HomeI18nProvider>
  );
}

function Body() {
  const { t } = useHomeT();
  return (
    <main className="mx-auto max-w-[640px] px-5 py-20 sm:px-8">
      <h1 className="font-serif text-[2.25rem] font-bold tracking-[-0.01em] text-[#16233F]">
        {t.contact.heading}
      </h1>
      <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#5B5344]">
        {t.contact.intro}
      </p>

      <div className="mt-8 divide-y divide-[#EFE7D8] rounded-2xl bg-white shadow-[0_20px_50px_rgba(22,35,63,0.12)]">
        <div className="flex items-center justify-between gap-4 p-6">
          <span className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-[#6B6255]">
            {t.contact.phoneLabel}
          </span>
          <a
            href={`tel:${PHONE.replace(/\s+/g, "")}`}
            className="text-[1.125rem] font-bold text-[#16233F] hover:text-[#E2653B]"
          >
            {PHONE}
          </a>
        </div>
        <div className="flex items-center justify-between gap-4 p-6">
          <span className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-[#6B6255]">
            {t.contact.emailLabel}
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[1.125rem] font-bold text-[#16233F] hover:text-[#E2653B]"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </main>
  );
}

function Footer() {
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
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EFE7D8] pt-5">
          <p>{t.footer.madeFor}</p>
        </div>
      </div>
    </footer>
  );
}
