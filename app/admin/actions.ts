"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, checkPassword, isAdminConfigured, makeSessionCookieValue } from "@/lib/admin-auth";

export async function login(_prevState: { error?: string } | undefined, formData: FormData) {
  if (!isAdminConfigured()) {
    return { error: "ADMIN_PASSWORD is not set on the server. This page cannot be unlocked yet." };
  }
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Wrong password." };
  }
  const value = makeSessionCookieValue();
  if (!value) return { error: "ADMIN_PASSWORD is not set on the server." };

  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete({ name: ADMIN_COOKIE_NAME, path: "/admin" });
  redirect("/admin");
}
