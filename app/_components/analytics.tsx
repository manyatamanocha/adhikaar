"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initAnalytics, track } from "@/lib/analytics";
import { ALL_OUTCOMES } from "@/lib/outcomes";
import { QUESTION_ORDER, parseAnswers } from "@/lib/wizard";

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
export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastFired = useRef<string | null>(null);

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

    if (pathname === "/start") {
      const answers = parseAnswers(sp);
      const answered = QUESTION_ORDER.filter((q) => answers[q]);
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
