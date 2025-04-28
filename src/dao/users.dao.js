import { usersModel } from "./models/usermodels.js"

export class UsersDaoMongo {
    constructor(){
        this.usersModel = usersModel
    }

    getUsers = async _ => await this.usersModel.find({});
    createUser = async newUser => await this.usersModel.create(newUser);
    getBy = async (filter) => 'get user';
    update = async (uid, updateToUser) => 'update user';
    delete = async uid => 'delete user';
}