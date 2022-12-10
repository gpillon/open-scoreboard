import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ReadServerDto } from './dto/read-server.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { PlayerState } from '../components/dto/player-state.dto';
import { UpdateGameStateDto } from './dto/update-game-state.dto';
import lodash from 'lodash';

@Injectable()
export class ServerService {
  servers: ReadServerDto[];

  create(createServerDto: CreateServerDto) {
    const newServer: Omit<ReadServerDto, 'gamePhase'> = {
      ...createServerDto,
      description: createServerDto.description || 'A Game Server.',
      id: uuidv4().toString(),
      players: createServerDto.players.map((p) => ({
        name: p,
        state: plainToInstance(PlayerState, {}),
      })),
    };
    const newServerInstance = plainToInstance(ReadServerDto, newServer);
    this.servers.push(newServerInstance);
    return ServerService.clone(newServer);
  }

  findAll(): ReadServerDto[] {
    return ServerService.clone(this.servers);
  }

  findOne(id: string): ReadServerDto | null {
    return ServerService.clone(this.servers.find((s) => s.id === id));
  }

  update(id: string, updateServerDto: UpdateServerDto) {
    const editServerIdx = this.servers.findIndex((s) => s.id === id);
    Object.assign(this.servers[editServerIdx], updateServerDto);
    return ServerService.clone(this.servers[editServerIdx]);
  }

  updateGameState(id: string, updateGameStateDto: UpdateGameStateDto) {
    const editServerIdx = this.servers.findIndex((s) => s.id === id);
    lodash.merge(this.servers[editServerIdx], updateGameStateDto);
    return ServerService.clone(this.servers[editServerIdx]);
  }

  remove(id: string): ReadServerDto | null {
    const deletedServerIdx = this.servers.findIndex((s) => s.id === id);
    console.warn('Server Not Found...');
    if (deletedServerIdx === -1) return null;
    try {
      const deletedServer = this.servers.splice(deletedServerIdx, 1)[0];
      return ServerService.clone(deletedServer);
    } catch (e) {
      console.warn('Removed Not existing server...');
    }
    return null;
  }

  private static clone<T>(s: T): T {
    return lodash.clone(s);
  }
}
