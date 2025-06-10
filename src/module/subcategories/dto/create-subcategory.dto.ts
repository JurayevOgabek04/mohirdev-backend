import { IsString } from "class-validator"

export class CreateSubcategoryDto { 
    @IsString()
    catigoryName: string
}
