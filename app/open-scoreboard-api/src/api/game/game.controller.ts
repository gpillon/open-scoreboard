import {BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {GameService} from './game.service';
import {CreateGameDto} from './dto/create-game.dto';
import {UpdateGameDto} from './dto/update-game.dto';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ReadGameDto} from "./dto/read-Game.dto";
import {ApiResponseAlreadyExists} from "../../utils/decorators/already-exists.decorator";
import {ApiResponseNotFound, NotFoundErr} from "../../utils/decorators/notfound.decorator";
import {ApiResponseBadRequestDecorator} from "../../utils/decorators/bad-request.decorator";
import {DtoUtils} from "../../utils/dto-utils.class";
import {Game} from "./entities/game.entity";

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(
      private readonly gameService: GameService
  ) {
  }

  @Post()
  @ApiResponse({type: ReadGameDto, status: HttpStatus.CREATED})
  @ApiResponseAlreadyExists()
  async create(@Body() createGameDto: CreateGameDto): Promise<ReadGameDto> {
    let newGame: Game;
    //  try {
    newGame = await this.gameService.create(createGameDto);
    // } catch (e) {
    //     throw new BadRequestException({error: e.message})
    // }
    console.log(newGame)
    return DtoUtils.instanceToReadDto(newGame, ReadGameDto);
  }

  @Get()
  @ApiResponse({type: ReadGameDto, isArray: true, status: HttpStatus.OK})
  async findAll(): Promise<ReadGameDto[]> {
    let games: Game[] = await this.gameService.findAll();
    return DtoUtils.instanceToReadDtoArray(games, ReadGameDto);
  }

  @Get(':id')
  @ApiResponse({type: ReadGameDto, status: HttpStatus.OK})
  @ApiResponseNotFound()
  async findOne(@Param('id') id: string): Promise<ReadGameDto> {
    let game = await this.validateExists(id);
    return DtoUtils.instanceToReadDto(game, ReadGameDto);
  }

  private async validateExists(id: string): Promise<Game> {
    const Game = await this.gameService.findOne(id);
    if (!Game) throw new NotFoundErr("Game")
    return Game;
  }

  @Patch(':id')
  @ApiResponse({type: ReadGameDto, status: HttpStatus.OK})
  @ApiResponseBadRequestDecorator()
  @ApiResponseNotFound()
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto): Promise<ReadGameDto> {
    await this.validateExists(id);
    await this.gameService.update(id, updateGameDto);
    let game = await this.findOne(id);
    return DtoUtils.instanceToReadDto(game, ReadGameDto);
  }

  @Delete(':id')
  @ApiResponse({type: ReadGameDto, status: HttpStatus.NO_CONTENT})
  @ApiResponseNotFound()
  async remove(@Param('id') id: string): Promise<ReadGameDto> {
    const game = await this.validateExists(id);
    await this.gameService.remove(id);
    return DtoUtils.instanceToReadDto(game, ReadGameDto);
  }
}