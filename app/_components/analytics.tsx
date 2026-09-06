"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initAnalytics, track } from "@/lib/analytics";
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
  if (pathname === "/start") return "start";
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

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastFired = useRef<string | null>(null);
  const landingFired = useRef(false);

  useEffect(() => {
    initAnalytics();
  }, []);

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

    if (pathname === "/start") {
      const answers = parseAnswers(sp);
      // The contiguous prefix, not a raw filter -- a scenario card can
      // pre-fill a LATER field (heirs=dispute) while an earlier one (court)
      // is still unset, which must not be logged as "just answered" or
      // inflate the step number.
      const answered = answeredPrefix(answers);
      if (answered.length === 0) {
        track("flow_started");
      } else {
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
      track("actionable_result_viewed", { outcome: "needs-review", outcome_type: "information_required" });
      return;
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
