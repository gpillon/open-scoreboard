import { Expose } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { IdDto } from './Id.dto';

export class UpdateServerDto extends IdDto {
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
