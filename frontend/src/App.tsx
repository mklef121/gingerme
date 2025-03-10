import './App.css'
import { useState } from 'react';
import { ProductListing } from './components/Products';
import { MostSoldItems } from './components/Items';
import { Orders } from './components/Orders';


const App = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="container mx-auto p-4">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 ${activeTab === 'products' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Product Listing
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'sold' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('sold')}
        >
          Most Sold Items
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>
      {activeTab === 'products' && <ProductListing />}
      {activeTab === 'sold' && <MostSoldItems />}
      {activeTab === 'orders' && <Orders />}
    </div>
  );
};

export default App;


export function Ap45p() {
  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <a href="#" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Product Listing</a>
        </li>
        <li className="me-2">
          <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Most Sold Items</a>
        </li>
        <li className="me-2">
          <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Orders</a>
        </li>
      </ul>
    </>
  )
}