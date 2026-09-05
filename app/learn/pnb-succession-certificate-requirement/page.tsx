import { Article, ArticleSection, ArticleQuote } from "../../_components/article";
import { getBank } from "@/lib/banks";
import { CLAUSES } from "@/lib/rbi";
import { formatDate } from "../../_components/bank-panel";

export const metadata = {
  title: "PNB succession certificate requirement — Adhikaar",
  description:
    "When Punjab National Bank actually requires a succession certificate for a deceased customer's claim, and when its own published rules say it should not — read from PNB's own page.",
};

export default function Page() {
  const pnb = getBank("pnb")!;

  return (
    <Article
      eyebrow="Bank-specific"
      title="PNB succession certificate requirement"
      dek="Punjab National Bank does not require a succession certificate for most deceased-customer claims. Here is when it does, and when its own published page says it should not."
      ctaHref="/start?claiming=deposit&nominee=no"
    >
      <ArticleSection heading="When PNB does not require one">
        <p>
          Where there is a registered nominee or a surviving joint holder, paragraph 9 of the
          RBI&apos;s 2025 Directions applies at every bank, PNB included — no succession
          certificate, whatever the amount:
        </p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.nomineeNoDocuments.para}`}>
          {CLAUSES.nomineeNoDocuments.text}
        </ArticleQuote>
        <p>
          Where there is no nominee but the claim is below <strong>{pnb.thresholdLabel}</strong> in
          total, PNB&apos;s own published list matches the RBI&apos;s simplified procedure: a claim
          form, death certificate, ID, an indemnity bond you sign yourself, a disclaimer from the
          other heirs, and a legal heir certificate or declaration — six documents, and a
          succession certificate is not one of them.
        </p>
      </ArticleSection>

      <ArticleSection heading="Its position on third-party surety">
        <p>PNB&apos;s own published wording on surety below the threshold:</p>
        {pnb.suretyQuote && <ArticleQuote cite={pnb.name}>{pnb.suretyQuote}</ArticleQuote>}
      </ArticleSection>

      <ArticleSection heading="When a succession certificate genuinely applies">
        <p>
          At or above {pnb.thresholdLabel} with no nominee, or wherever the legal heirs are in
          disagreement, a succession certificate — or an equivalent court document — may genuinely
          be required. That is not PNB being difficult; it is what paragraphs 10(b) and 11(b) of
          the Directions provide for.
        </p>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">
        Checked {formatDate(pnb.verifiedOn)}, from PNB&apos;s own published page. Not affiliated
        with PNB or the RBI. Information, not legal advice.
      </p>
    </Article>
  );
}
