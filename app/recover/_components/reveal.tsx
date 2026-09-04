"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The one authored motion moment, reused: a section rises 14px and settles
 * in with an exponential ease-out as it crosses into view. Not scattered --
 * every section on this page uses this same primitive, so the page has one
 * motion signature rather than a different effect per block.
 *
 * ─── Visible by default, not visible-if-JS-runs ───
 *
 * The first version of this component rendered hidden (opacity-0) in the
 * server HTML and depended on a client-side IntersectionObserver to ever
 * become visible. Two real failures came from that, found by looking at the
 * actual render rather than trusting the code: a hydration mismatch (the
 * lazy initial state read `window.matchMedia` differently on the server,
 * where `window` does not exist, than on the client), and -- independent of
 * that bug -- content that would have stayed permanently invisible for any
 * visitor without JavaScript, or a crawler, which this project has held as a
 * floor for every real page all session.
 *
 * So the default state now is VISIBLE. A client effect only switches an
 * element to "pending" (and therefore animates it in) when three things are
 * all true: JavaScript is running, the visitor has not asked for reduced
 * motion, and the element is not already on screen at load. Anything above
 * the fold, anyone without JS, and anyone with reduced motion all just see
 * the content -- the animation is a strict enhancement on top of that, never
 * a precondition for it.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entrance, setEntrance] = useState<"visible" | "pending" | "shown">(
    "visible",
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const alreadyOnScreen = el.getBoundingClientRect().top < window.innerHeight * 0.85;
    if (alreadyOnScreen) return;

    setEntrance("pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntrance("shown");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = entrance === "pending";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: entrance === "shown" ? `${delay}ms` : "0ms" }}
      className={`motion-safe:transition-[opacity,transform] motion-safe:duration-[620ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? "opacity-0 translate-y-3.5" : "opacity-100 translate-y-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
