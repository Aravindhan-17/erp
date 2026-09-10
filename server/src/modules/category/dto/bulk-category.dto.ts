import { IsArray, IsEnum, IsUUID, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryStatus } from '@prisma/client';

export class BulkStatusDto {
  @ApiProperty({ description: 'Array of Category IDs' })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  ids: string[];

  @ApiProperty({ enum: CategoryStatus })
  @IsEnum(CategoryStatus)
  status: CategoryStatus;
}

export class BulkDeleteDto {
  @ApiProperty({ description: 'Array of Category IDs to delete' })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  ids: string[];
}
