import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import mobile from '../../images/mobilepic.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState(''); // New state for response message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setResponseMessage(''); // Clear any previous message

    try {
      const response = await fetch('https://careautomate-backend.vercel.app/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResponseMessage(data.error || 'Invalid credentials');
      } else if (data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        toast.success(data.success || 'Login successful'); // Show success message in toast

        // Navigate to the dashboard after a successful login
        navigate('/dashboard');
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Care Automate!</h1>
        <form onSubmit={handleSubmit}>
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
          >
            Login
          </motion.button>

          {/* Display the response message below the submit button */}
          {responseMessage && (
            <p
              className="response-message"
              style={{
                color: 'red',
                fontSize: '18px', // Adjust the size as needed
                fontWeight: 'bold',
              }}
            >
              {responseMessage}
            </p>
          )}
        </form>

        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>

      <div className="login-image-container">
        <img src={mobile} alt="smartphone" className="signup-image" />
      </div>
    </div>
  );
}

export default LoginForm;
