import { ApiProperty } from '@nestjs/swagger';
import { ReadTrackDto } from '../../track/dto/read-track.dto';
import { ReadPlayerDto } from '../../player/dto/read-player.dto';
import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateLapDto {
  @ApiProperty({
    oneOf: [
      { type: 'string', format: 'uuid' },
      { type: 'string', example: 'BestTrackEver' },
    ],
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6 | BestTrackEver',
  })
  @IsString()
  @Expose()
  track: ReadTrackDto['id'] | ReadTrackDto['name'];

  @ApiProperty({
    oneOf: [
      { type: 'string', format: 'uuid' },
      { type: 'string', example: 'JonnyBestEver55' },
    ],
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6 | JonnyBestEver55',
  })
  @IsString()
  @Expose()
  player: ReadPlayerDto['id'] | ReadPlayerDto['nickname'];

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @Expose()
  lapNum: number;

  @ApiProperty({
    type: 'number',
    example: 554830.665,
    description: 'Lap Time in seconds.milliseconds',
  })
  @IsNumber()
  @Expose()
  lapTime: number;
}
