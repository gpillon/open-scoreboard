import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class SkipLimitDto {
  @ApiPropertyOptional({ type: 'number', minimum: 1, maximum: 500 })
  @Expose()
  @IsOptional()
  @Min(1)
  @Max(500)
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ type: 'number', minimum: 0 })
  @Expose()
  @IsOptional()
  @Max(500)
  @Type(() => Number)
  skip?: number;
}
