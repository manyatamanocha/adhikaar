"use client";

import Link from "next/link";
import { Suspense } from "react";
import { LeafMark } from "./brand";
import { withLang } from "@/lib/i18n";
import { useHomeT } from "./home-i18n";

/**
 * The one footer, shared by every page on the site -- old-chrome pages
 * (verdict pages, /guide, /banks, /start, /bank-refused, /other-assets,
 * /what-were-you-asked-for, /learn) and new-chrome pages (/, /faq,
 * /contact) alike, so a click from any page lands somewhere with the same
 * nav and footer rather than jumping design systems mid-site.
 *
 * `data-print="hide"`: the deliverable on verdict pages is a sheet of paper
 * handed across a bank counter, and the footer does not belong on it.
 */
export function RecoverFooter() {
  return <Suspense fallback={<footer data-print="hide" className="bg-[#F1E7D6] p-5"><Link href="/privacy" className="underline">Privacy</Link></footer>}><FooterContent /></Suspense>;
}

function FooterContent() {
  const { t, locale } = useHomeT();
  return (
    <footer lang={locale}
      data-print="hide"
      className="mt-auto border-t border-[#EFE7D8] bg-[#F1E7D6] pb-10 pt-16 text-[0.9375rem] text-[#6B6255]"
    >
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <div className="flex flex-col items-start gap-4 pb-6">
          <Link href={withLang("/", locale)} className="flex items-center gap-2.5">
            <LeafMark className="h-[1.375rem] w-[1.375rem]" />
            <span className="leading-tight">
              <span className="block font-serif text-[1rem] font-bold text-[#16233F]">
                Adhikaar
              </span>
              <span className="block text-[0.8125rem] text-[#6B6255]">{t.tagline}</span>
            </span>
          </Link>
          <p>{t.footer.madeFor}</p>
        </div>
        <div className="border-t border-[#EFE7D8] pt-5">
          <section aria-labelledby="footer-terms">
            <h2 id="footer-terms" className="font-semibold text-[#16233F]">Disclaimer</h2>
            <p className="mt-2 leading-relaxed">
              {t.footer.disclaimer}
            </p>
          </section>
          <Link href={withLang("/privacy", locale)} className="mt-4 inline-flex min-h-11 items-center underline underline-offset-4">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
