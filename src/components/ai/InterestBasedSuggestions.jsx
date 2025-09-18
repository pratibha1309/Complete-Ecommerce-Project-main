import React, { useState, useContext } from 'react';
import { FiBrain, FiHeart } from 'react-icons/fi';
import myContext from '../../context/data/myContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function InterestBasedSuggestions() {
  const [userInterests, setUserInterests] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const context = useContext(myContext);
  const { mode, product } = context;
  const dispatch = useDispatch();

  const interestOptions = [
    { id: 'tech', label: 'Technology & Gadgets', category: 'electronics' },
    { id: 'fashion', label: 'Fashion & Style', category: 'fashion' },
    { id: 'fitness', label: 'Health & Fitness', category: 'fitness' },
    { id: 'books', label: 'Books & Learning', category: 'books' },
    { id: 'home', label: 'Home & Lifestyle', category: 'home' },
    { id: 'budget', label: 'Budget Shopping', priceRange: 'low' },
    { id: 'premium', label: 'Premium Products', priceRange: 'high' }
  ];

  const generateSuggestions = () => {
    let filtered = [...product];
    
    // Filter by selected categories
    const selectedCategories = userInterests
      .map(id => interestOptions.find(opt => opt.id === id)?.category)
      .filter(Boolean);
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Filter by price preference
    if (userInterests.includes('budget')) {
      filtered = filtered.filter(p => parseInt(p.price) <= 100);
    }
    if (userInterests.includes('premium')) {
      filtered = filtered.filter(p => parseInt(p.price) >= 200);
    }
    
    // Sort by relevance and take top 6
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 6);
    setSuggestions(shuffled);
    setShowQuiz(false);
    
    // Save interests to localStorage
    localStorage.setItem('userInterests', JSON.stringify(userInterests));
  };

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  const toggleInterest = (interestId) => {
    setUserInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  // Load saved interests on component mount
  React.useEffect(() => {
    const saved = localStorage.getItem('userInterests');
    if (saved) {
      const interests = JSON.parse(saved);
      setUserInterests(interests);
      // Auto-generate suggestions if interests exist
      if (interests.length > 0) {
        setTimeout(() => {
          const selectedCategories = interests
            .map(id => interestOptions.find(opt => opt.id === id)?.category)
            .filter(Boolean);
          
          let filtered = [...product];
          if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
          }
          
          if (interests.includes('budget')) {
            filtered = filtered.filter(p => parseInt(p.price) <= 100);
          }
          if (interests.includes('premium')) {
            filtered = filtered.filter(p => parseInt(p.price) >= 200);
          }
          
          setSuggestions(filtered.sort(() => 0.5 - Math.random()).slice(0, 6));
        }, 500);
      }
    }
  }, [product]);

  return (
    <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FiBrain className="text-purple-600 mr-2" size={28} />
            <h2 className="text-3xl font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
              AI Interest-Based Suggestions
            </h2>
          </div>
          <p className="text-gray-600 mb-6" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
            Tell us your interests and get personalized product recommendations
          </p>
          
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            {showQuiz ? 'Hide Quiz' : 'Take Interest Quiz'}
          </button>
        </div>

        {/* Interest Quiz */}
        {showQuiz && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-2xl mx-auto" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
            <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: mode === 'dark' ? 'white' : '' }}>
              What interests you most?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {interestOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleInterest(option.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                    userInterests.includes(option.id)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 hover:border-purple-300'
                  }`}
                  style={{ 
                    backgroundColor: userInterests.includes(option.id) && mode === 'dark' ? 'rgb(147 51 234)' : '',
                    color: userInterests.includes(option.id) && mode === 'dark' ? 'white' : '',
                    borderColor: mode === 'dark' ? 'rgb(75 85 99)' : ''
                  }}
                >
                  <FiHeart className="inline mr-2" />
                  {option.label}
                </button>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={generateSuggestions}
                disabled={userInterests.length === 0}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
              >
                Get My Suggestions ({userInterests.length} selected)
              </button>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-center mb-6" style={{ color: mode === 'dark' ? 'white' : '' }}>
              Perfect Matches for You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((item, index) => (
                <div key={index} className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Perfect Match
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
                    <h4 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-purple-600">₹{item.price}</span>
                      <span className="text-sm text-gray-500 capitalize" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                        {item.category}
                      </span>
                    </div>
                    <button 
                      onClick={() => addCart(item)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default InterestBasedSuggestions;