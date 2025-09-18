import React, { useContext } from 'react';
import { FiStar } from 'react-icons/fi';
import myContext from '../../context/data/myContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function AIRecommendations() {
  const context = useContext(myContext);
  const { mode, product } = context;
  const dispatch = useDispatch();

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  // AI logic for recommendations
  const getRecommendations = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];
    
    if (cartItems.length > 0) {
      const cartCategories = cartItems.map(item => item.category);
      return product.filter(p => cartCategories.includes(p.category) && !cartItems.find(c => c.id === p.id)).slice(0, 4);
    }
    
    if (viewedProducts.length > 0) {
      const viewedCategories = viewedProducts.map(item => item.category);
      return product.filter(p => viewedCategories.includes(p.category)).slice(0, 4);
    }
    
    // Default: trending products (highest priced items as "premium")
    return product.sort((a, b) => parseInt(b.price) - parseInt(a.price)).slice(0, 4);
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-purple-50 to-blue-50" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FiStar className="text-yellow-500 mr-2" size={24} />
            <h2 className="text-3xl font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
              AI Recommendations
            </h2>
          </div>
          <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
            Personalized picks just for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((item, index) => (
            <div key={index} className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  AI Pick
                </span>
              </div>
              
              <div className="relative overflow-hidden">
                <img 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                  src={item.imageUrl} 
                  alt={item.title}
                  onClick={() => window.location.href = `/productinfo/${item.id}`}
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-600">₹{item.price}</span>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <button 
                  onClick={() => addCart(item)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AIRecommendations;