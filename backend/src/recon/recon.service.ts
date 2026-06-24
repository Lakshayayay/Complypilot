import { Injectable, Logger } from '@nestjs/common';
import { InvoiceRecordDto } from './dto/reconcile.dto';

export type DiscrepancyType = 'AMOUNT_MISMATCH' | 'MISSING_IN_2B';

export interface Discrepancy {
  type: DiscrepancyType;
  gstin: string;
  invoiceNumber: string;
  vendorName: string;
  invoiceDate: string;
  // Tally (internal) figures
  tallyIgst: number;
  tallyCgst: number;
  tallySgst: number;
  tallyTotal: number;
  // GSTR-2B figures (null if MISSING_IN_2B)
  gstr2bIgst: number | null;
  gstr2bCgst: number | null;
  gstr2bSgst: number | null;
  gstr2bTotal: number | null;
  // Computed delta (null if MISSING_IN_2B)
  totalDifference: number | null;
  percentageDifference: number | null;
}

const ABSOLUTE_TOLERANCE_INR = 1.0; // ₹1.00
const PERCENTAGE_TOLERANCE = 0.01;  // 1%

@Injectable()
export class ReconService {
  private readonly logger = new Logger(ReconService.name);

  /**
   * Deterministic arithmetic GSTR-2B vs. Tally Reconciliation Engine.
   * Zero LLM involvement. Pure number crunching.
   *
   * Matching key: gstin (normalized uppercase, trimmed) + invoiceNumber (uppercase, trimmed)
   *
   * Flags:
   *  - AMOUNT_MISMATCH: abs(tallyTotal - 2bTotal) > ₹1.00 OR > 1% of 2B amount
   *  - MISSING_IN_2B: invoice in Tally but not found in GSTR-2B
   */
  reconcile(
    internalPurchases: InvoiceRecordDto[],
    gstr2bData: InvoiceRecordDto[],
  ): Discrepancy[] {
    const discrepancies: Discrepancy[] = [];

    // Build a lookup map from GSTR-2B using composite key
    const gstr2bMap = new Map<string, InvoiceRecordDto>();
    for (const record of gstr2bData) {
      const key = this.buildKey(record.gstin, record.invoiceNumber);
      gstr2bMap.set(key, record);
    }

    for (const tallyRecord of internalPurchases) {
      const key = this.buildKey(tallyRecord.gstin, tallyRecord.invoiceNumber);
      const gstr2bRecord = gstr2bMap.get(key);

      const tallyTotal = tallyRecord.igst + tallyRecord.cgst + tallyRecord.sgst;

      if (!gstr2bRecord) {
        // Invoice exists in Tally but the vendor has NOT filed it in GSTR-2B.
        // Client cannot claim ITC on this invoice.
        discrepancies.push({
          type: 'MISSING_IN_2B',
          gstin: tallyRecord.gstin,
          invoiceNumber: tallyRecord.invoiceNumber,
          vendorName: tallyRecord.vendorName ?? 'Unknown Vendor',
          invoiceDate: tallyRecord.invoiceDate ?? '',
          tallyIgst: tallyRecord.igst,
          tallyCgst: tallyRecord.cgst,
          tallySgst: tallyRecord.sgst,
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

      // Record exists in both — compare tax amounts
      const gstr2bTotal = gstr2bRecord.igst + gstr2bRecord.cgst + gstr2bRecord.sgst;
      const absoluteDiff = Math.abs(tallyTotal - gstr2bTotal);
      const percentDiff = gstr2bTotal !== 0 ? absoluteDiff / gstr2bTotal : 0;

      // Tolerance: flag only if diff > ₹1.00 AND > 1% (both conditions must hold to reduce noise,
      // unless one is clearly outside bounds)
      const isMismatch =
        absoluteDiff > ABSOLUTE_TOLERANCE_INR || percentDiff > PERCENTAGE_TOLERANCE;

      if (isMismatch) {
        discrepancies.push({
          type: 'AMOUNT_MISMATCH',
          gstin: tallyRecord.gstin,
          invoiceNumber: tallyRecord.invoiceNumber,
          vendorName: tallyRecord.vendorName ?? gstr2bRecord.vendorName ?? 'Unknown Vendor',
          invoiceDate: tallyRecord.invoiceDate ?? gstr2bRecord.invoiceDate ?? '',
          tallyIgst: tallyRecord.igst,
          tallyCgst: tallyRecord.cgst,
          tallySgst: tallyRecord.sgst,
          tallyTotal,
          gstr2bIgst: gstr2bRecord.igst,
          gstr2bCgst: gstr2bRecord.cgst,
          gstr2bSgst: gstr2bRecord.sgst,
          gstr2bTotal,
          totalDifference: parseFloat((tallyTotal - gstr2bTotal).toFixed(2)),
          percentageDifference: parseFloat((percentDiff * 100).toFixed(2)),
        });
      }
    }

    this.logger.log(
      `Reconciliation complete. ${internalPurchases.length} Tally records, ` +
      `${gstr2bData.length} 2B records, ${discrepancies.length} discrepancies found.`,
    );

    return discrepancies;
  }

  private buildKey(gstin: string, invoiceNumber: string): string {
    return `${gstin.toUpperCase().trim()}::${invoiceNumber.toUpperCase().trim()}`;
  }
}
