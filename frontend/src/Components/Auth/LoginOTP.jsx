import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserverify, resetError } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const LoginOTP = () => {
  const { isLoading, userCredentialsData, error } = useSelector(
    (state) => state.auth
  );
  const [loginOTPdata, setLoginOTPdata] = useState({
    email: `${userCredentialsData.email}`,
    otp: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginOTPdata({ ...loginOTPdata, [e.target.name]: e.target.value });
  };
  console.log(error);
  
  const submitOTP = (e) => {
    e.preventDefault();
    dispatch(loginUserverify(loginOTPdata))
      // .unwrap()
      // .then(() => {
      //   dispatch(resetError());
      //   navigate(-2);
      // })
      // .catch((error) => {
      //   console.error("Registration error:", error);
      // });
  };

  return (
    <div className="login-form">
      <form onSubmit={submitOTP}>
        <span className="form-label">OTP:</span>{" "}
        <input
          type="text"
          name="otp"
          onChange={handleChange}
          placeholder="OTP"
        />
        <button type="submit" className="form-btn" disable={isLoading}>
          Verify OTP
        </button>
        {error && (
          <p>
            {typeof error === "string"
              ? error
              : error.message || JSON.stringify(error)}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginOTP;
