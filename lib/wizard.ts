/**
 * The wizard.
 *
 * Four questions, at most. The nominee question short-circuits: para 9 resolves
 * nominee and survivorship outright at any amount, so those answers do not need
 * the amount or the dispute question.
 *
 * Design rules this file encodes:
 *   1. The out-of-scope exit fires FIRST. We would rather stop someone than give
 *      a bank-deposit answer to a pension or an insurance claim.
 *   2. "I don't know" is a real answer at every question and routes to the
 *      safest honest reading — never to a dead end.
 *   3. No state lives in a component. Every answer is a URL parameter, so Back
 *      works, a half-finished flow can be sent to a sibling, and nothing about
 *      the family is stored anywhere.
 */

import type { OutcomeId } from "./outcomes";

export type QuestionId = "claiming" | "nominee" | "amount" | "heirs";

export type Answers = Partial<{
  claiming: "deposit" | "pension" | "other" | "minor";
  nominee: "yes" | "survivorship" | "no" | "unknown";
  amount: "under" | "over" | "unknown";
  heirs: "agree" | "dispute" | "unknown";
}>;

export type Option = {
  value: string;
  label: string;
  /** One line under the label. Where a term is used, this is where it is glossed. */
  detail?: string;
  /** "I don't know" options are marked so the UI can set them apart without demoting them. */
  unsure?: boolean;
};

export type Question = {
  id: QuestionId;
  /** 1-based, for "Question 2 of 4". */
  number: number;
  prompt: string;
  /** Why we are asking, and anything needed to answer it honestly. */
  help: string;
  options: Option[];
};

export const TOTAL_QUESTIONS = 4;

export const QUESTIONS: Record<QuestionId, Question> = {
  claiming: {
    id: "claiming",
    number: 1,
    prompt: "What are you claiming?",
    help: "These Directions cover money held at a bank. If your claim is somewhere else, we will say so rather than give you a bank answer that does not apply.",
    options: [
      {
        value: "deposit",
        label: "A bank account, a fixed deposit, or a locker",
        detail:
          "Savings, current, recurring or fixed deposit held at a bank, or a safe deposit locker or articles in safe custody.",
      },
      {
        value: "pension",
        label: "A government or family pension",
        detail:
          "Pension runs on the department's own rules, not on these Directions.",
      },
      {
        value: "other",
        label:
          "Insurance, provident fund, shares, mutual funds, post office savings or property",
        detail: "Each of these is claimed from a different authority.",
      },
      {
        value: "minor",
        label:
          "The person claiming is under 18, or someone is acting as their guardian",
        detail:
          "A claim on behalf of a minor needs advice we are not in a position to give.",
      },
    ],
  },

  nominee: {
    id: "nominee",
    number: 2,
    prompt: "Was a nominee registered on the account?",
    help: "This is the one fact that decides everything else. If you are not sure, say so — it is the commonest answer, and there is something specific you can do about it.",
    options: [
      {
        value: "yes",
        label: "Yes, there is a registered nominee",
        detail:
          "Someone was named on the account, in the bank's records, to receive the balance.",
      },
      {
        value: "survivorship",
        label: "It was a joint account with a survivorship clause",
        detail:
          "The account says “either or survivor”, “former or survivor”, or “anyone or survivors”.",
      },
      {
        value: "no",
        label: "No, there was no nominee",
      },
      {
        value: "unknown",
        label: "I don't know",
        detail:
          "Most families do not. The bank can see it in the account-opening records, and we will show you how to ask.",
        unsure: true,
      },
    ],
  },

  amount: {
    id: "amount",
    number: 3,
    prompt: "Roughly how much is in the account?",
    help: "Add together every account the person held at that bank, including interest. Accounts held at a different bank are a separate claim with its own limit.",
    options: [
      {
        value: "under",
        label: "Less than ₹15 lakh in total",
        detail:
          "₹5 lakh if it is a co-operative bank. A bank is allowed to set its limit higher than the RBI's floor, and some have.",
      },
      {
        value: "over",
        label: "₹15 lakh or more in total",
        detail:
          "Check your own bank's limit before settling on this — it may be higher.",
      },
      {
        value: "unknown",
        label: "I don't know yet",
        detail:
          "The bank can tell you the balance. We will show you the route for a claim below the limit, and how to check where the line falls at your bank.",
        unsure: true,
      },
    ],
  },

  heirs: {
    id: "heirs",
    number: 4,
    prompt: "Do all the legal heirs agree?",
    help: "Everything else on this site assumes nobody is contesting the claim. Where the heirs are in dispute, a court document is required — and that overrides every other answer.",
    options: [
      {
        value: "agree",
        label: "Yes — nobody is contesting the claim",
      },
      {
        value: "dispute",
        label: "No — there is a disagreement between the heirs",
      },
      {
        value: "unknown",
        label: "I don't know",
        detail:
          "We will show you the route that applies where there is no dispute, and flag plainly what changes if one appears.",
        unsure: true,
      },
    ],
  },
};

export const QUESTION_ORDER: QuestionId[] = [
  "claiming",
  "nominee",
  "amount",
  "heirs",
];

export type Resolution =
  | { kind: "question"; question: Question }
  | { kind: "outcome"; outcome: OutcomeId; carry: Answers };

/**
 * Given the answers so far, what comes next — the next question, or a verdict.
 *
 * Deliberately a pure function of the answers. There is no hidden step counter:
 * the URL is the whole state, so an incomplete or hand-edited URL still resolves
 * to the right question rather than to an error.
 */
export function resolve(a: Answers): Resolution {
  if (!a.claiming) return { kind: "question", question: QUESTIONS.claiming };

  // Rule 1: stop before answering anything we do not cover.
  if (a.claiming !== "deposit") {
    return { kind: "outcome", outcome: "out-of-scope", carry: a };
  }

  // Para 11(b) overrides EVERYTHING below it, including para 9 — a dispute
  // answer known this early (e.g. carried in from a scenario-card preset)
  // must win before the nominee short-circuit ever runs. Without this, a
  // "yes, nominee" answer after "heirs disagree" silently discarded the
  // dispute and gave the nominee verdict its cheerful headline instead of
  // the accurate one — the corrective caveat still showed further down the
  // /nominee page, but the headline itself was wrong for that person.
  if (a.heirs === "dispute") {
    return { kind: "outcome", outcome: "dispute", carry: a };
  }

  if (!a.nominee) return { kind: "question", question: QUESTIONS.nominee };

  // Para 9 is unconditional — no threshold test, no heir test. Short-circuit.
  if (a.nominee === "yes") {
    return { kind: "outcome", outcome: "nominee", carry: a };
  }
  if (a.nominee === "survivorship") {
    return { kind: "outcome", outcome: "survivorship", carry: a };
  }

  if (!a.amount) return { kind: "question", question: QUESTIONS.amount };
  if (!a.heirs) return { kind: "question", question: QUESTIONS.heirs };
  // a.heirs === "dispute" is already handled above, before the nominee
  // short-circuit — by the time we reach here it can only be "agree" or
  // "unknown".

  // Nominee unknown: the amount and dispute answers still narrow the second
  // half of that page, so they are carried through rather than discarded.
  if (a.nominee === "unknown") {
    return { kind: "outcome", outcome: "unknown-nominee", carry: a };
  }

  // "I don't know" on the amount takes the below-threshold route. That page
  // carries a hard, uncollapsible caveat that the threshold is the aggregate
  // and that the bank's own limit may be higher — so the reading is honest,
  // and it does not send anyone toward a court they may not need.
  if (a.amount === "over") {
    return { kind: "outcome", outcome: "over-threshold", carry: a };
  }
  return { kind: "outcome", outcome: "under-threshold", carry: a };
}

/** Parse a URL query into answers, discarding anything not a known value. */
export function parseAnswers(
  sp: Record<string, string | string[] | undefined>,
): Answers {
  const one = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const pick = <T extends string>(k: string, allowed: readonly T[]) => {
    const v = one(k);
    return v && (allowed as readonly string[]).includes(v)
      ? (v as T)
      : undefined;
  };

  return {
    claiming: pick("claiming", ["deposit", "pension", "other", "minor"] as const),
    nominee: pick("nominee", ["yes", "survivorship", "no", "unknown"] as const),
    amount: pick("amount", ["under", "over", "unknown"] as const),
    heirs: pick("heirs", ["agree", "dispute", "unknown"] as const),
  };
}

/** Serialise answers back to a query string, in question order. */
export function toQuery(a: Answers): string {
  const q = new URLSearchParams();
  for (const id of QUESTION_ORDER) {
    const v = a[id];
    if (v) q.set(id, v);
  }
  const s = q.toString();
  return s ? `?${s}` : "";
}

/** The answers as they were one question earlier — powers the Back link. */
export function previousAnswers(a: Answers): Answers | null {
  const answered = QUESTION_ORDER.filter((id) => a[id]);
  if (answered.length === 0) return null;
  const dropped = answered[answered.length - 1];
  const { [dropped]: _removed, ...rest } = a;
  void _removed;
  return rest;
}
