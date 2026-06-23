import { Test, TestingModule } from '@nestjs/testing';
import { TallyParserService } from './tally-parser.service';

describe('TallyParserService', () => {
  let service: TallyParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TallyParserService],
    }).compile();

    service = module.get<TallyParserService>(TallyParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
