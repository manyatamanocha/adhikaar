"use client";

import { useSearchParams } from "next/navigation";
import { Article, ArticleSection, ArticleQuote } from "../../../_components/article";
import { CLAUSES } from "@/lib/rbi";
import { SIMPLIFIED_PROCEDURE, documentText } from "@/lib/documents";
import { LEARN_T } from "@/lib/i18n-learn";
import { parseLocale } from "@/lib/i18n";

export function NoNomineeDocsArticle() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = LEARN_T[locale].noNomineeDocs;

  return (
    <Article locale={locale} eyebrow={t.eyebrow} title={t.navTitle} dek={t.dek} ctaHref="/start?claiming=deposit-account&nominee=no">
      <ArticleSection heading={t.s1Heading}>
        <p>
          <span className="font-bold text-ink-soft">{t.s1Prefix}</span>
          {CLAUSES.simplifiedPurpose.text}
        </p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.simplifiedMandate.para}`}>
          {CLAUSES.simplifiedMandate.text}
        </ArticleQuote>
      </ArticleSection>

      <ArticleSection heading={t.s2Heading}>
        <ul className="space-y-3">
          {SIMPLIFIED_PROCEDURE.map((id) => {
            const doc = documentText(id, locale);
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

      <ArticleSection heading={t.s3Heading}>
        <ArticleQuote cite={`Paragraph ${CLAUSES.noSurety.para}`}>
          {CLAUSES.noSurety.text}
        </ArticleQuote>
        <p>{t.s3Body}</p>
      </ArticleSection>

      <ArticleSection heading={t.s4Heading}>
        <ArticleQuote cite={`Paragraph ${CLAUSES.threshold.para}`}>
          {CLAUSES.threshold.text}
        </ArticleQuote>
        <p>{t.s4Body}</p>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">{LEARN_T[locale].footerRbiOnly}</p>
    </Article>
  );
}
