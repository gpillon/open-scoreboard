import { Module } from '@nestjs/common';
import { LapService } from './lap.service';
import { LapController } from './lap.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Lap} from "./entities/lap.entity";
import {TrackModule} from "../track/track.module";
import {PlayerModule} from "../player/player.module";

@Module({
  imports: [TrackModule, PlayerModule, TypeOrmModule.forFeature([Lap])],
  controllers: [LapController],
  providers: [LapService],
  exports: [LapService]
})
export class LapModule {}
