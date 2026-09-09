"use client";

/**
 * A quiet, honest usage indicator on the homepage -- not the full /metrics
 * breakdown, which is deliberately off the public nav. Reads the same
 * public /api/metrics endpoint /metrics itself reads. Renders nothing until
 * a real number comes back: no placeholder, no fabricated figure, matching
 * this product's standing rule against inventing stats for empty states.
 */

import { useEffect, useState } from "react";

export function UniqueVisitorsBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/metrics")
      .then((res) => (res.ok ? res.json() : null))
      .then((body: unknown) => {
        if (cancelled || !body || typeof body !== "object") return;
        const funnel = (body as Record<string, unknown>).funnel;
        const visitors =
          funnel && typeof funnel === "object"
            ? (funnel as Record<string, unknown>).uniqueVisitors
            : undefined;
        if (typeof visitors === "number") setCount(visitors);
      })
      .catch(() => {
        // No network, no data yet: say nothing rather than guess.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <p className="mt-4 text-[0.8125rem] text-[#6B6255]">
      {count.toLocaleString("en-IN")} people visited Adhikaar in the last 30 days
    </p>
  );
}
