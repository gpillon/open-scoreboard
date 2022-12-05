import { Module } from '@nestjs/common';
import { HealthcheckController } from './api/healthcheck/healthcheck.controller';
import { HealthcheckService } from './api/healthcheck/healthcheck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api-module';
import { config } from './config/index';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.dataSourceOptions),
    AuthModule,
    ApiModule,
  ],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class AppModule {}
