import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AdminJwtAuthGuard } from '../auth/guards/admin-jwt-auth.guard';

@Controller('admin/assets')
@UseGuards(AdminJwtAuthGuard)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('init')
  async initUpload(
    @Body() body: { fileName: string; contentType: string; byteSize: number },
    @Req() req: { user?: { id: string } },
  ) {
    // Basic implementation for demonstration
    const { fileName, contentType, byteSize } = body;
    const adminId = req.user?.id || 'admin-system';

    return this.assetService.initUpload(
      fileName,
      contentType,
      byteSize,
      adminId,
    );
  }

  @Post('confirm')
  async confirmUpload(
    @Body() body: { assetId: string },
    @Req() req: { user?: { id: string } },
  ) {
    const { assetId } = body;
    const adminId = req.user?.id || 'admin-system';

    return this.assetService.confirmUpload(assetId, adminId);
  }
}
