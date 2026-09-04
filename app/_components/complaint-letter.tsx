"use client";

import { COMPLAINT_LETTER } from "@/lib/complaint-letter";

/**
 * Renders the letter as real, selectable text (never a locked image), plus
 * a client-side download as a plain .txt file. No server round-trip and no
 * data leaves the browser -- this is a Blob built from a string already
 * bundled into the page, not a fetch.
 */
export function ComplaintLetter() {
  return (
    <div>
      <pre className="body-fluid whitespace-pre-wrap rounded-xl border-2 border-indigo/25 bg-white p-6 font-sans leading-relaxed text-ink">
        {COMPLAINT_LETTER}
      </pre>
      <div data-print="hide" className="mt-5">
        <button
          type="button"
          onClick={downloadLetter}
          className="inline-flex items-center gap-2 rounded-pill bg-indigo px-6 py-3 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
        >
          Download as text file
        </button>
      </div>
    </div>
  );
}

function downloadLetter() {
  const blob = new Blob([COMPLAINT_LETTER], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "adhikaar-complaint-letter.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
