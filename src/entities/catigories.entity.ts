import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { SubCatigoriesEntity } from "./subcatigories.entity"

@Entity({ name: "catigories" })
export class CatigoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    catigoryId: string

    @Column({
        type: "character varying"
    })
    catigoryName: string

    @OneToMany(() => SubCatigoriesEntity, (cat) => cat.catigories, {
        onDelete: "CASCADE"
    })
    subCatigories: SubCatigoriesEntity[]
}