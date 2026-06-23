import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceEngineService } from './compliance-engine.service';

describe('ComplianceEngineService', () => {
  let service: ComplianceEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplianceEngineService],
    }).compile();

    service = module.get<ComplianceEngineService>(ComplianceEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
