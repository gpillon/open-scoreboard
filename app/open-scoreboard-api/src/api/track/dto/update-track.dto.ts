import { ApiPropertyOptional} from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength} from "class-validator";
import {Expose} from "class-transformer";

export class UpdateTrackDto {
    @ApiPropertyOptional({type: "string", example: "track-2"})
    @IsOptional()
    @IsString()
    @MaxLength(80)
    @Expose()
    name?: string

    @ApiPropertyOptional({type: "string", example: "(Quite) Best Track Ever!"})
    @IsOptional()
    @IsString()
    @MaxLength(3000)
    @Expose()
    description?: string
}
