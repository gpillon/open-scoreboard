import {ApiProperty} from "@nestjs/swagger";
import {CreatePlayerScoreDto} from "./create-game-player.dto";
import {CreateTrackDto} from "../../track/dto/create-track.dto";
import {IsArray, Validate, ValidateNested} from "class-validator";
import {IsType} from "../../../utils/decorators/is-type.decorator";
import {Expose, Type} from "class-transformer";

export class CreateGameDto {
    @ApiProperty({type: CreatePlayerScoreDto, isArray: true})
    @IsArray()
    @Type(() => CreatePlayerScoreDto)
    @ValidateNested()
    @Expose()
    playerScore: CreatePlayerScoreDto[]

    @ApiProperty({
        oneOf: [
            {type: "string", format: "uuid", example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"},
            {$ref: `#/components/schemas/${CreateTrackDto.name}`}
        ]
    })
    @Validate(IsType, [String, CreateTrackDto], {message: "Invalid Track. Track must be either the name of an existing track name or the corresponding uuid, or a new track. "})
    @Type((r) => {
        return typeof r.object[r.property] === "string" ? String : CreateTrackDto
    })
    @Expose()
    track: string | CreateTrackDto;


}
