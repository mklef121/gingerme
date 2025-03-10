
export interface ApiResponse<T> {
  data: T;
  error: string;
  status: "success" | "failed"
}


export interface ProductResponse {
  page: number;
  total_pages: number;
  total_count: number;
  products: Product[]
}

export interface Order {
    id: number;
    user_id: number;
    product_name: string;
    quantity: number;
    total_price: number;
}


export interface Product extends IdName {
  price: number;
  stock: number;
  average_rating: number;
  brand_id: number;
  category_id: number;
  categories: Category
  brands: Brand
  suppliers: Supplier
}

export type ProductKeys = keyof Product;
type Category = IdName
type Brand = IdName
type Supplier = IdName


interface IdName {
  id: number;
  name: string;
}

export interface Items {
  id: number;
  name: string;
  quantity_sold: number;
  brand_name: string;
  suppliers_name: string;
}
