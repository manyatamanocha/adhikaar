"use client";

import Link from "next/link";
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
  const { t, locale } = useHomeT();
  return (
    <footer
      data-print="hide"
      className="mt-auto border-t border-[#EFE7D8] bg-[#F1E7D6] pb-10 pt-16 text-[1.2rem] text-[#6B6255]"
    >
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <div className="flex flex-col items-start gap-4 pb-6">
          <Link href={withLang("/", locale)} className="flex items-center gap-2.5">
            <LeafMark className="h-7 w-7" />
            <span className="leading-tight">
              <span className="block font-serif text-[1.275rem] font-bold text-[#16233F]">
                Adhikaar
              </span>
              <span className="block text-[1.05rem] text-[#6B6255]">{t.tagline}</span>
            </span>
          </Link>
          <p>{t.footer.madeFor}</p>
        </div>
        <div className="border-t border-[#EFE7D8] pt-5">
          <section aria-labelledby="footer-terms">
            <h2 id="footer-terms" className="font-semibold text-[#16233F]">Terms &amp; Conditions</h2>
            <p className="mt-2 leading-relaxed lg:overflow-x-auto lg:whitespace-nowrap" tabIndex={0}>
              {t.footer.disclaimer}
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
