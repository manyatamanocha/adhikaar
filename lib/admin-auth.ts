/**
 * The admin dashboard's only gate.
 *
 * No database, no user table -- this is a single shared password
 * (`ADMIN_PASSWORD`, server-only env var, never NEXT_PUBLIC_) that unlocks
 * a signed, httpOnly session cookie scoped to `/admin`. The cookie's HMAC
 * key is the password itself: acceptable for a single-operator internal
 * tool with no accounts to protect, not a pattern to reuse for anything
 * with real users.
 *
 * `timingSafeEqual` on both the password check and the signature check --
 * a plain `===` on a secret leaks its value one byte at a time to a patient
 * attacker measuring response time.
 */

import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "adhikaar_admin_session";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate, expected);
}

/** Returns a signed `expires_at.signature` string to store in the cookie, or null if unconfigured. */
export function makeSessionCookieValue(): string | null {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  const expiresAt = String(Date.now() + SESSION_MS);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function isValidSessionCookie(value: string | undefined): boolean {
  if (!value) return false;
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature) return false;
  if (!safeEqual(signature, sign(expiresAt, secret))) return false;
  const expiryMs = Number(expiresAt);
  return Number.isFinite(expiryMs) && Date.now() < expiryMs;
}
