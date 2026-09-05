/** URL-based guidance. Unknown facts never establish eligibility.
 * Source: RBI deceased-customer directions, paragraphs 7–11.
 * Answers are sent in page URLs; never put names or account numbers here.
 */
import type { OutcomeId } from "./outcomes";

export type QuestionId = "claiming" | "court" | "nominee" | "will" | "heirs" | "bankType" | "amount";
export type Answers = Partial<{
  claiming: "deposit" | "locker" | "pension" | "other" | "minor";
  court: "yes" | "no" | "unknown";
  nominee: "yes" | "survivorship" | "no" | "unknown";
  will: "yes" | "no" | "unknown";
  heirs: "agree" | "dispute" | "unknown";
  bankType: "commercial" | "cooperative" | "unknown";
  amount: "under" | "equal" | "over" | "unknown";
}>;
export type Option = { value: string; label: string; detail?: string; unsure?: boolean };
export type Question = { id: QuestionId; number: number; prompt: string; help: string; options: Option[] };
const unknown: Option = { value: "unknown", label: "I don't know yet", unsure: true };
export const QUESTION_ORDER: QuestionId[] = ["claiming", "court", "nominee", "will", "heirs", "bankType", "amount"];
export const TOTAL_QUESTIONS = QUESTION_ORDER.length;
export const QUESTIONS: Record<QuestionId, Question> = {
  claiming: {
    id: "claiming", number: 1, prompt: "What are you claiming?",
    help: "This guide covers a deceased adult's bank deposits claimed by an adult. Other assets need different procedures.",
    options: [
      { value: "deposit", label: "A bank account or fixed deposit", detail: "Savings, current, recurring or fixed deposits at a bank." },
      { value: "locker", label: "A bank locker or articles in safe custody", detail: "Locker access and inventory follow a separate process, not this deposit checklist." },
      { value: "pension", label: "A government or family pension" },
      { value: "other", label: "Insurance, provident fund, shares, post office savings or property" },
      { value: "minor", label: "The claimant is under 18, or acting through a guardian" },
    ],
  },
  court: {
    id: "court", number: 2, prompt: "Is there a court order restricting payment?",
    help: "A court order preventing payment must be addressed before the bank can settle. Ask the bank if you are unsure; simply having a court case is not the same as a restraining order.",
    options: [{ value: "no", label: "No known order restricting payment" }, { value: "yes", label: "Yes, payment is restricted by a court order" }, unknown],
  },
  nominee: {
    id: "nominee", number: 3, prompt: "Was a nominee registered on the account?",
    help: "Check the bank's records. On a joint account, payment to a nominee arises only after all depositors have died; a surviving holder may instead qualify under the survivorship clause.",
    options: [
      { value: "yes", label: "Yes, there is a registered nominee", detail: "The sole account holder, or all joint depositors, have died." },
      { value: "survivorship", label: "A joint holder survives and there is a survivorship clause", detail: "For example, 'either or survivor', subject to the account mandate." },
      { value: "no", label: "No nominee or applicable survivorship clause" }, unknown,
    ],
  },
  will: {
    id: "will", number: 4, prompt: "Did the person leave a will?",
    help: "Without a nominee or survivorship clause, a will changes the documentation route. Do not assume there was no will if you have not checked.",
    options: [{ value: "no", label: "No will was left" }, { value: "yes", label: "Yes, there is a will" }, unknown],
  },
  heirs: {
    id: "heirs", number: 5, prompt: "Do all the legal heirs agree?",
    help: "The no-nominee simplified route requires no contesting claim. If someone disputes the claim, get advice before relying on a standard checklist.",
    options: [{ value: "agree", label: "Yes, nobody is contesting the claim" }, { value: "dispute", label: "No, the claim is disputed" }, unknown],
  },
  bankType: {
    id: "bankType", number: 6, prompt: "What type of bank holds the deposits?",
    help: "The RBI threshold is ₹5 lakh for co-operative banks and ₹15 lakh for other banks. A bank may set a higher limit. Ask the branch to confirm its current policy.",
    options: [{ value: "commercial", label: "A commercial bank", detail: "For example, SBI, PNB, HDFC Bank or ICICI Bank." }, { value: "cooperative", label: "A co-operative bank" }, unknown],
  },
  amount: {
    id: "amount", number: 7, prompt: "What is the total payable at this bank?",
    help: "Include all the person's deposits at this bank and accrued interest. Deposits at another bank are assessed separately.",
    options: [{ value: "under", label: "Below the threshold" }, { value: "equal", label: "Exactly at the threshold" }, { value: "over", label: "Above the threshold" }, unknown],
  },
};

export function questionFor(id: QuestionId, a: Answers): Question {
  if (id !== "amount") return QUESTIONS[id];
  const limit = a.bankType === "cooperative" ? "₹5 lakh" : "₹15 lakh";
  return { ...QUESTIONS.amount, help: QUESTIONS.amount.help + " A higher published bank limit may change the route.",
    options: QUESTIONS.amount.options.map(o => o.value === "unknown" ? o : {
      ...o, label: o.value === "under" ? `Less than ${limit}` : o.value === "equal" ? `Exactly ${limit}` : `More than ${limit}`,
    }),
  };
}
export type Resolution =
  | { kind: "question"; question: Question }
  | { kind: "review"; carry: Answers }
  | { kind: "outcome"; outcome: OutcomeId; carry: Answers };

export function resolve(a: Answers): Resolution {
  const ask = (id: QuestionId): Resolution => ({ kind: "question", question: questionFor(id, a) });
  const review = (): Resolution => ({ kind: "review", carry: a });
  const done = (outcome: OutcomeId): Resolution => ({ kind: "outcome", outcome, carry: a });
  if (!a.claiming) return ask("claiming");
  if (a.claiming !== "deposit") return done("out-of-scope");
  if (!a.court) return ask("court");
  if (a.court !== "no") return review();
  if (!a.nominee) return ask("nominee");
  if (a.nominee === "unknown") return done("unknown-nominee");
  // A known dispute needs individual review, not a blanket statement that a
  // valid nominee must obtain succession documents.
  if (a.heirs === "dispute" && a.nominee !== "no") return review();
  if (a.nominee === "yes") return done("nominee");
  if (a.nominee === "survivorship") return done("survivorship");
  if (!a.will) return ask("will");
  if (a.will !== "no") return review();
  if (!a.heirs) return ask("heirs");
  if (a.heirs === "dispute") return done("dispute");
  if (a.heirs === "unknown") return review();
  if (!a.bankType) return ask("bankType");
  if (a.bankType === "unknown") return review();
  if (!a.amount) return ask("amount");
  // Para 10 opens with "less than"; 10(a) says "up to". At equality, confirm.
  if (a.amount === "unknown" || a.amount === "equal") return review();
  return done(a.amount === "over" ? "over-threshold" : "under-threshold");
}
export function parseAnswers(sp: Record<string, string | string[] | undefined>): Answers {
  const a: Answers = {};
  for (const id of QUESTION_ORDER) {
    const raw = sp[id];
    const v = Array.isArray(raw) ? raw[0] : raw;
    if (v && QUESTIONS[id].options.some(o => o.value === v)) Object.assign(a, { [id]: v });
  }
  return a;
}
export function toQuery(a: Answers): string {
  const q = new URLSearchParams();
  for (const id of QUESTION_ORDER) if (a[id]) q.set(id, a[id]!);
  return q.size ? `?${q}` : "";
}
/** Changing an earlier answer invalidates later facts (especially bank/amount). */
export function answerQuestion(a: Answers, id: QuestionId, value: string): Answers {
  // Filling a missing court check must not erase a scenario's known dispute
  // or nominee. Bank/amount is different: a new bank type invalidates a
  // previously selected numeric category, including old bookmarked URLs.
  if (a[id] === undefined && id !== "bankType") return parseAnswers({ ...a, [id]: value });
  const next: Answers = {};
  for (const key of QUESTION_ORDER.slice(0, QUESTION_ORDER.indexOf(id))) {
    if (a[key]) Object.assign(next, { [key]: a[key] });
  }
  return parseAnswers({ ...next, [id]: value });
}
export function previousAnswers(a: Answers): Answers | null {
  const answered = QUESTION_ORDER.filter(id => a[id]);
  if (!answered.length) return null;
  const previous = { ...a };
  delete previous[answered[answered.length - 1]];
  return previous;
}
