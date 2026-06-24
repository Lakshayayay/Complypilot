import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CreditService {
  constructor(private prisma: PrismaService) {}

  async getPassport(clientId: string) {
    // Verify client exists
    const client = await this.prisma.client.findUnique({
      where: { id: clientId }
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    let passport = await this.prisma.creditPassport.findUnique({
      where: { clientId }
    });

    if (!passport) {
      // Mock creation for MVP Phase 6
      passport = await this.prisma.creditPassport.create({
        data: {
          clientId,
          filingHealth: 95.5,
          auditedRevenue: 12500000.00,
          spcbStatusSecure: true,
        }
      });
    }

    return passport;
  }

  async triggerOcenConsent(clientId: string, amount: number) {
    // Mock Sahamati Account Aggregator consent flow
    return {
      success: true,
      message: `Consent request triggered via Sahamati AA for ₹${amount.toLocaleString('en-IN')}. Awaiting user approval.`,
      consentUrl: `https://mock-aa.sahamati.org.in/consent?clientId=${clientId}&amount=${amount}`
    };
  }

  async exportToTreds(clientId: string, invoiceIds: string[]) {
    // Mock export to TReDS APIs (M1xchange / Invoicemart)
    return {
      success: true,
      message: `Successfully exported ${invoiceIds.length} verified invoices to TReDS.`,
      tredsReference: `TRDS-${Math.floor(Math.random() * 1000000)}`,
      status: 'AWAITING_BIDS'
    };
  }
}
