"use client";

/**
 * The only client component in the product.
 *
 * The page IS the artifact — Ctrl+P is the real mechanism, and this button
 * exists because a phone user has no Ctrl+P. It is hidden in print by the
 * `button` rule in the print stylesheet, and the page loses nothing if the
 * JavaScript never arrives.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-pill bg-saffron px-6 py-3 text-[1.0625rem] font-bold text-indigo-ink transition-colors hover:bg-[#ab6314]"
    >
      <PrinterIcon />
      Print this page
    </button>
  );
}

function PrinterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4.5 6V2.5h7V6M4.5 12H3a1 1 0 01-1-1V7a1 1 0 011-1h10a1 1 0 011 1v4a1 1 0 01-1 1h-1.5M4.5 9.5h7v4h-7v-4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
