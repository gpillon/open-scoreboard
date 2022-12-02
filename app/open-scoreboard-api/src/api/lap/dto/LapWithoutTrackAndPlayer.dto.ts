import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { CreateLapDto } from './create-lap.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class LapWithoutTrackAndPlayer extends OmitType(CreateLapDto, [
  'track',
  'player',
  'lapNum',
]) {
  @ApiPropertyOptional({ type: 'number', example: 1 })
  @IsNumber()
  @Expose()
  @IsOptional()
  lapNum?: number;
}
