import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserverify, resetError } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

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
  
  const submitOTP = (e) => {
    e.preventDefault();
    dispatch(loginUserverify(loginOTPdata))
      .unwrap()
      .then(() => {
        dispatch(resetError());
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
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
          <p className="form-error">
            {typeof error === "string"
              ? error
              : error.message || JSON.stringify(error)}
          </p>
        )}
      </form>
      <p className="regi-label">
        <Link to="/change-password" className="regi-link">Change Password</Link>
      </p>
    </div>
  );
};

export default LoginOTP;
