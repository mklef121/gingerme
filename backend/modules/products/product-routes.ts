import { Router } from "express"
import { createProductOrder, getBrands, getProduct, getProducts, getSuppliers, getTopSoldProducts } from "./product-controller"
import { integerParamValidator } from "../../utils/validator"
import { createProductOrderValidator, getProductsPaginationValidator, getTopProductValidator } from "./validator"
import { validateRequestUser } from "../../middlewares/auth-middleware"

const router = Router()

router.get("/top-selling",getTopProductValidator(), getTopSoldProducts)
router.get("/brands", getBrands)
router.get("/suppliers", getSuppliers)
router.get("/:productId", integerParamValidator("productId"), getProduct) 
router.get("/", getProductsPaginationValidator(), getProducts)
router.post("/:productId/orders",validateRequestUser, createProductOrderValidator(), createProductOrder)



export default router