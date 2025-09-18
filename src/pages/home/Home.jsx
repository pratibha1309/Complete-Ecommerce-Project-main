import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import AIChatbot from '../../components/ai/AIChatbot'
// import AIRecommendations from '../../components/ai/AIRecommendations'
// import InterestBasedSuggestions from '../../components/ai/InterestBasedSuggestions'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg'>View All Products</button>
        </Link>
      </div>
      {/* <AIRecommendations />
      <InterestBasedSuggestions /> */}
      <Track />
      <Testimonial />
      <AIChatbot />
    </Layout>
  )
}

export default Home