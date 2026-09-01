import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminUsersModule } from './admin/users/admin-users.module';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { HealthModule } from './shared/health/health.module';
import { CustomerUsersModule } from './customer/users/customer-users.module';
import { CustomerAuthModule } from './customer/auth/customer-auth.module';
import { CustomerProfileModule } from './customer/profile/customer-profile.module';
import { AdminCustomersModule } from './admin/customers/admin-customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AdminUsersModule,
    AdminAuthModule,
    HealthModule,
    CustomerUsersModule,
    CustomerAuthModule,
    CustomerProfileModule,
    AdminCustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
