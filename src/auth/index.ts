// import passport, {AuthenticateOptions} from "passport"
// import {Strategy as LocalStrategy} from "passport-local"
// import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
//
// const JWT_SECRET_KEY = "123456"
//
// app.use(passport.initialize())
// app.use(passport.session())
// passport.serializeUser(function (user, cb) {
//     console.log('serializeUser', user, cb)
//     cb(null, 1);
// });
//
// passport.deserializeUser(function (id, cb) {
//     console.log('deserializeUser', id, cb)
//     cb(null, {id: 111, name: "Ann"});
// });
// passport.use(new LocalStrategy({
//         usernameField: 'user',
//         passwordField: 'pass',
//     },
//     function (username, password, done) {
//         console.log({username, password, done})
//         // @ts-ignore
//         done(null, {id: 111, name: "Ann"})
//     }
// ))
//
//
//
// const c = (options: AuthenticateOptions) => {
//     const jwtOptions = {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: JWT_SECRET_KEY
//     }
//     passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
//         if (payload.sub === "rob") done(null, true);
//         else done(null, false);
//     }))
//     passport.authenticate('local', options)
// }
//
// export default passport