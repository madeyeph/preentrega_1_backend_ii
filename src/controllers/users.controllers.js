import { UserDto } from "../dto/users.dto.js"
import { usersService } from "../services/index.js"

export class UsersController {
    constructor(){
        this.service = usersService
    }

    createUser = async (req, res)=>{
        const { body } = req
        const result = await this.usersService(body)
    }

    getUsers = async (req, res)=>{
        const users= await this.service.getUsers ()
        res.send({status: 'success', payload: result})
    }

    getUser = (req, res)=>{
        res.send('get user')
    }

    updateUser = (req, res)=>{
        res.send('update user')
    }

    deleteUser = (req, res)=>{
        res.send('delete user')
    }

}