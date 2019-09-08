import connection from "./connection";
import {User} from './../entities/User'
import {Connection, getRepository} from "typeorm"
import {Todo} from "../entities/Todo"

class TodoRepository {
    constructor(private connection: Connection) {

    }

    async getTodoList(userId: number): Promise<Todo[]> {
        return new Promise<Todo[]>((async (resolve, reject) => {
            const todos: Todo[] | undefined = await this.connection
                .getRepository(Todo)
                .createQueryBuilder()
                .where("user_id = :userId", {userId})
                .getMany()
            if (typeof todos === 'undefined') {
                reject(false)
            } else {
                resolve(todos)
            }
        }))
    }

    async getTodo(id: number): Promise<Todo> {
        return new Promise<Todo>((async (resolve, reject) => {
            const todo: Todo | undefined = await this.connection
                .getRepository(Todo)
                .createQueryBuilder()
                .where("id = :id", {id})
                .getOne()
            if (typeof todo === 'undefined') {
                reject(false)
            } else {
                resolve(todo)
            }
        }))
    }

    async create(userId: number, title: string, description: string): Promise<Todo> {
        let todo = new Todo()
        todo.title = title
        todo.description = description
        todo.userId = userId
        await getRepository(Todo).save(todo)
        return todo
    }

    async update(todo: Todo): Promise<Todo> {
        await getRepository(Todo).save(todo)
        return todo
    }

    async remove(id: number) {
        let todo = await Todo.findOne({id})
        await todo!.remove()
    }

    async removeAll(userId: number) {
        await this.connection
            .createQueryBuilder()
            .delete()
            .from(Todo)
            .where("user_id", {user_id: userId})
            .execute()
    }
}

export default async () => new TodoRepository(await connection)