import Link from "next/link";

/**
 * A solid dark header, matching the reference file exactly -- no
 * scroll-transition, no CTA button on the right (the reference's header
 * carries only the wordmark and nav links; the CTA lives in the hero and
 * the closing band instead).
 */
export function RecoverNav() {
  return (
    <header className="bg-[#2B2361] text-white">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-serif text-[1.875rem] font-bold sm:text-[2.125rem]">
          {/* A brand mark, not an emblem -- an abstract compass-like glyph in
              the product's own two accent colours. No state or ministry
              association is possible to read into an arbitrary shape, which
              is exactly why it's arbitrary rather than referencing anything
              real (no ashoka chakra, no seal silhouette, no tricolour). */}
          <svg width="34" height="34" viewBox="0 0 26 26" aria-hidden="true">
            <circle cx="13" cy="13" r="11.5" stroke="#D9A441" strokeWidth="1.6" fill="none" />
            <path d="M13 6.5v3M13 16.5v3M6.5 13h3M16.5 13h3" stroke="#D9A441" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Adhikaar
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-6 text-[0.9375rem] sm:flex sm:gap-8">
          {[
            ["How it works", "#how"],
            ["Sources", "#sources"],
            ["FAQ", "#faq"],
            ["The full guide", "/guide"],
          ].map(([l, href]) => (
            <a
              key={l}
              href={href}
              className="text-[#D9CFF0] transition-colors hover:text-white"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
