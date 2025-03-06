import { orders, Prisma, products, users } from "@prisma/client"
import { prisma } from "../../database/database-connect"
import { PRODUCT_NOT_FOUND, STOCK_EXHAUSTED } from "../products/errors"

export async function GetOrder(id: number) {
    const product = await prisma.orders.findFirst({
        where: {
            id: id
        }
    })

    return product
}

export async function createOrder(user: users, productId: number, quantity: number) {

   return await prisma.$transaction(async (tx) => {

        const lockedProducts = await tx.$queryRaw<products[]>(Prisma.sql`
        SELECT id, name, stock, price
        FROM products
        WHERE id = ${productId}
        LIMIT 1 FOR UPDATE
      `);

        if (lockedProducts.length < 0) {
            throw Error(PRODUCT_NOT_FOUND)
        }

        const product = lockedProducts[0];

        if (product.stock as number > 0) {

            // get the most recent order
            const lockedOrders = await tx.$queryRaw<orders[]>(Prisma.sql`
            SELECT id
            FROM orders
            ORDER BY id DESC
            LIMIT 1
            FOR UPDATE
          `);

            // the ID column is not auto increment, so I manually create an increment
            const nextOrderId = lockedOrders.length > 0 ? lockedOrders[0].id + 1 : 1
            const orderRequest = {
                user_id: user.id,
                product_id: product.id,
                quantity: quantity,
                total_price: quantity * (product.price as unknown as number),
                id: nextOrderId
            }
            await tx.orders.create({
                data: orderRequest
            })

            await tx.products.update({
                where: { id: productId },
                data: { stock: product.stock as number - 1 },
            });

            return orderRequest
        } else {
            throw Error(STOCK_EXHAUSTED)
        }

    })
}
