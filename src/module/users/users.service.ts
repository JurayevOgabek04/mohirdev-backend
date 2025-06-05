import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from "./dto/login-user.dto"
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from '../../entities/users.entity';
import JwtStrategy from '../../utils/utils'


@Injectable()
export class UsersService {

  //Users Register

  async register(badyDto: RegisterUserDto): Promise<any> {

    const findUser = await UsersEntity.findOne({
      where: {
        phone: badyDto.phone
      }
    })

    if (findUser) {
      return "User already exists"
    }


    const newUser = await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        username: badyDto.username,
        lastname: badyDto.lastname,
        userage: badyDto.userage,
        phone: badyDto.phone,
        location: badyDto.location,
        password: badyDto.password,
        role: badyDto.role ?? "user"

      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
      })

    const token = JwtStrategy.sign({ email: newUser.raw[0]?.phone })

    return {
      code: 200,
      access_token: token
    }


  }

  async login(badyDto: LoginUserDto): Promise<any> {
    const user = await UsersEntity.findOne({
      where: {
        phone: badyDto.phone
      }
    })

    if (!user) {
      return "User not Found"
    } else {
      if (user.password != badyDto.password) {
        return "Password is not correct"
      }
    }

    const token = await JwtStrategy.sign({ phone: user.phone })

    return {
      status: 200,
      access_token: token
    }
  }

  //Users all

  async findAll() {
    return await UsersEntity.find()
      .catch(() => {
        throw new HttpException('User not fount', HttpStatus.NOT_FOUND)
      })


  }


  //users one 

  async findOne(id: string) {
    const user = await UsersEntity.findOne({
      where: {
        userId: id
      }
    })

    if (!user) {
      throw new HttpException('User not fount', HttpStatus.NOT_FOUND)
    }

    return user
  }


  //users one phone number

  async findOnePhone(number: string) {
    const user = await UsersEntity.findOne({
      where: {
        phone: number
      }
    })

    if (!user) {
      throw new HttpException('User not fount', HttpStatus.NOT_FOUND)
    }

    return user

  }


  //Users Update

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


  //User Delete

  async removeUser(id: string) {

    const user = await UsersEntity.findOne({
      where: {
        userId: id
      }
    })

    if (!user) {
      return "User not found"
    }

    await UsersEntity
      .createQueryBuilder()
      .delete()
      .from(UsersEntity)
      .where({ userId: id })
      .execute()
      .catch(() => {
        throw new HttpException("Bad REquest", HttpStatus.BAD_REQUEST)
      })

    return {
      code: 200,
      message: "user successfully deleted"
    }
  }
}
