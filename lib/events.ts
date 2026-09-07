/**
 * The events table's row shape, and the two pure functions that sit between
 * it and the rest of the codebase.
 *
 * Kept dependency-free and pure, same reason lib/metrics.ts is: no Supabase
 * client import here, so this can be loaded by the same CommonJS test
 * harness the other lib/*.test.cjs files already use, without a live
 * database or environment variables. The impure parts -- actually reading
 * rows out of Supabase -- live in the API routes that call these functions,
 * not here.
 */

import { EVENT_NAMES, type EventName } from "./analytics";
import type { MixpanelEvent } from "./metrics";

export function isValidEventName(name: string): name is EventName {
  return (EVENT_NAMES as readonly string[]).includes(name);
}

/** One row of the `events` table, as Supabase's client returns it. */
export type EventRow = {
  event: string;
  session_id: string;
  properties: Record<string, unknown>;
  created_at: string;
};

/**
 * Supabase row -> the {event, properties} shape lib/metrics.ts's aggregate()
 * already expects and is already tested against. `session_id` becomes
 * `distinct_id` and `created_at` becomes `time` (seconds since epoch) purely
 * because that is the property-name contract aggregate() reads -- it was
 * written against Mixpanel's export shape and is left as-is, so this
 * function's whole job is translating into that shape rather than the other
 * way around.
 */
export function mapRowsToEvents(rows: EventRow[]): MixpanelEvent[] {
  return rows.map((row) => ({
    event: row.event,
    properties: {
      ...row.properties,
      distinct_id: row.session_id,
      time: Math.floor(new Date(row.created_at).getTime() / 1000),
    },
  }));
}
