import { Injectable } from '@nestjs/common';
import { CustomerUsersService } from '../users/customer-users.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerAuthService {
  constructor(
    private customerUsersService: CustomerUsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateCustomer(
    email: string,
    pass: string,
  ): Promise<Omit<Customer, 'passwordHash'> | null> {
    const customer = await this.customerUsersService.findByEmail(email);
    if (customer && customer.isActive) {
      const isMatch = await bcrypt.compare(pass, customer.passwordHash);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...result } = customer;
        return result;
      }
    }
    return null;
  }

  async signIn(customer: { id: string; email: string; [key: string]: any }) {
    const sessionId = randomUUID();
    const tokens = await this.getTokens(customer.id, customer.email, sessionId);
    const hashedToken = await bcrypt.hash(tokens.refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.prisma.customerSession.create({
      data: {
        id: sessionId,
        customerId: customer.id,
        hashedToken,
        expiresAt,
      },
    });

    await this.prisma.customer.update({
      where: { id: customer.id },
      data: { lastLogin: new Date() },
    });

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      customer,
    };
  }

  async logout(sessionId: string) {
    try {
      await this.prisma.customerSession.delete({
        where: { id: sessionId },
      });
    } catch {
      // Ignore if session already deleted or doesn't exist
    }
  }

  async refreshTokens(
    customerId: string,
    refreshToken: string,
    sessionId: string,
  ) {
    const session = await this.prisma.customerSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || !session.hashedToken) return null;

    if (session.expiresAt < new Date()) {
      await this.prisma.customerSession.delete({ where: { id: sessionId } });
      return null;
    }

    const rtMatches = await bcrypt.compare(refreshToken, session.hashedToken);
    if (!rtMatches) return null;

    const customer = await this.customerUsersService.findById(customerId);
    if (!customer) return null;

    const tokens = await this.getTokens(customer.id, customer.email, sessionId);
    const newHashedToken = await bcrypt.hash(tokens.refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.customerSession.update({
      where: { id: sessionId },
      data: {
        hashedToken: newHashedToken,
        expiresAt,
      },
    });

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async forgotPassword(email: string) {
    const customer = await this.customerUsersService.findByEmail(email);
    if (!customer) {
      // Return successfully to prevent email enumeration
      return true;
    }

    const secret =
      (this.configService.get<string>('JWT_SECRET') || 'super-secret') +
      customer.passwordHash;

    const token = await this.jwtService.signAsync(
      { sub: customer.id },
      { secret, expiresIn: '15m' },
    );

    const resetLink = `${this.configService.get<string>('NEXT_PUBLIC_APP_URL') || 'http://localhost:3000'}/reset-password?token=${token}`;

    // In a real application, send this via email.
    console.log(`[Email Mock] Password reset link for ${email}: ${resetLink}`);

    return true;
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.decode<{ sub?: string }>(token);
      if (!decoded || typeof decoded.sub !== 'string') {
        return false;
      }

      const customer = await this.customerUsersService.findById(decoded.sub);
      if (!customer) {
        return false;
      }

      const secret =
        (this.configService.get<string>('JWT_SECRET') || 'super-secret') +
        customer.passwordHash;

      // Verify token specifically with this user's secret
      await this.jwtService.verifyAsync(token, { secret });

      // Hash the new password and update
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      await this.customerUsersService.updatePassword(
        customer.id,
        newPasswordHash,
      );

      // Invalidate all active sessions for security
      await this.prisma.customerSession.deleteMany({
        where: { customerId: customer.id },
      });

      return true;
    } catch {
      // Token is invalid or expired
      return false;
    }
  }

  async getTokens(customerId: string, email: string, sessionId: string) {
    const jwtPayload = {
      sub: customerId,
      email,
      sessionId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET') || 'super-secret',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          'super-refresh-secret',
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
