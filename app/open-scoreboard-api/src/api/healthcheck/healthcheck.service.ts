import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  uptime(): number {
    return process.uptime();
  }
}
