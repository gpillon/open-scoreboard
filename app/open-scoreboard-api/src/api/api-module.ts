import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { TrackModule } from './track/track.module';
import { LapModule } from './lap/lap.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { ROUTES } from './api-routes';

@Module({
  imports: [
    GameModule,
    PlayerModule,
    TrackModule,
    LapModule,
    UserModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: ROUTES,
      },
    ]),
  ],

  controllers: [],
  providers: [],
})
export class ApiModule {}
