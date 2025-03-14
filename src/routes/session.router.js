import { Router } from "express"
import { usersModel } from "../dao/models/usermodels.js"
import { authentication } from "../middlewares/auth.middlewares.js"

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
        password
    }

    const result = await usersModel.create(newUser)
    res.send({status: 'success', payload: result})
})

router5.post('/login', async(req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    if (!email || !password) return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})

    const usersFound = await usersModel.findOne({email})
    if (!usersFound) return res.status(401).send({status: 'error', error: 'El usuario no existe'})

    if (usersFound.password !== password || usersFound.email !== email) {
        return res.status(401).send({status: 'error', error: 'El email o la contraseña no coinciden'})
    }

    req.session.user = {
        email,
        isAdmin: true
    }


    res.send('Login concedido!')
})

router5.get('/current', authentication ,(req, res) => {
    res.send('info sensible de usuarios')
})

router5.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return  res.send(error)
        res.send('Ha salido de la sesión!')
        
    })
})