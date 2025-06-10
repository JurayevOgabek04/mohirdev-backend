import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectDb } from './config/typeorm'
import { CategoriesModule } from './module/categories/categories.module';
import { SubcategoriesModule } from './module/subcategories/subcategories.module';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(connectDb), CategoriesModule, SubcategoriesModule],
})
export class AppModule { }
