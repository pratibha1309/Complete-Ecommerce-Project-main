import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'

function ProductCard() {
    const context = useContext(myContext)
    const { mode, product ,searchkey, setSearchkey,filterType,setFilterType,
        filterPrice,setFilterPrice} = context

    const dispatch = useDispatch()
    const cartItems = useSelector((state)=> state.cart);
    console.log(cartItems)

    const addCart = (product)=> {
        dispatch(addToCart(product));
        toast.success('add to cart');

    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ color: mode === 'dark' ? 'white' : '' }}>Featured Products</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>Discover our handpicked selection of premium products</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {product.filter((obj)=> obj.title.toLowerCase().includes(searchkey))
                     .filter((obj) => obj.category.toLowerCase().includes(filterType))
                     .filter((obj) => obj.price.includes(filterPrice)).slice(0,8).map((item, index) => {
                        const { title, price, description, imageUrl,id } = item;
                        return (
                            <div key={index} className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                <div className="relative overflow-hidden">
                                    <img 
                                        onClick={()=> {
                                            const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];
                                            const productExists = viewedProducts.find(p => p.id === id);
                                            if (!productExists) {
                                                viewedProducts.push(item);
                                                localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts.slice(-10)));
                                            }
                                            window.location.href = `/productinfo/${id}`;
                                        }}
                                        className="w-full h-64 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300" 
                                        src={imageUrl} 
                                        alt={title} 
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">New</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="mb-2">
                                        <span className="text-xs text-gray-500 uppercase tracking-wide" style={{ color: mode === 'dark' ? '#9CA3AF' : '' }}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                        {title}
                                    </h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-purple-600">₹{price}</span>
                                        <div className="flex text-yellow-400">
                                            {'★'.repeat(5)}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={()=> addCart(item)}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        )
                    })}




                </div>

            </div>
        </section >

    )
}

export default ProductCard