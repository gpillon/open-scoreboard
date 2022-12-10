import { Expose, Type } from 'class-transformer';
import { UpdateGameStatePlayerState } from './update-game-state-player-state.dto';
import { IsString } from 'class-validator';

export class UpdateGameStatePlayer {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @Type(() => UpdateGameStatePlayerState)
  state: UpdateGameStatePlayerState;
}
