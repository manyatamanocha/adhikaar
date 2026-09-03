/**
 * The document catalogue.
 *
 * Every document a claimant might be told to bring — the ones the RBI actually
 * prescribes, and the ones branches ask for that it does not.
 *
 * `prescribed` drives the "What were you asked for?" comparison. It is the
 * single most load-bearing field in the file: if it is wrong, the product tells
 * someone a legitimate demand is illegitimate, and they argue with a bank and lose.
 *
 * Plain-English `name` first, official name in `official`. Never show a bare
 * annexure reference without the plain name beside it.
 */

export type DocId =
  | "claim-form"
  | "death-certificate"
  | "id-proof"
  | "indemnity-bond"
  | "disclaimer-letter"
  | "legal-heir-certificate"
  | "heir-declaration"
  | "succession-certificate"
  | "third-party-surety"
  | "witnesses"
  | "vanshavali"
  | "affidavit"
  | "probate";

export type ClaimDoc = {
  id: DocId;
  /** Plain English. This is what the user reads. */
  name: string;
  /** The official name, shown in brackets after the plain one. */
  official?: string;
  /** Is this in the RBI's prescribed list for the simplified procedure? */
  prescribed: boolean;
  /** Where you get it. */
  from: string;
  /** Realistic cost. Never optimistic. */
  cost: string;
  /** Realistic time. Never optimistic. */
  time: string;
  /**
   * The worst case of `time`, in days, for ORDERING ONLY.
   *
   * This number is never rendered — `time` is the string a user reads, and it
   * keeps the range and the caveats. This exists so "start this one today" can
   * still answer correctly after the long pole has been ticked off: with only
   * the `startFirst` boolean there is no way to name the second-longest.
   *
   * Read off the `time` string above it, rounded to the pessimistic end. Where
   * a document waits on people rather than on a process (the no-objection
   * letter), the figure is a placeholder for "not instant", not a prediction.
   */
  leadDays: number;
  /** One line on what it is, for someone who has never heard of it. */
  what: string;
  /** Shown when the bank asks for something it should not. */
  note?: string;
  /** Start this one first — it is the long pole. */
  startFirst?: boolean;
  url?: string;
};

export const DOCUMENTS: Record<DocId, ClaimDoc> = {
  "claim-form": {
    id: "claim-form",
    name: "The bank's claim form",
    official: "Annex I-A with a nominee, Annex I-B without one",
    prescribed: true,
    from: "Your bank — branch or its website",
    cost: "Free",
    time: "Same day",
    leadDays: 0,
    what:
      "The form that starts the claim. There are two versions: one if a nominee was registered, one if not. Ask for the right one by name.",
  },

  "death-certificate": {
    id: "death-certificate",
    name: "Death certificate",
    prescribed: true,
    from: "The municipal body or panchayat where the death was registered",
    cost: "Nominal",
    time: "7–14 days after applying",
    leadDays: 14,
    what:
      "The registered certificate of death. Get several certified copies — every institution wants to keep its own.",
    note: "Deaths must be registered within 21 days. After a year it needs a court order.",
  },

  "id-proof": {
    id: "id-proof",
    name: "Your own ID and address proof",
    official: "Officially Valid Document (OVD)",
    prescribed: true,
    from: "You already have it — Aadhaar, passport, voter ID or driving licence",
    cost: "Free",
    time: "Immediate",
    leadDays: 0,
    what: "Proof of who you are. This is about you, not the person who died.",
  },

  "indemnity-bond": {
    id: "indemnity-bond",
    name: "An indemnity bond you sign yourself",
    official: "Annex I-C",
    prescribed: true,
    from: "The bank provides the form",
    cost: "Stamp paper only",
    time: "Same day",
    leadDays: 0,
    what:
      "Your written undertaking to cover the bank if a rival claim appears later. You sign it. It is not the same as a surety.",
    note:
      "This is you signing for yourself. A bank asking a THIRD PERSON to stand as surety below the threshold is asking for something different — and para 10(a) says it shall not be obtained.",
  },

  "disclaimer-letter": {
    id: "disclaimer-letter",
    name: "A no-objection letter from the other heirs",
    official: "Annex I-D",
    prescribed: true,
    from: "The other legal heirs sign it",
    cost: "Free",
    time: "As long as it takes to reach them",
    // Waits on people, not on an office. Ranked above the same-day documents
    // so it is not left to last, below anything with a real queue.
    leadDays: 7,
    what:
      "The other heirs confirming they do not object to the money being released to you. Needed only where there are other heirs.",
  },

  "legal-heir-certificate": {
    id: "legal-heir-certificate",
    name: "Legal heir certificate",
    official: "Annex I-E accepts this OR a declaration",
    prescribed: true,
    from: "The Tehsildar or revenue office, or your state's e-district portal",
    cost: "₹20–200, varies by state",
    time: "30–45 days typically. Karnataka ~21, Tamil Nadu ~30, Maharashtra ~45",
    leadDays: 45,
    what:
      "A revenue officer's certificate naming the legal heirs. This is NOT a succession certificate and does not come from a court.",
    note:
      "Online in some states only. Timelines are service targets, not guarantees.",
    startFirst: true,
  },

  "heir-declaration": {
    id: "heir-declaration",
    name: "Or: a declaration about who the heirs are",
    official: "Annex I-E",
    prescribed: true,
    from: "A declaration by an independent person the bank accepts",
    cost: "Stamp paper only",
    time: "Days",
    leadDays: 3,
    what:
      "The alternative to a legal heir certificate. Para 10(a) accepts either. If the certificate will take six weeks, ask the bank whether it will take this instead — it often can.",
  },

  "succession-certificate": {
    id: "succession-certificate",
    name: "Succession certificate",
    prescribed: false,
    from: "A District Judge's court, under the Indian Succession Act 1925",
    cost: "Around 3% of the asset value in court fees, plus ₹5,000–25,000 for a lawyer",
    time: "4–7 months uncontested. One to two years if anyone objects",
    leadDays: 210,
    what:
      "A civil court proceeding — a petition, notice to every heir, a newspaper advertisement inviting objections, and hearings at which you must prove the accounts exist.",
    note:
      "Below the threshold with no nominee, para 10(a) requires the bank to settle on the six documents above. Para 10(b) reserves this for claims at or above the threshold, and para 11(b) for cases where the heirs are in dispute.",
  },

  "third-party-surety": {
    id: "third-party-surety",
    name: "A third person to stand as surety",
    prescribed: false,
    from: "Someone the bank accepts, who agrees to be liable",
    cost: "The favour of finding one",
    time: "—",
    leadDays: 0,
    what:
      "A person other than you who guarantees the claim. Different from the indemnity bond you sign yourself.",
    note:
      "Para 10(a): \"No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit.\"",
  },

  witnesses: {
    id: "witnesses",
    name: "Witnesses to attend with you",
    prescribed: false,
    from: "People you bring to the branch",
    cost: "—",
    time: "—",
    leadDays: 0,
    what: "Branches sometimes ask for two people to attend and sign.",
    note:
      "Witnesses are not among the six documents para 10(a) lists for the simplified procedure.",
  },

  vanshavali: {
    id: "vanshavali",
    name: "A family tree document",
    official: "vanshavali",
    prescribed: false,
    from: "Revenue or local authority, in some states",
    cost: "Varies",
    time: "Weeks",
    leadDays: 21,
    what: "A genealogy establishing the family line.",
    note:
      "Not among the six documents para 10(a) lists. What it lists is a legal heir certificate OR a declaration regarding heirs — Annex I-E.",
  },

  affidavit: {
    id: "affidavit",
    name: "An affidavit",
    prescribed: false,
    from: "Notary or magistrate, on stamp paper",
    cost: "₹100–500",
    time: "Days",
    leadDays: 3,
    what: "A sworn statement.",
    note:
      "Para 10(b) mentions an affidavit sworn before an official as an option for claims AT OR ABOVE the threshold. It is not in the para 10(a) list for claims below it.",
  },

  probate: {
    id: "probate",
    name: "Probate of a will",
    prescribed: false,
    from: "A civil court",
    cost: "Court fees plus a lawyer",
    time: "Many months",
    leadDays: 210,
    what: "A court certifying a will and the executor's authority.",
    note:
      "Para 9 says the bank shall not insist on this where there is a nominee or survivor, irrespective of the amount. Para 11(b) requires it where the heirs are in dispute.",
  },
};

/** The six the RBI prescribes for the simplified procedure — para 10(a). */
export const SIMPLIFIED_PROCEDURE: DocId[] = [
  "claim-form",
  "death-certificate",
  "id-proof",
  "indemnity-bond",
  "disclaimer-letter",
  "legal-heir-certificate",
];

/** Nominee or survivor — para 9. Notably short. */
export const NOMINEE_PROCEDURE: DocId[] = [
  "claim-form",
  "death-certificate",
  "id-proof",
];

/** Everything the "What were you asked for?" checklist offers. */
export const ASKABLE: DocId[] = [
  "succession-certificate",
  "third-party-surety",
  "witnesses",
  "vanshavali",
  "affidavit",
  "probate",
  "indemnity-bond",
  "legal-heir-certificate",
  "death-certificate",
  "id-proof",
  "claim-form",
];
