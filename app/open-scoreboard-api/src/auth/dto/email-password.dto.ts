import { Email } from './email.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class EmailPassword extends Email {
  @ApiProperty({
    type: 'string',
    format: 'password',
    example: 'password',
  })
  @IsString()
  @Expose()
  password: string;
}
