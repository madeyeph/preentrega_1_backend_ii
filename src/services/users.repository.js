import { UserDto } from "../dto/users.dto.js"

export class userRepository{
    constructor(dao){
        this.dao = dao

    }

    createUser = async newUser => {

        const userDto = new UserDto(newUser)
        return await this.dao.create(userDto)
    }
    getUsers = async () => await this.dao.get()
    getUser = async (filter) => {}
    updateUser = async (uid, userToUpdate) => {}
    deleteUSer = async (uid) => {}

}