/**
 * The public metrics page.
 *
 * Deliberately login-free. Every number this product claims about itself
 * should be checkable by the person reading the claim, and Mixpanel's own
 * reports require an account on the project. This page is the answer to
 * "prove it" -- the same reason a metrics view was submitted alongside the
 * previous project's document.
 *
 * Nothing here is personal data. The route it reads returns aggregate counts
 * only: no identifiers, no URLs, no free text. It cannot leak a family's case
 * because it never receives one.
 *
 * The empty state is designed, not accidental. A rate with no denominator
 * renders "--", never 0%. "Not yet measurable" and "failing" are different
 * claims, and a product that has just launched must not report the second
 * when the first is true.
 */

import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";

export const metadata = {
  title: "Adhikaar — how the product is performing",
  description:
    "Live usage metrics for Adhikaar: claim-ready journeys, the funnel, and the honest-exit guardrail. No login required.",
};

export const revalidate = 300;

type Metrics = {
  window: { from: string; to: string };
  northStar: { weeklyClaimReadyJourneys: number };
  funnel: {
    landingVisitors: number;
    journeysStarted: number;
    claimReadyJourneys: number;
    showingIntent: number;
    journeyStartRate: number | null;
    claimReadyJourneyRate: number | null;
    nextStepActionRate: number | null;
  };
  guardrail: {
    honestExitRate: number | null;
    honestExits: number;
    outcomesReached: number;
  };
  perQuestion: Record<string, number>;
  outcomes: Record<string, number>;
  arrivedVia: Record<string, number>;
  dataQuality: { eventsConsidered: number; developmentEventsExcluded: number };
  generatedAt: string;
};

/** A rate, or an em dash. Never 0% standing in for "nothing has happened yet". */
function pct(v: number | null): string {
  return v === null ? "—" : `${v}%`;
}

async function getMetrics(): Promise<Metrics | null> {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
  try {
    const res = await fetch(`${base}/api/metrics`, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as Metrics;
  } catch {
    return null;
  }
}

export default async function MetricsPage() {
  const m = await getMetrics();

  return (
    <>
      <RecoverNav />
      <main className="flex-1 bg-mist">
        <div className="shell max-w-[860px] py-10 sm:py-14">
          <p className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-saffron-ink">
            Product metrics
          </p>
          <h1 className="display-lg mt-2 font-serif font-bold text-indigo-ink">
            How Adhikaar is performing
          </h1>
          <p className="body-fluid mt-3 max-w-[62ch] text-ink-soft">
            Live figures, no sign-in. Aggregate counts only — this page never
            receives an identifier, a URL, or anything a family typed.
          </p>

          {!m ? (
            <div className="actionbox mt-8">
              <p className="text-[1.0625rem] font-bold text-indigo-ink">
                Metrics are unavailable right now.
              </p>
              <p className="body-fluid mt-2 text-ink-soft">
                The figures could not be fetched. This page reports nothing
                rather than showing a number it cannot stand behind.
              </p>
            </div>
          ) : (
            <>
              <section className="mt-8">
                <div className="actionbox">
                  <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-saffron-ink">
                    North Star · last 7 days
                  </p>
                  <p className="display-xl mt-1 font-serif font-bold text-indigo-ink">
                    {m.northStar.weeklyClaimReadyJourneys}
                  </p>
                  <p className="body-fluid mt-1 text-ink-soft">
                    Weekly Claim-Ready Journeys — journeys reaching a complete,
                    actionable claim path. A count, not a rate: helping 600 of
                    1,000 families is more families helped than 80 of 100.
                  </p>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="display-md font-serif font-bold text-indigo-ink">
                  The funnel
                </h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-rule">
                        <th className="py-2 pr-4 text-[0.9375rem] font-bold">Stage</th>
                        <th className="py-2 pr-4 text-[0.9375rem] font-bold">Journeys</th>
                        <th className="py-2 text-[0.9375rem] font-bold">Rate to next</th>
                      </tr>
                    </thead>
                    <tbody className="text-[1rem]">
                      <tr className="border-b border-rule-faint">
                        <td className="py-2.5 pr-4">Landing visitors</td>
                        <td className="py-2.5 pr-4 font-bold">{m.funnel.landingVisitors}</td>
                        <td className="py-2.5">{pct(m.funnel.journeyStartRate)}</td>
                      </tr>
                      <tr className="border-b border-rule-faint">
                        <td className="py-2.5 pr-4">Journeys started</td>
                        <td className="py-2.5 pr-4 font-bold">{m.funnel.journeysStarted}</td>
                        <td className="py-2.5">{pct(m.funnel.claimReadyJourneyRate)}</td>
                      </tr>
                      <tr className="border-b border-rule-faint bg-white/60">
                        <td className="py-2.5 pr-4 font-bold">★ Claim-ready journeys</td>
                        <td className="py-2.5 pr-4 font-bold">{m.funnel.claimReadyJourneys}</td>
                        <td className="py-2.5">{pct(m.funnel.nextStepActionRate)}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4">Showing intent to act</td>
                        <td className="py-2.5 pr-4 font-bold">{m.funnel.showingIntent}</td>
                        <td className="py-2.5">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-[0.9375rem] text-ink-faint">
                  Claim initiation and successful claims sit below this funnel
                  and are deliberately not measurable here: the product keeps no
                  account and no record of a claim, so it cannot see what happens
                  after the tab closes. Those two can only come from follow-up
                  research.
                </p>
              </section>

              <section className="mt-10">
                <h2 className="display-md font-serif font-bold text-indigo-ink">
                  Guardrail — Honest-Exit Rate
                </h2>
                <p className="display-md mt-2 font-serif font-bold text-indigo-ink">
                  {pct(m.guardrail.honestExitRate)}
                </p>
                <p className="body-fluid mt-2 max-w-[62ch] text-ink-soft">
                  {m.guardrail.honestExits} of {m.guardrail.outcomesReached}{" "}
                  journeys ended in a dispute, above-threshold, already-in-court
                  or out-of-scope verdict. This exists because the North Star
                  could be inflated by telling people what they want to hear. If
                  claim-ready journeys rise while this falls, the product is
                  manufacturing false confidence — that is a reason to review the
                  logic, not to celebrate.
                </p>
              </section>

              {Object.keys(m.perQuestion).length > 0 && (
                <section className="mt-10">
                  <h2 className="display-md font-serif font-bold text-indigo-ink">
                    Where the journey leaks
                  </h2>
                  <p className="body-fluid mt-2 max-w-[62ch] text-ink-soft">
                    Answers recorded at each step. A whole-funnel drop-off number
                    would only restate the rate above; this locates the question
                    that actually loses people.
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {Object.entries(m.perQuestion)
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([step, n]) => (
                        <li key={step} className="flex items-baseline gap-3 text-[1rem]">
                          <span className="w-[6.5rem] shrink-0 text-ink-soft">
                            Question {step}
                          </span>
                          <span className="font-bold text-indigo-ink">{n}</span>
                        </li>
                      ))}
                  </ul>
                </section>
              )}

              <section className="mt-10 border-t border-rule-faint pt-5">
                <p className="text-[0.9375rem] text-ink-faint">
                  Window {m.window.from} to {m.window.to} ·{" "}
                  {m.dataQuality.eventsConsidered} events counted ·{" "}
                  {m.dataQuality.developmentEventsExcluded} development events
                  excluded · refreshed every 5 minutes.
                </p>
                <p className="mt-2 text-[0.9375rem] text-ink-faint">
                  Rates with no denominator render “—” rather than 0%. Nothing
                  measurable and nothing working are different claims.
                </p>
              </section>
            </>
          )}
        </div>
      </main>
      <RecoverFooter />
    </>
  );
}
