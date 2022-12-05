import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @Expose()
  @IsString()
  @ApiProperty({ type: 'string', description: 'Username' })
  username: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: 'string', description: 'Password' })
  password: string;

  @Expose()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    description: 'Set true for never expiring token (BE CARREFUL!)',
  })
  neverExpire?: boolean;
}
