import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  password: string;

  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters.' })
  fullName: string;

  @IsEnum(UserRole, {
    message: 'Role must be one of: CA_PARTNER, CA_ARTICLE, MSME_OWNER',
  })
  role: UserRole;

  @IsOptional()
  @IsPhoneNumber('IN', { message: 'Please provide a valid Indian phone number.' })
  phoneNumber?: string;
}
