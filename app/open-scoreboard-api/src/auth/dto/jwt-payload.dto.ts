import { Email } from './email.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JwtPayload extends Email {
  @ApiProperty()
  @Expose()
  id: string;
}
