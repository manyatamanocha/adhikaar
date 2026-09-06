/**
 * /start/started — "I've already started the claim".
 *
 * A menu, not a questionnaire. The rule this whole rebuild runs on is that a
 * reader is never made to repeat the questionnaire unless the missing
 * information changes the answer, and someone whose bank has demanded a
 * surety does not need to be asked about nominees and thresholds before the
 * product engages with the demand.
 *
 * Two of these entries exist nowhere else in the product. "I have started a
 * court case" is the one that matters most: /already-in-court has been a
 * fully written page since 3 Sep with no reachable door -- resolve() cannot
 * return it, and its only links were scenario cards behind an unreachable
 * ?cards=1. It is also the exact situation of R2, the interviewee whose claim
 * is still unresolved after two years (Research Log.md §11).
 *
 * "Asked for extra documents" and "refused or delayed" repeat the opening
 * screen's options on purpose. The opening screen serves a reader who
 * identifies by their problem; this menu serves one who identifies by their
 * stage. Both reach the same page.
 */

import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { RecoverFooter } from "../../recover/_components/footer";
import { parseLocale, withLang } from "@/lib/i18n";
import { SITUATIONS_T, type Situation } from "@/lib/i18n-situations";

export const metadata = {
  title: "Adhikaar — where are you now?",
};

export default async function Started({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const t = SITUATIONS_T[locale].started;
  const options: (Situation & { href: string })[] = [
    { ...t.notSubmitted, href: "/start?begin=1" },
    { ...t.askedFor, href: "/what-were-you-asked-for" },
    // A submitted claim still waiting belongs here too, named in this
    // option's own description. Its dedicated flow -- the four questions
    // around para 31's fifteen days -- is the next thing to build; until it
    // exists, the escalation page is the right destination rather than a
    // menu entry pointing nowhere.
    { ...t.refused, href: "/bank-refused" },
    { ...t.inCourt, href: "/already-in-court" },
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
              {t.back}
            </Link>
          </div>
        </div>
      </main>
      <RecoverFooter />
    </>
  );
}
