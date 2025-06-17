import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post("/category")
  async create(@Body() bodyDto: CreateCategoryDto) {
    return this.categoriesService.create(bodyDto);
  }


  @HttpCode(HttpStatus.OK)
  @Get("all")
  findAll() {
    return this.categoriesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/one/:id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.categoriesService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateDto: UpdateCategoryDto) {
    return this.categoriesService.updateCatigory(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
