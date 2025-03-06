import { Request, Response } from "express"
import { sendResponse, HttpStatus } from "../../http/response"
import { userLogin, getUser as getUserService } from "./user-service"
import { validationResult } from "express-validator"
import { USER_NOT_FOUND } from "./errors"
import { TokenResponse } from "./dtos"
import { getValidationMessage } from "../../utils/validator"

export async function loginUser(req: Request, res: Response) {
    const validateResult = validationResult(req)

    if (!validateResult.isEmpty()) {
        sendResponse(res, HttpStatus.BAD_REQUEST, getValidationMessage(validateResult))
        return
    }

    try {
        const token = await userLogin({
            email: req.body.email
        })

        let response: TokenResponse = {
            token
        }

        sendResponse(res, HttpStatus.OK, "", response)
    } catch (error: any) {
        if (error.message == USER_NOT_FOUND) {
            sendResponse(res, HttpStatus.NOT_FOUND, USER_NOT_FOUND)
            return
        }

        sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, "cannot login at this time try again",)
    }
}

export async function getUser(req: Request, res: Response) {
    const validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
        sendResponse(res, HttpStatus.BAD_REQUEST, getValidationMessage(validateResult))
        return
    }
    const userId = Number(req.params.userId)
    const user = await getUserService(userId)

    if (user == null) {
        sendResponse(res, HttpStatus.NOT_FOUND, "user not found")
    } else {
        sendResponse(res, HttpStatus.OK, "", user)
    }
}