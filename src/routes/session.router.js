import { Router } from "express"
import { authentication } from "../middlewares/auth.middlewares.js"

export const router5 = Router()

router5.get('/sessions', (req, res) => {
    if(req.session.counter){
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    }else{
        req.session.counter = 1
        res.send('Bienvenido a la sesión!')
    }
})
router5.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return  res.send(error)
        res.send('Ha salido de la sesión!')
        
    })
})

router5.post('/login', (req, res) => {
    const { email, password } = req.body
    // fue a la base de datos y volvio
    if (email !== 'f@gmail.com' || password !== '123456') {
        return res.send('Login incorrecto!')
    }
    // req.sessions.user => {email, admin}
    req.session.email = email
    req.session.admin = false

    res.send('Login correcto!')
})

router5.get('/current', authentication ,(req, res) => {
    res.send('info sensible de usuarios')
})