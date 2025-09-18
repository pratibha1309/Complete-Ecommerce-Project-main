import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context
  
  return (
    <Layout>
      {loading && <Loader />}
      <div className="min-h-screen bg-gray-50 py-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
              My Orders
            </h1>
            <p className="text-gray-600" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
              Track your order history and status
            </p>
          </div>

          {order.length > 0 ? (
            <div className="space-y-6">
              {order.filter(obj => obj.userid == userid).map((orderItem, orderIndex) => (
                <div key={orderIndex} className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Order #{orderItem.paymentId || 'N/A'}</h3>
                        <p className="text-blue-100">Date: {orderItem.date}</p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="grid gap-4">
                      {orderItem.cartItems.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-gray-200 rounded-lg" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}>
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                          />
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {item.title}
                            </h4>
                            <p className="text-gray-600 text-sm mb-2" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-purple-600 font-bold text-lg">
                                ₹{item.price}
                              </span>
                              <span className="text-gray-500 text-sm" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                                Category: {item.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Order Summary */}
                    <div className="mt-6 pt-4 border-t border-gray-200" style={{ borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                          Total Items: {orderItem.cartItems.length}
                        </span>
                        <span className="text-xl font-bold text-purple-600">
                          Total: ₹{orderItem.cartItems.reduce((total, item) => total + parseInt(item.price), 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '' }}>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}>
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  No Orders Yet
                </h3>
                <p className="text-gray-600 mb-4" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <button 
                  onClick={() => window.location.href = '/allproducts'}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Order