import passport, {AuthenticateOptions} from "passport"
import jwt from 'jwt-simple'
import {Strategy as LocalStrategy} from "passport-local"
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
import UserRepository from "../repositories/UserRepository"

const JWT_SECRET_KEY = "123456"

export function getPassport() {
    return passport
}

export function encode(id: number, options: { [key: string]: any } = {}) {
    return jwt.encode({
        ...options,
        sub: id,
        iat: new Date().getTime()
    }, JWT_SECRET_KEY)
}

export default function (options: AuthenticateOptions = {}) {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET_KEY
    }
    passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
        const repo = await UserRepository()
        try {
            let user = await repo.getUserById(payload.sub)
            done(null, user)
        } catch {
            done(null, false)
        }
    }))
    return passport.authenticate('jwt', {...options, session: false})
}