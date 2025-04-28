import { usersModel } from "../dao/models/usermodels.js"
import { authentication } from "../middlewares/auth.middlewares.js"
import { createHash, isValidPassword } from "../bcrypt.js"
import passport from "passport"
import { generateToken, authToken } from "../authToken.js"
import { passportCall } from "../middlewares/passportCall.js"
import { authorization } from "../middlewares/authorization.middlewares.js"
import { SessionsDaoMongo } from "../dao/sessions.dao.js"

export class SessionsController {

    constructor(){
        this.service = new SessionsDaoMongo()

    }
    register = async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body
            console.log(req.body)
    
            if (!email || !password) return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
    
            const userFound = await this.service.getUser(email)
            if (userFound) return res.status(401).send({status: 'error', error: 'El usuario ya existe'})
    
            const newUser = {
                first_name, 
                last_name, 
                email,
                password: createHash(password)
            }
    
            const result = await this.service.createUser(newUser)
            res.send({status: 'success', payload: result})
            
        } catch (error) {
            console.log(error)
        }

    }
    login = async(req, res) => {
        const { email, password } = req.body
    
        if (!email || !password) return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
    
        const userFound = await this.service.getUser(email)
        if (!userFound) return res.status(401).send({status: 'error', error: 'El usuario no existe'})
    
    
        if(!isValidPassword(password, { password: userFound.password })) return res.status(401).send({status: 'error', error: 'El email o la contraseña no coinciden'})
    
        const token = generateToken({
            id:userFound._id,
            email: userFound.email,
            role: 'admin'
        })
     
        res
            .cookie("coderCookieToken", token, {
                maxAge: 60*60*1000,
                httpOnly: true
            })
            .send({status: 'success', message: "¡Successful Log!"})
    }
    current = (req, res) => {
        console.log(req.user)
        res.send({status: 'success', payload: req.user})
    }
    

}