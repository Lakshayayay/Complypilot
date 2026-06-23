import { Module } from '@nestjs/common';
import { ComplianceController } from './compliance.controller';
import { ComplianceEngineService } from './compliance-engine/compliance-engine.service';
import { ComplianceCronService } from './compliance-cron/compliance-cron.service';

@Module({
  controllers: [ComplianceController],
  providers: [ComplianceEngineService, ComplianceCronService],
  exports: [ComplianceEngineService]
})
export class ComplianceModule {}
