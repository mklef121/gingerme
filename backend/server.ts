import express, { Request, Response, json } from "express"
import { PrismaClient } from "@prisma/client"
import productRoutes from "./modules/products/product-routes"
import userRoutes from "./modules/users/user-routes"
import orderRoutes from "./modules/orders/order-routes"
import { config as dotenvConfig } from "dotenv"
import { validateRequestUser } from "./middlewares/auth-middleware"


dotenvConfig()
const app = express()
const port = 3000
app.use(json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, Welcome to gingerme!")
})

app.use("/products", validateRequestUser, productRoutes,)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


