import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class CustomerJwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'customer-jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return (request?.cookies as Record<string, string>)
            ?.client_refresh_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('CUSTOMER_JWT_REFRESH_SECRET') ||
        'super-refresh-secret',
      passReqToCallback: true,
    });
  }

  validate(
    request: Request,
    payload: Record<string, any>,
  ): Record<string, any> {
    const refreshToken = (request?.cookies as Record<string, string>)
      ?.client_refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    return {
      ...payload,
      refreshToken,
      sessionId: payload.sessionId as string,
    };
  }
}
