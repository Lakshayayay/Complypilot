import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

const BCRYPT_ROUNDS = 12;

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user.
   * Hashes password with bcrypt (12 rounds) before persisting.
   */
  async register(dto: RegisterDto): Promise<AuthResponse> {
    // Check for existing email
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException(
        'An account with this email address already exists.',
      );
    }

    // Hash password — cost factor 12 per prd.md §5 cryptographic standards
    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        fullName: dto.fullName,
        role: dto.role,
        phoneNumber: dto.phoneNumber ?? null,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    const accessToken = this.signToken(user.id, user.email, user.role);

    return { accessToken, user };
  }

  /**
   * Login an existing user.
   * Validates credentials and issues a signed JWT.
   */
  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        passwordHash: true,
      },
    });

    // Use a constant-time comparison to prevent timing attacks
    if (!user) {
      // Perform a dummy hash comparison to prevent timing-based email enumeration
      await bcrypt.compare(dto.password, '$2b$12$dummy.hash.to.prevent.timing');
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const { passwordHash: _, ...safeUser } = user;
    const accessToken = this.signToken(user.id, user.email, user.role);

    return { accessToken, user: safeUser };
  }

  /**
   * Signs a JWT payload containing { sub, email, role }.
   * Matches the payload shape expected by JwtStrategy.validate().
   */
  private signToken(id: string, email: string, role: string): string {
    return this.jwtService.sign({
      sub: id,
      email,
      role: 'authenticated', // Required for Supabase RLS context
      aud: 'authenticated',  // Required for Supabase RLS context
      app_role: role,        // App-level role (CA_PARTNER, CA_ARTICLE, MSME_OWNER)
    });
  }
}
