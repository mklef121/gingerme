import { Router } from "express"
import { GetOrder } from "./order-controller"
import { integerParamValidator } from "../../utils/validator"

const router = Router()

router.get("/:orderId", integerParamValidator("orderId"), GetOrder)

export default router
