import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubCatigoriesEntity } from "../../entities/subcatigories.entity"
import { CatigoryEntity } from "../../entities/catigories.entity"

@Injectable()
export class SubcategoriesService {
  async create(badyDto: CreateSubcategoryDto) {

    const oneCatigory = await CatigoryEntity.findOneBy({
      catigoryId: badyDto.catigoryId
    })

    const newSubCat = await SubCatigoriesEntity.createQueryBuilder()
      .insert()
      .into(SubCatigoriesEntity)
      .values({
        subCatName: badyDto.subCatigoryName,
        category: oneCatigory
      })
      .execute()
      .catch(() => {
        throw new HttpException("Http bed request", HttpStatus.BAD_REQUEST)
      })

    return ({
      code: 200,
      message: "SubCaatigory seccessfully created"
    })
  }

  async findAll() {
    return await SubCatigoriesEntity.find()
      .catch(() => {
        throw new HttpException("Not fount", HttpStatus.NOT_FOUND)
      })
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategory`;
  }

  update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return `This action updates a #${id} subcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subcategory`;
  }
}
