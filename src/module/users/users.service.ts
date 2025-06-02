import { Injectable, HttpException, HttpStatus } from '@nestjs/common';


import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from '../../entities/users.entity';
// import { PhoneHelper } from "../../utils/utils.phone";

@Injectable()
export class UsersService {
  async create(badyDto: CreateUserDto): Promise<void> {

    // const phoneNumber = PhoneHelper
    await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        username: badyDto.username,
        lastname: badyDto.lastname,
        userage: badyDto.userage ?? 18,
        phone: badyDto.phone,
        location: badyDto.location ?? "Toshkent",
        password: badyDto.password,
        role: badyDto.role ?? "user"

      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
      })

  }

  async findAll() {
    return await UsersEntity.find()
      .catch(() => {
        throw new HttpException('User not fount', HttpStatus.NOT_FOUND)
      })


  }

  async findOne(id: string) {
    return await UsersEntity.findOne({
      where: {
        userId: id
      }
    })
      .catch(() => {
        throw new HttpException("User not fount", HttpStatus.NOT_FOUND)
      })
  }

  async updateUser(id: string, updateDto: UpdateUserDto) {

    const user = await UsersEntity.findOne({
      where: {
        userId: id
      }
    })
      .catch(() => {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      })

    await UsersEntity.createQueryBuilder()
      .update(UsersEntity)
      .set({
        username: updateDto.username ? updateDto.username : user.username,
        lastname: updateDto.lastname ? updateDto.lastname : user.lastname,
        userage: updateDto.userage ? updateDto.userage : user.userage,
        phone: updateDto.phone ? updateDto.phone : user.phone,
        location: updateDto.location ? updateDto.location : user.location,
        password: updateDto.password ? updateDto.password : user.password
      })
      .where({
        userId: id
      })
      .execute()
      .catch(() => {
        throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
      })
  }

  async removeUser(id: string) {
    await UsersEntity
      .createQueryBuilder()
      .delete()
      .from(UsersEntity)
      .where({ userId: id })
      .execute()
      .catch(() => {
        throw new HttpException("Bad REquest", HttpStatus.BAD_REQUEST)
      })
  }
}
