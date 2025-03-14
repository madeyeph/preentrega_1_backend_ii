import express from "express"
import { engine } from "express-handlebars"
import { conectaDB } from "./ConnDB.js"
import logger from "morgan"
import cookieParser from "cookie-parser"
import session from "express-session"


import { router as productsRouter } from "./routes/products.router.js"
import { router2 as cartsRouter } from "./routes/carts.router.js"
import { router3 as viewsRouter } from "./routes/views.router.js"
import { router4 as cookiesRouter } from "./routes/cookies.router.js"


const PORT = 8080
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser('CoderPalab@S3cret@'))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)
app.use("/cookies", cookiesRouter)
app.use(session({
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

app.listen(PORT, () => {
  console.log(`Servidor en línea en el puerto ${PORT}!`)
})

conectaDB(
    "mongodb+srv://dbenavides:CoderCoder123@cluster0.wgxwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0","datosProductos"
)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Algo salió mal!")
})