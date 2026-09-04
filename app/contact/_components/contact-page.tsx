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
    <main className="mx-auto max-w-[1920px] px-5 py-20 sm:px-8">
      <div className="max-w-[760px]">
      <h1 className="font-serif text-[3.25rem] font-bold tracking-[-0.01em] text-[#16233F]">
        {t.contact.heading}
      </h1>
      <p className="mt-2 text-[1.5rem] text-[#5B5344]">{t.contact.sub}</p>

      <div className="mt-10 divide-y divide-[#EFE7D8] rounded-2xl bg-white shadow-[0_20px_50px_rgba(22,35,63,0.12)]">
        <div className="flex items-center justify-between gap-4 p-8">
          <span className="text-[1.125rem] font-bold uppercase tracking-[0.08em] text-[#6B6255]">
            {t.contact.phoneLabel}
          </span>
          <a
            href={`tel:${PHONE.replace(/\s+/g, "")}`}
            className="text-[1.75rem] font-bold text-[#16233F] hover:text-[#E2653B]"
          >
            {PHONE}
          </a>
        </div>
        <div className="flex items-center justify-between gap-4 p-8">
          <span className="text-[1.125rem] font-bold uppercase tracking-[0.08em] text-[#6B6255]">
            {t.contact.emailLabel}
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[1.75rem] font-bold text-[#16233F] hover:text-[#E2653B]"
          >
            {EMAIL}
          </a>
        </div>
      </div>
      </div>
    </main>
  );
}

function Footer() {
  const { t, locale } = useHomeT();
  return (
    <footer className="border-t border-[#EFE7D8] bg-white py-16 text-[1.125rem] text-[#6B6255]">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Link href={withLang("/", locale)} className="flex items-center gap-4">
            <LeafMark className="h-[3.575rem] w-[3.575rem]" />
            <span className="leading-tight">
              <span className="block font-serif text-[2.275rem] font-bold text-[#16233F]">
                Adhikaar
              </span>
              <span className="block text-[1.2188rem] text-[#6B6255]">{t.tagline}</span>
            </span>
          </Link>
          <p>{t.footer.madeFor}</p>
        </div>
      </div>
    </footer>
  );
}
