import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.setGlobalPrefix('/v1/api');
  await app.listen(port);
  console.log(`Running app on :http://localhost:${port}/v1/api`);


}
bootstrap();
