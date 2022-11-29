import {ApiProperty} from "@nestjs/swagger";
import {IdDto} from "./id.dto";
import {Expose} from "class-transformer";

export class IdNameDto extends IdDto {
    @ApiProperty({type: "string", example: "track-1"})
    @Expose()
    name: string
}