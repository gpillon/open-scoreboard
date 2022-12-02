import {
  applyDecorators,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class AlreadyExistsErr extends BadRequestException {
  constructor(s: string) {
    super(`Requested ${s} Already Exists`);
  }

  @ApiProperty({ type: 'string', example: '<Resource> Already Exists' })
  message: string;

  @ApiProperty({ type: 'string', example: 'Bad Request' })
  error: 'Bad Request';

  @ApiProperty({ enum: [400] })
  statusCode: number;
}

export function ApiResponseAlreadyExists() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      type: AlreadyExistsErr,
    }),
  );
}
