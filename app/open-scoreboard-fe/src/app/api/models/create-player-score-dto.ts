/* tslint:disable */
/* eslint-disable */
import { CreatePlayerDto } from './create-player-dto';
import { LapWithoutTrackAndPlayer } from './lap-without-track-and-player';
export interface CreatePlayerScoreDto {
  laps: (string | LapWithoutTrackAndPlayer);
  player: (string | CreatePlayerDto);
}
