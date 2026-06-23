import { Injectable, Logger } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class TallyParserService {
  private readonly logger = new Logger(TallyParserService.name);

  parseXml(buffer: Buffer): any {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const xmlData = buffer.toString('utf8');
    
    try {
      const jsonObj = parser.parse(xmlData);
      this.logger.log(`Parsed Tally XML successfully`);
      return jsonObj;
    } catch (error) {
      this.logger.error(`Failed to parse XML: ${error.message}`);
      throw error;
    }
  }
}
