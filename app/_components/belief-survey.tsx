"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * The one survey question.
 *
 * The product's headline metric is the belief correction rate — the share who
 * arrive believing a succession certificate is needed and leave knowing it is
 * not. That cannot be inferred from behaviour, so it has to be asked, and this
 * is the only question the site ever asks that is not part of the answer.
 *
 * Three decisions worth defending:
 *
 * 1. It is asked immediately under the verdict, not at the bottom. The belief
 *    it measures is the one they walked in with, and it decays the further
 *    they read.
 * 2. It only appears on the good-news verdicts. On `/no-nominee/over-threshold`
 *    the honest answer is "you may well need one", so asking whether they
 *    expected to need one measures nothing.
 * 3. It records an answer and nothing else. No follow-up, no email field, no
 *    "tell us more". One tap, then it gets out of the way.
 */
export function BeliefSurvey({ outcome }: { outcome: string }) {
  const [answered, setAnswered] = useState<string | null>(null);

  const answer = (value: "yes" | "no" | "unsure") => {
    setAnswered(value);
    track("survey_answered", { believed_certificate_needed: value, outcome });
  };

  if (answered) {
    return (
      <aside
        data-print="hide"
        className="mt-8 rounded-xl border border-rule bg-mist p-5"
      >
        <p className="body-fluid text-ink">
          {answered === "yes"
            ? "That is exactly why this page exists. Most people are told the same thing, and the rule changed on 31 March 2026."
            : answered === "no"
              ? "Good — you were ahead of most people. The rest of this page is the evidence to hand across the counter."
              : "Fair enough. The paragraphs below are the part to show the bank."}
        </p>
      </aside>
    );
  }

  return (
    <aside
      data-print="hide"
      className="mt-8 rounded-xl border border-rule bg-mist p-5"
    >
      <p className="body-fluid font-bold text-indigo-ink">
        Before you read this, did you think you needed a succession certificate?
      </p>
      <p className="mt-1 text-[0.9375rem] text-ink-soft">
        One tap. It is the only thing we ask, and it is not stored against you.
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {(
          [
            ["yes", "Yes, I thought I did"],
            ["no", "No, I knew I did not"],
            ["unsure", "I had no idea"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => answer(value)}
            className="rounded-pill border-2 border-indigo bg-white px-5 py-2.5 text-[1rem] font-bold text-indigo transition-colors hover:bg-indigo hover:text-white"
          >
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}
