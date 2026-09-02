import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerUsersService } from '../../users/customer-users.service';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(
  Strategy,
  'customer-jwt',
) {
  constructor(
    private configService: ConfigService,
    private usersService: CustomerUsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'super-secret',
    });
  }

  async validate(payload: { sub: string; email: string; sessionId: string }) {
    // payload should have { sub, email, sessionId }
    const customer = await this.usersService.findById(payload.sub);
    if (!customer || !customer.isActive) {
      throw new UnauthorizedException();
    }

    // We attach sessionId so that the controller can use it for logout if needed
    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      sessionId: payload.sessionId,
    };
  }
}
