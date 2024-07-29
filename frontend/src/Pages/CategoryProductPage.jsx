import React from 'react'
import CategoryProduct from '../Components/CategoryProduct/CategoryProduct'

const CategoryProductPage = ({category,heading}) => {
  return (
    <div>
      <CategoryProduct category={category} heading={heading}/>
    </div>
  )
}

export default CategoryProductPage
