import { Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { GamePhase } from '../../components/game-phase.enum';
import { IdDto } from './Id.dto';
import { UpdateGameStatePlayer } from './update-game-state-player.dto';

export class UpdateGameStateDto extends IdDto {
  @Expose()
  @IsOptional()
  @IsEnum(GamePhase)
  gamePhase: GamePhase;

  @Expose()
  @IsArray()
  @Type(() => UpdateGameStatePlayer)
  players: UpdateGameStatePlayer[];
}
