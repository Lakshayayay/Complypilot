import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

/**
 * Auth Controller
 * Prefix: /api/v1/auth (global prefix set in main.ts, 'auth' set here)
 * Routes match BACKEND_STRUCTURE.md §2A exactly.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /api/v1/auth/register
   * Registers a new CA or MSME Owner account.
   * Returns 201 Created with accessToken + user profile.
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * POST /api/v1/auth/login
   * Standard credential-based login for CA and MSME Owner roles.
   * Returns 200 OK with signed JWT accessToken + user profile.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
