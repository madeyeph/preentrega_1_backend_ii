import mongoose from "mongoose"
import dotenv from "dotenv"
import { programProcess } from "../process.js"
import { MongoSingleton } from "../MongoSingleton.js"

const { mode } = programProcess.opts()
dotenv.config({
    path: mode === 'production'? './.env.production' : './.env.developer' 
})

export const configObject = {
    port: process.env.PORT || 8080,
    privateKey: process.env.PRIVATE_KEY,
    mongo_url: process.env.MONGO_URL

}

export const connectDB = () => {
    return MongoSingleton.getInstance('mongodb+srv://dbenavides:CoderCoder123@cluster0.wgxwo.mongodb.net/datosProductos?retryWrites=true&w=majority&appName=Cluster0')
}