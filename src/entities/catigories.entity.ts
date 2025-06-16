import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { SubCatigoriesEntity } from "./subcatigories.entity"

@Entity({ name: "catigories" })
export class CatigoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    catigoryId: string

    @Column({
        type: "character varying",
        unique: true
    })
    catigoryName: string

    @OneToMany(() => SubCatigoriesEntity, (cat) => cat.category, {
        "cascade": true
    })
    subCatigories: SubCatigoriesEntity[]
}