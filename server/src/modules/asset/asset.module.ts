import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { UploadsController } from '../../core/storage/uploads.controller';
import { StorageModule } from '../../core/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [AssetController, UploadsController],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
