import { Module } from '@nestjs/common';
import { CustomerAuthService } from './customer-auth.service';
import { CustomerAuthController } from './customer-auth.controller';
import { CustomerUsersModule } from '../users/customer-users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerJwtStrategy } from './strategies/customer-jwt.strategy';
import { CustomerJwtRefreshStrategy } from './strategies/customer-jwt-refresh.strategy';

@Module({
  imports: [
    CustomerUsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'super-secret',
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CustomerAuthController],
  providers: [
    CustomerAuthService,
    CustomerJwtStrategy,
    CustomerJwtRefreshStrategy,
  ],
})
export class CustomerAuthModule {}
