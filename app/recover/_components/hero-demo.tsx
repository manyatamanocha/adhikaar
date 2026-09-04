"use client";

import { useState } from "react";
import { BankIcon, UmbrellaIcon, PfIcon, ArrowRightIcon } from "./icons";

/**
 * The hero's search bar. Rewritten 4 Sep 2026 late evening to match the
 * reference file's single white bar (one input, one button, inline) instead
 * of the earlier multi-field card floating beside the headline -- the
 * reference has no second field for "bank or institution", so this drops it
 * too, matching its exact rhythm.
 *
 * ─── The one claim this component may NOT make ───
 *
 * Adhikaar has no backend, no data source, and no API into any bank,
 * insurer or the RBI's UDGAM portal -- it cannot find anything. So the
 * reveal is a CHECKLIST of where to look, never a claimed result, and says
 * so in words directly under the panel: "This is a preview, not a live
 * search."
 */
export function HeroDemo() {
  const [stage, setStage] = useState<"idle" | "loading" | "done">("idle");
  const [name, setName] = useState("");

  const run = () => {
    if (stage !== "idle") return;
    setStage("loading");
    window.setTimeout(() => setStage("done"), 900);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 rounded-lg bg-white p-2 shadow-[0_12px_32px_rgba(0,0,0,0.22)] sm:flex-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="Enter your loved one's full name"
          disabled={stage !== "idle"}
          className="flex-1 rounded border-none px-4 py-3.5 text-[1rem] text-[#211D33] placeholder:text-[#8B8698] focus:outline-none disabled:opacity-60"
        />
        <button
          type="button"
          onClick={run}
          disabled={stage !== "idle"}
          className="whitespace-nowrap rounded bg-[#D9A441] px-7 py-3.5 text-[0.9375rem] font-bold text-[#1B1740] transition-colors hover:bg-[#EFCC85] disabled:opacity-70"
        >
          {stage === "idle" && "Search"}
          {stage === "loading" && "One moment…"}
          {stage === "done" && "Checklist ready"}
        </button>
      </div>
      <p className="mt-2.5 text-[0.8125rem] text-[#9C93BE]">
        Free to search. No account needed.
      </p>

      {/* Loading state: three shimmer rows, the same shape as the results
          that replace them -- so the transition reads as "resolving", not
          "swapping". */}
      <div
        aria-hidden={stage !== "loading"}
        className={`grid transition-[grid-template-rows] duration-500 ${
          stage === "loading" ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded bg-white/10"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ${
          stage === "done" ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden rounded-lg bg-white">
          <div className="border-b border-[#DCD5EE] px-5 py-3 text-[0.8125rem] text-[#5A5470]">
            A checklist for &ldquo;{name || "your search"}&rdquo; — for
            preview only, not a live search
          </div>
          <ul>
            {[
              { icon: BankIcon, label: "Bank deposits", note: "Worth checking with your bank" },
              { icon: UmbrellaIcon, label: "Insurance", note: "Check with the insurer directly" },
              { icon: PfIcon, label: "Provident fund", note: "EPFO has its own portal" },
            ].map((r, i) => (
              <li
                key={r.label}
                style={{
                  transitionDelay: stage === "done" ? `${i * 90}ms` : "0ms",
                }}
                className={`motion-safe:transition-all motion-safe:duration-500 flex items-center gap-3 border-b border-[#DCD5EE] px-5 py-3.5 last:border-0 ${
                  stage === "done"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 motion-safe:-translate-x-2"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2B2361]/8 text-[#2B2361]">
                  <r.icon className="h-[1.05rem] w-[1.05rem]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.875rem] font-bold text-[#2B2361]">
                    {r.label}
                  </span>
                  <span className="block text-[0.75rem] text-[#5A5470]">
                    {r.note}
                  </span>
                </span>
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-[#A39C8A]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
