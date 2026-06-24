import React from 'react';
import { Download, ShieldCheck, CheckCircle } from 'lucide-react';

export interface CreditPassportData {
  filingHealth: number;
  auditedRevenue: number;
  spcbStatusSecure: boolean;
}

export function CreditPassportTab({ passport }: { passport: CreditPassportData | null }) {
  if (!passport) {
    return (
      <div className="p-6 text-center animate-pulse">
        <div className="h-12 w-12 bg-neutral-muted/20 rounded-full mx-auto mb-4" />
        <p className="text-brand-navy font-sans font-bold">Generating Passport...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="p-5 bg-neutral-surface border-sticker border-brand-navy rounded-sticker shadow-sticker relative overflow-hidden">
        <div className="absolute -top-3 -right-2 bg-accent-gold text-brand-navy px-2 py-1 rounded-badge font-handwritten text-sm border border-brand-navy rotate-6">
          Ready for Financing!
        </div>
        <h2 className="font-sans font-extrabold text-brand-navy text-xl flex items-center gap-2">
          <ShieldCheck className="text-brand-teal" /> Credit Readiness Passport
        </h2>
        <p className="text-sm text-neutral-muted mt-1 font-sans">
          Your validated compliance and financial history packaged as a secure asset.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-brand-navy/20 rounded-sticker bg-brand-navy/5">
            <span className="text-xs font-bold text-neutral-muted uppercase tracking-wide">GST Filing Health</span>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-2xl font-extrabold text-brand-teal">{passport.filingHealth}%</span>
              <span className="text-xs text-brand-teal mb-1 font-bold">On-time</span>
            </div>
          </div>
          <div className="p-4 border border-brand-navy/20 rounded-sticker bg-brand-navy/5">
            <span className="text-xs font-bold text-neutral-muted uppercase tracking-wide">Audited Revenue</span>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-2xl font-extrabold text-brand-navy">₹{(passport.auditedRevenue / 10000000).toFixed(2)}</span>
              <span className="text-xs text-brand-navy mb-1 font-bold">Cr</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 p-3 bg-accent-mint/10 border border-brand-teal/30 rounded-badge">
          <CheckCircle className="text-brand-teal w-5 h-5" />
          <span className="text-sm font-bold text-brand-navy">SPCB Operational Status: {passport.spcbStatusSecure ? "Secure" : "At Risk"}</span>
        </div>

        <button 
          onClick={() => alert("Downloading Secure PDF Passport...")}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-brand-navy text-neutral-surface font-sans font-bold text-sm border-sticker border-brand-navy rounded-sticker shadow-sticker-sm hover:-translate-y-0.5 hover:shadow-sticker-hover active:translate-y-0 transition-all"
        >
          <Download className="w-4 h-4" /> Export Secure Passport PDF
        </button>
      </div>
    </div>
  );
}
