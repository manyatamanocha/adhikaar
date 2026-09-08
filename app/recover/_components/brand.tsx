import Image from "next/image";

/**
 * The mark -- swapped 9 Sep 2026 from the earlier three-petal leaf SVG to a
 * user-supplied illustrated badge (hand, coins, document, leaf, heart ring)
 * at `/public/adhikaar-mark.png`. Source PNG had a baked-in white square;
 * background keyed to transparent and cropped to the circle's bounding box
 * so it sits on whatever surface it's placed on (cream nav, dark footer).
 */
export function LeafMark({ className }: { className?: string }) {
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
