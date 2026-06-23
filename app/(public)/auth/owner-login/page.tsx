'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OwnerLoginPage() {
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
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Incorrect email or password. Please try again.');
      return;
    }

    router.push('/owner/dashboard');
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-brand-navy flex flex-col items-center justify-center px-5 py-10">

      {/* ── Brand lockup — inverted for dark background ─────────────────── */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1">
          <span className="font-sans font-extrabold text-3xl text-neutral-surface tracking-tight">
            Comply
          </span>
          <span className="font-sans font-extrabold text-3xl text-accent-gold tracking-tight">
            Pilot
          </span>
        </div>
        <p className="mt-1.5 font-handwritten text-accent-gold text-base rotate-[-1deg]">
          Your compliance, simplified ✓
        </p>
      </div>

      {/* ── Login card ──────────────────────────────────────────────────── */}
      <div className="w-full max-w-sm bg-neutral-surface border-[2px] border-accent-gold rounded-[12px] shadow-[6px_6px_0px_0px_#F59E0B] p-6">

        <h1 className="font-sans font-extrabold text-xl text-brand-navy mb-1">
          Business Owner Sign In
        </h1>
        <p className="font-sans text-xs text-neutral-muted mb-6">
          Access your compliance dashboard and filing status.
        </p>

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

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">

          {/* Email field — touch-friendly height */}
          <div>
            <label
              htmlFor="owner-email"
              className="block font-sans font-bold text-sm text-brand-navy mb-1.5"
            >
              Email address
            </label>
            <input
              id="owner-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@business.com"
              className="w-full px-4 py-4 bg-neutral-canvas
                         border-[2px] border-brand-navy rounded-[12px]
                         font-sans text-base text-brand-navy placeholder:text-neutral-muted
                         focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-1
                         transition-shadow"
            />
          </div>

          {/* Password field — large tap target */}
          <div>
            <label
              htmlFor="owner-password"
              className="block font-sans font-bold text-sm text-brand-navy mb-1.5"
            >
              Password
            </label>
            <input
              id="owner-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-4 bg-neutral-canvas
                         border-[2px] border-brand-navy rounded-[12px]
                         font-sans text-base text-brand-navy placeholder:text-neutral-muted
                         focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-1
                         transition-shadow"
            />
          </div>

          {/* Submit — large touch target (min 56px) */}
          <button
            id="owner-login-submit"
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-accent-gold text-brand-navy
                       font-sans font-extrabold text-base tracking-wide
                       border-[2px] border-brand-navy rounded-[12px]
                       shadow-[4px_4px_0px_0px_#0A192F]
                       hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#0A192F]
                       active:translate-y-1 active:shadow-none
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-all duration-100"
          >
            {loading ? 'Signing in…' : 'Access My Dashboard'}
          </button>
        </form>

        {/* CA link */}
        <div className="mt-5 pt-4 border-t-[2px] border-brand-navy/10">
          <p className="font-sans text-xs text-center text-neutral-muted">
            Are you a Chartered Accountant?{' '}
            <a
              href="/auth/ca-login"
              className="font-bold text-brand-blue underline underline-offset-2 hover:text-accent-purple transition-colors"
            >
              CA Sign in →
            </a>
          </p>
        </div>
      </div>

      {/* Compliance badge */}
      <div className="mt-6 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent-mint" />
        <p className="font-sans text-[11px] text-neutral-surface/60">
          256-bit encrypted · MSME data protected
        </p>
      </div>
    </main>
  );
}
