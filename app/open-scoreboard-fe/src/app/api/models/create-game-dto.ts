/* tslint:disable */
/* eslint-disable */
import { CreatePlayerScoreDto } from './create-player-score-dto';
import { CreateTrackDto } from './create-track-dto';
export interface CreateGameDto {
  playerScore: Array<CreatePlayerScoreDto>;
  track: (string | CreateTrackDto);
}
