import {applyDecorators, BadRequestException, HttpStatus} from "@nestjs/common";
import {ApiProperty, ApiResponse} from "@nestjs/swagger";

export class BadRequestDecorator extends BadRequestException {

    @ApiProperty({type: "string", example: "Error Message"})
    message: string

    @ApiProperty({type: "string", example: "Bad Request"})
    error: "Bad Request"

    @ApiProperty({enum: [400]})
    statusCode: number
}

export function ApiResponseBadRequestDecorator() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            type: BadRequestDecorator
        })
    )
}
