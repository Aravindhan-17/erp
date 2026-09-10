import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getQueueConfig } from './queue.config';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getQueueConfig(configService),
      inject: [ConfigService],
    }),
    // Register the main queue here globally so it can be injected across modules
    BullModule.registerQueue({
      name: 'flasherp-queue',
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
