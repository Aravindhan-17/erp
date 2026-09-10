import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AssetService } from '../../modules/asset/asset.service';
import { GenerateUploadUrlDto } from './dto/generate-upload-url.dto';
import { AdminJwtAuthGuard } from '../../modules/auth/guards/admin-jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Admin Uploads')
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller('admin/uploads')
export class UploadsController {
  constructor(private readonly assetService: AssetService) {}

  @Post('presigned-url')
  @ApiOperation({ summary: 'Generate a presigned S3 upload URL' })
  @ApiResponse({
    status: 201,
    description: 'Returns an upload URL and object key.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed for file size or type.',
  })
  async getPresignedUrl(
    @Body() body: GenerateUploadUrlDto,
    @Req() req: { user?: { id: string } },
  ) {
    const adminId = req.user?.id || 'admin-system';
    return await this.assetService.initUpload(
      body.fileName,
      body.contentType,
      body.fileSize,
      adminId,
    );
  }
}
