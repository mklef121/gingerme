import express, { Request, Response, json } from "express"
import productRoutes from "./modules/products/product-routes"
import userRoutes from "./modules/users/user-routes"
import orderRoutes from "./modules/orders/order-routes"
import { config as dotenvConfig } from "dotenv"
import cors from "cors"

dotenvConfig()
const app = express()
const port = 3000
app.use(json());
app.use(cors())

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, Welcome to gingerme!")
})

app.use("/products", productRoutes,)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


BigInt.prototype.toJSON = function () { return Number(this) }

