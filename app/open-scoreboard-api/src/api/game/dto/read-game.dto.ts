import {ApiProperty} from "@nestjs/swagger";
import {ReadPlayerScoreDto} from "./read-game-player.dto";
import {Expose, Type} from "class-transformer";
import {IdDto} from "../../../utils/dto/id.dto";
import {IdNameDto} from "../../../utils/dto/id-name.dto";

export class ReadGameDto extends IdDto {

    @ApiProperty({type: ReadPlayerScoreDto, isArray: true})
    @Type(() => ReadPlayerScoreDto)
    @Expose()
    playerScore: ReadPlayerScoreDto[]

    @ApiProperty({type: IdNameDto})
    @Type(() => IdNameDto)
    @Expose()
    track: IdNameDto;

    @ApiProperty({type: "date"})
    @Expose()
    createdAt: Date;
}
