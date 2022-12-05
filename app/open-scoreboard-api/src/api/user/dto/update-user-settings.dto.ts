import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserSettingsDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  themeName?: string;
}
