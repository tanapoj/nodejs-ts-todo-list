import express, {Request, Response, Router} from "express"
import sessionAuth, {session} from "../auth/session"
import TodoRepository from "../repositories/TodoRepository"
import {User} from "../entities/User"
import {CreateTodoFormSubmit} from "../types/CreateTodoFormSubmit"

const router: Router = Router()

router.use(express.urlencoded({extended: true}))
router.use(session())

router.get("/", sessionAuth(), async (req: Request, res: Response) => {
    res.redirect("/todo")
})

router.get("/todo", sessionAuth(), async (req: Request, res: Response) => {
    const user: User = req.user as User
    const repo = await TodoRepository()
    let todo = await repo.getTodoList(user.id)
    res.render("list", {
        msgSuccess: null,
        todos: todo,
        username: user.username
    })
})

router.post("/todo", sessionAuth(), async (req: Request, res: Response) => {
    const {title, description} = req.body as CreateTodoFormSubmit
    const user: User = req.user as User
    const repo = await TodoRepository()
    await repo.create(user.id, title, description)
    res.redirect("/todo")
})

router.get("/todo/:id/action/done", sessionAuth(), async (req: Request, res: Response) => {
    const {id} = req.params
    const user: User = req.user as User
    const repo = await TodoRepository()
    if (id === "all") {
        await repo.removeAll(user.id)
    } else {
        await repo.remove(+id)
    }
    res.redirect("/todo")
})

router.get("/todo/:id/action/edit", sessionAuth(), async (req: Request, res: Response) => {
    const id = +req.params.id
    const user: User = req.user as User
    const repo = await TodoRepository()

    let todo = await repo.getTodo(id)

    res.render("edit-form", {
        todo: todo,
        username: user.username
    })
})

export default router