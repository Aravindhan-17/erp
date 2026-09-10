import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminJwtStrategy } from '../strategies/admin-jwt.strategy';
import { AdminJwtRefreshStrategy } from '../strategies/admin-jwt-refresh.strategy';
import { EmailModule } from '../../../core/email/email.module';

@Module({
  imports: [
    PassportModule,
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>('ADMIN_JWT_SECRET') ||
          'supersecretjwtsecret',
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AdminAuthService, AdminJwtStrategy, AdminJwtRefreshStrategy],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
