"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import { ALL_OUTCOMES } from "@/lib/outcomes";
import { QUESTION_ORDER, parseAnswers, answeredPrefix } from "@/lib/wizard";

/**
 * One component, every event.
 *
 * The whole flow's state is in the URL, so a route change already carries
 * everything worth recording. That means no tracking calls scattered through
 * the pages, no onClick handlers on links that would otherwise need to become
 * client components, and — the point — one file to read when you want to know
 * exactly what leaves this site.
 *
 * `beforeprint` rather than the print button's onClick, because Ctrl+P and the
 * browser menu are how a lot of people will actually do it, and the counter
 * sheet is the product's real output. Counting only button presses would
 * undercount the thing that matters most.
 */
/**
 * Which KIND of page someone arrived on. A category, never the address --
 * `/learn/pnb-succession-certificate-requirement` reports only "learn".
 */
function entryCategory(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/learn")) return "learn";
  // Every /start/* screen, not just the wizard. The situation picker's
  // branches (/start/started, /start/find) are the journey's front door for
  // most readers now; reporting them as "other" would hide the entry point
  // the rebuild was built around.
  if (pathname.startsWith("/start")) return "start";
  if (pathname === "/faq") return "faq";
  if (pathname === "/banks") return "banks";
  if (ALL_OUTCOMES.some((o) => o.path === pathname)) return "outcome";
  return "other";
}

/**
 * How they got here, in five buckets. The referrer's ADDRESS is never sent --
 * only which bucket it falls into.
 *
 * "shared_link" is the important one: a first page view whose URL already
 * carries wizard answers means someone was sent that link mid-journey. That
 * is Adhikaar's propagation signal, and it exists for free because every
 * journey's state lives in its URL.
 */
function arrivedVia(hasAnswersOnEntry: boolean): string {
  if (hasAnswersOnEntry) return "shared_link";
  let ref = "";
  try {
    ref = document.referrer ?? "";
  } catch {
    return "direct";
  }
  if (!ref) return "direct";
  let host = "";
  try {
    host = new URL(ref).hostname.toLowerCase();
  } catch {
    return "other";
  }
  if (host === window.location.hostname) return "internal";
  if (/google|bing|duckduckgo|yahoo|ecosia|search/.test(host)) return "search";
  if (/whatsapp|facebook|instagram|t\.co|twitter|x\.com|linkedin|telegram|reddit/.test(host)) return "social";
  return "other";
}

/**
 * ─── The word "outcome" means three things, and they are not the same ───
 *
 * 1. A VERDICT — one of the eight OutcomeIds in lib/outcomes.ts. A legal
 *    determination: the product read the facts and named the RBI route. Only
 *    resolve() produces one, and `outcome_reached` fires only on these eight.
 * 2. A COUNTED RESOLUTION — `actionable_result_viewed`, the North Star
 *    numerator. The test is the NSM doc's, not this file's: the reader leaves
 *    knowing what to do next. Eleven things pass it, not eight.
 * 3. A GUARDRAIL CATEGORY — HONEST_EXIT_OUTCOMES in the metrics route. A
 *    verdict whose honest answer is unwelcome. Verdicts only, deliberately.
 *
 * These coincided until 7 Sep 2026 only because the wizard was the sole route
 * to a resolution. It no longer is. `resolution_source` on every
 * `actionable_result_viewed` -- "verdict", "review" or "situation" -- is what
 * keeps the three separable in the data rather than only in this comment.
 *
 * It matters because the `outcome` PROPERTY is not type-checked (track()'s
 * props are Record<string, string|number|boolean>), so it now carries values
 * that are not OutcomeIds and have no page in lib/outcomes.ts. Grouping by
 * `outcome` alone shows eleven values where lib/outcomes.ts defines eight,
 * with nothing to say which are determinations. Group by `resolution_source`.
 *
 * ─── Journeys that resolve WITHOUT the seven questions ───
 *
 * The wizard is one route to an answer, not the definition of one. The NSM
 * design doc (2026-09-06-north-star-metric-design.md §1) defines a claim-ready
 * journey as one that resolves "a resolved claim route OR a resolved
 * information gap", and states the promise as "you will leave knowing what to
 * do next". Neither clause mentions question seven.
 *
 * Before this, `actionable_result_viewed` fired only on the eight wizard
 * outcome pages and /needs-review — every one of them reachable only by
 * walking the full question set. So a reader who took the situation picker's
 * "I don't know where to begin" door, answered its one question and left with
 * the UDGAM search route was counted as an ABANDONMENT. They left knowing
 * exactly what to do next. That is the metric's own definition of success.
 *
 * ─── Why these two pages and not every branch destination ───
 *
 * `requires` is the gate, and it is the whole honesty of this table. A page
 * counts when the reader ANSWERED that branch's question and reached its
 * terminal screen — not when they merely arrived at a page that happens to be
 * useful.
 *
 * /bank-refused is deliberately absent. It is the escalation reference, linked
 * from the FAQ, the footer, Saathi, counter mode and every verdict page — nine
 * inbound links, no state of its own. Counting a bare arrival there would
 * count FAQ browsers as claim-ready journeys and double-count anyone who
 * reached a verdict and then clicked through. It resolves nothing on its own;
 * it is where a resolved journey goes next.
 *
 * These fire `actionable_result_viewed` only, never `outcome_reached`. The
 * Honest-Exit guardrail is computed from `outcome_reached` and must keep
 * measuring verdicts, which is the one thing it is for. Rebuild spec §13.
 */
const SITUATION_RESOLUTIONS: Record<
  string,
  { outcome: string; outcome_type: "claim_route" | "information_required"; requires?: string }
> = {
  // Branch 5. Reachable only by answering "no, I don't know where the money
  // is held". The claim route is genuinely unresolved — Adhikaar runs no
  // search and says so — but what to do next is not.
  "/start/find/where": { outcome: "find-where", outcome_type: "information_required" },
  // Branch 3, gated on the reader naming what the bank demanded. The page
  // then answers it against the RBI's own list, which is a resolved route.
  // Ungated, this is just the document reference with no answer on it.
  "/what-were-you-asked-for": { outcome: "asked-for", outcome_type: "claim_route", requires: "asked" },
};

/**
 * Which door the reader came in through, or null if this is not a journey
 * surface at all.
 *
 * This is the denominator half of the same problem SITUATION_RESOLUTIONS
 * fixed for the numerator. `flow_started` used to fire only at a bare /start,
 * so a reader who took the /what-were-you-asked-for or /bank-refused door
 * could reach a resolution having never fired a start -- numerator without
 * denominator, which is why Resolution Rate could exceed 100%.
 *
 * 🔴 The bare situation picker is deliberately NOT a start. It is a menu; the
 * reader has not chosen a door yet, and counting it would put every bounce
 * from the front screen into the denominator of a rate that measures whether
 * a chosen journey resolves. They are still counted in `landing_viewed`,
 * which is what Journey Start Rate exists to compare against.
 *
 * ⚠️ This changes what `flow_started` MEANS. Before 7 Sep 2026 it meant
 * "arrived at /start with no answers"; it now means "entered a branch".
 * Events either side of that date are not directly comparable, the same
 * definitional discontinuity the North Star carries (metrics route, §14).
 */
function branchFor(pathname: string, sp: Record<string, string>): string | null {
  if (pathname === "/start") {
    // begin=1 is the wizard's own door; answers already in the URL mean a
    // shared mid-journey link, which is a start for whoever opened it.
    return sp.begin === "1" || QUESTION_ORDER.some((q) => sp[q]) ? "new" : null;
  }
  if (pathname === "/start/started") return "started";
  if (pathname.startsWith("/start/find")) return "find";
  if (pathname === "/what-were-you-asked-for") return "asked";
  if (pathname === "/bank-refused") return "refused";
  // Landing straight on a result without passing any door: someone was sent
  // the link. Only reached when this is the FIRST journey surface of the
  // session -- an ordinary wizard journey has already fired at /start.
  if (pathname === "/needs-review" || ALL_OUTCOMES.some((o) => o.path === pathname)) {
    return "shared";
  }
  return null;
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastFired = useRef<string | null>(null);
  const landingFired = useRef(false);
  const startedFired = useRef(false);

  useEffect(() => {
    const onPrint = () => {
      track("sheet_printed", { path: pathname });
      // Open every folded section before the sheet is rendered. The print
      // stylesheet also forces this via ::details-content, but that is not
      // supported everywhere, and a counter sheet missing the RBI's paragraphs
      // because the reader never tapped a heading would be the worst possible
      // failure of this product.
      document
        .querySelectorAll<HTMLDetailsElement>("details:not([open])")
        .forEach((d) => {
          d.open = true;
          d.dataset.openedForPrint = "true";
        });
    };
    const afterPrint = () => {
      document
        .querySelectorAll<HTMLDetailsElement>("details[data-opened-for-print]")
        .forEach((d) => {
          d.open = false;
          delete d.dataset.openedForPrint;
        });
    };
    window.addEventListener("beforeprint", onPrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", onPrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, [pathname]);

  useEffect(() => {
    const query = searchParams.toString();
    const key = `${pathname}?${query}`;
    // React runs effects twice in development; a Back navigation can also
    // replay an identical URL. Neither should double-count a funnel step.
    if (lastFired.current === key) return;
    lastFired.current = key;

    const sp: Record<string, string> = {};
    searchParams.forEach((v, k) => (sp[k] = v));

    // The denominator of Journey Start Rate. Fires once per browsing
    // session, whichever page they landed on -- an SEO article is as valid
    // an entry point as the homepage, and counting only the homepage would
    // understate the reach the /learn pages are built for.
    if (!landingFired.current) {
      landingFired.current = true;
      const entryAnswers = parseAnswers(sp);
      track("landing_viewed", {
        entry: entryCategory(pathname),
        arrived_via: arrivedVia(QUESTION_ORDER.some((q) => entryAnswers[q])),
      });
    }

    // The journey's denominator. Once per session, on the first screen that
    // identifies which door was taken -- `branch` is what lets Resolution Rate
    // be read per door instead of as one number over five different journeys.
    if (!startedFired.current) {
      const branch = branchFor(pathname, sp);
      if (branch) {
        startedFired.current = true;
        track("flow_started", { branch });
      }
    }

    if (pathname === "/start") {
      const answers = parseAnswers(sp);
      // The contiguous prefix, not a raw filter -- a scenario card can
      // pre-fill a LATER field (heirs=dispute) while an earlier one (court)
      // is still unset, which must not be logged as "just answered" or
      // inflate the step number.
      const answered = answeredPrefix(answers);
      if (answered.length > 0) {
        const just = answered[answered.length - 1];
        // Both values are fixed enum members from lib/wizard — never free text,
        // never a rupee figure. They name the branch of the law, nothing more.
        track("question_answered", {
          question: just,
          answer: String(answers[just]),
          step: answered.length,
        });
      }
      return;
    }

    const outcome = ALL_OUTCOMES.find((o) => o.path === pathname);
    if (outcome) {
      track("outcome_reached", {
        outcome: outcome.id,
        good_news: outcome.goodNews,
      });
      // "unknown-nominee" is the one outcome where the product could not
      // resolve the claim route itself -- it resolved what to find out
      // next instead. Every other outcome, however unwelcome the news
      // (out-of-scope, dispute, already-in-court included), is a resolved
      // conclusion with a concrete "what to do today" card of its own.
      track("actionable_result_viewed", {
        outcome: outcome.id,
        outcome_type: outcome.id === "unknown-nominee" ? "information_required" : "claim_route",
        resolution_source: "verdict",
      });
      // Switching to the five-line version is a costly, deliberate act --
      // you do it because you are about to stand at a counter. Counts
      // toward Next-Step Action Rate alongside printing.
      if (sp.mode === "counter") track("counter_mode_opened", { outcome: outcome.id });
      if (sp.bank) track("bank_selected", { bank: sp.bank, outcome: outcome.id });
      if (sp.have) {
        // How many of the required documents they say they hold, and how many
        // the claim needs — never which ones. The ratio is what says whether
        // the checklist is being worked through rather than just read.
        track("readiness_checked", {
          held: sp.have.split(",").filter(Boolean).length,
          required: outcome.documents?.length ?? 0,
          outcome: outcome.id,
        });
      }
      return;
    }

    if (pathname === "/needs-review") {
      // The other genuinely unresolved terminal state: the wizard could not
      // reach a claim route (a will, a restriction, a dispute flag, or an
      // unknown bank type/amount still needs confirming), but the page
      // still resolves a concrete next action -- go find out X.
      track("actionable_result_viewed", {
        outcome: "needs-review",
        outcome_type: "information_required",
        resolution_source: "review",
      });
      return;
    }

    // A situation branch that resolved something. Checked before the demand
    // counter below, because on /what-were-you-asked-for both are true of the
    // same page view and neither returns.
    const situation = SITUATION_RESOLUTIONS[pathname];
    if (situation && (!situation.requires || sp[situation.requires])) {
      track("actionable_result_viewed", {
        outcome: situation.outcome,
        outcome_type: situation.outcome_type,
        resolution_source: "situation",
      });
    }

    if (pathname === "/what-were-you-asked-for" && sp.asked) {
      track("demand_checked", {
        // How many things were ticked, not which — the count is what says
        // whether the comparison is being used.
        ticked: sp.asked.split(",").filter(Boolean).length,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
