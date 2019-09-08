import express, {Request, Response, Router} from "express"
import sessionAuth, {doLogin, session} from "../auth/session"
import {LoginFormSubmit} from '../types/LoginFormSubmit'
import {getPassport} from "../auth/jwt"

const router: Router = Router()

router.use(express.urlencoded({extended: true}))
router.use(session())
router.use(getPassport().initialize())
router.use(getPassport().session())

router.get("/login", (req: Request, res: Response) => {
    let err = req.query.err == 1
    res.render("login", {
        err
    })
})

router.post("/login", doLogin({
    usernameField: "email",
    passwordField: "password"
}, {
    successRedirect: "/",
    failureRedirect: "/login?err=1"
}))

router.get("/logout", (req: Request, res: Response) => {
    req.logout()
    res.redirect("/")
})

router.get("/register", (req: Request, res: Response) => {
    res.render("register")
})

router.post("/register", (req: Request, res: Response) => {
    res.render("register")
})

export default router