import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdUserParamDto {
  @ApiProperty({
    type: 'string',
    // format: 'uuid'
  })
  @IsString()
  id: string;
}
