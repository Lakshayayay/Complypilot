import { Injectable, Logger } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class ExcelParserService {
  private readonly logger = new Logger(ExcelParserService.name);

  parseExcel(buffer: Buffer): any {
    try {
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetNameList = workbook.SheetNames;
      
      const parsedData = {};
      
      for (const sheetName of sheetNameList) {
        const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        parsedData[sheetName] = xlData;
      }

      this.logger.log(`Parsed Excel sheet successfully, sheets: ${sheetNameList.join(', ')}`);
      return parsedData;
    } catch (error) {
      this.logger.error(`Failed to parse Excel: ${error.message}`);
      throw error;
    }
  }
}
