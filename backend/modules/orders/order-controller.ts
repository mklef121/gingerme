import { Request, Response } from "express"
import { sendResponse, HttpStatus } from "../../http/response"
import { getValidationMessage, isNumber } from "../../utils/validator"
import { GetOrder as GetOrderService } from "./order-service"
import { validationResult } from "express-validator"

export async function GetOrder(req: Request, res: Response) {

    const validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
        sendResponse(res, HttpStatus.BAD_REQUEST, getValidationMessage(validateResult))
        return
    }

    const order = await GetOrderService(Number(req.params.orderId))

    if (order == null) {
        sendResponse(res, HttpStatus.NOT_FOUND, "order not found")
    } else {
        sendResponse(res, HttpStatus.OK, "found", order)
    }
}
