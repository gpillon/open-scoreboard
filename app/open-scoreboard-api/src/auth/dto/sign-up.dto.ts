import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmailPassword } from './email-password.dto';
import { Expose } from 'class-transformer';

export class SignUpDto extends EmailPassword {
  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @Expose()
  lastName?: string;

  // @ApiPropertyOptional()
  // @IsBoolean()
  // rememberMe?:boolean;
}
