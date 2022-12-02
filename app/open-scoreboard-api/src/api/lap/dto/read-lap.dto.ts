import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Track } from '../../track/entities/track.entity';
import { Player } from '../../player/entities/player.entity';

export class ReadLapDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @Expose()
  id: number;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @Transform(({ value }: { value: Track }) => value.id)
  @Expose()
  track: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @Transform(({ value }: { value: Player }) => value.id)
  @Expose()
  player: string;

  @ApiProperty({ type: 'number', example: 1 })
  @Expose()
  lapNum: number;

  @ApiProperty({
    type: 'number',
    example: 554830.665,
    description: 'Lap Time in seconds.milliseconds',
  })
  @Expose()
  lapTime: number;
}
