import React, { useState } from 'react';
import { addSampleProducts } from '../utils/addSampleProducts';

function AddSampleProducts() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddProducts = async () => {
    setLoading(true);
    setMessage('Adding products...');
    
    const result = await addSampleProducts();
    
    if (result.success) {
      setMessage(`Successfully added ${result.count} products!`);
    } else {
      setMessage(`Error: ${result.error}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Sample Products</h2>
      <button
        onClick={handleAddProducts}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add 44 Sample Products'}
      </button>
      {message && (
        <p className={`mt-4 ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddSampleProducts;