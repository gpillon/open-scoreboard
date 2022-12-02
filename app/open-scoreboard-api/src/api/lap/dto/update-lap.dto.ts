import { ApiPropertyOptional } from '@nestjs/swagger';
import { ReadTrackDto } from '../../track/dto/read-track.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ReadPlayerDto } from '../../player/dto/read-player.dto';
import { Expose } from 'class-transformer';

export class UpdateLapDto {
  @ApiPropertyOptional({
    oneOf: [
      { type: 'string', format: 'uuid' },
      { type: 'string', example: 'BestTrackEver' },
    ],
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6 | BestTrackEver',
  })
  @IsString()
  @IsOptional()
  @Expose()
  track?: ReadTrackDto['id'] | ReadTrackDto['name'];

  @ApiPropertyOptional({
    oneOf: [
      { type: 'string', format: 'uuid' },
      { type: 'string', example: 'JonnyBestEver55' },
    ],
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6 | JonnyBestEver55',
  })
  @IsString()
  @IsOptional()
  @Expose()
  player?: ReadPlayerDto['id'] | ReadPlayerDto['nickname'];

  @ApiPropertyOptional({ type: 'number', example: 1 })
  @IsOptional()
  @IsNumber()
  @Expose()
  lapNum?: number;

  @ApiPropertyOptional({
    type: 'number',
    example: 554830.665,
    description: 'Lap Time in seconds.milliseconds',
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  lapTime?: number;
}
