import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { StorageService } from '../../core/storage/storage.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Initializes an upload by creating an Asset in UPLOAD_PENDING state
   * and generating a pre-signed URL from B2.
   */
  async initUpload(
    fileName: string,
    contentType: string,
    byteSize: number,
    userId: string,
  ) {
    const storageKey = `assets/${uuidv4()}-${fileName}`;

    // Create asset in DB
    const asset = await this.prisma.asset.create({
      data: {
        storageKey,
        status: 'UPLOAD_PENDING',
        createdBy: userId,
        contentType,
        byteSize,
      },
    });

    // Ask StorageService for the URL
    const uploadUrl = await this.storageService.generatePresignedUploadUrl(
      storageKey,
      contentType,
      3600,
    );

    const port = this.configService.get<number>('PORT') || 4000;
    const appUrl =
      this.configService.get<string>('APP_URL') || `http://localhost:${port}`;
    const publicUrl = `${appUrl}/api/files/${storageKey}`;

    return { uploadUrl, publicUrl, assetId: asset.id };
  }

  /**
   * Confirms an upload by checking B2 for the object and marking it TEMPORARY
   */
  async confirmUpload(assetId: string, userId: string) {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    if (asset.createdBy !== userId) {
      throw new BadRequestException('Not authorized to confirm this asset');
    }

    if (asset.status !== 'UPLOAD_PENDING') {
      throw new BadRequestException('Asset is not in UPLOAD_PENDING state');
    }

    try {
      // Verify object exists in B2
      await this.storageService.headObject(asset.storageKey);
    } catch (err) {
      this.logger.error(
        `Failed to find object in B2 for asset ${asset.id}`,
        err,
      );
      throw new BadRequestException(
        'Object not found in storage. Ensure upload completed.',
      );
    }

    // Mark as TEMPORARY
    const updated = await this.prisma.asset.update({
      where: { id: assetId },
      data: {
        status: 'TEMPORARY',
        confirmedAt: new Date(),
      },
    });

    return updated;
  }

  /**
   * Used by CategoryService inside a transaction to activate a newly attached asset
   */
  async activateAsset(tx: Prisma.TransactionClient, assetId: string) {
    const asset = await tx.asset.findUnique({ where: { id: assetId } });
    if (!asset) {
      throw new Error(`Asset ${assetId} not found`);
    }
    if (asset.status !== 'TEMPORARY') {
      throw new Error(
        `Asset ${assetId} cannot be activated (current status: ${asset.status})`,
      );
    }

    await tx.asset.update({
      where: { id: assetId },
      data: { status: 'ACTIVE' },
    });
  }

  /**
   * Used by CategoryService inside a transaction to queue an old asset for deletion
   */
  async markDeletePending(tx: Prisma.TransactionClient, assetId: string) {
    await tx.asset.update({
      where: { id: assetId },
      data: {
        status: 'DELETE_PENDING',
        deletePendingAt: new Date(),
      },
    });
  }
}
