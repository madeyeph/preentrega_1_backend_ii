import { UsersDao } from "../dao/factory.js"
import { userRepository } from "./users.repository.js"

export const usersService = new userRepository( new UsersDao())