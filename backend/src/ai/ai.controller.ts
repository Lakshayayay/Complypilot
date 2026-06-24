import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiService } from './ai.service';
import { SummarizeNoticeDto } from './dto/summarize-notice.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * POST /api/v1/ai/summarize-notice
   * Accepts raw regulatory text, returns a strictly structured 3-sentence JSON summary.
   * The AI cannot give open-ended legal advice — output is constrained by JSON schema.
   */
  @Post('summarize-notice')
  async summarizeNotice(@Body() dto: SummarizeNoticeDto) {
    return this.aiService.summarizeNotice(dto.noticeText);
  }
}
