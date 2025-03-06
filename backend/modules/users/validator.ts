
import { body } from 'express-validator'

export function userLoginValidator() {
    return body('email')
        .trim()
        .isEmail()
}