/**
 * "What were you asked for?" — the set difference.
 *
 * The user ticks what the branch demanded. We split it into what the RBI
 * prescribes for their situation and what it does not, each item carrying its
 * paragraph reference.
 *
 * ─── Why this is not a lookup on `DOCUMENTS[id].prescribed` ───
 *
 * That flag describes the six-document list in para 10(a) — the no-nominee
 * case. It is the WRONG answer for a nominee claim, where para 9 forbids an
 * indemnity bond outright even though the same bond is prescribed under 10(a).
 * A single global flag would tell a nominee their indemnity bond was fine, and
 * tell a no-nominee claimant their indemnity bond was an overreach. Both wrong,
 * in opposite directions.
 *
 * So the comparison is always against the list that applies to THIS claim, and
 * the reason line names the paragraph that puts it there.
 *
 * At or above the threshold we refuse to run the comparison at all. Para 10(b)
 * lets the bank require more, so "not in the list" would be a false accusation
 * — and sending someone to argue with a bank on a wrong reading is the worst
 * thing this product could do.
 */

import { DOCUMENTS, NOMINEE_PROCEDURE, SIMPLIFIED_PROCEDURE, type DocId } from "./documents";
import { resolve, type Answers } from "./wizard";

export type Situation = "nominee" | "simplified" | "above-threshold" | "unknown";

export function situationFrom(a: Answers): Situation {
  const step = resolve(a);
  if (step.kind !== "outcome") return "unknown";
  if (step.outcome === "nominee" || step.outcome === "survivorship") return "nominee";
  if (step.outcome === "under-threshold") return "simplified";
  if (step.outcome === "over-threshold") return "above-threshold";
  return "unknown";
}

export const SITUATION_LABEL: Record<Situation, string> = {
  nominee: "A nominee or surviving joint holder is on record",
  simplified: "No nominee, and the total is below the threshold",
  "above-threshold": "No nominee, and the total is at or above the threshold",
  unknown: "Your claim route has not been confirmed yet",
};

/** The documents that apply to this claim. Nothing else is in the list. */
export function applicableList(s: Situation): DocId[] | null {
  if (s === "nominee") return NOMINEE_PROCEDURE;
  if (s === "simplified") return SIMPLIFIED_PROCEDURE;
  return null; // above-threshold and unknown: no comparison can honestly be run
}

export type Judgement = {
  id: DocId;
  inList: boolean;
  /** The paragraph that decides it, and what that paragraph says. */
  reason: string;
};

export function judge(s: Situation, ids: DocId[]): Judgement[] | null {
  const list = applicableList(s);
  if (!list) return null;

  return ids.map((id) => {
    // Annex I-E is satisfied by EITHER a legal heir certificate or a
    // declaration about the heirs. The declaration is not a separate demand.
    const inList =
      list.includes(id) ||
      (s === "simplified" && id === "heir-declaration");
    return { id, inList, reason: reasonFor(s, id, inList) };
  });
}

function reasonFor(s: Situation, id: DocId, inList: boolean): string {
  if (s === "nominee") {
    if (inList) {
      return "Para 9 settles a nominee or survivorship claim on the claim form, the death certificate and your own ID. This is one of them.";
    }
    if (
      id === "succession-certificate" ||
      id === "probate" ||
      id === "indemnity-bond" ||
      id === "third-party-surety"
    ) {
      return "Para 9 names this one: the bank shall not insist on a succession certificate, letter of administration or probate, or seek any bond of indemnity or surety — irrespective of the amount standing to the credit.";
    }
    return "Para 9 does not require this where a nominee or survivor is on record, and it is not among the documents the RBI's own claim form for those cases asks for.";
  }

  // simplified — no nominee, below the threshold
  if (inList) {
    if (id === "heir-declaration") {
      return "Para 10(a) accepts this as the alternative to a legal heir certificate, under Annex I-E. Either one satisfies the list, and this one is much faster.";
    }
    return "This is one of the six documents para 10(a) lists. The bank shall settle the claim on that list.";
  }
  if (id === "third-party-surety") {
    return "Para 10(a): “No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit.”";
  }
  if (id === "succession-certificate" || id === "probate") {
    return "Not among the six documents in para 10(a). Para 10(b) reserves a succession certificate for claims at or above the threshold, and para 11(b) for cases where the heirs are in dispute.";
  }
  if (id === "affidavit") {
    return "Para 10(b) offers an affidavit sworn before an official for claims at or above the threshold. It is not in the para 10(a) list for claims below it.";
  }
  if (id === "vanshavali") {
    return "Not among the six. What para 10(a) lists is a legal heir certificate OR a declaration regarding the heirs — Annex I-E.";
  }
  return "Not among the six documents para 10(a) lists for the simplified procedure.";
}

/** Parse the ticked list from a comma-joined query parameter. */
export function parseAsked(raw: string | string[] | undefined): DocId[] {
  const s = Array.isArray(raw) ? raw.join(",") : (raw ?? "");
  const valid = new Set(Object.keys(DOCUMENTS));
  return s
    .split(",")
    .map((x) => x.trim())
    .filter((x) => valid.has(x)) as DocId[];
}

export function toggle(list: DocId[], id: DocId): DocId[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}
