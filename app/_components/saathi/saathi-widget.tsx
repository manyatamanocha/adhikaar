"use client";

import { useEffect, useRef, useState } from "react";
import { SaathiAvatar } from "./avatar";

/**
 * Saathi -- the site's floating assistant. Mounted once in the root layout
 * (see app/layout.tsx), not per-page, so it is the same character with the
 * same conversation on every route -- old-chrome verdict pages and the new
 * homepage/faq/contact alike. `position: fixed` means it stays anchored to
 * the viewport through scrolling by default, and mounting it above every
 * route means client-side navigation between pages never remounts it, so
 * it reads as one companion that follows you around the site rather than a
 * fresh widget appearing per page.
 *
 * `data-print="hide"`: the deliverable on verdict pages is a printed sheet
 * for a bank counter -- Saathi does not belong on it.
 *
 * Chat text is sent to /api/saathi (Groq) to generate a reply -- the one
 * exception to this product's "nothing about your family reaches a server"
 * promise elsewhere, so the panel says so plainly rather than staying
 * silent about it.
 */
type ChatMessage = { role: "user" | "assistant"; content: string };

// Same real contact details as /contact -- not duplicated data, just no
// shared constants file existed yet for two call sites.
const PHONE = "+91 98765 43210";
const EMAIL = "adhikaarapka@gmail.com";

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Namaste, I'm Saathi. Ask me about claiming a deceased family member's bank deposit -- what documents you'll need, whether a succession certificate applies, or where to start.",
};

export function SaathiWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactShown, setContactShown] = useState<"call" | "email" | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click anywhere outside the widget closes it, same as a typical chat
  // widget -- listens only while open, so it never intercepts clicks
  // elsewhere on the site the rest of the time.
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setError(null);
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setSending(true);
    try {
      const res = await fetch("/api/saathi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Couldn't reach Saathi. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      ref={containerRef}
      data-print="hide"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
    >
      {open && (
        <div className="flex h-[42rem] w-[28rem] max-w-[calc(100vw-2.5rem)] max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-[#EFE7D8] bg-white shadow-[0_20px_50px_rgba(22,35,63,0.25)]">
          <div className="flex items-center gap-3 bg-[#16233F] px-4 py-3.5">
            <SaathiAvatar className="h-9 w-9 shrink-0" />
            <div className="min-w-0">
              <p className="text-[1.0625rem] font-bold text-white">Saathi</p>
              <p className="truncate text-[0.75rem] text-white/70">Adhikaar&apos;s assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Saathi"
              className="ml-auto rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="border-b border-[#EFE7D8] px-4 py-2.5">
            <div className="flex gap-2">
              <a
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                onClick={() => setContactShown("call")}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E3D8C4] py-1.5 text-[0.8125rem] font-bold text-[#16233F] transition-colors hover:border-[#E2653B] hover:text-[#E2653B]"
              >
                Call
              </a>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => setContactShown("email")}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E3D8C4] py-1.5 text-[0.8125rem] font-bold text-[#16233F] transition-colors hover:border-[#E2653B] hover:text-[#E2653B]"
              >
                Email
              </a>
            </div>
            {contactShown === "call" && (
              <p className="mt-2 text-center text-[0.875rem] text-[#6B6255]">
                {PHONE}
              </p>
            )}
            {contactShown === "email" && (
              <p className="mt-2 text-center text-[0.875rem] text-[#6B6255]">
                {EMAIL}
              </p>
            )}
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[1.125rem] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-[#E2653B] text-white"
                    : "bg-[#FAF5EC] text-[#16233F]"
                }`}
              >
                {m.content}
              </div>
            ))}
            {sending && (
              <div className="max-w-[85%] rounded-2xl bg-[#FAF5EC] px-3.5 py-2.5 text-[1.125rem] text-[#6B6255]">
                Thinking…
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-[#B84E1E]/30 bg-[#B84E1E]/5 px-3.5 py-2.5 text-[0.875rem] text-[#B84E1E]">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-[#EFE7D8] p-3"
          >
            <p className="mb-2 text-[0.6875rem] leading-snug text-[#6B6255]">
              Not legal advice. Adhikaar does not store this chat, but your messages are sent to
              Groq (the AI service that powers Saathi) to generate a reply.
            </p>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your claim…"
                className="flex-1 rounded-full border border-[#E3D8C4] bg-white px-4 py-2.5 text-[0.9375rem] text-[#16233F] outline-none focus:border-[#E2653B]"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="rounded-full bg-[#E2653B] px-4 py-2.5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#C9532C] disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Saathi" : "Open Saathi, Adhikaar's assistant"}
        className="group flex cursor-pointer items-center gap-4 rounded-full bg-white py-3 pl-3 pr-7 shadow-[0_16px_40px_rgba(22,35,63,0.28)] transition-transform hover:-translate-y-1"
      >
        <span className="relative flex h-[8.25rem] w-[8.25rem] shrink-0 items-center justify-center">
          <SaathiAvatar className="h-[8.25rem] w-[8.25rem] animate-[saathi-bob_3.4s_ease-in-out_infinite]" />
        </span>
        <span className="text-[1.375rem] font-bold text-[#16233F]">
          {open ? "Close" : "Ask Saathi"}
        </span>
      </button>

      <style>{`
        @keyframes saathi-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}
