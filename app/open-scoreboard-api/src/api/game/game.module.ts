import {Module} from '@nestjs/common';
import {GameService} from './game.service';
import {GameController} from './game.controller';
import {TrackModule} from "../track/track.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlayerScore} from "./entities/player-score.entity";
import {Game} from "./entities/game.entity";
import {PlayerModule} from "../player/player.module";
import {LapModule} from "../lap/lap.module";

@Module({
    imports: [
        TrackModule,
        PlayerModule,
        LapModule,
        TypeOrmModule.forFeature([Game, PlayerScore])
    ],
    controllers: [GameController],
    providers: [GameService],
})
export class GameModule {
}
