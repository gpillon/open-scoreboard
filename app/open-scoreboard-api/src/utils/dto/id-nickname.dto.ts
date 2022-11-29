import {ApiProperty} from "@nestjs/swagger";
import {IdDto} from "./id.dto";
import {Expose} from "class-transformer";

export class IdNicknameDto extends IdDto {
    @ApiProperty({type: "string", example: "track-1"})
    @Expose()
    nickname: string
}