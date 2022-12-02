import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdatePlayerDto {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Expose()
  nickname?: string;
}
