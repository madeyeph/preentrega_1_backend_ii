import passport from "passport"
import local from "passport-local"
import { usersModel } from "../dao/models/usermodels.js"
import { createHash, isValidPassword } from "../bcrypt.js"

const LocalStrategy = local.Strategy

export const initializePassport = () => {
    
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const {first_name, last_name} = req.body

            let userFound = await usersModel.findOne({email: username})
            if(userFound) return done(null, false) 

            let userNew = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)                
            }
            let result = await usersModel.create(userNew)
            return done(null, result) 
        } catch (error) {
            return done('Error al crear un usuario: ' + error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    
    passport.deserializeUser(async (id, done) => {
        let user = await usersModel.findOne({_id: id})
        done(null, user)
    })
    
    
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await usersModel.findOne({email: username})
           
            if (!user) return done(null, false)

            if(!isValidPassword(password, {password: user.password})) return done(null, false)
            
            done(null, user)
        } catch (error) {
            done(error)
        }
    }))
}