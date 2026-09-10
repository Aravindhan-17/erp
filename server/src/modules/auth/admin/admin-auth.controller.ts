import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import type { Response, Request } from 'express';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { AdminJwtRefreshGuard } from '../guards/admin-jwt-refresh.guard';
import { ConfigService } from '@nestjs/config';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminSignInDto } from './dto/admin-sign-in.dto';
import { AdminForgotPasswordDto } from './dto/admin-forgot-password.dto';
import { AdminResetPasswordDto } from './dto/admin-reset-password.dto';

@ApiTags('Admin Auth')
@Controller('auth/admin')
export class AdminAuthController {
  constructor(
    private readonly authService: AdminAuthService,
    private configService: ConfigService,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in as an admin' })
  @ApiBody({ type: AdminSignInDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully signed in. Sets an HTTP-only cookie.',
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  async signIn(
    @Body() body: AdminSignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const admin = await this.authService.validateAdmin(
      body.email,
      body.password,
    );
    const {
      access_token,
      refresh_token,
      admin: adminData,
    } = await this.authService.signIn(admin);

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('admin_refresh_token', refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/api/auth/admin',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      message: 'Signed in successfully',
      access_token,
      admin: adminData,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out the current admin' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out. Clears the HTTP-only cookie.',
  })
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as { sessionId?: string };
    if (user?.sessionId) {
      this.authService.logout(user.sessionId).catch(console.error);
    }

    res.clearCookie('admin_refresh_token', { path: '/api/auth/admin' });
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
  @ApiBearerAuth()
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // We know these exist because the guard passed
    const user = req.user as {
      sessionId: string;
      refreshToken: string;
      sub: string;
    };
    const tokens = await this.authService.refreshTokens(
      user.sessionId,
      user.refreshToken,
      user.sub,
    );

    if (!tokens) {
      res.clearCookie('admin_refresh_token', { path: '/api/auth/admin' });
      throw new UnauthorizedException('Session expired or invalid');
    }

    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('admin_refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/api/auth/admin',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      message: 'Tokens refreshed successfully',
      access_token: tokens.access_token,
    };
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current admin profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the currently authenticated admin user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized or token expired.' })
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request a password reset email' })
  @ApiBody({ type: AdminForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'If the email exists, a password reset link will be sent.',
  })
  async forgotPassword(@Body() body: AdminForgotPasswordDto) {
    await this.authService.forgotPassword(body.email);
    return {
      message: 'If the email exists, a password reset link has been sent.',
    };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using a token' })
  @ApiBody({ type: AdminResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password has been reset successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired token.' })
  async resetPassword(@Body() body: AdminResetPasswordDto) {
    await this.authService.resetPassword(body.token, body.newPassword);
    return { message: 'Password has been reset successfully.' };
  }
}
