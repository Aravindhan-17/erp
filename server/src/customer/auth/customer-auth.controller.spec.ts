import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAuthController } from './customer-auth.controller';
import { CustomerAuthService } from './customer-auth.service';
import { CustomerUsersService } from '../users/customer-users.service';
import { UnauthorizedException } from '@nestjs/common';
import type { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('CustomerAuthController', () => {
  let controller: CustomerAuthController;
  let authService: {
    validateCustomer: jest.Mock;
    signIn: jest.Mock;
    logout: jest.Mock;
    refreshTokens: jest.Mock;
    forgotPassword: jest.Mock;
    resetPassword: jest.Mock;
  };
  let usersService: {
    findByEmail: jest.Mock;
    create: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      validateCustomer: jest.fn(),
      signIn: jest.fn(),
      logout: jest.fn().mockResolvedValue(undefined),
      refreshTokens: jest.fn(),
      forgotPassword: jest.fn(),
      resetPassword: jest.fn(),
    };

    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAuthController],
      providers: [
        { provide: CustomerAuthService, useValue: authService },
        { provide: CustomerUsersService, useValue: usersService },
      ],
    }).compile();

    controller = module.get<CustomerAuthController>(CustomerAuthController);
  });

  describe('signUp', () => {
    it('should sign up a new customer', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hash');
      const mockCustomer = {
        id: '1',
        email: 'test@test.com',
        passwordHash: 'hash',
      };
      usersService.create.mockResolvedValue(mockCustomer);

      const result = await controller.signUp({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: 'password',
        phone: '123',
      });

      const { passwordHash: _, ...expectedCustomer } = mockCustomer;
      expect(result).toEqual({
        message: 'Signed up successfully',
        customer: expectedCustomer,
      });
    });

    it('should throw if email in use', async () => {
      usersService.findByEmail.mockResolvedValue({ id: '1' });
      await expect(
        controller.signUp({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@test.com',
          password: 'password',
          phone: '123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signIn', () => {
    it('should sign in and set refresh cookie', async () => {
      const mockCustomer = { id: '1', email: 'test@test.com' };
      authService.validateCustomer.mockResolvedValue(mockCustomer);
      authService.signIn.mockResolvedValue({
        access_token: 'at',
        refresh_token: 'rt',
        customer: mockCustomer,
      });

      const mockRes = { cookie: jest.fn() } as unknown as Response;

      const result = await controller.signIn(
        { email: 'test@test.com', password: 'password' },
        mockRes,
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockRes.cookie as jest.Mock).toHaveBeenCalledWith(
        'client_refresh_token',
        'rt',
        expect.any(Object),
      );
      expect(result).toEqual({
        message: 'Signed in successfully',
        access_token: 'at',
        customer: mockCustomer,
      });
    });
  });

  describe('logout', () => {
    it('should logout and clear refresh cookie', () => {
      const mockReq = { user: { sessionId: 'sid' } };
      const mockRes = { clearCookie: jest.fn() } as unknown as Response;

      const result = controller.logout(mockReq, mockRes);

      expect(authService.logout).toHaveBeenCalledWith('sid');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockRes.clearCookie as jest.Mock).toHaveBeenCalledWith(
        'client_refresh_token',
        {
          path: '/auth/customer',
        },
      );
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('forgotPassword', () => {
    it('should call service and return success message', async () => {
      authService.forgotPassword.mockResolvedValue(true);
      const result = await controller.forgotPassword({
        email: 'test@test.com',
      });
      expect(authService.forgotPassword).toHaveBeenCalledWith('test@test.com');
      expect(result).toEqual({
        message:
          'If an account with that email exists, we have sent a password reset link.',
      });
    });
  });

  describe('resetPassword', () => {
    it('should call service and return success message if valid', async () => {
      authService.resetPassword.mockResolvedValue(true);
      const result = await controller.resetPassword({
        token: 'valid-token',
        password: 'newpassword',
      });
      expect(authService.resetPassword).toHaveBeenCalledWith(
        'valid-token',
        'newpassword',
      );
      expect(result).toEqual({
        message:
          'Password reset successfully. You can now log in with your new password.',
      });
    });

    it('should throw UnauthorizedException if invalid token', async () => {
      authService.resetPassword.mockResolvedValue(false);
      await expect(
        controller.resetPassword({
          token: 'invalid-token',
          password: 'newpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
