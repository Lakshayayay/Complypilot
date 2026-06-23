import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { WhatsappService } from './whatsapp/whatsapp.service';

@Module({
  providers: [DocumentsService, WhatsappService],
  controllers: [DocumentsController]
})
export class DocumentsModule {}
