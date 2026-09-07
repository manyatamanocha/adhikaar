# Remove Mixpanel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Mixpanel (client SDK + Export API) with a first-party Supabase-backed analytics pipeline, and add a private `/admin` dashboard.

**Architecture:** Browser → `/api/events` (validates, inserts a row) → Supabase. `/api/metrics` reads that same table and feeds it through `lib/metrics.ts`'s `aggregate()` — untouched, already tested — via a pure mapping function. `/admin` reuses the same read path without the public page's 5-minute cache, gated by a signed cookie checked against a single shared password.

**Tech Stack:** Next.js 16 (App Router, route handlers), `@supabase/supabase-js`, Node's built-in `crypto` for the admin cookie (no auth library), the existing `node:test`/`ts.transpileModule` VM-harness pattern already used by `tests/metrics.test.cjs` and `tests/claim-flow.test.cjs`.

**Spec:** `docs/superpowers/specs/2026-09-07-remove-mixpanel-design.md`

## Global Constraints

- No `NEXT_PUBLIC_` prefix on any Supabase or admin credential — server-only, exactly as `MIXPANEL_SERVICE_*` are today.
- `lib/metrics.ts`'s `aggregate()` function signature and behaviour do not change. `tests/metrics.test.cjs`'s 14 tests must still pass unmodified at the end of this plan.
- `track(event: EventName, props?: Record<string, string | number | boolean>): void` in `lib/analytics.ts` keeps this exact signature — every call site in `app/_components/analytics.tsx` must need zero edits beyond the `initAnalytics` removal.
- `isLocalDev()` stays the single gate that keeps dev traffic out of real data — dev events must never reach Supabase, matching today's guarantee that they never reached Mixpanel.
- New DB writes go through the service-role key server-side only. The client never talks to Supabase directly.
- Every code comment or user-facing string naming "Mixpanel" gets updated (see spec §5) — not deleted silently, replaced with an accurate description of the new pipeline.

---

## Task 1: Pure event validation and row-mapping (`lib/events.ts`)

**Files:**
- Modify: `lib/analytics.ts` (extract `EventName` from a const array so it can be imported for runtime validation — see Step 1)
- Create: `lib/events.ts`
- Test: `tests/events.test.cjs`

**Interfaces:**
- Consumes: nothing new (reads `lib/analytics.ts`'s exported `EVENT_NAMES`/`EventName`; reads `lib/metrics.ts`'s exported `MixpanelEvent` type)
- Produces:
  - `isValidEventName(name: string): name is EventName`
  - `type EventRow = { event: string; session_id: string; properties: Record<string, unknown>; created_at: string }`
  - `mapRowsToEvents(rows: EventRow[]): MixpanelEvent[]`

- [ ] **Step 1: Make `EventName` derivable at runtime, not just at the type level**

In `lib/analytics.ts`, replace the `EventName` union type with a const array the type is derived from — this is what lets `isValidEventName` exist at all, and single-sources the list so `lib/events.ts` can never drift from it the way the metric definitions drifted from the code earlier today.

Find:
```ts
/** Event names are fixed here so a typo cannot silently create a new funnel. */
export type EventName =
  | "flow_started"
  | "question_answered"
  | "outcome_reached"
  | "demand_checked"
  | "readiness_checked"
  | "bank_selected"
  | "sheet_printed"
  | "survey_answered"
  /**
   * The North Star: a terminal page rendered with a concrete "what to do
   * today" card, in either of the product's two valid actionable states.
   * `outcome_type` is "claim_route" (a resolved route with concrete next
   * steps) or "information_required" (the product resolved WHAT to find
   * out next, even though it could not resolve the claim route itself).
   * This is the numerator of Actionable Next-Step Rate; the denominator is
   * `question_answered` step 1 (answering the first decision question).
   */
  /**
   * Fired once per browsing session, on the first page seen. This is the
   * DENOMINATOR of Journey Start Rate -- without it that metric cannot be
   * computed at all, since `track_pageview` is deliberately off (the URL
   * carries the family's answers, so automatic URL capture would ship the
   * whole case by the back door).
   *
   * Carries two coarse enums and nothing else: `entry` (which kind of page
   * they arrived on) and `arrived_via` (how they got here). No URL, no
   * query string, no referrer string -- a category, never an address.
   *
   * `arrived_via: "shared_link"` is the propagation signal: because every
   * journey's state lives in its URL, a visitor arriving on a URL that
   * ALREADY contains answers was almost certainly sent that link by someone
   * else. For a once-per-lifetime product, that is the closest thing to a
   * retention signal we can honestly have.
   */
  | "landing_viewed"
  /** Opened the five-line version meant for standing at a bank counter. */
  | "counter_mode_opened"
  | "actionable_result_viewed"
  /**
   * The stronger downstream signal: did the reader feel ready to act on
   * what they were just shown, not just view it. Fired when "I'm ready to
   * proceed" (claim_route) or "I know the answer now" (information_required)
   * is clicked. Numerator of Next-Step Intent Rate; denominator is
   * `actionable_result_viewed`.
   */
  | "next_step_intent";
```

Replace with:
```ts
/**
 * Event names are fixed here so a typo cannot silently create a new funnel.
 *
 * A const array, not a bare union, because `isValidEventName` in
 * lib/events.ts needs this list at RUNTIME to reject anything else /api/events
 * is sent -- a TypeScript union has no runtime representation, so the array
 * is the single source both the type and the validator read from. Keeping
 * two separate lists (a type here, an array there) is exactly the kind of
 * drift this codebase spent today fixing in the metric definitions.
 */
export const EVENT_NAMES = [
  "flow_started",
  "question_answered",
  "outcome_reached",
  "demand_checked",
  "readiness_checked",
  "bank_selected",
  "sheet_printed",
  "survey_answered",
  "landing_viewed",
  "counter_mode_opened",
  "actionable_result_viewed",
  "next_step_intent",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/**
 * `actionable_result_viewed` — the North Star: a terminal page rendered with
 * a concrete "what to do today" card, in either of the product's two valid
 * actionable states. `outcome_type` is "claim_route" (a resolved route with
 * concrete next steps) or "information_required" (the product resolved WHAT
 * to find out next, even though it could not resolve the claim route
 * itself). This is the numerator of Actionable Next-Step Rate; the
 * denominator is `question_answered` step 1 (answering the first decision
 * question).
 *
 * `landing_viewed` — fired once per browsing session, on the first page
 * seen. This is the DENOMINATOR of Journey Start Rate -- without it that
 * metric cannot be computed at all, since automatic URL capture is
 * deliberately never done (the URL carries the family's answers). Carries
 * two coarse enums and nothing else: `entry` (which kind of page they
 * arrived on) and `arrived_via` (how they got here). No URL, no query
 * string, no referrer string -- a category, never an address.
 * `arrived_via: "shared_link"` is the propagation signal: because every
 * journey's state lives in its URL, a visitor arriving on a URL that
 * ALREADY contains answers was almost certainly sent that link by someone
 * else. For a once-per-lifetime product, that is the closest thing to a
 * retention signal we can honestly have.
 *
 * `counter_mode_opened` — opened the five-line version meant for standing
 * at a bank counter.
 *
 * `next_step_intent` — the stronger downstream signal: did the reader feel
 * ready to act on what they were just shown, not just view it. Fired when
 * "I'm ready to proceed" (claim_route) or "I know the answer now"
 * (information_required) is clicked. Numerator of Next-Step Intent Rate;
 * denominator is `actionable_result_viewed`.
 */
```

- [ ] **Step 2: Run the typecheck to confirm nothing downstream broke**

Run: `npx tsc --noEmit`
Expected: no new errors referencing `lib/analytics.ts` or `EventName` (pre-existing unrelated errors elsewhere in the tree are fine — this codebase has concurrent work in flight; only check that nothing NEW appears tied to this file).

- [ ] **Step 3: Write the failing tests for `lib/events.ts`**

Create `tests/events.test.cjs`:
```js
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test harness loads TypeScript without generating build files. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const cache = new Map();
function load(name) {
  const file = path.resolve(__dirname, "../lib", name + ".ts");
  if (cache.has(file)) return cache.get(file).exports;
  const loadedModule = { exports: {} };
  cache.set(file, loadedModule);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, {
    module: loadedModule, exports: loadedModule.exports, URLSearchParams, Date, Math, Object, Set, Map, Number, String, Array, JSON,
    require: id => id.startsWith(".") ? load(path.relative(path.resolve(__dirname, "../lib"), path.resolve(path.dirname(file), id))) : require(id),
  }, { filename: file });
  return loadedModule.exports;
}
const { isValidEventName, mapRowsToEvents } = load("events");

test("isValidEventName accepts every real event name", () => {
  const real = [
    "flow_started", "question_answered", "outcome_reached", "demand_checked",
    "readiness_checked", "bank_selected", "sheet_printed", "survey_answered",
    "landing_viewed", "counter_mode_opened", "actionable_result_viewed", "next_step_intent",
  ];
  for (const name of real) assert.equal(isValidEventName(name), true, name);
});

test("isValidEventName rejects anything not in the list", () => {
  assert.equal(isValidEventName("made_up_event"), false);
  assert.equal(isValidEventName(""), false);
  assert.equal(isValidEventName("Flow_Started"), false); // case-sensitive, no silent coercion
});

test("mapRowsToEvents produces the shape aggregate() expects", () => {
  const rows = [
    {
      event: "actionable_result_viewed",
      session_id: "abc-123",
      properties: { resolution_source: "verdict", outcome: "nominee" },
      created_at: "2026-09-07T12:00:00.000Z",
    },
  ];
  const events = mapRowsToEvents(rows);
  assert.equal(events.length, 1);
  assert.equal(events[0].event, "actionable_result_viewed");
  assert.equal(events[0].properties.distinct_id, "abc-123");
  assert.equal(events[0].properties.resolution_source, "verdict");
  assert.equal(events[0].properties.outcome, "nominee");
  // Seconds since epoch, matching Mixpanel's own `time` property shape --
  // this is the exact contract lib/metrics.ts's timeOf() reads.
  assert.equal(events[0].properties.time, Math.floor(new Date(rows[0].created_at).getTime() / 1000));
});

test("mapRowsToEvents does not mutate the original properties object", () => {
  const original = { outcome: "nominee" };
  const rows = [{ event: "outcome_reached", session_id: "s1", properties: original, created_at: "2026-09-07T00:00:00.000Z" }];
  mapRowsToEvents(rows);
  assert.deepEqual(Object.keys(original), ["outcome"]);
});
```

- [ ] **Step 4: Run the tests to confirm they fail**

Run: `node tests/events.test.cjs`
Expected: FAIL — `lib/events.ts` does not exist yet (`Cannot find module` or similar from the loader).

- [ ] **Step 5: Write `lib/events.ts`**

```ts
/**
 * The events table's row shape, and the two pure functions that sit between
 * it and the rest of the codebase.
 *
 * Kept dependency-free and pure, same reason lib/metrics.ts is: no Supabase
 * client import here, so this can be loaded by the same CommonJS test
 * harness the other lib/*.test.cjs files already use, without a live
 * database or environment variables. The impure parts -- actually reading
 * rows out of Supabase -- live in the API routes that call these functions,
 * not here.
 */

import { EVENT_NAMES, type EventName } from "./analytics";
import type { MixpanelEvent } from "./metrics";

export function isValidEventName(name: string): name is EventName {
  return (EVENT_NAMES as readonly string[]).includes(name);
}

/** One row of the `events` table, as Supabase's client returns it. */
export type EventRow = {
  event: string;
  session_id: string;
  properties: Record<string, unknown>;
  created_at: string;
};

/**
 * Supabase row -> the {event, properties} shape lib/metrics.ts's aggregate()
 * already expects and is already tested against. `session_id` becomes
 * `distinct_id` and `created_at` becomes `time` (seconds since epoch) purely
 * because that is the property-name contract aggregate() reads -- it was
 * written against Mixpanel's export shape and is left as-is (Global
 * Constraints: aggregate() does not change), so this function's whole job is
 * translating into that shape rather than the other way around.
 */
export function mapRowsToEvents(rows: EventRow[]): MixpanelEvent[] {
  return rows.map((row) => ({
    event: row.event,
    properties: {
      ...row.properties,
      distinct_id: row.session_id,
      time: Math.floor(new Date(row.created_at).getTime() / 1000),
    },
  }));
}
```

- [ ] **Step 6: Run the tests to confirm they pass**

Run: `node tests/events.test.cjs`
Expected: PASS, 4 tests.

- [ ] **Step 7: Commit**

```bash
git add lib/analytics.ts lib/events.ts tests/events.test.cjs
git commit -m "Derive EventName from a runtime-checkable array, add the pure Supabase-row mapping

EVENT_NAMES is now the single source both the type and a runtime
validator read from -- lib/events.ts's isValidEventName() needs the list
at runtime to reject anything /api/events is sent that isn't a real
event, which a bare TypeScript union cannot provide.

mapRowsToEvents() is the other half: translates a Supabase events row
into the exact {event, properties} shape lib/metrics.ts's aggregate()
already expects and is already tested against. aggregate() itself does
not change -- this function's job is to match its existing contract, not
the reverse."
```

---

## Task 2: Admin session signing (`lib/admin-auth.ts`)

**Files:**
- Create: `lib/admin-auth.ts`
- Test: `tests/admin-auth.test.cjs`

**Interfaces:**
- Consumes: nothing (uses only Node's built-in `node:crypto`)
- Produces:
  - `ADMIN_COOKIE_NAME: string`
  - `signAdminToken(expiresAtMs: number, secret: string): string`
  - `verifyAdminToken(token: string, secret: string, nowMs?: number): boolean`
  - `safeEqual(a: string, b: string): boolean`

- [ ] **Step 1: Write the failing tests**

Create `tests/admin-auth.test.cjs`:
```js
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test harness loads TypeScript without generating build files. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const crypto = require("node:crypto");

const cache = new Map();
function load(name) {
  const file = path.resolve(__dirname, "../lib", name + ".ts");
  if (cache.has(file)) return cache.get(file).exports;
  const loadedModule = { exports: {} };
  cache.set(file, loadedModule);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, {
    module: loadedModule, exports: loadedModule.exports, require: id => require(id),
  }, { filename: file });
  return loadedModule.exports;
}
const { signAdminToken, verifyAdminToken, safeEqual } = load("admin-auth");

const SECRET = "test-secret-do-not-use-in-prod";

test("a freshly signed token verifies against the same secret", () => {
  const token = signAdminToken(Date.now() + 60_000, SECRET);
  assert.equal(verifyAdminToken(token, SECRET), true);
});

test("an expired token is rejected", () => {
  const token = signAdminToken(Date.now() - 1000, SECRET);
  assert.equal(verifyAdminToken(token, SECRET), false);
});

test("verifying against the wrong secret is rejected", () => {
  const token = signAdminToken(Date.now() + 60_000, SECRET);
  assert.equal(verifyAdminToken(token, "a-different-secret"), false);
});

test("a tampered payload is rejected even with the right secret", () => {
  const token = signAdminToken(Date.now() + 60_000, SECRET);
  const [, sig] = token.split(".");
  const tampered = `${Date.now() + 999_999_999}.${sig}`;
  assert.equal(verifyAdminToken(tampered, SECRET), false);
});

test("a malformed token is rejected, not thrown on", () => {
  assert.equal(verifyAdminToken("not-a-real-token", SECRET), false);
  assert.equal(verifyAdminToken("", SECRET), false);
});

test("verification is pinned to an explicit clock, not wall-clock time", () => {
  const expiresAt = 1_000_000;
  const token = signAdminToken(expiresAt, SECRET);
  assert.equal(verifyAdminToken(token, SECRET, 999_999), true);
  assert.equal(verifyAdminToken(token, SECRET, 1_000_001), false);
});

test("safeEqual matches on equal strings, rejects on any difference", () => {
  assert.equal(safeEqual("abc", "abc"), true);
  assert.equal(safeEqual("abc", "abd"), false);
  assert.equal(safeEqual("abc", "abcd"), false);
  assert.equal(safeEqual("", ""), true);
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run: `node tests/admin-auth.test.cjs`
Expected: FAIL — `lib/admin-auth.ts` does not exist yet.

- [ ] **Step 3: Write `lib/admin-auth.ts`**

```ts
/**
 * The `/admin` gate.
 *
 * One shared password, no session table, no external auth library -- this
 * repo has zero auth infrastructure and building a full account system for
 * one operator would be over-engineering (design spec §3.4). A login POSTs
 * the password once; on match, a signed cookie carries an expiry the server
 * can verify without storing anything.
 *
 * The signature is HMAC-SHA256 over the expiry timestamp, keyed by
 * ADMIN_SESSION_SECRET (never in the token itself). Comparisons use a
 * constant-time check -- a plain `===` on a signature or password leaks how
 * many leading bytes matched through response timing, exactly the side
 * channel a shared-secret gate should not have.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "adhikaar_admin";

export function signAdminToken(expiresAtMs: number, secret: string): string {
  const payload = String(expiresAtMs);
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminToken(token: string, secret: string, nowMs: number = Date.now()): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  if (!safeEqual(sig, expected)) return false;
  const expiresAtMs = Number(payload);
  if (!Number.isFinite(expiresAtMs) || expiresAtMs < nowMs) return false;
  return true;
}

/** Constant-time string comparison. Length is checked first because
 * timingSafeEqual throws, rather than returning false, on mismatched
 * buffer lengths. */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}
```

- [ ] **Step 4: Run the tests to confirm they pass**

Run: `node tests/admin-auth.test.cjs`
Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/admin-auth.ts tests/admin-auth.test.cjs
git commit -m "Add the /admin session gate: HMAC-signed cookie, one shared password

No session table, no auth library -- one operator does not need one.
signAdminToken/verifyAdminToken use Node's built-in crypto only.
safeEqual is constant-time throughout, including the password compare
in the login route added later in this plan, so neither the token
signature nor the password itself leaks through response timing."
```

---

## Task 3: Provision the Supabase project

**Files:**
- Create: `supabase/migrations/20260907000000_create_events.sql`
- Modify: `.env.local` (local only, gitignored — not committed)
- Modify: Vercel production environment variables (via CLI)

**Interfaces:**
- Consumes: nothing from earlier tasks
- Produces: a live Supabase project with an `events` table; `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` set in both `.env.local` and Vercel production.

This task has **one step only a human can do** — everything else is CLI-automatable once that step is done.

- [ ] **Step 1: STOP — human action required**

Tell the user: run `supabase login` (or type `! supabase login` in this session so it runs with the browser flow visible). This opens a browser tab to authorize the CLI against their Supabase account. Do not proceed past this step until confirmed done.

- [ ] **Step 2: Confirm authentication and pick an organization**

Run: `npx --yes supabase orgs list`
If exactly one org is returned, use it. If more than one, ask the user which to use. Note the org id (format like `cool-green-pqdr0qc`).

- [ ] **Step 3: Create the project**

Run (substituting the real org id, and generating a strong random password rather than typing a memorable one — this password is never entered by a human, only stored):
```bash
npx --yes supabase projects create adhikaar --org-id <ORG_ID> --db-password "$(node -e 'console.log(require("crypto").randomBytes(24).toString("base64url"))')" --region eu-central-1
```
`eu-central-1` matches the EU data residency decision already made for Mixpanel (cited in the PRD as a production requirement, and in `.env.local`'s existing comments on why EU was chosen).

Capture the project ref from the command's output (format like `abcdefghijklmnop`).

- [ ] **Step 4: Link the local repo to the new project**

Run: `npx --yes supabase link --project-ref <PROJECT_REF>`

- [ ] **Step 5: Write the migration**

Create `supabase/migrations/20260907000000_create_events.sql`:
```sql
-- The one table this product's analytics pipeline writes to and reads from.
-- No user table, no foreign keys -- matches the product's existing
-- "no accounts" posture exactly. See design spec §3.2.
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

- [ ] **Step 6: Push the migration**

Run: `npx --yes supabase db push`

If this fails because the CLI expects a local Postgres instance for diffing (some `supabase db push` configurations require Docker), fall back to running the SQL directly:
```bash
npx --yes supabase db execute --linked --file supabase/migrations/20260907000000_create_events.sql
```

- [ ] **Step 7: Verify the table exists**

Run: `npx --yes supabase db execute --linked --sql "select count(*) from events;"`
Expected: returns `0` (empty table, no error).

- [ ] **Step 8: Retrieve the project URL and service-role key**

Run: `npx --yes supabase projects api-keys --project-ref <PROJECT_REF>`
Note the `service_role` key. The project URL is `https://<PROJECT_REF>.supabase.co`.

- [ ] **Step 9: Generate the admin credentials**

```bash
node -e 'console.log(require("crypto").randomBytes(24).toString("base64url"))'   # ADMIN_PASSWORD
node -e 'console.log(require("crypto").randomBytes(32).toString("hex"))'         # ADMIN_SESSION_SECRET
```
Tell the user both values once — the password is what they'll type at `/admin/login`. Neither is retrievable later except by rotating them.

- [ ] **Step 10: Set `.env.local`**

Append to `.env.local` (do not remove the Mixpanel block yet — that happens in Task 9, after the new pipeline is proven working):
```
# Supabase. Server-only -- never NEXT_PUBLIC_, never sent to the browser.
SUPABASE_URL=<the https://...supabase.co URL>
SUPABASE_SERVICE_ROLE_KEY=<the service_role key>

# /admin gate. ADMIN_PASSWORD is typed at /admin/login. ADMIN_SESSION_SECRET
# signs the session cookie -- rotating it invalidates every existing session
# immediately, even before their stated expiry.
ADMIN_PASSWORD=<generated>
ADMIN_SESSION_SECRET=<generated>
```

- [ ] **Step 11: Set the same four variables in Vercel production**

```bash
printf '%s' "<SUPABASE_URL value>" | npx --yes vercel env add SUPABASE_URL production --no-sensitive
printf '%s' "<SUPABASE_SERVICE_ROLE_KEY value>" | npx --yes vercel env add SUPABASE_SERVICE_ROLE_KEY production
printf '%s' "<ADMIN_PASSWORD value>" | npx --yes vercel env add ADMIN_PASSWORD production
printf '%s' "<ADMIN_SESSION_SECRET value>" | npx --yes vercel env add ADMIN_SESSION_SECRET production
```
(Omit `--no-sensitive` on the three secrets so they store as `Secret`, matching how `MIXPANEL_SERVICE_SECRET` is stored today; `SUPABASE_URL` isn't sensitive on its own, matching `NEXT_PUBLIC_MIXPANEL_REGION`'s prior `Config` treatment, but keep it server-only regardless — no `NEXT_PUBLIC_` prefix.)

- [ ] **Step 12: Commit the migration file only**

`.env.local` is gitignored and must never be committed. Only the SQL migration is tracked.
```bash
git add supabase/migrations/20260907000000_create_events.sql
git commit -m "Add the Supabase migration for the events table

Provisioned a new, separate Supabase project for Adhikaar (region
eu-central-1, matching the EU residency decision already made for
Mixpanel) rather than reusing another project's -- different product,
no reason to couple the data. Credentials live in .env.local and Vercel
production only, never in git."
```

---

## Task 4: The Supabase client (`lib/supabase.ts`)

**Files:**
- Create: `lib/supabase.ts`
- Modify: `package.json` (add `@supabase/supabase-js`)

**Interfaces:**
- Consumes: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` env vars (Task 3)
- Produces: `getSupabaseAdmin(): SupabaseClient`, `EVENTS_TABLE: string`

- [ ] **Step 1: Install the dependency**

Run: `npm install @supabase/supabase-js`

- [ ] **Step 2: Write `lib/supabase.ts`**

```ts
/**
 * The one Supabase client this app creates, server-side only.
 *
 * Lazily built so importing this module never throws in a context where the
 * env vars are legitimately absent (a test's module graph, for instance).
 * The service-role key never reaches the client bundle -- every caller of
 * this function is a route handler or a server component, never a "use
 * client" file.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export const EVENTS_TABLE = "events";
```

- [ ] **Step 3: Smoke-test against the live project**

This is not a `node:test` — it's a one-off script proving real connectivity, the same style of live verification already used in this project (e.g. "Token verified by posting a labelled test event... and confirming it arrived").

Run this directly — it reads `.env.local` by hand rather than adding a `dotenv` dependency just for a one-off check:
```bash
node -e '
const fs = require("fs");
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
(async () => {
  const { error: insertError } = await supabase.from("events").insert({ event: "zz_smoke_test", session_id: "smoke", properties: {} });
  if (insertError) throw insertError;
  const { data, error: selectError } = await supabase.from("events").select("*").eq("event", "zz_smoke_test");
  if (selectError) throw selectError;
  console.log("Round-trip OK:", data.length === 1 ? "PASS" : "FAIL", data);
  await supabase.from("events").delete().eq("event", "zz_smoke_test");
})();
'
```
Expected: `Round-trip OK: PASS`, and the row is deleted afterward so it never contaminates real data.

- [ ] **Step 4: Run the typecheck**

Run: `npx tsc --noEmit`
Expected: no new errors tied to `lib/supabase.ts`.

- [ ] **Step 5: Commit**

```bash
git add lib/supabase.ts package.json package-lock.json
git commit -m "Add the Supabase client factory

getSupabaseAdmin() is the only place this app ever calls createClient().
Lazy so importing the module never throws where the env vars are
legitimately absent. Verified with a live insert-select-delete round
trip against the real project before this commit."
```

---

## Task 5: The write route (`/api/events`)

**Files:**
- Create: `app/api/events/route.ts`

**Interfaces:**
- Consumes: `isValidEventName` (Task 1), `getSupabaseAdmin`/`EVENTS_TABLE` (Task 4)
- Produces: `POST /api/events`, request body `{ event: string, session_id: string, properties?: Record<string, unknown> }`, response `200 {ok:true}` or `400 {error}` or `503 {error}`

- [ ] **Step 1: Write the route**

```ts
/**
 * The write side of the analytics pipeline. Every `track()` call in the
 * browser (lib/analytics.ts) becomes one POST here.
 *
 * Validates the event name against the same fixed list /api/metrics reads
 * back out of -- an unrecognised name is rejected rather than silently
 * creating a new, uncounted category of event. `properties` is stored as-is;
 * the client only ever sends the fixed enum properties documented against
 * each EventName, the same trust boundary that held under Mixpanel.
 */

import { NextResponse } from "next/server";
import { getSupabaseAdmin, EVENTS_TABLE } from "@/lib/supabase";
import { isValidEventName } from "@/lib/events";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const b = (body ?? {}) as Record<string, unknown>;
  const event = typeof b.event === "string" ? b.event : "";
  const sessionId = typeof b.session_id === "string" ? b.session_id : "";
  const properties =
    b.properties && typeof b.properties === "object" && !Array.isArray(b.properties)
      ? (b.properties as Record<string, unknown>)
      : {};

  if (!isValidEventName(event) || !sessionId) {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from(EVENTS_TABLE).insert({ event, session_id: sessionId, properties });
    if (error) {
      return NextResponse.json({ error: "Could not record event." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Analytics is not configured." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Verify against a running dev server**

Run: `npm run dev` (background), then:
```bash
curl -s -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"event":"landing_viewed","session_id":"test-session-1","properties":{"entry":"home"}}'
```
Expected: `{"ok":true}`. Then confirm the row landed:
```bash
npx --yes supabase db execute --linked --sql "select event, session_id, properties from events where session_id = 'test-session-1';"
```
Expected: one row, matching. Delete it afterward:
```bash
npx --yes supabase db execute --linked --sql "delete from events where session_id = 'test-session-1';"
```

- [ ] **Step 3: Verify rejection of an invalid event name**

```bash
curl -s -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"event":"made_up_event","session_id":"test-session-2"}'
```
Expected: `{"error":"Invalid event."}` with a 400 status (`curl -i` to see the status line if needed).

- [ ] **Step 4: Commit**

```bash
git add app/api/events/route.ts
git commit -m "Add /api/events, the write side of the new analytics pipeline

Validates the event name against the same fixed list /api/metrics will
read back out of; rejects anything else with a 400 rather than silently
creating an uncounted category. Verified live: a valid event inserts a
real row, an invalid one is rejected, both confirmed against the actual
Supabase table."
```

---

## Task 6: Swap `/api/metrics`'s read path from Mixpanel to Supabase

**Files:**
- Modify: `app/api/metrics/route.ts`
- Modify: `app/metrics/page.tsx` (drop `developmentEventsExcluded` from the hand-written type and its rendering — see Step 1's reasoning)

**Interfaces:**
- Consumes: `mapRowsToEvents` (Task 1), `getSupabaseAdmin`/`EVENTS_TABLE` (Task 4). `aggregate()` from `lib/metrics.ts` is consumed exactly as it already was — unchanged.
- Produces: `/api/metrics`'s response shape is unchanged except `dataQuality.developmentEventsExcluded` is removed (see Step 1).

- [ ] **Step 1: Replace the Mixpanel fetch block**

Read `app/api/metrics/route.ts` first to see its current exact contents (it was last touched earlier today and may have shifted). Replace the whole fetch-and-filter section — from the `EXPORT_HOST` constant through the `real` array construction — with a Supabase read.

The header comment's "WHY THE RAW EXPORT API AND NOT THE QUERY API" section no longer applies (there is no Export API) and should be replaced with why Supabase's read is used directly instead.

New imports:
```ts
import { getSupabaseAdmin, EVENTS_TABLE } from "@/lib/supabase";
import { mapRowsToEvents, type EventRow } from "@/lib/events";
```

Replace the fetch/filter logic with:
```ts
const to = new Date();
const from = new Date(to.getTime() - 29 * 24 * 60 * 60 * 1000);

let rows: EventRow[];
try {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(EVENTS_TABLE)
    .select("event, session_id, properties, created_at")
    .gte("created_at", from.toISOString())
    .lte("created_at", to.toISOString());
  if (error) {
    return NextResponse.json({ error: `Could not read events: ${error.message}` }, { status: 502 });
  }
  rows = (data ?? []) as EventRow[];
} catch {
  return NextResponse.json({ error: "Analytics is not configured." }, { status: 503 });
}

const real = mapRowsToEvents(rows);
```

Remove the old `excludedDev` counter entirely — dev traffic never reaches this table in the first place (`isLocalDev()` stops `track()` from firing at all on localhost, Task 7), so there is nothing left to filter at read time. In the final JSON response, change:
```ts
dataQuality: {
  eventsConsidered: real.length,
  developmentEventsExcluded: excludedDev,
},
```
to:
```ts
dataQuality: {
  eventsConsidered: real.length,
},
```

Rewrite the header comment's second paragraph (the one starting "WHY THE RAW EXPORT API AND NOT THE QUERY API") to instead explain: this route now reads Supabase directly rather than through any third party, so there is no export lag, no plan-tier gate, and no vendor account required at all -- not even a read-only service account.

Leave `export const runtime = "nodejs"` and `export const revalidate = 300` exactly as they are — this task only replaces the fetch source, not the route's caching behaviour. The public page keeps its 5-minute cache; `/admin` (Task 8) is the one that deliberately forgoes it.

- [ ] **Step 2: Update `app/metrics/page.tsx`'s type and rendering to match**

In the `Metrics` type, remove `developmentEventsExcluded: number;` from `dataQuality`, leaving just `eventsConsidered: number;`.

Find the footer line rendering both fields (search for `developmentEventsExcluded`):
```tsx
<p className="text-[0.9375rem] text-ink-faint">
  {m.dataQuality.eventsConsidered} events counted ·{" "}
  {m.dataQuality.developmentEventsExcluded} development events
  ...
```
Replace with a single clause naming just the real count:
```tsx
<p className="text-[0.9375rem] text-ink-faint">
  {m.dataQuality.eventsConsidered} events counted · refreshed every 5 minutes.
</p>
```
(Match the exact surrounding JSX structure already in the file — read it first, this is a targeted edit to one paragraph, not a rewrite of the section.)

- [ ] **Step 3: Verify against a running dev server**

With the dev server running, insert a couple of test rows directly and confirm `/api/metrics` reflects them:
```bash
curl -s -X POST http://localhost:3000/api/events -H "Content-Type: application/json" \
  -d '{"event":"landing_viewed","session_id":"verify-1","properties":{"entry":"home","arrived_via":"direct"}}'
curl -s -X POST http://localhost:3000/api/events -H "Content-Type: application/json" \
  -d '{"event":"flow_started","session_id":"verify-1","properties":{"branch":"new"}}'
curl -s -X POST http://localhost:3000/api/events -H "Content-Type: application/json" \
  -d '{"event":"actionable_result_viewed","session_id":"verify-1","properties":{"outcome":"nominee","outcome_type":"claim_route","resolution_source":"verdict"}}'
curl -s http://localhost:3000/api/metrics
```
Expected: `funnel.landingVisitors`, `funnel.journeysStarted`, `funnel.resolvedJourneys` all show at least `1`; `dataQuality.eventsConsidered` is at least `3`; no `developmentEventsExcluded` field in the response at all.

Clean up the test rows:
```bash
npx --yes supabase db execute --linked --sql "delete from events where session_id = 'verify-1';"
```

- [ ] **Step 4: Run the typecheck and lint**

Run: `npx tsc --noEmit` and `npx eslint app/api/metrics/route.ts app/metrics/page.tsx`
Expected: no new errors tied to either file.

- [ ] **Step 5: Confirm `lib/metrics.ts`'s existing tests are still untouched and passing**

Run: `node tests/metrics.test.cjs`
Expected: PASS, all 14 tests — this file was not touched by this task, this step is confirming that fact rather than testing new code.

- [ ] **Step 6: Commit**

```bash
git add app/api/metrics/route.ts app/metrics/page.tsx
git commit -m "Point /api/metrics at Supabase instead of Mixpanel's Export API

lib/metrics.ts's aggregate() is untouched -- this task only changes
where its input events come from. mapRowsToEvents() (Task 1) translates
each Supabase row into the exact shape aggregate() already expects and
is already tested against.

developmentEventsExcluded drops out of the response: dev traffic never
reaches this table in the first place once track() gates on
isLocalDev() before ever calling fetch() (Task 7), so there is nothing
left to filter at read time. Verified live against the dev server with
real inserted rows before this commit."
```

---

## Task 7: Rewrite `lib/analytics.ts`'s transport, remove `initAnalytics`

**Files:**
- Modify: `lib/analytics.ts`
- Modify: `app/_components/analytics.tsx` (remove the `initAnalytics` import and its effect)

**Interfaces:**
- Consumes: nothing new
- Produces: `track(event: EventName, props?: Record<string, string | number | boolean>): void` — **signature unchanged**, every existing call site needs zero edits.

- [ ] **Step 1: Rewrite `lib/analytics.ts`**

Replace the entire file. The header comment is rewritten because it currently documents Mixpanel-specific config flags (`property_blacklist`, `disable_persistence`, `track_pageview`) that no longer exist — a hand-rolled `fetch()` call sends only exactly what its caller passes, with nothing auto-attached, so the whole class of bug the old header warns about (a vendor SDK silently attaching `$current_url`) is now structurally impossible rather than something to configure away.

```ts
/**
 * Analytics.
 *
 * ─── The tension this file has to resolve ───
 *
 * Every page of this site promises that nothing about the family is stored.
 * Any analytics at all is in tension with that, so this is deliberately the
 * most restrained version that can still answer the one question the product
 * is judged on: did people arrive believing they needed a succession
 * certificate and leave knowing they did not?
 *
 * What is sent:  which question was answered, which verdict was reached,
 *                whether a sheet was printed.
 * What is NOT sent: the answers themselves are sent only as the branch of the
 *                law they select — never a rupee figure, never a bank account,
 *                never a name, never anything typed. The deadline tracker's
 *                date is never sent, at all.
 *
 * ─── Where events go, since 7 Sep 2026 ───
 *
 * track() POSTs to this app's own /api/events, which inserts one row into
 * Supabase. No third party ever sees an event -- not Mixpanel, not anyone.
 * This is a stronger guarantee than the SDK-based version it replaced: there
 * is no vendor config to get wrong, because there is no vendor. A plain
 * fetch() call sends exactly the object passed to it and nothing else --
 * there is no auto-attached `$current_url`, no auto pageview, no referrer
 * property, because there is no SDK reaching for the page to auto-instrument.
 * The whole class of leak the previous version needed a property_blacklist
 * to guard against cannot happen here structurally.
 *
 * isLocalDev() is still the single gate keeping development traffic out of
 * real numbers -- every session working on this codebase runs against
 * localhost, and without this guard every click while building a feature
 * would land in the same table as real claimants.
 *
 * `session_id` takes the place of Mixpanel's own anonymous distinct_id: a
 * fresh crypto.randomUUID() generated once per page load, held only in this
 * module's memory. Nothing is written to localStorage or a cookie, so a
 * reload mints a new one -- the identical non-persistence guarantee the old
 * disable_persistence/disable_cookie SDK flags provided, just with nothing
 * left to configure.
 */

/**
 * Event names are fixed here so a typo cannot silently create a new funnel.
 *
 * A const array, not a bare union, because isValidEventName in lib/events.ts
 * needs this list at RUNTIME to reject anything else /api/events is sent --
 * a TypeScript union has no runtime representation, so the array is the
 * single source both the type and the validator read from.
 */
export const EVENT_NAMES = [
  "flow_started",
  "question_answered",
  "outcome_reached",
  "demand_checked",
  "readiness_checked",
  "bank_selected",
  "sheet_printed",
  "survey_answered",
  "landing_viewed",
  "counter_mode_opened",
  "actionable_result_viewed",
  "next_step_intent",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/**
 * `actionable_result_viewed` — the North Star: a terminal page rendered with
 * a concrete "what to do today" card, in either of the product's two valid
 * actionable states. `outcome_type` is "claim_route" (a resolved route with
 * concrete next steps) or "information_required" (the product resolved WHAT
 * to find out next, even though it could not resolve the claim route
 * itself). This is the numerator of Actionable Next-Step Rate; the
 * denominator is `question_answered` step 1 (answering the first decision
 * question).
 *
 * `landing_viewed` — fired once per browsing session, on the first page
 * seen. This is the DENOMINATOR of Journey Start Rate -- without it that
 * metric cannot be computed at all, since automatic URL capture is
 * deliberately never done (the URL carries the family's answers). Carries
 * two coarse enums and nothing else: `entry` (which kind of page they
 * arrived on) and `arrived_via` (how they got here). No URL, no query
 * string, no referrer string -- a category, never an address.
 * `arrived_via: "shared_link"` is the propagation signal: because every
 * journey's state lives in its URL, a visitor arriving on a URL that
 * ALREADY contains answers was almost certainly sent that link by someone
 * else. For a once-per-lifetime product, that is the closest thing to a
 * retention signal we can honestly have.
 *
 * `counter_mode_opened` — opened the five-line version meant for standing
 * at a bank counter.
 *
 * `next_step_intent` — the stronger downstream signal: did the reader feel
 * ready to act on what they were just shown, not just view it. Fired when
 * "I'm ready to proceed" (claim_route) or "I know the answer now"
 * (information_required) is clicked. Numerator of Next-Step Intent Rate;
 * denominator is `actionable_result_viewed`.
 */

/**
 * Local development never leaves real-user numbers. Every session working on
 * this codebase runs against localhost, and without this guard every click
 * while building or testing a feature would land in the same table as real
 * claimants.
 */
function isLocalDev(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

/**
 * A fresh identity per page load, held only in memory. Generated lazily on
 * the first track() call rather than at module load, so a page that never
 * tracks anything never even creates one.
 */
let sessionId: string | null = null;
function currentSessionId(): string {
  if (!sessionId) sessionId = crypto.randomUUID();
  return sessionId;
}

export function track(event: EventName, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || isLocalDev()) return;
  try {
    // Not awaited: analytics must never be able to hold up or break a page
    // someone is reading at a bank counter. keepalive lets the request
    // survive if the browser navigates away immediately after this call --
    // a real case here, since track() is often the last thing that runs
    // before a <Link> click completes.
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ event, properties: props, session_id: currentSessionId() }),
    }).catch(() => {
      // A blocked network, an ad blocker, a dead endpoint: all fine.
    });
  } catch {
    // Same guarantee if fetch() itself throws synchronously.
  }
}
```

- [ ] **Step 2: Remove `initAnalytics` from `app/_components/analytics.tsx`**

Find:
```tsx
import { initAnalytics, track } from "@/lib/analytics";
```
Replace with:
```tsx
import { track } from "@/lib/analytics";
```

Find:
```tsx
  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const onPrint = () => {
```
Replace with:
```tsx
  useEffect(() => {
    const onPrint = () => {
```
(Delete the whole `initAnalytics` effect block — there is no SDK left to initialize; every `track()` call is now self-contained.)

- [ ] **Step 3: Run the typecheck and lint**

Run: `npx tsc --noEmit` and `npx eslint lib/analytics.ts app/_components/analytics.tsx`
Expected: no new errors tied to either file.

- [ ] **Step 4: Verify with the same headless-Chrome network check used earlier today**

With the dev server running, confirm `track()` actually reaches `/api/events` on a real page load. Reuse the CDP-driving pattern already established in this session (`check-mixpanel.js`'s structure): navigate to `http://localhost:3000/start?begin=1`, capture `Network.requestWillBeSent` events, assert at least one `POST` to a URL ending in `/api/events`.

Expected: at least one real request fires, confirming the rewritten `track()` works end-to-end locally, not just that it compiles.

- [ ] **Step 5: Commit**

```bash
git add lib/analytics.ts app/_components/analytics.tsx
git commit -m "Rewrite track() to POST /api/events instead of the Mixpanel SDK

track()'s signature is unchanged -- every call site in analytics.tsx
needed zero edits beyond removing the now-meaningless initAnalytics()
effect, since a plain fetch() has no setup step.

session_id replaces Mixpanel's anonymous distinct_id: a
crypto.randomUUID() held only in memory, generated lazily on first
track() call, never written to storage -- the same non-persistence
guarantee disable_persistence/disable_cookie provided, with nothing
left to configure since there is no SDK auto-attaching anything.

Verified against a real page load with a headless-Chrome network
capture: track() genuinely reaches /api/events over the wire."
```

---

## Task 8: `/admin` — login and dashboard

**Files:**
- Create: `app/api/admin/login/route.ts`
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/page.tsx`
- Test: `tests/admin-auth.test.cjs` already covers the pure logic (Task 2); this task adds one integration-style verification, not new unit tests

**Interfaces:**
- Consumes: `ADMIN_COOKIE_NAME`, `signAdminToken`, `verifyAdminToken`, `safeEqual` (Task 2); `getSupabaseAdmin`/`EVENTS_TABLE` (Task 4); `mapRowsToEvents` (Task 1); `aggregate` (existing, `lib/metrics.ts`)
- Produces: `POST /api/admin/login`, `GET /admin/login`, `GET /admin` (redirects to `/admin/login` when unauthenticated)

- [ ] **Step 1: Write the login route**

```ts
/**
 * The one entry point into /admin. A single shared password -- see
 * lib/admin-auth.ts's header for why this repo doesn't build full accounts
 * for one operator.
 */

import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, signAdminToken, safeEqual } from "@/lib/admin-auth";

export const runtime = "nodejs";

const SESSION_MS = 12 * 60 * 60 * 1000; // 12 hours

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) {
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
  }

  const body: unknown = await request.json().catch(() => null);
  const submitted = typeof (body as Record<string, unknown> | null)?.password === "string"
    ? (body as Record<string, string>).password
    : "";

  if (!safeEqual(submitted, password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const expiresAtMs = Date.now() + SESSION_MS;
  const token = signAdminToken(expiresAtMs, secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/admin",
    expires: new Date(expiresAtMs),
  });
  return res;
}
```

- [ ] **Step 2: Write the login page**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Could not log in.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-rule bg-white p-6">
        <h1 className="display-md font-serif font-bold text-indigo-ink">Admin</h1>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded-lg border border-rule px-3 py-2"
          placeholder="Password"
        />
        {error && <p className="mt-2 text-[0.9375rem] text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-4 w-full rounded-lg bg-indigo px-4 py-2 font-bold text-white disabled:opacity-50"
        >
          {busy ? "Checking…" : "Log in"}
        </button>
      </form>
    </main>
  );
}
```

- [ ] **Step 3: Write the dashboard page**

```tsx
/**
 * The private view /metrics deliberately withholds: raw per-event
 * drill-down, and the same aggregates without the public page's 5-minute
 * cache. First cut -- a filterable event table plus the existing aggregate
 * numbers, not a general BI tool (design spec §3.4). Expand later if it
 * turns out to be needed.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import { getSupabaseAdmin, EVENTS_TABLE } from "@/lib/supabase";
import { mapRowsToEvents, type EventRow } from "@/lib/events";
import { aggregate } from "@/lib/metrics";

export const metadata = { title: "Adhikaar — admin" };
export const dynamic = "force-dynamic"; // no cache -- this is the point of /admin over /metrics

async function requireAdmin() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!secret || !token || !verifyAdminToken(token, secret)) {
    redirect("/admin/login");
  }
}

export default async function AdminPage() {
  await requireAdmin();

  const to = new Date();
  const from = new Date(to.getTime() - 29 * 24 * 60 * 60 * 1000);
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from(EVENTS_TABLE)
    .select("event, session_id, properties, created_at")
    .gte("created_at", from.toISOString())
    .order("created_at", { ascending: false })
    .limit(2000);

  const rows = (data ?? []) as EventRow[];
  const events = mapRowsToEvents(rows);
  const m = aggregate(events);
  const recent = rows.slice(0, 50);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="display-lg font-serif font-bold text-indigo-ink">Admin</h1>

      <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Weekly resolved" value={m.northStar.weeklyResolvedJourneys} />
        <Stat label="Resolution rate" value={m.omtm.resolutionRate === null ? "—" : `${m.omtm.resolutionRate}%`} />
        <Stat label="Honest-exit rate" value={m.guardrails.honestExitRate === null ? "—" : `${m.guardrails.honestExitRate}%`} />
        <Stat label="Events (30d)" value={events.length} />
      </section>

      <section className="mt-8">
        <h2 className="display-md font-serif font-bold text-indigo-ink">Recent events</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.875rem]">
            <thead>
              <tr className="border-b-2 border-rule">
                <th className="py-1.5 pr-4">Event</th>
                <th className="py-1.5 pr-4">Properties</th>
                <th className="py-1.5">When</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={i} className="border-b border-rule-faint">
                  <td className="py-1.5 pr-4 font-mono">{r.event}</td>
                  <td className="py-1.5 pr-4 font-mono text-ink-soft">{JSON.stringify(r.properties)}</td>
                  <td className="py-1.5 text-ink-faint">{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-rule bg-white p-4">
      <p className="text-[0.75rem] font-bold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="display-md mt-1 font-serif font-bold text-indigo-ink">{value}</p>
    </div>
  );
}
```

- [ ] **Step 4: Verify the flow against a running dev server**

```bash
curl -s -i -X POST http://localhost:3000/api/admin/login -H "Content-Type: application/json" -d '{"password":"wrong"}'
```
Expected: `401`.

```bash
curl -s -i http://localhost:3000/admin
```
Expected: redirect toward `/admin/login` (no valid cookie sent).

With the real `ADMIN_PASSWORD` from `.env.local`:
```bash
curl -s -i -c /tmp/admin-cookie.txt -X POST http://localhost:3000/api/admin/login -H "Content-Type: application/json" -d '{"password":"<real password>"}'
curl -s -i -b /tmp/admin-cookie.txt http://localhost:3000/admin
```
Expected: first call `200 {"ok":true}` with a `Set-Cookie` header; second call `200` and renders the dashboard, not a redirect.

- [ ] **Step 5: Run the typecheck and lint**

Run: `npx tsc --noEmit` and `npx eslint app/api/admin app/admin`
Expected: no new errors.

- [ ] **Step 6: Commit**

```bash
git add app/api/admin app/admin
git commit -m "Add /admin: password-gated private dashboard

One shared password (lib/admin-auth.ts, Task 2), no session table.
Shows the same aggregates /metrics does without its 5-minute cache,
plus a raw recent-events table the public page deliberately withholds.
Verified live: wrong password rejected, no cookie redirects to login,
correct password grants access to the dashboard."
```

---

## Task 9: Remove Mixpanel entirely

**Files:**
- Modify: `package.json` (remove `mixpanel-browser`, `@types/mixpanel-browser`)
- Modify: `.env.local` (remove the Mixpanel block)
- Modify: Vercel production environment variables (via CLI)

**Interfaces:** none — this task only deletes.

- [ ] **Step 1: Remove the npm dependencies**

Run: `npm uninstall mixpanel-browser @types/mixpanel-browser`

- [ ] **Step 2: Remove the Mixpanel block from `.env.local`**

Delete the entire commented block covering `NEXT_PUBLIC_MIXPANEL_TOKEN`, `NEXT_PUBLIC_MIXPANEL_REGION`, `MIXPANEL_SERVICE_USER`, `MIXPANEL_SERVICE_SECRET`, `MIXPANEL_PROJECT_ID` and their explanatory comments.

- [ ] **Step 3: Remove the Mixpanel env vars from Vercel production**

```bash
npx --yes vercel env rm NEXT_PUBLIC_MIXPANEL_TOKEN production --yes
npx --yes vercel env rm NEXT_PUBLIC_MIXPANEL_REGION production --yes
npx --yes vercel env rm MIXPANEL_SERVICE_USER production --yes
npx --yes vercel env rm MIXPANEL_SERVICE_SECRET production --yes
npx --yes vercel env rm MIXPANEL_PROJECT_ID production --yes
```

- [ ] **Step 4: Grep to confirm nothing still imports `mixpanel-browser`**

Run: `grep -rn "mixpanel-browser" app lib`
Expected: no matches. (References to the *word* "Mixpanel" in prose/comments are handled in Task 10 — this step is only checking the package import is gone.)

- [ ] **Step 5: Run the full typecheck**

Run: `npx tsc --noEmit`
Expected: no errors referencing a missing `mixpanel-browser` module.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .env.local
git commit -m "Remove the mixpanel-browser dependency and every Mixpanel credential

The client SDK is gone from package.json; every Mixpanel-related env
var is gone from both .env.local and Vercel production. Nothing in
app/ or lib/ imports mixpanel-browser any more (confirmed by grep).
The service account that read the old Export API is not rotated or
deleted at the vendor -- only unused, per the design spec's scope."
```

---

## Task 10: Update every remaining Mixpanel reference in copy and comments

**Files:**
- Modify: `lib/privacy.ts` (en, hi, kn)
- Modify: `lib/i18n-home.ts` (en, hi, kn)
- Modify: `app/layout.tsx` (comment)
- Modify: `app/api/saathi/route.ts` (comment)

**Interfaces:** none — copy only.

- [ ] **Step 1: `lib/privacy.ts`**

Find (English):
```
"...The optional deadline date stays in browser storage. Basic usage analytics may be sent to Mixpanel when configured. If you use Saathi..."
```
Replace with:
```
"...The optional deadline date stays in browser storage. Basic usage analytics are sent to Adhikaar's own server and stored there, never to a third party. If you use Saathi..."
```

Apply the equivalent change to the Hindi and Kannada strings — replace the clause naming Mixpanel with the same meaning ("sent to Adhikaar's own server, stored there, not to a third party") in each language. Do not attempt a fresh translation from scratch; ask a Hindi/Kannada speaker to review afterward, the same standing caveat every other translated string in this codebase already carries.

- [ ] **Step 2: `lib/i18n-home.ts`**

Find (English `analyticsSectionBody`):
```
"When configured, Mixpanel receives basic events such as a question being answered, the outcome reached, a checklist interaction or a print action. Analytics is configured without persistent browser identifiers, analytics cookies, automatic page views or session recording. It is not a promise that no data reaches a server: network providers can process technical information when handling requests."
```
Replace with:
```
"Basic events such as a question being answered, the outcome reached, a checklist interaction or a print action are sent to Adhikaar's own server and stored there -- never to a third party. No persistent browser identifier, no analytics cookie, no automatic page views, no session recording. This is not a promise that no data reaches a server: the request itself has to reach this site's own server to be answered at all."
```

Apply the equivalent meaning change to the Hindi and Kannada `analyticsSectionBody` strings.

- [ ] **Step 3: `app/layout.tsx`**

Find (near the `<Suspense>` wrapping `<Analytics />`):
```
a no-op entirely when no Mixpanel token is configured.
```
Replace with:
```
a no-op entirely when Supabase is not configured (getSupabaseAdmin() throws, caught by /api/events' own try/catch).
```

- [ ] **Step 4: `app/api/saathi/route.ts`**

Find:
```
first network dependency beyond the Mixpanel SDK
```
Replace with:
```
first network dependency beyond this app's own /api/events
```

- [ ] **Step 5: Grep to confirm nothing user-facing still names Mixpanel**

Run: `grep -rin "mixpanel" app lib`
Expected: no matches at all — every reference found at the start of this plan (§ "checking what user-facing copy already promises") is gone.

- [ ] **Step 6: Commit**

```bash
git add lib/privacy.ts lib/i18n-home.ts app/layout.tsx app/api/saathi/route.ts
git commit -m "Update every remaining Mixpanel reference in copy and comments

Privacy page copy (3 locales) and the /privacy analytics section (3
locales) now say plainly that events go to Adhikaar's own server, not
a third party -- a straightforwardly more accurate sentence than the
one it replaces. Two code comments updated to match. Confirmed by grep:
no reference to Mixpanel remains anywhere in app/ or lib/."
```

---

## Task 11: Deploy and verify end-to-end

**Files:** none — this task is verification only.

**Interfaces:** none.

- [ ] **Step 1: Confirm the tree is clean and push**

```bash
git status --short
git push origin master
```

- [ ] **Step 2: Trigger a production deploy**

```bash
npx --yes vercel --prod --yes
```

- [ ] **Step 3: Confirm the deployed bundle contains no Mixpanel reference and no leaked Supabase credential**

Two separate checks, both against the same chunk list — this is the exact diagnostic method that found the original Mixpanel token bug earlier today, reused here as the risk mitigation the design spec names in §7 ("verified by grepping the deployed bundle before calling this done — the same check that caught the original Mixpanel bug").

```bash
curl -s https://adhikaar-gamma.vercel.app/ | grep -o '/_next/static/[^"]*\.js' | sort -u > /tmp/chunks.txt
while read -r c; do
  curl -s "https://adhikaar-gamma.vercel.app$c" | grep -io "mixpanel" && echo "MIXPANEL FOUND IN: $c"
done < /tmp/chunks.txt
```
Expected: no output.

```bash
# The service-role key itself (read from .env.local, never typed by hand)
KEY=$(grep '^SUPABASE_SERVICE_ROLE_KEY=' .env.local | cut -d= -f2-)
while read -r c; do
  curl -s "https://adhikaar-gamma.vercel.app$c" | grep -qF "$KEY" && echo "SERVICE-ROLE KEY LEAKED IN: $c"
done < /tmp/chunks.txt
```
Expected: no output. If either check finds anything, this is a real, urgent bug — stop and fix before proceeding to Step 4.

- [ ] **Step 4: Confirm a real journey fires `/api/events`, not any third-party host**

Reuse the headless-Chrome CDP script from earlier today (`check-mixpanel.js`'s pattern), pointed at production: navigate to `https://adhikaar-gamma.vercel.app/start?begin=1`, capture network requests, assert at least one `POST` to `/api/events` and zero requests to any host containing "mixpanel".

Expected: the new pipeline fires; the old one is entirely gone from the live site, not just from the source.

- [ ] **Step 5: Confirm `/api/metrics` reflects it**

```bash
curl -s https://adhikaar-gamma.vercel.app/api/metrics
```
Expected: valid JSON in the shape defined by `lib/metrics.ts`'s `aggregate()`, `dataQuality` carrying only `eventsConsidered` (no `developmentEventsExcluded` field).

- [ ] **Step 6: Confirm `/admin` works live**

Visit `https://adhikaar-gamma.vercel.app/admin` unauthenticated — expect a redirect to `/admin/login`. Log in with the real password — expect the dashboard to render with real numbers.

- [ ] **Step 7: Final full test run**

```bash
node tests/metrics.test.cjs
node tests/events.test.cjs
node tests/admin-auth.test.cjs
npx tsc --noEmit
npx eslint app lib tests
```
Expected: all tests pass, no new typecheck or lint errors anywhere in the files this plan touched.

- [ ] **Step 8: Report the outcome plainly**

State clearly: Mixpanel is fully removed (SDK, Export API, every credential, every copy reference), the new pipeline is live and verified with real network evidence at every layer (write, read, admin auth), and name anything from the spec that was deliberately left out of scope (§8 of the design spec — historical data migration, multi-user admin, rate limiting beyond the event-name allowlist).
