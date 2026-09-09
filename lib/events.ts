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

/**
 * ─── The write-side trust boundary ───
 *
 * /api/events is a public, unauthenticated endpoint: it has to be callable
 * from an anonymous browser, so there is no token that could gate it (a
 * secret shipped in client JavaScript is not a secret). Until 9 Sep 2026
 * this file's own comment asserted that "the client only ever sends the
 * fixed enum properties documented against each EventName" -- true of our
 * client, and not checked, which made the table a free JSON dump for anyone
 * who opened devtools.
 *
 * These validators make that assertion actually hold. They cannot stop
 * someone forging plausible events -- nothing can, on a public analytics
 * endpoint -- but they bound what a single row can contain, which is the
 * part that has to be true regardless of who is calling.
 *
 * Limits are set well above real traffic: the widest real event carries 4
 * properties, and the longest real value is a pathname.
 */
export const MAX_PROPERTY_KEYS = 12;
export const MAX_KEY_LENGTH = 64;
export const MAX_VALUE_LENGTH = 200;
export const MAX_SESSION_ID_LENGTH = 64;

/** A session id is a generated UUID (36 chars); anything longer is not ours. */
export function isValidSessionId(id: unknown): id is string {
  return typeof id === "string" && id.length > 0 && id.length <= MAX_SESSION_ID_LENGTH;
}

/**
 * Properties must be a FLAT object of primitives. Nesting is rejected rather
 * than flattened or truncated: a caller sending a shape we do not recognise
 * is not a caller whose intent we should guess at.
 */
export function isValidProperties(value: unknown): value is Record<string, string | number | boolean> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length > MAX_PROPERTY_KEYS) return false;

  for (const [key, v] of entries) {
    if (key.length === 0 || key.length > MAX_KEY_LENGTH) return false;
    if (typeof v === "string") {
      if (v.length > MAX_VALUE_LENGTH) return false;
    } else if (typeof v === "number") {
      // NaN and Infinity are not representable in JSON and have no meaning
      // as an analytics value.
      if (!Number.isFinite(v)) return false;
    } else if (typeof v !== "boolean") {
      return false;
    }
  }
  return true;
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
