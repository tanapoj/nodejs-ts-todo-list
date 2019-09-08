import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import moment from "moment"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number = 0

    @Column()
    username: string = ""

    @Column()
    email: string = ""

    @Column()
    password: string = ""

    @Column({name: "register_at"})
    registerAt: Date = new Date()

}