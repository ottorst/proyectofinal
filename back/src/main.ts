import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { auth0Config } from './config/auth0-config';
import { auth } from 'express-openid-connect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS
  app.enableCors();
  
  // Auth0 con express-openid-connect
  app.use(auth(auth0Config));

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

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
