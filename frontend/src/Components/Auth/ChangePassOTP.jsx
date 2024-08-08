import React, { useState } from "react";
import {
  changePasswordOTPverify,
  registerUserverify,
  resetError,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ChangePassOTP = () => {
  const { isLoading, userCredentialsData, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changePassData, setChangePassData] = useState({
    email: userCredentialsData.email,
    newPassword: "",
    otp: "",
  });

  const submitOTP = (e) => {
    e.preventDefault();
    console.log(changePassData)
    dispatch(changePasswordOTPverify(changePassData))
      .unwrap()
      .then(() => {
        dispatch(resetError());
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const handleChange = (e) => {
    setChangePassData({ ...changePassData, [e.target.name]: e.target.value });
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
        <span className="form-label">New Password:</span>{" "}
        <input
          type="text"
          name="newPassword"
          onChange={handleChange}
          placeholder="New Password"
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
      <p className="regi-label">
        <Link to="/change-password" className="regi-link">
          Change Password
        </Link>
      </p>
    </div>
  );
};

export default ChangePassOTP;
