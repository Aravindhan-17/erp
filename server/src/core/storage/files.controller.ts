import { Controller, Get, Param, Res } from '@nestjs/common';
import { StorageService } from './storage.service';
import type { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Public Files')
@Controller('files')
export class FilesController {
  constructor(private readonly storageService: StorageService) {}

  @Get(':folder/:filename')
  @ApiOperation({ summary: 'Redirects to a presigned download URL for a file' })
  async getFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const key = `${folder}/${filename}`;
    const url = await this.storageService.generatePresignedDownloadUrl(key);
    return res.redirect(302, url);
  }
}
