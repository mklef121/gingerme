import { useMemo, useState } from "react";
import { useBrands, useSellers, useTopSoldProducts } from "../composables/products-composables";
import Select from 'react-select';

export const MostSoldItems = () => {
  const [brands, loadingBrands] = useBrands()
  const [suppliers, loadingSuppliers] = useSellers()
  const [brandId, setBrand] = useState<number | undefined>()
  const [supplierId, setSupplier] = useState<number | undefined>()

  const { items, loading, error } = useTopSoldProducts(brandId, supplierId)
  const selectedBrand = useMemo(() => {
    if (brandId) {
      const found = brands.find((brand) => brand.id == brandId)
      return {
        value: found?.id,
        label: found?.name
      }
    }
  }, [brandId, brands])

  const selectedSupplier = useMemo(() => {
    if (supplierId) {
      const found = suppliers.find((supplier) => supplier.id == supplierId)
      return {
        value: found?.id,
        label: found?.name
      }
    }
  }, [supplierId, suppliers])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.error || error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Most Sold Items</h2>
      <div className="mb-4 flex flex-row items-center space-x-4">
        <span> Brands </span>
        <Select
          isLoading={loadingBrands}
          isClearable={true}
          isSearchable={true}
          defaultValue={selectedBrand}
          options={brands.map((brand) => ({
            value: brand.id,
            label: brand.name
          }))}
          onChange={(data) => {
            setBrand(data?.value)
          }}
        />

        <span> Suppliers </span>
        <Select
          isLoading={loadingSuppliers}
          isClearable={true}
          isSearchable={true}
          defaultValue={selectedSupplier}
          options={suppliers.map((supplier) => ({
            value: supplier.id,
            label: supplier.name
          }))}
          onChange={(data) => {
            setSupplier(data?.value)
          }}
        />
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
