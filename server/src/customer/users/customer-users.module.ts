import { Module } from '@nestjs/common';
import { CustomerUsersService } from './customer-users.service';
import { PrismaModule } from '../../shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CustomerUsersService],
  exports: [CustomerUsersService],
})
export class CustomerUsersModule {}
