import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtQueryAuthGuard extends AuthGuard('jwtQuery') {}
