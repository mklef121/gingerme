import { Router } from "express"
import { loginUser, getUser } from "./user-controller"
import { userLoginValidator } from "./validator"
import { integerParamValidator } from "../../utils/validator"

const router =  Router()

router.post("/login", userLoginValidator(), loginUser)
router.post("/:userId",integerParamValidator("userId"), getUser)


export default router