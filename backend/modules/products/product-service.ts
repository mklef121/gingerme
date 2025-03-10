import { Prisma, products } from "@prisma/client";
import { prisma } from "./../../database/database-connect"
import { PaginationRequest, ProductDetails, ProductDetailsRespone, ProductsResult, TopSoldProducts } from "./dtos"

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
        total_pages: totalPages,
        total_count: totalCount,
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

export async function getTop10SoldProducts(brandId: number | null, supplierId: number | null) {
    const searchConditions: Prisma.Sql[] = []
    if (supplierId) {
        searchConditions.push(Prisma.sql`products.supplier_id = ${supplierId}`)
    }

    if (brandId) {
        searchConditions.push(Prisma.sql`products.brand_id = ${brandId}`)
    }

    const whereClause = searchConditions.length ?
        Prisma.sql`where ${Prisma.join(searchConditions, ' and ')}` :
        Prisma.empty
    return await prisma.$queryRaw<
        Array<TopSoldProducts>
    >(Prisma.sql`
            SELECT 
                products.id,
                products.name,
                brands.name as brand_name,
                suppliers.name as suppliers_name,
                SUM(orders.quantity) AS quantity_sold
            FROM public.products
                    INNER JOIN public.orders ON products.id = orders.product_id
                    INNER JOIN public.brands as brands ON products.brand_id = brands.id
                    INNER JOIN public.suppliers as suppliers ON products.supplier_id = suppliers.id
            ${whereClause}
            GROUP BY products.id, brands.id, suppliers.id
            ORDER BY quantity_sold DESC
            LIMIT 10;
    `)
}


export async function getTop10SoldProductsBackup(brandId: number | null, supplierId: number | null) {
    const productQuantities = await prisma.orders.groupBy({
        by: ['product_id'],
        _sum: {
            quantity: true,
        },
        orderBy: {
            _sum: {
                quantity: 'desc',
            },
        },
        take: 10,
    });

    const productIds = productQuantities.map((item) => item.product_id) as number[];

    const products = await prisma.products.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
        select: {
            id: true,
            name: true,
            brands: {
                select: {
                    name: true,
                },
            },
            suppliers: {
                select: {
                    name: true,
                },
            },
            orders: {
                select: {
                    quantity: true,
                },
            },
        },
    });

    // use the productQuantities to retain the sort order
    return productQuantities.map((order) => {
        const product = products.find(
            (prod) => prod.id === order.product_id
        )
        return {
            id: product?.id,
            name: product?.name,
            brand_name: product?.brands?.name,
            suppliers_name: product?.suppliers?.name,
            quantity_sold: order._sum.quantity || 0,
        };
    });
}


export async function getAllBrands() {
    return await prisma.brands.findMany({
        select: {
            id: true,
            name: true,
        },
    });
}

export async function getAllSuppliers() {
    return await prisma.suppliers.findMany({
        select: {
            id: true,
            name: true,
        },
    });
}