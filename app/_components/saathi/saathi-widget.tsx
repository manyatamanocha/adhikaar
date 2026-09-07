"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
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

/**
 * Saathi answers with plain text, but the model reliably drops in either
 * markdown links (`[label](/start)`) or a bare internal path (`/start`) --
 * it was told to end answers with the most relevant page. Rendered as
 * `{content}` alone those are just inert text, which is exactly what a
 * tester ran into: told to "click /start" with nothing clickable. This
 * turns both forms into real links -- internal paths use next/link so
 * navigation stays client-side, anything else (mailto:, tel:, external
 * https://) falls back to a plain anchor.
 */
function renderMessage(rawContent: string): ReactNode[] {
  // Groq occasionally slips in zero-width characters right next to a link
  // (seen right before "/guide") -- invisible in the rendered text but
  // enough to break every pattern below, since none of them expect a
  // stray character between `[` and `/`. Strip them before matching.
  const content = rawContent.replace(/[​-‍﻿]/g, "");

  // Four shapes the model actually produces, most-specific first so the
  // right one wins when more than one could match the same position:
  // 1. `[label](/path)` -- normal markdown link.
  // 2. `[/path]()` -- the path as visible text, parens left empty instead
  //    of a proper markdown link ("[/dispute]()" printed literally).
  // 3. `[/path]` -- same idea, no parens at all ("[/guide]" printed literally).
  // 4. A bare `/path` with no markdown at all.
  const pattern =
    /\[([^\]]+)\]\((\/[^\s)]+)\)|\[(\/[a-z][a-z0-9-/]*)\]\(\)|\[(\/[a-z][a-z0-9-/]*)\]|(?<![\w/])(\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]*)*)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(content))) {
    if (match.index > last) nodes.push(content.slice(last, match.index));
    const [, label, mdHref, emptyParensPath, noParensPath, barePath] = match;
    const href = mdHref ?? emptyParensPath ?? noParensPath ?? barePath;
    nodes.push(
      <Link key={key++} href={href} className="font-bold underline underline-offset-2">
        {label ?? href}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < content.length) nodes.push(content.slice(last));
  return nodes;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Namaste, I'm Saathi. Ask me about claiming a deceased family member's bank deposit -- what documents you'll need, whether a succession certificate applies, or where to start.",
};

// A grieving reader is not scanning the page for a chat button. This is the
// one-time nudge that says so, not a permanent one: shown once, a few seconds
// after landing, then never again on this browser -- opening Saathi or
// dismissing the bubble both count as "seen".
//
// Read as an external store, same pattern as deadline-tracker.tsx's
// acknowledgement date, and for the same reason: localStorage doesn't exist
// during the server render, so reading it directly in the component body (or
// in a plain useState initializer, which runs again on the client's first
// render too) would compute a different answer server-side vs. client-side --
// a hydration mismatch. `useSyncExternalStore`'s `getServerSnapshot` gives
// both the server and the very first client paint the same safe answer
// (already seen, so nothing extra renders); React then re-reads real
// localStorage once mounted and re-renders only if that answer was wrong,
// without a mismatch warning. It also means the bubble timer's own effect
// schedules `setIntroOpen` from inside a callback rather than calling it
// synchronously in the effect body, which is what a plain
// `useEffect(() => setState(...), [])` would have done here.
const INTRO_KEY = "adhikaar.saathiIntroSeen";
let introMemory = false;
const introListeners = new Set<() => void>();

function readIntroSeen(): boolean {
  try {
    return introMemory || localStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return true; // fail closed -- never nag if storage is unreadable
  }
}
function markIntroSeen(): void {
  introMemory = true;
  try {
    localStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* storage blocked; introMemory still marks it seen for this visit */
  }
  introListeners.forEach((notify) => notify());
}
function subscribeIntroSeen(notify: () => void) {
  introListeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    introListeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

export function SaathiWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactShown, setContactShown] = useState<"call" | "email" | null>(null);
  const introSeenNow = useSyncExternalStore(subscribeIntroSeen, readIntroSeen, () => true);
  const [introOpen, setIntroOpen] = useState(false);
  // The attention ring: on for as long as this browser hasn't seen the nudge
  // AND the panel is closed. Once the reader has opened Saathi once, the
  // button has done its job -- a permanently pulsing widget on every other
  // page they visit afterward would just be noise.
  const showPulse = !introSeenNow && !open;
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // The speech bubble follows the ring a few seconds in -- not on first
  // paint, so it never fights the page's own content for the reader's first
  // look -- and only for as long as this browser hasn't seen it yet.
  useEffect(() => {
    if (introSeenNow) return;
    const timer = setTimeout(() => setIntroOpen(true), 3500);
    return () => clearTimeout(timer);
  }, [introSeenNow]);
  // Opening Saathi at all -- whether the reader noticed the ring, the bubble,
  // or found the button on their own -- means the nudge has done its job.
  // Dismissing the bubble by its own close button does the same without
  // opening the chat. Either way it is marked seen so it never returns on
  // this browser, on any page.
  function dismissIntro() {
    setIntroOpen(false);
    if (!introSeenNow) markIntroSeen();
  }

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

  function toggleOpen() {
    if (!open && (introOpen || showPulse)) dismissIntro();
    setOpen((v) => !v);
  }

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
      className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-3 sm:bottom-5 sm:right-5"
    >
      {open && (
        <div className="flex h-[28.5rem] w-[19rem] max-w-[calc(100vw-2.5rem)] max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-[#EFE7D8] bg-white shadow-[0_20px_50px_rgba(22,35,63,0.25)]">
          <div className="flex items-center gap-2.5 bg-[#16233F] px-3.5 py-2.5">
            <SaathiAvatar className="h-6 w-6 shrink-0" />
            <div className="min-w-0">
              <p className="text-[1rem] font-bold text-white">Saathi</p>
              <p className="truncate text-[0.6875rem] text-white/70">Adhikaar&apos;s assistant</p>
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
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E3D8C4] py-1.5 text-[0.6875rem] font-bold text-[#16233F] transition-colors hover:border-[#E2653B] hover:text-[#E2653B]"
              >
                Call
              </a>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => setContactShown("email")}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E3D8C4] py-1.5 text-[0.6875rem] font-bold text-[#16233F] transition-colors hover:border-[#E2653B] hover:text-[#E2653B]"
              >
                Email
              </a>
            </div>
            {contactShown === "call" && (
              <p className="mt-2 text-center text-[0.6875rem] text-[#6B6255]">
                {PHONE}
              </p>
            )}
            {contactShown === "email" && (
              <p className="mt-2 text-center text-[0.6875rem] text-[#6B6255]">
                {EMAIL}
              </p>
            )}
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.75rem] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-[#E2653B] text-white"
                    : "bg-[#FAF5EC] text-[#16233F]"
                }`}
              >
                {m.role === "assistant" ? (
                  <span
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("a")) setOpen(false);
                    }}
                  >
                    {renderMessage(m.content)}
                  </span>
                ) : (
                  m.content
                )}
              </div>
            ))}
            {sending && (
              <div className="max-w-[85%] rounded-2xl bg-[#FAF5EC] px-3.5 py-2.5 text-[0.75rem] text-[#6B6255]">
                Thinking…
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-[#B84E1E]/30 bg-[#B84E1E]/5 px-3.5 py-2.5 text-[0.6875rem] text-[#B84E1E]">
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
            <p className="mb-2 text-[0.75rem] leading-snug text-[#6B6255]">
              Not legal advice. Adhikaar does not store this chat, but your messages are sent to
              Groq (the AI service that powers Saathi) to generate a reply.
            </p>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your claim…"
                className="flex-1 rounded-full border border-[#E3D8C4] bg-white px-4 py-2.5 text-[0.75rem] text-[#16233F] outline-none focus:border-[#E2653B]"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="rounded-full bg-[#E2653B] px-4 py-2.5 text-[0.75rem] font-bold text-white transition-colors hover:bg-[#C9532C] disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* The one-time nudge. A speech-bubble shape (the tail points at the
          launcher below it) rather than a generic toast, so it reads as
          Saathi speaking up rather than a site notification. Its own close
          button is separate from tapping the launcher, since dismissing the
          suggestion and opening the chat are different actions and the
          bubble shouldn't swallow a click meant for the button beneath it. */}
      {introOpen && !open && (
        <div className="saathi-anim-intro relative max-w-[15rem] animate-[saathi-intro-in_0.35s_ease-out]">
          <div className="rounded-2xl border border-[#E3D8C4] bg-white px-4 py-3 pr-8 shadow-[0_14px_34px_rgba(22,35,63,0.22)]">
            <p className="text-[0.8125rem] font-semibold leading-snug text-[#16233F]">
              Have a question about your claim? Ask Saathi — it&apos;s free.
            </p>
            <button
              type="button"
              onClick={dismissIntro}
              aria-label="Dismiss"
              className="absolute right-2 top-2 rounded-full p-1 text-[#6B6255] transition-colors hover:bg-[#FAF5EC] hover:text-[#16233F]"
            >
              ✕
            </button>
          </div>
          {/* The tail, pointing down at the launcher */}
          <div
            aria-hidden="true"
            className="absolute -bottom-[0.4rem] right-6 h-3 w-3 rotate-45 border-b border-r border-[#E3D8C4] bg-white"
          />
        </div>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Close Saathi" : "Open Saathi, Adhikaar's assistant"}
        className="group relative flex cursor-pointer items-center gap-[0.6rem] rounded-full bg-gradient-to-b from-[#F5DFAE] to-[#E4BC72] py-[0.45rem] pl-[0.45rem] pr-[1.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_29px_rgba(22,35,63,0.28)] transition-transform hover:-translate-y-1 sm:gap-[0.9rem] sm:py-[0.6rem] sm:pl-[0.6rem] sm:pr-[1.5rem] sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_19px_48px_rgba(22,35,63,0.28)]"
      >
        {/* The attention ring -- a soft terracotta pulse behind the avatar,
            expanding and fading on a slow loop. Only while the panel is
            closed and the reader hasn't opened Saathi yet: once they've used
            it, the button has done its job and a permanently pulsing widget
            would just be visual noise on every other page they visit. */}
        {!open && showPulse && (
          <span
            aria-hidden="true"
            className="saathi-anim-pulse absolute left-[0.45rem] top-[0.45rem] h-[2.4rem] w-[2.4rem] animate-[saathi-pulse_2.4s_ease-out_infinite] rounded-full bg-[#E2653B] sm:left-[0.6rem] sm:top-[0.6rem] sm:h-[3.3rem] sm:w-[3.3rem]"
          />
        )}
        <span className="relative flex h-[2.4rem] w-[2.4rem] shrink-0 items-center justify-center sm:h-[3.3rem] sm:w-[3.3rem]">
          <SaathiAvatar className="saathi-anim-bob h-[2.4rem] w-[2.4rem] animate-[saathi-bob_3.4s_ease-in-out_infinite] sm:h-[3.3rem] sm:w-[3.3rem]" />
        </span>
        <span className="relative text-[0.75rem] font-bold text-[#16233F] sm:text-[0.975rem]">
          {open ? "Close" : "Ask Saathi"}
        </span>
      </button>

      <style>{`
        @keyframes saathi-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes saathi-pulse {
          0% { transform: scale(0.85); opacity: 0.55; }
          70%, 100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes saathi-intro-in {
          from { opacity: 0; transform: translateY(0.5rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Bobbing, pulsing and the bubble sliding in are all decorative --
           useful when they help a reader notice the button, actively unwanted
           motion for anyone who has asked the OS to reduce it. */
        @media (prefers-reduced-motion: reduce) {
          .saathi-anim-bob, .saathi-anim-pulse, .saathi-anim-intro {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
