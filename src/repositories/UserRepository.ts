import connection from "./connection";
import {User} from './../entities/User'
import {Connection, getRepository} from "typeorm"

class UserRepository {
    constructor(private connection: Connection) {

    }

    async getUserById(id: number): Promise<User> {
        return new Promise<User>((async (resolve, reject) => {
            const user: User | undefined = await this.connection
                .getRepository(User)
                .createQueryBuilder()
                .where("id = :id", {id})
                .getOne()
            if (typeof user === 'undefined') {
                reject(false)
            } else {
                resolve(user)
            }
        }))
    }

    async getUserByEmailPassword(email: string, password: string): Promise<User> {
        return new Promise<User>((async (resolve, reject) => {
            const user: User | undefined = await this.connection
                .getRepository(User)
                .createQueryBuilder()
                .where("email = :email and password = :password", {email, password})
                .getOne()
            if (typeof user === 'undefined') {
                reject(false)
            } else {
                resolve(user)
            }
        }))
    }

    async create(user: User): Promise<User> {
        await getRepository(User).save(user)
        return user
    }

    async update(username:string, email:string, password:string): Promise<User> {
        let user = new User()
        user.username = username
        user.email = email
        user.password = password
        await getRepository(User).save(user)
        return user
    }
}

export default async () => new UserRepository(await connection)