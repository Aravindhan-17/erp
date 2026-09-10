import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './core/config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(PinoLogger));

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
    origin: [
      configService.get<string>('NEXT_PUBLIC_API_URL') ||
        'http://localhost:3000',
      configService.get<string>('CLIENT_APP_URL') || 'http://localhost:5173',
      configService.get<string>('ADMIN_APP_URL') || 'http://localhost:5174',
    ],
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
