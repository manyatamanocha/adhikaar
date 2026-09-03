"use client";

import { useSyncExternalStore } from "react";
import { CLAUSES, ESCALATION } from "@/lib/rbi";

/**
 * The 15-day clock.
 *
 * Para 31 gives the bank 15 calendar days from receipt of a COMPLETE set of
 * documents. Para 33 makes a delay attributable to the bank compensable at
 * Bank Rate + 4%.
 *
 * Two design decisions matter here.
 *
 * 1. The date is the date of a dated acknowledgement, not the date you handed
 *    papers over. The commonest way a bank avoids this deadline is to raise a
 *    fresh document objection so the file is never "complete" — so the field
 *    asks for the acknowledgement specifically, and says why.
 *
 * 2. It is localStorage and nothing else. No account, no server, no sync. That
 *    means it is lost if the browser is cleared, and the component says so
 *    rather than pretending to be a reliable record. Every read and write is
 *    wrapped, because a private window or blocked site data makes the accessor
 *    itself throw.
 */

const KEY = "adhikaar.acknowledged";
const WINDOW_DAYS = 15;

/* The stored date, as an external store.
   `getServerSnapshot` returns "" so the server and the first client paint
   agree, and the stored value arrives without a hydration mismatch. */

let memory = "";
const listeners = new Set<() => void>();

function read() {
  try {
    return localStorage.getItem(KEY) ?? memory;
  } catch {
    // Private window, or site data blocked. `memory` keeps the tracker usable
    // for this visit; it just will not be there tomorrow.
    return memory;
  }
}

function write(value: string) {
  memory = value;
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    /* nothing to do — `memory` already holds it for this visit */
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

export function DeadlineTracker() {
  const date = useSyncExternalStore(subscribe, read, () => "");
  const save = write;

  const progress = date ? elapsed(date) : null;

  return (
    <section className="mt-10 rounded-xl border-2 border-indigo bg-mist-deep p-6">
      <h2 className="display-lg font-serif font-bold text-indigo-ink">
        The bank has {WINDOW_DAYS} days
      </h2>
      <p className="body-fluid mt-2.5 max-w-[68ch] leading-relaxed text-ink-soft">
        Para {CLAUSES.fifteenDays.para} gives the bank{" "}
        <q className="font-serif">{CLAUSES.fifteenDays.text}</q>. The clock
        starts when the bank holds a <strong>complete</strong> set — which is
        why the date that matters is the date on your acknowledgement, not the
        day you first walked in.
      </p>

      <div className="mt-5">
        <label
          htmlFor="ack-date"
          className="block text-[0.9375rem] font-bold text-indigo-ink"
        >
          Date on your acknowledgement
        </label>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <input
            id="ack-date"
            type="date"
            value={date}
            onChange={(e) => save(e.target.value)}
            className="rounded-lg border-2 border-rule bg-white px-4 py-2.5 text-[1rem] text-ink"
          />
          {date && (
            <button
              type="button"
              onClick={() => save("")}
              className="text-[0.9375rem] font-bold text-link underline underline-offset-2"
            >
              Clear
            </button>
          )}
        </div>
        <p className="mt-2 text-[0.875rem] text-ink-faint">
          Kept in this browser only. It is never sent anywhere, it is not
          visible to us, and it will be gone if you clear your browsing data.
        </p>
      </div>

      {progress && (
        <div className="mt-6 border-t border-rule pt-5">
          <p className="display-md font-serif font-bold text-indigo-ink">
            {progress.days > WINDOW_DAYS
              ? `Day ${progress.days} — the ${WINDOW_DAYS} days are up`
              : `Day ${progress.days} of ${WINDOW_DAYS}`}
          </p>
          <p className="body-fluid mt-1 text-ink-soft">
            {progress.days > WINDOW_DAYS
              ? `The window closed on ${progress.dueLabel}.`
              : `The ${WINDOW_DAYS} days end on ${progress.dueLabel}.`}
          </p>

          <div
            className="mt-3 h-2.5 w-full overflow-hidden rounded-pill bg-rule"
            role="img"
            aria-label={`Day ${progress.days} of ${WINDOW_DAYS}`}
          >
            <div
              className={`h-full rounded-pill ${
                progress.days > WINDOW_DAYS ? "bg-maroon" : "bg-indigo"
              }`}
              style={{
                width: `${Math.min(100, (progress.days / WINDOW_DAYS) * 100)}%`,
              }}
            />
          </div>

          {progress.days > WINDOW_DAYS && (
            <div className="hardbox mt-5">
              <h3 className="display-md font-serif font-bold text-maroon">
                What you can do now
              </h3>
              <p className="body-fluid mt-2 text-ink">
                Put the complaint to the branch&apos;s Grievance Redressal
                Officer in writing. Quote para {CLAUSES.fifteenDays.para}, give
                the date of your acknowledgement, and ask for the settlement and
                for compensation under para {CLAUSES.delayCompensation.para} —
                interest at Bank Rate plus 4% per annum where the delay is
                attributable to the bank, and ₹5,000 for each day of delay on a
                locker or articles in safe custody.
              </p>
              <p className="body-fluid mt-2 text-ink">
                If {ESCALATION.waitDays} days pass after that without a
                resolution, {ESCALATION.scheme} is free to use at{" "}
                <a
                  href={ESCALATION.portal}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-link underline underline-offset-2"
                >
                  {ESCALATION.portal}
                </a>
                . It is free and it is real, and it is not a guarantee.
              </p>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">
                Expect the bank to argue about when the clock started. Your
                dated acknowledgement is the answer to that.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Calendar days, counting the acknowledgement day as day 1. */
function elapsed(iso: string) {
  const start = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days =
    Math.floor((today.getTime() - start.getTime()) / 86_400_000) + 1;

  const due = new Date(start);
  due.setDate(due.getDate() + WINDOW_DAYS - 1);

  return { days, dueLabel: due.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }) };
}
