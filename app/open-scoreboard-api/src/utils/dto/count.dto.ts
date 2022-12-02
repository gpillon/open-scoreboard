import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CountDto {
  @ApiProperty({ type: 'number', format: 'int' })
  @Expose()
  @IsNumber()
  count: number;
}
