import { connect } from "mongoose"

export class MongoSingleton {
    static #instance
    constructor(uri){
        connect(uri)
    }

    static getInstance(uri){
        if (this.#instance){
            console.log ('Base de Datos ya se encuentra conectada.')
            return this.#instance
        }
        this.#instance = new MongoSingleton (uri)
        console.log('Base de Datos Online!')
        return this.#instance

    }
}