"use client";

/**
 * "Was this helpful?" -- a satisfaction signal, not an action. Fires
 * feedback_helpful and is never counted toward Next-Step Action Rate; see
 * lib/metrics.ts's ACTION_EVENTS.
 */

import { useState } from "react";
import { track } from "@/lib/analytics";

export function FeedbackWidget({
  question,
  yes,
  no,
  thanks,
}: {
  question: string;
  yes: string;
  no: string;
  thanks: string;
}) {
  const [answered, setAnswered] = useState(false);

  function vote(helpful: boolean) {
    track("feedback_helpful", { helpful });
    setAnswered(true);
  }

  return (
    <div data-print="hide" className="mt-10 flex flex-wrap items-center gap-3 border-t border-rule pt-6">
      {answered ? (
        <p className="text-[0.9375rem] text-ink-soft">{thanks}</p>
      ) : (
        <>
          <p className="text-[0.9375rem] font-bold text-ink-soft">{question}</p>
          <button
            type="button"
            onClick={() => vote(true)}
            className="rounded-pill border-2 border-rule px-4 py-2 text-[0.9375rem] font-bold text-ink-soft transition-colors hover:border-indigo/50 hover:text-indigo-ink"
          >
            👍 {yes}
          </button>
          <button
            type="button"
            onClick={() => vote(false)}
            className="rounded-pill border-2 border-rule px-4 py-2 text-[0.9375rem] font-bold text-ink-soft transition-colors hover:border-indigo/50 hover:text-indigo-ink"
          >
            👎 {no}
          </button>
        </>
      )}
    </div>
  );
}
