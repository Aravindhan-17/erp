import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAuthService } from './customer-auth.service';
import { CustomerUsersService } from '../users/customer-users.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('CustomerAuthService', () => {
  let service: CustomerAuthService;
  let customerUsersService: {
    findByEmail: jest.Mock;
    findById: jest.Mock;
    updatePassword: jest.Mock;
  };
  let prismaService: {
    customerSession: {
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
      deleteMany: jest.Mock;
      findUnique: jest.Mock;
    };
    customer: { update: jest.Mock };
  };
  let jwtService: {
    signAsync: jest.Mock;
    decode: jest.Mock;
    verifyAsync: jest.Mock;
  };
  let configService: { get: jest.Mock };

  beforeEach(async () => {
    customerUsersService = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      updatePassword: jest.fn(),
    };

    prismaService = {
      customerSession: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
        findUnique: jest.fn(),
      },
      customer: {
        update: jest.fn(),
      },
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
      decode: jest.fn(),
      verifyAsync: jest.fn(),
    };

    configService = {
      get: jest.fn().mockReturnValue('mock-secret'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerAuthService,
        { provide: CustomerUsersService, useValue: customerUsersService },
        { provide: PrismaService, useValue: prismaService },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<CustomerAuthService>(CustomerAuthService);
  });

  const mockCustomer = {
    id: '1',
    email: 'customer@test.com',
    passwordHash: 'hashedpassword',
    isActive: true,
  };

  describe('validateCustomer', () => {
    it('should return null if customer not found', async () => {
      customerUsersService.findByEmail.mockResolvedValue(null);
      expect(
        await service.validateCustomer('customer@test.com', 'password'),
      ).toBeNull();
    });

    it('should return customer without passwordHash if valid', async () => {
      customerUsersService.findByEmail.mockResolvedValue(mockCustomer);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const result = await service.validateCustomer(
        'customer@test.com',
        'password',
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...expected } = mockCustomer;
      expect(result).toEqual(expected);
    });
  });

  describe('signIn', () => {
    it('should create session and return tokens', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-refresh-token');
      const result = await service.signIn(mockCustomer);

      expect(prismaService.customerSession.create).toHaveBeenCalled();
      expect(prismaService.customer.update).toHaveBeenCalled();
      expect(result).toEqual({
        access_token: 'mock-jwt-token',
        refresh_token: 'mock-jwt-token',
        customer: mockCustomer,
      });
    });
  });

  describe('refreshTokens', () => {
    it('should return null when the session does not exist', async () => {
      prismaService.customerSession.findUnique.mockResolvedValue(null);

      const result = await service.refreshTokens(
        '1',
        'refresh-token',
        'missing-session',
      );

      expect(result).toBeNull();
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should return null when the refresh token does not match', async () => {
      prismaService.customerSession.findUnique.mockResolvedValue({
        id: 'session-1',
        hashedToken: 'hashed-token',
        expiresAt: new Date(Date.now() + 86400000),
      });
      customerUsersService.findById.mockResolvedValue(mockCustomer);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.refreshTokens(
        '1',
        'wrong-refresh-token',
        'session-1',
      );

      expect(result).toBeNull();
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should return null when the customer account is suspended', async () => {
      prismaService.customerSession.findUnique.mockResolvedValue({
        id: 'session-1',
        hashedToken: 'hashed-token',
        expiresAt: new Date(Date.now() + 86400000),
      });
      customerUsersService.findById.mockResolvedValue({
        ...mockCustomer,
        isActive: false,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.refreshTokens(
        '1',
        'refresh-token',
        'session-1',
      );

      expect(result).toBeNull();
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should return new tokens for an active customer with a valid session', async () => {
      prismaService.customerSession.findUnique.mockResolvedValue({
        id: 'session-1',
        hashedToken: 'hashed-token',
        expiresAt: new Date(Date.now() + 86400000),
      });
      customerUsersService.findById.mockResolvedValue(mockCustomer);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hashed-token');
      prismaService.customerSession.update.mockResolvedValue({
        id: 'session-1',
      });

      const result = await service.refreshTokens(
        '1',
        'refresh-token',
        'session-1',
      );

      expect(result).toEqual({
        access_token: 'mock-jwt-token',
        refresh_token: 'mock-jwt-token',
      });
      expect(prismaService.customerSession.update).toHaveBeenCalledWith({
        where: { id: 'session-1' },
        data: {
          hashedToken: 'new-hashed-token',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          expiresAt: expect.any(Date),
        },
      });
    });
  });

  describe('forgotPassword', () => {
    it('should return true if customer not found', async () => {
      customerUsersService.findByEmail.mockResolvedValue(null);
      const result = await service.forgotPassword('nonexistent@test.com');
      expect(result).toBe(true);
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('should generate token and log link if customer found', async () => {
      customerUsersService.findByEmail.mockResolvedValue(mockCustomer);
      const result = await service.forgotPassword('customer@test.com');
      expect(result).toBe(true);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        { sub: mockCustomer.id },
        { secret: 'mock-secret' + mockCustomer.passwordHash, expiresIn: '15m' },
      );
    });

    it('should return true if customer is suspended to prevent enumeration', async () => {
      customerUsersService.findByEmail.mockResolvedValue({
        ...mockCustomer,
        isActive: false,
      });
      const result = await service.forgotPassword('customer@test.com');
      expect(result).toBe(true);
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should return false if token cannot be decoded', async () => {
      jwtService.decode.mockReturnValue(null);
      const result = await service.resetPassword('invalid-token', 'newpass');
      expect(result).toBe(false);
    });

    it('should verify token, update password, and delete sessions', async () => {
      jwtService.decode.mockReturnValue({ sub: mockCustomer.id });
      customerUsersService.findById.mockResolvedValue(mockCustomer);
      jwtService.verifyAsync.mockResolvedValue({ sub: mockCustomer.id });
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpass');

      const result = await service.resetPassword('valid-token', 'newpass');

      expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token', {
        secret: 'mock-secret' + mockCustomer.passwordHash,
      });

      expect(customerUsersService.updatePassword).toHaveBeenCalledWith(
        mockCustomer.id,
        'newhashedpass',
      );

      expect(prismaService.customerSession.deleteMany).toHaveBeenCalledWith({
        where: { customerId: mockCustomer.id },
      });
      
      expect(result).toBe(true);
    });

    it('should return false if verify fails', async () => {
      jwtService.decode.mockReturnValue({ sub: mockCustomer.id });
      customerUsersService.findById.mockResolvedValue(mockCustomer);
      jwtService.verifyAsync.mockRejectedValue(new Error('invalid token'));

      const result = await service.resetPassword('invalid-token', 'newpass');

      expect(result).toBe(false);
    });

    it('should return false if customer is suspended', async () => {
      jwtService.decode.mockReturnValue({ sub: mockCustomer.id });
      customerUsersService.findById.mockResolvedValue({
        ...mockCustomer,
        isActive: false,
      });

      const result = await service.resetPassword('valid-token', 'newpass');

      expect(result).toBe(false);
      expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    });
  });
});

// **Yesterday:**
// Worked on the Admin Categories Management module, including category schema, backend APIs, frontend UI integration, and customer account suspension controls.

// **Today:**
// Working on attaching rich promotional banners to specific product categories and integrating the required backend and frontend functionality.

// **Blockers:**
// None.
