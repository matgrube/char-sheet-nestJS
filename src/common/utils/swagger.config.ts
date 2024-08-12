import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export const swaggerConfig = (): Omit<OpenAPIObject, 'paths'> => {
  return new DocumentBuilder()
    .setTitle('SoL Character Sheet API')
    .setDescription('Documentation for SoL Character Sheet App API')
    .setVersion('0.0.1')
    .build();
};

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: 'SoL Character Sheet API',
  useGlobalPrefix: true,
};
