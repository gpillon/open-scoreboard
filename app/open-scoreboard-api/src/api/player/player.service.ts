import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryGameDto } from '../game/dto/query-game.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async count(): Promise<{ count: number }> {
    return { count: await this.playerRepository.count() };
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = await this.playerRepository
      .createQueryBuilder()
      .insert()
      .into(Player)
      .values(createPlayerDto)
      .execute();

    return this.findOne(newPlayer.identifiers[0].id);
  }

  findAll(queryGameDto: QueryGameDto) {
    return this.playerRepository.find({
      take: queryGameDto.limit || 20,
      skip: queryGameDto.skip || 0,
    });
  }

  async findOne(idOrNickname: string): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: [{ id: idOrNickname }, { nickname: idOrNickname }],
      relations: { games: { player: true } },
    });
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.playerRepository
      .createQueryBuilder()
      .update(Player)
      .set(updatePlayerDto)
      .where('id = :id', { id })
      .execute();
  }

  remove(id: string) {
    return this.playerRepository
      .createQueryBuilder()
      .delete()
      .from(Player)
      .where('id = :id', { id })
      .execute();
  }
}
