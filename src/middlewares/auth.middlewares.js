export const authentication=(req, res, next) => {

    console.log(req.session.email, req.session.admin)
    if(req.session.email !== 'f@gmail.com' || !req.session.admin ) {
        return res.send('error de autenticación ')
    }
    next()
}