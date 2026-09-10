import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('WorkerBootstrap');

  // Create a headless application context
  const app = await NestFactory.createApplicationContext(WorkerModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(PinoLogger));

  // Enable shutdown hooks for graceful termination
  app.enableShutdownHooks();

  logger.log('Worker process is running...');
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
