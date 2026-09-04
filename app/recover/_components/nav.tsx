"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Sticky nav with a subtle background transition on scroll -- transparent
    over the hero, solid once the visitor has moved past it. */
export function RecoverNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[#E4DCC8] bg-[#FBF8F2]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-serif text-[1.375rem] font-bold text-[#16233F]">
          {/* A brand mark, not an emblem -- an abstract compass-like glyph in
              the product's own two accent colours. No state or ministry
              association is possible to read into an arbitrary shape, which
              is exactly why it's arbitrary rather than referencing anything
              real (no ashoka chakra, no seal silhouette, no tricolour). */}
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <circle cx="13" cy="13" r="11.5" stroke="#16233F" strokeWidth="1.6" fill="none" />
            <path d="M13 6.5v3M13 16.5v3M6.5 13h3M16.5 13h3" stroke="#16233F" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="13" cy="13" r="3" fill="#BE7519" />
          </svg>
          Adhikaar
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-8 lg:flex">
          {[
            ["How it works", "#how"],
            ["What you can recover", "#recover"],
            ["FAQs", "#trust"],
            ["The full guide", "/guide"],
          ].map(([l, href]) => (
            <a
              key={l}
              href={href}
              className="text-[0.9375rem] font-semibold text-[#3B4258] transition-colors hover:text-[#16233F]"
            >
              {l}
            </a>
          ))}
        </nav>

        <Link
          href="/start"
          className="rounded-full bg-[#16233F] px-5 py-2.5 text-[0.875rem] font-bold text-white transition-colors hover:bg-[#223055]"
        >
          Start a Search
        </Link>
      </div>
    </header>
  );
}
