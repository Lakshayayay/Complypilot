import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * JWT payload shape issued by AuthService.login()
 * Align with Supabase-compatible RLS claims: { sub, email, role, aud, app_role }
 */
export interface JwtPayload {
  sub: string;    // User.id (UUID)
  email: string;
  role: string;   // 'authenticated' for Supabase
  aud: string;    // 'authenticated' for Supabase
  app_role: string; // Custom app role
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      // Extract Bearer token from the Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject expired tokens at the strategy level
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  /**
   * Called after Passport has verified the token signature.
   * We look up the full User record and attach it to request.user.
   */
  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phoneNumber: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User account no longer exists.');
    }

    return user; // Becomes request.user in Fastify
  }
}
