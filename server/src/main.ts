import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './shared/utils/setup-swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.enableCors({
    origin:
      configService.get<string>('NEXT_PUBLIC_API_URL') ||
      'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  setupSwagger(app);

  const port = configService.get<number>('PORT') ?? 3001;

  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);

  if (configService.get<string>('NODE_ENV') !== 'production') {
    console.log(
      `📚 Documentation is available at: http://localhost:${port}/api/docs`,
    );
  }
}

void bootstrap();
