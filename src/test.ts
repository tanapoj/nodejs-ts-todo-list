import express, {Application, Request, Response} from 'express'
import path from 'path'
import session from 'express-session'
import cookie from 'cookie-parser'
import passport from 'passport'
import {BasicStrategy} from "passport-http"
import {Strategy as LocalStrategy} from "passport-local"
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
import multer from 'multer'

const app: Application = express()

app.use(session({
    secret: 'asdf123456',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

app.use(cookie())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function (user, cb) {
    console.log('serializeUser', user, cb)
    cb(null, 1);
});

passport.deserializeUser(function (id, cb) {
    console.log('deserializeUser', id, cb)
    cb(null, {id: 111, name: "Ann"});
});
passport.use(new LocalStrategy({
        usernameField: 'user',
        passwordField: 'pass',
    },
    function (username, password, done) {
        console.log({username, password, done})
        // @ts-ignore
        done(null, {id: 111, name: "Ann"})
    }
))


const jwtOptions = {
    // jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
    secretOrKey: "1234567"
}
passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    if (payload.sub === "rob") done(null, true);
    else done(null, false);
}))

app.get('/profile', passport.authenticate('local', {
    failureRedirect: '/login.ejs'
}), (req: Request, res: Response) => {
    res.json(req)
})

app.post('/dologin',
    passport.authenticate('local', {failureRedirect: '/login.ejs'}),
    function (req, res) {
        // @ts-ignore
        res.json(req.user);
    });

// interface People {
//     id: number
//     name: string
//     [key: string]: any
// }
// type People2 = {
//     id: number
//     name: string
//     [key: string]: any
// }
//
// type X = "a" | "b" | 123
//
// type PeopleKey = keyof People
//
// let x: PeopleKey = "id"
//
// function set<T extends PeopleKey>(key: T, value: People[T]) {
//     console.log(key, value)
// }
//
// set('name', 'Ann')
// set('id', 42)
// set('id', true)
//
// set('test', 1)

// app.get('/', (req: Request | Express.Session, res: Response) => {
//     console.log(req.session, req.cookies)
//     if (typeof req.session['counter'] === 'undefined') {
//         req.session['counter'] = 0
//     }
//     // req.session['counter'] = req.session['counter'] + 1
//     req.session.counter++
//     res.cookie('counter', +(req.cookies['counter'] || 0) + 1)
//
//     res.send(`session is ${req.session.counter}, cookies is ${req.cookies.counter}`)
// })

app.listen(3000)