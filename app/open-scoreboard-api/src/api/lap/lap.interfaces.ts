import { CreateLapDto } from './dto/create-lap.dto';
import { Track } from '../track/entities/track.entity';
import { Player } from '../player/entities/player.entity';

export type CreateLap = Omit<CreateLapDto, 'track' | 'player'> &
  Record<'track', Track> &
  Record<'player', Player>;

export type UpdateLap = Partial<CreateLap>;
