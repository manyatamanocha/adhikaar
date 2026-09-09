"use client";

/**
 * The headline numbers animate too, not just the bars underneath them --
 * direct feedback after the bar-grow animation shipped: the big KPI figures
 * (Journeys reached this week, Journey resolution rate, etc.) looked
 * unchanged because a static number has nothing to animate on its own.
 *
 * requestAnimationFrame, not a CSS counter -- CSS has no native way to
 * interpolate a displayed number, only a translated/scaled element.
 * Respects prefers-reduced-motion by jumping straight to the final value.
 */

import { useEffect, useState } from "react";

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // Assume motion is fine if the media query itself can't be read.
    }
    const duration = reduced ? 0 : 900;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <>
      {display.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </>
  );
}

/** `CountUp`, but for a value that might not exist yet -- renders the same
 * em dash `pct()` already uses for "not enough data", never a fake 0%. */
export function AnimatedValue({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number | null;
  decimals?: number;
  suffix?: string;
}) {
  if (value === null) return <>—</>;
  return <CountUp value={value} decimals={decimals} suffix={suffix} />;
}
