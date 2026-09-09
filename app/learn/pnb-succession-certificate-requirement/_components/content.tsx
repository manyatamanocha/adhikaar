"use client";

import { useSearchParams } from "next/navigation";
import { Article, ArticleSection, ArticleQuote } from "../../../_components/article";
import { getBank } from "@/lib/banks";
import { CLAUSES } from "@/lib/rbi";
import { LEARN_T } from "@/lib/i18n-learn";
import { formatDate } from "../../../_components/bank-panel";
import { parseLocale } from "@/lib/i18n";

export function PnbArticle() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = LEARN_T[locale].pnb;
  const pnb = getBank("pnb")!;

  return (
    <Article locale={locale} eyebrow={t.eyebrow} title={t.navTitle} dek={t.dek} ctaHref="/start?claiming=deposit-account&nominee=no">
      <ArticleSection heading={t.s1Heading}>
        <p>{t.s1Para1}</p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.nomineeNoDocuments.para}`}>
          {CLAUSES.nomineeNoDocuments.text}
        </ArticleQuote>
        <p>{t.s1Para2(pnb.thresholdLabel!)}</p>
      </ArticleSection>

      <ArticleSection heading={t.s2Heading}>
        <p>{t.s2Intro}</p>
        {pnb.suretyQuote && <ArticleQuote cite={pnb.name}>{pnb.suretyQuote}</ArticleQuote>}
      </ArticleSection>

      <ArticleSection heading={t.s3Heading}>
        <p>{t.s3Body(pnb.thresholdLabel!)}</p>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">
        {LEARN_T[locale].footerCheckedFrom(formatDate(pnb.verifiedOn), pnb.name)}
      </p>
    </Article>
  );
}
