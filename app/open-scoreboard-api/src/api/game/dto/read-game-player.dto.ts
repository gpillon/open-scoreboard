import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { LapWithoutTrackAndPlayer } from '../../lap/dto/LapWithoutTrackAndPlayer.dto';
import { IdNicknameDto } from '../../../utils/dto/id-nickname.dto';

export class ReadPlayerScoreDto {
  @ApiProperty({ type: IdNicknameDto })
  @Expose()
  @Type(() => IdNicknameDto)
  player: IdNicknameDto;

  @ApiProperty({ type: LapWithoutTrackAndPlayer, isArray: true })
  @Expose()
  @Type(() => LapWithoutTrackAndPlayer)
  laps: LapWithoutTrackAndPlayer[];

  @ApiProperty({ type: 'number' })
  @Expose()
  totalTime: number;
}
