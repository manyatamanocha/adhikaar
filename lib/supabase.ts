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
