import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ReadPlayerDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty({ type: 'string', example: 'JonnyTheFastest99' })
  @Expose()
  nickname: string;

  @ApiPropertyOptional({ type: 'number', example: 'JonnyTheFastest99' })
  @Expose()
  @Transform(({ value }: { value: number | null }) =>
    value == null ? undefined : value,
  )
  totalGames?: number;
}
