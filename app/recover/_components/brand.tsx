/**
 * The leaf mark -- adopted 5 Sep 2026 from a user-supplied reference image,
 * replacing the earlier compass glyph on this homepage. Three abstract
 * petal shapes in the product's own three brand colours (orange, navy,
 * gold) -- arbitrary by the same rule as the glyph it replaces: no state
 * emblem, no ministry mark, no tricolour, nothing that reads as official.
 */
export function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M16 16C16 8 11 3 5 3C5 11 9 16 16 16Z" fill="#E2653B" />
      <path d="M16 16C16 8 21 3 27 3C27 11 23 16 16 16Z" fill="#16233F" />
      <path d="M16 16C16 24 11 29 5 29C5 21 9 16 16 16Z" fill="#D9A441" />
    </svg>
  );
}
