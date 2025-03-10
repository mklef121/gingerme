import { useEffect, useState } from "react";
import { Order } from "../cores/types";


  
export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
  
    useEffect(() => {
      const dummyOrders = [
        { id: 1, userId: 101, productName: 'Laptop', quantity: 1, totalPrice: 1200 },
        { id: 2, userId: 102, productName: 'Mouse', quantity: 2, totalPrice: 50 },
      ];
      setOrders(dummyOrders);
    }, []);
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">${order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  