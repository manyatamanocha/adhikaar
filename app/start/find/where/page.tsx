/**
 * /start/find/where — where to look for an account nobody knows about.
 *
 * A links page, deliberately, not a journey. See ../page.tsx for why: the
 * research behind this product covers claiming, not finding, and a
 * personalised search flow would be built on a user we have never
 * interviewed.
 *
 * ─── The rule this page exists under ───
 *
 * Adhikaar runs no search. No backend, no data source, no index of anyone's
 * accounts. The page says so in its own words, above the links rather than
 * below them, because a page listing search tools is exactly where a reader
 * would otherwise assume we are one of them. /discovery's "Start Your Search"
 * wording is not reused for the same reason.
 *
 * UDGAM is the only external service linked with a URL. udgam.rbi.org.in was
 * verified reachable (200) on 5 Sep 2026 and again before this page shipped.
 * The IEPF and branch-records entries carry no URL: an unverified link on a
 * page about finding a dead relative's money is worse than no link, and the
 * reader can reach both by name.
 */

import Link from "next/link";
import { RecoverNav } from "../../../recover/_components/nav";
import { RecoverFooter } from "../../../recover/_components/footer";
import { parseLocale, withLang } from "@/lib/i18n";
import { SITUATIONS_T } from "@/lib/i18n-situations";

export const metadata = {
  title: "Adhikaar — where to look for unclaimed accounts",
};

export default async function Where({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const t = SITUATIONS_T[locale].where;

  return (
    <>
      <RecoverNav />
      <main className="flex-1 bg-mist">
        <div className="shell max-w-[760px] py-8 sm:py-12">
          <p className="text-[0.875rem] font-bold uppercase tracking-[0.16em] text-saffron-ink">
            {t.eyebrow}
          </p>
          <h1 className="display-lg mt-2 font-serif font-bold text-indigo-ink">
            {t.heading}
          </h1>

          {/* Above the links, not beneath them. A reader deciding what this
              page is decides it here. */}
          <p className="mt-4 rounded-xl border-2 border-accent-violet bg-white p-5 text-[1.0625rem] leading-relaxed text-ink">
            {t.noSearch}
          </p>

          <ul className="mt-7 space-y-3">
            <li className="rounded-xl border border-rule bg-white p-5">
              <h2 className="display-md font-serif font-bold text-indigo-ink">
                {t.udgamName}
              </h2>
              <p className="body-fluid mt-1.5 leading-relaxed text-ink-soft">{t.udgamWhat}</p>
              <p className="mt-2 text-[0.9375rem] text-ink-faint">{t.udgamHow}</p>
              <a
                href="https://udgam.rbi.org.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center font-bold text-indigo underline underline-offset-2"
              >
                udgam.rbi.org.in
              </a>
            </li>

            <li className="rounded-xl border border-rule bg-white p-5">
              <h2 className="display-md font-serif font-bold text-indigo-ink">
                {t.portalName}
              </h2>
              <p className="body-fluid mt-1.5 leading-relaxed text-ink-soft">{t.portalWhat}</p>
            </li>

            <li className="rounded-xl border border-rule bg-white p-5">
              <h2 className="display-md font-serif font-bold text-indigo-ink">
                {t.iepfName}
              </h2>
              <p className="body-fluid mt-1.5 leading-relaxed text-ink-soft">{t.iepfWhat}</p>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule-faint pt-5">
            <Link
              href={withLang("/start/find", locale)}
              className="-my-2.5 inline-flex items-center gap-2 py-2.5 text-[1rem] font-bold text-indigo"
            >
              <span aria-hidden="true">&larr;</span>
              {t.backToStart}
            </Link>
            <Link
              href={withLang("/start?begin=1", locale)}
              className="inline-flex min-h-11 items-center rounded-lg bg-saffron px-5 py-2.5 text-[1rem] font-bold text-white"
            >
              {t.foundIt}
            </Link>
          </div>
        </div>
      </main>
      <RecoverFooter />
    </>
  );
}
