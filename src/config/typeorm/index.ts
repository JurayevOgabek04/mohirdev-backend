import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv"
import { UsersEntity } from "../../entities/users.entity"
import { CatigoryEntity } from "../../entities/catigories.entity"
import { SubCatigoriesEntity } from "../../entities/subcatigories.entity"


dotenv.config()


export const connectDb: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    password: String(process.env.DB_PASSWORD),
    username: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    entities: [
        UsersEntity,
        CatigoryEntity,
        SubCatigoriesEntity
    ],
    autoLoadEntities: true,
    synchronize: true,
};
