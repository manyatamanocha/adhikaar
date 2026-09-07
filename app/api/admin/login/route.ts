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
