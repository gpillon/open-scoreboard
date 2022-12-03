import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackService } from '../track/track.service';
import { NotFoundErr } from '../../utils/decorators/notfound.decorator';
import { PlayerService } from '../player/player.service';
import { Track } from '../track/entities/track.entity';
import { Player } from '../player/entities/player.entity';
import { PlayerScore } from './entities/player-score.entity';
import { LapService } from '../lap/lap.service';
import { UpdateGame } from './game.interfaces';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { CreatePlayerDto } from '../player/dto/create-player.dto';
import { QueryGameDto } from './dto/query-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(PlayerScore)
    private readonly PlayerScoreRepository: Repository<PlayerScore>,
    private readonly trackService: TrackService,
    private readonly playerService: PlayerService,
    private readonly lapService: LapService,
  ) {}

  async count(): Promise<{ count: number }> {
    return { count: await this.gameRepository.count() };
  }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const foundTrack = await this.createOrFindTrack(createGameDto.track);
    const score = await this.buildScore(createGameDto, foundTrack);

    const newScores = score.map((ps) => {
      const nps = new PlayerScore();
      nps.laps = ps.laps;
      nps.player = ps.player;
      return nps;
    });

    const game = new Game();
    game.track = foundTrack;
    game.playerScore = newScores;
    await game.save();
    return this.findOne(game.id);
  }

  private async createOrFindTrack(track: CreateTrackDto | string) {
    let foundTrack: Track = await this.trackService.findOne(
      typeof track === 'string' ? track : track.name,
    );

    if (!foundTrack && track instanceof CreateTrackDto) {
      foundTrack = await this.trackService.create(track);
    }

    if (!foundTrack)
      throw new NotFoundErr(`Track '${track.toString()}' not found`);
    return foundTrack;
  }

  private async createOrFindPlayer(Player: CreatePlayerDto | string) {
    let foundPlayer: Player = await this.playerService.findOne(
      typeof Player === 'string' ? Player : Player.nickname,
    );

    if (!foundPlayer && Player instanceof CreatePlayerDto) {
      foundPlayer = await this.playerService.create(Player);
    }

    if (!foundPlayer)
      throw new NotFoundErr(`Player '${Player.toString()}' not found`);
    return foundPlayer;
  }

  private async buildScore(createGameDto: CreateGameDto, foundTrack: Track) {
    return await Promise.all(
      createGameDto.playerScore.map(async (s) => {
        const foundPlayer: Player = await this.createOrFindPlayer(s.player);

        const laps = await Promise.all(
          s.laps.map(async (lap, i) => {
            const foundLap =
              typeof lap === 'string'
                ? await this.lapService.findOne(lap)
                : await this.lapService.create({
                    lapTime: lap.lapTime,
                    lapNum: lap.lapNum || i + 1,
                    track: foundTrack.id,
                    player: foundPlayer.id,
                  });

            if (!foundLap)
              throw new NotFoundErr(`Lap '${lap.toString()}' not found`);

            return foundLap;
          }),
        );

        return {
          player: foundPlayer,
          laps,
        };
      }),
    );
  }

  findAll(queryGameDto: QueryGameDto) {
    return this.gameRepository.find({
      relations: ['playerScore', 'track'],
      order: { createdAt: 'DESC' },
      take: queryGameDto.limit || 20,
      skip: queryGameDto.skip || 0,
    });
  }

  async findOne(id: string): Promise<Game | null> {
    return this.gameRepository.findOne({
      where: [{ id }],
      relations: ['playerScore', 'track'],
    });
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const newGameUpdate: Partial<UpdateGame> = {};

    if (updateGameDto.track) {
      const currentTrack = await this.createOrFindTrack(newGameUpdate.track);
      newGameUpdate.track = await this.trackService.findOne(currentTrack.id);
      if (!newGameUpdate.track) throw new NotFoundErr('Track Not Found');
    }

    return this.gameRepository
      .createQueryBuilder()
      .update(Game)
      .set(newGameUpdate)
      .where('id = :id', { id })
      .execute();
  }

  remove(id: string) {
    return this.gameRepository
      .createQueryBuilder()
      .delete()
      .from(Game)
      .where('id = :id', { id })
      .execute();
  }
}
