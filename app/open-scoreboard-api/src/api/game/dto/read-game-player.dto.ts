import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {CreateTrackDto} from "../../track/dto/create-track.dto";
import {IsOptional, Validate} from "class-validator";
import {IsType} from "../../../utils/decorators/is-type.decorator";
import {Expose, Type} from "class-transformer";
import {ReadPlayerDto} from "../../player/dto/read-player.dto";
import {LapWithoutTrackAndPlayer} from "../../lap/dto/LapWithoutTrackAndPlayer.dto";
import {IdNameDto} from "../../../utils/dto/id-name.dto";
import {IdNicknameDto} from "../../../utils/dto/id-nickname.dto";

export class ReadPlayerScoreDto {
    @ApiProperty({type: IdNicknameDto})
    @Expose()
    @Type(() => IdNicknameDto)
    player: IdNicknameDto

    @ApiProperty({type: LapWithoutTrackAndPlayer, isArray: true})
    @Expose()
    @Type(() => LapWithoutTrackAndPlayer)
    laps: LapWithoutTrackAndPlayer[];

    @ApiProperty({type: "number"})
    @Expose()
    totalTime: number;

}
