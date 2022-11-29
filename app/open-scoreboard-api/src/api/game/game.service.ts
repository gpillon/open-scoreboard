import {Injectable} from '@nestjs/common';
import {CreateGameDto} from './dto/create-game.dto';
import {UpdateGameDto} from './dto/update-game.dto';
import {Game} from "./entities/game.entity";
import {In, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TrackService} from "../track/track.service";
import {NotFoundErr} from "../../utils/decorators/notfound.decorator";
import {PlayerService} from "../player/player.service";
import {Track} from "../track/entities/track.entity";
import {Player} from "../player/entities/player.entity";
import {PlayerScore} from "./entities/player-score.entity";
import {LapService} from "../lap/lap.service";
import * as util from "util";

@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game) private readonly GameRepository: Repository<Game>,
        @InjectRepository(PlayerScore) private readonly PlayerScoreRepository: Repository<PlayerScore>,
        private readonly trackService: TrackService,
        private readonly playerService: PlayerService,
        private readonly lapService: LapService
    ) {
    }

    async create(createGameDto: CreateGameDto): Promise<Game> {
        const foundTrack: Track = typeof createGameDto.track === "string" ?
            await this.trackService.findOne(createGameDto.track) :
            await this.trackService.create(createGameDto.track);
        if (!foundTrack) throw new NotFoundErr(`Track '${createGameDto.track.toString()}' not found`);

        let score = await this.buildScore(createGameDto, foundTrack);

        const newScores = score.map(ps => {
            const nps = new PlayerScore();
            nps.laps = ps.laps;
            nps.player = ps.player
            return nps
        });

        const game = new Game();
        game.track = foundTrack;
        game.playerScore = newScores;
        await game.save();
        return this.findOne(game.id);
    }

    private async buildScore(createGameDto: CreateGameDto, foundTrack: Track) {
        let score = await Promise.all(createGameDto.playerScore.map(async s => {
            const foundPlayer: Player = typeof s.player === "string" ?
                await this.playerService.findOne(s.player) :
                await this.playerService.create(s.player);
            if (!foundPlayer) throw new NotFoundErr(`Player '${s.player.toString()}' not found`);

            const laps = await Promise.all(s.laps.map(async lap => {
                const foundLap = typeof lap === "string" ?
                    await this.lapService.findOne(lap) :
                    await this.lapService.create({
                        ...lap,
                        track: foundTrack.id,
                        player: foundPlayer.id,
                    });

                if (!foundLap) throw new NotFoundErr(`Lap '${lap.toString()}' not found`);

                return foundLap
            }))

            return {
                player: foundPlayer,
                laps
            }
        }));
        return score;


    }

    findAll() {
        return this.GameRepository.find({
            relations: ["playerScore"]
        });
    }

    async findOne(id: string): Promise<Game | null> {
        return this.GameRepository.findOne({
            where: [
                {id},
            ],
            relations: ["playerScore", "track"]
        })
    }

    async update(id: string, updateGameDto: UpdateGameDto) {

        // const newGameUpdate: UpdateGame = {
        //     gameNum: updateGameDto.gameNum,
        //     gameTime: updateGameDto.gameTime
        // };
        //
        // if (updateGameDto.track) {
        //     newGameUpdate.track = await this.trackService.findOne(updateGameDto.track);
        //     if (!newGameUpdate.track) throw new NotFoundErr("Track Not Found");
        // }
        //
        // if (updateGameDto.player) {
        //     newGameUpdate.player = await this.playerService.findOne(updateGameDto.player);
        //     if (!newGameUpdate.player) throw new NotFoundErr("Player Not Found");
        // }

        return this.GameRepository
            .createQueryBuilder()
            .update(Game)
            //.set(newGameUpdate)
            .where("id = :id", {id})
            .execute()
    }

    remove(id: string) {
        return this.GameRepository
            .createQueryBuilder()
            .delete()
            .from(Game)
            .where("id = :id", {id})
            .execute()
    }
}
