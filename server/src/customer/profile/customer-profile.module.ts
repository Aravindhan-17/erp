import { Module } from '@nestjs/common';
import { CustomerProfileController } from './customer-profile.controller';
import { CustomerUsersModule } from '../users/customer-users.module';
import { CustomerAuthModule } from '../auth/customer-auth.module';

@Module({
  imports: [CustomerUsersModule, CustomerAuthModule],
  controllers: [CustomerProfileController],
  providers: [],
})
export class CustomerProfileModule {}
