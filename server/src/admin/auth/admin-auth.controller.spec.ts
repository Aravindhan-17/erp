/* eslint-disable @typescript-eslint/unbound-method */
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
    signIn: jest.Mock;
    logout: jest.Mock;
    refreshTokens: jest.Mock;
  };
  let configService: {
    get: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      validateAdmin: jest.fn(),
      signIn: jest.fn(),
      logout: jest.fn().mockResolvedValue(undefined),
      refreshTokens: jest.fn(),
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

  describe('signIn', () => {
    it('should throw UnauthorizedException if credentials are invalid', async () => {
      authService.validateAdmin.mockResolvedValue(null);

      const mockRes = {} as Response;
      await expect(
        controller.signIn(
          { email: 'test@test.com', password: 'wrong' },
          mockRes,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should set cookie and return success message on valid sign in', async () => {
      const mockAdmin = { id: '1', email: 'test@test.com', role: 'ADMIN' };
      authService.validateAdmin.mockResolvedValue(mockAdmin);
      authService.signIn.mockResolvedValue({
        access_token: 'jwt-token',
        refresh_token: 'refresh-token',
        admin: { id: '1', email: 'test@test.com', role: 'ADMIN' },
      });

      const mockRes = {
        cookie: jest.fn(),
      } as unknown as Response;

      const result = await controller.signIn(
        { email: 'test@test.com', password: 'correct' },
        mockRes,
      );

      expect(authService.validateAdmin).toHaveBeenCalledWith(
        'test@test.com',
        'correct',
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'admin_refresh_token',
        'refresh-token',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          path: '/auth/admin',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        },
      );
      expect(result).toEqual({
        message: 'Signed in successfully',
        access_token: 'jwt-token',
        admin: mockAdmin,
      });
    });
  });

  describe('logout', () => {
    it('should clear cookie and return success message', () => {
      const mockRes = {
        clearCookie: jest.fn(),
      } as unknown as Response;

      const mockReq = {
        user: { sessionId: 'session-id' },
      } as unknown as Request;
      const result = controller.logout(mockReq, mockRes);

      expect(authService.logout).toHaveBeenCalledWith('session-id');
      expect(mockRes.clearCookie).toHaveBeenCalledWith('admin_refresh_token', {
        path: '/auth/admin',
      });
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

  describe('refresh', () => {
    it('should throw UnauthorizedException and clear cookies if tokens are invalid', async () => {
      authService.refreshTokens.mockResolvedValue(null);
      const mockUser = { sessionId: 'sid', refreshToken: 'rt', sub: 'id' };
      const mockReq = { user: mockUser } as unknown as Request;
      const mockRes = { clearCookie: jest.fn() } as unknown as Response;

      await expect(controller.refresh(mockReq, mockRes)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockRes.clearCookie).toHaveBeenCalledWith('admin_refresh_token', {
        path: '/auth/admin',
      });
    });

    it('should set new cookies and return success message if valid', async () => {
      authService.refreshTokens.mockResolvedValue({
        access_token: 'new-at',
        refresh_token: 'new-rt',
      });
      const mockUser = { sessionId: 'sid', refreshToken: 'rt', sub: 'id' };
      const mockReq = { user: mockUser } as unknown as Request;
      const mockRes = { cookie: jest.fn() } as unknown as Response;

      const result = await controller.refresh(mockReq, mockRes);
      expect(result).toEqual({
        message: 'Tokens refreshed successfully',
        access_token: 'new-at',
      });
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'admin_refresh_token',
        'new-rt',
        expect.any(Object),
      );
    });
  });
});
