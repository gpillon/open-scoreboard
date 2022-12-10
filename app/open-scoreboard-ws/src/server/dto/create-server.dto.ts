import { Expose } from 'class-transformer';
import {
  IsArray,
  IsIP,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import ArrayDistinct from '../../components/validators/array-distinct.validator';

export class CreateServerDto {
  @Expose()
  @IsString()
  @MinLength(2)
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsIP(4)
  remoteIp: string;

  @Expose()
  @IsArray()
  @Validate(ArrayDistinct)
  players: string[];
}
