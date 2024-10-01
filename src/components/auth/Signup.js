
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './signup.css';
import mobile from '../../images/mobilepic.png';
import usa from '../../images/usa.png';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    state: '',
    mobileNumber: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"];

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handlePaste = (e) => {
    e.preventDefault();
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: 'Please type your password instead of pasting.'
    }));
  };

  // Validate email format
  const validateEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  // Validate company name (no special characters)
  const validateCompanyName = (companyName) => /^[a-zA-Z0-9&()@#'.,\s]+$/.test(companyName);

  // Validate US mobile number (starting with +1 and then 10 digits)
  const validateMobileNumber = (mobileNumber) => /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(mobileNumber)
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  // Real-time validation function
  const handleValidation = (name, value) => {
    switch (name) {
      case 'firstName':
        return value ? (validateName(value) ? '' : 'Please enter a correct First Name.') : 'First Name is required.';

      case 'lastName':
        return value ? (validateName(value) ? '' : 'Please enter a correct Last Name.') : 'Last Name is required.';

      case 'email':
        return value ? (validateEmail(value) ? '' : 'Please enter a valid email address.') : 'Email is required.';

      case 'companyName':
        return value ? (validateCompanyName(value) ? '' : 'Please enter a valid Company Name.') : 'Company Name is required.';

      case 'state':
        return value ? '' : 'State is required.'; // State is simply required, no need for complex validation

      case 'mobileNumber':
        return value ? (validateMobileNumber(value) ? '' : 'Please enter a valid U.S. mobile number.') : 'Mobile Number is required.';

      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`/[\]\\';]).{8,}$/;
        const passwordValid = passwordRegex.test(value);
        return value ? (passwordValid ? '' : 'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.') : 'Password is required.';

      case 'confirmPassword':
        return value ? (value === formData.password ? '' : 'Passwords do not match.') : 'Please confirm your password.';

      default:
        return '';
    }
  };

  // Handle input changes and validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = handleValidation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Handle blur (when the user leaves the input field)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = handleValidation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are valid before submitting
    const allErrors = {};
    Object.keys(formData).forEach((field) => {
      allErrors[field] = handleValidation(field, formData[field]);
    });

    setErrors(allErrors);

    // Check if there are any errors
    if (Object.values(allErrors).some((error) => error !== '')) {
      alert('Please fix the errors before submitting.');
      return; // Prevent submission
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      navigate('/login');
    } catch (error) {
      console.error(error);
      console.log(error)
    }
  };
  const handleMobileNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
    let formattedNumber = input;

    // Format the number based on the length of the input
    if (input.length > 6) {
      formattedNumber = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    } else if (input.length > 3) {
      formattedNumber = `(${input.slice(0, 3)}) ${input.slice(3, 6)}`;
    } else if (input.length > 0) {
      formattedNumber = `(${input.slice(0, 3)}`;
    }

    setFormData({ ...formData, mobileNumber: formattedNumber });
    const error = handleValidation('mobileNumber', formattedNumber);
    setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: error }));
  };

  const getDynamicPlaceholder = () => {
    const input = formData.mobileNumber.replace(/\D/g, ''); // Remove all non-numeric characters
    let placeholder = "(###) ###-####";

    if (input.length === 0) {
      placeholder = "(###) ###-####"; // Default placeholder
    } else if (input.length <= 3) {
      placeholder = `(${input.padEnd(3, "#")}) ###-####`;
    } else if (input.length <= 6) {
      placeholder = `(${input.slice(0, 3)}) ${input.slice(3).padEnd(3, "#")}-####`;
    } else {
      placeholder = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6).padEnd(4, "#")}`;
    }

    return placeholder;
  };


  return (
    <div className="signup-container">
      <motion.div
        className="signup-box"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="left-section">
          <img src={mobile} alt="Signup Illustration" className="signup-image" />
        </div>
        <div className="right-section">
          <h3>A Small Step To Begin Automation Of<br />Your Housing Services</h3>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name *"
                value={formData.companyName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.companyName && <p className="error-message">{errors.companyName}</p>}
            </div>
            <div className="form-group">
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className="state-dropdown"
              // style={{ color: formData.state ? 'black' : 'red' }}
              >
                <option value="" disabled style={{ color: "red" }}>State *</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="error-message">{errors.state}</p>}
            </div>
            <div className="form-group mobile-group">
              <div className="input-with-prefix">
                <div className="us-prefix">
                  <img src={usa} alt="US Flag" className="us-icon" />
                  <span >+1</span>
                </div>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder={getDynamicPlaceholder()}
                  value={formData.mobileNumber}
                  onChange={handleMobileNumberChange}
                  onBlur={handleBlur}
                  className="mobile-input"
                  required
                />
              </div>
              {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
            </div>
            <div className="form-group password-group">
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className='pwd'
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
                <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div className="form-group password-group">
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  className='confirm-pwd'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onPaste={handlePaste}
                  required
                />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="toggle-password">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>
            <motion.button
              className="signup-btn"
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ type: 'tween', duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
            >
              Sign Up
            </motion.button>
          </form>
          <p className="signin-link">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

