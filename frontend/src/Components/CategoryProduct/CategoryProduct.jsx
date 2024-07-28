import React from 'react'
import FilterProduct from '../FilterProduct/FilterProduct'

const CategoryProduct = (props) => {
  return (
    <div>
      <FilterProduct category={props.category}/>
    </div>
  )
}

export default CategoryProduct
