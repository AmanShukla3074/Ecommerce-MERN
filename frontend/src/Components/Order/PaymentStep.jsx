import React from "react";
import { useNavigate } from "react-router-dom";
import './PaymentStep.css';

const PaymentStep = () => {
  const navigate = useNavigate();

  const handleShopMore = () => {
    navigate('/');
  };

  const handleYourOrders = () => {
    navigate('/your-order');
  };

  return (
    <div className="payment-success-container">
      <div className="payment-success-content">
        <h2 className="payment-success-title">Payment Successful!</h2>
        <p className="payment-success-message">Thank you for your purchase. Your order has been placed successfully.</p>
        <div className="payment-success-actions">
          <button className="payment-success-button" onClick={handleShopMore}>Go Shop More</button>
          <button className="payment-success-button" onClick={handleYourOrders}>Your Orders</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
// import React from "react";

// const PaymentStep = ({ onBack }) => {
//   return (
//     <div>
//       <h2>Payment</h2>
//       <p>Placeholder for payment details.</p>
//       <button onClick={onBack}>Back</button>
//     </div>
//   );
// };

// export default PaymentStep;
