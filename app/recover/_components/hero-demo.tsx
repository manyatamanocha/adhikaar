"use client";

import { useState } from "react";
import { BankIcon, UmbrellaIcon, PfIcon, SearchIcon, ArrowRightIcon } from "./icons";

/**
 * The hero's product visual: a real, interactive mock of the first screen of
 * the actual wizard, not a stock photograph and not a static illustration.
 *
 * ─── The one claim this component may NOT make ───
 *
 * The brief this was built from shows the reveal as "3 possible assets
 * found -- Bank Deposit, Possible Match." Adhikaar has no backend, no data
 * source, and no API into any bank, insurer or the RBI's UDGAM portal (which
 * has none for third parties either) -- it cannot find anything. Showing a
 * fabricated "match" would present a capability that does not exist as if it
 * were real, which is the same category of error this product's own safety
 * rules exist to prevent elsewhere (quote-and-cite-never-assert; a null is a
 * better answer than a guess).
 *
 * So the reveal is a CHECKLIST of where to look, not a list of results, and
 * says so in words directly under the panel: "This is a preview, not a live
 * search." The interaction, the motion, and the panel are as ambitious as
 * the brief asked for; the claim inside it is not.
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
    <div className="w-full max-w-[26rem] rounded-[1.75rem] border border-[#E4DCC8] bg-white p-2 shadow-[0_28px_60px_-24px_rgba(15,25,50,0.35)]">
      <div className="rounded-[1.4rem] bg-[#FBF8F2] p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D98E2B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E4DCC8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E4DCC8]" />
          <p className="ml-auto text-[0.75rem] font-semibold tracking-[0.02em] text-[#6E6062]">
            adhikaar.in/start
          </p>
        </div>

        <p className="mt-5 text-[0.9375rem] font-bold text-[#5C1B28]">
          Tell us who you&apos;re searching for
        </p>

        <label className="mt-4 block">
          <span className="text-[0.8125rem] font-semibold text-[#5A4C4E]">
            Full name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ramesh Kumar Sharma"
            disabled={stage !== "idle"}
            className="mt-1.5 w-full rounded-xl border border-[#E4DCC8] bg-white px-3.5 py-3 text-[0.9375rem] text-[#5C1B28] placeholder:text-[#A39C8A] focus:border-[#5C1B28] focus:outline-none focus:ring-2 focus:ring-[#5C1B28]/15 disabled:opacity-60"
          />
        </label>

        <label className="mt-3 block">
          <span className="text-[0.8125rem] font-semibold text-[#5A4C4E]">
            Bank or institution{" "}
            <span className="font-normal text-[#A39C8A]">(optional)</span>
          </span>
          <input
            placeholder="If you know it"
            disabled={stage !== "idle"}
            className="mt-1.5 w-full rounded-xl border border-[#E4DCC8] bg-white px-3.5 py-3 text-[0.9375rem] text-[#5C1B28] placeholder:text-[#A39C8A] focus:border-[#5C1B28] focus:outline-none focus:ring-2 focus:ring-[#5C1B28]/15 disabled:opacity-60"
          />
        </label>

        <button
          type="button"
          onClick={run}
          disabled={stage !== "idle"}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5C1B28] py-3.5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#7A2838] disabled:opacity-70"
        >
          <SearchIcon className="h-4 w-4" />
          {stage === "idle" && "Preview my checklist"}
          {stage === "loading" && "One moment…"}
          {stage === "done" && "Checklist ready"}
        </button>

        {/* Loading state: three shimmer rows, the same shape as the results
            that replace them -- so the transition reads as "resolving",
            not "swapping". */}
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
                  className="h-14 animate-pulse rounded-xl bg-[#EFE9D9]"
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
          <div className="overflow-hidden">
            <ul className="space-y-2">
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
                  className={`motion-safe:transition-all motion-safe:duration-500 flex items-center gap-3 rounded-xl border border-[#E4DCC8] bg-white p-3 ${
                    stage === "done"
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 motion-safe:-translate-x-2"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5C1B28]/8 text-[#5C1B28]">
                    <r.icon className="h-[1.05rem] w-[1.05rem]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.875rem] font-bold text-[#5C1B28]">
                      {r.label}
                    </span>
                    <span className="block text-[0.75rem] text-[#6E6062]">
                      {r.note}
                    </span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-[#A39C8A]" />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.75rem] leading-relaxed text-[#6E6062]">
              A preview, not a live search. The real version asks a few more
              questions and gives you a checklist to work through.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
