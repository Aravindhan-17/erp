import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CustomerAuthService } from './customer-auth.service';
import { CustomerAuthController } from './customer-auth.controller';
import { CustomerJwtStrategy } from '../strategies/customer-jwt.strategy';
import { CustomerJwtRefreshStrategy } from '../strategies/customer-jwt-refresh.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>('CUSTOMER_JWT_SECRET') || 'super-secret',
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    CustomerAuthService,
    CustomerJwtStrategy,
    CustomerJwtRefreshStrategy,
  ],
  controllers: [CustomerAuthController],
})
export class CustomerAuthModule {}
