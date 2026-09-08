/**
 * The public metrics page.
 *
 * Deliberately login-free. Every number this product claims about itself
 * should be checkable by the person reading the claim -- and since 7 Sep
 * 2026 that number comes straight from Adhikaar's own database, not a
 * vendor's dashboard that would need a login of its own. This page is the
 * answer to "prove it" -- the same reason a metrics view was submitted
 * alongside the previous project's document.
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
    "Live usage metrics for Adhikaar: resolved journeys, the funnel by entry door, and three guardrails. No login required.",
};

export const revalidate = 300;

/**
 * ⚠️ This type is hand-written against /api/metrics' response, not derived
 * from it, so TypeScript cannot catch a field the route renames. It went
 * stale exactly that way on 7 Sep 2026, when the North Star was renamed and
 * this page kept reading `weeklyClaimReadyJourneys` off a body that no longer
 * had one. If you change a field name in lib/metrics.ts's return, change it
 * here in the same commit and load the page once.
 */
type Metrics = {
  window: { from: string; to: string };
  northStar: { weeklyResolvedJourneys: number };
  omtm: {
    metric: string;
    resolutionRate: number | null;
    cohortStarted: number;
    cohortResolved: number;
  };
  funnel: {
    landingVisitors: number;
    journeysStarted: number;
    resolvedJourneys: number;
    showingIntent: number;
    journeyStartRate: number | null;
    resolutionRate: number | null;
    nextStepActionRate: number | null;
    nextStepEligibleJourneys: number;
    resolvedBySource: Record<string, number>;
    startedByBranch: Record<string, number>;
    resolvedByBranch: Record<string, number>;
    resolutionRateByBranch: Record<string, number | null>;
  };
  guardrails: {
    honestExitRate: number | null;
    honestExits: number;
    journeysReachingOutcome: number;
    situationResolutionShare: number | null;
    staleCitationShare: number | null;
    journeysCitingABank: number;
    rulesVerifiedOn: string;
    rulesStale: boolean;
  };
  validation: {
    beliefCorrectionRate: number | null;
    beliefResponses: number;
    beliefBase: string;
  };
  efficiency: { medianTimeToResolutionSeconds: number | null };
  perQuestion: Record<string, number>;
  outcomes: Record<string, number>;
  arrivedVia: Record<string, number>;
  dataQuality: { eventsConsidered: number };
  generatedAt: string;
};

function funnelWidth(value: number, first: number): string {
  if (!first) return "0%";
  return (Math.max(4, Math.round((value / first) * 100))).toString() + "%";
}

function MetricCard({
  label,
  value,
  note,
  accent = "plain",
}: {
  label: string;
  value: string;
  note: string;
  accent?: "plain" | "saffron" | "violet";
}) {
  const accents = {
    plain: "border-rule bg-white",
    saffron: "border-[#E8B36D] bg-[#FFF7E8]",
    violet: "border-[#BDB4E2] bg-[#F5F2FC]",
  } as const;
  return (
    <article className={"rounded-2xl border-2 p-5 " + accents[accent]}>
      <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <p className="mt-2 font-serif text-[2.75rem] font-bold leading-none text-indigo-ink">{value}</p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{note}</p>
    </article>
  );
}

/** A rate, or an em dash. Never 0% standing in for "nothing has happened yet". */
function pct(v: number | null): string {
  return v === null ? "—" : `${v}%`;
}

/**
 * One guardrail, as a tile: name, number, and its reasoning behind an ⓘ.
 *
 * The three used to be full-width bordered blocks stacked down the page, each
 * carrying its whole paragraph in the open. Three stacked boxes of prose read
 * as three unrelated sections rather than one row of checks you scan, so the
 * numbers -- the part you actually come here for -- were separated by about a
 * screen of text each. The reasoning is not cut, only folded: it is the part
 * that makes these numbers honest and it is one tap away.
 *
 * <details> rather than a floating popover, for two reasons: this page is a
 * server component with no client state, and a panel positioned over a tile
 * one-third of a phone screen wide has nowhere to go. Opening one pushes its
 * own tile taller and the grid row grows with it. The print rules in
 * globals.css force every <details> open, so a printed copy carries all three
 * arguments whether or not the reader tapped anything.
 */
function Guardrail({
  label,
  question,
  value,
  children,
}: {
  label: string;
  /** The thing this number is actually asking, shown when the ⓘ is open. */
  question: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <details className="actionbox group">
      {/* The whole tile is the summary -- name, ⓘ and number together --
          rather than the ⓘ being a control inside a flex row. A <details>
          panel is a sibling of its summary and takes the width of the
          <details>, so putting the summary in a shrink-0 flex cell would size
          the reasoning to a 24px circle. It also makes the whole tile the tap
          target, which is the right size on a phone. */}
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-start justify-between gap-3">
          <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-saffron-ink">
            {label}
          </span>
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-indigo font-serif text-[0.8125rem] font-bold italic text-indigo"
          >
            i
          </span>
        </span>
        <span className="display-md mt-2 block font-serif font-bold text-indigo-ink">
          {value}
        </span>
      </summary>
      <div className="mt-3 border-t border-rule pt-3">
        <p className="text-[0.9375rem] font-bold text-indigo-ink">{question}</p>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
          {children}
        </p>
      </div>
    </details>
  );
}

/**
 * The five doors, in the reader's words rather than the event's.
 * "unattributed" is every journey started before `branch` existed.
 */
const BRANCH_LABELS: Record<string, string> = {
  new: "Have not started the claim",
  started: "Already started the claim",
  asked: "Bank asked for something",
  refused: "Bank refused or delayed",
  find: "Do not know where the money is",
  shared: "Opened a shared link",
  unattributed: "Before this was recorded",
};

/**
 * Does this body have the shape this page renders?
 *
 * `res.ok` is not enough. A 200 carrying an OLDER shape is the realistic
 * failure -- the fetch above is cached for `revalidate` seconds, so across a
 * deploy that renames a field there is a window where a stale body is served
 * to new code. That happened on 7 Sep 2026 and threw a 500 on the one page
 * whose entire job is to let a reader check the product's claims.
 *
 * A missing section is treated exactly like an unreachable endpoint: the
 * designed empty state, which says plainly that nothing could be fetched.
 * That is this page's own rule -- report nothing rather than a number it
 * cannot stand behind -- applied to its own contract.
 */
function isCurrentShape(body: unknown): body is Metrics {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return ["northStar", "omtm", "funnel", "guardrails", "validation", "efficiency"].every(
    (k) => typeof b[k] === "object" && b[k] !== null,
  );
}

async function getMetrics(): Promise<Metrics | null> {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
  try {
    const res = await fetch(`${base}/api/metrics`, { next: { revalidate } });
    if (!res.ok) return null;
    const body: unknown = await res.json();
    return isCurrentShape(body) ? body : null;
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
        <div className="shell max-w-[1180px] py-8 sm:py-12">
          <section className="mb-8 overflow-hidden rounded-3xl bg-[#16233F] px-6 py-7 text-white shadow-[0_18px_50px_rgba(22,35,63,0.18)] sm:px-9 sm:py-9">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[#F0B892]">
              Adhikaar / product pulse
            </p>
            <h1 className="mt-2 font-serif text-[2.35rem] font-bold leading-tight sm:text-[3.25rem]">
              Is the claim journey helping?
            </h1>
            <p className="mt-3 max-w-[58ch] text-[1.05rem] leading-relaxed text-white/75">
              A clear view of who starts, who gets an answer, and where the journey needs work.
            </p>
            <p className="mt-7 text-[0.8125rem] text-white/55">
              Aggregate counts only · no names, URLs, messages or account information
            </p>
          </section>
          <p className="hidden text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-saffron-ink">
            Product metrics
          </p>
          <h1 className="hidden display-lg mt-2 font-serif font-bold text-indigo-ink">
            How Adhikaar is performing
          </h1>
          <p className="hidden body-fluid mt-3 max-w-[62ch] text-ink-soft">
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
              <section className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
                <MetricCard
                  label="North Star · last 7 days"
                  value={String(m.northStar.weeklyResolvedJourneys)}
                  accent="saffron"
                  note="Weekly resolved journeys: people who received a valid, situation-appropriate answer."
                />
                <MetricCard
                  label="This quarter’s metric"
                  value={pct(m.omtm.resolutionRate)}
                  note={m.omtm.cohortResolved + " of " + m.omtm.cohortStarted + " journeys went on to resolve."}
                />
                <MetricCard
                  label="Showing intent to act"
                  value={pct(m.funnel.nextStepActionRate)}
                  accent="violet"
                  note={m.funnel.showingIntent + " of " + m.funnel.nextStepEligibleJourneys + " resolved journeys took a next step."}
                />
              </section>

              <section className="mt-10 hidden">
                <div className="actionbox">
                  <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-saffron-ink">
                    North Star · last 7 days
                  </p>
                  <p className="display-xl mt-1 font-serif font-bold text-indigo-ink">
                    {m.northStar.weeklyResolvedJourneys}
                  </p>
                  <p className="body-fluid mt-1 text-ink-soft">
                    Weekly Resolved Journeys — journeys that received a valid,
                    situation-appropriate resolution, whether that is a claim
                    route or a clear answer about what to establish next. A
                    count, not a rate: helping 600 of 1,000 families is more
                    families helped than 80 of 100.
                  </p>
                  <p className="mt-3 border-t border-rule-faint pt-3 text-[0.9375rem] text-ink-soft">
                    <span className="font-bold text-indigo-ink">
                      This quarter&rsquo;s one metric — {m.omtm.metric}:{" "}
                      {pct(m.omtm.resolutionRate)}
                    </span>{" "}
                    · {m.omtm.cohortResolved} of {m.omtm.cohortStarted} journeys
                    that started in this window went on to resolve. It stays the
                    metric that matters even while it reads “—”; insufficient
                    data is the honest answer, not a reason to report a
                    different number.
                  </p>
                  {/* Stated rather than left to be discovered. Someone who
                      opens this expecting live figures and sees a low number
                      should know whether they are looking at "nothing
                      happened" or "the last hour has not landed yet" — the
                      same distinction the "—" rule makes elsewhere. */}
                  <p className="mt-2 text-[0.9375rem] text-ink-faint">
                    Figures update hourly. Usage from the past hour may not
                    appear yet — this reads from an export that trails live
                    traffic, so a low number here can mean “not yet counted”
                    rather than “did not happen”.
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
                        <td className="py-2.5 pr-4"><span>Landing visitors</span><span className="mt-1 block h-2 rounded-full bg-[#5967A8]" style={{ width: funnelWidth(m.funnel.landingVisitors, m.funnel.landingVisitors) }} /></td>
                        <td className="py-2.5 pr-4 font-bold">{m.funnel.landingVisitors}</td>
                        <td className="py-2.5">{pct(m.funnel.journeyStartRate)}</td>
                      </tr>
                      <tr className="border-b border-rule-faint">
                        <td className="py-2.5 pr-4"><span>Journeys started</span><span className="mt-1 block h-2 rounded-full bg-[#5967A8]" style={{ width: funnelWidth(m.funnel.journeysStarted, m.funnel.landingVisitors) }} /></td>
                        <td className="py-2.5 pr-4 font-bold">{m.funnel.journeysStarted}</td>
                        <td className="py-2.5">{pct(m.funnel.resolutionRate)}</td>
                      </tr>
                      <tr className="border-b border-rule-faint bg-white/60">
                        <td className="py-2.5 pr-4 font-bold">★ Resolved journeys</td>
                        <td className="py-2.5 pr-4 font-bold">{m.funnel.resolvedJourneys}</td>
                        <td className="py-2.5">{pct(m.funnel.nextStepActionRate)}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4"><span>Showing intent to act</span><span className="mt-1 block h-2 rounded-full bg-[#5967A8]" style={{ width: funnelWidth(m.funnel.showingIntent, m.funnel.landingVisitors) }} /></td>
                        <td className="py-2.5 pr-4 font-bold">{m.funnel.showingIntent}</td>
                        <td className="py-2.5">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-[0.9375rem] text-ink-faint">
                  The last rate divides by the {m.funnel.nextStepEligibleJourneys}{" "}
                  journeys that had something to act on. A resolution that points
                  at an official search tool has no printable sheet or counter
                  mode, so counting it as a failure to act would penalise the
                  product for a page working exactly as designed.
                </p>
                <p className="mt-3 text-[0.9375rem] text-ink-faint">
                  Claim initiation and successful claims sit below this funnel
                  and are deliberately not measurable here: the product keeps no
                  account and no record of a claim, so it cannot see what happens
                  after the tab closes. Those two can only come from follow-up
                  research.
                </p>
              </section>

              {Object.keys(m.funnel.startedByBranch).length > 0 && (
                <section className="mt-10">
                  <h2 className="display-md font-serif font-bold text-indigo-ink">
                    By the door people came in through
                  </h2>
                  <p className="body-fluid mt-2 max-w-[62ch] text-ink-soft">
                    One resolution rate across five different journeys hides
                    which of them works. A reader holding a demand from a bank
                    and a reader who does not know where the money is are not
                    the same problem.
                  </p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b-2 border-rule">
                          <th className="py-2 pr-4 text-[0.9375rem] font-bold">Door</th>
                          <th className="py-2 pr-4 text-[0.9375rem] font-bold">Started</th>
                          <th className="py-2 pr-4 text-[0.9375rem] font-bold">Resolved</th>
                          <th className="py-2 text-[0.9375rem] font-bold">Rate</th>
                        </tr>
                      </thead>
                      <tbody className="text-[1rem]">
                        {Object.entries(m.funnel.startedByBranch)
                          .sort(([, a], [, b]) => b - a)
                          .map(([branch, n]) => (
                            <tr key={branch} className="border-b border-rule-faint">
                              <td className="py-2.5 pr-4">{BRANCH_LABELS[branch] ?? branch}</td>
                              <td className="py-2.5 pr-4 font-bold">{n}</td>
                              <td className="py-2.5 pr-4 font-bold">
                                {m.funnel.resolvedByBranch[branch] ?? 0}
                              </td>
                              <td className="py-2.5">
                                {pct(m.funnel.resolutionRateByBranch[branch] ?? null)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              <section className="mt-10">
                <h2 className="display-md font-serif font-bold text-indigo-ink">
                  Guardrails
                </h2>
                <p className="body-fluid mt-2 max-w-[62ch] text-ink-soft">
                  Three checks that a rising North Star is real — each answers a
                  different way the number could look good while the product got
                  worse.
                </p>

                {/* One row, so the three numbers can be read against each
                    other at a glance -- they are three checks on the same
                    claim, and stacked full-width, each behind a paragraph,
                    they read as three unrelated sections. No argument is cut:
                    each sits behind its own ⓘ. See Guardrail. */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Guardrail
                    label="Honest-Exit Rate"
                    question="Are we still telling the unwelcome truth?"
                    value={pct(m.guardrails.honestExitRate)}
                  >
                    {m.guardrails.honestExits} of{" "}
                    {m.guardrails.journeysReachingOutcome} journeys reaching a
                    verdict ended in a dispute, above-threshold, already-in-court
                    or out-of-scope one. The North Star could be inflated by
                    telling people what they want to hear. If resolved journeys
                    rise while this falls, the product is manufacturing false
                    confidence — a reason to review the logic, not to celebrate.
                  </Guardrail>

                  <Guardrail
                    label="Situation Resolution Share"
                    question="Is the number growing by delivery or by definition?"
                    value={pct(m.guardrails.situationResolutionShare)}
                  >
                    The share of resolutions that came from a situation branch
                    rather than a verdict. The Honest-Exit Rate cannot see this:
                    it reads verdicts only, so it would not notice the cheapest
                    way to raise a resolution count, which is to declare more
                    pages resolutions. There is deliberately no target — a high
                    share is not bad, because those resolutions are real value.
                    What matters is the move. If it climbs while verdicts stay
                    flat, ask whether the traffic changed or the definition did.
                  </Guardrail>

                  <Guardrail
                    label="Stale Citation Share"
                    question="Is the evidence still true?"
                    value={pct(m.guardrails.staleCitationShare)}
                  >
                    Of the {m.guardrails.journeysCitingABank} journeys that cited
                    a specific bank&rsquo;s published policy, the share citing a
                    record more than six months past its last check. The
                    bank-by-bank table is the part of this product that decays
                    without anyone touching it.
                  </Guardrail>
                </div>

                {/* Provenance while fresh, a real warning once it is not.
                    Out of the Stale Citation tile and under the row since the
                    tiles went side by side: it is a standing fact about the
                    whole RBI clause set, carrying its own date, not a reading
                    of that percentage -- and inside a tile it would have been
                    the one line of body text in a row of bare numbers. */}
                {m.guardrails.rulesStale ? (
                  <p className="mt-4 max-w-[62ch] text-[0.9375rem] font-bold text-maroon">
                    The RBI clauses are past their check window — last read
                    against the notification on {m.guardrails.rulesVerifiedOn},
                    and due a re-read.
                  </p>
                ) : (
                  <p className="mt-4 text-[0.9375rem] text-ink-faint">
                    RBI clauses last checked {m.guardrails.rulesVerifiedOn}.
                  </p>
                )}
              </section>

              <section className="mt-10">
                <h2 className="display-md font-serif font-bold text-indigo-ink">
                  Is the belief actually being corrected?
                </h2>
                <p className="display-md mt-2 font-serif font-bold text-indigo-ink">
                  {pct(m.validation.beliefCorrectionRate)}
                </p>
                <p className="body-fluid mt-2 max-w-[62ch] text-ink-soft">
                  Of {m.validation.beliefResponses} people who answered, the
                  share who arrived believing they needed a succession
                  certificate. That belief is the thing the product exists to
                  correct, and it cannot be inferred from behaviour, so it is
                  the one question the site asks.
                </p>
                <p className="mt-2 text-[0.9375rem] text-ink-faint">
                  Base: {m.validation.beliefBase}. The question only appears
                  where the answer is good news — asking someone who genuinely
                  does need a certificate whether they expected to would measure
                  nothing.
                </p>
                {m.efficiency.medianTimeToResolutionSeconds !== null && (
                  <p className="body-fluid mt-4 text-ink-soft">
                    <span className="font-bold text-indigo-ink">
                      Median time to resolution:{" "}
                      {Math.round(m.efficiency.medianTimeToResolutionSeconds / 60)}{" "}
                      min
                    </span>{" "}
                    · from entering a branch to receiving an answer. This should
                    be minutes. A correct answer that takes twenty minutes to
                    extract has still failed the person asking.
                  </p>
                )}
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
                  {m.dataQuality.eventsConsidered} events counted · refreshed
                  every 5 minutes.
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
