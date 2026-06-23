import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ComplianceEngineService {
  private readonly logger = new Logger(ComplianceEngineService.name);

  constructor(private prisma: PrismaService) {}

  async generateDeadlinesForClient(clientId: string, state: string, category: string) {
    this.logger.log(`Generating compliance deadlines for Client ${clientId} | State: ${state} | Category: ${category}`);

    const now = new Date();
    const currentYear = now.getFullYear();
    const deadlinesToCreate = [];

    const addYears = (years: number) => {
      const d = new Date();
      d.setFullYear(d.getFullYear() + years);
      return d;
    };

    if (state === 'PUNJAB') {
      const form2fDate = new Date(currentYear, 9, 31); // October 31
      if (form2fDate < now) form2fDate.setFullYear(currentYear + 1);
      
      deadlinesToCreate.push({
        clientId,
        complianceType: 'FACTORY_ACT',
        title: 'Factory License (Form 2-F)',
        targetDate: form2fDate,
        status: 'PENDING'
      });

      let ctoYears = 0;
      if (category === 'RED') ctoYears = 5;
      if (category === 'ORANGE') ctoYears = 5;
      if (category === 'GREEN') ctoYears = 10;

      if (ctoYears > 0) {
        deadlinesToCreate.push({
          clientId,
          complianceType: 'SPCB',
          title: `PPCB Consent to Operate (${category})`,
          targetDate: addYears(ctoYears),
          status: 'PENDING'
        });
      }
    } else if (state === 'DELHI') {
      if (category === 'WHITE') {
        const thirtyDays = new Date();
        thirtyDays.setDate(thirtyDays.getDate() + 30);
        
        deadlinesToCreate.push({
          clientId,
          complianceType: 'SPCB',
          title: 'Online DPCC Undertaking Form',
          targetDate: thirtyDays,
          status: 'PENDING'
        });
      } else {
        let ctoYears = 0;
        if (category === 'RED' || category === 'ORANGE') ctoYears = 5;
        if (category === 'GREEN') ctoYears = 10;

        if (ctoYears > 0) {
          deadlinesToCreate.push({
            clientId,
            complianceType: 'SPCB',
            title: `DPCC Consent to Operate (${category})`,
            targetDate: addYears(ctoYears),
            status: 'PENDING'
          });
        }
      }

      deadlinesToCreate.push({
        clientId,
        complianceType: 'FACTORY_ACT',
        title: 'DFS Fire NOC',
        targetDate: addYears(3),
        status: 'PENDING'
      });
    } else if (state === 'MAHARASHTRA') {
      const janDate = new Date(currentYear, 0, 31);
      const julDate = new Date(currentYear, 6, 31);
      
      let nextFireSafety = janDate;
      if (now > janDate && now <= julDate) {
        nextFireSafety = julDate;
      } else if (now > julDate) {
        nextFireSafety = new Date(currentYear + 1, 0, 31);
      }

      deadlinesToCreate.push({
        clientId,
        complianceType: 'FACTORY_ACT',
        title: 'Form B (Fire Safety)',
        targetDate: nextFireSafety,
        status: 'PENDING'
      });

      let ctoYears = 5; 
      if (category === 'GREEN') ctoYears = 10;
      if (category === 'BLUE') ctoYears = 7; 

      deadlinesToCreate.push({
        clientId,
        complianceType: 'SPCB',
        title: `MPCB Consent to Operate (${category})`,
        targetDate: addYears(ctoYears),
        status: 'PENDING'
      });
    }

    if (deadlinesToCreate.length > 0) {
      await this.prisma.calendarDeadline.createMany({
        data: deadlinesToCreate
      });
      this.logger.log(`Created ${deadlinesToCreate.length} deadlines for client ${clientId}`);
    }
  }
}
