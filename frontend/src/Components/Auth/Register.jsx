import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, userCredentials, resetError } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return; // Stop the form submission if there are validation errors
    }

    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        dispatch(userCredentials(formData));
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        dispatch(resetError());
        navigate('/register-otpVerify');
        toast("OTP Sent To Your Email...")
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleRegister}>
        <span className="form-label">Firstname:</span>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder='Firstname'
        />
        {validationErrors.firstName && <p className='error-message'>{validationErrors.firstName}</p>}
        <br />
        <span className="form-label">Lastname:</span>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder='Lastname'
        />
        {validationErrors.lastName && <p className='error-message'>{validationErrors.lastName}</p>}
        <br />
        <span className="form-label">Email:</span>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
        />
        {validationErrors.email && <p className='error-message'>{validationErrors.email}</p>}
        <br />
        <span className="form-label">Password:</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
        />
        {validationErrors.password && <p className='error-message'>{validationErrors.password}</p>}
        <br />
        <button type='submit' className='form-btn' disabled={isLoading}>Register</button>
        {error && <p className='error-message'>{typeof error === 'string' ? error : error.message || JSON.stringify(error)}</p>}
      </form>
      <p className="regi-label">
        Already Have An Account? <Link to="/login" className="regi-link">Login</Link>
      </p>
    </div>
  );
};

export default Register;


// import React, { useEffect, useState } from 'react'
// import {useDispatch,useSelector} from 'react-redux'
// import {registerUser,userCredentials,resetError} from '../../features/auth/authSlice'
// import './Register.css'
// import { Link, useNavigate } from 'react-router-dom'

// const Register = () => {
//     const [formData,setFormData]=useState({firstName:'',lastName:'',email:'',password:''})
//     const dispatch = useDispatch()
//     const {isLoading,error} = useSelector((state)=>state.auth)
//     const navigate = useNavigate()
//     const handleChange=(e)=>{
//         setFormData({...formData,[e.target.name]:e.target.value})
//     }

//     const handleRegister = (e) => {
//       e.preventDefault();
//       dispatch(registerUser(formData))
//         .unwrap()
//         .then(() => {
//           dispatch(userCredentials(formData)); // Assuming you want to save credentials
//           setFormData({ firstName: '', lastName: '', email: '', password: '' });
//           dispatch(resetError())
//           navigate('/register-otpVerify');
//         })
//         .catch((error) => {
//           console.error('Registration error:', error);
//           // Handle the error as needed
//         });
//     };

//   return (
//     <div className='login-form'>
//       <form onSubmit={handleRegister}>
//         <span className="form-label">Firstname:</span> <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='Firstname'/><br/>
//         <span className="form-label">Lastname:</span> <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Lastname'/><br/>
//         <span className="form-label">Email:</span> <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Email'/><br/>
//         <span className="form-label">Password:</span> <input type="text" name="password" value={formData.password} onChange={handleChange} placeholder='Password'/><br/>
//         <button type='submit' className='form-btn' disable={isLoading}>Register</button>
//         {/* {error && <p className='error-message'>{error.error}</p>} */}
//         {error && <p className='error-message'>{typeof error === 'string' ? error : error.message || JSON.stringify(error)}</p>}
//       </form>
//       <p className="regi-label">Already Have An Account? <Link to="/register" className="regi-link">Login</Link></p>
//     </div>
//   )
// }

// export default Register
