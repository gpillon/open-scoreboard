import {ApiPropertyOptional} from "@nestjs/swagger";
import {CreateTrackDto} from "../../track/dto/create-track.dto";
import {IsOptional, Validate} from "class-validator";
import {IsType} from "../../../utils/decorators/is-type.decorator";
import {Expose, Type} from "class-transformer";

export class UpdateGameDto {
    // @ApiPropertyOptional({type: CreatePlayerScoreDto})
    // score: CreatePlayerScoreDto

    @ApiPropertyOptional({
        oneOf: [
            {type: "string"},
            {$ref: `#/components/schemas/${CreateTrackDto.name}`}
        ]
    })
    @Validate(IsType, [String, CreateTrackDto], {message: "Invalid Track. Track must be either the name of an existing track name or the corresponding uuid, or a new track. "})
    @Type((r) => {
        return typeof r.object[r.property] === "string" ? String : CreateTrackDto
    })
    @IsOptional()
    @Expose()
    track: string | CreateTrackDto;
}
