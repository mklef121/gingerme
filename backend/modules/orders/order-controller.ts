import { Request, Response } from "express"
import { sendResponse, HttpStatus } from "../../http/response"
import { getValidationMessage, isNumber } from "../../utils/validator"
import { GetOrder as GetOrderService, getOrders as getOrdersService } from "./order-service"
import { validationResult } from "express-validator"
import { GetOrderRequest, LATEST, LatestOrEarliest, LIMIT } from "./dtos"

export async function getOrder(req: Request, res: Response) {

    const validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
        sendResponse(res, HttpStatus.BAD_REQUEST, getValidationMessage(validateResult))
        return
    }

    const order = await GetOrderService(Number(req.params.orderId))

    if (order == null) {
        sendResponse(res, HttpStatus.NOT_FOUND, "order not found")
    } else {
        sendResponse(res, HttpStatus.OK, "", order)
    }
}

export async function getOrders(req: Request, res: Response) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        sendResponse(res, HttpStatus.BAD_REQUEST, getValidationMessage(result))
        return
    }

    const request: GetOrderRequest = {
        sort: req.query.sort as LatestOrEarliest ?? LATEST,
        limit: req.query.limit ? Number(req.query.limit) : LIMIT
    }

    try {
        sendResponse(res, HttpStatus.OK, "", await getOrdersService(request))
        return
    } catch (error) {
        console.log("failed to get orders due to database issue, Error: ", error)
        sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "failed to get orders.")
    }
}
