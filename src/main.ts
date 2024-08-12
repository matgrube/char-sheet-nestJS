import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig, swaggerOptions } from './common/utils/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = swaggerConfig();
  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerOptions);

  await app.listen(3000);
}
bootstrap();
