import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { CatigoryEntity } from "../../entities/catigories.entity"


@Injectable()
export class CategoriesService {
  async create(bodyDto: CreateCategoryDto): Promise<any> {

    const newCatigory = await CatigoryEntity.createQueryBuilder()
      .insert()
      .into(CatigoryEntity)
      .values({
        catigoryName: bodyDto.catigoryName
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
      })


    return {
      code: 200,
      message: "Catigory seccussfully created"
    }

  }



  async findAll() {
    return await CatigoryEntity.find({
      relations: {
        'subCatigories': true
      }
    })
      .catch(() => {
        throw new HttpException('Catigory not found', HttpStatus.NOT_FOUND)
      })
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
