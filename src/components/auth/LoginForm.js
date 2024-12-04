import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAuth } from '../../AuthContext';
import './Login.css';
import mobile from '../../images/mobilepic.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const otpRefs = useRef([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:9003/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Invalid credentials');
        return;
      }

      const data = await response.json();

      if (data.token) {
        toast.success('Login successful. Please verify your email.');
        setUserData(data);
        setShowOtpPopup(true);
        await fetch('http://localhost:9003/auth/request-verification-code/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:9003/auth/verify-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Invalid verification code.');
        return;
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Email verified successfully.');
        login(userData.user, userData.token);
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Invalid verification code.');
      }
    } catch (error) {
      toast.error('Error verifying email.');
      console.error(error);
    } finally {
      setLoading(false);
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
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Care Automate!</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            className="login-btn"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'tween', duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </motion.button>
        </form>

        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>

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
              className="login-btn"
              onClick={handleVerifyEmail}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Proceed'}
            </motion.button>
          </div>
        </div>
      )}

      <div className="login-image-container">
        <img src={mobile} alt="smartphone" className="signup-image" />
      </div>
    </div>
  );
};

export default LoginForm;
