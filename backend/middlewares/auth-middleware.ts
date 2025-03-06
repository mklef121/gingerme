import { Request, Response, NextFunction } from "express"
import { HttpStatus, sendResponse } from "../http/response"
import { verifyToken } from "../modules/users/user-service"

export async function validateRequestUser(req:Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]

    if (!token || token.split(" ").length != 2) {
        sendResponse(res, HttpStatus.UNAUTHORIZED, "token is required")
        return 
    }

    try {
        req.user = await verifyToken(token.split(" ")[1])
        next()
    } catch (error: any) {
        sendResponse(res, HttpStatus.UNAUTHORIZED,error.message)
    }
}