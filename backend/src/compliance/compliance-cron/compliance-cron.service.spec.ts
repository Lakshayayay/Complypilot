import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceCronService } from './compliance-cron.service';

describe('ComplianceCronService', () => {
  let service: ComplianceCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceCronService],
    }).compile();

    service = module.get<ComplianceCronService>(ComplianceCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
