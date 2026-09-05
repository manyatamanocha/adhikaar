import { Article, ArticleSection, ArticleQuote } from "../../_components/article";
import { getBank } from "@/lib/banks";
import { CLAUSES, NOTIFICATION } from "@/lib/rbi";
import { formatDate } from "../../_components/bank-panel";

export const metadata = {
  title: "SBI deceased account claim process — Adhikaar",
  description:
    "What State Bank of India itself publishes about claiming a deceased customer's account: its threshold, its claim forms, its position on third-party surety, and where it goes further than the RBI's floor.",
};

export default function Page() {
  const sbi = getBank("sbi")!;

  return (
    <Article
      eyebrow="Bank-specific"
      title="SBI deceased account claim process"
      dek="What State Bank of India itself has published, read from its own pages and checked on the date below — not inferred from the RBI's general rule."
      ctaHref="/start?claiming=deposit"
    >
      <ArticleSection heading="SBI's own threshold and surety position">
        <p>
          SBI states that it settles claims below <strong>{sbi.thresholdLabel}</strong> without
          requiring a third-party surety — the same figure as the RBI&apos;s own floor for a
          commercial bank (paragraph 7(h) of the{" "}
          <a
            href={NOTIFICATION.url}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-link underline underline-offset-2"
          >
            2025 Directions
          </a>
          ). Its published wording:
        </p>
        {sbi.suretyQuote && <ArticleQuote cite={sbi.name}>{sbi.suretyQuote}</ArticleQuote>}
      </ArticleSection>

      <ArticleSection heading="Its claim forms">
        <p>
          SBI revised its deceased-claim settlement process with effect from 16 December 2025 and
          issued revised claim forms effective 18 December 2025 — ahead of the RBI&apos;s 31 March
          2026 deadline. Its forms use the same annexure names as the RBI&apos;s own —{" "}
          <strong>{sbi.claimFormNames?.join(", ")}</strong> — so you can ask a branch for them by
          name.
        </p>
      </ArticleSection>

      <ArticleSection heading="Where SBI goes beyond the RBI floor">
        <p>
          Above ₹15 lakh, SBI states a surety is required — consistent with paragraph 10(b), which
          allows a bank to ask for more once a claim is at or above the threshold. Locker and loan
          claims are settled only at the account&apos;s home branch, and government savings
          schemes — SCSS, PPF, MSSC, SSA — are excluded from all of this, per paragraph 6(b).
        </p>
      </ArticleSection>

      <ArticleSection heading="The underlying rule">
        <p>
          Every bank in India is working from the same instruction. The paragraph that matters
          most depends on whether a nominee was registered:
        </p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.nomineeNoDocuments.para} — nominee or survivor`}>
          {CLAUSES.nomineeNoDocuments.text}
        </ArticleQuote>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">
        Checked {formatDate(sbi.verifiedOn)}, from SBI&apos;s own published pages. Not affiliated
        with SBI or the RBI. Information, not legal advice.
      </p>
    </Article>
  );
}
