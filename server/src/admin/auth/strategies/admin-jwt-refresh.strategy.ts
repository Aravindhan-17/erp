import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminJwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'admin-jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.admin_refresh_token as string | null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_REFRESH_SECRET') ||
        'supersecretrefreshjwtsecret',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: Record<string, any>): Record<string, any> {
    const refreshToken = (req.cookies as Record<string, string>)
      ?.admin_refresh_token;
    const sessionId = payload.sessionId as string;

    if (!refreshToken || !sessionId) {
      throw new UnauthorizedException('Refresh token or session ID missing');
    }

    return {
      ...payload,
      refreshToken,
      sessionId,
    };
  }
}
