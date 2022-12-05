import { Module } from '@nestjs/common';
import { HealthcheckController } from './api/healthcheck/healthcheck.controller';
import { HealthcheckService } from './api/healthcheck/healthcheck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerScore } from './api/game/entities/player-score.entity';
import { Game } from './api/game/entities/game.entity';
import { Lap } from './api/lap/entities/lap.entity';
import { Track } from './api/track/entities/track.entity';
import { Player } from './api/player/entities/player.entity';
import { GamePlayerSubscriber } from './api/game/entities/game-player.subscriber';
import { PlayerSubscriber } from './api/player/entities/player.subscriber';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api-module';

const typeorm_entities = [Track, Game, PlayerScore, Lap, Player];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      autoLoadEntities: true,
      database: 'data/data.db',
      entities: typeorm_entities,
      synchronize: true,
      logging: true,
      subscribers: [GamePlayerSubscriber, PlayerSubscriber],
    }),
    AuthModule,
    ApiModule,
  ],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class AppModule {}
