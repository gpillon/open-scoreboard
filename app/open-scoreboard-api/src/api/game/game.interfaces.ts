import { CreateGameDto } from './dto/create-game.dto';
import { Track } from '../track/entities/track.entity';
import { Player } from '../player/entities/player.entity';

export type CreateGame = Omit<CreateGameDto, 'track' | 'player'> &
  Record<'track', Track> &
  Record<'player', Player>;

export type UpdateGame = {
  track?: Track;
};
