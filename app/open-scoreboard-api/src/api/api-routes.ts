import { Routes } from '@nestjs/core';
import { LapModule } from './lap/lap.module';
import { PlayerModule } from './player/player.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';

const ROUTES: Routes = [
  {
    path: 'games',
    module: GameModule,
  },
  {
    path: 'laps',
    module: LapModule,
  },
  {
    path: 'tracks',
    module: TrackModule,
  },
  {
    path: 'players',
    module: PlayerModule,
  },
  {
    path: 'users',
    module: UserModule,
  },
];

export { ROUTES };
