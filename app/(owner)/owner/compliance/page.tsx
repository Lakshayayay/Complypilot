'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { SPCBWarningCard } from '@/components/compliance/spcb-warning-card';
import { CustomAlertModal } from '@/components/compliance/custom-alert-modal';
import { NoticeTipCard, AiSummaryResult } from '@/components/ai/notice-tip-card';
import { Sparkles, FileText, Plus, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface CustomAlert {
  id: string;
  title: string;
  expiryDate: string;
  daysRemaining: number;
}

// A realistic sample regulatory notice text for demonstration
const DEMO_NOTICE_TEXT = `PUNJAB POLLUTION CONTROL BOARD — NOTICE NO. PPCB/CTO/2024/0891

Subject: Mandatory Renewal of Consent to Operate (CTO) — Orange Category Industrial Unit

This notice is issued to all Orange Category industrial units operating under the Punjab Pollution Control Board (PPCB) jurisdiction whose existing Consent to Operate is due for renewal before June 30, 2024. 

All concerned units must submit a completed renewal application through the OCMMS online portal (https://ocmms.nic.in) along with the applicable fees and supporting compliance documents including the last 12 months of effluent discharge monitoring reports, stack emission test reports, and solid waste disposal certificates.

Failure to submit the renewal application before the stated deadline will result in automatic sealing of the industrial unit premises under Section 33A of the Water (Prevention and Control of Pollution) Act, 1974, and a penalty of ₹1,00,000 per day of continued non-compliance.`;

// Mock compliance deadlines shown when backend is unreachable
const MOCK_COMPLIANCE_DEADLINES = [
  { id: 'cd-1', title: 'CTO Renewal (Orange Category)', complianceType: 'SPCB', targetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15).toISOString(), status: 'MISSING' },
  { id: 'cd-2', title: 'Factory License Form 2-F', complianceType: 'FACTORY_ACT', targetDate: new Date(new Date().getFullYear(), 9, 31).toISOString(), status: 'PENDING_VERIFICATION' },
];

export default function OwnerCompliancePage() {
  const { data: session } = useSession();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

  const [aiResult, setAiResult] = useState<AiSummaryResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [showAiPanel, setShowAiPanel] = useState(false);

  const [complianceData, setComplianceData] = useState<any>(null);
  const [isAtRisk, setIsAtRisk] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [customAlerts, setCustomAlerts] = useState<CustomAlert[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => {
    // Use session user ID if available, otherwise fall back to demo ID
    const clientId = (session as any)?.user?.id ?? 'demo-client-123';
    setLoadingData(true);
    fetch(`${backendUrl}/api/v1/compliance/safety-status/${clientId}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setComplianceData(data);
          setIsAtRisk(data.isAtRisk);
        } else {
          setComplianceData({ deadlines: MOCK_COMPLIANCE_DEADLINES, isAtRisk: true });
          setIsAtRisk(true);
        }
      })
      .catch(() => {
        setComplianceData({ deadlines: MOCK_COMPLIANCE_DEADLINES, isAtRisk: true });
        setIsAtRisk(true);
      })
      .finally(() => setLoadingData(false));
  }, [session, backendUrl]);

  const handleSummarizeNotice = async () => {
    setAiLoading(true);
    setAiError('');
    setAiResult(null);
    setShowAiPanel(true);

    try {
      const res = await fetch(`${backendUrl}/api/v1/ai/summarize-notice`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noticeText: DEMO_NOTICE_TEXT }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? `Server error ${res.status}`);
      }

      const data = await res.json();
      setAiResult(data);
    } catch (err: any) {
      setAiError(err.message ?? 'Failed to summarize notice. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const deadlines = complianceData?.deadlines || [];

  const handleAlertSaved = (alert: { title: string; expiryDate: string }) => {
    const diffMs = new Date(alert.expiryDate).getTime() - Date.now();
    const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    setCustomAlerts((prev) => [
      ...prev,
      { id: `ca-${Date.now()}`, title: alert.title, expiryDate: alert.expiryDate, daysRemaining },
    ]);
    showToast(`✓ Alert "${alert.title}" saved — you'll be reminded before expiry.`);
  };

  return (
    <div className="min-h-screen bg-neutral-canvas pb-24 relative">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 bg-brand-navy text-neutral-surface rounded-sticker shadow-sticker border-2 border-accent-gold font-sans text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-200 whitespace-nowrap">
          {toast}
        </div>
      )}
      {/* Header */}
      <div
        className={clsx(
          'text-white p-6 pb-14 rounded-b-3xl shadow-md transition-colors',
          isAtRisk ? 'bg-accent-rose' : 'bg-brand-teal',
        )}
      >
        <h1 className="font-sans font-extrabold text-2xl mb-1">Safety & License Center</h1>
        <p className="font-sans text-sm opacity-90">
          {isAtRisk
            ? 'Immediate action required on operational licenses.'
            : 'All factory and environmental licenses are compliant.'}
        </p>
      </div>

      <div className="px-4 -mt-8 max-w-lg mx-auto space-y-4">
        {/* Compliance KPI Card */}
        <div className="bg-neutral-surface border-2 border-brand-navy rounded-sticker shadow-sticker p-5 flex items-center justify-between">
          <div>
            <span className="font-handwritten text-accent-purple text-base block mb-0.5 rotate-1 transform origin-top-left">
              Your SPCB Score ↗
            </span>
            <h2 className="font-sans font-extrabold text-brand-navy text-lg">Compliance Health</h2>
            <div className={clsx('font-sans font-extrabold text-2xl mt-1', isAtRisk ? 'text-accent-rose' : 'text-brand-teal')}>
              {isAtRisk ? 'At Risk' : 'Healthy'}
            </div>
          </div>
          <div
            className={clsx(
              'w-14 h-14 rounded-full border-2 border-brand-navy flex items-center justify-center',
              isAtRisk ? 'bg-accent-rose/10 text-accent-rose' : 'bg-brand-teal/10 text-brand-teal',
            )}
          >
            {isAtRisk ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>

        {/* ─── AI Notice Summarizer Panel ─── */}
        <div className="bg-neutral-surface border-2 border-brand-navy rounded-sticker shadow-sticker-sm p-4">
          {/* Section Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand-navy" />
                <span className="font-sans font-extrabold text-xs uppercase tracking-wider text-brand-navy">
                  Government Notice
                </span>
              </div>
              <p className="font-sans text-[10px] text-neutral-muted mt-1 leading-snug">
                PPCB Notice No. PPCB/CTO/2024/0891 — CTO Renewal
              </p>
            </div>
            <span className="px-2 py-0.5 bg-accent-rose text-white font-sans font-extrabold text-[9px] uppercase tracking-wider rounded-badge border border-brand-navy">
              Action Required
            </span>
          </div>

          {/* AI Tip Card — shown after clicking Summarize */}
          {showAiPanel && (
            <div className="mb-3">
              {aiLoading ? (
                <div className="p-4 bg-accent-purple/10 border-2 border-dashed border-accent-purple/40 rounded-sticker">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-accent-purple animate-pulse" />
                    <span className="font-sans font-extrabold text-xs uppercase tracking-wider text-accent-purple">
                      Gemini AI Reading Notice...
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-accent-purple/20 rounded w-full animate-pulse" />
                    <div className="h-4 bg-accent-purple/20 rounded w-5/6 animate-pulse" />
                    <div className="h-4 bg-accent-purple/20 rounded w-4/6 animate-pulse" />
                  </div>
                </div>
              ) : aiError ? (
                <div className="p-3 bg-accent-rose/10 border-2 border-accent-rose/40 rounded-sticker">
                  <p className="font-sans text-xs text-accent-rose">{aiError}</p>
                  <p className="font-sans text-[10px] text-neutral-muted mt-1">
                    Ensure GEMINI_API_KEY is set in backend/.env
                  </p>
                </div>
              ) : aiResult ? (
                <NoticeTipCard result={aiResult} />
              ) : null}
            </div>
          )}

          {/* Summarize Button */}
          <button
            onClick={handleSummarizeNotice}
            disabled={aiLoading}
            className={clsx(
              'w-full flex items-center justify-center gap-2 py-2.5 border-2 border-brand-navy rounded-sticker font-sans font-extrabold text-xs uppercase tracking-wider transition-all',
              aiLoading
                ? 'bg-neutral-canvas text-neutral-muted cursor-wait'
                : 'bg-neutral-surface text-brand-navy shadow-sticker-sm hover:-translate-y-0.5 hover:shadow-sticker active:translate-y-0',
            )}
          >
            <Sparkles className={clsx('h-3.5 w-3.5', aiLoading && 'animate-pulse')} />
            {aiResult ? 'Re-Summarize with Gemini AI' : 'Summarize This Notice with AI'}
          </button>
        </div>

        {/* Active Deadline Trackers */}
        <h2 className="font-sans font-extrabold text-brand-navy text-lg px-1 pt-1">Active Trackers</h2>

        {loadingData ? (
          <div className="text-center py-8">
            <span className="font-sans text-xs text-neutral-muted">Loading compliance records...</span>
          </div>
        ) : deadlines.length === 0 ? (
          <div className="text-center p-8 bg-neutral-surface border-2 border-dashed border-brand-navy/30 rounded-sticker">
            <p className="font-sans text-sm text-neutral-muted">No active tracking records found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {deadlines.map((deadline: any) => {
              const diffTime = new Date(deadline.targetDate).getTime() - new Date().getTime();
              const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return (
                <SPCBWarningCard
                  key={deadline.id}
                  title={deadline.title}
                  type={deadline.complianceType}
                  targetDate={deadline.targetDate}
                  status={deadline.status}
                  daysRemaining={daysRemaining}
                />
              );
            })}
          </div>
        )}

        {/* Custom Alerts — saved locally when backend is unreachable */}
        {customAlerts.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-sans font-extrabold text-brand-navy text-sm px-1 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-teal" />
              My Custom Alerts
            </h3>
            {customAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 bg-neutral-surface border-2 border-brand-navy rounded-sticker shadow-sticker-sm flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-sans font-extrabold text-sm text-brand-navy">{alert.title}</p>
                  <p className="font-sans text-[11px] text-neutral-muted mt-0.5">
                    Expires: {new Date(alert.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-badge text-[10px] font-sans font-extrabold uppercase border border-brand-navy ${alert.daysRemaining <= 30 ? 'bg-accent-rose/10 text-accent-rose' : alert.daysRemaining <= 90 ? 'bg-accent-gold/10 text-brand-navy' : 'bg-accent-mint/10 text-brand-teal'}`}>
                  {alert.daysRemaining}d
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Custom Alert Modal — "+ Add Custom Alert" triggers Radix Dialog */}
        <CustomAlertModal
          clientId={(session as any)?.user?.id ?? 'demo-client-123'}
          onSave={handleAlertSaved}
        />

        {/* Add Custom Alert label hint */}
        <div className="flex items-center gap-1.5 justify-center pb-2">
          <Plus className="h-3.5 w-3.5 text-neutral-muted" />
          <span className="font-sans text-[11px] text-neutral-muted">Add boiler inspection, trade license, fire NOC, etc.</span>
        </div>
      </div>
    </div>
  );
}
