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
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadTrackDto } from './dto/read-track.dto';
import {
  AlreadyExistsErr,
  ApiResponseAlreadyExists,
} from '../../utils/decorators/already-exists.decorator';
import {
  ApiResponseNotFound,
  NotFoundErr,
} from '../../utils/decorators/notfound.decorator';
import { ApiResponseBadRequestDecorator } from '../../utils/decorators/bad-request.decorator';
import { DtoUtils } from '../../utils/dto-utils.class';
import { Track } from './entities/track.entity';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { CountDto } from '../../utils/dto/count.dto';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('/count')
  @ApiOkResponse({ type: CountDto })
  async count() {
    const count = await this.trackService.count();
    return DtoUtils.instanceToReadDto(count, CountDto);
  }

  @Post()
  @ApiResponse({ type: ReadTrackDto, status: HttpStatus.CREATED })
  @ApiResponseAlreadyExists()
  async create(@Body() createTrackDto: CreateTrackDto) {
    let newTrack: Track;
    if (await this.trackService.findOne(createTrackDto.name)) {
      throw new AlreadyExistsErr('Track');
    }
    try {
      newTrack = await this.trackService.create(createTrackDto);
    } catch (e) {
      throw new BadRequestException({ error: e.message });
    }
    return DtoUtils.instanceToReadDto(newTrack, ReadTrackDto);
  }

  @Get()
  @ApiResponse({ type: ReadTrackDto, isArray: true, status: HttpStatus.OK })
  async findAll() {
    const tracks = await this.trackService.findAll();
    return DtoUtils.instanceToReadDtoArray(tracks, ReadTrackDto);
  }

  @Get(':id')
  @ApiResponse({ type: ReadTrackDto, status: HttpStatus.OK })
  @ApiResponseNotFound()
  async findOne(@Param('id') id: string) {
    const track = await this.validateExists(id);
    return DtoUtils.instanceToReadDto(track, ReadTrackDto);
  }

  private async validateExists(id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new NotFoundErr('Track');
    return track;
  }

  @Patch(':id')
  @ApiResponse({ type: ReadTrackDto, status: HttpStatus.OK })
  @ApiResponseBadRequestDecorator()
  @ApiResponseNotFound()
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.validateExists(id);
    if (track.name === updateTrackDto.name)
      throw new BadRequestException('Track already has this name');
    if (await this.trackService.findOne(updateTrackDto.name)) {
      throw new AlreadyExistsErr('Track');
    }
    await this.trackService.update(id, updateTrackDto);
    const updatedTrack = await this.findOne(id);
    return DtoUtils.instanceToReadDto(updatedTrack, ReadTrackDto);
  }

  @Delete(':id')
  @ApiResponse({ type: ReadTrackDto, status: HttpStatus.NO_CONTENT })
  @ApiResponseNotFound()
  async remove(@Param('id') id: string): Promise<ReadTrackDto> {
    const track = await this.validateExists(id);
    await this.trackService.remove(id);
    return DtoUtils.instanceToReadDto(track, ReadTrackDto);
  }
}
