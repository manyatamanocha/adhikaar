/**
 * Shared shell for the /learn SEO pages.
 *
 * Every fact rendered through this component's children comes from the
 * existing data layer (rbi.ts / banks.ts / documents.ts) — this file only
 * supplies consistent chrome and typography so five hand-authored articles
 * don't each re-implement the same hero and closing CTA.
 */

import Link from "next/link";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";

export function Article({
  eyebrow,
  title,
  dek,
  ctaHref,
  ctaLabel = "Answer four short questions about your claim",
  children,
}: {
  eyebrow: string;
  title: string;
  dek: string;
  ctaHref: string;
  ctaLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <RecoverNav />

      <main className="flex-1">
        <section className="bg-indigo">
          <div className="shell max-w-[760px] py-10 sm:py-14">
            <p className="text-[0.875rem] font-bold uppercase tracking-[0.14em] text-white/70">
              {eyebrow}
            </p>
            <h1 className="display-xl mt-2.5 font-serif font-bold tracking-[-0.015em] text-white">
              {title}
            </h1>
            <p className="lede-fluid mt-4 max-w-[62ch] text-white/90">{dek}</p>
          </div>
        </section>

        <div className="shell max-w-[760px] py-10 sm:py-12">
          <div className="space-y-8">{children}</div>

          <div className="mt-12 rounded-xl border-2 border-indigo bg-mist-deep p-6">
            <h2 className="display-md font-serif font-bold text-indigo-ink">
              Find out exactly what applies to your claim
            </h2>
            <p className="body-fluid mt-2 max-w-[60ch] leading-relaxed text-ink">
              This page covers the general rule. Adhikaar asks a few short
              questions and gives you the specific answer for your situation,
              with the RBI&apos;s own wording to show the bank.
            </p>
            <Link
              href={ctaHref}
              className="mt-4 inline-flex items-center gap-2 rounded-pill bg-indigo px-6 py-3 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
            >
              {ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}

export function ArticleSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="display-md font-serif font-bold text-indigo-ink">
        {heading}
      </h2>
      <div className="body-fluid mt-3 space-y-3 leading-relaxed text-ink">
        {children}
      </div>
    </section>
  );
}

export function ArticleQuote({
  children,
  cite,
}: {
  children: React.ReactNode;
  cite: string;
}) {
  return (
    <blockquote className="body-fluid border-l-2 border-rule pl-4 font-serif leading-[1.6] text-ink">
      &ldquo;{children}&rdquo;
      <footer className="mt-2 font-sans text-[0.9375rem] not-italic text-ink-soft">
        — {cite}
      </footer>
    </blockquote>
  );
}
