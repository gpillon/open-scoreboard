import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class ReadPlayerDto {
    @ApiProperty({type: "string", format: "uuid"})
    @Expose()
    id: string;

    @ApiProperty({type:"string", example: "JonnyTheFastest99"})
    @Expose()
    nickname: string;
}
