import { IsString, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateUploadUrlDto {
  @ApiProperty({ example: 'banner.jpg' })
  @IsString()
  fileName: string;

  @ApiProperty({ example: 'image/jpeg' })
  @IsString()
  contentType: string;

  @ApiProperty({ example: 102400, description: 'File size in bytes' })
  @IsNumber()
  fileSize: number;

  @ApiProperty({
    example: 'categories',
    description: 'Target folder in bucket',
  })
  @IsString()
  @IsIn(['categories', 'products', 'avatars'], {
    message: 'Invalid upload folder.',
  })
  folder: string;
}
