/* tslint:disable */
/* eslint-disable */
import { IdNameDto } from './id-name-dto';
import { ReadPlayerScoreDto } from './read-player-score-dto';
export interface ReadGameDto {
  createdAt: Date;
  id: string;
  playerScore: Array<ReadPlayerScoreDto>;
  track: IdNameDto;
}
