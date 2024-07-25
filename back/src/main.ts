// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cors
  app.enableCors();

  //pipes
  app.useGlobalPipes(new ValidationPipe())
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Invitación Gourmet API')
    .setDescription('Documentación de la API de Invitación Gourmet')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);

  await app.listen(3001);
}
bootstrap();
