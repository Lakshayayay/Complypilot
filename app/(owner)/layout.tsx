/**
 * MSME Owner Portal Layout Shell
 * Mobile-first: bottom navigation bar for Owner Portal screens.
 * Full navigation components will be built in Phase 2 (Step 2.5 — Owner Dashboard).
 */
export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-canvas">
      {/* ── Mobile top bar ─── */}
      <header className="sticky top-0 z-30 bg-brand-navy border-b-[2px] border-accent-gold px-4 py-3 flex items-center justify-between">
        <div>
          <span className="font-sans font-extrabold text-lg text-neutral-surface">Comply</span>
          <span className="font-sans font-extrabold text-lg text-accent-gold">Pilot</span>
        </div>
        <span className="font-sans text-[10px] text-neutral-surface/60 uppercase tracking-widest">
          Owner Portal
        </span>
      </header>

      {/* ── Scrollable content ─── */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* ── Bottom navigation bar (mobile) ─── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30
                   bg-neutral-surface border-t-[2px] border-brand-navy
                   flex items-center justify-around px-2 py-3"
        aria-label="Owner navigation"
      >
        {['Dashboard', 'Compliance', 'Credit'].map((item) => (
          <button
            key={item}
            className="flex flex-col items-center gap-0.5
                       font-sans text-[10px] font-bold text-neutral-muted uppercase tracking-wider
                       hover:text-accent-purple transition-colors px-3 py-1"
          >
            <span className="h-5 w-5 rounded-[4px] bg-neutral-canvas border border-brand-navy/20" aria-hidden />
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}
