import React from 'react'

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Shop the Latest Trends</h1>
        <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          Shop Now
        </button>
      </div>
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-white opacity-10 rounded-full"></div>
    </div>
  )
}

export default HeroSection