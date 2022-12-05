import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetRoles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.roles;
  },
);
