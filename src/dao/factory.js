import { configObject } from "../config/index.js"
import { ProductsDaoMongo } from "./products.dao.js"
import { UsersDaoMongo } from "./users.dao.js"

export const { persistence } = configObject
export let UsersDao
export let ProductsDao
export let CartsDao

switch (persistence) {
    case 'MONGO':

        break;

    default:
        UsersDao = UsersDaoMongo
        ProductsDao =ProductsDaoMongo

        break;

}