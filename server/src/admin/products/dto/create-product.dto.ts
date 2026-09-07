import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray, IsEnum, IsDateString } from 'class-validator';
import { ProductStatus } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  salePrice?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsBoolean()
  @IsOptional()
  isFlashDeal?: boolean;

  @IsDateString()
  @IsOptional()
  flashDealStartTime?: string;

  @IsDateString()
  @IsOptional()
  flashDealEndTime?: string;

  @IsNumber()
  @IsOptional()
  registrationFee?: number;

  @IsNumber()
  @IsOptional()
  minOrderValue?: number;

  @IsNumber()
  @IsOptional()
  maxQuantityPerUser?: number;
}
