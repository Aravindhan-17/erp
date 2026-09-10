import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from './core/database/prisma.module';
import { QueueModule } from './core/queue/queue.module';
import { OutboxModule } from './modules/outbox/outbox.module';
import { AssetModule } from './modules/asset/asset.module';
import { AssetProcessor } from './modules/asset/asset.processor';
import { AssetCleanupScheduler } from './modules/asset/asset-cleanup.scheduler';
import { EmailModule } from './core/email/email.module';
import { EmailProcessor } from './core/email/email.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    PrismaModule,
    QueueModule,
    OutboxModule,
    AssetModule,
    EmailModule,
  ],
  controllers: [],
  providers: [AssetProcessor, AssetCleanupScheduler, EmailProcessor],
})
export class WorkerModule {}
