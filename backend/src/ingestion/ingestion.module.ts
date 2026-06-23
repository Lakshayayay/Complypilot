import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { TallyParserService } from './tally-parser/tally-parser.service';
import { ExcelParserService } from './excel-parser/excel-parser.service';

@Module({
  controllers: [IngestionController],
  providers: [TallyParserService, ExcelParserService]
})
export class IngestionModule {}
