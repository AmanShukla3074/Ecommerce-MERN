import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ProductDetails.css";
import { addItemToCart } from "../../features/cart/cartSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const [data, setData] = React.useState(null);
  const [mainImg, setMainImg] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");
  const [inCart, setInCart] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;

  React.useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/api/product/id/${productId}`
        );
        setData(response.data);
        setMainImg(response.data.imgUrls[0]);
        setSelectedSize(response.data.sizes[0].name);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  React.useEffect(() => {
    const checkIfInCart = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/api/cart_items/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
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

  const changeMainImg = (img) => setMainImg(img);

  const changeSelectedSize = (size) => setSelectedSize(size);

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch(addItemToCart({ productId, size: selectedSize }))
        .then(() => setInCart(true))
        .catch((error) => console.error("Error adding item to cart:", error));
    } else {
      alert("Please select a size");
    }
  };

  const getRatingDistribution = () => {
    if (!data?.ratings) return {};

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.ratings.forEach((rating) => {
      distribution[rating.ratings]++;
    });
    return distribution;
  };

  const getTotalRatings = () => {
    if (!data?.ratings) return 0;
    return data.ratings.length;
  };

  const ratingDistribution = getRatingDistribution();
  const totalRatings = getTotalRatings();

  return (
    <>
      <div className="product-details-main">
        <div className="product-details-img-container">
          <div className="product-img-gallery">
            {data?.imgUrls.map((img, index) => (
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
            <div
              className="color-info"
              style={{ backgroundColor: data?.color }}
            ></div>
          </div>
          <div className="product-details-sizes-container">
            Size: {selectedSize}
            <div className="product-details-sizes">
              {data?.sizes.map((size) => (
                <div
                  className={`product-detail-size ${
                    selectedSize === size.name ? "selected" : ""
                  }`}
                  key={size._id}
                  onClick={() => changeSelectedSize(size.name)}
                >
                  {size.name}
                </div>
              ))}
            </div>
          </div>
          {inCart ? (
            <div className="add-to-cart-btn" onClick={() => navigate("/cart")}>
              GO TO CART
            </div>
          ) : (
            <div className="add-to-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </div>
          )}
          <div className="product-description">
            Description: {data?.description}
          </div>
        </div>
      </div>

          <h1 className="rating-header">Product Reviews & Ratings</h1>
      <div className="rating-container">
    

        <div className="reviews">
          <h3>Reviews</h3>
          {data?.reviews.map((review) => (
            <div key={review._id} className="review">
              <p>
                <strong>User:</strong> {review.user.firstName + " "+ review.user.lastName}
              </p>
              <p>
                <strong>Review:</strong> {review.review}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

    <div className="rating-distribution">
          <h3>Rating Distribution</h3>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="rating-bar">
              <span className="rating-label">{rating} Star:</span>
              <div className="rating-bar-container">
                <div
                  className="rating-bar-fill"
                  style={{
                    width: `${
                      (ratingDistribution[rating] / totalRatings) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="rating-count">{ratingDistribution[rating]}</span>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default ProductDetails;
// import React from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import "./ProductDetails.css";
// import { addItemToCart } from "../../features/cart/cartSlice";

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const [data, setData] = React.useState(null);
//   const [mainImg, setMainImg] = React.useState("");
//   const [selectedSize, setSelectedSize] = React.useState("");
//   const [inCart, setInCart] = React.useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

//   React.useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/product/id/${productId}`);
//         setData(response.data);
//         setMainImg(response.data.imgUrls[0]);
//         setSelectedSize(response.data.sizes[0].name);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };

//     fetchProductData();
//   }, [productId]);

//   React.useEffect(() => {
//     const checkIfInCart = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/cart_items/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
//         if (response.data && response.data.size === selectedSize) {
//           setInCart(true);
//         } else {
//           setInCart(false);
//         }
//       } catch (error) {
//         console.error("Error checking cart status:", error);
//       }
//     };

//     if (data && token) {
//       checkIfInCart();
//     }
//   }, [selectedSize, data, productId, token]);

//   const changeMainImg = (img) => setMainImg(img);

//   const changeSelectedSize = (size) => setSelectedSize(size);

//   const handleAddToCart = () => {
//     if (selectedSize) {
//       dispatch(addItemToCart({ productId, size: selectedSize }))
//         .then(() => setInCart(true))
//         .catch((error) => console.error("Error adding item to cart:", error));
//     } else {
//       alert('Please select a size');
//     }
//   };

//   const getRatingDistribution = () => {
//     if (!data?.ratings) return {};

//     const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//     data.ratings.forEach((rating) => {
//       distribution[rating.ratings]++;
//     });
//     return distribution;
//   };

//   const getTotalRatings = () => {
//     if (!data?.ratings) return 0;
//     return data.ratings.length;
//   };

//   const ratingDistribution = getRatingDistribution();
//   const totalRatings = getTotalRatings();

//   return (
//     <div className="product-details-main">
//       <div className="product-details-img-container">
//         <div className="product-img-gallery">
//           {data?.imgUrls.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt="Product Image"
//               className="product-img-gallery-images"
//               onClick={() => changeMainImg(img)}
//             />
//           ))}
//         </div>
//         <div className="product-main-img">
//           <img src={mainImg} alt="" className="product-img-gallery-mainImg" />
//         </div>
//       </div>
//       <div className="product-details-container">
//         <p className="product-brand">{data?.brand}</p>
//         <p className="product-details-title">{data?.title}</p>
//         <div className="product-price-details">
//           <span className="product-details-discountedPrice">{"\u20B9"}{data?.discountedPrice}</span>
//           <span className="product-details-price">{"\u20B9"}{data?.price}</span>
//           <span className="product-details-discountPercent">{`(${data?.discountPercent}% off)`}</span>
//         </div>
//         <div className="color-container">
//           <span className="product-color-text">Color:</span>
//           <div className="color-info" style={{ backgroundColor: data?.color }}></div>
//         </div>
//         <div className="product-details-sizes-container">
//           Size: {selectedSize}
//           <div className="product-details-sizes">
//             {data?.sizes.map((size) => (
//               <div
//                 className={`product-detail-size ${selectedSize === size.name ? 'selected' : ''}`}
//                 key={size._id}
//                 onClick={() => changeSelectedSize(size.name)}
//               >
//                 {size.name}
//               </div>
//             ))}
//           </div>
//         </div>
//         {inCart ? (
//           <div className="add-to-cart-btn" onClick={() => navigate('/cart')}>GO TO CART</div>
//         ) : (
//           <div className="add-to-cart-btn" onClick={handleAddToCart}>ADD TO CART</div>
//         )}
//         <div className="product-description">Description: {data?.description}</div>

//         {/* Rating Distribution */}
//         <div className="rating-distribution">
//           <h3>Rating Distribution</h3>
//           {[5, 4, 3, 2, 1].map((rating) => (
//             <div key={rating} className="rating-bar">
//               <span className="rating-label">{rating} Star:</span>
//               <div className="rating-bar-container">
//                 <div
//                   className="rating-bar-fill"
//                   style={{ width: `${(ratingDistribution[rating] / totalRatings) * 100}%` }}
//                 ></div>
//               </div>
//               <span className="rating-count">{ratingDistribution[rating]}</span>
//             </div>
//           ))}
//         </div>

//         {/* Reviews */}
//         <div className="reviews">
//           <h3>Reviews</h3>
//           {data?.reviews.map((review) => (
//             <div key={review._id} className="review">
//               <p><strong>User:</strong> {review.user}</p>
//               <p><strong>Review:</strong> {review.review}</p>
//               <p><strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
