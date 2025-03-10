import { Prisma } from "@prisma/client"

interface CreateOrder {
    userId: string
    productId: string
    quantity: number
}

export const LATEST = "latest"
export const EARLIEST = "earliest"
export const LIMIT = 100

export type LatestOrEarliest = "latest" | "earliest"
export interface GetOrderRequest {
    sort: LatestOrEarliest
    limit: number
}


export interface OrdersResult {
    orderId: number,
    userId: number,
    quantity: number,
    totalPrice: Prisma.Decimal,
    productId: number,
    productName: string,
    brandName: string,
    categoryName: string,
    supplierName: string,
    userName: string,
    userEmail: string,
}



