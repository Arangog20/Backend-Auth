import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // bloqueos de consultas externas restringe la capacidad de una aplicación o sistema para realizar solicitudes o consultas a recursos externos,
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API_MINDSET')
    .setDescription('authentication with NestJs and MongoDB ')
    .setVersion('1.0')
    .addTag('Mindset')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('/v1/api');
  console.log(`Running app on :http://localhost:${port}/v1/api`);

  await app.listen(port);
}
bootstrap();
