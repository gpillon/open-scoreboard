import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../api/user/user.service';
import { JwtPayload } from './dto/jwt-payload.dto';
import { CryptoService } from './crypto.service';
import { ResetPassword } from './dto/reset-password.dto';
import { EmailService } from '../core/email.service';
import { TokensDto } from './dto/tokens.dto';
import config from '../config';
import { IToken } from './auth.interfaces';
import { User } from '../api/user/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './rbac/role.enum';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(userDto: SignUpDto): Promise<IToken> {
    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser && existingUser.id) {
      throw new Error('User with this email already exists');
    }
    const password = this.cryptoService.hashPassword(userDto.password);
    const newUser = await this.userService.create({
      email: userDto.email,
      name: userDto.name,
      lastName: userDto.lastName,
      password: password.hash,
      salt: password.salt,
      role: Role.User,
    });
    try {
      const photo = await axios.get(
        'https://thispersondoesnotexist.com/image',
        { responseType: 'arraybuffer' },
      );
      await this.userService.savePhoto(
        {
          originalname: 'default_pic.jpg',
          mimetype: photo.headers['content-type'],
          buffer: await photo.data,
          size: photo.headers['content-length'],
        },
        newUser.id,
      );
    } catch (e) {
      console.error(e);
    }
    return this.cryptoService.generateResponseTokens(newUser);
  }

  public async signIn(user, rememberMe = false): Promise<{ token: TokensDto }> {
    const token: TokensDto = this.cryptoService.generateResponseTokens(
      user,
      rememberMe,
    );
    return { token };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findByEmail(payload.email);
  }

  // used in local auth strategy
  public async login(email, password): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (
      user &&
      user.id &&
      (await this.userService.checkAuthentication(user, password))
    ) {
      return user;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  public async resetPassword(
    resetPassword: ResetPassword,
    userId: string,
  ): Promise<void> {
    let currentUserId = userId;

    if (resetPassword.password.length < 4) {
      throw new Error('Password should be longer than 6 characters');
    }

    if (resetPassword.password !== resetPassword.confirmPassword) {
      throw new Error('Password and its confirmation do not match.');
    }

    if (resetPassword.resetPasswordToken) {
      const tokenContent = this.cryptoService.decipherResetPasswordToken(
        resetPassword.resetPasswordToken,
      );
      currentUserId = tokenContent.userId;

      if (new Date().getTime() > tokenContent.valid) {
        throw new Error('Reset password token has expired.');
      }
    }

    const password = this.cryptoService.hashPassword(resetPassword.password);
    return this.userService.changePassword(
      currentUserId,
      password.salt,
      password.hash,
    );
  }

  public async requestPassword(email: string): Promise<boolean> {
    return await this.userService.findByEmail(email).then((user) => {
      if (user && user.id) {
        const resetPasswordToken =
          this.cryptoService.generateResetPasswordToken(user.id);
        return this.emailService.sendResetPasswordEmail(
          email,
          `${user.name}${user.lastName ? ' ' + user.lastName : ''}`,
          resetPasswordToken,
        );
      }
      throw new Error('There is no such email in the system');
    });
  }

  public async refreshToken(tokens: any): Promise<IToken> {
    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Invalid token format');
    }

    let tokenContent;

    try {
      tokenContent = this.jwtService.verify(tokens.refresh_token, {
        secret: config.auth.jwt.refreshTokenSecret,
      });
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
    const user = await this.userService.findById(tokenContent.id);
    return this.cryptoService.generateResponseTokens(user);
  }
}
