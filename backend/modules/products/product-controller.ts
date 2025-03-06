import { Request, Response } from "express"
import { sendResponse, HttpStatus } from "../../http/response"
import { getValidationMessage } from "../../utils/validator"
import { getProduct as getProductService, getProducts as getProductsService } from "./product-service"
import { validationResult } from "express-validator"
import { PaginationRequest } from "./dtos"
import { createOrder } from "../orders/order-service"
import { products, users } from "@prisma/client"

const LIMIT: number = 20

export async function getProduct(req: Request, res: Response) {

    const validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
        sendResponse(res, HttpStatus.BAD_REQUEST, getValidationMessage(validateResult))
        return
    }

    const product = await getProductService(Number(req.params.productId))

    if (product == null) {
        sendResponse(res, HttpStatus.NOT_FOUND, "product not found")
    } else {
        sendResponse(res, HttpStatus.OK, "found", product)
    }
}

export async function getProducts(req: Request, res: Response) {
    const validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
        sendResponse(res, HttpStatus.BAD_REQUEST, getValidationMessage(validateResult))
        return
    }

    const page = Number(req.query.page)
    const limit = req.query.limit ? Number(req.query.limit) : LIMIT
    // Calculate offset
    const skip = (page - 1) * limit

    const pagination: PaginationRequest = {
        page,
        limit,
        skip
    }

    try {
        sendResponse(res, HttpStatus.OK, "", await getProductsService(pagination))
        return

    } catch (error) {
        sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "cannot get products at this time")
        return
    }
}

export async function createProductOrder(req: Request, res: Response) {
    const validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
        sendResponse(res, HttpStatus.BAD_REQUEST, getValidationMessage(validateResult))
        return
    }

    const product = await getProductService(Number(req.params.productId))

    if (product == null) {
        sendResponse(res, HttpStatus.NOT_FOUND, "product not found")
    }

    try {
        const result = await createOrder(req.user as users, Number(req.params.productId), req.body.quantity)
        sendResponse(res, HttpStatus.OK, "", result)
    } catch (error: any) {
        console.log("The error", error)
        sendResponse(res, HttpStatus.BAD_REQUEST, error.message)
        return
    }
}