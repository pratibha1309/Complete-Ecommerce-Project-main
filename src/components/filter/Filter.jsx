import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Filter() {
    const context = useContext(myContext)
    const { mode, searchkey, setSearchkey, filterType, setFilterType,
        filterPrice, setFilterPrice, product } = context

    return (
        <div className="bg-gray-50 py-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '' }}>
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg p-6" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <div className="mb-6">
                        <div className="relative max-w-md mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="searchkey"
                                value={searchkey}
                                onChange={(e) => setSearchkey(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                            Filter Products
                        </h3>
                        <button 
                            onClick={() => {setFilterType(''); setFilterPrice(''); setSearchkey('')}}
                            className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300"
                            style={{ backgroundColor: mode === 'dark' ? 'rgb(75 85 99)' : '', color: mode === 'dark' ? 'white' : '' }}
                        >
                            Clear Filters
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>Category</label>
                            <select 
                                value={filterType} 
                                onChange={(e) => setFilterType(e.target.value)} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                            >
                                <option value="">All Categories</option>
                                {[...new Set(product.map(item => item.category))].map((category, index) => (
                                    <option key={index} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>Price Range</label>
                            <select 
                                value={filterPrice} 
                                onChange={(e) => setFilterPrice(e.target.value)} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                            >
                                <option value="">All Prices</option>
                                <option value="0-50">Under ₹50</option>
                                <option value="50-100">₹50 - ₹100</option>
                                <option value="100-500">₹100 - ₹500</option>
                                <option value="500+">₹500+</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>Sort By</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', borderColor: mode === 'dark' ? 'rgb(75 85 99)' : '' }}
                            >
                                <option value="">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter