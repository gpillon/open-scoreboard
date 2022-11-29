import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {Expose} from "class-transformer";

export class CreatePlayerDto {
    @ApiProperty({type: "string", example: "JohnVeryFast42"})
    @IsString()
    @MaxLength(80)
    @Expose()
    nickname: string;
}
