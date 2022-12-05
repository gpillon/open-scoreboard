import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ description: 'Success Login!' })
  @ApiUnauthorizedResponse({ description: 'failed login' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() login: LoginRequestDto) {
    return this.authService.login(
      {
        username: login.username,
        password: login.password,
      },
      login.neverExpire,
    );
  }

  // @JwtAuthGuard()
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
