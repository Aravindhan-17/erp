import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCustomerAddressDto {
  @ApiProperty({ example: 'Home' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+1 (555) 123-4567' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '123 E-commerce St' })
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @ApiPropertyOptional({ example: 'Suite 100' })
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @ApiProperty({ example: 'San Francisco' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'CA' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '94107' })
  @IsString()
  @IsNotEmpty()
  zip: string;

  @ApiProperty({ example: 'United States' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiPropertyOptional({ example: 'Please leave package at the front desk.' })
  @IsString()
  @IsOptional()
  deliveryInstructions?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isDefaultShipping?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isDefaultBilling?: boolean;
}
