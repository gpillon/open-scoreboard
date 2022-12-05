import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';
import { EmailPassword } from './email-password.dto';

export class Login extends EmailPassword {
  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  @Expose()
  rememberMe: boolean;
}
