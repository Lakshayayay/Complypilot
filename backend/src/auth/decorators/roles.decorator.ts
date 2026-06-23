import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

/**
 * Metadata key used by RolesGuard to read required roles.
 */
export const ROLES_KEY = 'roles';

/**
 * Method/class decorator that sets role requirements.
 *
 * Usage:
 *   @Roles(UserRole.CA_PARTNER, UserRole.CA_ARTICLE)
 *   @Get('/clients')
 *   getClients() { ... }
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
