
import { query, body } from 'express-validator'
import { integerParamValidator } from '../../utils/validator'

export function getProductsPaginationValidator() {
    return [
        query('page')
        .isInt(),

        query('limit')
        .optional()
    ]
}

export function createProductOrderValidator() {
    return [integerParamValidator("productId"), body("quantity").isInt().toInt()]
}


export function getTopProductValidator() {
    return [
        query('brand_id').isInt().toInt().optional(),
        query('supplier_id').isInt().toInt().optional()
    ]
}