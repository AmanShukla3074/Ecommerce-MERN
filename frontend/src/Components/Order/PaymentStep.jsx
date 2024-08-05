import React from "react";

const PaymentStep = ({ onBack }) => {
  return (
    <div>
      <h2>Payment</h2>
      <p>Placeholder for payment details.</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default PaymentStep;
