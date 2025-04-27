import { Router } from "express"
import { usersModel } from "../dao/models/usermodels.js"
import { authentication } from "../middlewares/auth.middlewares.js"
import { authorization } from "../middlewares/authorization.middlewares.js"
import { createHash, isValidPassword } from "../bcrypt.js"
import passport from "passport"
import { passportCall } from "../middlewares/passportCall.js"
import { generateToken, authToken } from "../authToken.js"

export const router5 = Router()

router5.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    console.log(req.body)

    if (!email || !password) return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})

    const userFound = await usersModel.findOne({email})
    if (userFound) return res.status(401).send({status: 'error', error: 'El usuario ya existe'})

    const newUser = {
        first_name, 
        last_name, 
        email,
        password: createHash(password)
    }

    const result = await usersModel.create(newUser)
    res.send({status: 'success', payload: result})
})

router5.post('/login', async(req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})

    const userFound = await usersModel.findOne({email})
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
})

router5.get('/current', passportCall('jwt'), authorization('admin'), (req, res) => {
    console.log(req.user)
    res.send({status: 'success', payload: req.user})
})