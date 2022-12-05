import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryGameDto } from '../game/dto/query-game.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async count(): Promise<{ count: number }> {
    return { count: await this.trackRepository.count() };
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await this.trackRepository
      .createQueryBuilder()
      .insert()
      .into(Track)
      .values(createTrackDto)
      .execute();

    return this.findOne(newTrack.identifiers[0].id);
  }

  findAll(queryGameDto: QueryGameDto) {
    return this.trackRepository.find({
      take: queryGameDto.limit || 20,
      skip: queryGameDto.skip || 0,
    });
  }

  async findOne(idOrName: string): Promise<Track | null> {
    const searchObj = isUUID(idOrName) ? { id: idOrName } : { name: idOrName };
    return this.trackRepository.findOne({
      where: [searchObj],
    });
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.trackRepository
      .createQueryBuilder()
      .update(Track)
      .set(updateTrackDto)
      .where('id = :id', { id })
      .execute();
  }

  remove(id: string) {
    return this.trackRepository
      .createQueryBuilder()
      .delete()
      .from(Track)
      .where('id = :id', { id })
      .execute();
  }
}
