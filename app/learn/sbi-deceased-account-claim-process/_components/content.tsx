"use client";

import { useSearchParams } from "next/navigation";
import { Article, ArticleSection, ArticleQuote } from "../../../_components/article";
import { getBank } from "@/lib/banks";
import { CLAUSES, NOTIFICATION } from "@/lib/rbi";
import { LEARN_T } from "@/lib/i18n-learn";
import { formatDate } from "../../../_components/bank-panel";
import { parseLocale } from "@/lib/i18n";

export function SbiArticle() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = LEARN_T[locale].sbi;
  const sbi = getBank("sbi")!;

  return (
    <Article locale={locale} eyebrow={t.eyebrow} title={t.navTitle} dek={t.dek} ctaHref="/start?claiming=deposit-account">
      <ArticleSection heading={t.s1Heading}>
        <p>
          {t.s1Pre(sbi.thresholdLabel!)}
          <a
            href={NOTIFICATION.url}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-link underline underline-offset-2"
          >
            {LEARN_T[locale].directionsLinkLabel}
          </a>
          {t.s1Post}
        </p>
        {sbi.suretyQuote && <ArticleQuote cite={sbi.name}>{sbi.suretyQuote}</ArticleQuote>}
      </ArticleSection>

      <ArticleSection heading={t.s2Heading}>
        <p>{t.s2Body(sbi.claimFormNames?.join(", ") ?? "")}</p>
      </ArticleSection>

      <ArticleSection heading={t.s3Heading}>
        <p>{t.s3Body}</p>
      </ArticleSection>

      <ArticleSection heading={t.s4Heading}>
        <p>{t.s4Intro}</p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.nomineeNoDocuments.para} — nominee or survivor`}>
          {CLAUSES.nomineeNoDocuments.text}
        </ArticleQuote>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">
        {LEARN_T[locale].footerCheckedFrom(formatDate(sbi.verifiedOn), sbi.name)}
      </p>
    </Article>
  );
}
