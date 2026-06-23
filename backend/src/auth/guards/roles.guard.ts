import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Enforces role-based access control at the route level.
 *
 * Usage (always combine with JwtAuthGuard which populates request.user):
 *   @UseGuards(JwtAuthGuard, RolesGuard)
 *   @Roles(UserRole.CA_PARTNER)
 *   @Get('/clients')
 *   getClients() { ... }
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve the roles required by the route handler (or controller)
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no @Roles() decorator is present, the route is open to all authenticated users
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Fastify: request object is context.switchToHttp().getRequest()
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('No authenticated user found on request.');
    }

    const hasRole = requiredRoles.includes(user.role as UserRole);

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required role(s): ${requiredRoles.join(', ')}. Your role: ${user.role}.`,
      );
    }

    return true;
  }
}
