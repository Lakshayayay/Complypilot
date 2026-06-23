import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client singleton.
 *
 * Use in Client Components ('use client') for:
 * - Supabase Realtime subscriptions (calendar comments, status updates)
 * - Supabase Storage file uploads from the browser
 *
 * DO NOT use for sensitive operations — this client uses the public anon key.
 * Server-side operations (RLS-protected queries) should use lib/supabase/server.ts
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
