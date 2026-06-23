import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

/**
 * ComplyPilot Route Guard Middleware
 *
 * Enforces three rules from Implementation.md §1.3:
 * 1. Unauthenticated requests to /ca/* → /auth/ca-login
 * 2. Unauthenticated requests to /owner/* → /auth/owner-login
 * 3. MSME_OWNER session on /ca/* → /owner/dashboard (role mismatch redirect)
 * 4. CA_PARTNER/CA_ARTICLE session on /owner/* → /ca/dashboard (role mismatch redirect)
 * 5. /drop/* and /auth/* pass through freely (no session required)
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Public passthrough routes ───────────────────────────────────────────
  // /auth/* — login pages (both CA and Owner)
  // /drop/* — WhatsApp document drop zone (no-login write-only upload)
  // /api/*  — API routes (NextAuth handles its own session validation)
  // /_next/* — Next.js internals
  const isPublicRoute =
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/drop/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/';

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ── Read NextAuth session token from cookie ─────────────────────────────
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ── CA workspace guard (/ca/*) ──────────────────────────────────────────
  if (pathname.startsWith('/ca')) {
    // No session → redirect to CA login
    if (!token) {
      const loginUrl = new URL('/auth/ca-login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // MSME owner trying to access CA workspace → redirect to owner dashboard
    if (token.role === 'MSME_OWNER') {
      return NextResponse.redirect(new URL('/owner/dashboard', request.url));
    }
  }

  // ── Owner portal guard (/owner/*) ───────────────────────────────────────
  if (pathname.startsWith('/owner')) {
    // No session → redirect to owner login
    if (!token) {
      const loginUrl = new URL('/auth/owner-login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // CA trying to access owner portal → redirect to CA dashboard
    if (
      token.role === 'CA_PARTNER' ||
      token.role === 'CA_ARTICLE'
    ) {
      return NextResponse.redirect(new URL('/ca/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

/**
 * Matcher — only run middleware on application routes (not static assets).
 * Excludes _next/static, _next/image, favicon.ico automatically.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
