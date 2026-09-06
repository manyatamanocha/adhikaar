/**
 * /documents — "What documents will the bank need?"
 *
 * The reference answer to the one question people arrive with before they are
 * ready to answer any of the wizard's: what am I going to be asked for. It
 * exists because the homepage now offers it as an entry option beside the
 * claim journey, and that option needed a destination that answers the
 * question for BOTH routes, not the single no-nominee /learn article.
 *
 * It resolves nothing and asks nothing. The two lists come straight from
 * lib/documents.ts (NOMINEE_PROCEDURE, SIMPLIFIED_PROCEDURE) — the same arrays
 * the verdict pages render — so this page can never drift from the checklist a
 * claimant is given at the end of the journey.
 *
 * 🔴 The attribution here is the one thing on this page that must not be got
 * wrong. "The bank shall not insist on production of legal documents such as
 * Succession Certificate…" is paragraph 9, and it covers the NOMINEE /
 * survivorship case only, irrespective of amount. The no-nominee route runs on
 * paragraph 10(a), which mandates settlement on six documents rather than
 * prohibiting a demand. Quoting para 9 under the no-nominee heading is a
 * misquote a branch officer can catch, and the whole product is credibility at
 * a counter. Clauses are read from CLAUSES, never retyped.
 *
 * Localised via lib/i18n-documents.ts. Statutory text stays English in all
 * three locales with a translated gloss above it; a clause with
 * `verbatim: false` is Adhikaar's summary and never appears inside quotation
 * marks. Document names, cost and time come from documentText(), already
 * translated. Hindi and Kannada unchecked by a native speaker.
 */

import Link from "next/link";
import { parseLocale, withLang, type Locale } from "@/lib/i18n";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { documentText, NOMINEE_PROCEDURE, SIMPLIFIED_PROCEDURE, type DocId } from "@/lib/documents";
import { CLAUSES, NOTIFICATION, SARBATI_DEVI, THRESHOLDS, type Clause } from "@/lib/rbi";
import { DOCS_T, type DocsDict } from "@/lib/i18n-documents";

export const metadata = {
  title: "What documents will the bank need? — Adhikaar",
  description:
    "The two document lists the RBI prescribes for a deceased depositor's account — three where a nominee or survivor is on record, six where there is none — with the real cost and time for each, and the paragraph each comes from.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const t = DOCS_T[locale];

  return (
    <>
      <RecoverNav />

      <main className="flex-1" lang={locale}>
        <section className="bg-indigo">
          <div className="shell max-w-[860px] py-10 sm:py-12">
            <p className="text-[0.875rem] font-bold uppercase tracking-[0.12em] text-white/70">
              {t.eyebrow}
            </p>
            <h1 className="display-xl mt-2 font-serif font-bold tracking-[-0.015em] text-white">
              {t.heading}
            </h1>
            <p className="lede-fluid mt-4 max-w-[60ch] text-white/90">{t.sub}</p>
          </div>
        </section>

        <div className="shell max-w-[860px] py-10">
          <p className="hardbox body-fluid leading-relaxed text-ink">{t.routeNote}</p>

          {/* Route 1 — nominee or survivor. Para 9. No threshold. */}
          <section className="mt-9">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              {t.nomineeHeading}
            </h2>
            <p className="mt-1.5 text-[1.0625rem] font-bold text-[#E2653B]">{t.nomineeSub}</p>

            <Gloss t={t} gloss={t.nomineeGloss} clause={CLAUSES.nomineeNoDocuments} />
            <DocList ids={NOMINEE_PROCEDURE} locale={locale} />

            <div className="mt-5 rounded-xl border-2 border-indigo bg-mist p-5">
              <p className="text-[1.0625rem] font-bold text-indigo-ink">
                {t.ownershipHeading}
              </p>
              <p className="body-fluid mt-2 leading-relaxed text-ink">{t.ownership}</p>
              <p className="mt-2.5 text-[0.9375rem] text-ink-soft">
                {SARBATI_DEVI.case}, {SARBATI_DEVI.citation} ({SARBATI_DEVI.court})
              </p>
            </div>
          </section>

          {/* Route 2 — no nominee, below the threshold. Para 10(a). */}
          <section className="mt-12 border-t border-rule pt-9">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              {t.simplifiedHeading(THRESHOLDS.commercialLabel, THRESHOLDS.cooperativeLabel)}
            </h2>
            <p className="mt-1.5 text-[1.0625rem] font-bold text-[#E2653B]">
              {t.simplifiedSub}
            </p>

            <Gloss t={t} gloss={t.simplifiedGloss} clause={CLAUSES.simplifiedMandate} />
            <DocList ids={SIMPLIFIED_PROCEDURE} locale={locale} />
            <Gloss t={t} gloss={t.noSuretyGloss} clause={CLAUSES.noSurety} />
          </section>

          {/* What neither list contains. */}
          <section className="mt-12 border-t border-rule pt-9">
            <h2 className="display-md font-serif font-bold text-indigo-ink">
              {t.notOnListHeading}
            </h2>
            <p className="body-fluid mt-3 leading-relaxed text-ink">{t.notOnList}</p>
          </section>

          {/* Where the lists stop applying. */}
          <section className="mt-10">
            <h2 className="display-md font-serif font-bold text-indigo-ink">
              {t.aboveHeading(THRESHOLDS.commercialLabel, THRESHOLDS.cooperativeLabel)}
            </h2>
            <Gloss t={t} gloss={t.aboveGloss} clause={CLAUSES.aboveThreshold} />
            <Gloss t={t} gloss={t.disputeGloss} clause={CLAUSES.dispute} />
          </section>

          <section className="actionbox mt-12">
            <p className="display-md font-serif font-bold text-indigo-ink">{t.ctaHeading}</p>
            <p className="body-fluid mt-2 leading-relaxed text-ink">{t.ctaSub}</p>
            <Link
              href={withLang("/start", locale)}
              className="mt-5 inline-flex items-center rounded bg-[#E2653B] px-7 py-4 text-[1.125rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
            >
              {t.cta}
            </Link>
          </section>

          <p className="mt-10 border-t border-rule pt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
            {t.sourceLine}{" "}
            <a
              href={NOTIFICATION.url}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-link underline underline-offset-2"
            >
              {NOTIFICATION.number}
            </a>
          </p>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

/**
 * A plain-language reading, then the clause itself.
 *
 * The gloss is translated; the clause is not. A `verbatim: false` clause is
 * Adhikaar's own summary of a paragraph, so it is rendered as prose behind an
 * "in summary" label — never inside quotation marks, which would present our
 * wording as the RBI's.
 */
function Gloss({ t, gloss, clause }: { t: DocsDict; gloss: string; clause: Clause }) {
  return (
    <div className="mt-4">
      <p className="body-fluid leading-relaxed text-ink">
        <span className="font-bold text-ink-soft">{t.glossLabel}: </span>
        {gloss}
      </p>
      {clause.verbatim ? (
        <blockquote className="body-fluid mt-3 border-l-2 border-rule pl-4 font-serif leading-[1.6] text-ink">
          &ldquo;{clause.text}&rdquo;
          <footer className="mt-2 font-sans text-[0.9375rem] not-italic text-ink-soft">
            — {t.paraLabel(clause.para)}
          </footer>
        </blockquote>
      ) : (
        <p className="body-fluid mt-3 leading-relaxed text-ink">
          <span className="font-bold text-ink-soft">{t.summaryLabel} </span>
          {clause.text}{" "}
          <span className="text-ink-soft">({t.paraLabel(clause.para)})</span>
        </p>
      )}
    </div>
  );
}

/** The list itself. Cost and time are the pessimistic real ones, as stored. */
function DocList({ ids, locale }: { ids: DocId[]; locale: Locale }) {
  return (
    <ol className="mt-5 space-y-3">
      {ids.map((id, index) => {
        const doc = documentText(id, locale);
        return (
          <li
            key={id}
            className="rounded-xl border-2 border-indigo/25 bg-white p-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[1.0625rem] font-bold text-ink-faint tabular">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-[1.125rem] font-bold text-indigo-ink">{doc.name}</p>
                {doc.official && (
                  <p className="mt-0.5 text-[0.9375rem] text-ink-faint">{doc.official}</p>
                )}
                <p className="body-fluid mt-2 leading-relaxed text-ink">{doc.what}</p>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">
                  {doc.from} · {doc.cost} · {doc.time}
                </p>
                {doc.note && (
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {doc.note}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
