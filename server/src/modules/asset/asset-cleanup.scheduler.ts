import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AssetCleanupScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(AssetCleanupScheduler.name);

  constructor(@InjectQueue('flasherp-queue') private readonly queue: Queue) {}

  async onApplicationBootstrap() {
    this.logger.log('Scheduling repeatable asset-cleanup-sweep job');

    // Schedule the sweep every hour
    await this.queue.add(
      'asset-cleanup-sweep',
      {},
      {
        jobId: 'asset-cleanup-sweep-job',
        repeat: {
          pattern: '0 * * * *', // Every hour
        },
      },
    );
  }
}
