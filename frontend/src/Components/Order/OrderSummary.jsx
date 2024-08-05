import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../features/cart/cartSlice";
import "./OrderSummary.css";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ onNext, onBack, selectedAddressId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice, totalItems, discount, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePayment = async () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalPrice: totalPrice - discount,
          selectedAddressId,
          orderItems: items.map(item => item._id),
          totalItem: items.length,
          totalDiscountedPrice: totalPrice - discount,
          discount: discount,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to create Razorpay order:", data.error);
        return;
      }

      const { razorpayOrderId, amount, currency } = data;

      const options = {
        key: "rzp_test_a8zCPw0O3IlCsu", // Replace with your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: "Your Store Name",
        description: "Test Transaction",
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("http://localhost:5001/api/orders/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok) {
              console.error("Payment verification failed:", verifyData.error);
              return;
            }

            console.log("Payment successful, order created:", verifyData);
            onNext(); // Proceed to next step
          } catch (error) {
            console.error("Error in payment verification:", error);
          }
        },
        prefill: {
          name: "User's Name", // Replace with actual user data
          email: "user@example.com", // Replace with actual user email
          contact: "9999999999", // Replace with actual user contact
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Selected Address ID: {selectedAddressId}</p>
      <div className="OrderSummary-Product-paymet-container">
        <div className="cart-item-container OrderSummary-Product-container">
          {items?.map((item) => (
            <div key={item._id} className="cart-item">
              {item.product?.imgUrls && (
                <div className="cart-item-img-container">
                  <img
                    src={item.product.imgUrls[0]}
                    alt={item.product.title}
                    className="cart-item-img"
                  />
                </div>
              )}
              <div className="cart-item-details">
                {item.product?.title && (
                  <p className="cart-item-details-title">
                    {item.product.title}
                  </p>
                )}
                <p className="cart-item-details-size">Size: {item.size}</p>
                <p className="cart-item-details-price">
                  Price: ${item.discountedPrice}
                </p>
                <p className="cart-item-icons">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-summery-price-info">
            <p>Total Items:</p>
            <p>{totalItems}</p>
          </div>
          <div className="cart-summery-price-info">
            <p>Total Price:</p>
            <p> ₹{totalPrice}</p>
          </div>
          <div className="cart-summery-price-info">
            <p>Discount:</p>
            <p> ₹{discount}</p>
          </div>
          <div className="cart-summery-price-info">
            <p>Total Payable:</p>
            <p> ₹{totalPrice - discount}</p>
          </div>
          <div
            className="create-order-payment-btn"
            onClick={handlePayment}
          >
            Payment
          </div>
        </div>
      </div>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default OrderSummary;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart } from "../../features/cart/cartSlice";
// import "./OrderSummary.css";
// import { useNavigate } from "react-router-dom";

// const OrderSummary = ({ onNext, onBack, selectedAddressId }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { items, totalPrice, totalItems, discount, status, error } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const handlePayment = async () => {
//     const token = localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user")).token
//       : null;

//     if (!token) {
//       console.error("User is not authenticated");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5001/api/orders/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({ totalPrice: totalPrice - discount }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         console.error("Failed to create Razorpay order:", data.error);
//         return;
//       }

//       const { razorpayOrderId, amount, currency } = data;

//       const options = {
//         key: "rzp_test_a8zCPw0O3IlCsu", // Replace with your Razorpay Key ID
//         amount: amount,
//         currency: currency,
//         name: "Your Store Name",
//         description: "Test Transaction",
//         order_id: razorpayOrderId,
//         handler: async (response) => {
//           try {
//             const verifyResponse = await fetch("http://localhost:5001/api/orders/verify-payment", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`,
//               },
//               body: JSON.stringify({
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//                 selectedAddressId,
//                 orderItems: items,
//                 totalPrice: totalPrice - discount,
//               }),
//             });

//             const verifyData = await verifyResponse.json();
//             if (!verifyResponse.ok) {
//               console.error("Payment verification failed:", verifyData.error);
//               return;
//             }

//             console.log("Payment successful, order created:", verifyData);
//             // Navigate to order confirmation or any other page
//             onNext();
//           } catch (error) {
//             console.error("Error in payment verification:", error);
//           }
//         },
//         prefill: {
//           name: "User's Name", // You can replace this with user data
//           email: "user@example.com", // Replace with user's email
//           contact: "9999999999", // Replace with user's phone number
//         },
//         notes: {
//           address: "Razorpay Corporate Office",
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Error during payment:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Order Summary</h2>
//       <p>Selected Address ID: {selectedAddressId}</p>
//       <div className="OrderSummary-Product-paymet-container">
//         <div className="cart-item-container OrderSummary-Product-container">
//           {items?.map((item) => (
//             <div key={item._id} className="cart-item">
//               {item.product?.imgUrls && (
//                 <div className="cart-item-img-container">
//                   <img
//                     src={item.product.imgUrls[0]}
//                     alt={item.product.title}
//                     className="cart-item-img"
//                   />
//                 </div>
//               )}
//               <div className="cart-item-details">
//                 {item.product?.title && (
//                   <p className="cart-item-details-title">
//                     {item.product.title}
//                   </p>
//                 )}
//                 <p className="cart-item-details-size">Size: {item.size}</p>
//                 <p className="cart-item-details-price">
//                   Price: ${item.discountedPrice}
//                 </p>
//                 <p className="cart-item-icons">Quantity: {item.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="cart-summary">
//           <div className="cart-summery-price-info">
//             <p>Total Items:</p>
//             <p>{totalItems}</p>
//           </div>
//           <div className="cart-summery-price-info">
//             <p>Total Price:</p>
//             <p> ₹{totalPrice}</p>
//           </div>
//           <div className="cart-summery-price-info">
//             <p>Discount:</p>
//             <p> ₹{discount}</p>
//           </div>
//           <div className="cart-summery-price-info">
//             <p>Total Payable:</p>
//             <p> ₹{totalPrice - discount}</p>
//           </div>
//           <div
//             className="create-order-payment-btn"
//             onClick={handlePayment}
//           >
//             Payment
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;







// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart } from "../../features/cart/cartSlice";
// import "./OrderSummary.css";
// import { useNavigate } from "react-router-dom";

// const OrderSummary = ({ onNext, onBack, selectedAddressId }) => {
//   const navigate=useNavigate()
//   const dispatch = useDispatch();
//   const { items, totalPrice, totalItems, discount, status, error } =
//     useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Order Summary</h2>
//       <p>Selected Address ID: {selectedAddressId}</p>
//       <div className="OrderSummary-Product-paymet-container">
//         <div className="cart-item-container OrderSummary-Product-container">
//           {items?.map((item) => (
//             <div key={item._id} className="cart-item">
//               {item.product?.imgUrls && (
//                 <div className="cart-item-img-container">
//                   <img
//                     src={item.product.imgUrls[0]}
//                     alt={item.product.title}
//                     className="cart-item-img"
//                   />
//                 </div>
//               )}
//               <div className="cart-item-details">
//                 {item.product?.title && (
//                   <p className="cart-item-details-title">
//                     {item.product.title}
//                   </p>
//                 )}
//                 <p className="cart-item-details-size">Size: {item.size}</p>
//                 <p className="cart-item-details-price">
//                   Price: ${item.discountedPrice}
//                 </p>
//                 <p className="cart-item-icons">Quantity: {item.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="cart-summary">
//         <div className="cart-summery-price-info">
//           <p>Total Items:</p>
//           <p> {totalItems}</p>
//         </div>
//         <div className="cart-summery-price-info">
//           <p>Total Price:</p>
//           <p> ₹{totalPrice}</p>
//         </div>
//         <div className="cart-summery-price-info">
//           <p>Discount:</p>
//           <p> ₹{discount}</p>
//         </div>
//         <div className="cart-summery-price-info">
//           <p>Total Payable:</p>
//           <p> ₹{totalPrice - discount}</p>
//         </div>
//         <div
//           className="create-order-payment-btn"
//           // onClick={() => {
//           //   navigate("/order");
//           // }}
//           onClick={onNext}
//         >
//           Payment
//         </div>
//       </div>
//       </div>
//       {/* <button onClick={onBack}>Back</button>
//       <button onClick={onNext}>Next</button> */}
//     </div>
//   );
// };

// export default OrderSummary;