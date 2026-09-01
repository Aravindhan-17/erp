import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class WalletTransactionDto {
  @ApiProperty({ description: 'The amount to add or remove', example: 500 })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({
    description: 'The type of transaction',
    enum: TransactionType,
    example: TransactionType.CREDIT,
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiPropertyOptional({
    description: 'Description of the transaction',
    example: 'Support refund for Order #123',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
