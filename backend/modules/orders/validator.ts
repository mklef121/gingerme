import { query } from "express-validator";
import { EARLIEST, LATEST, LIMIT } from "./dtos"

export function getOrdersValidator() {
    return [
        query("sort").isIn([LATEST, EARLIEST]).default(LATEST).optional(),
        query("limit").isInt().default(LIMIT).optional(),
    ]
}