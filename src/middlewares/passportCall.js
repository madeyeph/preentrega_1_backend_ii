import passport from "passport"

export const passportCall = (strategy) => {
    return async (req, res, next)=> {
        passport.authenticate(strategy, function(err, user, info) {
            console.log('user call: ', user)
            if(err) return next(err)
            if(!user) return res.status(401).send({erro: info.messages ? info.messages : info.toString() })
            req.user = user
            next()
        })(req,res,next)
    }

}