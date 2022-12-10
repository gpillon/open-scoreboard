import { Expose } from 'class-transformer';
import { GameState } from '../../components/dto/game-state.dto';

export class ReadServerDto extends GameState {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  remoteIp: string;
}
