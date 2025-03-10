import { useEffect, useState } from "react";
import { ApiResponse, Order } from "../cores/types";
import { API_BASE_URL } from "../config/api";
import axios from "axios";

export const useLatestOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState<any>();

    useEffect(() => {
        setLoading(true)
        axios.get<ApiResponse<Order[]>>(`${API_BASE_URL}/orders?sort=earliest`)
            .then((response) => setOrders(response.data.data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => setLoading(false));
    }, []);

    return { orders, loading, error };
};