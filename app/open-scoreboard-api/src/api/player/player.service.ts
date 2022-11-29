import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {Player} from "./entities/player.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PlayerService {

  constructor(
      @InjectRepository(Player) private readonly playerRepository: Repository<Player>
  ) {
  }
  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    let newPlayer =  await this.playerRepository
        .createQueryBuilder()
        .insert()
        .into(Player)
        .values(createPlayerDto)
        .execute()

    return this.findOne(newPlayer.identifiers[0].toString());
  }

  findAll() {
    return this.playerRepository.find();
  }

  async findOne(idOrNickname: string): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: [
        {id: idOrNickname},
        {nickname: idOrNickname}
      ]
    })
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.playerRepository
        .createQueryBuilder()
        .update(Player)
        .set(updatePlayerDto)
        .where("id = :id", { id })
        .execute()
  }

  remove(id: string) {
    return this.playerRepository
        .createQueryBuilder()
        .delete()
        .from(Player)
        .where("id = :id", { id })
        .execute()
  }
}