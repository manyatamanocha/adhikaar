@AGENTS.md

## Latest project checkpoint

Before continuing Adhikaar, read the Obsidian notes (five separate 9 Sep sessions; ordering between the first three not established, the fourth and fifth are later — reconstructed from `git log` after those three, the fifth covering `f0fb97b` through `5d3382e`):
`C:/Users/Manyata Manocha/Downloads/Obsidian sync projects/Scribble World/My Scribbles - Adhikaar/session log 2026-09-09 - wizard bail-out, banks copy fixes, translation audit, Brevo email migration.md`
`C:/Users/Manyata Manocha/Downloads/Obsidian sync projects/Scribble World/My Scribbles - Adhikaar/session log 2026-09-09 - front-door simplification, PRD flow audit, court-question copy sync.md`
`C:/Users/Manyata Manocha/Downloads/Obsidian sync projects/Scribble World/My Scribbles - Adhikaar/session log 2026-09-09 - unique-visitor tracking, exclude-me toggle, shared rate limiter, metrics grilling pass.md`
`C:/Users/Manyata Manocha/Downloads/Obsidian sync projects/Scribble World/My Scribbles - Adhikaar/session log 2026-09-09 - counter-mode removed for PDF export, unique-visitor metrics, funnel chart fixed.md`

That second note's own §1 postscript says the front-door shape it describes was already one commit out of date by the time it was written — this project has multiple concurrent sessions most days; `git log --oneline -15` before assuming any session log's described shape is still current. Earlier notes (6–8 Sep) cover translation state and the Mixpanel-to-Supabase migration and are still accurate for those topics.

🔴 A real, persistent `visitor_id` now exists (`localStorage`, `crypto.randomUUID()`) for unique-visitor counting — never joined against a journey's answers, but `/privacy`'s old "no persistent browser identifier" claim is now false and has been rewritten. `/metrics?exclude-me=1` lets the team exclude their own testing from all public numbers going forward (prospective only). See the third and fifth notes above before touching `/metrics`, `lib/metrics.ts`, or `/privacy`'s analytics section.

🔴 Counter mode and the "I'm ready to proceed with your claim" CTA are gone — removed everywhere (verdict pages and `/needs-review`) as dishonest: this app has no backend claims processing, so a button implying it could advance a claim was misleading. The only next-step actions on a verdict page now are Print and Export to email, both in the top band only (not duplicated further down — `DoneBand` was deleted). Export to email renders a real PDF server-side via headless Chromium, not a text/HTML approximation. See the fifth note above before re-adding any "proceed" style CTA or restoring Counter mode.

🔴 `/metrics` went through a full visual redesign, 9-10 Sep, several sessions in a row -- don't assume its current shape from any single commit or note. Order: single-hue funnel bar chart -> Meter bars under every top-tile rate and guardrail percentage (fill = bold accent, track = a lighter step of the same hue) -> the two plain number lists ("How did people arrive?", "Which questions were answered?") became horizontal bar charts -> icon-in-circle KPI tiles + an ordinal light-to-dark funnel, styled off a rejected ChatGPT mockup (style only -- its login system, geography map, and fabricated testimonial do not apply to this product) -> an outcomes donut was added then removed a commit later for a real interactive `JourneyBarChart` (hoverable, reveals conversion rate) -> the palette was cut to **two** accents total (navy everywhere, terracotta reserved for the North Star only) because green/violet were carrying leftover status/category meaning from elsewhere on the site -> a redundant second caption slot on the KPI cards was dropped. Read the live page, not a description of it, before touching this file again.

🔴 The court question is now asked on every path, no exceptions -- the old "have not been to the bank yet" entry-based skip (`lib/wizard.ts`'s `Entry` type, `outcome.tsx`'s `CourtAssumption` box) is deleted as dead code, not just bypassed. Don't re-add an entry-based skip without asking first.

🔴 `/learn` (index + 5 SEO articles) is fully translated into Hindi and Kannada now (`lib/i18n-learn.ts`) -- was the last 0%-translated surface on the site. RBI clause quotes and the Sarbati Devi citation stay English in every locale, matching the rest of the site.

🔴 Export-to-email runs on Brevo now (`app/api/export-email/route.ts`), not Resend -- Resend's shared address could only deliver to its own account owner. `BREVO_API_KEY`/`BREVO_SENDER_EMAIL` are confirmed set in both `.env.local` and Vercel Production (checked via `vercel env ls` -- the "still needs setting" line that used to sit here is stale).

The same vault folder's `HANDOFF.md` preserves earlier research and session history.

Saathi is KEEP, not paused — the note below claiming otherwise was stale/wrong and is corrected here (confirmed directly with the user on 6 Sep). Saathi is fully built and live: Groq-backed (`groq-sdk`, model `openai/gpt-oss-120b`), floating widget on every page except `/admin`, real API key configured in `.env.local` (gitignored). Keep building/improving it; do not remove or re-pause it without asking the user first.
Do not overwrite concurrent uncommitted work or treat proposed AI/privacy controls as completed.
