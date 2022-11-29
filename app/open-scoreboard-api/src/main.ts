import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("/api/v1/")
    app.useGlobalPipes(new ValidationPipe({
        transform: true, transformOptions: {
            excludeExtraneousValues: true,
            exposeUnsetFields: false
        }
    }));

    const config = new DocumentBuilder()
        .setTitle('Open Scoreboard')
        .setDescription('Open Scoreboard API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);



    await app.listen(3000);
}

bootstrap();
