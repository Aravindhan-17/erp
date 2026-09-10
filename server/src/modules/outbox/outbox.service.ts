import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Used by other services to safely publish events into the outbox
   * within an existing Prisma transaction.
   */
  async publishEvent(
    tx: Prisma.TransactionClient,
    eventType: string,
    payload: Prisma.InputJsonValue,
  ) {
    return tx.outboxEvent.create({
      data: {
        eventType,
        payload,
        status: 'PENDING',
      },
    });
  }

  /**
   * Safely claims up to `limit` pending outbox rows using SKIP LOCKED.
   * Assigns a unique UUID to each claimed row via PostgreSQL's gen_random_uuid().
   */
  async claimBatch(limit: number = 50) {
    // The query guaranteed by the implementation plan:
    // CTE selects eligible rows, locks them, and UPDATE assigns a unique claimToken per row.
    return this.prisma.$queryRaw<
      {
        id: string;
        eventType: string;
        payload: Prisma.InputJsonValue;
        status: string;
        attempts: number;
        claimToken: string;
      }[]
    >`
      WITH claimed AS (
          SELECT id
          FROM "OutboxEvent"
          WHERE status = 'PENDING'
            AND (
                "nextAttemptAt" IS NULL
                OR "nextAttemptAt" <= NOW()
            )
          ORDER BY "createdAt" ASC, id ASC
          FOR UPDATE SKIP LOCKED
          LIMIT ${limit}
      )
      UPDATE "OutboxEvent" AS o
      SET
          status = 'PROCESSING',
          "claimedAt" = NOW(),
          "claimToken" = gen_random_uuid(),
          attempts = attempts + 1,
          "lastAttemptAt" = NOW()
      FROM claimed
      WHERE o.id = claimed.id
      RETURNING o.id, o."eventType", o.payload, o.status, o.attempts, o."claimToken";
    `;
  }

  async markProcessed(id: string, claimToken: string) {
    const result = await this.prisma.outboxEvent.updateMany({
      where: {
        id,
        claimToken,
        status: 'PROCESSING',
      },
      data: {
        status: 'PROCESSED',
        processedAt: new Date(),
        claimToken: null, // Clear the token upon success
      },
    });
    if (result.count === 0) {
      this.logger.warn(
        `Failed to mark outbox event ${id} as processed. Token mismatch or not in PROCESSING state.`,
      );
    }
  }

  async markFailed(
    id: string,
    claimToken: string,
    error: string,
    retryable: boolean = true,
  ) {
    // Calculate exponential backoff for retryable errors (e.g., 5 seconds, 25 seconds, etc.)
    // If not retryable, mark as FAILED immediately.
    // Assuming max attempts is 5 for this example, or handled by the caller.
    const event = await this.prisma.outboxEvent.findUnique({ where: { id } });
    if (!event) return;

    const maxAttempts = 10;
    const shouldRetry = retryable && event.attempts < maxAttempts;

    let nextAttemptAt: Date | null = null;
    let newStatus = 'FAILED';

    if (shouldRetry) {
      newStatus = 'PENDING';
      const delayMs = Math.pow(5, event.attempts) * 1000;
      nextAttemptAt = new Date(Date.now() + delayMs);
    }

    const result = await this.prisma.outboxEvent.updateMany({
      where: {
        id,
        claimToken,
        status: 'PROCESSING',
      },
      data: {
        status: newStatus as 'PENDING' | 'FAILED' | 'PROCESSING' | 'PROCESSED',
        lastError: error,
        nextAttemptAt,
        claimToken: null, // Release the lock
      },
    });

    if (result.count === 0) {
      this.logger.warn(
        `Failed to mark outbox event ${id} as failed/retry. Token mismatch or not in PROCESSING state.`,
      );
    }
  }
}
