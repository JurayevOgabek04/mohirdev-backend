import { IsNotEmpty, IsString } from "class-validator"

export class CreateSubcategoryDto {
    @IsString()
    @IsNotEmpty()
    subCatigoryName: string

    @IsNotEmpty()
    @IsString()
    catigoryId: string
}
