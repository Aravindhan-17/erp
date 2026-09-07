import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(categoryId?: string, isFlashDeal?: string) {
    const where: any = { status: 'ACTIVE' };
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (isFlashDeal !== undefined) {
      where.isFlashDeal = isFlashDeal === 'true';
    }

    return this.prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    
    if (!product || product.status !== 'ACTIVE') {
      throw new NotFoundException(`Product not found`);
    }
    
    return product;
  }
}
