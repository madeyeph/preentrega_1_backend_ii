import jwt from "jsonwebtoken"

const PRIVATE_KEY = 'CoderKeyFuncionSecret'

export const generateToken = userDataToken =>  jwt.sign(userDataToken, PRIVATE_KEY, {expiresIn: '1d'}) 


export const authToken = (req, res, next ) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, userDecode)=>{
        if (error) return res.status(401).send({status: 'error', error: 'no authorized'})

        req.user = userDecode
        next()
    })
}