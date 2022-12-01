import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class QueryParamsDto {
  @ApiPropertyOptional({ type: 'number' })
  @Expose()
  @IsOptional()
  @Min(1)
  @Max(500)
  limit?: number;
}
