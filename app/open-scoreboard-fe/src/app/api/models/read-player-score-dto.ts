/* tslint:disable */
/* eslint-disable */
import { IdNicknameDto } from './id-nickname-dto';
import { LapWithoutTrackAndPlayer } from './lap-without-track-and-player';
export interface ReadPlayerScoreDto {
  laps: Array<LapWithoutTrackAndPlayer>;
  player: IdNicknameDto;
  totalTime: number;
}
