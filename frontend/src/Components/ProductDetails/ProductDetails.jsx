import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
const ProductDetails = () => {
  const { productId } = useParams();
  const [data, setData] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  // console.log(mainImg)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `http://localhost:5001/api/product/id/${productId}`
        );
        setData(response.data);
        setMainImg(response.data.imgUrls[0]);
        setSelectedSize(response.data.sizes[0].name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);
  console.log(data);

  const changeMainImg = (img) => {
    setMainImg(img);
  };

  const changeSelecetedSize = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="product-details-main">
      <div className="product-details-img-container">
        <div className="product-img-gallery">
          {data.imgUrls &&
            data.imgUrls.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img}
                  alt="Product Image"
                  className="product-img-gallery-images"
                  onClick={() => changeMainImg(img)}
                />
              );
            })}
        </div>

        <div className="product-main-img">
          <img src={mainImg} alt="" className="product-img-gallery-mainImg" />
        </div>
      </div>
      <div className="product-details-container">
        <p className="product-brand">{data.brand}</p>
        <p className="product-details-title">{data.title}</p>
        <div className="product-price-details">
          <span className="product-details-discountedPrice">
            {"\u20B9"}
            {data.discountedPrice}
          </span>
          <span className="product-details-price">
            {"\u20B9"}
            {/* {"M.R.P. \u20B9"} */}
            {data.price}
          </span>
          <span className="product-details-discountPercent">{`(${data.discountPercent}% off)`}</span>
        </div>
        <div className="color-container">
          <span className="product-color-text">Color:</span>
          <div className="color-info"  style={{ backgroundColor: data.color }}></div>
        </div>
        <div className="product-details-sizes-container">
          Size: {selectedSize}
          <div className="product-details-sizes">
          {data.sizes &&
            data.sizes.map((size) => {
              return (
                <div
                  className={`product-detail-size  ${selectedSize === size.name ? 'selected' : ''}`}
                  key={size._id}
                  onClick={() => {
                    changeSelecetedSize(size.name);
                  }}
                  
                >
                  {size.name}
                </div>
              );
            })}
            </div>
        </div>
        <div className="add-to-cart-btn">ADD TO CART</div>
        <div className="product-description">Description : {data.description}</div>
      </div>
    </div>
  );
};

export default ProductDetails;
