import { useTopSoldProducts } from "../composables/products-composables";

export const MostSoldItems = () => {
  const { items, loading, error } = useTopSoldProducts()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.error || error.message}</p>;


  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Most Sold Items</h2>
      <div className="mb-4 flex space-x-4">
        <select  className="border p-2">
          <option value="">All Suppliers</option>
          {/* Populate with supplier options from your database */}
          <option value="1">Supplier 1</option>
          <option value="2">Supplier 2</option>
          {/* ... */}
        </select>

        <select  className="border p-2">
          <option value="">All Brands</option>
          {/* Populate with brand options from your database */}
          <option value="1">Brand 1</option>
          <option value="2">Brand 2</option>
          {/* ... */}
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity_sold}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.brand_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.suppliers_name}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
