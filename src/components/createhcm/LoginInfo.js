import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHcmInfo } from "../../redux/hcm/hcmSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const dispatch = useDispatch();
  const hcmData = useSelector((state) => state.hcm);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    // Dispatch the update to Redux
    dispatch(updateHcmInfo({ [name]: value }));

    if (name === "password") {
      // Check password strength
      if (value.length < 6) {
        setPasswordStrength("Weak (at least 6 characters)");
      } else if (!/[!@#$%^&*]/.test(value)) {
        setPasswordStrength("Medium (add special characters)");
      } else {
        setPasswordStrength("Strong");
      }

      // Update match status
      setPasswordMatch(value === hcmData.confirmPassword);
    }

    if (name === "confirmPassword") {
      // Update match status
      setPasswordMatch(value === hcmData.password);
    }
  };

  return (
    <div style={styles.container}>
      <Section title="Login Information">
        <InputField
          label={
            <>
              Username <span className="required">*</span>
            </>
          }
          name="userName"
          value={hcmData.userName}
          onChange={(e) =>
            dispatch(updateHcmInfo({ [e.target.name]: e.target.value }))
          }
          required
        />
        <div className="flex flex-col ">
          <InputField
            label={
              <>
                Password <span className="required">*</span>
              </>
            }
            name="password"
            value={hcmData.password}
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            required
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {passwordStrength && (
            <p
              style={{
                fontSize: "0.875rem",
                color: "#666",
              }}
            >
              Password strength: <span>{passwordStrength}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <InputField
            label={
              <>
                Confirm Password <span className="required">*</span>
              </>
            }
            name="confirmPassword"
            value={hcmData.confirmPassword}
            onChange={handlePasswordChange}
            type={showConfirmPassword ? "text" : "password"}
            required
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
          {!passwordMatch && (
            <p
              style={{ marginLeft: "16px", fontSize: "0.875rem", color: "red" }}
            >
              Passwords do not match.
            </p>
          )}
        </div>
      </Section>
    </div>
  );
};

// Reusable InputField Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  showPassword,
  setShowPassword,
}) => (
  <div style={{ marginBottom: "2px", position: "relative" }}>
    <label style={styles.label} htmlFor={name}>
      {label}
    </label>
    <div className="flex items-center relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          ...styles.input,
          paddingRight: "2.5rem",
        }}
        required={required}
      />
      {(name === "password" || name === "confirmPassword") && (
        <span
          className="absolute left-[70%] top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <FaRegEye className="w-5 h-5" />
          ) : (
            <FaRegEyeSlash className="w-5 h-5" />
          )}
        </span>
      )}
    </div>
  </div>
);

// Reusable Section component to wrap sections with a title
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "16px" }}>
    <h3 style={styles.sectionHeading}>{title}</h3>
    <div className="grid grid-cols-3 md:grid-cols-3 gap-4">{children}</div>
  </div>
);

// Styles
const styles = {
  container: {
    maxHeight: "440px",
    overflowY: "auto",
    padding: "20px",
    borderRadius: "10px",
  },
  sectionHeading: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#555",
    marginBottom: "8px",
    textDecoration: "underline",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    color: "#6F84F8",
    marginBottom: "4px",
    fontWeight: "600",
  },
  input: {
    width: "80%",
    padding: "5px 10px",
    border: "1px solid #ddd",
    borderRadius: "25px",
    fontSize: "1rem",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
    outline: "none",
    transition: "border-color 0.3s",
    textAlign: "center",
  },
};

export default LoginInfo;
