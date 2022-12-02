import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { LapWithoutTrackAndPlayer } from '../../lap/dto/LapWithoutTrackAndPlayer.dto';
import { CreatePlayerDto } from '../../player/dto/create-player.dto';
import { Validate } from 'class-validator';
import { IsType } from '../../../utils/decorators/is-type.decorator';

export class CreatePlayerScoreDto {
  @ApiProperty({
    oneOf: [
      {
        type: 'string',
        format: 'uuid',
        example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      { $ref: `#/components/schemas/${CreatePlayerDto.name}` },
    ],
  })
  @Validate(IsType, [String, CreatePlayerDto], {
    message:
      'Invalid Player. Player must be either the name of an existing player name or the corresponding uuid, or a new player. ',
  })
  @Type((r) => {
    return typeof r.object[r.property] === 'string' ? String : CreatePlayerDto;
  })
  @Expose()
  player: string | CreatePlayerDto;

  @ApiProperty({
    oneOf: [
      {
        type: 'string',
        format: 'uuid',
        example: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
      },
      { $ref: `#/components/schemas/${LapWithoutTrackAndPlayer.name}` },
    ],
    isArray: true,
  })
  @Type((r) => {
    return typeof r.object[r.property] === 'string'
      ? String
      : LapWithoutTrackAndPlayer;
  })
  @Expose()
  laps: (string | LapWithoutTrackAndPlayer)[];
}
