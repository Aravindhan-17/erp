import { ApiProperty } from '@nestjs/swagger';

export class AdminSignInDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'The email address of the admin',
  })
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the admin',
  })
  password!: string;
}
