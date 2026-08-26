import { Controller, Post, Body, Res, UnauthorizedException, Get, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import type { Response, Request } from 'express';
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard';
import { AdminJwtRefreshGuard } from './guards/admin-jwt-refresh.guard';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty, ApiCookieAuth } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/admin-login.dto';

@ApiTags('Admin Auth')
@Controller('auth/admin')
export class AdminAuthController {
  constructor(
    private readonly authService: AdminAuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in as an admin' })
  @ApiBody({ type: AdminLoginDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in. Sets an HTTP-only cookie.',
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  async login(
    @Body() body: AdminLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const admin = await this.authService.validateAdmin(
      body.email,
      body.password,
    );
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { access_token, refresh_token, session_id, admin: adminData } =
      await this.authService.login(admin);

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('admin_access_token', access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    res.cookie('admin_refresh_token', refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie('admin_session_id', session_id, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { message: 'Logged in successfully', admin: adminData };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out the current admin' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out. Clears the HTTP-only cookie.',
  })
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sessionId = req.cookies?.admin_session_id as string | undefined;
    if (sessionId) {
      this.authService.logout(sessionId).catch(console.error);
    }

    res.clearCookie('admin_access_token');
    res.clearCookie('admin_refresh_token');
    res.clearCookie('admin_session_id');
    return { message: 'Logged out successfully' };
  }

  @Post('refresh')
  @UseGuards(AdminJwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh the admin access token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed token. Sets new HTTP-only cookies.',
  })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // We know these exist because the guard passed
    const user = req.user as any; 
    const tokens = await this.authService.refreshTokens(user.sessionId, user.refreshToken, user.sub);
    
    if (!tokens) {
      res.clearCookie('admin_access_token');
      res.clearCookie('admin_refresh_token');
      res.clearCookie('admin_session_id');
      throw new UnauthorizedException('Session expired or invalid');
    }

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('admin_access_token', tokens.access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    res.cookie('admin_refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { message: 'Tokens refreshed successfully' };
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('me')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get current admin profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the currently authenticated admin user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized or token expired.' })
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
