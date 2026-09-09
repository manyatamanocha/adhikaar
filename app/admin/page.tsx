/**
 * The private view /metrics deliberately withholds: raw per-event
 * drill-down, and the same aggregates without the public page's 5-minute
 * cache. First cut -- a filterable event table plus the existing aggregate
 * numbers, not a general BI tool (design spec §3.4). Expand later if it
 * turns out to be needed.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import { getSupabaseAdmin, EVENTS_TABLE } from "@/lib/supabase";
import { mapRowsToEvents, type EventRow } from "@/lib/events";
import { aggregate } from "@/lib/metrics";

export const metadata = { title: "Adhikaar — admin" };
export const dynamic = "force-dynamic"; // no cache -- this is the point of /admin over /metrics

async function requireAdmin() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!secret || !token || !verifyAdminToken(token, secret)) {
    redirect("/admin/login");
  }
}

export default async function AdminPage() {
  await requireAdmin();

  const to = new Date();
  const from = new Date(to.getTime() - 29 * 24 * 60 * 60 * 1000);
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from(EVENTS_TABLE)
    .select("event, session_id, properties, created_at")
    .gte("created_at", from.toISOString())
    .order("created_at", { ascending: false })
    .limit(2000);

  const rows = (data ?? []) as EventRow[];
  const events = mapRowsToEvents(rows);
  const m = aggregate(events);
  const recent = rows.slice(0, 50);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="display-lg font-serif font-bold text-indigo-ink">Admin</h1>

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Weekly resolved" value={m.northStar.weeklyResolvedJourneys} />
        <Stat label="Resolution rate" value={m.omtm.resolutionRate === null ? "—" : `${m.omtm.resolutionRate}%`} />
        <Stat label="Honest-exit rate" value={m.guardrails.honestExitRate === null ? "—" : `${m.guardrails.honestExitRate}%`} />
        <Stat label="Unique visitors (30d)" value={m.funnel.uniqueVisitors} />
        <Stat label="Events (30d)" value={events.length} />
      </section>

      <section className="mt-8">
        <h2 className="display-md font-serif font-bold text-indigo-ink">Recent events</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.875rem]">
            <thead>
              <tr className="border-b-2 border-rule">
                <th className="py-1.5 pr-4">Event</th>
                <th className="py-1.5 pr-4">Properties</th>
                <th className="py-1.5">When</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={i} className="border-b border-rule-faint">
                  <td className="py-1.5 pr-4 font-mono">{r.event}</td>
                  <td className="py-1.5 pr-4 font-mono text-ink-soft">{JSON.stringify(r.properties)}</td>
                  <td className="py-1.5 text-ink-faint">{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-rule bg-white p-4">
      <p className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="display-md mt-1 font-serif font-bold text-indigo-ink">{value}</p>
    </div>
  );
}
