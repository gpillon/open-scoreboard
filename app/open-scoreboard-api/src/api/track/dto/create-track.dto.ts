import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional, IsString, MaxLength} from "class-validator";
import {Expose} from "class-transformer";

export class CreateTrackDto {

    @ApiProperty({type: "string", example: "track-1"})
    @IsString()
    @MaxLength(80)
    @Expose()
    name: string

    @ApiPropertyOptional({type: "string", example: "Best Track Ever!"})
    @IsString()
    @IsOptional()
    @MaxLength(3000)
    @Expose()
    description: string
}
