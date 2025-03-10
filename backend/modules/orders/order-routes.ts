import { Router } from "express"
import { getOrder, getOrders } from "./order-controller"
import { integerParamValidator } from "../../utils/validator"
import { getOrdersValidator } from "./validator"

const router = Router()

router.get("/:orderId", integerParamValidator("orderId"), getOrder)
router.get("/",getOrdersValidator(), getOrders)


export default router
