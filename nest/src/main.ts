import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Playground Nest API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableShutdownHooks();

  await app.listen(3000);

  const appUrl = await app.getUrl();

  console.log(
    `Application is running on: ${appUrl.replace('[::1]', 'localhost')}/`,
  );

  console.log(
    `Swagger is running on: ${appUrl.replace('[::1]', 'localhost')}/api`,
  );
}

bootstrap();
