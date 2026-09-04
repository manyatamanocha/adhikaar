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
      "There was no nominee, but the total is below the threshold and the heirs agree. Under paragraph 10(a), you are required to settle this claim on a fixed list of six documents — a succession certificate is not one of them, and no third-party surety may be demanded. Please give me the simplified-procedure claim form.",
  },

  "over-threshold": {
    say:
      "There was no nominee and the total is at or above the threshold. I understand a succession certificate may genuinely apply here — could you confirm your bank's own threshold, since paragraph 7(h) allows it to be higher than the RBI's ₹15 lakh floor, and whether you will accept a legal heir certificate or affidavit instead, as paragraph 10(b) allows.",
  },

  dispute: {
    say:
      "The legal heirs are not in agreement about this claim. Under paragraph 11(b), I understand a court document — a probate, letter of administration, succession certificate or court order — is required here, whatever the amount or whether a nominee was registered.",
  },

  "already-in-court": {
    say:
      "We started court proceedings before the RBI's 2025 Directions came into force on 31 March 2026. I'd like to understand whether, under paragraphs 9 and 10, these Directions change what your bank still requires from us.",
  },
};
