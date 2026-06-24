import React, { useState } from 'react';
import { IndianRupee, HandCoins, ArrowRight } from 'lucide-react';

export function GetLoanTab({ clientId, onApply }: { clientId: string, onApply: (amount: number) => void }) {
  const [amount, setAmount] = useState(500000);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="p-5 bg-neutral-surface border-sticker border-brand-navy rounded-sticker shadow-sticker relative">
        <h2 className="font-sans font-extrabold text-brand-navy text-lg flex items-center gap-2 mb-2">
          <HandCoins className="text-accent-purple" /> OCEN Embedded Loan
        </h2>
        <p className="text-sm text-neutral-muted mb-6">
          Instantly apply for an unsecured working capital loan based on your Credit Passport.
        </p>

        <div className="space-y-2 mb-8">
          <label className="font-bold text-sm text-brand-navy uppercase tracking-wide">
            Select Loan Amount
          </label>
          <div className="flex items-center justify-between text-2xl font-extrabold text-brand-navy bg-neutral-canvas p-4 rounded-badge border border-brand-navy/20">
            <IndianRupee className="w-6 h-6 text-neutral-muted" />
            <span>₹{amount.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="100000"
            max="5000000"
            step="100000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-brand-navy mt-4"
          />
          <div className="flex justify-between text-xs font-bold text-neutral-muted">
            <span>₹1L</span>
            <span>₹50L</span>
          </div>
        </div>

        <button 
          onClick={() => onApply(amount)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-brand-blue text-neutral-surface font-sans font-bold text-sm border-sticker border-brand-navy rounded-sticker shadow-sticker-sm hover:-translate-y-0.5 hover:shadow-sticker-hover transition-all"
        >
          Share Consent via AA <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
