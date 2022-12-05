import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Email } from './dto/email.dto';
import { ResetPassword } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { TokensDto } from './dto/tokens.dto';
import { User } from '../api/user/entities/user.entity';
import { IToken } from './auth.interfaces';
import { SignUpDto } from './dto/sign-up.dto';
import { GetUser } from './decorators/get-user.decorator';
import { JwtAuthRoles } from './guards/jwt-auth-role-guard.service';
import { Role } from './rbac/role.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  public async login(
    @Body() login: Login,
    @GetUser() user: User,
  ): Promise<{ token: TokensDto }> {
    return await this.authService.signIn(user, login.rememberMe);
  }

  @Post('sign-up')
  async signUp(@Body(ValidationPipe) userDto: SignUpDto): Promise<IToken> {
    try {
      return await this.authService.signUp(userDto);
    } catch (e) {
      throw new BadRequestException(`Error in SignUp ${e.message ?? e}.`);
    }
  }

  @Post('reset-pass')
  @JwtAuthRoles([Role.User])
  async resetPass(
    @Body() resetPass: ResetPassword,
    @GetUser() user: User,
  ): Promise<{ message: 'ok' }> {
    const { id } = user;
    try {
      await this.authService.resetPassword(resetPass, id);
      return { message: 'ok' };
    } catch (e) {
      throw new BadRequestException(
        `Error in Reset Password ${e.message ?? e}.`,
      );
    }
  }

  @Post('request-pass')
  async requestPass(@Body() email: Email): Promise<{ message: string }> {
    try {
      await this.authService.requestPassword(email.email);
      return {
        message: `Email with reset password instructions was sent to email ${email.email}.`,
      };
    } catch (e) {
      throw new BadRequestException(
        `Error in Request Password ${e.message ?? e}.`,
      );
    }
  }

  @Post('sign-out')
  @JwtAuthRoles([Role.User])
  signOut(): { message: 'ok' } {
    return { message: 'ok' };
    // RES.status(200).send({ message: 'ok' });
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() tokens: TokensDto,
    @Body('token') bodyTokens: TokensDto,
  ): Promise<{ token: TokensDto }> {
    try {
      return {
        token: await this.authService.refreshToken(bodyTokens || tokens),
      };
    } catch (e) {
      throw new BadRequestException(
        `Error in Refresh Token ${e.message ?? e}.`,
      );
    }
  }
}
