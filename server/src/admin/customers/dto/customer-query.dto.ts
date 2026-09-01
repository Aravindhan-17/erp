import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class CustomerQueryDto {
  @ApiPropertyOptional({ description: 'Search term for name, email, or phone' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by customer segment (e.g., active, suspended)',
  })
  @IsOptional()
  @IsString()
  segment?: string;

  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order (asc or desc)',
    enum: SortOrder,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.DESC;
}
