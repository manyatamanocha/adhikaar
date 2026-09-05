"use client";

/**
 * The button behind the "Actionable Next-Step Rate" / "Next-Step Intent Rate"
 * metrics: the one deliberate signal that a reader felt ready to act on what
 * they were just shown, not just view it.
 *
 * Two flavours, matching the product's only two valid terminal states:
 *   - "claim_route" ("I'm ready to proceed") -- scrolls to the concrete
 *     checklist or evidence already on this same page. Nothing to navigate
 *     to; the reader is already looking at their answer.
 *   - "information_required" ("I know the answer now") -- a real navigation
 *     back into the wizard, carrying the answers so far, to continue once
 *     the missing fact is in hand.
 */

import Link from "next/link";
import { track } from "@/lib/analytics";

export function NextStepButton({
  href,
  label,
  outcomeType,
}: {
  href: string;
  label: string;
  outcomeType: "claim_route" | "information_required";
}) {
  return (
    <Link
      href={href}
      data-print="hide"
      onClick={() => track("next_step_intent", { outcome_type: outcomeType })}
      className="mt-4 inline-flex items-center gap-2 rounded-pill bg-indigo px-6 py-3 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
    >
      {label}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
