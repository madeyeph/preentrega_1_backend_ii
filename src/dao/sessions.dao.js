import { usersModel } from "./models/usermodels.js"

export class SessionsDaoMongo {
    constructor(){
        this.usersModel = usersModel
    }

    getUser = async email => await this.usersModel.findOne({ email })
    createUser = async newUser => await this.usersModel.create(newUser)
}