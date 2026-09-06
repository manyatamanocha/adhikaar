import { Article, ArticleSection, ArticleQuote } from "../../_components/article";
import { CLAUSES, TACTICS } from "@/lib/rbi";

export const metadata = {
  title: "RBI 15-day deceased claim rule — Adhikaar",
  description:
    "The RBI's 2025 Directions require a bank to settle a deceased customer's claim within 15 calendar days of receiving a complete set of documents — and pay compensation if it is late. What starts the clock, and how to prove it.",
};

export default function Page() {
  return (
    <Article
      eyebrow="Deadlines"
      title="RBI 15-day deceased claim rule"
      dek="Once a bank has every document it needs, it has 15 calendar days to settle the claim — and the Directions say what happens if it doesn't."
      ctaHref="/start?claiming=deposit-account"
    >
      <ArticleSection heading="The rule, verbatim">
        <p>The deadline runs from a complete set of documents, not from the date of death:</p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.fifteenDays.para}`}>
          {CLAUSES.fifteenDays.text}
        </ArticleQuote>
      </ArticleSection>

      <ArticleSection heading="What happens if the bank is late">
        <p>
          <span className="font-bold text-ink-soft">In summary: </span>
          {CLAUSES.delayCompensation.text}
        </p>
      </ArticleSection>

      <ArticleSection heading="Why the clock's start date gets disputed">
        <p>
          The 15 days count from a <strong>complete</strong> set of documents — which is exactly the
          point branches sometimes reopen by raising a fresh document objection, so the file is
          never quite &ldquo;complete.&rdquo; Two things close that off:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          {TACTICS.slice(2).map((t) => (
            <li key={t.title}>
              <strong>{t.title}.</strong> {t.detail}
            </li>
          ))}
        </ul>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">
        Rules quoted from the RBI&apos;s 2025 Directions. Not affiliated with the RBI or any bank.
        Information, not legal advice.
      </p>
    </Article>
  );
}
