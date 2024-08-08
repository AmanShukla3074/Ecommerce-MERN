import React, { useState } from 'react'
import './Login.css'

import {changePassword, resetError, userCredentials} from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const ChangePass = () => {
  
    const dispatch = useDispatch()
    const { isLoading, error } = useSelector((state) => state.auth);

    const [email,setEmail]=useState(null)
    const [validationErrors, setValidationErrors] = useState("");
    const navigate = useNavigate();


    const validate = () => {
        const errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!email) {
          errors.email = "Email is required";
        } else if (!emailPattern.test(email)) {
          errors.email = "Invalid email address";
        }
    
        return errors;
      };

      
  const submitChangePasswordForm = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    dispatch(changePassword({email}))
      .unwrap()
      .then(() => {
        dispatch(userCredentials({email}));
        setEmail("")
        dispatch(resetError());
        navigate("/change-password-otpVerify");
      })
      .catch((error) => {
        console.error("Change Password error:", error);
      });
  };

    return (
        <div className="login-form">
        <form onSubmit={submitChangePasswordForm}>
          <p className="form-label">Email:</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
          />
          {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}
          <br />
          <button type="submit" className="form-btn" disabled={isLoading}>
            Change Password
          </button>
        </form>
        {error && <p className='error-message'>{typeof error === 'string' ? error : error.message || JSON.stringify(error)}</p>}
        <p className="regi-label">
          <Link to="/login" className="regi-link">Login</Link>
        </p>
      </div>
  )
}

export default ChangePass
