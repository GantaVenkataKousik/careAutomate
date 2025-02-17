import React, { useState, useRef } from "react";
import Footer from "./Footer";
import "./styles/Register.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import registerImage from "./images/register.jpg";
import { BASE_URL } from "../../config";
import { API_ROUTES } from "../../routes";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { validateForm } from "../../utils/commonUtils/validateForm";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    state: "",
    mobileNumber: "",
  });
  const [otp, setOtp] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const otpRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }

    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak (at least 6 characters)");
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordStrength("Medium (add special characters)");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/request-verification-code/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error sending OTP.");
        return;
      }

      toast.success("OTP sent to your email.");
      setShowOtpPopup(true);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`${BASE_URL}/verify-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, code: otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid verification code.");
        return;
      }

      toast.success("Email verified successfully.");
      handleSubmit();
    } catch (error) {
      toast.error("Error verifying email.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    setLoading(true); // Start loading

    try {
      const res = await fetch(`${API_ROUTES.AUTH.BASE}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          phoneNo: formData.mobileNumber,
          company: formData.companyName,
          state: formData.state,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(
          errorData.message || "An error occurred. Please try again."
        );
        return;
      }
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("An unknown error occurred.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  return (
    <>
      <div className="registerContainer" style={{ color: "black" }}>
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
            <header>SignUp</header>
            <form onSubmit={handleSubmit}>
              <div className="field email">
                <div className="input-area">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <i className="icon fas fa-envelope" />
                  <i className="error error-icon fas fa-exclamation-circle" />
                </div>
                <div className="error error-txt">Email can't be blank</div>
              </div>
              <div className="field name">
                <div className="input-area">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <i className="icon fas fa-user" />
                  <i className="error error-icon fas fa-exclamation-circle" />
                </div>
                <div className="error error-txt">First Name can't be blank</div>
              </div>
              <div className="field name">
                <div className="input-area">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <i className="icon fas fa-user" />
                  <i className="error error-icon fas fa-exclamation-circle" />
                </div>
                <div className="error error-txt">Last Name can't be blank</div>
              </div>
              <div className="field password">
                <div className="input-area">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <i className="icon fas fa-lock" />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                    className="icon-container"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                <div className="password-strength">
                  {passwordStrength && formData.password.length > 0 && (
                    <p className="text-sm text-gray-600 ml-16">
                      Password strength: <span>{passwordStrength}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="field confirm-password">
                <div className="input-area">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <i className="icon fas fa-lock" />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: "pointer" }}
                    className="icon-container"
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {!passwordMatch && formData.confirmPassword.length > 0 && (
                  <p className="text-sm text-red-500 ml-16">
                    Passwords do not match.
                  </p>
                )}
              </div>
              <div className="field company">
                <div className="input-area">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                  <i className="icon fas fa-building" />
                  <i className="error error-icon fas fa-exclamation-circle" />
                </div>
                <div className="error error-txt">
                  Company Name can't be blank
                </div>
              </div>
              <div className="field state">
                <div className="input-area">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  <i className="icon fas fa-map-marker-alt" />
                  <i className="error error-icon fas fa-exclamation-circle" />
                </div>
                <div className="error error-txt">State can't be blank</div>
              </div>
              <div className="field mobile">
                <div className="input-area">
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                  <i className="icon fas fa-phone" />
                  <i className="error error-icon fas fa-exclamation-circle" />
                </div>
                <div className="error error-txt">
                  Mobile Number can't be blank
                </div>
              </div>
              <input
                type="submit"
                value={loading ? "Creating Account..." : "Create Account"}
                disabled={loading} // Disable button during loading
              />
              <div className="sign-txt">
                Already Registered? <a href="/login">Login now</a>
              </div>
            </form>
          </div>
          <div className="img-wrapper">
            <img src={registerImage} alt="Register" />
          </div>
        </section>
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
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    required
                  />
                ))}
              </div>
              <button onClick={handleVerifyOtp}>Verify OTP</button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
