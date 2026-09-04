/**
 * The landing page.
 *
 * Built 4 Sep 2026 from the user's own mockup: a light cream ground instead of
 * a navy block, a serif headline that turns green on its second clause, four
 * pale stat cards with pastel circular marks, the four situations as white
 * cards, a green reassurance band, and a trust strip.
 *
 * Three things in that mockup are deliberately NOT reproduced, because they
 * would be false:
 *
 *   · "Expert guidance" and "Expert support — when you need it". There are no
 *     experts. Promising a bereaved family one is the worst copy on the page.
 *   · "100% Secure", which means nothing. What is true and better is that
 *     nothing is stored at all.
 *   · The photograph of clasped hands. No image generation was available here,
 *     and a stock substitute would be worse than the composition without it.
 *     The RBI's own sentence takes that slot, and the two cards the mockup
 *     floats over the photo stay exactly where it puts them.
 *
 * Every figure is from lib/rbi.ts. The threshold card says "floor" in as many
 * words: para 7(h) lets a bank set its own higher one, and stating a single
 * universal number is a prohibition.
 *
 * ─── Legal-accuracy pass, 4 Sep 2026 evening ───
 *
 * An advisor review caught two overclaims and a sourcing gap:
 *
 *   · The nominee/joint-account cards read "Nothing further, whatever the
 *     amount." That is wrong: para 9 removes the SUCCESSION documents
 *     (certificate, probate, indemnity bond, surety), not every document.
 *     lib/documents.ts's NOMINEE_PROCEDURE still lists three: claim form,
 *     death certificate, ID proof. The cards now say so.
 *   · The threshold card said "The RBI floor" with no mention that para 7(h)
 *     sets a LOWER figure for co-operative banks (₹5 lakh vs ₹15 lakh) and
 *     that a bank may set its own higher limit either way. Both now stated.
 *   · The cost/time cards (₹17,000, "4-7 months") described the succession
 *     certificate process most readers will never go through, with no
 *     citation and real state-to-state variance. Replaced with four cards
 *     that each trace to one paragraph: the threshold (7(h)), the document
 *     count for a nominee/survivor claim (para 9 + NOMINEE_PROCEDURE), the
 *     15-day settlement deadline (para 31), and the compliance date (para 5).
 *
 * Also added: a small UDGAM strip under the hero CTA (the RBI's own portal
 * for finding unclaimed deposits; this page only helps once something is
 * found), "Based on RBI Directions" replacing "RBI-backed rules" (the old
 * wording could read as an endorsement), and a real closing section — the
 * page previously ended on an explanatory banner and a trust grid, neither
 * of which asks the reader to do anything.
 */

import Link from "next/link";
import { NOTIFICATION, CLAUSES } from "@/lib/rbi";
import { SiteHeader, SiteFooter } from "./_components/chrome";
import { T, parseLocale, withLang, type Locale } from "@/lib/i18n";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = parseLocale((await searchParams).lang);

  return (
    <>
      <SiteHeader lang={lang} path="/" />

      <main className="flex-1 bg-paper">
        <Hero lang={lang} />
        <Numbers lang={lang} />
        <Situations lang={lang} />
        <UdgamStrip lang={lang} />
        <Trust lang={lang} />
        <FinalCta lang={lang} />
      </main>

      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ 1 */

function Hero({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <section className="border-b border-rule-faint bg-mist">
      <div className="shell grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-indigo-ink">
            {t.heroLead}{" "}
            <span className="text-indigo">{t.heroClaim}</span>
          </h1>

          <p className="lede-fluid mt-5 max-w-[46ch] text-ink-soft">
            {t.heroSub}
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
            {[
              { icon: <ShieldIcon />, label: t.trustRules },
              { icon: <QuoteMarkIcon />, label: t.trustCited },
              { icon: <TickIcon />, label: t.trustFree },
            ].map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink"
              >
                <span className="text-indigo" aria-hidden="true">
                  {t.icon}
                </span>
                {t.label}
              </li>
            ))}
          </ul>

          <Link
            href={withLang("/start", lang)}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-indigo px-8 py-4 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift"
          >
            {t.cta}
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <p className="mt-4 flex items-center gap-2 text-[0.9375rem] text-ink-soft">
            <span className="text-indigo" aria-hidden="true">
              <TickIcon />
            </span>
            {t.ctaNote}
          </p>
        </div>

        {/* The proof, where the mockup puts a photograph. One card, not two:
            the "most families are surprised" line used to float on its own
            below this and left a block of dead space under it -- it is now
            the card's own closing band, so the whole right column is one
            self-contained object instead of two mismatched ones. */}
        <div className="overflow-hidden rounded-2xl border border-rule bg-paper shadow-[0_12px_44px_rgba(23,37,29,0.10)]">
          <div className="p-6 sm:p-8">
            <p className="text-step font-bold uppercase tracking-[0.12em] text-maroon">
              {t.quoteLabel}
            </p>
            {lang !== "en" && (
              /* Translated gloss above, English clause below. A translated
                 statutory quote stops being a quote and a branch officer can
                 refuse it on that ground. */
              <p className="body-fluid mt-3 text-ink" lang={lang}>
                {t.quoteGloss}
              </p>
            )}
            <blockquote
              lang="en"
              className="body-fluid mt-4 font-serif leading-[1.6] text-ink"
            >
              &ldquo;… the bank shall not insist on production of legal documents
              such as Succession Certificate, Letter of Administration, Probate
              of Will, etc., or seek any bond of indemnity/ surety …
              irrespective of the amount standing to the credit.&rdquo;
            </blockquote>
            <p className="mt-5 border-t border-rule-faint pt-4 text-[0.875rem] leading-relaxed text-ink-soft">
              {t.quoteAttribution.replace(
                "9",
                String(CLAUSES.nomineeNoDocuments.para),
              )}{" "}
              <span className="text-ink-faint">
                {NOTIFICATION.number} · issued {NOTIFICATION.issued}
              </span>
            </p>
          </div>

          <div className="flex items-start gap-3 border-t border-rule-faint bg-indigo/8 p-6 sm:p-8">
            <span className="mt-0.5 shrink-0 text-indigo" aria-hidden="true">
              <ShieldIcon />
            </span>
            <p className="text-[0.9375rem] leading-snug text-ink">
              <strong className="font-bold">{t.surpriseStrong}</strong>{" "}
              <span className="text-ink-soft">{t.surpriseRest}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2 */

function Numbers({ lang }: { lang: Locale }) {
  const t = T[lang];
  // Each card traces to one paragraph in lib/rbi.ts. The previous cost/time
  // cards (₹17,000, 4-7 months) were dropped: those figures describe a court
  // process most readers will not go through, vary by state and circumstance,
  // and had no citation on this page. These four are all sourced facts.
  const NUMBERS = [
    { icon: <ScaleIcon />, figure: t.thresholdFigure, label: t.thresholdLabel, note: t.thresholdNote },
    { icon: <DocIcon />, figure: t.docsFigure, label: t.docsLabel, note: t.docsNote },
    { icon: <ClockIcon />, figure: t.daysFigure, label: t.daysLabel, note: t.daysNote },
    { icon: <CalendarIcon />, figure: t.dateFigure, label: t.dateLabel, note: t.dateNote },
  ];
  return (
    <section className="bg-paper">
      <div className="shell py-14 sm:py-16">
        <h2 className="display-lg text-center font-serif font-bold text-indigo-ink">
          {t.numbersHeading}
        </h2>
        {/* The mockup's small rule-and-dot under the heading. */}
        <div
          aria-hidden="true"
          className="mt-3 flex items-center justify-center gap-2"
        >
          <span className="h-px w-10 bg-indigo/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-indigo" />
          <span className="h-px w-10 bg-indigo/40" />
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {NUMBERS.map((n) => (
            <li
              key={n.label}
              className="rounded-2xl border border-rule-faint bg-mist p-5 text-center sm:p-6"
            >
              <span
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo/10 text-indigo"
              >
                {n.icon}
              </span>
              <p className="mt-4 font-serif text-[clamp(1.5rem,4.5vw,2rem)] font-bold leading-[1.1] text-indigo-ink">
                {n.figure}
              </p>
              <p className="mt-2 text-[0.9375rem] font-bold text-ink">
                {n.label}
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                {n.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3 */

const TONE: Record<string, { tint: string; ink: string }> = {
  green: { tint: "bg-indigo/10", ink: "text-indigo" },
  amber: { tint: "bg-saffron/15", ink: "text-saffron-ink" },
  blue: { tint: "bg-accent-blue/10", ink: "text-accent-blue" },
  violet: { tint: "bg-accent-violet/10", ink: "text-accent-violet" },
};

function Situations({ lang }: { lang: Locale }) {
  const t = T[lang];
  const PATHS = [
    { icon: <PersonIcon />, chip: t.chipNoCertificate, tone: "green", title: t.pathNominee, body: t.pathNomineeBody, href: "/nominee" },
    { icon: <TwoPeopleIcon />, chip: t.chipNoCertificate, tone: "amber", title: t.pathJoint, body: t.pathJointBody, href: "/survivorship" },
    { icon: <DocIcon />, chip: t.chipSixDocuments, tone: "blue", title: t.pathNoNominee, body: t.pathNoNomineeBody, href: "/start?claiming=deposit&nominee=no" },
    { icon: <QuestionIcon />, chip: t.chipStartHere, tone: "violet", title: t.pathUnknown, body: t.pathUnknownBody, href: "/start?claiming=deposit&nominee=unknown" },
  ];
  return (
    <section className="border-y border-rule-faint bg-mist">
      <div className="shell py-14 sm:py-16">
        <h2 className="display-lg font-serif font-bold text-indigo-ink">
          {t.situationsHeading}
        </h2>
        <p className="body-fluid mt-2 text-ink-soft">
          {t.situationsSub}
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {PATHS.map((p) => {
            const t = TONE[p.tone];
            return (
              <Link
                key={p.title}
                href={withLang(p.href, lang)}
                className="group flex items-start gap-4 rounded-2xl border border-rule-faint bg-paper p-5 transition-shadow hover:shadow-[0_10px_32px_rgba(23,37,29,0.10)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${t.tint} ${t.ink}`}
                >
                  {p.icon}
                </span>

                <span className="flex-1">
                  <span
                    className={`inline-block rounded-md px-2.5 py-1 text-[0.8125rem] font-bold ${t.tint} ${t.ink}`}
                  >
                    {p.chip}
                  </span>
                  <span className="display-md mt-2.5 block font-serif font-bold text-indigo-ink">
                    {p.title}
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ink-soft">
                    {p.body}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule text-[1.125rem] text-indigo transition-colors group-hover:border-indigo group-hover:bg-indigo group-hover:text-white sm:flex"
                >
                  &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4 */

/**
 * UDGAM has its own section now, not a small box wedged into the hero's
 * left column -- that made the hero lopsided (the right column's photo-slot
 * card was left half the height of the left column, with a block of dead
 * space under it). Same two facts the strip said, given the room a real
 * question ("how do I find the deposit in the first place?") deserves.
 */
function UdgamStrip({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <section className="border-t border-rule-faint bg-paper">
      <div className="shell grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:gap-14">
        <div>
          <p className="display-md font-serif font-bold text-indigo-ink">
            {t.udgamStripHeading}
          </p>
          <p className="mt-2 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-soft">
            {t.udgamStripBody}
          </p>
        </div>
        <a
          href="https://udgam.rbi.org.in/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-indigo px-6 py-3.5 text-[0.9375rem] font-bold text-indigo transition-colors hover:bg-indigo/8"
        >
          {t.udgamStripCta}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 5 */

/**
 * The old Assurance banner and TrustStrip row were two disconnected pieces --
 * a flat tinted bar, then a bare row of icon+text with no card treatment at
 * all, the one part of the page that looked unfinished next to everything
 * else. One section now: the assurance heading owns it, the four facts are
 * cards in the same visual language as "Four things to know first" above.
 */
function Trust({ lang }: { lang: Locale }) {
  const t = T[lang];
  const TRUST = [
    { icon: <TickIcon />, title: t.tNoSignIn, note: t.tNoSignInNote },
    { icon: <LockIcon />, title: t.tNoData, note: t.tNoDataNote },
    { icon: <QuoteMarkIcon />, title: t.tPlain, note: t.tPlainNote },
    { icon: <PrinterIcon />, title: t.tPrint, note: t.tPrintNote },
  ];
  return (
    <section className="border-t border-rule-faint bg-mist">
      <div className="shell py-14 sm:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 className="display-lg font-serif font-bold text-indigo-ink">
            {t.assuranceTitle}
          </h2>
          <a
            href={NOTIFICATION.url}
            target="_blank"
            rel="noreferrer"
            className="-my-2 inline-flex items-center gap-2 py-2 text-[0.9375rem] font-bold text-link underline underline-offset-2"
          >
            {t.assuranceLink}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-ink-soft">
          {t.assuranceSub}
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TRUST.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-rule-faint bg-paper p-5"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo/10 text-indigo"
              >
                {item.icon}
              </span>
              <p className="mt-4 text-[0.9375rem] font-bold text-indigo-ink">
                {item.title}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-soft">
                {item.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 6 */

/** The page's actual closing action. Assurance and TrustStrip both explain;
    neither asks for anything, so the page previously ended without one. */
function FinalCta({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <section className="border-t border-rule-faint bg-indigo">
      <div className="shell flex flex-col items-center gap-4 py-14 text-center sm:py-16">
        <p className="display-lg max-w-[26ch] font-serif font-bold text-white">
          {t.finalCtaHeading}
        </p>
        <p className="max-w-[46ch] text-[1rem] text-white/85">
          {t.finalCtaSub}
        </p>
        <Link
          href={withLang("/start", lang)}
          className="mt-2 inline-flex items-center gap-3 rounded-xl bg-saffron px-8 py-4 text-[1.0625rem] font-bold text-indigo-ink transition-colors hover:bg-[#ab6314] hover:text-white"
        >
          {t.finalCta}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn marks. One stroke weight, 24px grid. */

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5l7.5 3v6.3c0 4.5-3.1 8.2-7.5 10.2-4.4-2-7.5-5.7-7.5-10.2V5.5l7.5-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.7 11.9l2.3 2.3 4.4-4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function QuoteMarkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.5 6.5C6.9 7.6 5.5 9.6 5.5 12.4v5.1h5.2v-5.1H8.1c0-1.7.7-2.9 2.2-3.6l-.8-2.3zM19.5 6.5c-2.6 1.1-4 3.1-4 5.9v5.1h5.2v-5.1h-2.6c0-1.7.7-2.9 2.2-3.6l-.8-2.3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12.3l2.6 2.6 5.4-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 9V3.5h10V9M7 19H5a1.5 1.5 0 0 1-1.5-1.5v-6A1.5 1.5 0 0 1 5 10h14a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 19 19h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="15.5" width="10" height="5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.2V12l3.2 2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v16M6 20h12M4 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 9l-2.2 4.6a3 3 0 0 0 4.4 0L4 9zm16 0l-2.2 4.6a3 3 0 0 0 4.4 0L20 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 9l8-3 8 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.4 3.1-5.6 7-5.6s7 2.2 7 5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TwoPeopleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.4" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 6.2a3.2 3.2 0 0 1 0 4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 19.6c0-3 2.7-4.9 6-4.9s6 1.9 6 4.9M17.5 15.2c2.1.5 3.5 1.9 3.5 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.4 9h7.2M8.4 12.6h7.2M8.4 16.2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.7-.9 1.3v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.4" r="0.95" fill="currentColor" />
    </svg>
  );
}
