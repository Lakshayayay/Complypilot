'use client';

import React from 'react';
import clsx from 'clsx';

export interface Discrepancy {
  type: 'AMOUNT_MISMATCH' | 'MISSING_IN_2B';
  gstin: string;
  invoiceNumber: string;
  vendorName: string;
  invoiceDate: string;
  tallyIgst: number;
  tallyCgst: number;
  tallySgst: number;
  tallyTotal: number;
  gstr2bIgst: number | null;
  gstr2bCgst: number | null;
  gstr2bSgst: number | null;
  gstr2bTotal: number | null;
  totalDifference: number | null;
  percentageDifference: number | null;
}

interface ReconGridProps {
  discrepancies: Discrepancy[];
  deadlineId?: string;
  accessToken?: string;
  backendUrl: string;
}

const fmt = (n: number | null) =>
  n === null ? '—' : `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function ReconGrid({ discrepancies, deadlineId, accessToken, backendUrl }: ReconGridProps) {
  const [flaggedRows, setFlaggedRows] = React.useState<Set<string>>(new Set());
  const [flagging, setFlagging] = React.useState<string | null>(null);

  if (discrepancies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-brand-navy/30 rounded-sticker">
        <span className="font-handwritten text-brand-teal text-2xl mb-2">✓ All Clear!</span>
        <p className="font-sans text-sm text-neutral-muted">
          No discrepancies found between Tally and GSTR-2B records.
        </p>
      </div>
    );
  }

  const handleFlagToClient = async (row: Discrepancy) => {
    if (!deadlineId || !accessToken) return;

    const rowKey = `${row.gstin}::${row.invoiceNumber}`;
    setFlagging(rowKey);

    const message =
      row.type === 'MISSING_IN_2B'
        ? `⚠️ ITC Alert: Vendor "${row.vendorName}" (GSTIN: ${row.gstin}) has not filed invoice #${row.invoiceNumber} in GSTR-2B. We cannot claim ₹${row.tallyTotal.toLocaleString('en-IN')} of Input Tax Credit this month. Please follow up with the vendor.`
        : `⚠️ Amount Mismatch: Invoice #${row.invoiceNumber} from vendor "${row.vendorName}" shows ₹${row.tallyTotal.toLocaleString('en-IN')} in Tally vs ₹${(row.gstr2bTotal ?? 0).toLocaleString('en-IN')} in GSTR-2B — a difference of ₹${Math.abs(row.totalDifference ?? 0).toLocaleString('en-IN')} (${row.percentageDifference}%). Please verify with the vendor before claiming ITC.`;

    try {
      const res = await fetch(`${backendUrl}/api/v1/calendar/deadlines/${deadlineId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        setFlaggedRows((prev) => new Set([...prev, rowKey]));
      }
    } catch (err) {
      console.error('Failed to flag discrepancy to client:', err);
    } finally {
      setFlagging(null);
    }
  };

  return (
    <div className="overflow-x-auto border-2 border-brand-navy rounded-sticker shadow-sticker-sm">
      {/* Summary bar */}
      <div className="px-4 py-2.5 bg-brand-navy text-neutral-surface flex items-center justify-between">
        <span className="font-sans font-extrabold text-xs uppercase tracking-wider">
          Reconciliation Results
        </span>
        <div className="flex items-center gap-4">
          <span className="font-sans text-xs text-neutral-surface/80">
            {discrepancies.filter((d) => d.type === 'AMOUNT_MISMATCH').length} Amount Mismatches
          </span>
          <span className="font-sans text-xs text-neutral-surface/80">
            {discrepancies.filter((d) => d.type === 'MISSING_IN_2B').length} Missing in 2B
          </span>
          <span className="font-sans font-extrabold text-xs px-2 py-0.5 bg-accent-rose text-white rounded-badge">
            {discrepancies.length} Total Flags
          </span>
        </div>
      </div>

      <table className="w-full text-xs font-sans border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-neutral-canvas border-b-2 border-brand-navy">
            <th className="text-left px-3 py-2.5 font-sans font-extrabold text-brand-navy uppercase tracking-wider border-r border-brand-navy/20">Type</th>
            <th className="text-left px-3 py-2.5 font-sans font-extrabold text-brand-navy uppercase tracking-wider border-r border-brand-navy/20">Vendor / GSTIN</th>
            <th className="text-left px-3 py-2.5 font-sans font-extrabold text-brand-navy uppercase tracking-wider border-r border-brand-navy/20">Invoice #</th>
            <th className="text-right px-3 py-2.5 font-sans font-extrabold text-brand-navy uppercase tracking-wider border-r border-brand-navy/20">Tally Total</th>
            <th className="text-right px-3 py-2.5 font-sans font-extrabold text-brand-navy uppercase tracking-wider border-r border-brand-navy/20">GSTR-2B Total</th>
            <th className="text-right px-3 py-2.5 font-sans font-extrabold text-brand-navy uppercase tracking-wider border-r border-brand-navy/20">Δ Diff</th>
            <th className="text-center px-3 py-2.5 font-sans font-extrabold text-brand-navy uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {discrepancies.map((row, idx) => {
            const rowKey = `${row.gstin}::${row.invoiceNumber}`;
            const isFlagged = flaggedRows.has(rowKey);
            const isCurrentlyFlagging = flagging === rowKey;

            return (
              <tr
                key={idx}
                className={clsx(
                  'border-b border-brand-navy/15 transition-colors',
                  row.type === 'MISSING_IN_2B'
                    ? 'bg-accent-rose/10 hover:bg-accent-rose/15'
                    : 'bg-accent-gold/10 hover:bg-accent-gold/15',
                )}
              >
                {/* Error Type Badge */}
                <td className="px-3 py-3 border-r border-brand-navy/20">
                  <span
                    className={clsx(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-badge text-[9px] font-sans font-extrabold uppercase tracking-wider border border-brand-navy',
                      row.type === 'MISSING_IN_2B'
                        ? 'bg-accent-rose text-white'
                        : 'bg-accent-gold/80 text-brand-navy',
                    )}
                  >
                    {row.type === 'MISSING_IN_2B' ? '▲ Missing in 2B' : '■ Mismatch'}
                  </span>
                </td>

                {/* Vendor */}
                <td className="px-3 py-3 border-r border-brand-navy/20">
                  <span className="font-sans font-semibold text-brand-navy block truncate max-w-[160px]">
                    {row.vendorName}
                  </span>
                  <span className="font-sans text-[10px] text-neutral-muted font-mono">
                    {row.gstin}
                  </span>
                </td>

                {/* Invoice # */}
                <td className="px-3 py-3 border-r border-brand-navy/20 font-mono text-brand-navy font-semibold">
                  {row.invoiceNumber}
                  {row.invoiceDate && (
                    <span className="block text-[10px] text-neutral-muted font-sans font-normal">
                      {row.invoiceDate}
                    </span>
                  )}
                </td>

                {/* Tally Total */}
                <td className="px-3 py-3 border-r border-brand-navy/20 text-right font-mono font-semibold text-brand-navy">
                  {fmt(row.tallyTotal)}
                </td>

                {/* 2B Total */}
                <td className="px-3 py-3 border-r border-brand-navy/20 text-right font-mono font-semibold text-brand-navy">
                  {row.type === 'MISSING_IN_2B' ? (
                    <span className="font-sans font-extrabold text-accent-rose text-[10px]">NOT FILED</span>
                  ) : (
                    fmt(row.gstr2bTotal)
                  )}
                </td>

                {/* Difference */}
                <td className="px-3 py-3 border-r border-brand-navy/20 text-right">
                  {row.type === 'MISSING_IN_2B' ? (
                    <span className="font-mono font-extrabold text-accent-rose">
                      {fmt(row.tallyTotal)} lost
                    </span>
                  ) : (
                    <span className="font-mono font-extrabold text-accent-rose">
                      {fmt(row.totalDifference)}
                      <span className="block text-[10px] text-neutral-muted font-sans font-normal">
                        {row.percentageDifference}%
                      </span>
                    </span>
                  )}
                </td>

                {/* Action */}
                <td className="px-3 py-3 text-center">
                  {deadlineId ? (
                    <button
                      onClick={() => handleFlagToClient(row)}
                      disabled={isFlagged || isCurrentlyFlagging || !accessToken}
                      className={clsx(
                        'px-3 py-1.5 text-[10px] font-sans font-extrabold uppercase tracking-wider rounded-sticker border-2 border-brand-navy transition-all',
                        isFlagged
                          ? 'bg-accent-mint/20 text-brand-teal border-brand-teal cursor-default'
                          : isCurrentlyFlagging
                          ? 'bg-neutral-canvas text-neutral-muted cursor-wait'
                          : 'bg-neutral-surface text-brand-navy shadow-sticker-sm hover:-translate-y-0.5 hover:shadow-sticker active:translate-y-0',
                      )}
                    >
                      {isFlagged ? '✓ Flagged' : isCurrentlyFlagging ? 'Sending...' : '⚑ Flag to Client'}
                    </button>
                  ) : (
                    <span className="font-sans text-[10px] text-neutral-muted italic">
                      Select a deadline to flag
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
