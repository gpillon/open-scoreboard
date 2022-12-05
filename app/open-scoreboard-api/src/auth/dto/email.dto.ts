import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class Email {
  @ApiProperty({
    type: 'string',
    format: 'email',
    default: 'user@example.com',
  })
  @IsEmail()
  @Expose()
  email: string;
}
