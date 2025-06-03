import { IsString, IsNumber, IsNotEmpty, IsPhoneNumber, IsOptional } from "class-validator";


export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsNumber()
    @IsOptional()
    userage: number


    @IsString()
    @IsOptional()
    location: string

    @IsString()
    @IsOptional()
    role: string = 'user'

    @IsString()
    @IsNotEmpty()
        // @IsPhoneNumber("UZ", { "message": "Telefon raqami noto'g'ri kiritilgan" })
    phone: string


    @IsString()
    @IsNotEmpty()
    password: string

}
