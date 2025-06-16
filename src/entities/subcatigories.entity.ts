import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm"
import { CatigoryEntity } from "./catigories.entity"

@Entity({ name: "subcatigories" })
export class SubCatigoriesEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    subCatId: string

    @Column({
        type: "character varying"
    })
    subCatName: string

    @ManyToOne(()=> CatigoryEntity, (subcat) => subcat.subCatigories, {
        onDelete: "CASCADE"
    })
    @JoinTable()
    category: CatigoryEntity
}