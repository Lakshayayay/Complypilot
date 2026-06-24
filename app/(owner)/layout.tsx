'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Shield, CreditCard } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/owner/dashboard', Icon: Home },
  { label: 'Compliance', href: '/owner/compliance', Icon: Shield },
  { label: 'Credit', href: '/owner/credit', Icon: CreditCard },
] as const;

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    // Gray desktop backdrop — makes the mobile shell "float" on a desktop browser
    <div className="min-h-screen bg-slate-300 flex justify-center">
      {/* Mobile shell: mimics a phone viewport centered on the screen */}
      <div className="relative w-full max-w-md h-screen border-x border-gray-300 shadow-2xl bg-neutral-canvas flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 z-30 bg-brand-navy border-b-[2px] border-accent-gold px-4 py-3 flex items-center justify-between">
          <div>
            <span className="font-sans font-extrabold text-lg text-neutral-surface">Comply</span>
            <span className="font-sans font-extrabold text-lg text-accent-gold">Pilot</span>
          </div>
          <span className="font-sans text-[10px] text-neutral-surface/60 uppercase tracking-widest">
            Owner Portal
          </span>
        </header>

        {/* Scrollable content — padded so it clears the bottom nav */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20">
          {children}
        </main>

        {/* Bottom nav — absolute within the shell, not fixed to the full viewport */}
        <nav
          className="absolute bottom-0 left-0 right-0 z-30 bg-neutral-surface border-t-[2px] border-brand-navy flex items-center justify-around px-2 py-3"
          aria-label="Owner navigation"
        >
          {NAV_ITEMS.map(({ label, href, Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1 transition-colors ${
                  isActive ? 'text-accent-purple' : 'text-neutral-muted hover:text-accent-purple'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? 'text-accent-purple' : 'text-neutral-muted'}`}
                  aria-hidden
                />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
