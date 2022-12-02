import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  findAll() {
    return this.trackRepository.find();
  }

  async findOne(idOrName: string): Promise<Track | null> {
    return this.trackRepository.findOne({
      where: [{ id: idOrName }, { name: idOrName }],
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
