import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class ReadHealthcheckDto {
    @ApiProperty({type: "number", example: 16.3199068})
    @Expose()
    uptime: number;
}