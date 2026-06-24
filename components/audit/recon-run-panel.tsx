'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Play, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { ReconGrid, Discrepancy } from './recon-grid';

// Mock data for demonstration when no files are uploaded
const MOCK_TALLY = [
  { gstin: '03AABCU9603R1ZJ', invoiceNumber: 'INV-2024-001', igst: 9000, cgst: 0, sgst: 0, vendorName: 'Punjab Chemicals Ltd', invoiceDate: '2024-03-15' },
  { gstin: '07AAACG1234M1Z5', invoiceNumber: 'INV-2024-087', igst: 50000, cgst: 0, sgst: 0, vendorName: 'Delhi Auto Parts Co', invoiceDate: '2024-03-20' },
  { gstin: '27AABCT1332L1ZE', invoiceNumber: 'INV-2024-112', igst: 12500, cgst: 0, sgst: 0, vendorName: 'Maharashtra Textiles', invoiceDate: '2024-03-22' },
  { gstin: '06AAACR5055K1Z1', invoiceNumber: 'INV-2024-203', igst: 3200, cgst: 0, sgst: 0, vendorName: 'Haryana Steel Corp', invoiceDate: '2024-03-28' },
];

const MOCK_GSTR2B = [
  // INV-001: ₹0.50 difference — should NOT be flagged (within tolerance)
  { gstin: '03AABCU9603R1ZJ', invoiceNumber: 'INV-2024-001', igst: 9000.50, cgst: 0, sgst: 0, vendorName: 'Punjab Chemicals Ltd', invoiceDate: '2024-03-15' },
  // INV-087: ₹500 difference — SHOULD be flagged as AMOUNT_MISMATCH
  { gstin: '07AAACG1234M1Z5', invoiceNumber: 'INV-2024-087', igst: 49500, cgst: 0, sgst: 0, vendorName: 'Delhi Auto Parts Co', invoiceDate: '2024-03-20' },
  // INV-112: MISSING from 2B — SHOULD be flagged as MISSING_IN_2B (not in this array)
  // INV-203: ₹3200 matches — no flag
  { gstin: '06AAACR5055K1Z1', invoiceNumber: 'INV-2024-203', igst: 3200, cgst: 0, sgst: 0, vendorName: 'Haryana Steel Corp', invoiceDate: '2024-03-28' },
];

interface ReconRunPanelProps {
  backendUrl: string;
  deadlineId?: string;
}

type RunState = 'idle' | 'running' | 'done' | 'error';

// Deterministic local reconciliation — mirrors the backend logic exactly.
// Runs client-side when the NestJS API is unreachable.
function runLocalRecon(
  internalPurchases: typeof MOCK_TALLY,
  gstr2bData: typeof MOCK_GSTR2B,
): Discrepancy[] {
  const ABS_TOLERANCE = 1.0;
  const PCT_TOLERANCE = 0.01;

  const g2bMap = new Map(
    gstr2bData.map((r) => [`${r.gstin.toUpperCase()}::${r.invoiceNumber}`, r]),
  );

  const results: Discrepancy[] = [];

  for (const row of internalPurchases) {
    const key = `${row.gstin.toUpperCase()}::${row.invoiceNumber}`;
    const match = g2bMap.get(key);
    const tallyTotal = row.igst + row.cgst + row.sgst;

    if (!match) {
      results.push({
        type: 'MISSING_IN_2B',
        invoiceNumber: row.invoiceNumber,
        invoiceDate: row.invoiceDate,
        gstin: row.gstin,
        vendorName: row.vendorName,
        tallyIgst: row.igst,
        tallyCgst: row.cgst,
        tallySgst: row.sgst,
        tallyTotal,
        gstr2bIgst: null,
        gstr2bCgst: null,
        gstr2bSgst: null,
        gstr2bTotal: null,
        totalDifference: null,
        percentageDifference: null,
      });
      continue;
    }

    const gstTotal = match.igst + match.cgst + match.sgst;
    const diff = Math.abs(tallyTotal - gstTotal);
    const pctDiff = tallyTotal > 0 ? diff / tallyTotal : 0;

    if (diff > ABS_TOLERANCE && pctDiff > PCT_TOLERANCE) {
      results.push({
        type: 'AMOUNT_MISMATCH',
        invoiceNumber: row.invoiceNumber,
        invoiceDate: row.invoiceDate,
        gstin: row.gstin,
        vendorName: row.vendorName,
        tallyIgst: row.igst,
        tallyCgst: row.cgst,
        tallySgst: row.sgst,
        tallyTotal,
        gstr2bIgst: match.igst,
        gstr2bCgst: match.cgst,
        gstr2bSgst: match.sgst,
        gstr2bTotal: gstTotal,
        totalDifference: gstTotal - tallyTotal,
        percentageDifference: pctDiff,
      });
    }
  }

  return results;
}

export function ReconRunPanel({ backendUrl, deadlineId }: ReconRunPanelProps) {
  const { data: session } = useSession();
  const [runState, setRunState] = useState<RunState>('idle');
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [useMockData, setUseMockData] = useState(true);
  const [tallyJson, setTallyJson] = useState('');
  const [gstr2bJson, setGstr2bJson] = useState('');
  const [ranLocally, setRanLocally] = useState(false);  // true when backend was unreachable

  const handleRun = async () => {
    setRunState('running');
    setErrorMsg('');
    setRanLocally(false);

    const internalPurchases = useMockData ? MOCK_TALLY : JSON.parse(tallyJson);
    const gstr2bData = useMockData ? MOCK_GSTR2B : JSON.parse(gstr2bJson);

    try {
      const res = await fetch(`${backendUrl}/api/v1/recon/reconcile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId: 'demo', deadlineId, internalPurchases, gstr2bData }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();
      setDiscrepancies(data);
      setRunState('done');
    } catch {
      // Backend unreachable — run the same deterministic logic locally
      const localResults = runLocalRecon(internalPurchases, gstr2bData);
      setDiscrepancies(localResults);
      setRanLocally(true);
      setRunState('done');
    }
  };

  return (
    <div className="space-y-5">
      {/* Input Area */}
      <div className="p-4 bg-neutral-surface border-2 border-brand-navy rounded-sticker shadow-sticker-sm">
        {/* Mode Toggle */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-sans font-extrabold text-xs text-brand-navy uppercase tracking-wider">Data Source</span>
          <button
            onClick={() => setUseMockData(true)}
            className={clsx(
              'px-3 py-1 text-xs font-sans font-bold rounded-badge border-2 border-brand-navy transition-all',
              useMockData ? 'bg-brand-navy text-neutral-surface' : 'bg-neutral-surface text-brand-navy hover:bg-neutral-canvas',
            )}
          >
            Demo Dataset
          </button>
          <button
            onClick={() => setUseMockData(false)}
            className={clsx(
              'px-3 py-1 text-xs font-sans font-bold rounded-badge border-2 border-brand-navy transition-all',
              !useMockData ? 'bg-brand-navy text-neutral-surface' : 'bg-neutral-surface text-brand-navy hover:bg-neutral-canvas',
            )}
          >
            Paste JSON
          </button>
        </div>

        {useMockData ? (
          // Demo mode — show what data will be compared
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Tally Internal Purchases', count: MOCK_TALLY.length, color: 'text-brand-blue' },
              { label: 'GSTR-2B Vendor Records', count: MOCK_GSTR2B.length, color: 'text-brand-teal' },
            ].map((item) => (
              <div key={item.label} className="p-3 bg-neutral-canvas border border-brand-navy/30 rounded-sticker">
                <span className="font-sans text-[10px] text-neutral-muted uppercase tracking-wider block">{item.label}</span>
                <span className={clsx('font-sans font-extrabold text-2xl', item.color)}>{item.count}</span>
                <span className="font-sans text-[10px] text-neutral-muted block">records loaded</span>
              </div>
            ))}
          </div>
        ) : (
          // Paste mode
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Tally JSON (internalPurchases)', value: tallyJson, onChange: setTallyJson },
              { label: 'GSTR-2B JSON (gstr2bData)', value: gstr2bJson, onChange: setGstr2bJson },
            ].map((item) => (
              <div key={item.label}>
                <label className="font-sans font-bold text-[10px] text-brand-navy uppercase tracking-wider block mb-1">
                  {item.label}
                </label>
                <textarea
                  value={item.value}
                  onChange={(e) => item.onChange(e.target.value)}
                  placeholder='[{"gstin":"...","invoiceNumber":"...","igst":0,"cgst":0,"sgst":0}]'
                  rows={6}
                  className="w-full p-2 border-2 border-brand-navy rounded-sticker font-mono text-[10px] bg-neutral-canvas focus:outline-none focus:border-accent-purple resize-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Run Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleRun}
          disabled={runState === 'running'}
          className={clsx(
            'flex items-center gap-2 px-5 py-2.5 border-2 border-brand-navy rounded-sticker font-sans font-extrabold text-sm transition-all',
            runState === 'running'
              ? 'bg-neutral-canvas text-neutral-muted cursor-wait'
              : 'bg-brand-navy text-neutral-surface shadow-sticker hover:-translate-y-0.5 hover:shadow-sticker-lg active:translate-y-0',
          )}
        >
          <Play className="h-4 w-4" />
          {runState === 'running' ? 'Running Engine...' : 'Run Reconciliation'}
        </button>

        {runState === 'done' && (
          <span className="font-handwritten text-brand-teal text-lg">
            {discrepancies.length === 0 ? '✓ Books are clean!' : `⚠ ${discrepancies.length} items need attention`}
            {ranLocally && (
              <span className="font-sans font-normal text-[10px] text-neutral-muted ml-2">(ran locally — backend offline)</span>
            )}
          </span>
        )}
      </div>

      {/* Error State */}
      {runState === 'error' && (
        <div className="flex items-start gap-2 p-3 bg-accent-rose/10 border-2 border-accent-rose rounded-sticker">
          <AlertCircle className="h-4 w-4 text-accent-rose shrink-0 mt-0.5" />
          <p className="font-sans text-xs text-accent-rose">{errorMsg}</p>
        </div>
      )}

      {/* Results Grid */}
      {runState === 'done' && (
        <ReconGrid
          discrepancies={discrepancies}
          deadlineId={deadlineId}
          accessToken={session?.accessToken as string | undefined}
          backendUrl={backendUrl}
        />
      )}
    </div>
  );
}
