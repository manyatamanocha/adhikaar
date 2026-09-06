import { Article, ArticleSection, ArticleQuote } from "../../_components/article";
import { CLAUSES } from "@/lib/rbi";
import { SARBATI_DEVI } from "@/lib/rbi";
import { NOMINEE_PROCEDURE, DOCUMENTS } from "@/lib/documents";

export const metadata = {
  title: "Nominee bank account claim after death — Adhikaar",
  description:
    "If a nominee was registered on a bank account, the RBI's 2025 Directions say no succession certificate is required, whatever the amount. What that means, and what a nominee actually receives.",
};

export default function Page() {
  return (
    <Article
      eyebrow="Nominee claims"
      title="Nominee bank account claim after death"
      dek="Where a nominee is registered, the claim is meant to be simple: three documents, no court paperwork, whatever the amount in the account."
      ctaHref="/start?claiming=deposit-account&nominee=yes"
    >
      <ArticleSection heading="The rule">
        <p>
          A nominee is someone named on the account, in the bank&apos;s own records, to receive the
          balance after the account holder dies. Where one was registered — or the account was
          joint with a survivorship clause — the RBI&apos;s Directions are unconditional:
        </p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.nomineeNoDocuments.para}`}>
          {CLAUSES.nomineeNoDocuments.text}
        </ArticleQuote>
        <p>
          No succession certificate. No probate. No letter of administration. No indemnity bond or
          surety. This applies whatever the amount standing in the account — there is no threshold
          test for a nominee claim.
        </p>
      </ArticleSection>

      <ArticleSection heading="What a nominee claim actually needs">
        <ul className="list-disc space-y-1.5 pl-5">
          {NOMINEE_PROCEDURE.map((id) => (
            <li key={id}>{DOCUMENTS[id].name}</li>
          ))}
        </ul>
        <p>That is the whole list — three documents, all same-day.</p>
      </ArticleSection>

      <ArticleSection heading="A nominee is not the owner">
        <p>
          Being paid as a nominee is not the same as owning the money. The Supreme Court held in{" "}
          <strong>{SARBATI_DEVI.case}</strong> ({SARBATI_DEVI.citation}) that a nominee is only:
        </p>
        <ArticleQuote cite={`${SARBATI_DEVI.case}, ${SARBATI_DEVI.citation}`}>
          {SARBATI_DEVI.text}
        </ArticleQuote>
        <p>{SARBATI_DEVI.plain}</p>
      </ArticleSection>

      <ArticleSection heading="Where this does not apply">
        <p>
          If the legal heirs are in dispute about the estate, a court document can still be
          required regardless of the nominee. And this does not cover Public Provident Fund, the
          Senior Citizens&apos; Savings Scheme, Mahila Samman Savings Certificate or Sukanya
          Samriddhi — those follow their own scheme rules, not these Directions.
        </p>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">
        Rules quoted from the RBI&apos;s 2025 Directions. Not affiliated with the RBI or any bank.
        Information, not legal advice.
      </p>
    </Article>
  );
}
