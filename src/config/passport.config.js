import passport from "passport"
import jwt from "passport-jwt"
import { usersModel } from "../dao/models/usermodels.js"
import { PRIVATE_KEY } from "../authToken.js"

const JWTSrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

export const initializePassport = () => {
    
    const cookieExtractor = (req) => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['coderCookieToken']
        }
        return token
    }
    
    console.log(PRIVATE_KEY)

    passport.use('jwt', new JWTSrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (dataFromToken, done) => {
        try {
            return done(null, dataFromToken) 
        } catch (error) {
            done(error)
        }
    }))
}