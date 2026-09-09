"use client";

/**
 * Lets a team member stop their own testing from inflating the numbers on
 * this page. Visiting /metrics?exclude-me=1 sets a localStorage flag that
 * lib/analytics.ts's track() checks before sending anything -- an excluded
 * browser generates NO events at all, not just a discounted unique-visitor
 * count. ?exclude-me=0 undoes it. Either way the query param is stripped
 * from the URL right after, so the link is a one-time switch, not something
 * that keeps re-triggering the confirmation message on every reload.
 */

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { excludeThisBrowser, includeThisBrowser, isExcludedTester } from "@/lib/analytics";

export function ExcludeTrafficNotice() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [excluded, setExcluded] = useState<boolean | null>(null);
  const [justChanged, setJustChanged] = useState(false);

  useEffect(() => {
    const param = searchParams.get("exclude-me");
    if (param === "1") excludeThisBrowser();
    else if (param === "0") includeThisBrowser();
    if (param !== null) router.replace(pathname, { scroll: false });
    // Deferred out of the effect body, same reasoning as the Saathi intro
    // bubble's timer: React warns against a setState call that runs
    // synchronously during the effect itself.
    const changed = param !== null;
    const timer = setTimeout(() => {
      setExcluded(isExcludedTester());
      if (changed) setJustChanged(true);
    }, 0);
    return () => clearTimeout(timer);
    // Runs once: the param is only ever meant to fire on the link click that
    // brought a reader here, not on every subsequent render of this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (excluded === null) return null;

  return (
    <p data-print="hide" className="mt-3 text-[0.8125rem] text-ink-faint">
      {justChanged && "Done — "}
      {excluded
        ? "This browser is excluded from these numbers."
        : "This browser's own visits count toward these numbers."}{" "}
      <a href={`${pathname}?exclude-me=${excluded ? "0" : "1"}`} className="underline">
        {excluded ? "Include it again" : "Exclude my future visits"}
      </a>
    </p>
  );
}
