import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../AuthContext";
import { API_ROUTES } from "../../routes";
import "./styles/Login.css";
import Footer from "./Footer";
import loginImage from "./images/login1.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_ROUTES.AUTH.BASE}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Invalid credentials");
        return;
      }

      const data = await response.json();
      if (data.response.response.token) {
        toast.success("Login successful.");
        login(data.response.response.user, data.response.response.token);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div className="loginContainer" style={{ color: 'black' }}>
        <ul className="circles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <section>
          <div className="wrapper">
            <header>Login</header>
            <form onSubmit={handleSubmit}>
              <div className="field email">
                <div className="input-area">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email Address"
                  />
                  <i className="icon fas fa-envelope" />
                  <i className="error error-icon fas fa-exclamation-circle" />
                </div>
                <div className="error error-txt">Email can't be blank</div>
              </div>
              <div className="field password">
                <div className="input-area">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password"
                  />
                  <i className="icon fas fa-lock" />
                  <i className="error error-icon fas fa-exclamation-circle" />
                </div>
                <div className="error error-txt">Password can't be blank</div>
              </div>
              <div className="pass-txt">
                <NavLink to="/forgot-password">Forgot password?</NavLink>
              </div>
              <input type="submit" value="Login" />
            </form>
            <div className="sign-txt">
              Not yet a member? <NavLink to="/register">Signup now</NavLink>
            </div>
          </div>
          <div className="img-wrapper">
            <img src={loginImage} alt="Login" />
          </div>
        </section>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;