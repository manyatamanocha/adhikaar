"use client";

/**
 * The funnel, as a real interactive bar chart -- replaced a numbered list
 * where each row carried its own decorative progress bar (dataviz skill:
 * "compare magnitude, low -> high" is a bar-chart job, and an interactive
 * HTML chart ships a hover layer by default, not as an upgrade).
 *
 * Single ordered series (one metric, four stages), not four categorical
 * series -- so it takes the sequential treatment (one hue family, a shade
 * per step) rather than a legend. Every value stays directly labelled and
 * visible without hovering; the hover/focus panel only adds the two numbers
 * a reader would otherwise have to compute by hand (share of visitors, and
 * the conversion rate into this stage), so the tooltip enhances, it never
 * gates -- nothing here is reachable only by hovering.
 */

import { useState } from "react";

type Stage = { label: string; value: number; note: string; icon: React.ReactNode };

function funnelWidth(value: number, max: number): string {
  if (!max) return "0%";
  return `${Math.min(100, Math.max(0, (value / max) * 100))}%`;
}

export function JourneyBarChart({ stages, shades }: { stages: Stage[]; shades: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(1, ...stages.map((s) => s.value));
  const first = stages[0]?.value ?? 0;

  return (
    <ol className="mt-6 space-y-6">
      {stages.map((s, i) => {
        const isActive = active === i;
        const shareOfFirst = first ? Math.round((s.value / first) * 1000) / 10 : null;
        const prev = i > 0 ? stages[i - 1].value : null;
        const rateFromPrev = prev ? Math.round((s.value / prev) * 1000) / 10 : null;
        return (
          <li key={s.label} className="flex gap-3 sm:gap-5">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-2.5 text-white"
              aria-hidden="true"
              style={{ background: shades[i] }}
            >
              {s.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-bold">{s.label}</h3>
                <span className="text-2xl font-bold tabular-nums">{s.value.toLocaleString("en-IN")}</span>
              </div>
              {/* The mark: <=24px thick, 4px rounded at the moving end, square
                  at the baseline, one shared scale (max) across every bar so
                  lengths are directly comparable. The row itself is the hit
                  target -- bigger than the bar alone -- for hover and
                  keyboard focus alike. */}
              <button
                type="button"
                className={`mt-2.5 block w-full rounded-[4px] text-left outline-none ${isActive ? "ring-2 ring-indigo/40" : ""}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                aria-describedby={`journey-stage-${i}`}
              >
                <span aria-hidden="true" className="block h-4 overflow-hidden rounded-[4px] bg-[#EFEEE9]">
                  <span
                    className={`block h-full rounded-r-[4px] transition-[filter] ${isActive ? "brightness-110" : ""}`}
                    style={{ width: funnelWidth(s.value, max), background: shades[i] }}
                  />
                </span>
              </button>
              <p className="mt-2 text-base leading-6 text-ink-soft">{s.note}</p>
              {/* Enhancement, not a gate: both numbers here are derivable from
                  the values already on the page, this just saves the mental
                  math. Rendered in-flow rather than a floating tooltip, so it
                  never has to fight viewport edges on a phone. */}
              <p
                id={`journey-stage-${i}`}
                className={`grid text-sm font-semibold text-indigo transition-[grid-template-rows,opacity,margin] duration-150 ${
                  isActive ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <span className="overflow-hidden">
                  {shareOfFirst !== null && `${shareOfFirst}% of visitors got this far`}
                  {shareOfFirst !== null && rateFromPrev !== null && " · "}
                  {rateFromPrev !== null && `${rateFromPrev}% of the previous stage`}
                </span>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
