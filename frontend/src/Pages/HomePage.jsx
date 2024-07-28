import React from 'react'
import HomeCarousel from '../Components/HomeCarousel/HomeCarousel'
import ProductContainer from '../Components/ProductContainer/ProductContainer'

const Home = () => {
  return (
    <div>
      <HomeCarousel/>
      <ProductContainer heading="Hoodie" category="hoodie" 
      // max_item='2' //for limiting maximum products
      />
      <ProductContainer heading="Men T-shirt" category="men_tshirt" 
      // max_item='2' //for limiting maximum products
      />
    </div>
  )
}

export default Home
