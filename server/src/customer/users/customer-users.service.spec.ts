import { Test, TestingModule } from '@nestjs/testing';
import { CustomerUsersService } from './customer-users.service';
import { PrismaService } from '../../shared/prisma/prisma.service';

const mockCustomer = {
  id: '1',
  email: 'customer@test.com',
  phone: '1234567890',
  firstName: 'Test',
  lastName: 'User',
  passwordHash: 'hash',
  isActive: true,
};

describe('CustomerUsersService', () => {
  let service: CustomerUsersService;
  let prismaService: { customer: { findUnique: jest.Mock; create: jest.Mock } };

  beforeEach(async () => {
    prismaService = {
      customer: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerUsersService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<CustomerUsersService>(CustomerUsersService);
  });

  it('should find user by email', async () => {
    prismaService.customer.findUnique.mockResolvedValue(mockCustomer);
    const result = await service.findByEmail('customer@test.com');
    expect(result).toEqual(mockCustomer);
    expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
      where: { email: 'customer@test.com' },
    });
  });

  it('should find user by id', async () => {
    prismaService.customer.findUnique.mockResolvedValue(mockCustomer);
    const result = await service.findById('1');
    expect(result).toEqual(mockCustomer);
    expect(prismaService.customer.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  it('should create user', async () => {
    prismaService.customer.create.mockResolvedValue(mockCustomer);
    const createData = {
      email: 'customer@test.com',
      passwordHash: 'hash',
      firstName: 'Test',
      lastName: 'User',
    };
    const result = await service.create(createData);
    expect(result).toEqual(mockCustomer);
    expect(prismaService.customer.create).toHaveBeenCalledWith({
      data: createData,
    });
  });
});
