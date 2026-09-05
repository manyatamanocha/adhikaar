/**
 * "The bank refused" -- its own focused page, not just the Escalation()
 * block at the bottom of every verdict page. That block still exists (it
 * has to be on the printed verdict sheet), but this is where a link to
 * "the full escalation route" now goes when someone actually needs it,
 * rather than four lines squeezed under the caveats.
 *
 * Same source data as Escalation() in outcome.tsx -- ESCALATION and
 * TACTICS from lib/rbi.ts -- laid out as its own numbered route instead of
 * a paragraph, plus the downloadable complaint letter the advisor asked for.
 *
 * Fully localised 5 Sep 2026: this page's own prose lives in
 * lib/i18n-home.ts's HomeDict.bankRefusedPage.
 */

import Link from "next/link";
import { parseLocale, withLang } from "@/lib/i18n";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { ComplaintLetter } from "../_components/complaint-letter";
import { PrintButton } from "../_components/print-button";
import { ESCALATION, ESCALATION_CAVEAT_BY_LOCALE } from "@/lib/rbi";
import { HOME_T } from "@/lib/i18n-home";

export const metadata = {
  title: "The bank refused — what to do next — Adhikaar",
  description:
    "A written demand, a complaint to the branch Grievance Redressal Officer, 30 days, then the RBI's Ombudsman route — with a downloadable complaint letter and an honest note that escalation is not a guarantee.",
};

export default async function BankRefusedPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const locale = parseLocale((await searchParams).lang);
  const t = HOME_T[locale].bankRefusedPage;
  const printLabel = HOME_T[locale].verdictPage.printButton;

  const STEPS = [
    { title: t.step1Title, body: t.step1Body },
    { title: t.step2Title, body: t.step2Body },
    { title: t.step3Title, body: ESCALATION_CAVEAT_BY_LOCALE[locale] },
    { title: t.step4Title, body: t.step4Body(ESCALATION.scheme) },
  ];

  return (
    <>
      <RecoverNav />

      <main className="flex-1" lang={locale}>
        <section className="bg-blush border-b-4 border-maroon">
          <div className="shell max-w-[860px] py-10 sm:py-14">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-indigo-ink">
              {t.heading}
            </h1>
            <p className="lede-fluid mt-5 max-w-[62ch] text-ink">
              {t.sub}
            </p>
          </div>
        </section>

        <div className="shell max-w-[860px] py-10 sm:py-12">
          <section>
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              {t.fourSteps}
            </h2>
            <ol className="mt-5 space-y-6">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-indigo text-[1.0625rem] font-bold text-indigo">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="display-md font-serif font-bold text-indigo-ink">
                      {step.title}
                    </h3>
                    <p className="body-fluid mt-1.5 leading-relaxed text-ink">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 border-t border-rule pt-6">
            <div className="hardbox">
              <h3 className="display-md font-serif font-bold text-maroon">
                {t.escalationHeading}
              </h3>
              <p className="body-fluid mt-2 leading-relaxed text-ink">
                {ESCALATION_CAVEAT_BY_LOCALE[locale]}
              </p>
              <p className="mt-3 text-[1rem] text-ink-soft" data-print="hide">
                <a
                  href={ESCALATION.portal}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-link underline underline-offset-2"
                >
                  {ESCALATION.portal}
                </a>{" "}
                · {ESCALATION.email} · {ESCALATION.post}
              </p>
            </div>
          </section>

          <section className="mt-12 border-t border-rule pt-6">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              {t.complaintHeading}
            </h2>
            <p className="body-fluid mt-2.5 max-w-[68ch] text-ink-soft">
              {t.complaintSub}
            </p>
            <div className="mt-5">
              <ComplaintLetter />
            </div>
          </section>

          <section className="mt-12 border-t border-rule pt-6" data-print="hide">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <PrintButton label={printLabel} />
              <Link
                href={withLang("/start", locale)}
                className="text-[0.9375rem] font-bold text-link underline underline-offset-2"
              >
                {t.checkSituationInstead}
              </Link>
            </div>
          </section>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}
