import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client factory.
 *
 * Use in:
 * - Server Components (async components that fetch data)
 * - Route Handlers (app/api/*)
 * - Server Actions
 *
 * This client reads and writes the Supabase auth cookie automatically,
 * so RLS policies are enforced using the active user's session.
 *
 * Usage:
 *   const supabase = await createClient();
 *   const { data } = await supabase.from('Client').select('*');
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll called from a Server Component — cookies are read-only.
            // This is safe to ignore; the middleware will handle cookie refreshing.
          }
        },
      },
    },
  );
}
