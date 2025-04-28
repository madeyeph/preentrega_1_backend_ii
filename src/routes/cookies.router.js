import { Router } from "express"

export const router4 = Router()


router4.get('/setcookiessinged', (req,res) =>{ // Declaro la cookie
    res
        .cookie('CoderCookieSinged', 'Es una cookie muy poderosa!', { maxAge: '10000000', signed: true}) // Instrucción de config
        .send('Cookie configurada!')
})

router4.get('/getcookiessigned', (req,res) =>{ // Mostrar Las Cookies
    const {signedCookies} = req

    console.log(signedCookies)
    res.send(signedCookies)
})

router4.get("/removecookies", async (req, res) => { // Borro la cookie

    res.clearCookie("CoderCookie")
    .send("Cookie Eliminada!")

})