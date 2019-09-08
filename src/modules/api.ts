import express, {NextFunction, Request, Response, Router} from "express"
import UserRepository from "../repositories/UserRepository"
import TodoRepository from "../repositories/TodoRepository"
import jwtAuth from './../auth/jwt'
import {encode, getPassport} from "../auth/jwt"
import {User} from '../entities/User.js'

const router: Router = Router()

router.use(express.json())
router.use(getPassport().initialize())
router.use(getPassport().session())

router.get("/jwt", async (req: Request, res: Response) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400).json({msg: "email or password is missing"})
        return
    }
    const repo = await UserRepository()
    try {
        let user = await repo.getUserByEmailPassword(email, password)
        let token = encode(user.id, {
            username: user.username
        })
        res.json({token})
    } catch {
        res.status(401).json({msg: "email or password is incorrect"})
    }
})

router.get("/test", jwtAuth(), (req: Request, res: Response) => {
    res.send("ok")
})
router.get("/todo", jwtAuth(), async (req: Request, res: Response) => {
    const user: User = req.user as User
    const repo = await TodoRepository()
    let todo = await repo.getTodoList(user.id)
    res.json(todo)
})

export default router