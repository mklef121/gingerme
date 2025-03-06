import { Prisma, products } from "@prisma/client";
import { prisma } from "./../../database/database-connect"
import { PaginationRequest, ProductDetails, ProductDetailsRespone, ProductsResult } from "./dtos"

export async function getProduct(id: number) {
    const product = await prisma.products.findFirst({
        where: {
            id: id
        }
    })

    return product
}

export async function getProducts(pagination: PaginationRequest) {
    const totalCount = await prisma.products.count();
    const totalPages = Math.ceil(totalCount / pagination.limit);

    const productsWithAvgRating = await prisma.$queryRaw<
        Array<ProductDetails>
    >(Prisma.sql`
      SELECT products.id,
       products.name,
       products.price,
       products.stock,
       products.category_id,
       products.brand_id,
       products.supplier_id,
       brands.name                 as brand_name,
       categories.name             as categories_name,
       suppliers.name              as suppliers_name,
       AVG(product_reviews.rating) AS average_rating

        FROM public.products as products
                INNER JOIN public.brands as brands ON products.brand_id = brands.id
                INNER JOIN public.categories as categories ON products.category_id = categories.id
                INNER JOIN public.suppliers as suppliers ON products.supplier_id = suppliers.id
                LEFT JOIN public.product_reviews AS product_reviews ON products.id = product_reviews.product_id
        GROUP BY products.id,
                brands.id,
                categories.id,
                suppliers.id
        ORDER BY products.id ASC
        LIMIT ${pagination.limit} OFFSET ${pagination.skip};
    `);

    const result: ProductsResult = {
        page: pagination.page,
        totalPages,
        totalCount,
        products: transformJointProducs(productsWithAvgRating)
    }

    return result
}

function transformJointProducs(queryResult: ProductDetails[]): ProductDetailsRespone[] {
    return queryResult.map((result) => ({
        id: result.id,
        name: result.name,
        price: result.price,
        stock: result.stock,
        category_id: result.category_id,
        brand_id: result.brand_id,
        supplier_id: result.supplier_id,
        average_rating: result.average_rating,
        brands: {
            id: result.brand_id,
            name: result.brand_name
        },
        categories: {
            id: result.category_id,
            name: result.categories_name
        },
        suppliers: {
            id: result.supplier_id,
            name: result.suppliers_name
        }
    }))
}

