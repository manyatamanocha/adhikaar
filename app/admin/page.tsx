/**
 * The metrics dashboard. Not linked from anywhere on the public site, not
 * in `RecoverNav`, disallowed in `app/robots.ts`, and gated behind
 * `ADMIN_PASSWORD` (lib/admin-auth.ts) -- a visitor who finds this URL by
 * guessing still can't see anything without the password.
 *
 * North Star: Actionable Next-Step Rate -- of everyone who meaningfully
 * started the decision journey (answered the first wizard question), how
 * many reached one of the product's two valid terminal states: a resolved
 * claim route, or a resolved "here is what to find out next." Secondary:
 * Next-Step Intent Rate -- of those who reached one, how many clicked the
 * button saying they felt ready to act on it.
 *
 * No fabricated numbers, ever: if the Mixpanel Service Account isn't
 * configured yet, or the query fails, this renders an honest empty/error
 * state that says so, never a plausible-looking placeholder.
 */

import { cookies } from "next/headers";
import { isValidSessionCookie, ADMIN_COOKIE_NAME, isAdminConfigured } from "@/lib/admin-auth";
import { queryMixpanelCounts, isMixpanelQueryConfigured, type MixpanelCounts } from "@/lib/mixpanel-query";
import { LoginForm } from "./login-form";
import { logout } from "./actions";

export const metadata = { title: "Admin — Adhikaar", robots: { index: false, follow: false } };

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const jar = await cookies();
  const authed = isValidSessionCookie(jar.get(ADMIN_COOKIE_NAME)?.value);

  if (!authed) {
    return (
      <main className="shell max-w-[480px] flex-1 py-14">
        <h1 className="display-xl font-serif font-bold text-indigo-ink">Admin</h1>
        {!isAdminConfigured() ? (
          <p className="mt-4 text-ink-soft">
            <strong className="font-bold text-maroon">ADMIN_PASSWORD is not set.</strong>{" "}
            Add it to the server environment before this page can be unlocked.
          </p>
        ) : (
          <LoginForm />
        )}
      </main>
    );
  }

  const sp = await searchParams;
  const from = typeof sp.from === "string" ? sp.from : isoDaysAgo(30);
  const to = typeof sp.to === "string" ? sp.to : isoDaysAgo(0);

  const configured = isMixpanelQueryConfigured();
  const result = configured ? await queryMixpanelCounts(from, to) : null;

  return (
    <main className="shell max-w-[900px] flex-1 py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="display-xl font-serif font-bold text-indigo-ink">Metrics</h1>
          <p className="mt-1 text-ink-soft">{from} to {to}</p>
        </div>
        <form action={logout}>
          <button type="submit" className="text-[0.9375rem] font-bold text-link underline underline-offset-2">
            Log out
          </button>
        </form>
      </div>

      <form className="mt-6 flex flex-wrap items-end gap-4" data-print="hide">
        <div>
          <label htmlFor="from" className="block text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">From</label>
          <input id="from" name="from" type="date" defaultValue={from} className="mt-1 rounded-lg border-2 border-rule bg-white px-3 py-2 text-[1rem]" />
        </div>
        <div>
          <label htmlFor="to" className="block text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">To</label>
          <input id="to" name="to" type="date" defaultValue={to} className="mt-1 rounded-lg border-2 border-rule bg-white px-3 py-2 text-[1rem]" />
        </div>
        <button type="submit" className="rounded-pill border-2 border-indigo px-5 py-2 text-[1rem] font-bold text-indigo transition-colors hover:bg-indigo/8">
          Update range
        </button>
      </form>

      {!configured && (
        <div className="hardbox mt-8">
          <h2 className="display-md font-serif font-bold text-maroon">Mixpanel query access isn&apos;t configured yet</h2>
          <p className="mt-2 text-ink">
            Set <code>MIXPANEL_PROJECT_ID</code>, <code>MIXPANEL_SERVICE_ACCOUNT_USERNAME</code>,{" "}
            <code>MIXPANEL_SERVICE_ACCOUNT_SECRET</code> and <code>MIXPANEL_REGION</code> (<code>eu</code>, <code>in</code>, or{" "}
            <code>us</code> — must match where the Mixpanel project was created) on the server, then reload this page.
          </p>
        </div>
      )}

      {result && !result.ok && result.reason === "request_failed" && (
        <div className="hardbox mt-8">
          <h2 className="display-md font-serif font-bold text-maroon">The Mixpanel query failed</h2>
          <p className="mt-2 text-ink">Status {result.status}. Check the Service Account credentials and that <code>MIXPANEL_REGION</code> matches the project&apos;s data residency.</p>
          <p className="mt-2 font-mono text-[0.875rem] text-ink-faint break-all">{result.body.slice(0, 500)}</p>
        </div>
      )}

      {result && result.ok && <Dashboard counts={result.counts} />}
    </main>
  );
}

function count(counts: MixpanelCounts, event: string, bucket: string): number {
  return counts[event]?.[bucket] ?? 0;
}

function Dashboard({ counts }: { counts: MixpanelCounts }) {
  const startedFirstQuestion = count(counts, "question_answered", "step_1");
  const actionableClaim = count(counts, "actionable_result_viewed", "claim_route");
  const actionableInfo = count(counts, "actionable_result_viewed", "information_required");
  const actionableTotal = actionableClaim + actionableInfo;
  const intentClaim = count(counts, "next_step_intent", "claim_route");
  const intentInfo = count(counts, "next_step_intent", "information_required");
  const intentTotal = intentClaim + intentInfo;

  const actionableRate = startedFirstQuestion > 0 ? actionableTotal / startedFirstQuestion : null;
  const intentRate = actionableTotal > 0 ? intentTotal / actionableTotal : null;

  return (
    <>
      <section className="mt-8 grid gap-5 sm:grid-cols-2">
        <NorthStarTile
          label="Actionable Next-Step Rate"
          rate={actionableRate}
          numerator={actionableTotal}
          denominator={startedFirstQuestion}
          numeratorLabel="reached an actionable result"
          denominatorLabel="started the decision journey"
        />
        <NorthStarTile
          label="Next-Step Intent Rate"
          rate={intentRate}
          numerator={intentTotal}
          denominator={actionableTotal}
          numeratorLabel="clicked the next-step button"
          denominatorLabel="reached an actionable result"
        />
      </section>

      <section className="mt-8">
        <h2 className="display-md font-serif font-bold text-indigo-ink">Actionable result breakdown</h2>
        <dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile label="Resolved claim route" value={actionableClaim} />
          <StatTile label="Info required (unknown-nominee / confirm-details)" value={actionableInfo} />
          <StatTile label="Proceeded (claim route)" value={intentClaim} />
          <StatTile label="Confirmed (info required)" value={intentInfo} />
        </dl>
      </section>

      <section className="mt-10 border-t border-rule pt-6">
        <h2 className="display-md font-serif font-bold text-indigo-ink">Raw funnel</h2>
        <dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile label="Flow started" value={count(counts, "flow_started", "total")} />
          <StatTile label="First question answered" value={startedFirstQuestion} />
          <StatTile label="Later questions answered" value={count(counts, "question_answered", "later")} />
          <StatTile label="Outcome reached" value={count(counts, "outcome_reached", "total")} />
          <StatTile label="Sheet printed" value={count(counts, "sheet_printed", "total")} />
          <StatTile label="Demand checked" value={count(counts, "demand_checked", "total")} />
          <StatTile label="Readiness checked" value={count(counts, "readiness_checked", "total")} />
          <StatTile label="Bank selected" value={count(counts, "bank_selected", "total")} />
          <StatTile label="Survey answered" value={count(counts, "survey_answered", "total")} />
        </dl>
      </section>
    </>
  );
}

function NorthStarTile({
  label,
  rate,
  numerator,
  denominator,
  numeratorLabel,
  denominatorLabel,
}: {
  label: string;
  rate: number | null;
  numerator: number;
  denominator: number;
  numeratorLabel: string;
  denominatorLabel: string;
}) {
  return (
    <div className="rounded-xl border-2 border-indigo bg-white p-6">
      <p className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">{label}</p>
      <p className="mt-2 font-serif text-[2.5rem] font-bold leading-none text-indigo-ink">
        {rate === null ? "—" : `${(rate * 100).toFixed(1)}%`}
      </p>
      <p className="mt-2 text-[0.9375rem] text-ink-soft">
        {numerator} {numeratorLabel} / {denominator} {denominatorLabel}
      </p>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-rule bg-mist p-4">
      <p className="font-serif text-[1.75rem] font-bold text-indigo-ink">{value}</p>
      <p className="mt-1 text-[0.8125rem] uppercase tracking-[0.06em] text-ink-faint">{label}</p>
    </div>
  );
}
