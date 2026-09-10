import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { StorageService } from '../../core/storage/storage.service';
import { PrismaService } from '../../core/database/prisma.service';

@Processor('flasherp-queue')
export class AssetProcessor extends WorkerHost {
  private readonly logger = new Logger(AssetProcessor.name);

  constructor(
    private readonly storageService: StorageService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job<unknown, unknown, string>): Promise<void> {
    switch (job.name) {
      case 'delete-asset':
        return this.handleDeleteAsset(
          job.data as { assetId: string; storageKey: string },
        );
      case 'asset-cleanup-sweep':
        return this.handleAssetCleanupSweep();
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async handleDeleteAsset(data: {
    assetId: string;
    storageKey: string;
  }) {
    this.logger.log(`Processing delete-asset for ${data.assetId}`);

    try {
      await this.storageService.deleteFile(data.storageKey);

      // Update DB to DELETED
      await this.prisma.asset.update({
        where: { id: data.assetId },
        data: {
          status: 'DELETED',
          deletedAt: new Date(),
        },
      });
      this.logger.log(`Successfully deleted asset ${data.assetId}`);
    } catch (e: unknown) {
      const err = e as {
        name?: string;
        message: string;
        $metadata?: { httpStatusCode?: number };
      };
      // Semantic B2 SDK Error Handling
      const errName = err.name || '';
      const statusCode = err.$metadata?.httpStatusCode;

      if (
        statusCode === 404 ||
        errName === 'NotFound' ||
        errName === 'NoSuchKey' ||
        statusCode === 204
      ) {
        // B2 actually returns 204 for missing objects on DeleteObject, but just in case it returns 404 for a missing bucket
        if (statusCode === 404 && !errName.includes('NoSuchKey')) {
          this.logger.error(
            `Fatal B2 Error (Bucket missing / bad endpoint): ${data.assetId}`,
            err,
          );
          await this.markAssetFailed(data.assetId, err.message);
          throw new Error(`Fatal B2 Error: ${err.message}`);
        }

        // Treat object absent as success
        await this.prisma.asset.update({
          where: { id: data.assetId },
          data: { status: 'DELETED', deletedAt: new Date() },
        });
        return;
      }

      if (statusCode === 403 || statusCode === 400) {
        this.logger.error(
          `Fatal Auth/Config Error deleting asset ${data.assetId}`,
          err,
        );
        await this.markAssetFailed(data.assetId, err.message);
        throw new Error(`Fatal Auth/Config Error: ${err.message}`);
      }

      // Transient errors (429, 5xx, timeouts) bubble up to trigger BullMQ retry
      this.logger.warn(
        `Transient error deleting asset ${data.assetId}: ${err.message}`,
      );
      throw e instanceof Error ? e : new Error(err.message || 'Unknown error');
    }
  }

  private async handleAssetCleanupSweep() {
    this.logger.log('Running Asset Cleanup Sweep...');

    // Find all assets in DELETE_PENDING state
    const pendingDeletes = await this.prisma.asset.findMany({
      where: {
        status: 'DELETE_PENDING',
      },
      take: 100,
    });

    for (const asset of pendingDeletes) {
      // Enqueue a delete-asset job for each
      // The Queue must be injected if we enqueue, OR we can just use the DB to avoid injecting Queue here
      // But we can also process directly, or rely on a Queue injection.
      // For simplicity, we just do it inline here since this is the worker process!
      try {
        await this.handleDeleteAsset({
          assetId: asset.id,
          storageKey: asset.storageKey,
        });
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        this.logger.error(
          `Sweep failed to process ${asset.id}: ${errorMessage}`,
        );
      }
    }
  }

  private async markAssetFailed(assetId: string, errorMsg: string) {
    await this.prisma.asset.update({
      where: { id: assetId },
      data: {
        lastError: errorMsg,
      },
    });
  }
}
