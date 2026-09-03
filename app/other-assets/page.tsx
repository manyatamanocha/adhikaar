/**
 * The map page.
 *
 * It lists and it points. It never advises — see lib/rails.ts for why that
 * line is drawn where it is.
 */

import Link from "next/link";
import { SiteHeader, SiteFooter } from "../_components/chrome";
import { RAILS, DISCOVERY, LINKS_CHECKED } from "@/lib/rails";

export const metadata = {
  title: "Everything else you will have to deal with — Adhikaar",
  description:
    "Adhikaar covers bank deposits only. Insurance, mutual funds, shares, provident fund, NPS and post office savings each run on their own rails — here is which authority holds each one, and what the route is called.",
};

export default function Page() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-indigo">
          <div className="shell max-w-[900px] py-10 sm:py-14">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-white">
              Everything else you will have to deal with
            </h1>
            <p className="lede-fluid mt-4 max-w-[62ch] text-white/90">
              Adhikaar covers bank deposits, lockers and safe custody, and
              nothing else. The rest of an estate runs on separate rails, each
              with its own regulator and its own form. This page tells you which
              door to knock on.
            </p>
          </div>
        </section>

        <div className="shell max-w-[900px] py-10 sm:py-12">
          <p className="hardbox body-fluid">
            <strong className="font-bold">
              This page points. It does not advise.
            </strong>{" "}
            We verified the bank rules line by line against the RBI&apos;s own
            notification. We have not done that on these rails, so you will find
            no verdict and no checklist here — only the authority, the name of
            the route, and a link. Anything more would be a guess dressed up as
            an answer.
          </p>

          <section className="mt-10">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              Six other rails
            </h2>

            <ul className="mt-6 divide-y divide-rule-faint border-y border-rule-faint">
              {RAILS.map((rail) => (
                <li key={rail.asset} className="py-5">
                  <h3 className="display-md font-serif font-bold text-indigo-ink">
                    {rail.asset}
                  </h3>
                  <dl className="mt-2.5 grid gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-2">
                    <div>
                      <dt className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
                        Who holds it
                      </dt>
                      <dd className="mt-0.5 text-ink">{rail.authority}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
                        What the route is called
                      </dt>
                      <dd className="mt-0.5 text-ink">{rail.route}</dd>
                    </div>
                  </dl>
                  {rail.note && (
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {rail.note}
                    </p>
                  )}
                  <a
                    href={rail.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2.5 inline-block text-[0.9375rem] font-bold text-link underline underline-offset-2"
                  >
                    {rail.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              Finding out what exists
            </h2>
            <p className="body-fluid mt-2.5 max-w-[68ch] text-ink-soft">
              Both of these are the government&apos;s own. They help you find an
              account or a policy. What to do once you have found one is a
              different problem — which is the one Adhikaar exists for.
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
                  <p className="mt-1 text-[0.875rem] font-semibold uppercase tracking-[0.06em] text-ink-faint">
                    {d.who}
                  </p>
                  <p className="body-fluid mt-2 leading-relaxed text-ink-soft">
                    {d.what}
                  </p>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-[0.9375rem] font-bold text-link underline underline-offset-2"
                  >
                    {d.url}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-ink-soft">
            <p>
              Links checked {LINKS_CHECKED}. Naming an authority is not a
              recommendation, and none of these bodies is connected with
              Adhikaar.
            </p>
            <p className="mt-2">
              <Link
                href="/start"
                className="font-bold text-link underline underline-offset-2"
              >
                Back to the bank deposit questions
              </Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
