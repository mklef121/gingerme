import { response, Response } from "express"

type Status = "success" | "failed" 

interface ApiResponse {
    data: any
    error: string
    status: Status
}

export enum HttpStatus {
    // 2xx Success
    OK = 200,
    CREATED = 201,
  
    // 4xx Client Errors
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
  
    // 5xx Server Errors
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
  }

  
export const sendResponse = (res: Response, statusCode: HttpStatus, message: string = "", data: any = null) => {
    let response: ApiResponse = {
        data,
        error: message,
        status: statusCode > 299 ? "failed" : "success"
    }

    return res.status(statusCode).json(response)
}


