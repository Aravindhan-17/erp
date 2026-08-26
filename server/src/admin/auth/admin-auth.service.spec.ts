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

  describe('login', () => {
    it('should return tokens and update lastLogin', async () => {
      const mockAdmin = { id: '1', email: 'test@test.com', role: 'ADMIN' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-token');

      const result = await service.login(mockAdmin);

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(prismaService.adminUser.update).toHaveBeenCalledWith({
        where: { id: mockAdmin.id },
        data: { lastLogin: expect.any(Date) },
      });
      expect(prismaService.adminSession.create).toHaveBeenCalled();
      expect(result).toEqual({
        access_token: 'mock-jwt-token',
        refresh_token: 'mock-jwt-token',
        session_id: 'session-id',
        admin: mockAdmin,
      });
    });
  });
});
