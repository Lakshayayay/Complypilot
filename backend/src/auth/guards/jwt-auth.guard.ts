import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Thin wrapper around Passport's JWT strategy guard.
 * Apply to any controller or route handler that requires a valid JWT.
 *
 * Usage:
 *   @UseGuards(JwtAuthGuard)
 *   @Get('/protected')
 *   getProtected(@Request() req) { return req.user; }
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
