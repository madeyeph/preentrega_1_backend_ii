import mongoose from "mongoose"

const usersCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        
    },
    last_name: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})

export const usersModel = mongoose.model(usersCollection, userSchema)