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

🔴 The `/metrics` funnel chart ("Visited the website" → ... → "Chose a next step") is a single-hue bar chart now, not four unrelated colors — that was a real anti-pattern (one ordered series getting a rainbow), not just a style complaint. Don't reintroduce per-stage colors there.

🔴 Export-to-email runs on Brevo now (`app/api/export-email/route.ts`), not Resend -- Resend's shared address could only deliver to its own account owner. `BREVO_API_KEY`/`BREVO_SENDER_EMAIL` are in `.env.local` and confirmed working locally; Vercel's production env vars still need the same two set, plus a redeploy.

The same vault folder's `HANDOFF.md` preserves earlier research and session history.

Saathi is KEEP, not paused — the note below claiming otherwise was stale/wrong and is corrected here (confirmed directly with the user on 6 Sep). Saathi is fully built and live: Groq-backed (`groq-sdk`, model `openai/gpt-oss-120b`), floating widget on every page except `/admin`, real API key configured in `.env.local` (gitignored). Keep building/improving it; do not remove or re-pause it without asking the user first.
Do not overwrite concurrent uncommitted work or treat proposed AI/privacy controls as completed.
