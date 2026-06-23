import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsappService } from './whatsapp/whatsapp.service';
import * as crypto from 'crypto';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private whatsapp: WhatsappService,
  ) {}

  async requestDropUrl(clientId: string, docType: string, baseUrl: string) {
    const client = await this.prisma.client.findUnique({ where: { id: clientId } });
    if (!client) throw new NotFoundException('Client not found');

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 48); // 48 hours validity

    await this.prisma.secureToken.create({
      data: {
        clientId,
        docType,
        tokenHash,
        expiryDate,
      },
    });

    // In a real app we'd dispatch to client's phone number
    // Here we use a mock placeholder phone number
    await this.whatsapp.dispatchDropZoneLink('mock-phone-number', docType, rawToken, baseUrl);

    return { success: true };
  }

  async validateToken(token: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    const secureToken = await this.prisma.secureToken.findUnique({
      where: { tokenHash },
      include: { client: true },
    });

    if (!secureToken || secureToken.isUsed || secureToken.expiryDate < new Date()) {
      throw new BadRequestException('Token is invalid or expired');
    }

    return { valid: true, clientId: secureToken.clientId, docType: secureToken.docType };
  }

  async confirmUpload(token: string, fileName: string, storagePath: string) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    const secureToken = await this.prisma.secureToken.findUnique({
      where: { tokenHash }
    });

    if (!secureToken || secureToken.isUsed || secureToken.expiryDate < new Date()) {
      throw new BadRequestException('Token is invalid or expired');
    }

    // Mark as used
    await this.prisma.secureToken.update({
      where: { id: secureToken.id },
      data: { isUsed: true },
    });

    // Create Document record
    const document = await this.prisma.document.create({
      data: {
        clientId: secureToken.clientId,
        fileName,
        storagePath,
        status: 'PENDING_VERIFICATION',
      },
    });

    return { success: true, documentId: document.id };
  }
}
