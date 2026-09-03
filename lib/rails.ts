/**
 * The other rails — everything Adhikaar deliberately does not cover.
 *
 * This is a MAP, not a manual. Each entry names the authority and the route and
 * stops. There is no verdict, no checklist and no "you are entitled" here,
 * because we have not done on these rails the verification we did on banks —
 * and a half-verified instruction is worse than an honest pointer.
 *
 * Scope was cut to bank deposits for exactly this reason: in the time
 * available, every claim about banks can be checked. Seven rails cannot.
 */

export type Rail = {
  asset: string;
  /** Who actually holds the money or the register. */
  authority: string;
  /** What the route is called, in the words that authority uses. */
  route: string;
  url: string;
  /** What we know, and only what we know. */
  note?: string;
};

/** Link availability checked 3 September 2026. Contents not verified further. */
export const LINKS_CHECKED = "3 September 2026";

export const RAILS: Rail[] = [
  {
    asset: "Life insurance",
    authority: "The insurer, and IRDAI above it",
    route: "Death claim to the insurer. Grievances go to Bima Bharosa",
    url: "https://bimabharosa.irdai.gov.in",
    note: "A life policy with a nomination has its own rules under the Insurance Act. They are not these Directions.",
  },
  {
    asset: "Mutual funds",
    authority: "The asset management company, through its registrar",
    route: "Transmission request to the AMC or RTA. SEBI's MITRA service traces inactive folios",
    url: "https://www.mfcentral.com",
    note: "Transmission is the industry's word for a claim after death. Ask for it by that name.",
  },
  {
    asset: "Shares and unpaid dividends",
    authority: "The company's registrar — or the IEPF if it has been transferred",
    route: "Transmission to the RTA; IEPF-5 for anything moved to the Fund",
    url: "https://www.iepf.gov.in",
    note: "Shares and dividends unclaimed for seven years are moved to the Investor Education and Protection Fund and are recovered from there, not from the company.",
  },
  {
    asset: "Provident fund",
    authority: "EPFO",
    route: "Form 20 for the accumulations, Form 10-D for pension",
    url: "https://www.epfindia.gov.in",
  },
  {
    asset: "National Pension System",
    authority: "PFRDA, through the point of presence",
    route: "Withdrawal on death of the subscriber",
    url: "https://www.pfrda.org.in",
  },
  {
    asset: "Post office savings",
    authority: "India Post",
    route: "The post office's own claim procedure",
    url: "https://www.indiapost.gov.in",
    note: "PPF, the Senior Citizens' Savings Scheme, MSSC and Sukanya Samriddhi run on their scheme rules. Paragraph 6(b) puts them outside the RBI's Directions even when the account sits at a bank.",
  },
];

/** Finding what exists. Both of these are the government's own. */
export const DISCOVERY = [
  {
    name: "UDGAM",
    who: "Reserve Bank of India",
    what: "Searches unclaimed deposits across participating banks",
    url: "https://udgam.rbi.org.in",
  },
  {
    name: "Unclaimed Assets Portal",
    who: "Department of Financial Services, with the PSB Alliance",
    what: "Points at the search route for deposits, insurance, shares, mutual funds and provident fund",
    url: "https://www.unclaimedassetsportal.in",
  },
];
