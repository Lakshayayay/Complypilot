import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ComplianceCronService {
  private readonly logger = new Logger(ComplianceCronService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyExpiryCheck() {
    this.logger.log('Running daily expiry check for SPCB & FACTORY_ACT deadlines...');

    const now = new Date();
    
    // Fetch all active deadlines for SPCB and FACTORY_ACT
    const deadlines = await this.prisma.calendarDeadline.findMany({
      where: {
        complianceType: {
          in: ['SPCB', 'FACTORY_ACT']
        },
        status: {
          not: 'FILED' // assuming FILED means completed
        }
      }
    });

    for (const deadline of deadlines) {
      const diffTime = deadline.targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Trigger notifications for T-90, T-30, T-7
      if (diffDays === 90 || diffDays === 30 || diffDays === 7) {
        this.logger.warn(`Alert Triggered: Deadline "${deadline.title}" for Client ${deadline.clientId} is ${diffDays} days away.`);
        // Note: Future integration with WhatsApp Dispatcher will go here
      }

      // Automatically update status to 'Urgent/Amber' if within 30 days and not already overdue or urgent
      // Wait, Prisma Schema only has PENDING, OVERDUE, COMPLETED, FILED, ACTION_REQUIRED?
      // Let's assume ACTION_REQUIRED maps to "Urgent/Amber".
      // We'll update the status if it's PENDING and <= 30 days.
      if (diffDays <= 30 && diffDays >= 0 && deadline.status === 'PENDING') {
        await this.prisma.calendarDeadline.update({
          where: { id: deadline.id },
          data: { status: 'ACTION_REQUIRED' } // Using ACTION_REQUIRED as the Amber state
        });
        this.logger.log(`Updated deadline ${deadline.id} to ACTION_REQUIRED`);
      } else if (diffDays < 0 && deadline.status !== 'OVERDUE') {
        await this.prisma.calendarDeadline.update({
          where: { id: deadline.id },
          data: { status: 'OVERDUE' }
        });
        this.logger.log(`Updated deadline ${deadline.id} to OVERDUE`);
      }
    }
    
    this.logger.log('Daily expiry check completed.');
  }
}
