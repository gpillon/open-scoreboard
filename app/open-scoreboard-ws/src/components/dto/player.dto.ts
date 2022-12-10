import { Expose } from 'class-transformer';
import { PlayerState } from './player-state.dto';

export class Player {
  @Expose()
  name: string;

  @Expose()
  state: PlayerState;
}
