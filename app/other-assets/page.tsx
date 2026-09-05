/**
 * The map page.
 *
 * It lists and it points. It never advises — see lib/rails.ts for why that
 * line is drawn where it is.
 *
 * Fully localised 5 Sep 2026: this page's own prose lives in
 * lib/i18n-home.ts's HomeDict.otherAssetsPage. `RAILS`/`DISCOVERY` (agency
 * names, scheme names, URLs) stay in English in every locale, same as bank
 * names and policy quotes elsewhere on the site.
 */

import Link from "next/link";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { RAILS, DISCOVERY, LINKS_CHECKED } from "@/lib/rails";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";

export const metadata = {
  title: "Everything else you will have to deal with — Adhikaar",
  description:
    "Adhikaar covers bank deposits only. Insurance, mutual funds, shares, provident fund, NPS and post office savings each run on their own rails — here is which authority holds each one, and what the route is called.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = parseLocale((await searchParams).lang);
  const t = HOME_T[locale].otherAssetsPage;

  return (
    <>
      <RecoverNav />

      <main className="flex-1" lang={locale}>
        <section className="bg-indigo">
          <div className="shell max-w-[900px] py-10 sm:py-14">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-white">
              {t.heading}
            </h1>
            <p className="lede-fluid mt-4 max-w-[62ch] text-white/90">
              {t.sub}
            </p>
          </div>
        </section>

        <div className="shell max-w-[900px] py-10 sm:py-12">
          <p className="hardbox body-fluid">
            <strong className="font-bold">
              {t.pointsNotAdvises}
            </strong>{" "}
            {t.pointsNotAdvisesBody}
          </p>

          <section className="mt-10">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              {t.railsHeading}
            </h2>

            <ul className="mt-6 divide-y divide-rule-faint border-y border-rule-faint">
              {RAILS.map((rail) => (
                <li key={rail.asset} className="py-5">
                  <h3 className="display-md font-serif font-bold text-indigo-ink">
                    {rail.asset}
                  </h3>
                  <dl className="mt-2.5 grid gap-x-6 gap-y-2 text-[1rem] sm:grid-cols-2">
                    <div>
                      <dt className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
                        {t.whoHolds}
                      </dt>
                      <dd className="mt-0.5 text-ink">{rail.authority}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
                        {t.routeCalled}
                      </dt>
                      <dd className="mt-0.5 text-ink">{rail.route}</dd>
                    </div>
                  </dl>
                  {rail.note && (
                    <p className="mt-2.5 text-[1rem] leading-relaxed text-ink-soft">
                      {rail.note}
                    </p>
                  )}
                  <a
                    href={rail.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2.5 inline-block text-[1rem] font-bold text-link underline underline-offset-2"
                  >
                    {rail.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              {t.findingOutHeading}
            </h2>
            <p className="body-fluid mt-2.5 max-w-[68ch] text-ink-soft">
              {t.findingOutBody}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {DISCOVERY.map((d) => (
                <div
                  key={d.name}
                  className="rounded-xl border-2 border-indigo bg-white p-5"
                >
                  <h3 className="display-md font-serif font-bold text-indigo-ink">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-ink-faint">
                    {d.who}
                  </p>
                  <p className="body-fluid mt-2 leading-relaxed text-ink-soft">
                    {d.what}
                  </p>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-[1rem] font-bold text-link underline underline-offset-2"
                  >
                    {d.url}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 border-t border-rule pt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
            <p>
              {t.linksChecked(LINKS_CHECKED)}
            </p>
            <p className="mt-2">
              <Link
                href={withLang("/start", locale)}
                className="font-bold text-link underline underline-offset-2"
              >
                {t.backToQuestions}
              </Link>
            </p>
          </div>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}
