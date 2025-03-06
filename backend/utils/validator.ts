import { param, Result, ValidationError } from 'express-validator'

export const isNumber = (value: any) => {
    return !isNaN(Number(value)) && typeof value !== "boolean"
}

export  function integerParamValidator(name: string) {
    return param(name).isInt()
}

export function getValidationMessage(validateResult: Result<ValidationError>) {
    return validateResult.array().map((err: any) => err.path + ": " + err.msg).join(", ")
}