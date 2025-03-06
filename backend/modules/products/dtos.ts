import { Prisma, products } from "@prisma/client"

export interface PaginationRequest {
    page: number
    limit: number
    skip: number
}


export interface ProductsResult {
    page: number
    totalPages: number
    totalCount: number
    products: ProductDetailsRespone[]
}


export interface ProductDetails {
    id: number;
    name: string;
    price: Prisma.Decimal;
    stock: number;
    category_id: number;
    brand_id: number | null;
    supplier_id: number;
    brand_name: string;
    categories_name: string;
    suppliers_name: string;
    average_rating: Prisma.Decimal | null;
}

export interface ProductDetailsRespone extends products {
    brands: {
        id: number | null
        name: string
    },
    categories: {
        id: number
        name: string
    },
    suppliers: {
        id: number
        name: string
    },
    average_rating: Prisma.Decimal | null;
}
