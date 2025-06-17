import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("/subcategory")
  async create(@Body() bodyDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(bodyDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
