import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const mockPrismaService = {
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a category', async () => {
      mockPrismaService.category.findUnique.mockResolvedValueOnce(null); // No existing slug
      const createDto = { name: 'Test', slug: 'test' };
      mockPrismaService.category.create.mockResolvedValueOnce({
        id: '1',
        ...createDto,
      });

      const result = await service.create(createDto);
      expect(result).toEqual({ id: '1', name: 'Test', slug: 'test' });
    });

    it('should throw ConflictException if slug exists', async () => {
      mockPrismaService.category.findUnique.mockResolvedValueOnce({ id: '1' }); // Slug exists
      await expect(
        service.create({ name: 'Test', slug: 'test' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if parentId is invalid', async () => {
      mockPrismaService.category.findUnique
        .mockResolvedValueOnce(null) // No existing slug
        .mockResolvedValueOnce(null); // Parent not found

      await expect(
        service.create({ name: 'Test', slug: 'test', parentId: '99' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should successfully update a category', async () => {
      mockPrismaService.category.findUnique.mockResolvedValueOnce({
        id: '1',
        slug: 'old-slug',
      });
      const updateDto = { name: 'Updated', slug: 'old-slug' };
      mockPrismaService.category.update.mockResolvedValueOnce({
        id: '1',
        ...updateDto,
      });

      const result = await service.update('1', updateDto);
      expect(result).toEqual({ id: '1', name: 'Updated', slug: 'old-slug' });
    });

    it('should throw NotFoundException if category not found', async () => {
      mockPrismaService.category.findUnique.mockResolvedValueOnce(null);
      await expect(service.update('1', { name: 'Test' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
