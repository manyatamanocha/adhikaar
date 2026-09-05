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
import { parseLocale } from "@/lib/i18n";
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

        <main className="mx-auto max-w-[1920px] px-5 py-14 sm:px-8">
          <div className="max-w-[900px]">
            <p className="text-[0.9375rem] font-bold uppercase tracking-[0.12em] text-[#E2653B]">
              Bank-by-bank
            </p>
            <h1 className="mt-2 font-serif text-[2.75rem] font-bold tracking-[-0.01em] text-[#16233F]">
              The rule is the same everywhere. The practice is not.
            </h1>
            <p className="mt-3 max-w-[64ch] text-[1.1875rem] leading-relaxed text-[#5B5344]">
              The RBI sets a floor and every bank builds its own practice on top.
              This is what {BANKS.length} banks publish about deceased claims, read
              from their own pages — including where they publish nothing at all.
            </p>
            <Link
              href="/start"
              className="mt-6 inline-flex items-center gap-2.5 rounded bg-[#E2653B] px-7 py-3.5 text-[1.0625rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
            >
              Start your claim journey today
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-[#16233F] bg-white p-6 text-[1.0625rem] leading-relaxed">
            <strong className="font-bold">Every cell is read or blank.</strong>{" "}
            Nothing here is inferred. Where a bank has not published a figure we
            leave it empty and say so, rather than filling it with the RBI floor
            and letting you believe it is that bank&apos;s own number. {BANKS.length}{" "}
            checked rows are worth more than fifteen half-known ones.
          </div>

          {missing.length > 0 && (
            <div className="mt-6 rounded-2xl border-2 border-[#B84E1E] bg-[#FBEAE3] p-6">
              <h2 className="font-serif text-[1.375rem] font-bold text-[#B84E1E]">
                An empty row is itself a finding
              </h2>
              <p className="mt-2 max-w-[70ch] text-[1.0625rem] leading-relaxed text-[#16233F]">
                Since 31 March 2026 a bank has been required to publish its
                board-approved deceased-claim policy and its document checklist.
                We could not find one for{" "}
                <strong className="font-bold">
                  {missing.map((b) => b.short).join(", ")}
                </strong>
                . If you are claiming there, ask the branch in writing for the
                board-approved policy and the checklist.
              </p>
              {pageOnly.length > 0 && (
                <p className="mt-3 max-w-[70ch] text-[1.0625rem] leading-relaxed text-[#16233F]">
                  <strong className="font-bold">
                    {pageOnly.map((b) => b.short).join(" and ")}
                  </strong>{" "}
                  publish a deceased-claim page with real detail on it, but we did
                  not find the board-approved policy document itself. A page is
                  not the same thing as the policy the rule asks for, so the
                  table says which one we actually found.
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
            Swipe the table sideways for the rest of the columns. The bank names
            stay put.
          </p>

          {/* Wide content scrolls inside its own box; the page never does. */}
          <div className="mt-2.5 overflow-x-auto rounded-2xl border border-[#EFE7D8] shadow-[0_8px_24px_rgba(22,35,63,0.08)] lg:mt-8">
            <table className="w-full min-w-[820px] border-collapse text-left text-[1rem]">
              <caption className="sr-only">
                Deceased-claim practice at {BANKS.length} banks
              </caption>
              <thead>
                <tr className="bg-[#16233F] text-white">
                  <Th stick>Bank</Th>
                  <Th>Its own threshold</Th>
                  <Th>Third-party surety below it</Th>
                  <Th>Policy published</Th>
                  <Th>Form to download</Th>
                  <Th>Checked</Th>
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
                              ? "Not to be insisted on"
                              : "Required"
                        }
                      />
                    </Td>
                    <Td>
                      {/* What the rule requires is a board-approved POLICY
                          document, not a web page about claims. Reporting a
                          page as a policy would overstate compliance in the one
                          column whose whole value is that it does not. */}
                      {bank.policyPublished !== "published" ? (
                        <span className="font-bold text-[#B84E1E]">✗ Nothing found</span>
                      ) : bank.policyUrl ? (
                        <span className="font-semibold text-[#3F7A5D]">
                          ✓ Policy document
                        </span>
                      ) : (
                        <span className="font-semibold text-[#16233F]">
                          ~ A claims page, no policy document
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
                          Its form
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
                          Confirm before relying on this
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
              What each one actually says
            </h2>

            <ul className="mt-6 space-y-6">
              {BANKS.map((bank) => (
                <li
                  key={bank.id}
                  className="rounded-2xl bg-white p-7 shadow-[0_8px_24px_rgba(22,35,63,0.08)]"
                >
                  <h3 className="font-serif text-[1.375rem] font-bold text-[#16233F]">
                    {bank.name}
                  </h3>

                  {bank.practiceConflict && (
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#B84E1E]">
                      <strong className="font-bold">
                        Documented gap between policy and practice:{" "}
                      </strong>
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
                            Read the full article on {bank.short}
                          </Link>
                        </li>
                      ) : null;
                    })()}
                    {[
                      ["Its deceased-claim page", bank.pageUrl],
                      ["Its claim form", bank.claimFormUrl],
                      ["Its published policy", bank.policyUrl],
                      ["Lodge online", bank.onlineClaimUrl],
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
              Read from each bank&apos;s own published pages on the dates shown.
              The rule they are all working from is{" "}
              <a
                href={NOTIFICATION.url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
              >
                {NOTIFICATION.title}
              </a>
              , {NOTIFICATION.number}. Information, not legal advice. A bank may
              have changed its page since we checked — the date is there so you
              can tell.
            </p>
            <p className="mt-2">
              <Link
                href="/start"
                className="-my-2 inline-block py-2 font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
              >
                Find out what applies to your claim
              </Link>
              {" · "}
              <Link
                href="/contact"
                className="-my-2 inline-block py-2 font-bold text-[#16233F] underline decoration-[#E2653B] decoration-2 underline-offset-4"
              >
                Found an outdated bank policy? Tell us
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
