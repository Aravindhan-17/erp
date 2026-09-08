import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AdminAuthService } from './admin/admin-auth.service';
import { AdminAuthController } from './admin/admin-auth.controller';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { AdminJwtRefreshStrategy } from './strategies/admin-jwt-refresh.strategy';

import { CustomerAuthService } from './customer/customer-auth.service';
import { CustomerAuthController } from './customer/customer-auth.controller';
import { CustomerJwtStrategy } from './strategies/customer-jwt.strategy';
import { CustomerJwtRefreshStrategy } from './strategies/customer-jwt-refresh.strategy';
import { EmailModule } from '../../core/email/email.module';


@Module({
  imports: [
    PassportModule,
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'supersecretjwtsecret',
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AdminAuthService,
    AdminJwtStrategy,
    AdminJwtRefreshStrategy,
    CustomerAuthService,
    CustomerJwtStrategy,
    CustomerJwtRefreshStrategy,
  ],
  controllers: [AdminAuthController, CustomerAuthController],
})
export class AuthModule {}
