/**
 * Analytics.
 *
 * ─── The tension this file has to resolve ───
 *
 * Every page of this site promises that nothing about the family is stored.
 * Any analytics at all is in tension with that, so this is deliberately the
 * most restrained version that can still answer the one question the product
 * is judged on: did people arrive believing they needed a succession
 * certificate and leave knowing they did not?
 *
 * What is sent:  which question was answered, which verdict was reached,
 *                whether a sheet was printed.
 * What is NOT sent: the answers themselves are sent only as the branch of the
 *                law they select — never a rupee figure, never a bank account,
 *                never a name, never anything typed. The deadline tracker's
 *                date is never sent, at all.
 *
 * ─── Where events go, since 7 Sep 2026 ───
 *
 * track() POSTs to this app's own /api/events, which inserts one row into
 * Supabase. No third party ever sees an event -- not Mixpanel, not anyone.
 * This is a stronger guarantee than the SDK-based version it replaced: there
 * is no vendor config to get wrong, because there is no vendor. A plain
 * fetch() call sends exactly the object passed to it and nothing else --
 * there is no auto-attached `$current_url`, no auto pageview, no referrer
 * property, because there is no SDK reaching for the page to auto-instrument.
 * The whole class of leak the previous version needed a property_blacklist
 * to guard against cannot happen here structurally.
 *
 * isLocalDev() is still the single gate keeping development traffic out of
 * real numbers -- every session working on this codebase runs against
 * localhost, and without this guard every click while building a feature
 * would land in the same table as real claimants.
 *
 * `session_id` takes the place of Mixpanel's own anonymous distinct_id: a
 * fresh crypto.randomUUID() generated once per page load, held only in this
 * module's memory. A reload mints a new one, which is exactly right for
 * joining a single journey's own events together, but cannot answer "how
 * many distinct people used this" -- the same person on two visits looks
 * like two journeys.
 *
 * `visitor_id` (added 9 Sep 2026) exists only to answer that second
 * question. It is a separate, persistent crypto.randomUUID() stored in
 * localStorage, attached to every event's `properties`, and read only for a
 * distinct-visitor COUNT in lib/metrics.ts -- never joined against a
 * journey's answers, never sent anywhere but this app's own server. This is
 * a real change to the product's privacy posture: `/privacy`'s analytics
 * section is the disclosure of it, not this comment. Clearing the browser's
 * site data resets it, same as the deadline tracker's date.
 *
 * visitor_id still cannot tell the team's OWN testing apart from a real
 * claimant -- a different browser, an incognito window or a cleared profile
 * all mint a fresh id. `isExcludedTester()` (added 9 Sep 2026) is the same
 * kind of gate as isLocalDev() below, opted into per browser via
 * /metrics?exclude-me=1 (app/metrics/_components/exclude-traffic-notice.tsx)
 * rather than detected automatically: once set, this browser sends NO events
 * at all, so it stops inflating every number on /metrics, not only the
 * unique-visitor tile. Prospective only -- it cannot retroactively uncount
 * events already sent before the flag was set.
 */

/**
 * Event names are fixed here so a typo cannot silently create a new funnel.
 *
 * A const array, not a bare union, because isValidEventName in lib/events.ts
 * needs this list at RUNTIME to reject anything else /api/events is sent --
 * a TypeScript union has no runtime representation, so the array is the
 * single source both the type and the validator read from.
 */
export const EVENT_NAMES = [
  "flow_started",
  "question_answered",
  "outcome_reached",
  "demand_checked",
  "readiness_checked",
  "bank_selected",
  "sheet_printed",
  "survey_answered",
  "landing_viewed",
  "actionable_result_viewed",
  "exported_to_email",
  "feedback_helpful",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/**
 * `actionable_result_viewed` — the North Star: a terminal page rendered with
 * a concrete "what to do today" card, in either of the product's two valid
 * actionable states. `outcome_type` is "claim_route" (a resolved route with
 * concrete next steps) or "information_required" (the product resolved WHAT
 * to find out next, even though it could not resolve the claim route
 * itself). This is the numerator of Actionable Next-Step Rate; the
 * denominator is `question_answered` step 1 (answering the first decision
 * question).
 *
 * `landing_viewed` — fired once per browsing session, on the first page
 * seen. This is the DENOMINATOR of Journey Start Rate -- without it that
 * metric cannot be computed at all, since automatic URL capture is
 * deliberately never done (the URL carries the family's answers). Carries
 * two coarse enums and nothing else: `entry` (which kind of page they
 * arrived on) and `arrived_via` (how they got here). No URL, no query
 * string, no referrer string -- a category, never an address.
 * `arrived_via: "shared_link"` is the propagation signal: because every
 * journey's state lives in its URL, a visitor arriving on a URL that
 * ALREADY contains answers was almost certainly sent that link by someone
 * else. For a once-per-lifetime product, that is the closest thing to a
 * retention signal we can honestly have.
 *
 * `exported_to_email` — the stronger downstream signal, alongside
 * `sheet_printed`: the reader produced a copy of their verdict to carry
 * elsewhere. There is deliberately no "I'm ready to proceed" button anymore
 * -- whether someone actually acts at a bank counter happens outside this
 * app and was never ours to claim. Print and export-to-email are the two
 * real acts of intent left; Numerator of Next-Step Action Rate together with
 * `sheet_printed`, denominator is `actionable_result_viewed`.
 *
 * `feedback_helpful` — "was this helpful?" on the verdict page. `helpful`
 * (boolean) is the only property. A satisfaction signal, not an action --
 * never counted toward Next-Step Action Rate.
 */

/**
 * Local development never leaves real-user numbers. Every session working on
 * this codebase runs against localhost, and without this guard every click
 * while building or testing a feature would land in the same table as real
 * claimants.
 */
function isLocalDev(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

/**
 * A fresh identity per page load, held only in memory. Generated lazily on
 * the first track() call rather than at module load, so a page that never
 * tracks anything never even creates one.
 */
let sessionId: string | null = null;
function currentSessionId(): string {
  if (!sessionId) sessionId = crypto.randomUUID();
  return sessionId;
}

const VISITOR_ID_KEY = "adhikaar.visitor_id";

/**
 * Read the persistent visitor id, minting and saving one on first use.
 * Wrapped because a private window or blocked site data makes localStorage
 * itself throw (same reasoning as deadline-tracker.tsx) -- returns null
 * rather than crash tracking over an id that only ever mattered for one
 * aggregate count.
 */
function visitorId(): string | null {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const fresh = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, fresh);
    return fresh;
  } catch {
    return null;
  }
}

const EXCLUDE_KEY = "adhikaar.exclude_traffic";

/** Whether this browser opted itself out of analytics via /metrics?exclude-me=1. */
export function isExcludedTester(): boolean {
  try {
    return localStorage.getItem(EXCLUDE_KEY) === "1";
  } catch {
    return false;
  }
}

export function excludeThisBrowser(): void {
  try {
    localStorage.setItem(EXCLUDE_KEY, "1");
  } catch {
    /* storage blocked; nothing to persist, same fallback as visitorId() */
  }
}

export function includeThisBrowser(): void {
  try {
    localStorage.removeItem(EXCLUDE_KEY);
  } catch {
    /* storage blocked; nothing to clear */
  }
}

export function track(event: EventName, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || isLocalDev() || isExcludedTester()) return;
  try {
    const vid = visitorId();
    const properties = vid ? { ...props, visitor_id: vid } : props;
    // Not awaited: analytics must never be able to hold up or break a page
    // someone is reading at a bank counter. keepalive lets the request
    // survive if the browser navigates away immediately after this call --
    // a real case here, since track() is often the last thing that runs
    // before a <Link> click completes.
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ event, properties, session_id: currentSessionId() }),
    }).catch(() => {
      // A blocked network, an ad blocker, a dead endpoint: all fine.
    });
  } catch {
    // Same guarantee if fetch() itself throws synchronously.
  }
}
