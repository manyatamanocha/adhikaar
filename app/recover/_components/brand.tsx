import Image from "next/image";

/**
 * The mark -- back to the user-supplied illustrated badge (hand, coins,
 * document, leaf, heart ring) at `/public/adhikaar-mark.png` on direct
 * instruction, after a detour through a custom-drawn coin-and-A merge (see
 * git history on this file). Source PNG had a baked-in white square;
 * background keyed to transparent and cropped to the circle's bounding box
 * so it sits on whatever surface it's placed on (cream nav, tan footer).
 *
 * This artwork's fine detail (coin edges, hand lines, leaf veins, cursive
 * text on the document) doesn't resolve at typical nav-icon sizes -- it
 * reads as an abstract circular badge rather than showing its parts, which
 * is why it's sized noticeably larger here than a typical nav icon.
 */
export function AdhikaarMark({ className }: { className?: string }) {
  return (
    <Image
      src="/adhikaar-mark.png"
      alt=""
      aria-hidden="true"
      width={128}
      height={130}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
