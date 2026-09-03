/**
 * "Which of these do you already have?" — the readiness state.
 *
 * The mirror image of `asked.ts`. That file answers "the branch demanded this;
 * does the RBI actually prescribe it?" This one answers "here is what the RBI
 * prescribes; what have you got, and which missing one should you start today?"
 *
 * ─── Why this compares against the outcome's own list ───
 *
 * Same discipline as `asked.ts`, for the same reason: the list is always the one
 * that applies to THIS claim — three documents under para 9, six under para
 * 10(a) — never a global `DOCUMENTS[id].prescribed` flag. A nominee claimant
 * ticking off six documents would be working through a list that does not apply
 * to them, and would go to the branch believing they were four documents short
 * when in fact they were ready.
 *
 * ─── Why "start today" is not just `startFirst` ───
 *
 * `startFirst` is a single boolean on one document. It answers "what is the long
 * pole?" but it cannot answer "what is the long pole among the ones still
 * missing", which is the only question worth asking once someone starts ticking.
 * So ordering runs on `leadDays`, and `startFirst` remains what it always was:
 * the static hint shown before anyone has ticked anything.
 *
 * Nothing here is stored. The ticks live in the URL, so this whole file is a
 * pure function of the query string and the page stays server-rendered.
 */

import { DOCUMENTS, type DocId } from "./documents";

export type Readiness = {
  /** How many documents this claim needs. */
  total: number;
  /** How many the claimant says they have. */
  haveCount: number;
  /** Still to get, longest lead time first. */
  missing: DocId[];
  /**
   * The missing document to start on today: the one with the longest lead time,
   * because everything else can be done while waiting for it. Null once nothing
   * is missing.
   */
  startToday: DocId | null;
  /** Every document on the applicable list is ticked. */
  complete: boolean;
  /** Nobody has ticked anything yet — show the static hint instead. */
  untouched: boolean;
};

/**
 * Parse the ticked list, constrained to the documents that actually apply.
 *
 * The constraint matters: a hand-edited URL must not be able to claim a document
 * that is not on this claim's list, or `haveCount` could exceed `total` and the
 * page would tell someone they have seven of six.
 */
export function parseHave(
  raw: string | string[] | undefined,
  applicable: DocId[],
): DocId[] {
  const s = Array.isArray(raw) ? raw.join(",") : (raw ?? "");
  const allowed = new Set<string>(applicable);
  const seen = new Set<string>();
  return s
    .split(",")
    .map((x) => x.trim())
    .filter((x) => allowed.has(x) && !seen.has(x) && seen.add(x)) as DocId[];
}

export function readiness(applicable: DocId[], have: DocId[]): Readiness {
  const has = new Set<string>(have);
  const missing = applicable
    .filter((id) => !has.has(id))
    // Longest lead time first, so the list itself reads as an order of work.
    .sort((a, b) => DOCUMENTS[b].leadDays - DOCUMENTS[a].leadDays);

  return {
    total: applicable.length,
    haveCount: applicable.filter((id) => has.has(id)).length,
    missing,
    startToday: missing[0] ?? null,
    complete: missing.length === 0,
    untouched: have.length === 0,
  };
}

/** Add or remove one document from the ticked list. */
export function toggleHave(list: DocId[], id: DocId): DocId[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}
