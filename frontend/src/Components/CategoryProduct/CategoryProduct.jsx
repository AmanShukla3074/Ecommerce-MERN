import React from 'react'
import FilterProduct from '../FilterProduct/FilterProduct'

const CategoryProduct = ({heading,category}) => {
  return (
    <div>
      <FilterProduct category={category} heading={heading}/>
    </div>
  )
}

export default CategoryProduct
