// Shared reviewed content for the FAQ page and Saathi's bounded AI explanations.
export type Faq = {
  q: string;
  a: string;
  link?: { label: string; href: string };
  highlight?: boolean;
};

export const FAQS: Faq[] = [
  {
    q: "What does Adhikaar do?",
    a: "Adhikaar helps families understand how to claim a deceased loved one's bank deposits. Answer a few questions to understand the process, prepare the paperwork, and know what to do next. Adhikaar guides you; the bank processes your claim.",
  },
  {
    q: "Is Adhikaar a government website?",
    a: "No. Adhikaar is an independent guidance tool, not a government, RBI, or bank website. We explain official rules in simpler language and link to the relevant sources.",
  },
  {
    q: "Does Adhikaar search bank accounts?",
    a: "No. Adhikaar cannot access bank records, check balances, or discover accounts in someone's name. It helps you understand where to look and how to proceed through the relevant official channels.",
    highlight: true,
  },
  {
    q: "Do I need a succession certificate if there was a nominee?",
    a: "Generally, no. For payment to a valid nominee, the bank must not demand a succession certificate, regardless of the amount, once identity and death are verified and no court order prevents payment. Receiving payment does not override legal heirs' inheritance rights.",
    link: { label: "RBI rules", href: "/guide" },
  },
  {
    q: "What if there was no nominee?",
    a: "Legal heirs can still claim. Where there is no nominee or survivorship clause, no will, no competing claim, and no restraining court order, a simplified process applies within the relevant threshold. Larger claims have additional documentation routes; a succession certificate is not always compulsory.",
    link: { label: "RBI guidance", href: "/guide" },
  },
  {
    q: "What is the claim threshold?",
    a: "It is the amount used to determine the paperwork route — not a limit on what you can claim. RBI sets ₹15 lakh for banks other than co-operative banks and ₹5 lakh for co-operative banks. Banks may set higher limits. The calculation includes accrued interest.",
    link: { label: "RBI definition", href: "/guide" },
  },
  {
    q: "What if the heirs disagree?",
    a: "Disputed inheritance may require a succession certificate, probate, letters of administration, or a court order, depending on the case. The bank cannot decide who should inherit. Adhikaar can explain the process, but a qualified lawyer should help with the dispute.",
    link: { label: "Claim procedures", href: "/guide" },
  },
  {
    q: "What documents will the bank ask for?",
    a: "Usually, a claim form, death certificate, and the claimant's identity and address proof. For a simplified claim without a nominee, additional documents include an indemnity bond, other heirs' no-objection letters where applicable, and either a legal heir certificate or an acceptable independent person's declaration. Your checklist depends on your circumstances.",
    link: { label: "Document requirements", href: "/what-were-you-asked-for" },
  },
  {
    q: "What if the bank asks for a surety?",
    a: "A surety is someone who guarantees the claim. Banks must not require one for valid nominee claims or simplified claims within the threshold. An indemnity bond signed by the claimant is different. Ask the bank to explain its requirement in writing.",
    link: { label: "RBI rules", href: "/guide" },
  },
  {
    q: "How long does the bank have to settle the claim?",
    a: "For deceased customers' bank deposits, the deadline is 15 calendar days after the bank receives all required documents, complete in all respects. Ask for a dated acknowledgement and written details of anything missing.",
    link: { label: "Settlement timeline", href: "/guide" },
  },
  {
    q: "Does this cover PPF, insurance, or shares?",
    a: "Adhikaar's detailed claim guidance currently focuses on bank deposits. It can point you towards official resources for other assets, but PPF, insurance, and shares have separate claim processes. Do not use the bank-deposit checklist as their document checklist.",
  },
  {
    q: "Is my information stored?",
    a: "You do not need to create an account or upload personal documents. Your guidance answers appear in the page link, so share it carefully. If you use the deadline tracker, its date is saved in your browser. Basic usage analytics may also be collected.",
  },
  {
    q: "What can I do if the bank refuses?",
    a: "Ask for the reason in writing and submit a written complaint to the bank. If its response is unsatisfactory, or it does not reply within 30 days, you can generally approach the RBI Ombudsman through the complaint portal, subject to eligibility.",
    link: { label: "RBI complaint guidance", href: "/bank-refused" },
  },
  {
    q: "Is this legal advice?",
    a: "No. Adhikaar provides general information and practical guidance, not personalised legal advice. For disputed inheritance, complicated wills, or court proceedings, consult a qualified lawyer. Adhikaar cannot guarantee claim approval.",
  },
];
