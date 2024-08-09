import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, settotalItemsToZero } from "../../features/cart/cartSlice";
import "./OrderSummary.css";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const OrderSummary = ({ onNext, onBack, selectedAddressId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice, totalItems, discount, totalDiscountedPrice } =
    useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalPrice: totalDiscountedPrice,
          selectedAddressId,
          // orderItems: items.map(item => item._id),
          // totalItem: items.length,
          // totalDiscountedPrice: totalPrice - discount,
          // discount: discount,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to create Razorpay order:", data.error);
        return;
      }

      const { razorpayOrderId, amount, currency } = data;

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "E-SHOP",
        description: "Test Transaction",
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch(
              "http://localhost:5001/api/orders/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok) {
              console.error("Payment verification failed:", verifyData.error);
              return;
            }

            console.log("Payment successful, order created:", verifyData);
            onNext();
          } catch (error) {
            console.error("Error in payment verification:", error);
          }
        },
        prefill: {
          name: user.user.firstName + user.user.lastName,
          email: user.user.email,
          contact: "1234567890",
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#e932f0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      dispatch(settotalItemsToZero());
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div>
      <div className="address-header">Order Summary</div>
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
                <span className="cart-product-discountedPrice">
                  {"\u20B9"}
                  {item.product.discountedPrice}
                </span>
                <span className="cart-product-price">
                  {"\u20B9"}
                  {item.product.price}
                </span>
                <span className="cart-product-discountPercent">{`(${item.product.discountPercent}% off)`}</span>
                <p className="order-summery-qty">Quantity: {item.quantity}</p>
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
            <p> ₹{totalDiscountedPrice}</p>
          </div>
          <div className="create-order-payment-btn" onClick={handlePayment}>
            Payment
          </div>
        </div>
      </div>
      {/* <button onClick={onBack}>Back</button> */}
      <IoMdArrowRoundBack onClick={onBack} className="order-back-step"/>
    </div>
  );
};

export default OrderSummary;
