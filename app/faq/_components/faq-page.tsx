"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { RecoverFooter } from "../../recover/_components/footer";
import { HomeI18nProvider, useHomeT } from "../../recover/_components/home-i18n";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";
import { FAQS_BY_LOCALE, type Faq } from "@/lib/faq";

/**
 * Full FAQ page -- English only for now (content supplied directly, not
 * yet added to lib/i18n-home.ts's three-locale HomeDict; the homepage's
 * own short 4-question Faq() there is unrelated and untouched). All
 * questions render at once in a uniform two-column grid -- an earlier
 * version collapsed most of them behind a "More questions" toggle and
 * laid the rest out with CSS multi-column (`columns-2`), which fills
 * top-to-bottom per column and left cards visibly misaligned row to row.
 * A real `grid grid-cols-2` keeps every row's left/right pair aligned.
 *
 * Content is the user's own revised copy (replacing an earlier draft that
 * over-simplified several answers and linked out to seven different
 * routes -- read as "scattered"). Every trailing citation link below
 * points at one of four pages: /guide (the detailed RBI-cited flow),
 * /what-were-you-asked-for (the document checklist), /bank-refused (the
 * escalation route), or /banks. The privacy answer deliberately does NOT
 * say "we store nothing" -- it names the deadline tracker's localStorage
 * use and the analytics that are actually in this codebase.
 */

export function FaqPage() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = HOME_T[locale];

  return (
    <HomeI18nProvider value={{ t, locale }}>
      <div lang={locale} className="min-h-screen bg-[#FAF5EC] text-[#16233F] antialiased">
        <RecoverNav />
        <Body faqs={FAQS_BY_LOCALE[locale]} mostAsked={t.faqPage.mostAsked} heading={t.faqPage.heading} />
        <RecoverFooter />
      </div>
    </HomeI18nProvider>
  );
}

function Body({
  faqs,
  heading,
  mostAsked,
}: {
  faqs: Faq[];
  heading: string;
  mostAsked: string;
}) {
  return (
    <main className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
      <div className="max-w-[820px]">
        <h1 className="font-serif text-[3.25rem] font-bold tracking-[-0.01em] text-[#16233F]">
          {heading}
        </h1>
      </div>

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {faqs.map((f) => (
          <FaqItem key={f.q} f={f} mostAsked={mostAsked} />
        ))}
      </div>
    </main>
  );
}

function FaqItem({ f, mostAsked }: { f: Faq; mostAsked: string }) {
  const { locale } = useHomeT();
  return (
    <div
      className={
        "rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(22,35,63,0.08)]" +
        (f.highlight ? " ring-2 ring-[#E2653B]" : "")
      }
    >
      {f.highlight && (
        <span className="mb-2 inline-block rounded-full bg-[#E2653B]/10 px-3 py-1 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-[#E2653B]">
          {mostAsked}
        </span>
      )}
      <h2 className="text-[1.375rem] font-bold text-[#16233F]">{f.q}</h2>
      <p className="mt-2 text-[1.125rem] leading-relaxed text-[#3A4256]">
        {f.a}
        {f.link && (
          <>
            {" "}
            <Link href={withLang(f.link.href, locale)} className="font-bold text-[#E2653B] hover:underline">
              {f.link.label} &rarr;
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
