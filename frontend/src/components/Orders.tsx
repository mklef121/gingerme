import { useLatestOrders } from "../composables/order-composables";

export const Orders = () => {
  const { orders, loading, error } = useLatestOrders()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.error || error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.users.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.users.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.products.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.products.brands.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">${order.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
