/**
 * The `/admin` gate.
 *
 * One shared password, no session table, no external auth library -- this
 * repo has zero auth infrastructure and building a full account system for
 * one operator would be over-engineering. A login POSTs the password once;
 * on match, a signed cookie carries an expiry the server can verify without
 * storing anything.
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

/**
 * Constant-time string comparison. Length is checked first because
 * timingSafeEqual throws, rather than returning false, on mismatched
 * buffer lengths.
 */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}
