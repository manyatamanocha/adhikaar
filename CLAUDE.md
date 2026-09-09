@AGENTS.md

## Latest project checkpoint

Before continuing Adhikaar, read the Obsidian notes (three separate 9 Sep sessions, ordering between them not established):
`C:/Users/Manyata Manocha/Downloads/Obsidian sync projects/Scribble World/My Scribbles - Adhikaar/session log 2026-09-09 - wizard bail-out, banks copy fixes, translation audit, Brevo email migration.md`
`C:/Users/Manyata Manocha/Downloads/Obsidian sync projects/Scribble World/My Scribbles - Adhikaar/session log 2026-09-09 - front-door simplification, PRD flow audit, court-question copy sync.md`

That second note's own §1 postscript says the front-door shape it describes was already one commit out of date by the time it was written — this project has multiple concurrent sessions most days; `git log --oneline -15` before assuming any session log's described shape is still current. Earlier notes (6–8 Sep) cover translation state and the Mixpanel-to-Supabase migration and are still accurate for those topics.

🔴 Export-to-email runs on Brevo now (`app/api/export-email/route.ts`), not Resend -- Resend's shared address could only deliver to its own account owner. `BREVO_API_KEY`/`BREVO_SENDER_EMAIL` are in `.env.local` and confirmed working locally; Vercel's production env vars still need the same two set, plus a redeploy.

The same vault folder's `HANDOFF.md` preserves earlier research and session history.

Saathi is KEEP, not paused — the note below claiming otherwise was stale/wrong and is corrected here (confirmed directly with the user on 6 Sep). Saathi is fully built and live: Groq-backed (`groq-sdk`, model `openai/gpt-oss-120b`), floating widget on every page except `/admin`, real API key configured in `.env.local` (gitignored). Keep building/improving it; do not remove or re-pause it without asking the user first.
Do not overwrite concurrent uncommitted work or treat proposed AI/privacy controls as completed.
