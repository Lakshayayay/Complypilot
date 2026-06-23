import { Controller, Post, Param, Req, Res, UseGuards, BadRequestException } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TallyParserService } from './tally-parser/tally-parser.service';
import { ExcelParserService } from './excel-parser/excel-parser.service';

@Controller('clients')
export class IngestionController {
  constructor(
    private tallyParser: TallyParserService,
    private excelParser: ExcelParserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/sync-tally')
  async uploadFile(@Param('id') clientId: string, @Req() req: FastifyRequest, @Res() res: FastifyReply) {
    if (!req.isMultipart()) {
      throw new BadRequestException('Request is not multipart');
    }
    
    const data = await req.file();
    if (!data) {
      throw new BadRequestException('File not found in the request');
    }
    
    const fileBuffer = await data.toBuffer();
    
    if (data.filename.endsWith('.xml')) {
      const parsed = this.tallyParser.parseXml(fileBuffer);
      return res.send({ success: true, type: 'xml', clientId, parsed });
    } else if (data.filename.endsWith('.xlsx') || data.filename.endsWith('.xls')) {
      const parsed = this.excelParser.parseExcel(fileBuffer);
      return res.send({ success: true, type: 'excel', clientId, parsed });
    } else {
      throw new BadRequestException('Unsupported file format. Only .xml and .xlsx are supported');
    }
  }
}
