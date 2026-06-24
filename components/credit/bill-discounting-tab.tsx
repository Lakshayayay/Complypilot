import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function BillDiscountingTab({ clientId, onExport }: { clientId: string, onExport: (ids: string[]) => Promise<boolean> }) {
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-001', customer: 'Reliance Retail', amount: 450000, date: '10 May 2026', status: 'VERIFIED', exported: false },
    { id: 'INV-2026-002', customer: 'Tata Motors', amount: 820000, date: '12 May 2026', status: 'VERIFIED', exported: false },
    { id: 'INV-2026-003', customer: 'L&T Construction', amount: 125000, date: '15 May 2026', status: 'VERIFIED', exported: false },
  ]);

  const handleExport = async (id: string) => {
    const success = await onExport([id]);
    if (success) {
      setInvoices(invoices.map(inv => inv.id === id ? { ...inv, exported: true } : inv));
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="mb-4">
        <h2 className="font-sans font-extrabold text-brand-navy text-lg">TReDS Invoice Discounting</h2>
        <p className="text-sm text-neutral-muted">Convert your unpaid GSTR-1 verified invoices into immediate cash flow.</p>
      </div>

      <div className="space-y-3">
        {invoices.map(inv => (
          <div key={inv.id} className="p-4 bg-neutral-surface border border-brand-navy/20 rounded-sticker hover:border-brand-navy transition-colors shadow-sticker-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-bold text-brand-teal bg-accent-mint/20 px-2 py-0.5 rounded-badge border border-brand-teal/20">GSTR-1 MATCHED</span>
                <h3 className="font-bold text-brand-navy mt-2 text-lg">{inv.customer}</h3>
                <span className="text-xs text-neutral-muted block mt-0.5">{inv.id} • {inv.date}</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-brand-navy text-xl">₹{(inv.amount / 100000).toFixed(2)}L</span>
              </div>
            </div>
            
            {inv.exported ? (
              <div className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-neutral-canvas border border-brand-teal/30 rounded-badge text-brand-teal font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Bidding Live on TReDS
              </div>
            ) : (
              <button 
                onClick={() => handleExport(inv.id)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-neutral-surface border-sticker border-brand-navy text-brand-navy font-bold text-sm rounded-sticker hover:-translate-y-0.5 hover:shadow-sticker transition-all"
              >
                <Send className="w-4 h-4" /> Export to TReDS
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
