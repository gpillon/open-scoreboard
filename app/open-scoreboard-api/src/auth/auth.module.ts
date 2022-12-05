import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import config from '../config';
import { CryptoService } from './crypto.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { EmailService } from '../core/email.service';
import { UserModule } from '../api/user/user.module';
import { UserService } from '../api/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../api/user/entities/user.entity';
import { UserCredential } from '../api/user/entities/user_credentials.entity';
import { UserPhoto } from '../api/user/entities/user_photo.entity';
import { UserSettings } from '../api/user/entities/user_settings.entity';
import { JwtQueryStrategy } from './strategies/jwt-query.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, UserCredential, UserPhoto, UserSettings]),
    JwtModule.register({
      secretOrPrivateKey: config.auth.jwt.accessTokenSecret,
      signOptions: {
        expiresIn: config.auth.jwt.accessTokenLife,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtQueryStrategy,
    LocalStrategy,
    CryptoService,
    EmailService,
    /*Logger,*/
    UserService,
  ],
  exports: [
    PassportModule,
    AuthService,
    UserService,
    CryptoService,
    TypeOrmModule.forFeature([User]),
  ],
})
export class AuthModule {}
