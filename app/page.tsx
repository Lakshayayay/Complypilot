/**
 * Root page — temporary scaffold.
 * This will be replaced by a redirect in Step 1.3 once route groups
 * and middleware are established.
 */
export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-canvas px-6">
      <div className="card-sticker max-w-md w-full p-8 text-center">
        {/* Brand lockup */}
        <div className="mb-6">
          <span className="font-sans font-extrabold text-3xl text-brand-navy tracking-tight">
            Comply
          </span>
          <span className="font-sans font-extrabold text-3xl text-accent-purple tracking-tight">
            Pilot
          </span>
        </div>

        {/* Handwritten annotation */}
        <p className="annotation mb-4 block">
          Next.js 15 is live ✓
        </p>

        <p className="font-sans text-sm text-neutral-muted leading-relaxed">
          Foundation scaffold active. Supabase client and route groups are being
          wired in Steps 1.2 → 1.3.
        </p>

        {/* Design token verification stripe */}
        <div className="mt-8 flex gap-2 justify-center flex-wrap">
          {[
            { label: "brand-navy", bg: "bg-brand-navy" },
            { label: "brand-teal", bg: "bg-brand-teal" },
            { label: "accent-gold", bg: "bg-accent-gold" },
            { label: "accent-mint", bg: "bg-accent-mint" },
            { label: "accent-rose", bg: "bg-accent-rose" },
            { label: "accent-purple", bg: "bg-accent-purple" },
          ].map(({ label, bg }) => (
            <div
              key={label}
              className={`${bg} h-6 w-6 rounded-badge border border-brand-navy`}
              title={label}
            />
          ))}
        </div>
        <p className="mt-2 font-sans text-[10px] text-neutral-muted uppercase tracking-widest">
          Design token verification
        </p>
      </div>
    </main>
  );
}
