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
  return (Math.min(100, Math.max(0, (value / first) * 100))).toString() + "%";
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
  const stages = m ? [
    { label: "Visited the website", value: m.funnel.landingVisitors, note: "Opened the home page.", color: "bg-[#5967A8]" },
    { label: "Started a journey", value: m.funnel.journeysStarted, note: "Began looking for help.", color: "bg-[#7263A5]" },
    { label: "Reached an answer", value: m.funnel.resolvedJourneys, note: "Got a claim route or learned what to check next.", color: "bg-[#246F61]" },
    { label: "Chose a next step", value: m.funnel.showingIntent, note: "Printed a guide, opened counter mode, or clicked to continue.", color: "bg-[#B84B28]" },
  ] : [];
  const scale = Math.max(1, ...stages.map(s => s.value));
  return (
    <>
      <RecoverNav />
      <main className="flex-1 bg-[#F5F3EE] text-[#16233F]">
        <div className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 sm:py-12">
          <header className="rounded-3xl bg-[#16233F] p-6 text-white sm:p-9">
            <p className="text-sm font-bold uppercase tracking-widest text-[#F0B892]">Adhikaar · Our progress</p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">Are we making claims easier?</h1>
            <p className="mt-4 text-base leading-7 text-white/85 sm:text-lg">
              Follow the journey from visiting Adhikaar to finding a next step.
              These numbers show how the website is being used. They do not tell us whether a bank paid a claim.
            </p>
            {m && <p className="mt-5 inline-block rounded-full bg-white/10 px-4 py-2 text-sm">Reporting period: {m.window.from} to {m.window.to}</p>}
          </header>
          {!m ? (
            <section className="mt-6 rounded-2xl border border-rule bg-white p-8">
              <h2 className="text-2xl font-bold">We couldn’t load the numbers.</h2>
              <p className="mt-3 text-lg text-ink-soft">Please try again later. Missing data does not mean nobody used Adhikaar.</p>
              <a href="/metrics" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-indigo px-6 py-3 font-bold text-white">Try again</a>
            </section>
          ) : (
            <>
              <section aria-label="The main numbers" className="mt-6 grid gap-4 md:grid-cols-3">
                <MetricCard label="Answers reached this week" value={String(m.northStar.weeklyResolvedJourneys)} accent="saffron"
                  note="Journeys that reached a clear answer or next step in the last 7 days. This is our main measure of progress." />
                <MetricCard label="Journey resolution rate" value={pct(m.omtm.resolutionRate)}
                  note={m.omtm.cohortResolved + " of " + m.omtm.cohortStarted + " journeys started in this reporting period reached an answer."} />
                <MetricCard label="Chose a next step" value={pct(m.funnel.nextStepActionRate)} accent="violet"
                  note={m.funnel.showingIntent + " of " + m.funnel.nextStepEligibleJourneys + " journeys with an available action used it."} />
              </section>
              <p className="mt-3 text-sm leading-6 text-ink-soft">A dash (—) means there is not enough data to calculate a percentage. We count journeys; one person can start more than one.</p>

              <section className="mt-8 rounded-3xl border border-rule bg-white p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-bold">The journey, step by step</h2>
                <p className="mt-2 text-base leading-7 text-ink-soft">Longer bars mean more activity at that step.</p>
                <ol className="mt-6 space-y-6">
                  {stages.map((s, i) => (
                    <li key={s.label} className="flex gap-3 sm:gap-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0EDE5] font-bold" aria-hidden="true">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3"><h3 className="text-lg font-bold">{s.label}</h3><span className="text-2xl font-bold tabular-nums">{s.value.toLocaleString("en-IN")}</span></div>
                        <div aria-hidden="true" className="mt-2 h-3 overflow-hidden rounded-full bg-[#EFEEE9]"><div className={"h-full rounded-full " + s.color} style={{ width: funnelWidth(s.value, scale) }} /></div>
                        <p className="mt-2 text-base leading-6 text-ink-soft">{s.note}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <details className="mt-6 border-t border-rule pt-4">
                  <summary className="cursor-pointer py-2 font-semibold">How to read these numbers</summary>
                  <p className="mt-2 leading-7 text-ink-soft">Some journeys begin from a shared link, without visiting the home page. These totals are not all the same group moving through each step. The action percentage only includes journeys with an available action; opening an official search resource may not offer a printable guide.</p>
                </details>
              </section>

              <section className="mt-8">
                <h2 className="font-serif text-3xl font-bold">What did people need help with?</h2>
                <p className="mt-2 leading-7 text-ink-soft">See how each starting situation led to an answer.</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {Object.entries(m.funnel.startedByBranch).sort(([,a],[,b]) => b-a).map(([key,n]) => (
                    <article key={key} className="rounded-2xl border border-rule bg-white p-5">
                      <h3 className="text-lg font-bold">{BRANCH_LABELS[key] ?? "Other starting situation"}</h3>
                      <p className="mt-3 text-base text-ink-soft"><strong className="text-indigo-ink">{m.funnel.resolvedByBranch[key] ?? 0}</strong> of {n} journeys reached an answer.</p>
                      <div aria-hidden="true" className="mt-3 h-2 overflow-hidden rounded-full bg-[#EFEEE9]"><div className="h-full rounded-full bg-[#246F61]" style={{ width: funnelWidth(m.funnel.resolvedByBranch[key] ?? 0,n) }} /></div>
                      <p className="mt-2 text-sm text-ink-soft">{pct(m.funnel.resolutionRateByBranch[key] ?? null)} reached an answer</p>
                    </article>
                  ))}
                </div>
                {Object.keys(m.funnel.startedByBranch).length === 0 && <p className="mt-4 rounded-2xl bg-white p-6 text-ink-soft">No starting situations have been recorded yet.</p>}
              </section>

              <details className="mt-8 rounded-2xl border border-rule bg-white p-6">
                <summary className="cursor-pointer py-2 text-xl font-bold">A closer look: questions, feedback and quality</summary>
                <section className="mt-6">
                  <h2 className="text-xl font-bold">Which questions were answered?</h2>
                  <p className="mt-2 leading-7 text-ink-soft">Some journeys finish early. Fewer answers at a later question do not always mean people gave up.</p>
                  <ul className="mt-3 divide-y divide-rule">
                    {Object.entries(m.perQuestion).sort(([a],[b]) => Number(a)-Number(b)).map(([step,n]) => <li key={step} className="flex justify-between gap-4 py-3"><span>Question {step}</span><strong>{n} recorded</strong></li>)}
                  </ul>
                  {!Object.keys(m.perQuestion).length && <p className="mt-3 text-ink-soft">No question activity recorded yet.</p>}
                </section>
                <section className="mt-6">
                  <h2 className="text-xl font-bold">How long did an answer take?</h2>
                  <p className="mt-2 text-2xl font-bold">{m.efficiency.medianTimeToResolutionSeconds === null ? "Not enough data yet" : Math.round(m.efficiency.medianTimeToResolutionSeconds) + " seconds"}</p>
                  <p className="mt-2 leading-7 text-ink-soft">The middle time across recorded journeys, from entering a situation to reaching an answer.</p>
                </section>
                <section className="mt-6">
                  <h2 className="text-xl font-bold">What did people expect?</h2>
                  <p className="mt-2 text-2xl font-bold">{pct(m.validation.beliefCorrectionRate)}</p>
                  <p className="mt-2 leading-7 text-ink-soft">Among {m.validation.beliefResponses} survey responses, this share expected to need a succession certificate. This measures their starting belief; it does not prove that their belief changed. Survey base: {m.validation.beliefBase}.</p>
                </section>
                <h2 className="mt-8 text-xl font-bold">Checks on our guidance</h2>
                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  <Guardrail label="Cases needing a different route" question="What counts here?" value={pct(m.guardrails.honestExitRate)}>
                    {m.guardrails.honestExits} of {m.guardrails.journeysReachingOutcome} journeys reaching a verdict or a review page involved a dispute, an above-threshold claim, a court case, an unsupported asset, or an unresolved detail needing confirmation. Changes in this share need context.
                  </Guardrail>
                  <Guardrail label="Answers from situation pages" question="Where did the answer come from?" value={pct(m.guardrails.situationResolutionShare)}>
                    The share of answers provided by situation pages instead of claim verdict pages. This helps us see which kind of help people used.
                  </Guardrail>
                  <Guardrail label="Bank sources due for review" question="How recently were sources checked?" value={pct(m.guardrails.staleCitationShare)}>
                    Of {m.guardrails.journeysCitingABank} journeys citing a bank policy, this share used a source last checked more than six months ago.
                  </Guardrail>
                </div>
                <p className={"mt-4 leading-7 " + (m.guardrails.rulesStale ? "font-bold text-maroon" : "text-ink-soft")}>RBI sources last checked: {m.guardrails.rulesVerifiedOn}.{m.guardrails.rulesStale ? " They are due for another review." : ""}</p>
              </details>
              <footer className="mt-6 text-sm leading-6 text-ink-soft">
                <p>{m.dataQuality.eventsConsidered.toLocaleString("en-IN")} events counted · Figures refresh every 5 minutes.</p>
                <p>Only totals are shown here. No names, account details or chat messages.</p>
              </footer>
            </>
          )}
        </div>
      </main>
      <RecoverFooter />
    </>
  );
}
