import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CalendarModule } from './calendar/calendar.module';
import { ClientsModule } from './clients/clients.module';
import { DocumentsModule } from './documents/documents.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { ComplianceModule } from './compliance/compliance.module';
import { AiModule } from './ai/ai.module';
import { ReconModule } from './recon/recon.module';
import { CreditModule } from './credit/credit.module';

@Module({
  imports: [
    // Make ConfigService available globally (reads from backend/.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ScheduleModule.forRoot(),

    // Global Prisma client — available in all modules without re-importing
    PrismaModule,

    // Authentication: JWT, bcrypt, role guards
    AuthModule,

    // Collaborative Calendar & Realtime Workspace
    CalendarModule,

    // Client Portfolio Management
    ClientsModule,

    DocumentsModule,

    IngestionModule,

    ComplianceModule,

    // Phase 5: Grounded AI Auditing & Reconciliation
    AiModule,
    ReconModule,

    // Phase 6: Credit Readiness & Embedded Financing
    CreditModule,
  ],
})
export class AppModule {}
