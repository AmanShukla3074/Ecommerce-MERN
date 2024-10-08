import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  resetError,
  userCredentials,

} from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginData.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(loginData.email)) {
      errors.email = "Invalid email address";
    }

    if (!loginData.password) {
      errors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitLoginForm = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    dispatch(loginUser(loginData))
      .unwrap()
      .then(() => {
        dispatch(userCredentials(loginData));
        setLoginData({ email: "", password: "" });
        dispatch(resetError());
        navigate("/login-otpVerify");
        toast("OTP Sent To Your Email...")
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="login-form">
      <form onSubmit={submitLoginForm}>
        <p className="form-label">Email:</p>
        <input
          type="text"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}

        <p className="form-label">Password:</p>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}

        <br />
        <button type="submit" className="form-btn" disabled={isLoading}>
          Login
        </button>
      </form>
      {error && <p className='error-message'>{typeof error === 'string' ? error : error.message || JSON.stringify(error)}</p>}
      <p className="regi-label">

      Don't have an account? <Link to="/register" className="regi-link">Register Now</Link> <br/>
        <Link to="/change-password" className="regi-link">Change Password</Link>
      </p>
    </div>
  );
};

export default Login;