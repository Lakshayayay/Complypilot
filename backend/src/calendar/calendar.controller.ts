import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('calendar')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  /**
   * GET /api/v1/calendar
   * Retrieves calendar deadlines. Supports filtering by query param clientId.
   */
  @Get()
  async getCalendar(
    @Req() req: any,
    @Query('clientId') clientId?: string,
  ) {
    // req.user is attached by JwtStrategy after validation
    return this.calendarService.getCalendar(req.user.id, clientId);
  }

  /**
   * GET /api/v1/calendar/deadlines/:id
   * Retrieves specific deadline details, including documents and comment trails.
   */
  @Get('deadlines/:id')
  async getDeadlineDetails(@Req() req: any, @Param('id') id: string) {
    return this.calendarService.getDeadlineDetails(req.user.id, id);
  }

  /**
   * PATCH /api/v1/calendar/deadlines/:id/status
   * Updates the filing status of a specific deadline.
   */
  @Patch('deadlines/:id/status')
  async updateDeadlineStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.calendarService.updateDeadlineStatus(req.user.id, id, dto.status);
  }

  /**
   * POST /api/v1/calendar/deadlines/:id/comments
   * Appends a comment to a specific deadline thread.
   */
  @Post('deadlines/:id/comments')
  async addComment(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.calendarService.addComment(req.user.id, id, dto.message);
  }
}
