import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './shared/utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  
  app.enableCors({
    origin:
      configService.get<string>('NEXT_PUBLIC_API_URL') ||
      'http://localhost:3000',
    credentials: true,
  });

  setupSwagger(app);

  const port = configService.get<number>('PORT') ?? 3001;
  
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  
  if (configService.get<string>('NODE_ENV') !== 'production') {
    console.log(`📚 Documentation is available at: http://localhost:${port}/api/docs`);
  }

}
bootstrap();
