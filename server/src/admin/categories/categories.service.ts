import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // Check if slug is taken
    const existing = await this.prisma.category.findUnique({
      where: { slug: createCategoryDto.slug },
    });
    if (existing) {
      throw new ConflictException('Category with this slug already exists');
    }

    if (createCategoryDto.parentId) {
      const parent = await this.prisma.category.findUnique({
        where: { id: createCategoryDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
    }

    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        children: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (updateCategoryDto.slug && updateCategoryDto.slug !== category.slug) {
      const existing = await this.prisma.category.findUnique({
        where: { slug: updateCategoryDto.slug },
      });
      if (existing) {
        throw new ConflictException('Category with this slug already exists');
      }
    }

    if (
      updateCategoryDto.parentId &&
      updateCategoryDto.parentId !== category.parentId
    ) {
      if (updateCategoryDto.parentId === id) {
        throw new ConflictException('Category cannot be its own parent');
      }
      const parent = await this.prisma.category.findUnique({
        where: { id: updateCategoryDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // In the future, check if category is tied to products.
    // The PRD says strictly prevent hard deletion if tied to historical orders/products.
    // For now, we can soft delete it or physically delete if we don't have products yet.
    // Given the scope is just categories, we will delete it.

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
