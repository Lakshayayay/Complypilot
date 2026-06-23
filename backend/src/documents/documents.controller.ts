import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FastifyRequest } from 'fastify';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('request-drop-url')
  async requestDropUrl(
    @Body('clientId') clientId: string,
    @Body('docType') docType: string,
    @Req() req: FastifyRequest
  ) {
    // Ideally use process.env.NEXT_PUBLIC_APP_URL, but we fallback to origin or localhost
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return this.documentsService.requestDropUrl(clientId, docType, baseUrl);
  }

  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    return this.documentsService.validateToken(token);
  }

  @Post('confirm-upload')
  async confirmUpload(
    @Body('token') token: string,
    @Body('fileName') fileName: string,
    @Body('storagePath') storagePath: string
  ) {
    return this.documentsService.confirmUpload(token, fileName, storagePath);
  }
}
