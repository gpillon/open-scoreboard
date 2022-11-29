import {BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreatePlayerDto} from './dto/create-player.dto';
import {UpdatePlayerDto} from './dto/update-player.dto';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ReadPlayerDto} from "./dto/read-player.dto";
import {AlreadyExistsErr, ApiResponseAlreadyExists} from "../../utils/decorators/already-exists.decorator";
import {ApiResponseNotFound, NotFoundErr} from "../../utils/decorators/notfound.decorator";
import {ApiResponseBadRequestDecorator} from "../../utils/decorators/bad-request.decorator";
import {Player} from "./entities/player.entity";
import {DtoUtils} from "../../utils/dto-utils.class";
import {PlayerService} from "./player.service";

@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {
  }

  @Post()
  @ApiResponse({type: ReadPlayerDto, status: HttpStatus.CREATED})
  @ApiResponseAlreadyExists()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<ReadPlayerDto> {
    let newPlayer: Player; 
    if (await this.playerService.findOne(createPlayerDto.nickname)) {
      throw new AlreadyExistsErr("Player")
    }
    try {
      newPlayer = await this.playerService.create(createPlayerDto);
    } catch (e) {
      throw new BadRequestException({error: e.message})
    }
    return DtoUtils.instanceToReadDto(newPlayer, ReadPlayerDto);
  }

  @Get()
  @ApiResponse({type: ReadPlayerDto, isArray: true, status: HttpStatus.OK})
  async findAll() {
    let players: Player[] = await this.playerService.findAll();
    return DtoUtils.instanceToReadDtoArray(players, ReadPlayerDto);
  }

  @Get(':id')
  @ApiResponse({type: ReadPlayerDto, status: HttpStatus.OK})
  @ApiResponseNotFound()
  async findOne(@Param('id') id: string) {
    let player = await this.validateExists(id);
    return DtoUtils.instanceToReadDto(player, ReadPlayerDto);
  }

  private async validateExists(id: string) {
    const player = await this.playerService.findOne(id);
    if (!player) throw new NotFoundErr("Player")
    return player;
  }

  @Patch(':id')
  @ApiResponse({type: ReadPlayerDto, status: HttpStatus.OK})
  @ApiResponseBadRequestDecorator()
  @ApiResponseNotFound()
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    const player = await this.validateExists(id);
    if (player.nickname === updatePlayerDto.nickname) throw new BadRequestException("Player already has this name")
    if (await this.playerService.findOne(updatePlayerDto.nickname)) {
      throw new AlreadyExistsErr("Player")
    }
    await this.playerService.update(id, updatePlayerDto);
    let updatedPlayer = await this.playerService.findOne(id);
    return DtoUtils.instanceToReadDto(updatedPlayer, ReadPlayerDto);

  }

  @Delete(':id')
  @ApiResponse({type: ReadPlayerDto, status: HttpStatus.NO_CONTENT})
  @ApiResponseNotFound()
  async remove(@Param('id') id: string) {
    const player = await this.validateExists(id);
    await this.playerService.remove(id);
    return DtoUtils.instanceToReadDto(player, ReadPlayerDto);    
  }
  
  
}
