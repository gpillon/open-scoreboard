import { Expose, Transform } from 'class-transformer';
import { Player } from './player.dto';
import { GamePhase } from '../game-phase.enum';
import { IsEnum } from 'class-validator';

export class GameState {
  @Expose()
  @Transform(({ value }: { value: GamePhase }) =>
    value != null ? value : GamePhase.NEW,
  )
  @IsEnum(GamePhase)
  gamePhase: GamePhase;

  @Expose()
  players: Player[];
}
