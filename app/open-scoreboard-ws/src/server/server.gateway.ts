import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { IdDto } from './dto/Id.dto';
import { UpdateGameStateDto } from './dto/update-game-state.dto';

@WebSocketGateway()
export class ServerGateway {
  constructor(private readonly serverService: ServerService) {}

  @SubscribeMessage('createServer')
  create(@MessageBody() createServerDto: CreateServerDto) {
    return this.serverService.create(createServerDto);
  }

  @SubscribeMessage('findAllServer')
  findAll() {
    return this.serverService.findAll();
  }

  @SubscribeMessage('findOneServer')
  findOne(@MessageBody() body: IdDto) {
    return this.serverService.findOne(body.id);
  }

  @SubscribeMessage('updateServer')
  update(@MessageBody() updateServerDto: UpdateServerDto) {
    return this.serverService.update(updateServerDto.id, updateServerDto);
  }

  @SubscribeMessage('updateGameState')
  updateGameState(@MessageBody() updateGameStateDto: UpdateGameStateDto) {
    return this.serverService.updateGameState(
      updateGameStateDto.id,
      updateGameStateDto,
    );
  }

  @SubscribeMessage('removeServer')
  remove(@MessageBody() body: IdDto) {
    return this.serverService.remove(body.id);
  }
}
