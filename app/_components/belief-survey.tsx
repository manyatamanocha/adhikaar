"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import type { HomeDict } from "@/lib/i18n-home";

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
export function BeliefSurvey({ outcome, t }: { outcome: string; t: HomeDict["verdictPage"] }) {
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
          {answered === "yes" ? t.beliefReplyYes : answered === "no" ? t.beliefReplyNo : t.beliefReplyUnsure}
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
        {t.beliefQuestion}
      </p>
      <p className="mt-1 text-[0.9375rem] text-ink-soft">
        {t.beliefNote}
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {(
          [
            ["yes", t.beliefYes],
            ["no", t.beliefNo],
            ["unsure", t.beliefUnsure],
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
