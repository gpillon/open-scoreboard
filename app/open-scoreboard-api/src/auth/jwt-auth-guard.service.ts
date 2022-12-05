import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

export function JwtAuthGuard() {
  return applyDecorators(
    UseGuards(AuthGuard(['jwt', 'jwtQuery'])),
    ApiBearerAuth(),
    ApiBearerAuth('token'),
  );
}
