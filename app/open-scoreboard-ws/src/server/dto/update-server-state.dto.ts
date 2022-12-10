import { PartialType } from '@nestjs/mapped-types';
import { CreateServerDto } from './create-server.dto';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateServerDto {
  @Expose()
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;
}
