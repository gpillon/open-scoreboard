import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ type: String, format: 'string' })
  @IsString()
  password: string;

  @ApiProperty({ type: String, format: 'string' })
  @IsString()
  newPassword: string;
}
