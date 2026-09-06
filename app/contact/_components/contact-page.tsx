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

/**
 * Every size here comes from the shared type scale, not a hardcoded rem
 * value. It used to be the other way round -- a 3.25rem heading against the
 * homepage's display-xl, which caps at 2.4rem -- so this page sat about a
 * third larger than the page it links back to, and stayed that size through
 * two site-wide scale reductions that only touched the shared classes.
 *
 * Fixed sizes on a page nobody is currently looking at is exactly how a
 * design system drifts: the page does not look wrong on its own, only next
 * to every other page.
 */
function Body() {
  const { t } = useHomeT();
  const row = "flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6";
  const label = "text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-[#6B6255]";
  // Padded rather than enlarged. A phone number has to be a comfortable tap
  // target on a phone, and the way to do that is hit area, not point size.
  const value = "display-md -my-2 max-w-full break-words py-2 font-bold text-[#16233F] hover:text-[#E2653B]";

  return (
    <main className="shell max-w-[760px] py-8 sm:py-12">
      <h1 className="display-xl font-serif font-bold tracking-[-0.01em] text-[#16233F]">
        {t.contact.heading}
      </h1>
      <p className="lede-fluid mt-3 text-[#5B5344]">{t.contact.sub}</p>

      <div className="mt-8 divide-y divide-[#EFE7D8] rounded-2xl bg-white shadow-[0_8px_24px_rgba(22,35,63,0.1)]">
        <div className={row}>
          <span className={label}>{t.contact.phoneLabel}</span>
          <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className={value}>
            {PHONE}
          </a>
        </div>
        <div className={row}>
          <span className={label}>{t.contact.emailLabel}</span>
          <a href={`mailto:${EMAIL}`} className={`${value} break-all`}>
            {EMAIL}
          </a>
        </div>
      </div>
    </main>
  );
}
