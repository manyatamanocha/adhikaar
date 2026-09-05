/**
 * Saathi -- Adhikaar's assistant. The product's first backend endpoint and
 * first network dependency beyond the Mixpanel SDK; everything else on this
 * site is server-rendered with no API routes.
 *
 * PROVIDER: Groq, not Anthropic. This is a confirmed, explicit user decision
 * (free-tier for this first MVP) recorded in the vault's "landing cleanup
 * and Saathi Groq checkpoint" note -- Gemini was researched and rejected,
 * Claude/Anthropic was never the choice. Model is `openai/gpt-oss-120b`,
 * one of the models Groq's own docs list as available on the free tier
 * (checked via WebFetch against console.groq.com/docs/rate-limits on
 * 5 Sep 2026 -- re-check before assuming this list is still current).
 *
 * GROUNDING: the system prompt is built from lib/faq.ts's FAQS array --
 * the same reviewed Q&A the /faq page renders -- rather than re-deriving
 * facts independently, per the checkpoint's own architecture note ("use
 * shared FAQs as the initial reviewed knowledge source, with source links
 * controlled by the app rather than model-invented URLs"). Saathi is told
 * to answer only from this list and to cite only the `href` values that
 * appear in it, never a URL it invents itself.
 *
 * SAFETY RULE, same one that governs every verdict page (see lib/rbi.ts):
 * quote and cite, never assert. Saathi is a real LLM call, not a canned
 * script, so the discipline lives in the system prompt -- decline anything
 * outside bank-deposit claims, never claim to search accounts, never
 * resolve a heir dispute, never guarantee an outcome, say plainly when
 * unsure rather than guessing.
 *
 * PRIVACY: no conversation is stored server-side by Adhikaar -- each
 * request carries its own short history from the client. Messages ARE sent
 * to Groq to generate a reply; per Groq's own published data policy this is
 * not retained by default (reliability/abuse exceptions apply, and usage
 * metadata is still collected), which is a real claim, not a guarantee of
 * "nothing stored anywhere" -- the widget says this plainly rather than
 * overstating it.
 */

import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { FAQS } from "@/lib/faq";

export const runtime = "nodejs";

const MODEL = "openai/gpt-oss-120b";
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1200;

const KNOWLEDGE = FAQS.map((f) => {
  const link = f.link ? ` [Link: ${f.link.label} -> ${f.link.href}]` : "";
  return `Q: ${f.q}\nA: ${f.a}${link}`;
}).join("\n\n");

const SYSTEM_PROMPT = `You are Saathi, the assistant built into Adhikaar -- an independent (not government, not RBI, not bank) guidance tool that helps Indian families understand how to claim a deceased person's BANK DEPOSITS ONLY.

You must answer ONLY from the reviewed knowledge below -- it is the same content Adhikaar's own FAQ page shows visitors. Do not add facts, figures, or legal conclusions that are not in it.

--- REVIEWED KNOWLEDGE ---
${KNOWLEDGE}
--- END REVIEWED KNOWLEDGE ---

RULES, non-negotiable:
1. Answer only using the reviewed knowledge above. If a question isn't covered by it, say you're not sure and point to /guide or /start -- never invent an answer.
2. When you reference a page, use ONLY an href that appears in the [Link: ...] tags above, or one of these: /start (the four-question wizard), /faq (the full FAQ page), /banks (what each bank publishes), /other-assets (insurance, PF, shares -- anything that isn't a bank deposit), /bank-refused (escalation route), /dispute (heirs in disagreement). Never invent a URL.
3. You cannot access anyone's bank records, check balances, or discover accounts -- if asked, say so and point to https://udgam.rbi.org.in (the RBI's own UDGAM portal).
4. You are not a lawyer. Never give legal advice, never resolve a dispute among heirs yourself, never guarantee any outcome. For a heir dispute, point to /dispute. For "the bank refused," point to /bank-refused.
5. Insurance, mutual funds, shares/dividends, provident fund, NPS, and post office savings (PPF/SCSS/MSSC/SSA) are OUT OF SCOPE -- point to /other-assets.
6. Never say "you are entitled" as your own assertion -- frame answers the way the reviewed knowledge does.
7. Keep answers short -- a few sentences, plain language, in the register of the FAQ answers above. End with the single most relevant link when one applies.
8. Adhikaar does not process claims, hold money, or store personal documents -- say so if asked.
9. If someone describes a specific personal situation, don't try to resolve it fully yourself -- point them to /start.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Saathi is not configured yet. Set GROQ_API_KEY." },
      { status: 503 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = incoming
    .filter(
      (m): m is ChatMessage =>
        (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "No user message to answer." }, { status: 400 });
  }

  const client = new Groq({ apiKey });

  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    const text = response.choices[0]?.message?.content?.trim();

    if (!text) {
      return NextResponse.json({
        reply:
          "I can't help with that one. Try the four-question wizard at /start, or the full guide at /guide.",
      });
    }

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Saathi error:", err);
    return NextResponse.json(
      { error: "Saathi couldn't answer that just now. Please try again." },
      { status: 502 },
    );
  }
}
