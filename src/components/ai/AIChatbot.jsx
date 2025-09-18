import React, { useState, useContext } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import myContext from '../../context/data/myContext';

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your smart shopping assistant. Ask me about products, prices, delivery, or get personalized recommendations!' }
  ]);
  const [apiStatus, setApiStatus] = useState('unknown'); // 'working', 'failed', 'unknown'
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const context = useContext(myContext);
  const { mode, product } = context;

  const getAIResponse = async (userMessage) => {
    const categories = [...new Set(product.map(p => p.category))];
    const message = userMessage.toLowerCase();
    
    // Interest-based recommendations
    if (message.includes('recommend') || message.includes('suggest') || message.includes('interest')) {
      const userInterests = JSON.parse(localStorage.getItem('userInterests') || '[]');
      if (userInterests.length > 0) {
        const interestMap = {
          'tech': 'electronics', 'fashion': 'fashion', 'fitness': 'fitness', 
          'books': 'books', 'home': 'home'
        };
        const preferredCategories = userInterests.map(i => interestMap[i]).filter(Boolean);
        if (preferredCategories.length > 0) {
          setApiStatus('working');
          return `Based on your interests, I recommend our ${preferredCategories.join(', ')} products! Check the "AI Interest-Based Suggestions" section for personalized picks just for you.`;
        }
      }
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setApiStatus('working');
      return `I recommend taking our interest quiz first! Then I can suggest products from ${randomCategory} and other categories that match your preferences.`;
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('cheap')) {
      setApiStatus('working');
      return `Our products range from ₹12 to ₹1199! We have budget-friendly options in ${categories.join(', ')} categories. Plus free delivery over ₹300!`;
    }
    
    if (message.includes('delivery') || message.includes('shipping')) {
      setApiStatus('working');
      return 'We offer free delivery on orders over ₹300! Standard delivery takes 3-5 business days. Express delivery available for urgent orders.';
    }
    
    if (message.includes('return') || message.includes('refund')) {
      setApiStatus('working');
      return 'We have a hassle-free 30-day return policy! You can return any item in original condition for a full refund or exchange.';
    }
    
    if (message.includes('help') || message.includes('support')) {
      setApiStatus('working');
      return `I can help you with product recommendations, pricing info, delivery details, and returns. We have ${categories.length} categories to explore!`;
    }
    
    if (message.includes('category') || message.includes('categories')) {
      setApiStatus('working');
      return `We have ${categories.length} amazing categories: ${categories.join(', ')}. Which one interests you the most?`;
    }
    
    if (message.includes('quiz') || message.includes('interest')) {
      setApiStatus('working');
      return 'Take our interest quiz to get personalized product recommendations! Scroll down to find the "AI Interest-Based Suggestions" section and click "Take Interest Quiz".';
    }
    
    // Default response
    setApiStatus('working');
    return `I'm here to help with your shopping! Ask me about our ${categories.join(', ')} products, prices, delivery, or take the interest quiz for personalized suggestions!`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user', text: input };
    const currentInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      const aiResponse = await getAIResponse(currentInput);
      const botResponse = { type: 'bot', text: aiResponse };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const botResponse = { type: 'bot', text: 'Sorry, I\'m having trouble right now. Please try again!' };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">AI Shopping Assistant</h3>
                <p className="text-sm opacity-90">Smart Shopping Assistant</p>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${
                  apiStatus === 'working' ? 'bg-green-400' : 
                  apiStatus === 'failed' ? 'bg-red-400' : 'bg-yellow-400'
                }`}></div>
                <span className="text-xs ml-1">
                  {apiStatus === 'working' ? 'Online' : 
                   apiStatus === 'failed' ? 'Offline' : 'Ready'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`} style={{ backgroundColor: message.type === 'bot' && mode === 'dark' ? 'rgb(75 85 99)' : '', color: message.type === 'bot' && mode === 'dark' ? 'white' : '' }}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
              />
              <button
                onClick={handleSend}
                disabled={isTyping}
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50"
              >
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatbot;