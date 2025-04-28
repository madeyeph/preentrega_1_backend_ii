import { UsersDao } from "../dao/factory.js"
import { ProductsDao } from "../dao/factory.js"
import { userRepository } from "./users.repository.js"
import { productsRepository } from "./products.repository.js"

export const usersService = new userRepository( new UsersDao())
export const productsService = new productsRepository(new ProductsDao())