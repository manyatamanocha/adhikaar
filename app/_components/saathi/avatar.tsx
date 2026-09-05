/**
 * Saathi's avatar -- a simple, flat illustrated character, not a photo and
 * not a mascot borrowed from a reference site. Deliberately schematic: a
 * rounded head, a draped dupatta in the brand's terracotta, on the navy
 * brand colour -- friendly and clearly a companion character ("saathi"
 * means companion/friend in Hindi) without pretending to be a real person
 * or leaning on any single regional dress as "Indian" shorthand.
 */
export function SaathiAvatar({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#16233F" />
      {/* Dupatta drape, behind the head */}
      <path
        d="M14 46c1-12 6-20 8-22 2 6 1 16-3 24-2 3-5 1-5-2Z"
        fill="#E2653B"
      />
      <path
        d="M50 46c-1-12-6-20-8-22-2 6-1 16 3 24 2 3 5 1 5-2Z"
        fill="#E2653B"
      />
      <path
        d="M18 20c3-6 9-9 14-9s11 3 14 9c2 4 1 9-2 13-3-6-9-10-12-10s-9 4-12 10c-3-4-4-9-2-13Z"
        fill="#F0B892"
      />
      {/* Face */}
      <circle cx="32" cy="30" r="12" fill="#FBE4D8" />
      <circle cx="27.5" cy="29" r="1.6" fill="#16233F" />
      <circle cx="36.5" cy="29" r="1.6" fill="#16233F" />
      <path
        d="M27 35c1.6 1.6 3.4 2.4 5 2.4s3.4-.8 5-2.4"
        stroke="#16233F"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bindi */}
      <circle cx="32" cy="22.5" r="1.1" fill="#E2653B" />
    </svg>
  );
}
