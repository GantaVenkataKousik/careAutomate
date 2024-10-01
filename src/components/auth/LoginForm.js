// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';
// import mobile from '../images/mobilepic.png';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const clientId = '597455925372-8cpevoi9bi6gr4ou2hfis28qigdlqql6.apps.googleusercontent.com';

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/signin', { email, password });
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         toast.success('Login successful');
//         navigate('/home');
//       }
//     } catch (error) {
//       toast.error('Invalid credentials');
//       console.error(error);
//     }
//   };

//   const responseGoogle = async (response) => {
//     const { credential } = response;
//     try {
//       const result = await axios.post('http://localhost:5000/google-signin', { token: credential });
//       if (result.data.token) {
//         localStorage.setItem('token', result.data.token);
//         toast.success('Welcome back!');
//         navigate('/home');
//       }
//     } catch (error) {
//       toast.error('Google Sign-In failed, please try again.');
//       console.error('Google Sign-In error:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Awesome, you're back</h2>
//         <form onSubmit={handleSubmit}>
//           <input 
//             type="email" 
//             placeholder="Email" 
//             className="login-input" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//           <input 
//             type="password" 
//             placeholder="Password" 
//             className="login-input" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//           <button type="submit" className="login-btn">Login</button>
//         </form>

//         <div className="or-separator">
//           <span>or</span>
//         </div>
//         <GoogleLogin
//           clientId={clientId}
//           buttonText="Login with Google"
//           onSuccess={responseGoogle}
//           onError={(error) => toast.error('Google Sign-In failed')}
//         />

//         <div className="signup-link">
//           <p>Don't have an account? <a href="/signup">Signup</a></p>
//         </div>
//       </div>

//       <div className="login-image-container">
//         <img src={mobile} alt="smartphone" className="signup-image" />
//       </div>
//     </div>
//   );
// }

// export default LoginForm;


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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/dashboard');
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Login successful');

      }
    } catch (error) {
      toast.error('Invalid credentials');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Awesome, You're back!!</h2>
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

