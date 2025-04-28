import express from "express"
import { engine } from "express-handlebars"
import { conectaDB } from "./ConnDB.js"
import logger from "morgan"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import { initializePassport } from "./config/passport.config.js"
import passport from "passport"
import cors from "cors"

import { router as productsRouter } from "./routes/products.router.js"
import { router2 as cartsRouter } from "./routes/carts.router.js"
import { router3 as viewsRouter } from "./routes/views.router.js"
import { router4 as cookiesRouter } from "./routes/cookies.router.js"
import { router5 as sessionsRouter } from "./routes/api/session.router.js"
import { router6 as usersRouter } from "./routes/api/users.router.js"


import { configObject } from "./config/index.js"
const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser('CoderPalab@S3cret@'))
app.use(cors())

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


app.use(session({
    store: MongoStore.create({
        mongoUrl: configObject.mongo_url || "mongodb+srv://dbenavides:CoderCoder123@cluster0.wgxwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 1000*3600*24,
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/sessions", sessionsRouter)
app.use("api/users", usersRouter)

conectaDB(
  configObject.mongo_url || "mongodb+srv://dbenavides:CoderCoder123@cluster0.wgxwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0","datosProductos"
)

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)
app.use("/cookies", cookiesRouter)



app.listen(configObject.port, () => {
  console.log(`Servidor en línea en el puerto ${configObject.port}!`)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Algo salió mal!")
})