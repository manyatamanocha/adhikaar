/**
 * The wordmark -- redrawn 9 Sep 2026 as a single flat coin disc merged with
 * the "A" of "Adhikaar" (the A is cut out of the disc as negative space).
 * Replaces two earlier attempts: a three-petal leaf SVG, then a raster
 * illustrated badge (hand, coins, document, leaf, heart ring) that was too
 * detailed to read at nav size and couldn't support a letterform cutout.
 * Colour lifted from that badge's own coin/ring tones (#D9A441 / #B8862E)
 * so the identity carries over even though the artwork doesn't.
 *
 * One SVG unit for the whole "Adhikaar" lockup, not an icon beside a text
 * node -- the mark and the A are the same shape, so they can't be split
 * into separate elements. `role="img"` + `aria-label` keep it announced as
 * the word "Adhikaar" rather than as its component paths.
 */
export function AdhikaarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 90" role="img" aria-label="Adhikaar" className={className}>
      <defs>
        <mask id="adhikaar-mark-a-cut">
          <rect x="0" y="0" width="90" height="90" fill="white" />
          <text x="6" y="70" className="font-serif font-bold" fontSize="52" fill="black">
            A
          </text>
        </mask>
      </defs>
      <circle cx="45" cy="45" r="42" fill="#D9A441" mask="url(#adhikaar-mark-a-cut)" />
      <circle cx="45" cy="45" r="42" fill="none" stroke="#B8862E" strokeWidth="2" />
      <text x="46" y="70" className="font-serif font-bold" fontSize="48" fill="#16233F">
        dhikaar
      </text>
    </svg>
  );
}
