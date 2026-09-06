"use client";

/**
 * The bank table, restyled 5 Sep 2026 onto the homepage's own chrome and
 * palette (RecoverNav/RecoverFooter, cream/terracotta/navy) instead of the
 * older SiteHeader/SiteFooter shell -- same content and data as before,
 * different skin, so clicking "Policy" from the homepage nav doesn't land
 * on what reads as a different, older site.
 *
 * Not a directory. From 31 March 2026 a bank is required to publish its
 * deceased-claim policy and document checklist, so a blank cell in the
 * "Policy published" column is a documented rule breach rather than a gap in
 * our research — which is what turns a reference into an accountability record.
 */

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { RecoverFooter } from "../../recover/_components/footer";
import { HomeI18nProvider } from "../../recover/_components/home-i18n";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";
import { formatDate } from "../../_components/bank-panel";
import { BANKS, isStale } from "@/lib/banks";
import { LEARN_ARTICLES } from "@/lib/learn";
import { NOTIFICATION } from "@/lib/rbi";

export function BanksPage() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = HOME_T[locale];

  const missing = BANKS.filter((b) => b.policyPublished === "unverified");
  // Found a claims page, but not the board-approved policy document itself.
  const pageOnly = BANKS.filter(
    (b) => b.policyPublished === "published" && !b.policyUrl,
  );

  return (
    <HomeI18nProvider value={{ t, locale }}>
      <div className="min-h-screen bg-[#FAF5EC] text-[#16233F] antialiased">
        <RecoverNav />

        <main className="mx-auto max-w-[1920px] px-5 py-8 sm:px-8 sm:py-12">
          <div className="max-w-[900px]">
            <p className="text-[0.9375rem] font-bold uppercase tracking-[0.12em] text-[#E2653B]">
              {t.banksPage.eyebrow}
            </p>
            <h1 className="display-xl mt-2 font-serif font-bold tracking-[-0.01em] text-[#16233F]">
              {t.banksPage.heading}
            </h1>
            <p className="lede-fluid mt-3 max-w-[64ch] leading-relaxed text-[#5B5344]">
              {t.banksPage.sub}
            </p>
            <Link
              href="/start"
              className="mt-6 inline-flex items-center gap-2.5 rounded bg-[#E2653B] px-6 py-3 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
            >
              {t.banksPage.cta}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="body-fluid mt-8 rounded-2xl border-2 border-[#16233F] bg-white p-6 leading-relaxed">
            <strong className="font-bold">{t.banksPage.everyCellStrong}</strong>{" "}
            {t.banksPage.everyCellBody}
          </div>

          {missing.length > 0 && (
            <div className="mt-6 rounded-2xl border-2 border-[#B84E1E] bg-[#FBEAE3] p-6">
              <h2 className="display-md font-serif font-bold text-[#B84E1E]">
                {t.banksPage.emptyRowHeading}
              </h2>
              <p className="body-fluid mt-2 max-w-[70ch] leading-relaxed text-[#16233F]">
                {t.banksPage.emptyRowBefore}{" "}
                <strong className="font-bold">
                  {missing.map((b) => b.short).join(", ")}
                </strong>
                {t.banksPage.emptyRowAfter}
              </p>
              {pageOnly.length > 0 && (
                <p className="body-fluid mt-3 max-w-[70ch] leading-relaxed text-[#16233F]">
                  <strong className="font-bold">
                    {pageOnly.map((b) => b.short).join(" and ")}
                  </strong>{" "}
                  {t.banksPage.pageOnlyAfter}
                </p>
              )}
            </div>
          )}

          {/* Six columns cannot fit a phone, and a table that scrolls with no
              sign that it scrolls just looks like a table with its right-hand
              side chopped off. Say so, once, on the screens where it is true. */}
          <p
            data-print="hide"
            className="mt-8 text-[0.9375rem] text-[#6B6255] lg:hidden"
          >
            {t.banksPage.swipeHint}
          </p>

          {/* Wide content scrolls inside its own box; the page never does. */}
          <div className="mt-2.5 overflow-x-auto rounded-2xl border border-[#EFE7D8] shadow-[0_8px_24px_rgba(22,35,63,0.08)] lg:mt-8">
            <table className="w-full min-w-[820px] border-collapse text-left text-[1rem]">
              <caption className="sr-only">
                Deceased-claim practice at {BANKS.length} banks
              </caption>
              <thead>
                <tr className="bg-[#16233F] text-white">
                  <Th stick>{t.banksPage.thBank}</Th>
                  <Th>{t.banksPage.thThreshold}</Th>
                  <Th>{t.banksPage.thSurety}</Th>
                  <Th>{t.banksPage.thPolicy}</Th>
                  <Th>{t.banksPage.thForm}</Th>
                  <Th>{t.banksPage.thChecked}</Th>
                </tr>
              </thead>
              <tbody>
                {BANKS.map((bank, i) => (
                  <tr key={bank.id} className={i % 2 ? "bg-[#FAF5EC]" : "bg-white"}>
                    <Td stick zebra={i % 2 ? "bg-[#FAF5EC]" : "bg-white"}>
                      <span className="font-bold text-[#16233F]">{bank.short}</span>
                      <span className="block text-[0.875rem] text-[#6B6255]">
                        {bank.name}
                      </span>
                    </Td>
                    <Td>
                      <Cell value={bank.thresholdLabel} />
                    </Td>
                    <Td>
                      <Cell
                        value={
                          bank.noSuretyBelowThreshold === null
                            ? null
                            : bank.noSuretyBelowThreshold
                              ? t.banksPage.suretyNotRequired
                              : t.banksPage.suretyRequired
                        }
                      />
                    </Td>
                    <Td>
                      {/* What the rule requires is a board-approved POLICY
                          document, not a web page about claims. Reporting a
                          page as a policy would overstate compliance in the one
                          column whose whole value is that it does not. */}
                      {bank.policyPublished !== "published" ? (
                        <span className="font-bold text-[#B84E1E]">
                          ✗ {t.banksPage.policyNothingFound}
                        </span>
                      ) : bank.policyUrl ? (
                        <span className="font-semibold text-[#3F7A5D]">
                          ✓ {t.banksPage.policyDocument}
                        </span>
                      ) : (
                        <span className="font-semibold text-[#16233F]">
                          ~ {t.banksPage.policyPageOnly}
                        </span>
                      )}
                    </Td>
                    <Td>
                      {bank.claimFormUrl ? (
                        <a
                          href={bank.claimFormUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="-my-2 inline-block py-2 font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
                        >
                          {t.banksPage.formLink}
                        </a>
                      ) : (
                        <Cell value={null} />
                      )}
                    </Td>
                    <Td>
                      <span className="text-[#6B6255]">
                        {formatDate(bank.verifiedOn)}
                      </span>
                      {isStale(bank.verifiedOn) && (
                        <span className="mt-0.5 block text-[0.8125rem] font-bold text-[#B84E1E]">
                          {t.banksPage.confirmStale}
                        </span>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="mt-14">
            <h2 className="font-serif text-[2rem] font-bold tracking-[-0.01em] text-[#16233F]">
              {t.banksPage.whatEachSaysHeading}
            </h2>

            <ul className="mt-6 space-y-6">
              {BANKS.map((bank) => (
                <li
                  key={bank.id}
                  className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_rgba(22,35,63,0.1)]"
                >
                  <h3 className="display-md font-serif font-bold text-[#16233F]">
                    {bank.name}
                  </h3>

                  {bank.practiceConflict && (
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#B84E1E]">
                      <strong className="font-bold">{t.banksPage.gapLabel} </strong>
                      {bank.practiceConflict}
                    </p>
                  )}

                  {bank.suretyQuote && (
                    <blockquote className="mt-3 border-l-4 border-[#E2653B] pl-4 font-serif text-[1.0625rem] leading-[1.6] text-[#16233F]">
                      &ldquo;{bank.suretyQuote}&rdquo;
                    </blockquote>
                  )}

                  {bank.turnaround && (
                    <blockquote className="mt-3 border-l-4 border-[#E2653B] pl-4 font-serif text-[1.0625rem] leading-[1.6] text-[#16233F]">
                      &ldquo;{bank.turnaround}&rdquo;
                    </blockquote>
                  )}

                  <ul className="mt-3 space-y-2">
                    {bank.notes.map((note) => (
                      <li
                        key={note}
                        className="text-[1.0625rem] leading-relaxed text-[#5B5344]"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#EFE7D8] pt-4 text-[1rem]">
                    {(() => {
                      const article = LEARN_ARTICLES.find((a) =>
                        a.slug.startsWith(bank.id),
                      );
                      return article ? (
                        <li>
                          <Link
                            href={`/learn/${article.slug}`}
                            className="-my-2 inline-block py-2 font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
                          >
                            {t.banksPage.readFullArticle(bank.short)}
                          </Link>
                        </li>
                      ) : null;
                    })()}
                    {[
                      [t.banksPage.linkPage, bank.pageUrl],
                      [t.banksPage.linkForm, bank.claimFormUrl],
                      [t.banksPage.linkPolicy, bank.policyUrl],
                      [t.banksPage.linkOnline, bank.onlineClaimUrl],
                    ].map(([label, url]) =>
                      url ? (
                        <li key={label}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="-my-2 inline-block py-2 font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
                          >
                            {label}
                          </a>
                        </li>
                      ) : null,
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12 max-w-[900px] border-t border-[#EFE7D8] pt-6 text-[0.9375rem] leading-relaxed text-[#6B6255]">
            <p>
              {t.banksPage.footerReadFrom}{" "}
              <a
                href={NOTIFICATION.url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
              >
                {NOTIFICATION.title}
              </a>
              , {NOTIFICATION.number}. {t.banksPage.footerInfoNote}
            </p>
            <p className="mt-2">
              <Link
                href="/start"
                className="-my-2 inline-block py-2 font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
              >
                {t.banksPage.findClaim}
              </Link>
              {" · "}
              <Link
                href={withLang("/contact", locale)}
                className="-my-2 inline-block py-2 font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
              >
                {t.banksPage.tellUs}
              </Link>
            </p>
          </div>
        </main>

        <RecoverFooter />
      </div>
    </HomeI18nProvider>
  );
}

/* ------------------------------------------------------------------ */

/**
 * `stick` pins the bank-name column while the other five scroll under it.
 */
function Th({ children, stick }: { children: React.ReactNode; stick?: boolean }) {
  return (
    <th
      scope="col"
      className={`border-b border-[#10192E] px-4 py-3 text-[0.875rem] font-bold uppercase tracking-[0.06em] ${
        stick ? "sticky left-0 z-10 bg-[#16233F] shadow-[1px_0_0_#10192E]" : ""
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  stick,
  zebra,
}: {
  children: React.ReactNode;
  stick?: boolean;
  /** The row's own ground, repeated so the pinned cell is never transparent. */
  zebra?: string;
}) {
  return (
    <td
      className={`border-b border-[#EFE7D8] px-4 py-3.5 align-top ${
        stick ? `sticky left-0 z-10 ${zebra ?? "bg-white"} shadow-[1px_0_0_#EFE7D8]` : ""
      }`}
    >
      {children}
    </td>
  );
}

/** A blank cell reads as a blank cell — never as a plausible figure. */
function Cell({ value }: { value: string | null }) {
  return value ? (
    <span className="text-[#16233F]">{value}</span>
  ) : (
    <span className="italic text-[#B84E1E]">Not published</span>
  );
}
