import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../rbac/role.enum';
import { RolesGuard } from '../rbac/roles.guard';
import { JwtAuthGuard } from './jwt-auth-guard.service';
import { Roles } from '../rbac/roles.decorator';

export function JwtAuthRoles(roles: Role[] = [Role.User]) {
  return applyDecorators(JwtAuthGuard(), Roles(roles), UseGuards(RolesGuard));
}
