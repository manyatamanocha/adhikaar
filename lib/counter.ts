/**
 * Counter mode — the five-line version of a verdict page, for someone
 * standing at the branch with a queue behind them.
 *
 * `say` is spoken, not written, so it stays a summary in our own words —
 * never inside quotation marks — and every fact in it already exists
 * elsewhere in outcomes.ts / rbi.ts. This file adds no new legal claims;
 * it only rephrases what OUTCOMES and CLAUSES already establish, shorter.
 *
 * "out-of-scope" has no entry: there is nothing to say at a bank counter
 * about a claim this product does not cover.
 */

import type { OutcomeId } from "./outcomes";

export type CounterScript = {
  /** One or two sentences the claimant can read out or hand over as text. */
  say: string;
};

export const COUNTER_SCRIPT: Partial<Record<OutcomeId, CounterScript>> = {
  nominee: {
    say:
      "There is a registered nominee on this account. Under paragraph 9 of the RBI's 2025 Directions, the bank should not ask for a succession certificate, probate, letter of administration, indemnity bond or surety — whatever the amount. Please give me the claim form for a nominee case.",
  },

  survivorship: {
    say:
      "This was a joint account with a survivorship clause. The same rule as for a nominee applies: under paragraph 9, no succession certificate, probate, indemnity bond or surety is required, whatever the amount. Please give me the claim form for a survivorship case.",
  },

  "unknown-nominee": {
    say:
      "I'd like to know first whether a nominee was registered on this account — please check your records and confirm in writing. If there is a nominee, paragraph 9 means no succession certificate is required, whatever the amount. If there is no nominee, the answer depends on the total amount and whether the heirs agree.",
  },

  "under-threshold": {
    say:
      "There is no nominee or survivorship clause, no will, no contesting claim and no known court restriction. The total including interest is below the applicable threshold. Please confirm these conditions and provide the paragraph 10(a) claim form and document list; that list does not include a succession certificate or third-party surety.",
  },

  "over-threshold": {
    say:
      "There is no nominee or survivorship clause, will, dispute or court restriction. Please confirm the aggregate payable and your current threshold. The RBI floor is ₹5 lakh for co-operative banks and ₹15 lakh for other banks, but your limit may be higher. If paragraph 10(b) applies, please explain the available documentation alternatives in writing.",
  },

  dispute: {
    say:
      "This claim has no nominee or survivorship clause and the legal heirs disagree. Please explain which court document applies under paragraph 11(b). We will seek qualified advice about the dispute rather than rely on the standard deposit checklist.",
  },

  "already-in-court": {
    say:
      "We started court proceedings before the RBI's 2025 Directions came into force on 31 March 2026. I'd like to understand whether, under paragraphs 9 and 10, these Directions change what your bank still requires from us.",
  },
};
