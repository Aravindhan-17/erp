import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CustomerAuthService } from './customer-auth.service';
import { CustomerUsersService } from '../users/customer-users.service';
import type { Response } from 'express';
import { CustomerJwtAuthGuard } from './guards/customer-jwt-auth.guard';
import { CustomerJwtRefreshGuard } from './guards/customer-jwt-refresh.guard';
import * as bcrypt from 'bcrypt';
import { SignUpCustomerDto } from './dto/sign-up-customer.dto';
import { SignInCustomerDto } from './dto/sign-in-customer.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Customer Auth')
@Controller('auth/customer')
export class CustomerAuthController {
  constructor(
    private customerAuthService: CustomerAuthService,
    private customerUsersService: CustomerUsersService,
  ) {}

  @ApiOperation({ summary: 'Sign up a new customer' })
  @ApiResponse({
    status: 201,
    description: 'Customer successfully signed up.',
  })
  @ApiResponse({ status: 401, description: 'Email already in use.' })
  @Post('sign-up')
  async signUp(@Body() body: SignUpCustomerDto) {
    const existing = await this.customerUsersService.findByEmail(body.email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const customer = await this.customerUsersService.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      passwordHash,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = customer;
    return {
      message: 'Signed up successfully',
      customer: result,
    };
  }

  @ApiOperation({ summary: 'Customer sign in' })
  @ApiResponse({ status: 201, description: 'Signed in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @Post('sign-in')
  async signIn(
    @Body() body: SignInCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const customer = await this.customerAuthService.validateCustomer(
      body.email,
      body.password,
    );

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const result = await this.customerAuthService.signIn(customer);

    res.cookie('client_refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/customer',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Signed in successfully',
      access_token: result.access_token,
      customer: result.customer,
    };
  }

  @ApiOperation({ summary: 'Customer logout' })
  @ApiResponse({ status: 201, description: 'Logged out successfully.' })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Post('logout')
  logout(
    @Request() req: { user: Record<string, any> },
    @Res({ passthrough: true }) res: Response,
  ) {
    const sessionId = req.user.sessionId as string;
    void this.customerAuthService.logout(sessionId);

    res.clearCookie('client_refresh_token', { path: '/auth/customer' });

    return { message: 'Logged out successfully' };
  }

  @ApiOperation({ summary: 'Get customer profile' })
  @ApiResponse({ status: 200, description: 'Returns the customer profile.' })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: { user: Record<string, any> }) {
    return req.user;
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 201, description: 'Tokens refreshed successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
  @ApiBearerAuth()
  @UseGuards(CustomerJwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Request() req: { user: Record<string, any> },
    @Res({ passthrough: true }) res: Response,
  ) {
    const customerId = req.user.sub as string;
    const refreshToken = req.user.refreshToken as string;
    const sessionId = req.user.sessionId as string;

    const tokens = await this.customerAuthService.refreshTokens(
      customerId,
      refreshToken,
      sessionId,
    );

    if (!tokens) {
      res.clearCookie('client_refresh_token', { path: '/auth/customer' });
      throw new UnauthorizedException('Invalid refresh token');
    }

    res.cookie('client_refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/customer',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Tokens refreshed successfully',
      access_token: tokens.access_token,
    };
  }

  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({
    status: 201,
    description: 'Password reset email sent if account exists.',
  })
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    await this.customerAuthService.forgotPassword(body.email);
    return {
      message:
        'If an account with that email exists, we have sent a password reset link.',
    };
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 201, description: 'Password reset successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token.' })
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    const success = await this.customerAuthService.resetPassword(
      body.token,
      body.password,
    );

    if (!success) {
      throw new UnauthorizedException(
        'Invalid or expired password reset token',
      );
    }

    return {
      message:
        'Password reset successfully. You can now log in with your new password.',
    };
  }
}
