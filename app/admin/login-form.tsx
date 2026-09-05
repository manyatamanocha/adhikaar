"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);
  return (
    <form action={formAction} className="mt-8 max-w-[360px]">
      <label htmlFor="admin-password" className="block text-[0.9375rem] font-bold text-indigo-ink">
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-2 w-full rounded-lg border-2 border-rule bg-white px-4 py-2.5 text-[1.0625rem] text-ink"
      />
      {state?.error && (
        <p className="mt-2 text-[0.9375rem] font-bold text-maroon">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 inline-flex items-center rounded-pill bg-indigo px-6 py-3 text-[1.0625rem] font-bold text-white transition-colors hover:bg-indigo-lift disabled:opacity-60"
      >
        {pending ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}
