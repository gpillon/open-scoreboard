import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    let req;

    if (context.getType() === 'http') {
      req = context.switchToHttp().getRequest();
      const { user } = req;
      if (!user) {
        return false;
      }
      const roles = user.roles || [];
      req.roles = roles;
      return requiredRoles.some((role) => roles.includes(role));
    }
  }
}
