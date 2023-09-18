import  express  from "express";
import dotenv from 'dotenv'
import { Database } from "./database/db.js";
import { routerUser } from "./routes/UserRotes.js";

dotenv.config()
Database.initialize()

const port = process.env.PORT
const app = express()

app.use(express.json())

app.use(routerUser)

app.listen(port,() => console.log(`Servidor conectado na port ${port}`))