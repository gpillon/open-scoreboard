import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateGameStatePlayerState {
  @Expose()
  @IsNumber()
  posX: number;

  @Expose()
  @IsNumber()
  posY: number;
}
