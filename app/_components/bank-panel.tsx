/**
 * The bank overlay.
 *
 * The RBI clause tells the officer what the regulator requires. This panel
 * tells them what their OWN employer has already published. That second one is
 * harder to argue with across a counter, and it is the reason the bank is asked
 * last rather than first: it changes the evidence, never the verdict.
 *
 * Every field here is either read from that bank's own page or it is null, and
 * a null says so. See lib/banks.ts — the honesty rule lives there and this
 * component is what makes it visible.
 */

import Link from "next/link";
import { BANKS, getBank, isStale, type Bank } from "@/lib/banks";
import type { HomeDict } from "@/lib/i18n-home";

type VerdictText = HomeDict["verdictPage"];

export function BankPanel({
  bankId,
  hrefFor,
  t,
}: {
  bankId?: string;
  /** Builds the URL for this same page with a given bank selected. */
  hrefFor: (id: string) => string;
  t: VerdictText;
}) {
  const bank = bankId ? getBank(bankId) : undefined;

  if (!bank) return <BankPicker hrefFor={hrefFor} t={t} />;

  return (
    <section className="mt-10">
      <h2 className="display-lg font-serif font-bold text-indigo-ink">
        {t.bankPanelHeading(bank.short)}
      </h2>
      <p className="body-fluid mt-2.5 max-w-[68ch] text-ink-soft">
        {t.bankPanelSub(bank.short, formatDate(bank.verifiedOn))}
      </p>

      {isStale(bank.verifiedOn) && (
        <div className="hardbox mt-4">
          <h3 className="display-md font-serif font-bold text-maroon">
            {t.bankPanelStaleHeading}
          </h3>
          <p className="body-fluid mt-2 text-ink">
            {t.bankPanelStaleBody}
          </p>
        </div>
      )}

      {bank.practiceConflict && (
        <div className="hardbox mt-4">
          <h3 className="display-md font-serif font-bold text-maroon">
            {t.bankPanelConflictHeading(bank.short)}
          </h3>
          <p className="body-fluid mt-2 text-ink">{bank.practiceConflict}</p>
        </div>
      )}

      <div className="mt-5 rounded-xl border-2 border-indigo bg-white p-6">
        {bank.suretyQuote && (
          <blockquote className="body-fluid border-l-2 border-rule pl-4 font-serif leading-[1.6] text-ink">
            &ldquo;{bank.suretyQuote}&rdquo;
            <footer className="mt-2 font-sans text-[0.9375rem] not-italic text-ink-soft">
              — {bank.name}
            </footer>
          </blockquote>
        )}

        <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
          <BankField
            label={t.bankPanelThresholdLabel(bank.short)}
            value={bank.thresholdLabel}
            t={t}
          />
          <BankField
            label={t.bankPanelSuretyLabel}
            value={
              bank.noSuretyBelowThreshold === null
                ? null
                : bank.noSuretyBelowThreshold
                  ? t.bankPanelSuretyNotRequired
                  : t.bankPanelSuretyRequired
            }
            t={t}
          />
          <BankField label={t.bankPanelTurnaroundLabel} value={bank.turnaround} t={t} />
          <BankField
            label={t.bankPanelFormsLabel}
            value={bank.claimFormNames?.join(" · ") ?? null}
            t={t}
          />
        </dl>

        {bank.notes.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-rule-faint pt-4">
            {bank.notes.map((note) => (
              <li
                key={note}
                className="body-fluid leading-relaxed text-ink-soft"
              >
                {note}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule-faint pt-4 text-[1rem]">
          <BankLink label={t.bankPanelPageLink} url={bank.pageUrl} />
          <BankLink label={t.bankPanelFormLink} url={bank.claimFormUrl} />
          <BankLink label={t.bankPanelPolicyLink} url={bank.policyUrl} />
          <BankLink label={t.bankPanelOnlineLink} url={bank.onlineClaimUrl} />
        </ul>
      </div>

      {bank.policyPublished === "unverified" && (
        <div className="hardbox mt-4">
          <h3 className="display-md font-serif font-bold text-maroon">
            {t.bankPanelNoPolicyHeading(bank.short)}
          </h3>
          <p className="body-fluid mt-2 text-ink">
            {t.bankPanelNoPolicyBody(bank.short)}
          </p>
        </div>
      )}

      <p data-print="hide" className="mt-4 text-[1rem] text-ink-soft">
        {t.bankPanelDifferentBank}{" "}
        {BANKS.filter((b) => b.id !== bank.id).map((b, i, arr) => (
          <span key={b.id}>
            <Link
              href={hrefFor(b.id)}
              className="font-bold text-link underline underline-offset-2"
            >
              {b.short}
            </Link>
            {i < arr.length - 1 ? " · " : ""}
          </span>
        ))}
        {" · "}
        <Link
          href="/banks"
          className="font-bold text-link underline underline-offset-2"
        >
          {t.bankPanelWholeTable}
        </Link>
      </p>

      <p data-print="hide" className="mt-2 text-[0.9375rem] text-ink-faint">
        {t.bankPanelFoundOutdated}{" "}
        <Link
          href="/contact"
          className="font-bold text-link underline underline-offset-2"
        >
          {t.bankPanelTellUs}
        </Link>
        .
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BankPicker({ hrefFor, t }: { hrefFor: (id: string) => string; t: VerdictText }) {
  return (
    <section
      data-print="hide"
      className="mt-10 rounded-xl border-2 border-indigo bg-mist-deep p-6"
    >
      <h2 className="display-md font-serif font-bold text-indigo-ink">
        {t.bankPickerHeading}
      </h2>
      <p className="body-fluid mt-2 max-w-[68ch] leading-relaxed text-ink-soft">
        {t.bankPickerBody}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2.5">
        {BANKS.map((b) => (
          <li key={b.id}>
            <Link
              href={hrefFor(b.id)}
              className="inline-block rounded-pill border-2 border-indigo bg-white px-5 py-2.5 text-[1rem] font-bold text-indigo transition-colors hover:bg-indigo hover:text-white"
            >
              {b.short}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[1rem] text-ink-soft">
        {t.bankPickerAnotherBank}{" "}
        <Link
          href="/banks"
          className="font-bold text-link underline underline-offset-2"
        >
          {t.bankPickerSeeWhatWeHave}
        </Link>
        .
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** A null renders as an honest gap, never as a plausible-looking figure. */
function BankField({ label, value, t }: { label: string; value: string | null; t: VerdictText }) {
  return (
    <div>
      <dt className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </dt>
      <dd
        className={
          value ? "mt-0.5 text-ink" : "mt-0.5 italic text-maroon"
        }
      >
        {value ?? t.bankPanelNotVerified}
      </dd>
    </div>
  );
}

function BankLink({ label, url }: { label: string; url: string | null }) {
  if (!url) return null;
  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="font-bold text-link underline underline-offset-2"
      >
        {label}
      </a>
    </li>
  );
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

export type { Bank };
