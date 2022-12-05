import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../api/user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req;

    if (context.getType() === 'http') {
      req = context.switchToHttp().getRequest();
      const { user } = req;

      await this.userService.findByEmail(user.email);

      if (!user) {
        return false;
      }
      req.user = user;
      return false;
    }
  }
}
