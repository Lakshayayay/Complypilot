import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('compliance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComplianceController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('safety-status/:clientId')
  async getSafetyStatus(@Param('clientId') clientId: string) {
    const deadlines = await this.prisma.calendarDeadline.findMany({
      where: {
        clientId,
        complianceType: {
          in: ['SPCB', 'FACTORY_ACT']
        }
      },
      orderBy: {
        targetDate: 'asc'
      }
    });

    const now = new Date();
    
    // Compute Safety Risk Index
    let isAtRisk = false;
    for (const deadline of deadlines) {
      const diffTime = deadline.targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 30 && deadline.status !== 'FILED') {
        isAtRisk = true;
        break;
      }
    }

    return {
      clientId,
      isAtRisk,
      deadlines
    };
  }
}
