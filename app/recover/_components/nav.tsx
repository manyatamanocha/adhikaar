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
        <Link href="/" className="font-serif text-[1.375rem] font-bold text-[#5C1B28]">
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
              className="text-[0.9375rem] font-semibold text-[#5A4C4E] transition-colors hover:text-[#5C1B28]"
            >
              {l}
            </a>
          ))}
        </nav>

        <Link
          href="/start"
          className="rounded-full bg-[#5C1B28] px-5 py-2.5 text-[0.875rem] font-bold text-white transition-colors hover:bg-[#7A2838]"
        >
          Start a Search
        </Link>
      </div>
    </header>
  );
}
