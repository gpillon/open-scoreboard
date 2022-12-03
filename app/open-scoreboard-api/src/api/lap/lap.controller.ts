import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LapService } from './lap.service';
import { CreateLapDto } from './dto/create-lap.dto';
import { UpdateLapDto } from './dto/update-lap.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadLapDto } from './dto/read-lap.dto';
import { ApiResponseAlreadyExists } from '../../utils/decorators/already-exists.decorator';
import {
  ApiResponseNotFound,
  NotFoundErr,
} from '../../utils/decorators/notfound.decorator';
import { ApiResponseBadRequestDecorator } from '../../utils/decorators/bad-request.decorator';
import { DtoUtils } from '../../utils/dto-utils.class';
import { Lap } from './entities/lap.entity';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { CountDto } from '../../utils/dto/count.dto';
import { QueryGameDto } from '../game/dto/query-game.dto';

@ApiTags('Lap')
@Controller('lap')
export class LapController {
  constructor(private readonly lapService: LapService) {}

  @Get('/count')
  @ApiOkResponse({ type: CountDto })
  async count() {
    const count = await this.lapService.count();
    return DtoUtils.instanceToReadDto(count, CountDto);
  }

  @Post()
  @ApiResponse({ type: ReadLapDto, status: HttpStatus.CREATED })
  @ApiResponseAlreadyExists()
  async create(@Body() createLapDto: CreateLapDto): Promise<ReadLapDto> {
    let newLap: Lap;
    try {
      newLap = await this.lapService.create(createLapDto);
    } catch (e) {
      throw new BadRequestException({ error: e.message });
    }
    return DtoUtils.instanceToReadDto(newLap, ReadLapDto);
  }

  @Get()
  @ApiResponse({ type: ReadLapDto, isArray: true, status: HttpStatus.OK })
  async findAll(@Query() queryGameDto: QueryGameDto): Promise<ReadLapDto[]> {
    const laps: Lap[] = await this.lapService.findAll(queryGameDto);
    return DtoUtils.instanceToReadDtoArray(laps, ReadLapDto);
  }

  @Get(':id')
  @ApiResponse({ type: ReadLapDto, status: HttpStatus.OK })
  @ApiResponseNotFound()
  async findOne(@Param('id') id: string): Promise<ReadLapDto> {
    const lap = await this.validateExists(id);
    return DtoUtils.instanceToReadDto(lap, ReadLapDto);
  }

  private async validateExists(id: string): Promise<Lap> {
    const Lap = await this.lapService.findOne(id);
    if (!Lap) throw new NotFoundErr('Lap');
    return Lap;
  }

  @Patch(':id')
  @ApiResponse({ type: ReadLapDto, status: HttpStatus.OK })
  @ApiResponseBadRequestDecorator()
  @ApiResponseNotFound()
  async update(
    @Param('id') id: string,
    @Body() updateLapDto: UpdateLapDto,
  ): Promise<ReadLapDto> {
    await this.validateExists(id);
    await this.lapService.update(id, updateLapDto);
    const lap = await this.findOne(id);
    return DtoUtils.instanceToReadDto(lap, ReadLapDto);
  }

  @Delete(':id')
  @ApiResponse({ type: ReadLapDto, status: HttpStatus.NO_CONTENT })
  @ApiResponseNotFound()
  async remove(@Param('id') id: string): Promise<ReadLapDto> {
    const lap = await this.validateExists(id);
    await this.lapService.remove(id);
    return DtoUtils.instanceToReadDto(lap, ReadLapDto);
  }
}
