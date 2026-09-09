"use client";

import { useSearchParams } from "next/navigation";
import { Article, ArticleSection, ArticleQuote } from "../../../_components/article";
import { CLAUSES, TACTICS_BY_LOCALE } from "@/lib/rbi";
import { LEARN_T } from "@/lib/i18n-learn";
import { parseLocale } from "@/lib/i18n";

export function FifteenDayArticle() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = LEARN_T[locale].fifteenDay;
  const tactics = TACTICS_BY_LOCALE[locale];

  return (
    <Article locale={locale} eyebrow={t.eyebrow} title={t.navTitle} dek={t.dek} ctaHref="/start?claiming=deposit-account">
      <ArticleSection heading={t.s1Heading}>
        <p>{t.s1Intro}</p>
        <ArticleQuote cite={`Paragraph ${CLAUSES.fifteenDays.para}`}>
          {CLAUSES.fifteenDays.text}
        </ArticleQuote>
      </ArticleSection>

      <ArticleSection heading={t.s2Heading}>
        <p>
          <span className="font-bold text-ink-soft">{t.s2Prefix}</span>
          {CLAUSES.delayCompensation.text}
        </p>
      </ArticleSection>

      <ArticleSection heading={t.s3Heading}>
        <p>{t.s3Intro}</p>
        <ul className="list-disc space-y-1.5 pl-5">
          {tactics.slice(2).map((tactic) => (
            <li key={tactic.title}>
              <strong>{tactic.title}.</strong> {tactic.detail}
            </li>
          ))}
        </ul>
      </ArticleSection>

      <p className="text-[0.9375rem] text-ink-soft">{LEARN_T[locale].footerRbiOnly}</p>
    </Article>
  );
}
