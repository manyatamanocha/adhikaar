/**
 * The written-complaint template for /bank-refused.
 *
 * Every bracketed field is blank on purpose -- this product does not know
 * anyone's bank, account number or the document actually demanded, and
 * inventing plausible-looking values here would be exactly the kind of
 * fabricated placeholder data this codebase avoids everywhere else. The
 * paragraph numbers and the 15-day / 30-day figures are the only fixed
 * facts, and both trace to rbi.ts.
 */

export const COMPLAINT_LETTER = `To,
The Branch Manager / Grievance Redressal Officer
[Bank name], [Branch name and address]

Date: [date]

Subject: Written complaint -- delay or refusal to settle a deceased customer's claim (RBI Directions, 2025)

Sir/Madam,

I am writing regarding the claim for settlement of the account(s) of late [name of deceased], held at your branch under account number(s) [account number].

I submitted a complete claim application on [date of application], along with the following documents: [documents submitted].

On [date], I was told that the claim could not be settled unless I also produced [document demanded]. I believe this is not consistent with the Reserve Bank of India (Settlement of Claims in respect of Deceased Customers of Banks) Directions, 2025, specifically paragraph [paragraph number].

I request that:

1. This complaint be formally registered and acknowledged in writing, with the date of acknowledgement stated.
2. My claim be settled in accordance with the RBI's Directions, within 15 calendar days of a complete set of documents being received (paragraph 31).
3. If the bank is unable to do so, I be given a written explanation stating the specific document required and the specific rule relied upon.

If I do not receive a satisfactory response within 30 days of this letter, I intend to escalate this complaint to the Reserve Bank -- Integrated Ombudsman Scheme, 2026.

Yours faithfully,

[Your name]
[Your address]
[Your phone number / email]
[Signature]`;
