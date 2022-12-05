import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../auth.constants';

@Injectable()
export class JwtQueryStrategy extends PassportStrategy(Strategy, 'jwtQuery') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}
