import { IsString, IsNotEmpty } from "class-validator"

export class UpdateCategoryDto {

    @IsNotEmpty()
    @IsString()
    catigoryName: string
}
