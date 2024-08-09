import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserverify,
  resetError,
  userCredentials,
} from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterOTP = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { isLoading, error, userCredentialsData } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...userCredentialsData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(registerUserverify(formData))
      .unwrap()
      .then(() => {
        dispatch(resetError());
        navigate("/");
        toast.success("Registerd In Successfully...")
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleRegister}>
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

export default RegisterOTP;
