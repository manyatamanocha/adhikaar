"use client";

import { useSearchParams } from "next/navigation";
import { RecoverNav } from "../../recover/_components/nav";
import { RecoverFooter } from "../../recover/_components/footer";
import { HomeI18nProvider, useHomeT } from "../../recover/_components/home-i18n";
import { parseLocale } from "@/lib/i18n";
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
      <div lang={locale} className="min-h-screen bg-[#FAF5EC] text-[#16233F] antialiased">
        <RecoverNav />
        <Body />
        <RecoverFooter />
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
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-8">
          <span className="text-[1.125rem] font-bold uppercase tracking-[0.08em] text-[#6B6255]">
            {t.contact.phoneLabel}
          </span>
          <a
            href={`tel:${PHONE.replace(/\s+/g, "")}`}
            className="max-w-full break-words text-[1.4rem] font-bold text-[#16233F] hover:text-[#E2653B] sm:text-[1.75rem]"
          >
            {PHONE}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-8">
          <span className="text-[1.125rem] font-bold uppercase tracking-[0.08em] text-[#6B6255]">
            {t.contact.emailLabel}
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="max-w-full break-all text-[1.4rem] font-bold text-[#16233F] hover:text-[#E2653B] sm:text-[1.75rem]"
          >
            {EMAIL}
          </a>
        </div>
      </div>
      </div>
    </main>
  );
}
