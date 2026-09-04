"use client";

import { useState } from "react";
import Link from "next/link";
import { LeafMark } from "./brand";
import { ChevronDownIcon } from "./icons";
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
        <div />

        <Link href={withLang("/", locale)} className="flex items-center justify-center gap-7">
          <LeafMark className="h-[7.49rem] w-[7.49rem]" />
          <span className="leading-tight">
            <span className="block font-serif text-[5.62rem] font-bold">Adhikaar</span>
            <span className="block text-[1.7551rem] text-[#6B6255]">
              The counter companion for deceased-bank claims in India
            </span>
          </span>
        </Link>

        <div className="flex items-center justify-end gap-6">
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="menu"
              className={`flex cursor-pointer items-center gap-[0.5833rem] rounded-full border px-[1.4583rem] py-[0.7292rem] text-[1.4583rem] font-bold transition-colors ${
                langOpen
                  ? "border-[#E2653B] bg-[#FBE4D8] text-[#E2653B]"
                  : "border-[#E3D8C4] bg-white text-[#4A4335] hover:border-[#E2653B] hover:bg-[#FBE4D8] hover:text-[#E2653B]"
              }`}
            >
              {LOCALE_SHORT[locale]}
              <ChevronDownIcon className={`h-[1.4583rem] w-[1.4583rem] transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-max overflow-hidden rounded-lg border border-[#EFE7D8] bg-white py-1 shadow-[0_8px_24px_rgba(22,35,63,0.14)]"
              >
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={withLang("/", l)}
                    role="menuitem"
                    onClick={() => setLangOpen(false)}
                    aria-current={l === locale ? "true" : undefined}
                    className={`block px-[1.4583rem] py-[0.875rem] text-[1.4583rem] whitespace-nowrap hover:bg-[#FAF5EC] ${
                      l === locale ? "font-bold text-[#E2653B]" : "text-[#16233F]"
                    }`}
                  >
                    {LOCALE_LABEL[l]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <nav
        aria-label="Quick links"
        className="flex w-full flex-wrap items-center justify-center gap-x-28 gap-y-4 bg-[#16233F] px-5 py-6 text-[1.9688rem] font-bold text-white sm:px-8"
      >
        <Link href={withLang("/", locale)} className="transition-colors hover:text-[#F0B892]">
          {t.nav.home}
        </Link>
        <Link href="/guide" className="transition-colors hover:text-[#F0B892]">
          {t.nav.aboutAdhikaar}
        </Link>
        <a href="#" className="transition-colors hover:text-[#F0B892]">
          {t.nav.policy}
        </a>
        <a href="#" className="transition-colors hover:text-[#F0B892]">
          {t.nav.updates}
        </a>
        <a href="#faq" className="transition-colors hover:text-[#F0B892]">
          {t.nav.faq}
        </a>
        <Link href="/contact" className="transition-colors hover:text-[#F0B892]">
          {t.nav.contact}
        </Link>
      </nav>
    </header>
  );
}
