import { ApiProperty } from '@nestjs/swagger';
import { EmailPassword } from './email-password.dto';
import { Expose } from 'class-transformer';

export class ResetPassword extends EmailPassword {
  @ApiProperty({ type: 'string', format: 'password' })
  @Expose()
  confirmPassword: string;

  @ApiProperty()
  @Expose()
  // special case for compatibililty with ngx-admin
  resetPasswordToken: string;
}
