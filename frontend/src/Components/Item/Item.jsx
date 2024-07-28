import React from "react";
import "./Item.css";
import { Link, useNavigate } from "react-router-dom";
const Item = ({product}) => {
// const Item = ({
//   id,
//   name,
//   price,
//   discountedPrice,
//   discountPercent,
//   sizes,
//   imgUrls,
// }) => {
const {  
  _id,
  name,
  price,
  discountedPrice,
  discountPercent,
  sizes,
  imgUrls}=product;
  console.log(sizes)

  return (
    <Link to={`/product/${_id}`}  className="product-item-link ">
    <div className="product-item">
      <div className="product-img-container">
        <img src={imgUrls[0]} alt="" className="product-img" />
      </div>
      <div className="product-item-info">
        <div className="product-title">
          <p className="prod-title">{name}</p>
        </div>
        <div className="product-price-info">
          <span className="product-discountedPrice">
            {"\u20B9"}
            {discountedPrice}
          </span>
          <span className="product-price">
            {"\u20B9"}
            {/* {"M.R.P. \u20B9"} */}
            {price}
          </span>
          <span className="product-discountPercent">{`(${discountPercent}% off)`}</span>
        </div>
        <div className="sizes">
          {
            sizes.map((size)=>(
              <span className="size" key={size._id}>{size.name}</span>
            ))
          }
        </div>
        </div>
    </div>
    </Link>
  );
};

export default Item;
