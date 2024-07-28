import React from 'react'
import CategoryProduct from '../Components/CategoryProduct/CategoryProduct'

const CategoryProductPage = ({category}) => {
  return (
    <div>
      <CategoryProduct category={category}/>
    </div>
  )
}

export default CategoryProductPage
