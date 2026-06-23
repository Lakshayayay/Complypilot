/**
 * CA Workspace Layout Shell
 * Desktop-oriented: sidebar + top nav for CA Dashboard screens.
 * Full navigation components will be built in Phase 2 (Step 2.3 — CA Dashboard).
 */
export default function CALayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-neutral-canvas overflow-hidden">
      {/* ── Left Sidebar (Phase 2 stub) ─── */}
      <aside className="w-64 shrink-0 bg-neutral-surface border-r-[2px] border-brand-navy flex flex-col">
        {/* Brand mark */}
        <div className="px-6 py-5 border-b-[2px] border-brand-navy">
          <span className="font-sans font-extrabold text-xl text-brand-navy">Comply</span>
          <span className="font-sans font-extrabold text-xl text-accent-purple">Pilot</span>
          <span className="block font-sans text-[10px] text-neutral-muted uppercase tracking-widest mt-0.5">
            CA Workspace
          </span>
        </div>

        {/* Nav items placeholder */}
        <nav className="flex-1 px-4 py-6 space-y-1" aria-label="CA navigation">
          {['Dashboard', 'Clients', 'Approvals'].map((item) => (
            <div
              key={item}
              className="px-3 py-2.5 rounded-[8px] font-sans font-semibold text-sm text-neutral-muted
                         hover:bg-neutral-canvas hover:text-brand-navy cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t-[2px] border-brand-navy/10">
          <span className="font-handwritten text-accent-purple text-sm">Phase 2 →</span>
        </div>
      </aside>

      {/* ── Main content area ─── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
