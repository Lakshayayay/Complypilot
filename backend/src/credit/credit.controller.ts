import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { CreditService } from './credit.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('credit')
@UseGuards(JwtAuthGuard)
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Get('passport/:clientId')
  async getPassport(@Param('clientId') clientId: string) {
    return this.creditService.getPassport(clientId);
  }

  @Post('ocen/consent')
  async triggerOcenConsent(@Body() body: { clientId: string; amount: number }) {
    return this.creditService.triggerOcenConsent(body.clientId, body.amount);
  }

  @Post('treds/export')
  async exportToTreds(@Body() body: { clientId: string; invoiceIds: string[] }) {
    return this.creditService.exportToTreds(body.clientId, body.invoiceIds);
  }
}
