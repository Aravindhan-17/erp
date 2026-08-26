import { Injectable } from '@nestjs/common';
import { AdminUsersService } from '../users/admin-users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

export interface AdminUserPayload {
  id: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

@Injectable()
export class AdminAuthService {
  constructor(
    private adminUsersService: AdminUsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async validateAdmin(
    email: string,
    pass: string,
  ): Promise<AdminUserPayload | null> {
    const admin = await this.adminUsersService.findByEmail(email);
    if (admin && admin.isActive) {
      const isMatch = await bcrypt.compare(pass, admin.passwordHash);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...result } = admin;
        return result;
      }
    }
    return null;
  }

  async getTokens(adminId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: adminId, email, role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: adminId, email, role },
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

  async login(admin: AdminUserPayload) {
    // Update lastLogin
    await this.prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    const tokens = await this.getTokens(admin.id, admin.email, admin.role);
    
    // Hash refresh token for storage
    const hashedToken = await bcrypt.hash(tokens.refreshToken, 10);
    
    // Store session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const session = await this.prisma.adminSession.create({
      data: {
        adminUserId: admin.id,
        hashedToken,
        expiresAt,
      },
    });

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      session_id: session.id,
      admin,
    };
  }

  async logout(sessionId: string) {
    await this.prisma.adminSession.deleteMany({
      where: { id: sessionId },
    });
  }

  async refreshTokens(sessionId: string, refreshToken: string, adminId: string) {
    const session = await this.prisma.adminSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || !session.hashedToken) return null;

    const rtMatches = await bcrypt.compare(refreshToken, session.hashedToken);
    if (!rtMatches) return null;

    const admin = await this.adminUsersService.findById(adminId);
    if (!admin) return null;

    const tokens = await this.getTokens(admin.id, admin.email, admin.role);
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
}
