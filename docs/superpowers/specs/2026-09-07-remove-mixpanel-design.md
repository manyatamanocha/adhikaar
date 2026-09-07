# Adhikaar — Remove Mixpanel, Own the Analytics Pipeline

**Date:** 7 September 2026
**Status:** Design agreed in chat, pending written review.
**Replaces:** Mixpanel (client SDK + Export API) as the analytics backend.

---

## 1. The change in one line

Analytics events stop leaving Adhikaar's own infrastructure. `lib/metrics.ts` — the pure aggregation module built and tested earlier today — is untouched; only where its input events come from changes.

> **Today:** browser → Mixpanel SDK → Mixpanel's cloud → Export API → `/api/metrics` → `lib/metrics.ts`
> **After:** browser → `/api/events` → Supabase → `/api/metrics` → `lib/metrics.ts` (same function, same tests)

## 2. Why

Three reasons, all given directly and none in conflict:

1. **Own the whole pipeline.** No third-party analytics dependency at all — not even a read-only export.
2. **Faster feedback.** Mixpanel's Export API carries its own ingestion lag on top of the route's 5-minute cache. A direct Supabase read has neither.
3. **A richer private view becomes possible.** The public `/metrics` page is deliberately coarse — aggregates only, no login (`app/api/metrics/route.ts`'s header: *"the constraint is not analysis, it is access"*). Owning the data makes a private, more detailed `/admin` view a natural addition rather than a second vendor integration.

**Net effect on the product's own privacy claims: stronger, not weaker.** `lib/privacy.ts`'s `PRIVACY_SUMMARY` currently says *"basic usage analytics may be sent to Mixpanel."* After this, no analytics data leaves Adhikaar's own Supabase project — not to a vendor, not anywhere. The write credentials stay server-side, which is tighter than today, where the Mixpanel token (write-only, but still) ships in the client bundle.

**No migration risk exists.** Confirmed live today: `eventsConsidered: 0` in production. There is nothing to keep parity with — this is a clean cutover, not a careful dual-write transition.

---

## 3. Architecture

### 3.1 Write path

```
Browser                    /api/events              Supabase
   │  fetch (fire-and-forget)  │                        │
   │ ─────────────────────────>│  validate event name   │
   │                            │  against EventName     │
   │                            │  union (lib/analytics) │
   │                            │ ──────────────────────>│  insert 1 row
   │                            │                        │
```

- `lib/analytics.ts`'s `track()` keeps its exact signature (`event: EventName, props: Record<...>`). Internally it changes from `mixpanel.track(...)` to a non-blocking `fetch("/api/events", { method: "POST", body: JSON.stringify({ event, properties: props, session_id }) })`, wrapped in the same try/catch that already exists — *"Analytics must never be able to break a page someone is reading at a bank counter"* carries over unchanged.
- `initAnalytics()` **goes away entirely**, not just internally. There is no SDK instance to initialize — a `fetch()` needs no setup step. `app/_components/analytics.tsx`'s `useEffect(() => { initAnalytics(); }, [])` is deleted along with it, not repointed at a no-op.
- `session_id`: a `crypto.randomUUID()` generated once per page load, held in a module-level variable in the client bundle — never in `localStorage`, never in a cookie. This is the direct analog of Mixpanel's own in-memory anonymous ID under `disable_persistence`/`disable_cookie`: a fresh identity every page load, nothing survives a reload. Reused as `properties.distinct_id` when mapped back for `lib/metrics.ts` (§3.3), so every cohort/journey calculation in that module needs no change.
- `isLocalDev()` in `lib/analytics.ts` is unchanged — `track()` stays a no-op on `localhost`/`127.0.0.1`, so dev traffic never reaches the table in the first place. This *removes* the need for `/api/metrics`'s current `$current_url`-based dev-event filter (§3.3) — dev traffic is excluded at the write, not the read.
- `/api/events` validates `event` against the existing `EventName` union server-side (reject anything else, `400`) — the same defensive posture Saathi's route already takes with its own rate limiter. `properties` is stored as-is in a `jsonb` column; no server-side allowlist beyond the event-name check, matching today's trust boundary (the client already only ever sends the fixed enum properties documented in `lib/analytics.ts`).

### 3.2 Schema

```sql
create table events (
  id          bigint generated always as identity primary key,
  event       text not null,
  session_id  text not null,
  properties  jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);
create index events_event_idx on events (event);
create index events_created_at_idx on events (created_at);
```

One table. No user table, no foreign keys — matches the site's existing "no accounts" posture exactly.

### 3.3 Read path — `/api/metrics`

`lib/metrics.ts`'s `aggregate(events: MixpanelEvent[], now)` is **not touched**. The route's job shrinks to: query Supabase for the window, map each row to the shape `aggregate()` already expects:

```ts
{ event: row.event, properties: { ...row.properties, distinct_id: row.session_id, time: Math.floor(new Date(row.created_at).getTime() / 1000) } }
```

The dev-traffic exclusion logic (currently filtering on `$current_url` containing `localhost`) is deleted — dev events never reach the table (§3.1), so `developmentEventsExcluded` in the response becomes permanently `0` going forward and the field can be dropped or left at 0 with a comment explaining why.

All 14 existing tests in `tests/metrics.test.cjs` continue to pass unmodified, because they test `aggregate()` directly against hand-built `{event, properties}` objects — they never touch the fetch layer.

`export const revalidate = 300` stays on `/api/metrics` — the public page keeps its 5-minute cache exactly as today, so it doesn't hammer Supabase on every view. That cache is what `/admin` deliberately forgoes (§3.4): the private view trades cache freshness for immediacy, the public one doesn't need to.

### 3.4 `/admin` — the new private view

Not a rebuild of `/metrics`. Its reason to exist is the drill-down the public page deliberately withholds:

- A recent-events table: event name, key properties (`branch`, `outcome`, `resolution_source`), relative timestamp — filterable by event type.
- The same aggregate cards `/metrics` shows, without the 5-minute cache (query Supabase directly on each load).

Scoped deliberately small for a first cut — a filterable raw table plus the existing aggregates, not a general BI tool. Expand later if it turns out to be needed.

**Auth.** This repo has zero auth infrastructure today. Building a full account system for one operator would be over-engineering. Instead:
- A login form at `/admin/login` posts a password to `/api/admin/login`, checked against a single `ADMIN_PASSWORD` env var (server-side only).
- On match, sets an `HttpOnly`, `Secure`, `SameSite=Strict` cookie containing a signed token (HMAC-SHA256 over an expiry timestamp, keyed by a server-only `ADMIN_SESSION_SECRET`) — no session table, no external auth library.
- `/admin/*` routes verify that cookie server-side (a small helper, not middleware — this app has no `middleware.ts` today and one route family doesn't need one).
- No "forgot password," no multi-user — one shared secret, rotated by changing the env var. This matches the project's scale exactly: one operator, one product.

---

## 4. Cutover plan

Because there is no real data to preserve, this ships as one clean pass rather than a phased migration:

| Step | What |
|---|---|
| 1 | Provision a **new, separate** Supabase project for Adhikaar (not shared with any other project — different product, no reason to couple data). Get the project URL + service-role key. |
| 2 | Create the `events` table (§3.2). |
| 3 | Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and Vercel (server-only, no `NEXT_PUBLIC_` prefix). Add `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`. |
| 4 | Build `/api/events` (write) and the Supabase read mapping in `/api/metrics` (§3.1, §3.3). |
| 5 | Rework `lib/analytics.ts`'s `track()`/`initAnalytics()` internals (§3.1) — public API unchanged, so `analytics.tsx`'s call sites need no edits. |
| 6 | Build `/admin` (§3.4). |
| 7 | Remove `mixpanel-browser` from `package.json`, delete `NEXT_PUBLIC_MIXPANEL_TOKEN`/`NEXT_PUBLIC_MIXPANEL_REGION`/`MIXPANEL_SERVICE_USER`/`MIXPANEL_SERVICE_SECRET`/`MIXPANEL_PROJECT_ID` from Vercel and `.env.local`. |
| 8 | Update every user-facing string naming Mixpanel (§5) and the two code comments (§5). |
| 9 | Deploy, then run the same headless-Chrome network check used earlier today — confirm zero requests to any `mixpanel.com` host and a real request to `/api/events` on a real journey. |

## 5. Copy and comments that name Mixpanel — all found by grep, all must change

| File | What | Locales |
|---|---|---|
| `lib/privacy.ts` | `PRIVACY_SUMMARY` — *"Basic usage analytics may be sent to Mixpanel when configured."* | en, hi, kn |
| `lib/i18n-home.ts` | `analyticsSectionBody` (rendered on `/privacy`) — *"When configured, Mixpanel receives basic events such as…"* | en, hi, kn |
| `app/layout.tsx:106` | Comment: *"a no-op entirely when no Mixpanel token is configured"* | — |
| `app/api/saathi/route.ts:3` | Comment: *"the first network dependency beyond the Mixpanel SDK"* | — |

New wording should say plainly that events go to Adhikaar's own database, not a third party — this is a straightforwardly *better* privacy sentence than the one it replaces, not a harder one to write.

`app/api/metrics/route.ts`'s header comment (§3.3's WHY THE RAW EXPORT API section) also needs rewriting — that reasoning no longer applies once there's no Export API.

---

## 6. Testing

- `lib/metrics.ts` / `tests/metrics.test.cjs`: unchanged, still the proof for every metric definition.
- New: a small test for the Supabase-row → event-shape mapping function (§3.3) — same style as `tests/metrics.test.cjs`, hand-built rows in, `aggregate()`-shaped objects out.
- New: a test for `/api/events`'s event-name validation (reject an unknown name).
- New: a test for the admin cookie's sign/verify round-trip (valid token accepted, tampered or expired token rejected).
- Manual, post-deploy: the same headless-Chrome CDP network check used to diagnose the original Mixpanel bug today — confirm the new pipeline actually fires over the wire, not just that it compiles.

## 7. Risks

| Risk | Mitigation |
|---|---|
| `/api/events` becomes a public write endpoint anyone can spam | Event-name allowlist (§3.1) rejects anything outside the fixed enum; a coarse per-IP rate limit can be added the same way Saathi's already is, if it proves necessary |
| Supabase credentials leak client-side by mistake | Same discipline as Saathi/Mixpanel service creds today: no `NEXT_PUBLIC_` prefix, verified by grepping the deployed bundle before calling this done — the same check that caught the original Mixpanel bug |
| `/admin` password compromised | Single secret, no stored session table to leak — rotating `ADMIN_PASSWORD` invalidates all future logins immediately; existing signed cookies still work until their expiry, so `ADMIN_SESSION_SECRET` should also rotate for a hard cutoff |
| Copy update misses a locale | §5's table is exhaustive per a full-repo grep, not a partial pass |

## 8. Out of scope

- Migrating historical Mixpanel data — there is none real to migrate.
- Multi-user admin accounts, roles, or an audit log of who viewed what.
- Rate limiting `/api/events` beyond the event-name allowlist, unless abuse is actually observed.
- Any change to what is tracked (event names, properties) — this is a transport change, not an instrumentation change.
