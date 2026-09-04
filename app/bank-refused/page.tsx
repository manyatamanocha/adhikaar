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
 */

import Link from "next/link";
import { SiteHeader, SiteFooter } from "../_components/chrome";
import { ComplaintLetter } from "../_components/complaint-letter";
import { PrintButton } from "../_components/print-button";
import { ESCALATION } from "@/lib/rbi";

export const metadata = {
  title: "The bank refused — what to do next — Adhikaar",
  description:
    "A written demand, a complaint to the branch Grievance Redressal Officer, 30 days, then the RBI's Ombudsman route — with a downloadable complaint letter and an honest note that escalation is not a guarantee.",
};

const STEPS = [
  {
    title: "Ask for the demand in writing",
    body:
      "Ask the officer to state, on paper, exactly which document they require and which rule they rely on. Many demands that would not survive being written down are dropped the moment you ask this.",
  },
  {
    title: "Submit a written complaint to the branch",
    body:
      "Address it to the branch's Grievance Redressal Officer, quoting the paragraph number that applies to your claim. Keep a copy and get it acknowledged with a date — or send it by registered post and keep the receipt.",
  },
  {
    title: `Wait ${ESCALATION.waitDays} days`,
    body:
      "Give the branch the full 30 days to respond before escalating. This is the same 30 days the Ombudsman scheme itself expects you to have given the bank first.",
  },
  {
    title: "Escalate through the RBI's Ombudsman route",
    body: `If there is still no resolution after ${ESCALATION.waitDays} days, take the complaint to the ${ESCALATION.scheme}. It is free to use.`,
  },
];

export default function BankRefusedPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-blush border-b-4 border-maroon">
          <div className="shell max-w-[860px] py-10 sm:py-14">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-indigo-ink">
              The bank refused. Here is the route that follows.
            </h1>
            <p className="lede-fluid mt-5 max-w-[62ch] text-ink">
              Four steps, in order, and a written complaint you can fill in
              and hand over. Escalation is real and it is free — it is not a
              guarantee, and this page says so plainly rather than promising
              more than the route delivers.
            </p>
          </div>
        </section>

        <div className="shell max-w-[860px] py-10 sm:py-12">
          <section>
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              The four steps
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
                Escalation is available — it is not a guarantee
              </h3>
              <p className="body-fluid mt-2 leading-relaxed text-ink">
                {ESCALATION.caveat}
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
              A written complaint you can use
            </h2>
            <p className="body-fluid mt-2.5 max-w-[68ch] text-ink-soft">
              Fill in the bracketed fields by hand or on screen. Every blank
              is left blank on purpose — we don&apos;t know your bank, your
              account number or the document that was actually demanded, and
              guessing at any of those would make this less useful, not more.
            </p>
            <div className="mt-5">
              <ComplaintLetter />
            </div>
          </section>

          <section className="mt-12 border-t border-rule pt-6" data-print="hide">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <PrintButton />
              <Link
                href="/start"
                className="text-[0.9375rem] font-bold text-link underline underline-offset-2"
              >
                Answer the four questions instead
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
