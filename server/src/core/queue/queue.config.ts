import { BullRootModuleOptions } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

export const getQueueConfig = (
  configService: ConfigService,
): BullRootModuleOptions => {
  return {
    connection: {
      host: configService.get<string>('REDIS_HOST', 'localhost'),
      port: configService.get<number>('REDIS_PORT', 6379),
      password: configService.get<string>('REDIS_PASSWORD'),
      username: configService.get<string>('REDIS_USERNAME'),
      db: configService.get<number>('REDIS_DB', 0),
      tls: configService.get<string>('REDIS_TLS') === 'true' ? {} : undefined,
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  };
};
