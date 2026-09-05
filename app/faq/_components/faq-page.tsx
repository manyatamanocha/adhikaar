"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { RecoverFooter } from "../../recover/_components/footer";
import { HomeI18nProvider } from "../../recover/_components/home-i18n";
import { parseLocale } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";
import { FAQS, type Faq } from "@/lib/faq";

/**
 * Full FAQ page -- English only for now (content supplied directly, not
 * yet added to lib/i18n-home.ts's three-locale HomeDict; the homepage's
 * own short 4-question Faq() there is unrelated and untouched). First six
 * questions render open, the rest sit under "More questions" collapsed.
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


const VISIBLE_COUNT = 6;

export function FaqPage() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = HOME_T[locale];

  return (
    <HomeI18nProvider value={{ t, locale }}>
      <div className="min-h-screen bg-[#FAF5EC] text-[#16233F] antialiased">
        <RecoverNav />
        <Body />
        <RecoverFooter />
      </div>
    </HomeI18nProvider>
  );
}

function Body() {
  const [showAll, setShowAll] = useState(false);
  const visible = FAQS.slice(0, VISIBLE_COUNT);
  const rest = FAQS.slice(VISIBLE_COUNT);

  return (
    <main className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
      <div className="max-w-[820px]">
        <h1 className="font-serif text-[3.25rem] font-bold tracking-[-0.01em] text-[#16233F]">
          Frequently asked questions
        </h1>
        <p className="mt-2 text-[1.5rem] text-[#5B5344]">
          Short answers. Each one links to the fuller page if you want more.
        </p>
      </div>

      <div className="mt-10 columns-1 gap-6 lg:columns-2">
        {visible.map((f) => (
          <div key={f.q} className="mb-5 break-inside-avoid">
            <FaqItem f={f} />
          </div>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-6">
          {!showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="rounded-full border border-[#16233F] px-6 py-3 text-[1.125rem] font-bold text-[#16233F] transition-colors hover:bg-[#16233F] hover:text-white"
            >
              More questions ({rest.length})
            </button>
          ) : (
            <div className="mt-6 columns-1 gap-6 lg:columns-2">
              {rest.map((f) => (
                <div key={f.q} className="mb-5 break-inside-avoid">
                  <FaqItem f={f} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

function FaqItem({ f }: { f: Faq }) {
  return (
    <div
      className={
        "rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(22,35,63,0.08)]" +
        (f.highlight ? " ring-2 ring-[#E2653B]" : "")
      }
    >
      {f.highlight && (
        <span className="mb-2 inline-block rounded-full bg-[#E2653B]/10 px-3 py-1 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-[#E2653B]">
          Most asked
        </span>
      )}
      <h2 className="text-[1.375rem] font-bold text-[#16233F]">{f.q}</h2>
      <p className="mt-2 text-[1.125rem] leading-relaxed text-[#3A4256]">
        {f.a}
        {f.link && (
          <>
            {" "}
            <Link href={f.link.href} className="font-bold text-[#E2653B] hover:underline">
              {f.link.label} &rarr;
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
