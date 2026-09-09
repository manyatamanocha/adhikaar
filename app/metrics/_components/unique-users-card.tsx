"use client";

/**
 * The one interactive tile on an otherwise server-rendered page --
 * everything else here is fixed to the reporting window /api/metrics
 * already computed server-side. This one owns its own window, refetching
 * /api/metrics/unique-visitors whenever the range changes.
 */

import { useEffect, useState } from "react";

const RANGES = [
  { label: "3 days", days: 3 },
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
] as const;

export function UniqueUsersCard() {
  const [days, setDays] = useState<number>(7);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/metrics/unique-visitors?days=${days}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((body: unknown) => {
        if (cancelled) return;
        const v = body && typeof body === "object" ? (body as Record<string, unknown>).uniqueVisitors : undefined;
        setCount(typeof v === "number" ? v : null);
      })
      .catch(() => {
        // No network, no data: show the dash state, not a guess.
        if (!cancelled) setCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, [days]);

  return (
    <article className="rounded-2xl border-2 border-rule bg-white p-5">
      <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Unique users</p>
      <p className="mt-2 font-serif text-[2.75rem] font-bold leading-none text-indigo-ink">
        {count === null ? "—" : count.toLocaleString("en-IN")}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Time range">
        {RANGES.map((r) => (
          <button
            key={r.days}
            type="button"
            onClick={() => setDays(r.days)}
            aria-pressed={days === r.days}
            className={`cursor-pointer rounded-full border-2 px-2.5 py-1 text-[0.75rem] font-bold transition-colors ${
              days === r.days
                ? "border-indigo bg-indigo text-white"
                : "border-rule text-ink-soft hover:border-indigo/50"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
        Distinct people, by a browser identifier, in the selected window.
      </p>
    </article>
  );
}
