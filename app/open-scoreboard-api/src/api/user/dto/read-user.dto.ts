import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../auth/rbac/role.enum';

export class ReadUserDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: 'string', enum: Role, isArray: true })
  roles: Role[];

  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  lastName?: string;

  // @ApiProperty()
  // address?: AddressDto;
  //
  // @ApiProperty()
  // settings?: SettingsDto;
}
