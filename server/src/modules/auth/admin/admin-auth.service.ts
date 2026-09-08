import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../core/database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { randomUUID, randomBytes, createHash } from 'crypto';
import { EmailService } from '../../../core/email/email.service';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export interface AdminUserPayload {
  id: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

@Injectable()
export class AdminAuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async validateAdmin(
    email: string,
    pass: string,
  ): Promise<AdminUserPayload> {
    const admin = await this.prisma.adminUser.findUnique({ where: { email } });
    
    if (!admin || !admin.isActive) {
      throw new NotFoundException('User does not exist');
    }
    
    const isMatch = await bcrypt.compare(pass, admin.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };
  }

  async getTokens(
    adminId: string,
    email: string,
    role: string,
    sessionId: string,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: adminId, email, role, sessionId },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: adminId, email, role, sessionId },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(admin: AdminUserPayload) {
    // Update lastLogin
    await this.prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    const sessionId = randomUUID();
    const tokens = await this.getTokens(
      admin.id,
      admin.email,
      admin.role,
      sessionId,
    );

    // Hash refresh token for storage
    const hashedToken = await bcrypt.hash(tokens.refreshToken, 10);

    // Store session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.prisma.adminSession.create({
      data: {
        id: sessionId,
        adminUserId: admin.id,
        hashedToken,
        expiresAt,
      },
    });

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      admin,
    };
  }

  async logout(sessionId: string) {
    await this.prisma.adminSession.deleteMany({
      where: { id: sessionId },
    });
  }

  async refreshTokens(
    sessionId: string,
    refreshToken: string,
    adminId: string,
  ) {
    const session = await this.prisma.adminSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || !session.hashedToken) return null;

    const rtMatches = await bcrypt.compare(refreshToken, session.hashedToken);
    if (!rtMatches) return null;

    const admin = await this.prisma.adminUser.findUnique({ where: { id: adminId } });
    if (!admin) return null;

    const tokens = await this.getTokens(
      admin.id,
      admin.email,
      admin.role,
      sessionId,
    );
    const newHashedToken = await bcrypt.hash(tokens.refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Rotate the token by updating the session
    await this.prisma.adminSession.update({
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

  async forgotPassword(email: string): Promise<void> {
    const admin = await this.prisma.adminUser.findUnique({ where: { email } });
    if (!admin || !admin.isActive) {
      return;
    }

    const resetToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(resetToken).digest('hex');
    
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    await this.prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: expires,
      },
    });

    await this.emailService.sendPasswordResetEmail(admin.email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedToken = createHash('sha256').update(token).digest('hex');
    
    const admin = await this.prisma.adminUser.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!admin) {
      throw new BadRequestException('Invalid or expired password reset token');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        passwordHash: newPasswordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });
  }
}
