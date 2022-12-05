import { Injectable } from '@nestjs/common';
import { UserService } from '../api/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(1);
    if (user) {
      // const { pass, ...result } = user;
      //return result;
      return user;
    }
    return null;
  }

  async login(
    user: { username: string; password: string },
    neverExpire: boolean,
  ) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: neverExpire ? '10y' : '1d',
      }),
    };
  }
}
