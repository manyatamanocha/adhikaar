/**
 * Recognition cards for the front door of /start.
 *
 * The four-question wizard starts with "What are you claiming?" — correct,
 * but legal-shaped. Most people arrive already able to describe their own
 * situation in plain words ("there was a nominee," "the bank asked for a
 * succession certificate") and would rather recognise themselves than parse
 * a menu of asset types first.
 *
 * Each card is a real URL into the SAME wizard/outcome machinery in
 * wizard.ts and outcomes.ts — nothing here resolves an outcome on its own.
 * `claiming: "deposit"` is preset on every card because every scenario below
 * is, by its own wording, about a bank account; someone who clicks one has
 * already self-selected out of the out-of-scope exit's job (pension, minor
 * claimant, non-deposit assets), which still fires normally for anyone who
 * picks "None of these" and goes through the classic question order instead.
 *
 * "We already started court proceedings" is the one card that does not go
 * through the wizard at all: /already-in-court is a real, built page that
 * resolve() in wizard.ts can never return — nothing anywhere else in the
 * product links to it. This is its first front door.
 */

export type Scenario = {
  label: string;
  /** One line making the match unambiguous, where the label alone could read as more than one situation. */
  detail?: string;
  href: string;
};

export const SCENARIOS: Scenario[] = [
  {
    label: "The bank asked for a succession certificate",
    detail: "We'll check whether that was the right thing to ask for.",
    href: "/start?claiming=deposit",
  },
  {
    label: "There was a nominee on the account",
    href: "/start?claiming=deposit&nominee=yes",
  },
  {
    label: "The account was joint, with a survivorship clause",
    detail: "“either or survivor”, “former or survivor”, or similar wording.",
    href: "/start?claiming=deposit&nominee=survivorship",
  },
  {
    label: "There was no nominee",
    href: "/start?claiming=deposit&nominee=no",
  },
  {
    label: "We don't know whether there was a nominee",
    href: "/start?claiming=deposit&nominee=unknown",
  },
  {
    label: "The legal heirs disagree with each other",
    href: "/start?claiming=deposit&heirs=dispute",
  },
  {
    label: "We already started court proceedings",
    detail: "Before the RBI's rules changed on 31 March 2026.",
    href: "/already-in-court",
  },
];
