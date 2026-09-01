import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerPasswordDto {
  @ApiProperty({ description: 'The current password of the customer' })
  @IsNotEmpty()
  @IsString()
  currentPassword!: string;

  @ApiProperty({ description: 'The new password of the customer' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword!: string;
}
