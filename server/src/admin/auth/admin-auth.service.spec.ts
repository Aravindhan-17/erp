/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthService } from './admin-auth.service';
import { AdminUsersService } from '../users/admin-users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AdminAuthService', () => {
  let service: AdminAuthService;
  let adminUsersService: {
    findByEmail: jest.Mock;
    findById: jest.Mock;
  };
  let jwtService: {
    signAsync: jest.Mock;
  };
  let prismaService: any;
  let configService: any;

  beforeEach(async () => {
    adminUsersService = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
    };
    prismaService = {
      adminUser: {
        update: jest.fn(),
      },
      adminSession: {
        create: jest.fn().mockResolvedValue({ id: 'session-id' }),
        deleteMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };
    configService = {
      get: jest.fn().mockReturnValue('test-secret'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminAuthService,
        { provide: AdminUsersService, useValue: adminUsersService },
        { provide: JwtService, useValue: jwtService },
        { provide: PrismaService, useValue: prismaService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<AdminAuthService>(AdminAuthService);
  });

  describe('validateAdmin', () => {
    it('should return null if user does not exist', async () => {
      adminUsersService.findByEmail.mockResolvedValue(null);
      const result = await service.validateAdmin('test@test.com', 'password');
      expect(result).toBeNull();
    });

    it('should return null if user is inactive', async () => {
      adminUsersService.findByEmail.mockResolvedValue({
        isActive: false,
      } as any);
      const result = await service.validateAdmin('test@test.com', 'password');
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      adminUsersService.findByEmail.mockResolvedValue({
        isActive: true,
        passwordHash: 'hash',
      } as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateAdmin(
        'test@test.com',
        'wrongpassword',
      );
      expect(result).toBeNull();
    });

    it('should return user without passwordHash if credentials are valid', async () => {
      const mockAdmin = {
        id: '1',
        email: 'test@test.com',
        isActive: true,
        passwordHash: 'hash',
        role: 'ADMIN',
      };
      adminUsersService.findByEmail.mockResolvedValue(mockAdmin as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateAdmin(
        'test@test.com',
        'correctpassword',
      );
      expect(result).toEqual({
        id: '1',
        email: 'test@test.com',
        isActive: true,
        role: 'ADMIN',
      });
    });
  });

  describe('signIn', () => {
    it('should return tokens and update lastLogin', async () => {
      const mockAdmin = { id: '1', email: 'test@test.com', role: 'ADMIN' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-token');

      const result = await service.signIn(mockAdmin);

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(prismaService.adminUser.update).toHaveBeenCalledWith({
        where: { id: mockAdmin.id },
        data: { lastLogin: expect.any(Date) },
      });
      expect(prismaService.adminSession.create).toHaveBeenCalled();
      expect(result).toEqual({
        access_token: 'mock-jwt-token',
        refresh_token: 'mock-jwt-token',
        admin: mockAdmin,
      });
    });
  });

  describe('logout', () => {
    it('should call deleteMany on adminSession', async () => {
      await service.logout('session-id');
      expect(prismaService.adminSession.deleteMany).toHaveBeenCalledWith({
        where: { id: 'session-id' },
      });
    });
  });

  describe('refreshTokens', () => {
    it('should return null if session not found or without hashedToken', async () => {
      prismaService.adminSession.findUnique.mockResolvedValue(null);
      const result = await service.refreshTokens(
        'session-id',
        'refresh-token',
        '1',
      );
      expect(result).toBeNull();
    });

    it('should return null if refresh token does not match', async () => {
      prismaService.adminSession.findUnique.mockResolvedValue({
        id: 'session-id',
        hashedToken: 'hashed-rt',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const result = await service.refreshTokens(
        'session-id',
        'refresh-token',
        '1',
      );
      expect(result).toBeNull();
    });

    it('should return null if admin is not found', async () => {
      prismaService.adminSession.findUnique.mockResolvedValue({
        id: 'session-id',
        hashedToken: 'hashed-rt',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      adminUsersService.findById.mockResolvedValue(null);

      const result = await service.refreshTokens(
        'session-id',
        'refresh-token',
        '1',
      );
      expect(result).toBeNull();
    });

    it('should return new tokens and update session if successful', async () => {
      prismaService.adminSession.findUnique.mockResolvedValue({
        id: 'session-id',
        hashedToken: 'hashed-rt',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const mockAdmin = { id: '1', email: 'test@test.com', role: 'ADMIN' };
      adminUsersService.findById.mockResolvedValue(mockAdmin as any);

      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hashed-rt');
      jwtService.signAsync
        .mockResolvedValueOnce('new-access-token')
        .mockResolvedValueOnce('new-refresh-token');

      const result = await service.refreshTokens(
        'session-id',
        'refresh-token',
        '1',
      );

      expect(prismaService.adminSession.update).toHaveBeenCalledWith({
        where: { id: 'session-id' },
        data: {
          hashedToken: 'new-hashed-rt',
          expiresAt: expect.any(Date),
        },
      });

      expect(result).toEqual({
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
      });
    });
  });
});
