import { Test, TestingModule } from '@nestjs/testing';
import { AdminCustomersController } from './admin-customers.controller';
import { AdminCustomersService } from './admin-customers.service';
import { CustomerQueryDto, SortOrder } from './dto/customer-query.dto';

describe('AdminCustomersController', () => {
  let controller: AdminCustomersController;
  let service: AdminCustomersService;

  const mockAdminCustomersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    toggleSuspend: jest.fn(),
    getCustomerOrders: jest.fn(),
    getCustomerTickets: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCustomersController],
      providers: [
        {
          provide: AdminCustomersService,
          useValue: mockAdminCustomersService,
        },
      ],
    }).compile();

    controller = module.get<AdminCustomersController>(AdminCustomersController);
    service = module.get<AdminCustomersService>(AdminCustomersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call service findAll with parsed parameters', async () => {
      mockAdminCustomersService.findAll.mockResolvedValue('paginatedResult');

      const query: CustomerQueryDto = {
        search: 'searchterm',
        segment: 'active',
        page: 2,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: SortOrder.DESC,
      };
      const result = await controller.findAll(query);

      expect(result).toBe('paginatedResult');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should call service findOne with id', async () => {
      mockAdminCustomersService.findOne.mockResolvedValue('customer');

      const result = await controller.findOne('123');

      expect(result).toBe('customer');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('toggleSuspend', () => {
    it('should call service toggleSuspend with id and isActive boolean', async () => {
      mockAdminCustomersService.toggleSuspend.mockResolvedValue(
        'updatedCustomer',
      );

      const result = await controller.toggleSuspend('123', false);

      expect(result).toBe('updatedCustomer');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.toggleSuspend).toHaveBeenCalledWith('123', false);
    });
  });

  describe('getCustomerOrders', () => {
    it('should call service getCustomerOrders with id', async () => {
      mockAdminCustomersService.getCustomerOrders.mockResolvedValue(['order1']);

      const result = await controller.getCustomerOrders('123');

      expect(result).toEqual(['order1']);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.getCustomerOrders).toHaveBeenCalledWith('123');
    });
  });

  describe('getCustomerTickets', () => {
    it('should call service getCustomerTickets with id', async () => {
      mockAdminCustomersService.getCustomerTickets.mockResolvedValue([
        'ticket1',
      ]);

      const result = await controller.getCustomerTickets('123');

      expect(result).toEqual(['ticket1']);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.getCustomerTickets).toHaveBeenCalledWith('123');
    });
  });
});
