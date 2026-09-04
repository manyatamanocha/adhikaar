"use client";

import { useState } from "react";
import Link from "next/link";
import { LeafMark } from "./brand";
import { ChevronDownIcon, ArrowRightIcon } from "./icons";
import { LOCALES, LOCALE_LABEL, LOCALE_SHORT, withLang } from "@/lib/i18n";
import { useHomeT } from "./home-i18n";

/**
 * Rebuilt 5 Sep 2026 against a user-supplied reference image: leaf mark +
 * tagline, a four-item nav, a working language switcher (wired to the
 * site's existing ?lang= locale mechanism in lib/i18n.ts -- English,
 * Hindi and Kannada; see that file's note that the Hindi/Kannada strings
 * are unchecked by a native speaker), and a "Start a Search" button. The
 * reference's own RBI-seal badge and tricolour flag are NOT reproduced
 * anywhere on this homepage -- excluded per the standing rule (no state
 * emblem, no ministry mark, no tricolour), and reconfirmed directly when
 * this reference was brought back.
 */
export function RecoverNav() {
  const [langOpen, setLangOpen] = useState(false);
  const { t, locale } = useHomeT();

  return (
    <header className="bg-[#FAF5EC] text-[#16233F]">
      <div className="mx-auto grid max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 py-4 sm:px-8">
        <nav aria-label="Sections" className="hidden items-center gap-7 text-[0.9375rem] sm:flex">
          <a href="#how" className="text-[#4A4335] transition-colors hover:text-[#16233F]">
            {t.nav.how}
          </a>
          <a href="#find" className="text-[#4A4335] transition-colors hover:text-[#16233F]">
            {t.nav.find}
          </a>
        </nav>

        <Link href={withLang("/", locale)} className="flex items-center justify-center gap-7">
          <LeafMark className="h-[7.49rem] w-[7.49rem]" />
          <span className="leading-tight">
            <span className="block font-serif text-[5.62rem] font-bold">Adhikaar</span>
            <span className="block text-[1.7551rem] text-[#6B6255]">{t.tagline}</span>
          </span>
        </Link>

        <div className="flex items-center justify-end gap-6">
          <nav aria-label="More sections" className="hidden items-center gap-7 text-[0.9375rem] sm:flex">
            <a href="#faq" className="text-[#4A4335] transition-colors hover:text-[#16233F]">
              {t.nav.faq}
            </a>
            <Link href="/guide" className="text-[#4A4335] transition-colors hover:text-[#16233F]">
              {t.nav.about}
            </Link>
          </nav>
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="menu"
              className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.875rem] font-bold transition-colors ${
                langOpen
                  ? "border-[#E2653B] bg-[#FBE4D8] text-[#E2653B]"
                  : "border-[#E3D8C4] bg-white text-[#4A4335] hover:border-[#E2653B] hover:bg-[#FBE4D8] hover:text-[#E2653B]"
              }`}
            >
              {LOCALE_SHORT[locale]}
              <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-lg border border-[#EFE7D8] bg-white py-1 shadow-[0_8px_24px_rgba(22,35,63,0.14)]"
              >
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={withLang("/", l)}
                    role="menuitem"
                    onClick={() => setLangOpen(false)}
                    aria-current={l === locale ? "true" : undefined}
                    className={`block px-4 py-2 text-[0.9375rem] hover:bg-[#FAF5EC] ${
                      l === locale ? "font-bold text-[#E2653B]" : "text-[#16233F]"
                    }`}
                  >
                    {LOCALE_LABEL[l]}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 rounded bg-[#E2653B] px-5 py-2.5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
          >
            {t.nav.start}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
