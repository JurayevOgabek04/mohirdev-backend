import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { CatigoryEntity } from "../../entities/catigories.entity"


@Injectable()
export class CategoriesService {

  // Started create
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


  // Finished create
  // Started find get

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

  async findOne(id: string) {
    const catigory = await CatigoryEntity.findOne({
      where: {
        catigoryId: id
      }
    })
      .catch(() => {
        throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
      })

    if (!catigory) {
      throw new HttpException("Category Not Found", HttpStatus.NOT_FOUND)
    }

    return catigory
  }


  // Finished Get
  // Started Update
  async updateCatigory(id: string, updateDto: UpdateCategoryDto) {
    const catigory = await CatigoryEntity.findOne({
      where: {
        catigoryId: id
      }
    })
      .catch(() => {
        throw new HttpException("Catigory Not Found", HttpStatus.NOT_FOUND)
      })

    await CatigoryEntity.createQueryBuilder()
      .update(CatigoryEntity)
      .set({
        catigoryName: updateDto.catigoryName
      })
      .where({
        catigoryId: id
      })
      .execute()
      .catch(() => {
        throw new HttpException("Bad REQUEST", HttpStatus.BAD_REQUEST)
      })

    return {
      code: 200,
      message: "Successfully Updated"
    }

  }

  // Finished Update
  // Started Delete

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
