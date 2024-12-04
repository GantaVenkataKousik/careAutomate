import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './signup.css';
import mobile from '../../images/mobilepic.png';
import usa from '../../images/usa.png';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';

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
  const [otp, setOtp] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const otpRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9003/auth/request-verification-code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error sending OTP.');
        return;
      }

      toast.success('OTP sent to your email.');
      setShowOtpPopup(true);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:9003/auth/verify-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, code: otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Invalid verification code.');
        return;
      }

      toast.success('Email verified successfully.');
      handleSignup();
    } catch (error) {
      toast.error('Error verifying email.');
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('https://careautomate-backend.vercel.app/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          phoneNo: formData.mobileNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'An error occurred. Please try again.');
        return;
      }

      toast.success('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error('An unknown error occurred.');
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
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
          <h3 className='text-center'>A Small Step To Begin Automation Of<br />Your Housing Services</h3>
          <form className="signup-form" onSubmit={handleSendOtp}>
            {/* Form fields */}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            {/* Other form fields */}
            <motion.button
              className="signup-btn"
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ type: 'tween', duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
            >
              Send OTP
            </motion.button>
          </form>
          <p className="signin-link">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </motion.div>

      {showOtpPopup && (
        <div className="otp-popup">
          <div className="otp-popup-content">
            <h2>Enter OTP</h2>
            <div className="otp-inputs">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  ref={(el) => (otpRefs.current[i] = el)}
                  value={otp[i] || ''}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  required
                />
              ))}
            </div>
            <motion.button
              className="signup-btn"
              onClick={handleVerifyOtp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Verify OTP
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
