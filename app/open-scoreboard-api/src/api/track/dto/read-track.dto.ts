import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class ReadTrackDto {
    @ApiProperty({type: "string", format: "uuid"})
    @Expose()
    id: string;

    @ApiProperty({type: "string", example: "track-1"})
    @Expose()
    name: string

    @ApiProperty({type: "string", example: "Best Track Ever!"})
    @Expose()
    description: string

    // @ApiProperty({type: ReadGameDto, isArray: true})
    // games: ReadGameDto;

}
