import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminSignInDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'The email address of the admin',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the admin',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
