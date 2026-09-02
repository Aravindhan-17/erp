import { Test, TestingModule } from '@nestjs/testing';
import { AdminCustomersService } from './admin-customers.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CustomerQueryDto, SortOrder } from './dto/customer-query.dto';

describe('AdminCustomersService', () => {
  let service: AdminCustomersService;

  const mockPrismaService = {
    customer: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    customerSession: {
      deleteMany: jest.fn(),
    },
    order: {
      findMany: jest.fn(),
    },
    ticket: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminCustomersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AdminCustomersService>(AdminCustomersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated customers', async () => {
      mockPrismaService.customer.findMany.mockResolvedValue([
        { id: '1', firstName: 'John' },
      ]);
      mockPrismaService.customer.count.mockResolvedValue(1);

      const query: CustomerQueryDto = {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: SortOrder.DESC,
      };
      const result = await service.findAll(query);

      expect(result).toEqual({
        data: [{ id: '1', firstName: 'John' }],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      expect(mockPrismaService.customer.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 0, take: 10 }),
      );
    });

    it('should apply search filters', async () => {
      mockPrismaService.customer.findMany.mockResolvedValue([]);
      mockPrismaService.customer.count.mockResolvedValue(0);

      const query: CustomerQueryDto = {
        search: 'john',
        segment: 'active',
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: SortOrder.DESC,
      };
      await service.findAll(query);

      expect(mockPrismaService.customer.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            OR: [
              { firstName: { contains: 'john', mode: 'insensitive' } },
              { lastName: { contains: 'john', mode: 'insensitive' } },
              { email: { contains: 'john', mode: 'insensitive' } },
              { phone: { contains: 'john', mode: 'insensitive' } },
            ],
            isActive: true,
          },
        }),
      );
    });

    it('should apply sorting parameters', async () => {
      mockPrismaService.customer.findMany.mockResolvedValue([]);
      mockPrismaService.customer.count.mockResolvedValue(0);

      const query: CustomerQueryDto = {
        page: 1,
        limit: 10,
        sortBy: 'firstName',
        sortOrder: SortOrder.ASC,
      };
      await service.findAll(query);

      expect(mockPrismaService.customer.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { firstName: 'asc' },
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return a safe customer if found', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue({
        id: '1',
        passwordHash: 'secret',
        firstName: 'Jane',
      });

      const result = await service.findOne('1');

      expect(result).toEqual({ id: '1', firstName: 'Jane' });
      expect(result).not.toHaveProperty('passwordHash');
    });

    it('should throw NotFoundException if not found', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      await expect(service.findOne('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('toggleSuspend', () => {
    it('should update and return customer status', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.customer.update.mockResolvedValue({
        id: '1',
        isActive: false,
      });

      const result = await service.toggleSuspend('1', false);

      expect(result).toEqual({ id: '1', isActive: false });
      expect(mockPrismaService.customer.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { isActive: false },
        select: { id: true, isActive: true },
      });
    });

    it('should revoke all active sessions when suspending a customer', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.customer.update.mockResolvedValue({
        id: '1',
        isActive: false,
      });
      mockPrismaService.customerSession.deleteMany.mockResolvedValue({
        count: 2,
      });

      const result = await service.toggleSuspend('1', false);

      expect(result).toEqual({ id: '1', isActive: false });
      expect(mockPrismaService.customerSession.deleteMany).toHaveBeenCalledWith(
        {
          where: { customerId: '1' },
        },
      );
    });

    it('should not revoke sessions when reactivating a customer', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.customer.update.mockResolvedValue({
        id: '1',
        isActive: true,
      });

      const result = await service.toggleSuspend('1', true);

      expect(result).toEqual({ id: '1', isActive: true });
      expect(
        mockPrismaService.customerSession.deleteMany,
      ).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if customer to suspend not found', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      await expect(service.toggleSuspend('invalid', false)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getCustomerOrders', () => {
    it('should return orders if customer exists', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.order.findMany.mockResolvedValue([{ id: 'o1' }]);

      const result = await service.getCustomerOrders('1');

      expect(result).toEqual([{ id: 'o1' }]);
      expect(mockPrismaService.order.findMany).toHaveBeenCalledWith({
        where: { customerId: '1' },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should throw NotFoundException if customer not found', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      await expect(service.getCustomerOrders('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getCustomerTickets', () => {
    it('should return tickets if customer exists', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.ticket.findMany.mockResolvedValue([{ id: 't1' }]);

      const result = await service.getCustomerTickets('1');

      expect(result).toEqual([{ id: 't1' }]);
      expect(mockPrismaService.ticket.findMany).toHaveBeenCalledWith({
        where: { customerId: '1' },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should throw NotFoundException if customer not found', async () => {
      mockPrismaService.customer.findUnique.mockResolvedValue(null);

      await expect(service.getCustomerTickets('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
