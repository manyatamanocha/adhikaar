"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { RecoverFooter } from "../../recover/_components/footer";
import { learnArticles } from "@/lib/learn";
import { LEARN_T } from "@/lib/i18n-learn";
import { parseLocale, withLang } from "@/lib/i18n";

export function LearnIndexContent() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = LEARN_T[locale];
  const articles = learnArticles(locale);

  return (
    <>
      <RecoverNav locale={locale} />

      <main className="flex-1">
        <section className="bg-indigo">
          <div className="shell max-w-[760px] py-10 sm:py-14">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-white">
              {t.indexTitle}
            </h1>
            <p className="lede-fluid mt-4 max-w-[62ch] text-white/90">{t.indexIntro}</p>
          </div>
        </section>

        <div className="shell max-w-[760px] py-10 sm:py-12">
          <ul className="space-y-4">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={withLang(`/learn/${a.slug}`, locale)}
                  className="group block rounded-xl border-2 border-rule bg-white p-6 transition-all hover:border-indigo hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)]"
                >
                  <h2 className="display-md font-serif font-bold text-indigo-ink">{a.title}</h2>
                  <p className="body-fluid mt-1.5 leading-relaxed text-ink-soft">{a.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}
