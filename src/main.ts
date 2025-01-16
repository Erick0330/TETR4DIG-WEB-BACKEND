import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  app.enableCors({
    origin: 'http://localhost:3000', // Cambia esto según tu frontend
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  const config = new DocumentBuilder()
    .setTitle("TETR4DIG Documentation")
    .setDescription("The TETR4DIG REST API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(envs.port);
}

bootstrap();