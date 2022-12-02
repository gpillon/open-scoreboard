import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class IdDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @Expose()
  id: number;
}
