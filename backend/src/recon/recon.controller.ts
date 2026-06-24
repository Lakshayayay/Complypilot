import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ReconService } from './recon.service';
import { ReconcileDto } from './dto/reconcile.dto';

@Controller('recon')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReconController {
  constructor(private readonly reconService: ReconService) {}

  /**
   * POST /api/v1/recon/reconcile
   * Accepts two JSON arrays: internalPurchases (Tally) and gstr2bData (Govt portal).
   * Returns an array of Discrepancy objects for rendering in the CA Audit Console.
   */
  @Post('reconcile')
  reconcile(@Body() dto: ReconcileDto) {
    return this.reconService.reconcile(dto.internalPurchases, dto.gstr2bData);
  }
}
