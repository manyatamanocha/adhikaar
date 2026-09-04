/**
 * /discovery — the repositioning landing page.
 *
 * A SECOND landing page beside the live one, not replacing it. The brief moves
 * Adhikaar from "you probably do not need a succession certificate" to "where
 * is my deceased family member's unclaimed money, and what do I do?".
 *
 * Built to the brief's own structure and its own cap: seven sections, in its
 * order — navbar, hero, UDGAM, asset categories, three-step process,
 * reassurance, trust — then a final call to action and a footer. No dashboard,
 * no claim tracker, no product screens.
 *
 * ─── What this page may NOT claim, and does not ───
 *
 * Adhikaar runs no search. No backend, no data source, no index of anyone's
 * accounts. Every verb is a guidance verb: understand, know where to look, get
 * a checklist. The brief's own trust section says it plainly and so does this
 * page — a possible match does not mean the money is yours, and Adhikaar is
 * not a government website.
 *
 * udgam.rbi.org.in was checked (200) before being linked.
 *
 * "Start Your Search" is kept exactly as the brief wrote it, even though
 * "search" could be read as Adhikaar doing the searching. That ambiguity is
 * what five people looking at this page will reveal, and pre-fixing it would
 * defeat the test the brief asks for.
 *
 * Every string comes from lib/i18n-discovery.ts, so the page is already
 * English, Hindi and Kannada, and another Indian language is one object.
 */

import Link from "next/link";
import { HeroPictures } from "../_components/banner-carousel";
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_SHORT,
  parseLocale,
  withLang,
  type Locale,
} from "@/lib/i18n";
import { D } from "@/lib/i18n-discovery";

export const metadata = {
  title: "Adhikaar — find unclaimed money left behind by a loved one",
  description:
    "Adhikaar helps families understand where a deceased family member may have unclaimed financial assets — and what to do next.",
};

const UDGAM_URL = "https://udgam.rbi.org.in/";

export default async function DiscoveryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = parseLocale((await searchParams).lang);

  return (
    <>
      <Navbar lang={lang} />
      <main className="flex-1 bg-paper">
        <Hero lang={lang} />
        <Udgam lang={lang} />
        <Places lang={lang} />
        <HowItWorks lang={lang} />
        <Reassurance lang={lang} />
        <Trust lang={lang} />
        <FinalCta lang={lang} />
      </main>
      <Foot lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ 1 */

function Navbar({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <header className="border-b border-rule-faint bg-paper">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-5">
        <Link href={withLang("/discovery", lang)} className="-my-2 py-2">
          {/* The wordmark is the loudest thing in the bar. */}
          <span className="block font-serif text-[clamp(2rem,3.4vw,2.75rem)] font-bold leading-none tracking-[-0.015em] text-indigo">
            Adhikaar
          </span>
          <span className="mt-1.5 block text-[1.0625rem] text-ink-soft">
            {d.tagline}
          </span>
        </Link>

        <nav
          aria-label="Sections"
          className="order-3 flex flex-wrap items-center gap-x-7 gap-y-2 lg:order-none"
        >
          {[
            [d.navHow, "#how"],
            [d.navWhere, "#places"],
            [d.navUdgam, "#udgam"],
            [d.navResources, "/other-assets"],
          ].map(([l, href]) => (
            <a
              key={l}
              href={href}
              className="-my-2 py-2 text-[1.0625rem] font-semibold text-ink-soft transition-colors hover:text-indigo"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          {/* Locale in the URL, never a cookie. More Indian languages are a
              roadmap item: adding one is one object in i18n-discovery.ts. */}
          <nav
            aria-label="Language"
            className="flex items-center rounded-pill border border-rule bg-paper p-0.5"
          >
            {LOCALES.map((l) => {
              const on = l === lang;
              return (
                <Link
                  key={l}
                  href={withLang("/discovery", l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={on ? "true" : undefined}
                  className={`rounded-pill px-3.5 py-2 text-[1rem] font-semibold transition-colors ${
                    on ? "bg-indigo text-white" : "text-ink-soft hover:text-indigo"
                  }`}
                >
                  <span className="sm:hidden">{LOCALE_SHORT[l]}</span>
                  <span className="hidden sm:inline">{LOCALE_LABEL[l]}</span>
                </Link>
              );
            })}
          </nav>

          <Link
            href={withLang("/start", lang)}
            className="rounded-xl bg-indigo px-6 py-3.5 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
          >
            {d.startSearch}
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ 2 */

function Hero({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section className="border-b border-rule-faint bg-mist">
      <div className="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-indigo-ink">
            {d.heroTitle}
          </h1>

          <p className="mt-6 max-w-[50ch] text-[clamp(1.25rem,1.6vw,1.5rem)] leading-[1.5] text-ink-soft">
            {d.heroSub}
          </p>

          <Link
            href={withLang("/start", lang)}
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-indigo px-9 py-5 text-[1.1875rem] font-bold text-white transition-colors hover:bg-indigo-lift"
          >
            {d.startSearch}
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <p className="mt-5 text-[1.0625rem] italic text-ink-soft">
            {d.heroNote}
          </p>
        </div>

        <div>
          {/* Hero C from /discovery/variants: no photograph, the authored
              drawn scenes. The hands photo was removed on the user's
              instruction. */}
          <HeroPictures />

          <div className="mt-5 flex flex-wrap gap-3">
            {[d.cardBank, d.cardInsurance, d.cardInvestments].map((l) => (
              <p
                key={l}
                className="rounded-xl border border-rule bg-paper px-4 py-3 text-[1rem] font-bold text-indigo-ink shadow-[0_6px_20px_rgba(23,37,29,0.10)]"
              >
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3 */

function Udgam({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section id="udgam" className="scroll-mt-4 border-b border-rule-faint bg-paper">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.12] text-indigo-ink">
              {d.udgamHeading}
            </h2>
            <p className="mt-5 max-w-[52ch] text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.55] text-ink">
              {d.udgamLead}
            </p>
            <p className="mt-4 max-w-[52ch] text-[clamp(1.125rem,1.5vw,1.375rem)] font-bold leading-[1.55] text-ink">
              {d.udgamHelp}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={withLang("/other-assets", lang)}
                className="rounded-xl bg-indigo px-7 py-4 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
              >
                {d.udgamLearn}
              </Link>
              <a
                href={UDGAM_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border-2 border-indigo px-7 py-4 text-[1.0625rem] font-bold text-indigo transition-colors hover:bg-indigo/8"
              >
                {d.udgamVisit}
              </a>
            </div>
          </div>

          {/* The most important box on the page. */}
          <div className="rounded-2xl border-2 border-indigo bg-mist p-7 sm:p-9">
            <p className="text-[1.375rem] font-bold leading-snug text-indigo-ink">
              {d.udgamNotReplaceTitle}
            </p>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink">
              {d.udgamNotReplaceBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4 */

const PLACE_ICONS = [
  <BankIcon key="bank" />,
  <UmbrellaIcon key="ins" />,
  <ChartIcon key="mf" />,
  <CertificateIcon key="sh" />,
  <PillarIcon key="epf" />,
  <BoxIcon key="oth" />,
];

function Places({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section id="places" className="scroll-mt-4 border-b border-rule-faint bg-mist">
      <div className="shell py-16 sm:py-20">
        <h2 className="max-w-[22ch] font-serif text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.12] text-indigo-ink">
          {d.placesHeading}
        </h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.places.map((p, i) => (
            <li
              key={p.title}
              className="rounded-2xl border border-rule-faint bg-paper p-6 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo/10 text-indigo"
              >
                {PLACE_ICONS[i]}
              </span>
              <p className="mt-5 font-serif text-[1.5rem] font-bold leading-tight text-indigo-ink">
                {p.title}
              </p>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 5 */

function HowItWorks({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section id="how" className="scroll-mt-4 border-b border-rule-faint bg-paper">
      <div className="shell py-16 sm:py-20">
        <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.12] text-indigo-ink">
          {d.howHeading}
        </h2>

        <ol className="mt-10 grid gap-6 lg:grid-cols-3">
          {d.steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-2xl border border-rule-faint bg-mist p-7"
            >
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo font-serif text-[1.5rem] font-bold text-white"
              >
                {i + 1}
              </span>
              <p className="mt-5 font-serif text-[1.625rem] font-bold leading-tight text-indigo-ink">
                {s.title}
              </p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <Link
          href={withLang("/start", lang)}
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-indigo px-9 py-5 text-[1.1875rem] font-bold text-white transition-colors hover:bg-indigo-lift"
        >
          {d.startSearch}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 6 */

function Reassurance({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section className="border-b border-rule-faint bg-mist-deep">
      <div className="shell py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-[24ch] font-serif text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.12] text-indigo-ink">
          {d.reassureHeading}
        </h2>

        <ul className="mx-auto mt-9 flex max-w-[54rem] flex-col gap-3 sm:flex-row sm:justify-center">
          {d.questions.map((q) => (
            <li
              key={q}
              className="flex-1 rounded-xl border border-rule bg-paper px-5 py-5 text-[1.125rem] font-semibold text-ink"
            >
              {q}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[1.375rem] text-ink-soft">{d.thatsOkay}</p>
        <p className="mt-2 font-serif text-[clamp(1.75rem,2.8vw,2.25rem)] font-bold text-indigo">
          {d.startWithWhat}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 7 */

const TRUST_ICONS = [
  <PillarIcon key="a" />,
  <ScalesIcon key="b" />,
  <LockIcon key="c" />,
  <FlagIcon key="d" />,
];

function Trust({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section className="border-b border-rule-faint bg-paper">
      <div className="shell py-16 sm:py-20">
        <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.12] text-indigo-ink">
          {d.trustHeading}
        </h2>

        <ul className="mt-10 grid gap-7 sm:grid-cols-2">
          {d.trust.map((t, i) => (
            <li key={t.title} className="flex items-start gap-5">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo/10 text-indigo"
              >
                {TRUST_ICONS[i]}
              </span>
              <div>
                <p className="font-serif text-[1.5rem] font-bold leading-tight text-indigo-ink">
                  {t.title}
                </p>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-soft">
                  {t.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 8 */

function FinalCta({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section className="bg-indigo">
      <div className="shell py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-[20ch] font-serif text-[clamp(2.25rem,4.4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.015em] text-white">
          {d.finalHeading}
        </h2>
        <p className="mx-auto mt-5 max-w-[46ch] text-[clamp(1.125rem,1.5vw,1.375rem)] leading-relaxed text-white/85">
          {d.finalSub}
        </p>
        <Link
          href={withLang("/start", lang)}
          className="mt-9 inline-flex items-center gap-3 rounded-xl bg-saffron px-9 py-5 text-[1.1875rem] font-bold text-indigo-ink transition-colors hover:bg-[#ab6314] hover:text-white"
        >
          {d.startSearch}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

function Foot({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <footer className="bg-indigo-ink">
      <div className="shell flex flex-wrap items-end justify-between gap-8 py-12">
        <div>
          <p className="font-serif text-[2.25rem] font-bold leading-none text-white">
            Adhikaar
          </p>
          <p className="mt-2.5 text-[1.0625rem] italic text-white/70">
            {d.tagline}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
          {d.footLinks.map((l) => (
            <span key={l} className="text-[1.0625rem] text-white/70">
              {l}
            </span>
          ))}
        </nav>
      </div>

      <div className="shell border-t border-white/15 py-6">
        <p className="max-w-[76ch] text-[0.9375rem] leading-relaxed text-white/60">
          {d.footDisclaimer}{" "}
          <Link
            href={withLang("/", lang)}
            className="font-bold text-white/85 underline underline-offset-2"
          >
            {d.footLive}
          </Link>
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn marks. No coins, no rupee confetti. */

function LockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PillarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 9.5h17L12 4 3.5 9.5zM5 20h14M6.5 12v6M11 12v6M15.5 12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScalesIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v16M6 20h12M4 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 9l-2.2 4.6a3 3 0 0 0 4.4 0L4 9zm16 0l-2.2 4.6a3 3 0 0 0 4.4 0L20 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 9l8-3 8 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 21V4M6 5h11l-2.5 4L17 13H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 9.5h17L12 4 3.5 9.5zM5 20h14M6.5 12v6M11 12v6M15.5 12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UmbrellaIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5c4.7 0 8.5 3.8 8.5 8.5H3.5c0-4.7 3.8-8.5 8.5-8.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 12v6.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19.5h16M6.5 19.5v-6M11 19.5V8M15.5 19.5v-4M20 19.5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 8.5h9M7.5 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 16.5v4l2.5-1.5L14 20.5v-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
