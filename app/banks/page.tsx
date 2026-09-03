/**
 * The bank table.
 *
 * Not a directory. From 31 March 2026 a bank is required to publish its
 * deceased-claim policy and document checklist, so a blank cell in the
 * "Policy published" column is a documented rule breach rather than a gap in
 * our research — which is what turns a reference into an accountability record.
 *
 * The law is uniform. The practice is not: SBI revised its procedure in
 * December 2025, while PNB was still being asked for a third-party surety
 * months later. That difference is the whole reason this page exists.
 */

import Link from "next/link";
import { SiteHeader, SiteFooter } from "../_components/chrome";
import { formatDate } from "../_components/bank-panel";
import { BANKS } from "@/lib/banks";
import { NOTIFICATION } from "@/lib/rbi";

export const metadata = {
  title: "What each bank publishes — Adhikaar",
  description:
    "Four banks, compiled from their own published pages: each one's own threshold, its position on third-party surety, its claim forms, whether it has published the policy it is required to publish, and the date we checked.",
};

export default function Page() {
  const missing = BANKS.filter((b) => b.policyPublished === "unverified");
  // Found a claims page, but not the board-approved policy document itself.
  const pageOnly = BANKS.filter(
    (b) => b.policyPublished === "published" && !b.policyUrl,
  );

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-indigo">
          <div className="shell max-w-[1100px] py-10 sm:py-14">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-white">
              The rule is the same everywhere. The practice is not.
            </h1>
            <p className="lede-fluid mt-4 max-w-[64ch] text-white/90">
              The RBI sets a floor and every bank builds its own practice on
              top. This is what {BANKS.length} banks publish about deceased
              claims, read from their own pages — including where they publish
              nothing at all.
            </p>
          </div>
        </section>

        <div className="shell max-w-[1100px] py-10 sm:py-12">
          <p className="hardbox body-fluid">
            <strong className="font-bold">Every cell is read or blank.</strong>{" "}
            Nothing here is inferred. Where a bank has not published a figure we
            leave it empty and say so, rather than filling it with the RBI floor
            and letting you believe it is that bank&apos;s own number. Four
            checked rows are worth more than fifteen half-known ones.
          </p>

          {missing.length > 0 && (
            <div className="mt-6 rounded-xl border-2 border-maroon bg-blush p-6">
              <h2 className="display-md font-serif font-bold text-maroon">
                An empty row is itself a finding
              </h2>
              <p className="body-fluid mt-2 max-w-[70ch] leading-relaxed text-ink">
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
                <p className="body-fluid mt-3 max-w-[70ch] leading-relaxed text-ink">
                  <strong className="font-bold">
                    {pageOnly.map((b) => b.short).join(" and ")}
                  </strong>{" "}
                  publish a deceased-claim page with real detail on it, but we
                  did not find the board-approved policy document itself. A page
                  is not the same thing as the policy the rule asks for, so the
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
            className="mt-8 text-[0.875rem] text-ink-soft lg:hidden"
          >
            Swipe the table sideways for the rest of the columns. The bank names
            stay put.
          </p>

          {/* Wide content scrolls inside its own box; the page never does. */}
          <div className="mt-2.5 overflow-x-auto rounded-xl border border-rule lg:mt-8">
            <table className="w-full min-w-[820px] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">
                Deceased-claim practice at {BANKS.length} banks
              </caption>
              <thead>
                <tr className="bg-indigo text-white">
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
                  <tr
                    key={bank.id}
                    className={i % 2 ? "bg-mist" : "bg-white"}
                  >
                    <Td stick zebra={i % 2 ? "bg-mist" : "bg-white"}>
                      <span className="font-bold text-indigo-ink">
                        {bank.short}
                      </span>
                      <span className="block text-[0.8125rem] text-ink-faint">
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
                        <span className="font-bold text-maroon">
                          ✗ Nothing found
                        </span>
                      ) : bank.policyUrl ? (
                        <span className="font-semibold text-accent-green">
                          ✓ Policy document
                        </span>
                      ) : (
                        <span className="font-semibold text-ink">
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
                          className="-my-2 inline-block py-2 font-bold text-link underline underline-offset-2"
                        >
                          Its form
                        </a>
                      ) : (
                        <Cell value={null} />
                      )}
                    </Td>
                    <Td>
                      <span className="text-ink-soft">
                        {formatDate(bank.verifiedOn)}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="mt-12">
            <h2 className="display-lg font-serif font-bold text-indigo-ink">
              What each one actually says
            </h2>

            <ul className="mt-6 space-y-6">
              {BANKS.map((bank) => (
                <li
                  key={bank.id}
                  className="rounded-xl border-2 border-rule bg-white p-6"
                >
                  <h3 className="display-md font-serif font-bold text-indigo-ink">
                    {bank.name}
                  </h3>

                  {bank.suretyQuote && (
                    <blockquote className="body-fluid mt-3 border-l-4 border-saffron pl-4 font-serif leading-[1.6] text-ink">
                      &ldquo;{bank.suretyQuote}&rdquo;
                    </blockquote>
                  )}

                  {bank.turnaround && (
                    <blockquote className="body-fluid mt-3 border-l-4 border-saffron pl-4 font-serif leading-[1.6] text-ink">
                      &ldquo;{bank.turnaround}&rdquo;
                    </blockquote>
                  )}

                  <ul className="mt-3 space-y-2">
                    {bank.notes.map((note) => (
                      <li
                        key={note}
                        className="body-fluid leading-relaxed text-ink-soft"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule-faint pt-4 text-[0.9375rem]">
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
                            className="-my-2 inline-block py-2 font-bold text-link underline underline-offset-2"
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

          <div className="mt-10 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-ink-soft">
            <p>
              Read from each bank&apos;s own published pages on the dates shown.
              The rule they are all working from is{" "}
              <a
                href={NOTIFICATION.url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-link underline underline-offset-2"
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
                className="-my-2 inline-block py-2 font-bold text-link underline underline-offset-2"
              >
                Find out what applies to your claim
              </Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

/**
 * `stick` pins the bank-name column while the other five scroll under it.
 *
 * Six columns need 820px and the primary device is a 390px phone, so half the
 * table is always off-screen. That is survivable; losing which bank's row you
 * are reading is not, and this table's whole argument is a comparison between
 * named banks. The shadow on the right edge is what makes the pinned column
 * read as sitting above the scrolling ones rather than as a rendering seam.
 */
function Th({
  children,
  stick,
}: {
  children: React.ReactNode;
  stick?: boolean;
}) {
  return (
    <th
      scope="col"
      className={`border-b border-indigo-deep px-4 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.06em] ${
        stick
          ? "sticky left-0 z-10 bg-indigo shadow-[1px_0_0_var(--color-indigo-deep)]"
          : ""
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
      className={`border-b border-rule-faint px-4 py-3.5 align-top ${
        stick
          ? `sticky left-0 z-10 ${zebra ?? "bg-white"} shadow-[1px_0_0_var(--color-rule)]`
          : ""
      }`}
    >
      {children}
    </td>
  );
}

/** A blank cell reads as a blank cell — never as a plausible figure. */
function Cell({ value }: { value: string | null }) {
  return value ? (
    <span className="text-ink">{value}</span>
  ) : (
    <span className="italic text-maroon">Not published</span>
  );
}
