import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminForgotPasswordDto {
  @ApiProperty({ example: 'admin@example.com', description: 'The email of the admin user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
