import type { Locale } from "./i18n";
import { LEARN_T } from "./i18n-learn";

/**
 * The /learn index. One entry per article under app/learn/.
 *
 * `key` looks up the article's title/dek in LEARN_T (lib/i18n-learn.ts) --
 * title and dek used to live here as bare English strings until the 9 Sep
 * 2026 translation pass; kept as a lookup rather than duplicating three
 * locales' worth of copy in this file too.
 */
const ARTICLES = [
  { slug: "sbi-deceased-account-claim-process", key: "sbi" },
  { slug: "pnb-succession-certificate-requirement", key: "pnb" },
  { slug: "nominee-bank-account-claim-after-death", key: "nominee" },
  { slug: "rbi-15-day-deceased-claim-rule", key: "fifteenDay" },
  { slug: "documents-required-when-there-is-no-nominee", key: "noNomineeDocs" },
] as const;

export function learnArticles(locale: Locale) {
  const t = LEARN_T[locale];
  return ARTICLES.map((a) => ({
    slug: a.slug,
    title: t[a.key].navTitle,
    dek: t[a.key].indexDek,
  }));
}
