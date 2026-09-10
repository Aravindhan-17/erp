import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Public Categories')
@Controller('categories')
export class PublicCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active categories as a nested tree' })
  @ApiResponse({ status: 200, description: 'Nested list of categories.' })
  findAll() {
    return this.categoryService.findAllPublic();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get details of an active category by slug' })
  @ApiResponse({ status: 200, description: 'Category details.' })
  @ApiResponse({ status: 404, description: 'Category not found or inactive.' })
  findOne(@Param('slug') slug: string) {
    return this.categoryService.findBySlugPublic(slug);
  }
}
