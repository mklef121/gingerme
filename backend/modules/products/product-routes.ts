import { Router } from "express"
import { createProductOrder, getProduct, getProducts } from "./product-controller"
import { integerParamValidator } from "../../utils/validator"
import { createProductOrderValidator, getProductsPaginationValidator } from "./validator"

const router = Router()

router.get("/:productId", integerParamValidator("productId"), getProduct)
router.get("/", getProductsPaginationValidator(), getProducts)
router.post("/:productId/orders", createProductOrderValidator(), createProductOrder)


export default router