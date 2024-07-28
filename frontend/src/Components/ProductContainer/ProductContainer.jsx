import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import './ProductContainer.css'
const ProductContainer = (props) => {
  const [data, setData] = useState({ content: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (props.category) {
          response = await axios.get(`http://localhost:5001/api/product?category=${props.category}`);
        } else {
          response = await axios.get(`http://localhost:5001/api/product`);
        }
        setData(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, [props.category]);

  return (
    <>
      <p className="productContainerheading">{props.heading}</p>
      <div className="product-container">
        {/* <div className="product-item"> */}
        {data.content && data.content.length > 0 ? (
          data.content.slice(0,props.max_item).map((item) => (
            <Item product={item}
              key={item._id}
              // id={item._id}
              // name={item.title}
              // description={item.description}
              // price={item.price}
              // discountedPrice={item.discountedPrice}
              // discountPercent={item.discountPercent}
              // quantity={item.quantity}
              // brand={item.brand}
              // color={item.color}
              // sizes={item.sizes}
              // imgUrls={item.imgUrls}
              // category={item.category}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
        {/* </div> */}
      </div>  
    </>
  );
};

export default ProductContainer;

