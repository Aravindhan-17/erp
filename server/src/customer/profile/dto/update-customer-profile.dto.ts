import { IsOptional, IsString } from 'class-validator';
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
}
