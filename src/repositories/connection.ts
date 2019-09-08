import {createConnection, Connection, getRepository} from "typeorm";
import {User} from './../entities/User'
import {Todo} from './../entities/Todo'

const connection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    //password: "root",
    database: "tododb",
    entities: [User, Todo]
})

export default connection