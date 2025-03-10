import axios from "axios";
import { useEffect, useState } from "react";
import { ApiResponse, Brand, Items, ProductResponse, Supplier } from "../cores/types";
import { API_BASE_URL } from "../config/api";

export const useProducts = (page: string, limit: string) => {
    const [pagedProducts, setProducts] = useState<ProductResponse>();
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState<any>();

    useEffect(() => {
        setLoading(true)
        axios.get<ApiResponse<ProductResponse>>(`${API_BASE_URL}/products?page=${page}&limit=${limit}`)
            .then((response) => setProducts(response.data.data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false));
    }, [page, limit]);

    return { pagedProducts, loading, error };
};


export const useTopSoldProducts = (brandId: number|undefined, supplierId: number|undefined) => {
    const [items, setItems] = useState<Items[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState<any>();

    useEffect(() => {
        setLoading(true)
        const url = new URL(`${API_BASE_URL}/products/top-selling`)
        if (brandId) url.searchParams.set("brand_id",brandId.toString())
        if (supplierId) url.searchParams.set("supplier_id",supplierId.toString())

        axios.get<ApiResponse<Items[]>>(url.href)
            .then((response) => setItems(response.data.data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false));
    }, [brandId, supplierId]);

    return { items, loading, error };
}


export const useBrands = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState<any>();

    useEffect(() => {
        setLoading(true)
        axios.get<ApiResponse<Brand[]>>(`${API_BASE_URL}/products/brands`)
            .then((response) => setBrands(response.data.data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false));
    }, []);

    return [brands, loading, error] as [Brand[], boolean, unknown];
}

export const useSellers = () => {
    const [suppliers, setSupplier] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState<any>();

    useEffect(() => {
        setLoading(true)
        axios.get<ApiResponse<Supplier[]>>(`${API_BASE_URL}/products/suppliers`)
            .then((response) => setSupplier(response.data.data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false));
    }, []);

    return [suppliers, loading, error] as [Supplier[], boolean, unknown];
}