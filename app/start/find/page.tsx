/**
 * /start/find — "I don't know where to begin".
 *
 * Two large choices and nothing else. Finding an account and claiming one are
 * different problems with different starting points, and a reader who is not
 * yet sure the money exists cannot answer a single question the claim journey
 * asks.
 *
 * There is deliberately no question set here. Adhikaar's research (n=2,
 * Research Log.md §11) covers claiming, not finding -- both interviewees knew
 * exactly where the money was. Building a personalised search journey would
 * mean inventing a user we have never spoken to. Pointing at the official
 * tools cannot be wrong about them.
 */

import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { RecoverFooter } from "../../recover/_components/footer";
import { parseLocale, withLang } from "@/lib/i18n";
import { SITUATIONS_T } from "@/lib/i18n-situations";

export const metadata = {
  title: "Adhikaar — do you know where the money is?",
};

export default async function Find({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const t = SITUATIONS_T[locale].find;
  const options = [
    { ...t.knowBank, href: "/start?begin=1" },
    { ...t.dontKnowWhere, href: "/start/find/where" },
  ];

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
          <p className="body-fluid mt-3 max-w-[62ch] text-ink-soft">{t.sub}</p>

          <ul className="mt-7 space-y-3">
            {options.map((option) => (
              <li key={option.href}>
                <Link
                  href={withLang(option.href, locale)}
                  className="group flex items-start gap-4 rounded-xl border-2 border-rule bg-white p-5 transition-all hover:border-indigo hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)]"
                >
                  <span className="flex-1">
                    <span className="display-md block font-serif font-bold text-indigo-ink">
                      {option.label}
                    </span>
                    <span className="body-fluid mt-1.5 block leading-relaxed text-ink-soft">
                      {option.detail}
                    </span>
                  </span>
                  <span aria-hidden="true" className="mt-1 shrink-0 text-[1.25rem] font-bold text-saffron-ink">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-rule-faint pt-5">
            <Link
              href={withLang("/start", locale)}
              className="-my-2.5 inline-flex items-center gap-2 py-2.5 text-[1rem] font-bold text-indigo"
            >
              <span aria-hidden="true">&larr;</span>
              {SITUATIONS_T[locale].where.backToStart}
            </Link>
          </div>
        </div>
      </main>
      <RecoverFooter />
    </>
  );
}
