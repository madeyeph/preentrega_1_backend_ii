import { Router } from "express"
import { passportCall } from "../middlewares/passportCall.js"
import { authorization } from "../middlewares/authorization.middlewares.js"

import { SessionsController } from "../controllers/sessions.controllers.js"

export const router5 = Router()
export const {
    register,
    login,
    current
} = new SessionsController()

router5.post('/register', register)
router5.post('/login', login)
router5.get('/current', passportCall('jwt'), authorization('admin'), current)