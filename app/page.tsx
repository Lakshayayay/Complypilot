import Link from "next/link";
import { Building2, Users, ArrowRight, ShieldCheck, Sparkles, FileText, CheckCircle2, BadgePercent, Coins, HelpCircle } from "lucide-react";

export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-canvas text-brand-navy relative overflow-hidden font-sans">
      {/* Premium Glassmorphic Gradient Orbs */}
      <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] bg-accent-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] bg-brand-teal/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b-[2px] border-brand-navy/10 z-20">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-2xl tracking-tight text-brand-navy">Comply</span>
          <span className="font-extrabold text-2xl tracking-tight text-accent-purple">Pilot</span>
          <div className="badge bg-brand-teal/10 text-brand-teal border-brand-teal/30 ml-2 animate-pulse normal-case">
            System Live
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-neutral-muted">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-accent-mint" />
            Backend Port: 3001
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-accent-purple" />
            Frontend Port: 3000
          </span>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="text-center pt-16 pb-8 px-4 z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          The Unified Compliance & Financing Hub
        </h1>
        <p className="text-neutral-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Connecting MSME owners and Chartered Accountants into a single collaborative workspace powered by grounded AI and embedded lending.
        </p>
        <span className="font-handwritten text-accent-purple text-2xl mt-4 block rotate-[-1deg] select-none">
          Click below to explore the connected dashboards! ✓
        </span>
      </section>

      {/* Main Portals Split */}
      <section className="max-w-6xl w-full mx-auto px-6 grid md:grid-cols-2 gap-8 z-10 mb-12">
        
        {/* Portal A: CA Dashboard Console */}
        <div className="card-sticker p-8 bg-neutral-surface flex flex-col justify-between border-[2px] border-brand-navy shadow-sticker relative">
          <div className="absolute top-4 right-4 bg-brand-teal/15 text-brand-teal border border-brand-teal/30 rounded-badge px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider">
            Phase 1, 2, 4, 5 Complete
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-badge bg-brand-teal/10 flex items-center justify-center border-[2px] border-brand-navy">
                <Users className="h-6 w-6 text-brand-teal" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-muted font-bold uppercase tracking-widest block">AUDITOR PORTAL</span>
                <h2 className="font-extrabold text-2xl text-brand-navy">CA Partner Console</h2>
              </div>
            </div>

            <p className="text-sm text-neutral-muted leading-relaxed mb-6">
              Empowering CAs with clients portfolio metrics, collaborative deadline calendars, deterministic GSTR-2B vs. Tally reconciliations, and SPCB category tracking.
            </p>

            {/* Feature Checkmarks */}
            <div className="space-y-3 mb-8">
              {[
                "Shared Workspace & Real-time Commenting",
                "SPCB Pollution Category & Safety Tracker",
                "GSTR-2B vs Tally Auditing Engine (Phase 5)"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-brand-navy">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Credentials Card */}
            <div className="bg-neutral-canvas border border-brand-navy rounded-sticker p-4 mb-6">
              <span className="text-[10px] font-extrabold text-brand-navy block mb-2 uppercase tracking-wider">
                🔑 CA DEMO CREDENTIALS
              </span>
              <div className="text-xs text-neutral-muted space-y-1.5 font-sans">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <code className="bg-neutral-surface px-1.5 py-0.5 rounded border border-brand-navy/10 font-mono font-bold text-brand-navy">ca@test.com</code>
                </div>
                <div className="flex justify-between">
                  <span>Password:</span>
                  <code className="bg-neutral-surface px-1.5 py-0.5 rounded border border-brand-navy/10 font-mono font-bold text-brand-navy">Admin@33596708</code>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/auth/ca-login" className="btn-primary w-full flex items-center justify-center gap-2 group">
              <span>Login to CA Console</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/ca/dashboard" className="text-xs text-center block text-brand-blue font-bold hover:underline">
              Bypass directly to CA Dashboard →
            </Link>
          </div>
        </div>

        {/* Portal B: MSME Owner Portal */}
        <div className="card-sticker p-8 bg-neutral-surface flex flex-col justify-between border-[2px] border-brand-navy shadow-sticker relative">
          <div className="absolute top-4 right-4 bg-accent-purple/15 text-accent-purple border border-accent-purple/30 rounded-badge px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider">
            Phase 3, 4, 6 Complete
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-badge bg-accent-purple/10 flex items-center justify-center border-[2px] border-brand-navy">
                <Building2 className="h-6 w-6 text-accent-purple" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-muted font-bold uppercase tracking-widest block">CLIENT PORTAL</span>
                <h2 className="font-extrabold text-2xl text-brand-navy">MSME Owner Portal</h2>
              </div>
            </div>

            <p className="text-sm text-neutral-muted leading-relaxed mb-6">
              Providing business owners with immediate tax filing health scores, mock AI notice translation summaries, OCEN working capital bridges, and TReDS invoice discounting.
            </p>

            {/* Feature Checkmarks */}
            <div className="space-y-3 mb-8">
              {[
                "Credit Readiness Passport & PDF Export",
                "Mock OCEN Working Capital Bridge (Up to ₹50L)",
                "TReDS Bill Discounting & Invoice Export"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-brand-navy">
                  <CheckCircle2 className="h-4 w-4 text-accent-purple shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Credentials Card */}
            <div className="bg-neutral-canvas border border-brand-navy rounded-sticker p-4 mb-6">
              <span className="text-[10px] font-extrabold text-brand-navy block mb-2 uppercase tracking-wider">
                🔑 OWNER DEMO CREDENTIALS
              </span>
              <div className="text-xs text-neutral-muted space-y-1.5 font-sans">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <code className="bg-neutral-surface px-1.5 py-0.5 rounded border border-brand-navy/10 font-mono font-bold text-brand-navy">owner@test.com</code>
                </div>
                <div className="flex justify-between">
                  <span>Password:</span>
                  <code className="bg-neutral-surface px-1.5 py-0.5 rounded border border-brand-navy/10 font-mono font-bold text-brand-navy">Admin@33596708</code>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/auth/owner-login" className="btn-primary w-full flex items-center justify-center gap-2 group">
              <span>Login to Owner Portal</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/owner/dashboard" className="text-xs text-center block text-brand-blue font-bold hover:underline">
              Bypass directly to Owner Dashboard →
            </Link>
          </div>
        </div>

      </section>

      {/* Shared Drop Zone Feature Banner */}
      <section className="max-w-6xl w-full mx-auto px-6 mb-16 z-10">
        <div className="card-sticker p-6 bg-neutral-surface flex flex-col md:flex-row items-center justify-between gap-6 border-dashed border-[2px]">
          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-badge bg-accent-gold/15 flex items-center justify-center border-[2px] border-brand-navy shrink-0">
              <FileText className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <span className="text-[9px] bg-accent-gold/15 text-accent-gold border border-accent-gold/30 rounded-badge px-2 py-0.5 font-extrabold uppercase tracking-wider mb-1 inline-block">
                Phase 3 Public Feature
              </span>
              <h3 className="font-extrabold text-xl text-brand-navy">
                WhatsApp Secure Document Drop-Zone
              </h3>
              <p className="text-xs text-neutral-muted max-w-xl leading-relaxed mt-0.5">
                Simulates a WhatsApp secure drop link. Clients can drag and drop GSTR or Tally XML files without logging in to update compliance calendars.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href={"/drop/demo-token" as any} className="btn-secondary text-center flex items-center justify-center gap-2 whitespace-nowrap">
              <span>Open Drop-Zone</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Footer / Features Breakdown */}
      <footer className="w-full bg-brand-navy text-neutral-surface py-12 px-6 mt-auto border-t-[2px] border-brand-navy">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left">
          <div>
            <h4 className="font-extrabold text-sm text-accent-purple mb-3 uppercase tracking-wider">Architecture (Ph 1)</h4>
            <ul className="text-xs text-neutral-muted space-y-2">
              <li>Next.js 15 Fastify</li>
              <li>Prisma Client ORM</li>
              <li>NextAuth Credentials</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-brand-teal mb-3 uppercase tracking-wider">Ingestion (Ph 3)</h4>
            <ul className="text-xs text-neutral-muted space-y-2">
              <li>Secure drop tokens</li>
              <li>Tally XML parsing</li>
              <li>State auto-update</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-accent-gold mb-3 uppercase tracking-wider">SPCB & AI (Ph 4/5)</h4>
            <ul className="text-xs text-neutral-muted space-y-2">
              <li>Red/Orange category rules</li>
              <li>Gemini AI Summarization</li>
              <li>GSTR-2B vs Tally Recon</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-accent-purple mb-3 uppercase tracking-wider">Financing (Ph 6)</h4>
            <ul className="text-xs text-neutral-muted space-y-2">
              <li>Credit readiness score</li>
              <li>Mock OCEN API Bridge</li>
              <li>TReDS Bill Discounting</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl w-full mx-auto border-t border-neutral-muted/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-muted">
          <p>© 2026 ComplyPilot. All rights reserved.</p>
          <p>Created by Antigravity AI</p>
        </div>
      </footer>
    </main>
  );
}

