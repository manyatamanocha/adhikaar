"use client";

/**
 * "Export to email" -- the second of the two real acts of intent left on a
 * verdict page (Print is the other). There is deliberately no "proceed with
 * your claim" button: whether someone acts at a bank counter happens outside
 * this app.
 *
 * Sends only the current page's own URL to /api/export-email, which renders
 * it server-side with a real headless Chromium (print-media-emulated) and
 * emails the result as a PDF -- so the emailed copy can never drift from
 * what Print produces. Nothing is stored: the address goes straight to that
 * route for this one send.
 */

import { useState } from "react";
import { track } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ExportEmailButton({
  subject,
  labels,
  inverted = false,
}: {
  subject: string;
  labels: {
    button: string;
    placeholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  /** True on the dark indigo good-news verdict band, where the outline
   * button needs light borders/text instead of the usual indigo ones. */
  inverted?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function send() {
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/export-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, subject, url: window.location.href }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      track("exported_to_email", {});
    } catch {
      setStatus("error");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        data-print="hide"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-pill border-2 px-6 py-3 text-[1.0625rem] font-bold transition-colors ${
          inverted
            ? "border-white/40 text-white hover:bg-white/10"
            : "border-indigo text-indigo-ink hover:bg-indigo/8"
        }`}
      >
        {labels.button}
        <span aria-hidden="true">&rarr;</span>
      </button>
    );
  }

  return (
    <div data-print="hide" className="flex flex-wrap items-center gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder={labels.placeholder}
        className="min-h-11 rounded-pill border-2 border-rule px-4 py-2 text-[0.9375rem]"
      />
      <button
        type="button"
        onClick={send}
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-pill bg-indigo px-5 py-2.5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-indigo-lift disabled:opacity-60"
      >
        {status === "sending" ? labels.sending : labels.send}
      </button>
      {status === "sent" && (
        <p className={`text-[0.9375rem] ${inverted ? "text-white/80" : "text-ink-soft"}`}>{labels.success}</p>
      )}
      {status === "error" && (
        <p className={`text-[0.9375rem] ${inverted ? "text-[#FFD6CC]" : "text-maroon"}`}>{labels.error}</p>
      )}
    </div>
  );
}
