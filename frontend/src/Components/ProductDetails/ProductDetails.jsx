import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { addItemToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { productId } = useParams();
  const [data, setData] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/product/id/${productId}`
        );
        setData(response.data);
        setMainImg(response.data.imgUrls[0]);
        setSelectedSize(response.data.sizes[0].name);
        console.log("Fetched product data:", response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  useEffect(() => {
    const checkIfInCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/cart_items/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Cart API response:", response.data);

        if (response.data && response.data.size === selectedSize) {
          setInCart(true);
        } else {
          setInCart(false);
        }
      } catch (error) {
        console.error("Error checking cart status:", error);
      }
    };

    if (data && token) {
      checkIfInCart();
    }
  }, [selectedSize, data, productId, token]);

  const changeMainImg = (img) => {
    setMainImg(img);
  };

  const changeSelectedSize = (size) => {
    setSelectedSize(size);
    console.log("Selected size changed to:", size);
  };


const handleAddToCart = () => {
  if (selectedSize) {
      dispatch(addItemToCart({ productId, size: selectedSize }))
          .then(() => setInCart(true))
          .catch((error) => console.error("Error adding item to cart:", error));
  } else {
      alert('Please select a size');
  }
};


  return (
    <div className="product-details-main">
      <div className="product-details-img-container">
        <div className="product-img-gallery">
          {data?.imgUrls &&
            data.imgUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Product Image"
                className="product-img-gallery-images"
                onClick={() => changeMainImg(img)}
              />
            ))}
        </div>

        <div className="product-main-img">
          <img src={mainImg} alt="" className="product-img-gallery-mainImg" />
        </div>
      </div>
      <div className="product-details-container">
        <p className="product-brand">{data?.brand}</p>
        <p className="product-details-title">{data?.title}</p>
        <div className="product-price-details">
          <span className="product-details-discountedPrice">
            {"\u20B9"}
            {data?.discountedPrice}
          </span>
          <span className="product-details-price">
            {"\u20B9"}
            {data?.price}
          </span>
          <span className="product-details-discountPercent">{`(${data?.discountPercent}% off)`}</span>
        </div>
        <div className="color-container">
          <span className="product-color-text">Color:</span>
          <div className="color-info" style={{ backgroundColor: data?.color }}></div>
        </div>
        <div className="product-details-sizes-container">
          Size: {selectedSize}
          <div className="product-details-sizes">
            {data?.sizes &&
              data.sizes.map((size) => (
                <div
                  className={`product-detail-size ${selectedSize === size.name ? 'selected' : ''}`}
                  key={size._id}
                  onClick={() => changeSelectedSize(size.name)}
                >
                  {size.name}
                </div>
              ))}
          </div>
        </div>
        {inCart ? (
          <div className="add-to-cart-btn" onClick={() => navigate('/cart')}>
            GO TO CART
          </div>
        ) : (
          <div className="add-to-cart-btn" onClick={handleAddToCart}>
            ADD TO CART
          </div>
        )}
        <div className="product-description">Description : {data?.description}</div>
      </div>
    </div>
  );
};

export default ProductDetails;