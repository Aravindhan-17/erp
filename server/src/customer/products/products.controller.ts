import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('customer/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('isFlashDeal') isFlashDeal?: string,
  ) {
    return this.productsService.findAll(categoryId, isFlashDeal);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productsService.findOneBySlug(slug);
  }
}
