import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { DocumentStatus } from '@prisma/client';

@Injectable()
export class ComplianceCronService {
  private readonly logger = new Logger(ComplianceCronService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyExpiryCheck() {
    this.logger.log('Running daily expiry check for SPCB & FACTORY_ACT deadlines...');

    const now = new Date();

    // Fetch all active deadlines for SPCB and FACTORY_ACT that are not yet VERIFIED
    const deadlines = await this.prisma.calendarDeadline.findMany({
      where: {
        complianceType: {
          in: ['SPCB', 'FACTORY_ACT'],
        },
        status: {
          not: DocumentStatus.VERIFIED,
        },
      },
    });

    for (const deadline of deadlines) {
      const diffTime = deadline.targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Trigger log notifications for T-90, T-30, T-7 countdown alerts
      if (diffDays === 90 || diffDays === 30 || diffDays === 7) {
        this.logger.warn(
          `Alert Triggered: Deadline "${deadline.title}" for Client ${deadline.clientId} is ${diffDays} days away.`,
        );
        // Future: Wire WhatsApp dispatcher here
      }

      // If deadline is within 30 days and still MISSING → move to PENDING_VERIFICATION (Amber alert)
      if (diffDays <= 30 && diffDays >= 0 && deadline.status === DocumentStatus.MISSING) {
        await this.prisma.calendarDeadline.update({
          where: { id: deadline.id },
          data: { status: DocumentStatus.PENDING_VERIFICATION },
        });
        this.logger.log(`Updated deadline ${deadline.id} to PENDING_VERIFICATION (within 30 days)`);
      } else if (diffDays < 0 && deadline.status !== DocumentStatus.REJECTED) {
        // Deadline has passed and is still not filed → mark as REJECTED (overdue proxy)
        await this.prisma.calendarDeadline.update({
          where: { id: deadline.id },
          data: { status: DocumentStatus.REJECTED },
        });
        this.logger.log(`Updated deadline ${deadline.id} to REJECTED (overdue)`);
      }
    }

    this.logger.log('Daily expiry check completed.');
  }
}
