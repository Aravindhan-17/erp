import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OutboxService } from './outbox.service';

@Injectable()
export class OutboxRelay
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(OutboxRelay.name);
  private isShuttingDown = false;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(
    private readonly outboxService: OutboxService,
    @InjectQueue('flasherp-queue') private readonly queue: Queue,
  ) {}

  onApplicationBootstrap() {
    this.logger.log('Starting Outbox Relay loop...');
    this.scheduleNextTick(0);
  }

  onApplicationShutdown() {
    this.logger.log('Shutting down Outbox Relay...');
    this.isShuttingDown = true;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private scheduleNextTick(delayMs: number = 2000) {
    if (this.isShuttingDown) return;
    this.timeoutId = setTimeout(() => {
      void this.processOutbox();
    }, delayMs);
  }

  private async processOutbox() {
    if (this.isShuttingDown) return;

    try {
      // 1. Atomically claim up to 50 rows in one quick SQL statement
      const events = await this.outboxService.claimBatch(50);

      if (events.length > 0) {
        this.logger.debug(`Claimed ${events.length} outbox events`);

        // 2. Safely publish to BullMQ *outside* of the database lock!
        for (const event of events) {
          try {
            await this.queue.add(
              event.eventType,
              {
                outboxEventId: event.id,
                claimToken: event.claimToken, // MUST pass claim token to processor
                payload: event.payload,
              },
              {
                jobId: `${event.eventType}:${event.id}:${event.attempts}`, // Ensure idempotency in BullMQ
                removeOnComplete: true,
                removeOnFail: false,
              },
            );
          } catch (e: unknown) {
            const enqueueError = e as Error;
            this.logger.error(
              `Failed to enqueue event ${event.id}:`,
              enqueueError,
            );
            // Revert status to PENDING with a small backoff
            await this.outboxService.markFailed(
              event.id,
              event.claimToken,
              enqueueError.message,
              true,
            );
          }
        }

        // If we processed a full batch, check again immediately
        if (events.length === 50) {
          this.scheduleNextTick(0);
          return;
        }
      }
    } catch (err) {
      this.logger.error('Error during outbox relay batch claim', err);
    }

    // Default polling interval if nothing was found or batch was small
    this.scheduleNextTick(2000);
  }
}
