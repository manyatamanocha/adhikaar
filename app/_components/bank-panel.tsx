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
import { BANKS, getBank, type Bank } from "@/lib/banks";

export function BankPanel({
  bankId,
  hrefFor,
}: {
  bankId?: string;
  /** Builds the URL for this same page with a given bank selected. */
  hrefFor: (id: string) => string;
}) {
  const bank = bankId ? getBank(bankId) : undefined;

  if (!bank) return <BankPicker hrefFor={hrefFor} />;

  return (
    <section className="mt-10">
      <h2 className="display-lg font-serif font-bold text-indigo-ink">
        What {bank.short} itself publishes
      </h2>
      <p className="body-fluid mt-2.5 max-w-[68ch] text-ink-soft">
        Read from {bank.short}&apos;s own website, not from us. Checked{" "}
        {formatDate(bank.verifiedOn)}.
      </p>

      <div className="mt-5 rounded-xl border-2 border-indigo bg-white p-6">
        {bank.suretyQuote && (
          <blockquote className="body-fluid border-l-4 border-saffron pl-4 font-serif leading-[1.6] text-ink">
            &ldquo;{bank.suretyQuote}&rdquo;
            <footer className="mt-2 font-sans text-[0.875rem] not-italic text-ink-soft">
              — {bank.name}
            </footer>
          </blockquote>
        )}

        <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
          <BankField
            label={`${bank.short}'s own threshold`}
            value={bank.thresholdLabel}
          />
          <BankField
            label="Third-party surety below it"
            value={
              bank.noSuretyBelowThreshold === null
                ? null
                : bank.noSuretyBelowThreshold
                  ? "Says it is not to be insisted on"
                  : "Says one is required"
            }
          />
          <BankField label="Stated turnaround" value={bank.turnaround} />
          <BankField
            label="Claim forms it names"
            value={bank.claimFormNames?.join(" · ") ?? null}
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

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule-faint pt-4 text-[0.9375rem]">
          <BankLink label="Its deceased-claim page" url={bank.pageUrl} />
          <BankLink label="Its claim form" url={bank.claimFormUrl} />
          <BankLink label="Its published policy" url={bank.policyUrl} />
          <BankLink label="Lodge the claim online" url={bank.onlineClaimUrl} />
        </ul>
      </div>

      {bank.policyPublished === "unverified" && (
        <div className="hardbox mt-4">
          <h3 className="display-md font-serif font-bold text-maroon">
            We could not find {bank.short}&apos;s published policy
          </h3>
          <p className="body-fluid mt-2 text-ink">
            From 31 March 2026 a bank is required to publish its deceased-claim
            policy and document checklist. We looked and did not find{" "}
            {bank.short}&apos;s. That absence is itself worth raising — ask the
            branch, in writing, for the board-approved policy and the checklist.
          </p>
        </div>
      )}

      <p data-print="hide" className="mt-4 text-[0.9375rem] text-ink-soft">
        Different bank?{" "}
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
          the whole table
        </Link>
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function BankPicker({ hrefFor }: { hrefFor: (id: string) => string }) {
  return (
    <section
      data-print="hide"
      className="mt-10 rounded-xl border-2 border-indigo bg-mist-deep p-6"
    >
      <h2 className="display-md font-serif font-bold text-indigo-ink">
        Which bank is the account with?
      </h2>
      <p className="body-fluid mt-2 max-w-[68ch] leading-relaxed text-ink-soft">
        The answer above is the same at every commercial bank — that is what the
        RBI&apos;s Directions do. What changes is the evidence: we will add your
        bank&apos;s own published words to this page, so the officer is reading
        their employer, not us.
      </p>

      <ul className="mt-4 flex flex-wrap gap-2.5">
        {BANKS.map((b) => (
          <li key={b.id}>
            <Link
              href={hrefFor(b.id)}
              className="inline-block rounded-pill border-2 border-indigo bg-white px-5 py-2.5 text-[0.9375rem] font-bold text-indigo transition-colors hover:bg-indigo hover:text-white"
            >
              {b.short}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[0.9375rem] text-ink-soft">
        Another bank? The RBI&apos;s rule above applies to it just the same. We
        have only compiled four so far —{" "}
        <Link
          href="/banks"
          className="font-bold text-link underline underline-offset-2"
        >
          see what we have and how it was checked
        </Link>
        .
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** A null renders as an honest gap, never as a plausible-looking figure. */
function BankField({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </dt>
      <dd
        className={
          value ? "mt-0.5 text-ink" : "mt-0.5 italic text-maroon"
        }
      >
        {value ?? "Not verified — ask your bank"}
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
