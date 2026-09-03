/**
 * Site chrome, shared by every page.
 *
 * Both pieces carry data-print="hide": the deliverable is a sheet of paper
 * handed across a bank counter, and neither a wordmark nor a disclaimer block
 * belongs on it. What the printed page needs instead is set by the outcome
 * component, which prints its own source line.
 */

import Link from "next/link";
import { NOTIFICATION } from "@/lib/rbi";
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_SHORT,
  T,
  withLang,
  type Locale,
} from "@/lib/i18n";

export function SiteHeader({
  lang = "en",
  path = "/",
}: {
  lang?: Locale;
  /** The page the switcher should stay on. */
  path?: string;
} = {}) {
  const t = T[lang];
  return (
    <header
      data-print="hide"
      className="border-b border-rule-faint bg-[#f0f2f5]"
    >
      <div className="shell flex flex-wrap items-center justify-between gap-3 py-2.5">
        <Link
          href={withLang("/", lang)}
          // The go-home control on every page; 23px was not a thumb target.
          className="-my-1.5 flex items-baseline gap-2.5 py-1.5"
        >
          <span className="font-deva text-[1.25rem] font-bold leading-none text-indigo">
            अधिकार
          </span>
          <span className="border-l border-rule pl-2.5 text-[1rem] font-bold uppercase tracking-[0.06em] text-indigo-ink">
            Adhikaar
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          {/* The locale lives in the URL, never a cookie: "no cookie, nothing
              that identifies you" is shipped copy, and a language cookie would
              make it false. Each language is named in its own script, because
              someone looking for Kannada is not looking for the word
              "Kannada". */}
          <nav
            aria-label={t.language}
            className="flex items-center rounded-pill border border-rule bg-white p-0.5"
          >
            {LOCALES.map((l) => {
              const on = l === lang;
              return (
                <Link
                  key={l}
                  href={withLang(path, l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={on ? "true" : undefined}
                  className={`rounded-pill px-3 py-1.5 text-[0.875rem] font-semibold transition-colors ${
                    on
                      ? "bg-indigo text-white"
                      : "text-ink-soft hover:text-indigo"
                  }`}
                >
                  <span className="sm:hidden">{LOCALE_SHORT[l]}</span>
                  <span className="hidden sm:inline">{LOCALE_LABEL[l]}</span>
                </Link>
              );
            })}
          </nav>

          <a
            href={NOTIFICATION.url}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-pill border border-rule bg-white px-3.5 py-1.5 text-[0.875rem] font-semibold text-indigo lg:inline-block"
          >
            {t.theRbiRules}
          </a>
          <span className="rounded-pill border border-maroon/35 bg-white px-3.5 py-1.5 text-[0.875rem] font-semibold text-maroon">
            {t.notGovernment}
          </span>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer
      data-print="hide"
      className="mt-auto border-t-4 border-saffron bg-indigo-ink"
    >
      <div className="shell py-10">
        <div className="flex items-baseline gap-2.5">
          <span className="font-deva text-[1.25rem] font-bold text-white">
            अधिकार
          </span>
          <span className="text-[1rem] font-bold uppercase tracking-[0.06em] text-white/80">
            Adhikaar
          </span>
        </div>

        <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-white/70">
          An independent public-information tool. Not a government website, and
          not affiliated with the Reserve Bank of India, the Department of
          Financial Services or any bank. It quotes published rules and links to
          their source so you can check every one yourself. It is information,
          not legal advice, and it cannot account for facts we do not know about
          your case.
        </p>

        <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-white/70">
          Nothing here applies to the Public Provident Fund, the Senior
          Citizens&apos; Savings Scheme, Mahila Samman Savings Certificate or
          Sukanya Samriddhi — paragraph 6(b) places those outside these
          Directions.
        </p>

        <p className="mt-6 border-t border-white/15 pt-4 text-[0.875rem] text-white/50">
          Rules quoted from {NOTIFICATION.number}, issued {NOTIFICATION.issued}.
          Bank policies verified 3 September 2026.
        </p>
      </div>
    </footer>
  );
}
