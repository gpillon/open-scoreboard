import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../api/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtQueryStrategy } from './strategies/jwt-query.strategy';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    PassportModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtQueryStrategy],
})
export class AuthModule {}
