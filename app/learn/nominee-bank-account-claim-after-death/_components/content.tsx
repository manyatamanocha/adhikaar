"use client";

import { useSearchParams } from "next/navigation";
import { Article, ArticleSection, ArticleQuote } from "../../../_components/article";
import { CLAUSES, SARBATI_DEVI } from "@/lib/rbi";
import { NOMINEE_PROCEDURE, documentText } from "@/lib/documents";
import { LEARN_T } from "@/lib/i18n-learn";
import { parseLocale } from "@/lib/i18n";

export function NomineeArticle() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = LEARN_T[locale].nominee;

  return (
    <Article locale={locale} eyebrow={t.eyebrow} title={t.navTitle} dek={t.dek} ctaHref="/start?claiming=deposit-account&nominee=yes">
      <ArticleSection heading={t.s1Heading}>
        <p>{t.s1Para1}</p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.nomineeNoDocuments.para}`}>
          {CLAUSES.nomineeNoDocuments.text}
        </ArticleQuote>
        <p>{t.s1Para2}</p>
      </ArticleSection>

      <ArticleSection heading={t.s2Heading}>
        <ul className="list-disc space-y-1.5 pl-5">
          {NOMINEE_PROCEDURE.map((id) => (
            <li key={id}>{documentText(id, locale).name}</li>
          ))}
        </ul>
        <p>{t.s2Closing}</p>
      </ArticleSection>

      <ArticleSection heading={t.s3Heading}>
        <p>
          {t.s3Before}
          <strong>{SARBATI_DEVI.case}</strong> ({SARBATI_DEVI.citation})
          {t.s3After}
        </p>
        <ArticleQuote cite={`${SARBATI_DEVI.case}, ${SARBATI_DEVI.citation}`}>
          {SARBATI_DEVI.text}
        </ArticleQuote>
        <p>{t.s3Closing}</p>
      </ArticleSection>

      <ArticleSection heading={t.s4Heading}>
        <p>{t.s4Body}</p>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">{LEARN_T[locale].footerRbiOnly}</p>
    </Article>
  );
}
