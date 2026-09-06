import { Article, ArticleSection, ArticleQuote } from "../../_components/article";
import { CLAUSES } from "@/lib/rbi";
import { SIMPLIFIED_PROCEDURE, DOCUMENTS } from "@/lib/documents";

export const metadata = {
  title: "Documents required when there is no nominee — Adhikaar",
  description:
    "Where there is no nominee and the claim is below the RBI's threshold, banks must settle on a fixed list of six documents — real cost and time for each, and what is not on the list.",
};

export default function Page() {
  return (
    <Article
      eyebrow="No nominee"
      title="Documents required when there is no nominee"
      dek="Below the threshold, with no nominee registered, the RBI does not just discourage extra paperwork — it requires the bank to settle on a closed list of six documents."
      ctaHref="/start?claiming=deposit-account&nominee=no"
    >
      <ArticleSection heading="The rule">
        <p>
          <span className="font-bold text-ink-soft">In summary: </span>
          {CLAUSES.simplifiedPurpose.text}
        </p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.simplifiedMandate.para}`}>
          {CLAUSES.simplifiedMandate.text}
        </ArticleQuote>
      </ArticleSection>

      <ArticleSection heading="The six documents, with real cost and time">
        <ul className="space-y-3">
          {SIMPLIFIED_PROCEDURE.map((id) => {
            const doc = DOCUMENTS[id];
            return (
              <li key={id} className="rounded-lg border border-rule bg-mist p-4">
                <p className="font-bold text-indigo-ink">{doc.name}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-soft">
                  {doc.from} · {doc.cost} · {doc.time}
                </p>
              </li>
            );
          })}
        </ul>
      </ArticleSection>

      <ArticleSection heading="What is deliberately NOT on this list">
        <ArticleQuote cite={`Paragraph ${CLAUSES.noSurety.para}`}>
          {CLAUSES.noSurety.text}
        </ArticleQuote>
        <p>
          A succession certificate, probate, a family-tree document, witnesses, or a third-party
          surety are not among the six — a branch asking for any of them, below the threshold, is
          asking for more than the rule allows.
        </p>
      </ArticleSection>

      <ArticleSection heading="Where the threshold sits">
        <ArticleQuote cite={`Paragraph ${CLAUSES.threshold.para}`}>
          {CLAUSES.threshold.text}
        </ArticleQuote>
        <p>
          The threshold is the aggregate across every account at that one bank, not per account —
          and a bank may set its own limit higher than this floor.
        </p>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">
        Rules quoted from the RBI&apos;s 2025 Directions. Not affiliated with the RBI or any bank.
        Information, not legal advice.
      </p>
    </Article>
  );
}
