import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

describe('HealthcheckController', () => {
  let healthcheckController: HealthcheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile();

    healthcheckController = app.get<HealthcheckController>(HealthcheckController);
  });

  describe('healthcheckController', () => {
    it('should return Process Uptime', () => {
      expect(healthcheckController.uptime().uptime).toBeDefined();
      expect(healthcheckController.uptime().uptime).toBeGreaterThan(0);
    });
  });
});
