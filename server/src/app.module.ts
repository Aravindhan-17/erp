import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminUsersModule } from './admin/users/admin-users.module';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { HealthModule } from './shared/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AdminUsersModule,
    AdminAuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
