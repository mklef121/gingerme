import axios from "axios";
import { useEffect, useState } from "react";
import { ApiResponse, Items, ProductResponse } from "../cores/types";
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


export const useTopSoldProducts = () => {
    const [items, setItems] = useState<Items[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState<any>();

    useEffect(() => {
        setLoading(true)
        axios.get<ApiResponse<Items[]>>(`${API_BASE_URL}/products/top-selling`)
            .then((response) => setItems(response.data.data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false));
    }, []);

    return { items, loading, error };
}


export const useSellers = () => {
    const [items, setItems] = useState<Items[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState<any>();

    useEffect(() => {
        setLoading(true)
        axios.get<ApiResponse<Items[]>>(`${API_BASE_URL}/products/top-selling`)
            .then((response) => setItems(response.data.data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false));
    }, []);

    return { items, loading, error };
}

export const useBrands = () => {
    const [items, setItems] = useState<Items[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState<any>();

    useEffect(() => {
        setLoading(true)
        axios.get<ApiResponse<Items[]>>(`${API_BASE_URL}/products/top-selling`)
            .then((response) => setItems(response.data.data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false));
    }, []);

    return { items, loading, error };
}