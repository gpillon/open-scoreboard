import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ReadHealthcheckDto} from "./dto/read-healthcheck.dto";
import {DtoUtils} from "../../utils/dto-utils.class";

@ApiTags("Healthcheck")
@Controller()
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get("/healthcheck")
  @ApiResponse({type: ReadHealthcheckDto, status: 200})
  uptime(): ReadHealthcheckDto {
    const uptime = {uptime: this.healthcheckService.uptime() }
    return DtoUtils.instanceToReadDto(uptime, ReadHealthcheckDto);
  }
}
