import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokensDto {
  @ApiProperty()
  @Expose()
  expires_in: number;

  @ApiProperty()
  @Expose()
  access_token: string;

  @ApiProperty()
  @Expose()
  refresh_token: string;
}
