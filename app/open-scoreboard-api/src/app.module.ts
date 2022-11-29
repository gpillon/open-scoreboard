import {Module} from '@nestjs/common';
import {HealthcheckController} from './api/healthcheck/healthcheck.controller';
import {HealthcheckService} from './api/healthcheck/healthcheck.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlayerModule} from './api/player/player.module';
import {TrackModule} from './api/track/track.module';
import {GameModule} from './api/game/game.module';
import {LapModule} from './api/lap/lap.module';
import {PlayerScore} from "./api/game/entities/player-score.entity";
import {Game} from "./api/game/entities/game.entity";
import {Lap} from "./api/lap/entities/lap.entity";
import {Track} from "./api/track/entities/track.entity";
import {Player} from "./api/player/entities/player.entity";
import {GamePlayerSubscriber} from "./api/game/entities/game-player.subscriber";

const typeorm_entities = [
    Track,
    Game,
    PlayerScore,
    Lap,
    Player,
]

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            autoLoadEntities: true,
            database: 'test.sql',
            entities: typeorm_entities,
            synchronize: true,
            logging: true,
            subscribers: [GamePlayerSubscriber],
        }),
        GameModule,
        PlayerModule,
        TrackModule,
        LapModule,
    ],
    controllers: [HealthcheckController],
    providers: [HealthcheckService],
})
export class AppModule {
}
