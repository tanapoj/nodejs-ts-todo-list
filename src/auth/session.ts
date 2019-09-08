import expressSession from "express-session"
import passport, {AuthenticateOptions} from "passport"
import {IStrategyOptions, Strategy as LocalStrategy} from "passport-local"
import {NextFunction, Request, Response} from "express"
import {User} from "../entities/User"
import UserRepository from "../repositories/UserRepository"

const ses = expressSession({
    secret: 'asdf123456',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 86400000}
})

export function getPassport() {
    return passport
}

export function session() {
    return ses
}

export default function () {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect("/login")
        }
    }
}

export function doLogin(strategyOptions: IStrategyOptions = {}, options: AuthenticateOptions = {}) {
    passport.serializeUser((user: User, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser(async (id: number, cb) => {
        let repo = await UserRepository()
        cb(null, await repo.getUserById(id));
    });
    passport.use(new LocalStrategy(strategyOptions, async (email, password, done) => {
        let repo = await UserRepository()
        try {
            let user = await repo.getUserByEmailPassword(email, password)
            console.log({user})
            if (typeof user === 'undefined') {
                done(null, false)
                return
            }
            done(null, user)
        } catch (e) {
            done(e, false)
        }
    }))
    return passport.authenticate('local', {...options})
}