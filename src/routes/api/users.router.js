import { Router } from "express"
import { UsersController } from "../../controllers/users.controllers.js"

export const router6 = Router()
export const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser

} = new UsersController()

router6.post('/', createUser)
router6.get('/', getUsers)
router6.get('/:uid', getUser)
router6.put('/:uid', updateUser)
router6.delete('/:uid', deleteUser)