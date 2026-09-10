import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { AssetService } from '../asset/asset.service';
import { Category, CategoryStatus } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly assetService: AssetService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
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

    return this.prisma.$transaction(async (tx) => {
      if (createCategoryDto.imageAssetId) {
        await this.assetService.activateAsset(
          tx,
          createCategoryDto.imageAssetId,
        );
      }
      if (createCategoryDto.bannerAssetId) {
        await this.assetService.activateAsset(
          tx,
          createCategoryDto.bannerAssetId,
        );
      }
      return tx.category.create({
        data: createCategoryDto,
      });
    });
  }

  async findAllAdmin() {
    const categories = await this.prisma.category.findMany({
      include: {
        parent: true,
        _count: {
          select: { children: true, products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return categories.map((cat) => {
      const { _count, ...rest } = cat;
      return {
        ...rest,
        subcategories: _count.children,
        products: _count.products,
      };
    });
  }

  async findOneAdmin(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (updateCategoryDto.slug && updateCategoryDto.slug !== category.slug) {
      const existing = await this.prisma.category.findUnique({
        where: { slug: updateCategoryDto.slug },
      });
      if (existing) {
        throw new ConflictException('Category with this slug already exists');
      }
    }

    if (updateCategoryDto.parentId) {
      if (updateCategoryDto.parentId === id) {
        throw new BadRequestException('A category cannot be its own parent');
      }
      const parent = await this.prisma.category.findUnique({
        where: { id: updateCategoryDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
      // Note: A robust system might check for deep circular dependencies here.
      // For simplicity, we only check immediate self-referencing.
    }

    return this.prisma.$transaction(async (tx) => {
      if (
        updateCategoryDto.imageAssetId &&
        updateCategoryDto.imageAssetId !== category.imageAssetId
      ) {
        if (category.imageAssetId) {
          await this.assetService.markDeletePending(tx, category.imageAssetId);
        }
        await this.assetService.activateAsset(
          tx,
          updateCategoryDto.imageAssetId,
        );
      }

      if (
        updateCategoryDto.bannerAssetId &&
        updateCategoryDto.bannerAssetId !== category.bannerAssetId
      ) {
        if (category.bannerAssetId) {
          await this.assetService.markDeletePending(tx, category.bannerAssetId);
        }
        await this.assetService.activateAsset(
          tx,
          updateCategoryDto.bannerAssetId,
        );
      }

      return tx.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.prisma.$transaction(async (tx) => {
      if (category.imageAssetId) {
        await this.assetService.markDeletePending(tx, category.imageAssetId);
      }
      if (category.bannerAssetId) {
        await this.assetService.markDeletePending(tx, category.bannerAssetId);
      }
      await tx.category.delete({
        where: { id },
      });
    });

    return { message: 'Category deleted successfully' };
  }

  async bulkUpdateStatus(ids: string[], status: CategoryStatus) {
    const result = await this.prisma.category.updateMany({
      where: { id: { in: ids } },
      data: { status, isActive: status === 'ACTIVE' },
    });
    return { message: `Successfully updated ${result.count} categories.` };
  }

  async bulkDelete(ids: string[]) {
    const result = await this.prisma.category.deleteMany({
      where: { id: { in: ids } },
    });
    return { message: `Successfully deleted ${result.count} categories.` };
  }

  // PUBLIC ENDPOINTS

  async findAllPublic() {
    // Return a nested tree structure of active categories
    const allActive = await this.prisma.category.findMany({
      where: { isActive: true, status: 'ACTIVE' },
      orderBy: { name: 'asc' },
    });

    return this.buildCategoryTree(allActive);
  }

  async findBySlugPublic(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        children: {
          where: { isActive: true, status: 'ACTIVE' },
        },
      },
    });

    if (!category || !category.isActive || category.status !== 'ACTIVE') {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  private buildCategoryTree(
    categories: Category[],
    parentId: string | null = null,
  ): (Category & { children: any[] })[] {
    return categories
      .filter((cat) => cat.parentId === parentId)
      .map((cat) => ({
        ...cat,
        children: this.buildCategoryTree(categories, cat.id),
      }));
  }
}
