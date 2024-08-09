import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetails.css';
import Modal from 'react-modal';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOrderDetails();
  }, [orderId, token]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRating(1);
    setReviewText('');
  };

  const handleReviewSubmit = async () => {
    if (selectedProduct) {
      try {
        await axios.post('http://localhost:5001/api/reviews/create', {
          productId: selectedProduct._id,
          review: reviewText,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await axios.post('http://localhost:5001/api/ratings/create', {
          productId: selectedProduct._id,
          ratings: rating,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        closeModal();
      } catch (error) {
        console.error('Error submitting review or rating:', error);
      }
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-details-container">
      <h2 className='order-details-header'>Order Details</h2>

      <div className="shipping-address">
        <h3 className='shipping-address-header'>Shipping Address</h3>
        <p className='shipping-lines'><span className='shipping-headline'>Name:</span> {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Address:</span> {order.shippingAddress.streetAddress}</p>
        <p className='shipping-lines'><span className='shipping-headline'>City:</span> {order.shippingAddress.city}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Zipcode:</span> {order.shippingAddress.zipcode}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Mobile:</span> {order.shippingAddress.mobile}</p>
      </div>


      <div className="order-info">
      <h3 className='shipping-address-header'>Order Info</h3>
        <p className='shipping-lines'><span className='shipping-headline'>Order ID: </span>{order._id}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Order Status: </span>{order.orderStatus}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Order Date: </span>{new Date(order.orderDate).toLocaleDateString()}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Total Items: </span>{order.totalItem}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Total Price: </span>₹{order.totalPrice}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Discount: </span>₹{order.discount}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Total Discounted Price: </span>₹{order.totalDiscountedPrice}</p>
      </div>

      {/* <div className="shipping-address">
        <h3>Shipping Address</h3>
        <p><strong>Name:</strong> {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
        <p><strong>Address:</strong> {order.shippingAddress.streetAddress}</p>
        <p><strong>City:</strong> {order.shippingAddress.city}</p>
        <p><strong>Zipcode:</strong> {order.shippingAddress.zipcode}</p>
        <p><strong>Mobile:</strong> {order.shippingAddress.mobile}</p>
      </div> */}

      <div className="payment-details">
        <h3 className='shipping-address-header'>Payment Details</h3>
        {/* <p className='shipping-lines'><span className='shipping-headline'>Payment Method: </span>{order.paymentDetails.paymentMethod}</p> */}
        <p className='shipping-lines'><span className='shipping-headline'>Transaction ID: </span>{order.paymentDetails.transactionId}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Payment Status: </span>{order.paymentDetails.paymentStatus}</p>
        <p className='shipping-lines'><span className='shipping-headline'>Payment ID: </span>{order.paymentDetails.paymentId}</p>
      </div>

      <div className="order-items">
        <h3 className='shipping-address-header'>Order Items</h3>
        {order.orderItems.map((item) => (
          <div key={item._id} className="order-item">
            <img src={item.product.imgUrls[0]} alt={item.product.title} className="product-image" />
            <div className="item-details">
              <p><strong>Product:</strong> {item.product.title}</p>
              <p><strong>Size:</strong> {item.size}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              {/* <p><strong>Price:</strong> ₹{item.price}</p> */}
              <p><strong>Discounted Price:</strong> ₹{item.discountedPrice}</p>
              <button className='rate-review-btn' onClick={() => openModal(item.product)}>Rate & Review</button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Leave Review"
        className="review-modal"
        overlayClassName="review-modal-overlay"
      >
        <h2>Leave a Review for {selectedProduct?.title}</h2>
        <div className="star-rating"> 
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={starValue}
                className={`star ${starValue <= rating ? 'filled' : ''}`}
                onClick={() => setRating(starValue)}
              >
                ★
              </span>
            );
          })}
        </div>
        <textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        {/* <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={starValue}
                className={`star ${starValue <= rating ? 'filled' : ''}`}
                onClick={() => setRating(starValue)}
              >
                ★
              </span>
            );
          })}
        </div> */}
        <div className="review-modal-btns">
        <button onClick={handleReviewSubmit} className='rate-review-btn'>Submit Review</button>
        <button onClick={closeModal} className='rate-review-btn'>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetails;



// code with user cannot resubmit multiple reviews

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Modal from 'react-modal';
// import './OrderDetails.css';

// const OrderDetails = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [rating, setRating] = useState(1);
//   const [reviewText, setReviewText] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [userRatings, setUserRatings] = useState([]);
//   const [userReviews, setUserReviews] = useState([]);
//   const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/orders/${orderId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrder(response.data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/users/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUserRatings(response.data.ratings);
//         setUserReviews(response.data.reviews);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     fetchOrderDetails();
//     fetchUserProfile();
//   }, [orderId, token]);

//   const openModal = (product) => {
//     const userRating = userRatings.find(r => r.product === product._id);
//     const userReview = userReviews.find(r => r.product === product._id);
//     if (userRating || userReview) {
//       alert('You have already submitted a review or rating for this product.');
//       return;
//     }
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setRating(1);
//     setReviewText('');
//   };

//   const handleReviewSubmit = async () => {
//     if (selectedProduct) {
//       try {
//         await axios.post('http://localhost:5001/api/reviews/create', {
//           productId: selectedProduct._id,
//           review: reviewText,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         await axios.post('http://localhost:5001/api/ratings/create', {
//           productId: selectedProduct._id,
//           ratings: rating,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         alert('Review and rating submitted successfully!');
//         closeModal();
        
//         const response = await axios.get('http://localhost:5001/api/users/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUserRatings(response.data.ratings);
//         setUserReviews(response.data.reviews);
//       } catch (error) {
//         console.error('Error submitting review or rating:', error);
//       }
//     }
//   };

//   if (!order) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="order-details-container">
//       <h2>Order Details</h2>
//       <div className="order-info">
//         <p><strong>Order ID:</strong> {order._id}</p>
//         <p><strong>Order Status:</strong> {order.orderStatus}</p>
//         <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
//         <p><strong>Total Items:</strong> {order.totalItem}</p>
//         <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
//         <p><strong>Discount:</strong> ₹{order.discount}</p>
//         <p><strong>Total Discounted Price:</strong> ₹{order.totalDiscountedPrice}</p>
//       </div>

//       <div className="shipping-address">
//         <h3>Shipping Address</h3>
//         <p><strong>Name:</strong> {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
//         <p><strong>Address:</strong> {order.shippingAddress.streetAddress}</p>
//         <p><strong>City:</strong> {order.shippingAddress.city}</p>
//         <p><strong>Zipcode:</strong> {order.shippingAddress.zipcode}</p>
//         <p><strong>Mobile:</strong> {order.shippingAddress.mobile}</p>
//       </div>

//       <div className="payment-details">
//         <h3>Payment Details</h3>
//         <p><strong>Payment Method:</strong> {order.paymentDetails.paymentMethod}</p>
//         <p><strong>Transaction ID:</strong> {order.paymentDetails.transactionId}</p>
//         <p><strong>Payment Status:</strong> {order.paymentDetails.paymentStatus}</p>
//         <p><strong>Payment ID:</strong> {order.paymentDetails.paymentId}</p>
//       </div>

//       <div className="order-items">
//         <h3>Order Items</h3>
//         {order.orderItems.map((item) => (
//           <div key={item._id} className="order-item">
//             <img src={item.product.imgUrls[0]} alt={item.product.title} className="product-image" />
//             <div className="item-details">
//               <p><strong>Product:</strong> {item.product.title}</p>
//               <p><strong>Size:</strong> {item.size}</p>
//               <p><strong>Quantity:</strong> {item.quantity}</p>
//               <p><strong>Price:</strong> ₹{item.price}</p>
//               <p><strong>Discounted Price:</strong> ₹{item.discountedPrice}</p>
//               <button onClick={() => openModal(item.product)}>Rate & Review</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Leave Review"
//         className="review-modal"
//         overlayClassName="review-modal-overlay"
//       >
//         <h2>Leave a Review for {selectedProduct?.title}</h2>
//         <textarea
//           placeholder="Write your review here..."
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//         />
//         <div className="star-rating">
//           {[...Array(5)].map((_, index) => {
//             const starValue = index + 1;
//             return (
//               <span
//                 key={starValue}
//                 className={`star ${starValue <= rating ? 'filled' : ''}`}
//                 onClick={() => setRating(starValue)}
//               >
//                 ★
//               </span>
//             );
//           })}
//         </div>
//         <button onClick={handleReviewSubmit}>Submit Review</button>
//         <button onClick={closeModal}>Close</button>
//       </Modal>
//     </div>
//   );
// };

// export default OrderDetails;