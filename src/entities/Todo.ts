import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number = 0

    @Column()
    title: string = ""

    @Column()
    description: string = ""

    @Column({name: "create_at"})
    createAt: Date = new Date()

    @Column({name: "update_at"})
    updateAt: Date = new Date()

    @Column({name: "user_id"})
    userId: number = 0

}