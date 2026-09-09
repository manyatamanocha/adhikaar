"use client";

/**
 * Lets a team member stop their own testing from inflating the numbers on
 * this page. Visiting /metrics?exclude-me=1 sets a localStorage flag that
 * lib/analytics.ts's track() checks before sending anything -- an excluded
 * browser generates NO events at all, not just a discounted unique-visitor
 * count. ?exclude-me=0 undoes it.
 *
 * Silent unless the param is actually present -- this is a public page, and
 * a control that exists to hide the team's own testing has no business
 * being a standing invitation to every stranger who lands here. A team
 * member who used the link once knows the URL to toggle it again; nothing
 * is shown to anyone who didn't just use it, this visit.
 */

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { excludeThisBrowser, includeThisBrowser } from "@/lib/analytics";

export function ExcludeTrafficNotice() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [justSet, setJustSet] = useState<boolean | null>(null);

  useEffect(() => {
    const param = searchParams.get("exclude-me");
    if (param !== "1" && param !== "0") return;
    if (param === "1") excludeThisBrowser();
    else includeThisBrowser();
    router.replace(pathname, { scroll: false });
    // Deferred out of the effect body, same reasoning as the Saathi intro
    // bubble's timer: React warns against a setState call that runs
    // synchronously during the effect itself.
    const timer = setTimeout(() => setJustSet(param === "1"), 0);
    return () => clearTimeout(timer);
    // Runs once: the param is only ever meant to fire on the link click that
    // brought a reader here, not on every subsequent render of this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (justSet === null) return null;

  return (
    <p data-print="hide" className="mt-3 text-[0.8125rem] text-ink-faint">
      Done — this browser is {justSet ? "now excluded from" : "counted in"} these numbers.
    </p>
  );
}
