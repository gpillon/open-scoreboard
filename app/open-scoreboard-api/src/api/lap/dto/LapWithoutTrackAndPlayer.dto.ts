import {OmitType} from "@nestjs/swagger";
import {CreateLapDto} from "./create-lap.dto";

export class LapWithoutTrackAndPlayer extends OmitType(CreateLapDto, ["track", "player"]) {}
