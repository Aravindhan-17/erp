/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import type { Response, Request } from 'express';

describe('AdminAuthController', () => {
  let controller: AdminAuthController;
  let authService: {
    validateAdmin: jest.Mock;
    login: jest.Mock;
    logout: jest.Mock;
  };
  let configService: {
    get: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      validateAdmin: jest.fn(),
      login: jest.fn(),
      logout: jest.fn().mockResolvedValue(undefined),
    };

    configService = {
      get: jest.fn().mockReturnValue('development'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAuthController],
      providers: [
        { provide: AdminAuthService, useValue: authService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    controller = module.get<AdminAuthController>(AdminAuthController);
  });

  describe('login', () => {
    it('should throw UnauthorizedException if credentials are invalid', async () => {
      authService.validateAdmin.mockResolvedValue(null);

      const mockRes = {} as Response;
      await expect(
        controller.login(
          { email: 'test@test.com', password: 'wrong' },
          mockRes,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should set cookie and return success message on valid login', async () => {
      const mockAdmin = { id: '1', email: 'test@test.com', role: 'ADMIN' };
      authService.validateAdmin.mockResolvedValue(mockAdmin);
      authService.login.mockResolvedValue({
        access_token: 'jwt-token',
        refresh_token: 'refresh-token',
        session_id: 'session-id',
        admin: { id: '1', email: 'test@test.com', role: 'ADMIN' },
      });

      const mockRes = {
        cookie: jest.fn(),
      } as unknown as Response;

      const result = await controller.login(
        { email: 'test@test.com', password: 'correct' },
        mockRes,
      );

      expect(authService.validateAdmin).toHaveBeenCalledWith(
        'test@test.com',
        'correct',
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'admin_access_token',
        'jwt-token',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000,
        },
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'admin_refresh_token',
        'refresh-token',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        },
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'admin_session_id',
        'session-id',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        },
      );
      expect(result).toEqual({
        message: 'Logged in successfully',
        admin: mockAdmin,
      });
    });
  });

  describe('logout', () => {
    it('should clear cookie and return success message', () => {
      const mockRes = {
        clearCookie: jest.fn(),
      } as unknown as Response;

      const mockReq = { cookies: { admin_session_id: 'session-id' } } as unknown as Request;
      const result = controller.logout(mockReq, mockRes);

      expect(authService.logout).toHaveBeenCalledWith('session-id');
      expect(mockRes.clearCookie).toHaveBeenCalledWith('admin_access_token');
      expect(mockRes.clearCookie).toHaveBeenCalledWith('admin_refresh_token');
      expect(mockRes.clearCookie).toHaveBeenCalledWith('admin_session_id');
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('getProfile', () => {
    it('should return the user object attached to the request', () => {
      const mockUser = { id: 1, email: 'test@test.com' };
      const mockReq = { user: mockUser } as unknown as Request;

      const result = controller.getProfile(mockReq);
      expect(result).toEqual(mockUser);
    });
  });
});
