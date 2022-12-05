import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../../config';

@Injectable()
export class JwtQueryStrategy extends PassportStrategy(Strategy, 'jwtQuery') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: config.auth.jwt.accessTokenSecret,
    });
  }

  async validate(payload: any) {
    return { email: payload.email, roles: payload.roles };
  }
}
