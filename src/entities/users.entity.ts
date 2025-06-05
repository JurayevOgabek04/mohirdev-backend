import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"



@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({
        type: 'character varying',
        length: 100
    })
    username: string

    @Column({
        type: 'character varying'
    })
    lastname: string


    @Column({
        type: Number,
        nullable: true
    })
    userage: number

    @Column({
        type: "character varying"
    })
    phone: string

    @Column({
        type: "character varying",
        nullable: true
    })
    location: string | null

    @Column({
        type: "character varying"
    })
    password: string

    @Column({
        type: 'character varying',
        nullable: true
    })
    role: string
}