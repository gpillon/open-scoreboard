import { Injectable } from '@nestjs/common';
import { CreateLapDto } from './dto/create-lap.dto';
import { UpdateLapDto } from './dto/update-lap.dto';
import { Lap } from './entities/lap.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLap, UpdateLap } from './lap.interfaces';
import { TrackService } from '../track/track.service';
import { NotFoundErr } from '../../utils/decorators/notfound.decorator';
import { PlayerService } from '../player/player.service';
import { QueryGameDto } from '../game/dto/query-game.dto';

@Injectable()
export class LapService {
  constructor(
    @InjectRepository(Lap) private readonly lapRepository: Repository<Lap>,
    private readonly trackService: TrackService,
    private readonly playerService: PlayerService,
  ) {}

  async count(): Promise<{ count: number }> {
    return { count: await this.lapRepository.count() };
  }

  async create(createLapDto: CreateLapDto): Promise<Lap> {
    const foundTrack = await this.trackService.findOne(createLapDto.track);
    if (!foundTrack) throw new NotFoundErr('Track Not Found');

    const foundPlayer = await this.playerService.findOne(createLapDto.player);
    if (!foundPlayer) throw new NotFoundErr('Player Not Found');

    const newLapCreate: CreateLap = {
      ...createLapDto,
      track: foundTrack,
      player: foundPlayer,
    };

    const newLap = await this.lapRepository
      .createQueryBuilder('lap')
      .insert()
      .into(Lap)
      .values(newLapCreate)
      .execute();

    return this.findOne(newLap.identifiers[0].id);
  }

  findAll(queryGameDto: QueryGameDto) {
    return this.lapRepository.find({
      relations: ['player', 'track'],
      take: queryGameDto.limit || 20,
      skip: queryGameDto.skip || 0,
    });
  }

  async findOne(id: string): Promise<Lap | null> {
    return this.lapRepository.findOne({
      where: [{ id }],
      relations: ['player', 'track'],
    });
  }

  async update(id: string, updateLapDto: UpdateLapDto) {
    const newLapUpdate: UpdateLap = {
      lapNum: updateLapDto.lapNum,
      lapTime: updateLapDto.lapTime,
    };

    if (updateLapDto.track) {
      newLapUpdate.track = await this.trackService.findOne(updateLapDto.track);
      if (!newLapUpdate.track) throw new NotFoundErr('Track Not Found');
    }

    if (updateLapDto.player) {
      newLapUpdate.player = await this.playerService.findOne(
        updateLapDto.player,
      );
      if (!newLapUpdate.player) throw new NotFoundErr('Player Not Found');
    }

    return this.lapRepository
      .createQueryBuilder()
      .update(Lap)
      .set(newLapUpdate)
      .where('id = :id', { id })
      .execute();
  }

  remove(id: string) {
    return this.lapRepository
      .createQueryBuilder()
      .delete()
      .from(Lap)
      .where('id = :id', { id })
      .execute();
  }
}
