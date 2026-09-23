import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase browser client.
 *
 * Credentials come from VITE_* env vars (exposed to the client by Vite). The
 * anon key is safe to ship to the browser — row-level security on the Supabase
 * side is what protects data.
 *
 * The app runs even when Supabase isn't configured yet: `isSupabaseConfigured`
 * is false and the sign-in screen shows a clear setup message instead of
 * throwing at import time.
 */
const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const anonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  : null;
