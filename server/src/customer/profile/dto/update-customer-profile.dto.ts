import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerProfileDto {
  @ApiPropertyOptional({ description: 'The first name of the customer' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'The last name of the customer' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'The phone number of the customer' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'The date of birth of the customer',
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dob?: Date;

  @ApiPropertyOptional({
    description: 'The gender of the customer',
    enum: Gender,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}
