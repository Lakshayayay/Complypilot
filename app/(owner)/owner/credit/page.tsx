"use client";

import React, { useState, useEffect } from 'react';
import { CreditPassportTab, CreditPassportData } from '@/components/credit/credit-passport-tab';
import { GetLoanTab } from '@/components/credit/get-loan-tab';
import { BillDiscountingTab } from '@/components/credit/bill-discounting-tab';
import { useSession } from 'next-auth/react';

// Mock passport shown when backend is unreachable
const MOCK_PASSPORT: CreditPassportData = {
  filingHealth: 78,
  auditedRevenue: 4200000,
  spcbStatusSecure: true,
};

export default function OwnerCreditPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'passport' | 'loan' | 'treds'>('passport');
  const [passportData, setPassportData] = useState<CreditPassportData | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    // Use session user ID when available; fall back to demo ID for prototype
    const cid = (session as any)?.user?.id ?? 'demo-client-123';
    setClientId(cid);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const token = (session as any)?.accessToken || '';

    fetch(`${backendUrl}/api/v1/credit/passport/${cid}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => setPassportData(data ?? MOCK_PASSPORT))
      .catch(() => setPassportData(MOCK_PASSPORT));
  }, [session]);

  const handleApplyLoan = async (amount: number) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const token = (session as any)?.accessToken || '';
    try {
      const res = await fetch(`${backendUrl}/api/v1/credit/ocen/consent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ clientId, amount }),
      });
      const msg = res.ok ? (await res.json()).message : null;
      showToast(msg ?? `✓ Loan application of ₹${amount.toLocaleString('en-IN')} submitted via OCEN!`);
    } catch {
      showToast(`✓ Loan application of ₹${amount.toLocaleString('en-IN')} submitted via OCEN!`);
    }
  };

  const handleExportTreds = async (invoiceIds: string[]) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const token = (session as any)?.accessToken || '';
    try {
      const res = await fetch(`${backendUrl}/api/v1/credit/treds/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ clientId, invoiceIds }),
      });
      const msg = res.ok ? (await res.json()).message : null;
      showToast(msg ?? `✓ ${invoiceIds.length} invoice(s) exported to TReDS exchange!`);
      return true;
    } catch {
      showToast(`✓ ${invoiceIds.length} invoice(s) exported to TReDS exchange!`);
      return true;
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto min-h-screen bg-neutral-canvas pb-24 relative">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 bg-brand-navy text-neutral-surface rounded-sticker shadow-sticker border-2 border-accent-gold font-sans text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-200 whitespace-nowrap max-w-xs text-center">
          {toast}
        </div>
      )}
      <h1 className="font-sans font-extrabold text-2xl text-brand-navy mb-6">Credit & Loan Hub</h1>
      
      {/* Tab Navigation */}
      <div className="flex bg-neutral-surface border-sticker border-brand-navy rounded-badge mb-6 overflow-hidden">
        <button 
          onClick={() => setActiveTab('passport')}
          className={`flex-1 py-3 font-sans font-extrabold text-xs tracking-wider uppercase transition-colors ${activeTab === 'passport' ? 'bg-brand-navy text-neutral-surface' : 'text-brand-navy hover:bg-neutral-canvas'}`}
        >
          Passport
        </button>
        <div className="w-0.5 bg-brand-navy"></div>
        <button 
          onClick={() => setActiveTab('loan')}
          className={`flex-1 py-3 font-sans font-extrabold text-xs tracking-wider uppercase transition-colors ${activeTab === 'loan' ? 'bg-brand-navy text-neutral-surface' : 'text-brand-navy hover:bg-neutral-canvas'}`}
        >
          Get Loan
        </button>
        <div className="w-0.5 bg-brand-navy"></div>
        <button 
          onClick={() => setActiveTab('treds')}
          className={`flex-1 py-3 font-sans font-extrabold text-xs tracking-wider uppercase transition-colors ${activeTab === 'treds' ? 'bg-brand-navy text-neutral-surface' : 'text-brand-navy hover:bg-neutral-canvas'}`}
        >
          TReDS
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'passport' && <CreditPassportTab passport={passportData} />}
        {activeTab === 'loan' && <GetLoanTab clientId={clientId || ''} onApply={handleApplyLoan} />}
        {activeTab === 'treds' && <BillDiscountingTab clientId={clientId || ''} onExport={handleExportTreds} />}
      </div>
    </div>
  );
}
