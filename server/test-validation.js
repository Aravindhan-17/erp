const { validateSync } = require('class-validator');
const { CreateCategoryDto } = require('./dist/src/modules/category/dto/create-category.dto.js');
const dto = new CreateCategoryDto();
dto.name = "Test Cat";
dto.slug = "test-cat";
dto.parentId = null; // Test if null is valid for IsOptional + IsUUID
dto.imageUrl = null;
const errors = validateSync(dto);
console.log(errors);
