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
 * Configuration below turns off everything Mixpanel does by default that would
 * make a visitor identifiable across visits:
 *   · `ip: false`            — no IP-based geolocation
 *   · `disable_persistence`  — the SDK writes its distinct_id nowhere, so
 *                              nothing survives the tab and no one is
 *                              recognised on a return visit
 *   · `disable_cookie`       — and no cookie specifically
 *   · `track_pageview: false`— no automatic URL capture; the URL holds answers
 *
 * That last one matters most. The answers live in the query string, so letting
 * Mixpanel auto-capture URLs would ship the whole case by the back door.
 *
 * With no token configured every function here is a no-op and the site runs
 * exactly as it does now.
 */

import mixpanel from "mixpanel-browser";

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

/**
 * India data residency.
 *
 * A project created in the India region ingests at api-in.mixpanel.com. The
 * SDK defaults to the US host, so without this events are accepted by the
 * wrong region and never appear in the project — silently, with no error.
 * Set NEXT_PUBLIC_MIXPANEL_REGION=us if the project is ever moved.
 */
const REGION = process.env.NEXT_PUBLIC_MIXPANEL_REGION ?? "in";
const API_HOST =
  REGION === "in"
    ? "https://api-in.mixpanel.com"
    : REGION === "eu"
      ? "https://api-eu.mixpanel.com"
      : "https://api.mixpanel.com";

let ready = false;

/**
 * Local development never leaves real-user numbers. Every session working on
 * this codebase runs against localhost, and without this guard every click
 * while building or testing a feature lands in the same Mixpanel project as
 * real claimants -- which is exactly what happened before this was added
 * (109 events, 108 of them from localhost, 0 from production).
 */
function isLocalDev(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

export function initAnalytics() {
  if (ready || !TOKEN || typeof window === "undefined" || isLocalDev()) return;
  mixpanel.init(TOKEN, {
    api_host: API_HOST,
    ip: false,
    // These two are the real controls. `disable_persistence` stops the SDK
    // writing its distinct_id anywhere, and `disable_cookie` stops the cookie
    // specifically — so nobody is recognised on a second visit, and there is
    // no identifier on this machine tying a person to a set of answers.
    disable_persistence: true,
    disable_cookie: true,
    track_pageview: false,
    autocapture: false,
    record_sessions_percent: 0,
  });
  ready = true;
}

/** Event names are fixed here so a typo cannot silently create a new funnel. */
export type EventName =
  | "flow_started"
  | "question_answered"
  | "outcome_reached"
  | "demand_checked"
  | "readiness_checked"
  | "bank_selected"
  | "sheet_printed"
  | "survey_answered"
  /**
   * The North Star: a terminal page rendered with a concrete "what to do
   * today" card, in either of the product's two valid actionable states.
   * `outcome_type` is "claim_route" (a resolved route with concrete next
   * steps) or "information_required" (the product resolved WHAT to find
   * out next, even though it could not resolve the claim route itself).
   * This is the numerator of Actionable Next-Step Rate; the denominator is
   * `question_answered` step 1 (answering the first decision question).
   */
  /**
   * Fired once per browsing session, on the first page seen. This is the
   * DENOMINATOR of Journey Start Rate -- without it that metric cannot be
   * computed at all, since `track_pageview` is deliberately off (the URL
   * carries the family's answers, so automatic URL capture would ship the
   * whole case by the back door).
   *
   * Carries two coarse enums and nothing else: `entry` (which kind of page
   * they arrived on) and `arrived_via` (how they got here). No URL, no
   * query string, no referrer string -- a category, never an address.
   *
   * `arrived_via: "shared_link"` is the propagation signal: because every
   * journey's state lives in its URL, a visitor arriving on a URL that
   * ALREADY contains answers was almost certainly sent that link by someone
   * else. For a once-per-lifetime product, that is the closest thing to a
   * retention signal we can honestly have.
   */
  | "landing_viewed"
  /** Opened the five-line version meant for standing at a bank counter. */
  | "counter_mode_opened"
  | "actionable_result_viewed"
  /**
   * The stronger downstream signal: did the reader feel ready to act on
   * what they were just shown, not just view it. Fired when "I'm ready to
   * proceed" (claim_route) or "I know the answer now" (information_required)
   * is clicked. Numerator of Next-Step Intent Rate; denominator is
   * `actionable_result_viewed`.
   */
  | "next_step_intent";

export function track(event: EventName, props: Record<string, string | number | boolean> = {}) {
  if (!ready) return;
  try {
    mixpanel.track(event, props);
  } catch {
    // Analytics must never be able to break a page someone is reading at a
    // bank counter. A blocked network, an ad blocker, a dead token: all fine.
  }
}
