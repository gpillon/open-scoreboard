import {applyDecorators, HttpStatus, NotFoundException} from "@nestjs/common";
import {ApiProperty, ApiResponse} from "@nestjs/swagger";

export class NotFoundErr extends NotFoundException {

    constructor(s: string) {
        super(`Requested ${s} not found`)
    }

    @ApiProperty({type: "string", example: "Requested <Resource> not found"})
    message: string

    @ApiProperty({type: "string", example: "Bad Request"})
    error: "Bad Request"

    @ApiProperty({enum: [404]})
    statusCode: number
}

export function ApiResponseNotFound() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            type: NotFoundErr
        })
    )

}
