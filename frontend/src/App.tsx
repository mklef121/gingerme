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
