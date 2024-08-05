import React, { useState } from "react";
import "./OrderStepper.css";
import AddressStep from "./AddressStep";
import OrderSummary from "./OrderSummary";
import PaymentStep from "./PaymentStep";

const OrderStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const steps = ["Address", "Order Summary", "Payment"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    handleNext(); // Move to the next step after selecting the address
  };

  return (
    <div className="order-stepper-container">
      <div className="stepper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index <= currentStep ? "active" : ""}`}
          >
            <div className="step-info">
              <div className="step-circle">{index + 1}</div>
              <p className="step-label">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-line ${index < currentStep ? "filled" : ""}`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="loadbar"></div>
      <div className="step-content">
        {currentStep === 0 && <AddressStep onNext={handleAddressSelect} />}
        {currentStep === 1 && (
          <OrderSummary
            onNext={handleNext}
            onBack={handleBack}
            selectedAddressId={selectedAddressId}
          />
        )}
        {currentStep === 2 && <PaymentStep onBack={handleBack} />}
      </div>
    </div>
  );
};

export default OrderStepper;
// import React, { useState } from "react";
// import "./OrderStepper.css";
// import AddressStep from "./AddressStep";
// import OrderSummary from "./OrderSummary";
// import PaymentStep from "./PaymentStep";

// const OrderStepper = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const steps = [
//     "Address",
//     "Order Summary",
//     "Payment",
//   ];

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep((prevStep) => prevStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prevStep) => prevStep - 1);
//     }
//   };

//   return (
//     <div className="order-stepper-container">
//       <div className="stepper">
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className={`step ${index <= currentStep ? "active" : ""}`}
//           >
//             <div className="step-info">
//             <div className="step-circle">{index + 1}</div>
//             <p className="step-label">{step}</p>
//             </div>
//             {index < steps.length - 1 && (
//               <div className={`step-line ${index < currentStep ? "filled" : ""}`}></div>
//             )}
//           </div>
//         ))}
//       </div>
//         <div className="loadbar"></div>
//       <div className="step-content">
//         {currentStep === 0 && <AddressStep onNext={handleNext} />}
//         {currentStep === 1 && <OrderSummary onNext={handleNext} onBack={handleBack} />}
//         {currentStep === 2 && <PaymentStep onBack={handleBack} />}
//       </div>
//     </div>
//   );
// };

// export default OrderStepper;