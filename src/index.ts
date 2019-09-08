import express, {Application, Request, Response} from 'express'
import path from 'path'
import moment from "moment"

//create app
const app: Application = express()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//load module
import apiModule from './modules/api'
import userModule from './modules/user'
import todoModule from './modules/todo'

app.use('/api', apiModule)
app.use(userModule)
app.use(todoModule)

app.listen(3000, () => {
    console.log(moment().format("YYYY-MM-DD hh:mm:ss") + ": server started!")
})