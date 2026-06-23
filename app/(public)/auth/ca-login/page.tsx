'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';

// Note: metadata cannot be exported from client components.
// The SEO title for this page is set in the nearest server layout.

export default function CALoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Handle redirect manually for better error UX
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    // Successful login → redirect to CA dashboard
    router.push('/ca/dashboard');
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-neutral-canvas flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* ── Brand lockup ────────────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="font-sans font-extrabold text-4xl text-brand-navy tracking-tight">
              Comply
            </span>
            <span className="font-sans font-extrabold text-4xl text-accent-purple tracking-tight">
              Pilot
            </span>
          </a>
          <p className="mt-2 font-sans text-sm text-neutral-muted">
            CA & Article Assistant Portal
          </p>
        </div>

        {/* ── Login card ──────────────────────────────────────────────────── */}
        <div className="bg-neutral-surface border-[2px] border-brand-navy rounded-[12px] shadow-[6px_6px_0px_0px_#0A192F] p-8">

          {/* Card header */}
          <div className="relative mb-6">
            <h1 className="font-sans font-extrabold text-2xl text-brand-navy">
              Sign in to your workspace
            </h1>
            {/* Handwritten annotation */}
            <span
              className="absolute -top-5 right-0 font-handwritten text-accent-purple text-sm rotate-3"
              aria-hidden="true"
            >
              Welcome back ↗
            </span>
          </div>

          {/* Error alert */}
          {error && (
            <div
              role="alert"
              className="mb-4 px-4 py-3 bg-accent-rose/10 border-[2px] border-accent-rose rounded-[8px]
                         font-sans text-sm text-accent-rose font-semibold"
            >
              {error}
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email field */}
            <div>
              <label
                htmlFor="ca-email"
                className="block font-sans font-bold text-sm text-brand-navy mb-1.5"
              >
                Email address
              </label>
              <input
                id="ca-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ca@example.com"
                className="w-full px-4 py-3 bg-neutral-canvas
                           border-[2px] border-brand-navy rounded-[12px]
                           font-sans text-sm text-brand-navy placeholder:text-neutral-muted
                           focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-1
                           transition-shadow"
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="ca-password"
                className="block font-sans font-bold text-sm text-brand-navy mb-1.5"
              >
                Password
              </label>
              <input
                id="ca-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-neutral-canvas
                           border-[2px] border-brand-navy rounded-[12px]
                           font-sans text-sm text-brand-navy placeholder:text-neutral-muted
                           focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-1
                           transition-shadow"
              />
            </div>

            {/* Submit button */}
            <button
              id="ca-login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-navy text-neutral-surface
                         font-sans font-extrabold text-sm tracking-wide
                         border-[2px] border-brand-navy rounded-[12px]
                         shadow-[4px_4px_0px_0px_#1E3A8A]
                         hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#1E3A8A]
                         active:translate-y-1 active:shadow-none
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all duration-100"
            >
              {loading ? 'Signing in…' : 'Sign in to Workspace'}
            </button>
          </form>

          {/* Divider + MSME owner link */}
          <div className="mt-6 pt-5 border-t-[2px] border-brand-navy/10">
            <p className="font-sans text-xs text-center text-neutral-muted">
              Are you an MSME business owner?{' '}
              <a
                href="/auth/owner-login"
                className="font-bold text-accent-purple underline underline-offset-2 hover:text-brand-blue transition-colors"
              >
                Sign in here →
              </a>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-4 text-center font-sans text-[11px] text-neutral-muted">
          Secured by end-to-end encrypted JWT authentication
        </p>
      </div>
    </main>
  );
}
