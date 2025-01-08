import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHcmInfo } from "../../redux/hcm/hcmSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const hcmData = useSelector((state) => state.hcm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    dispatch(updateHcmInfo({ [name]: inputValue }));
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
          onChange={handleChange}
          required
        />
        <InputField
          label={
            <>
              Password <span className="required">*</span>
            </>
          }
          name="password"
          value={hcmData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          required
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <InputField
          label={
            <>
              Confirm Password <span className="required">*</span>
            </>
          }
          name="confirmPassword"
          value={hcmData.confirmPassword}
          onChange={handleChange}
          type={showConfirmPassword ? "text" : "password"}
          required
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />
      </Section>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  required = false,
  focused,
  onFocus,
  onBlur,
  showPassword,
  setShowPassword,
}) => (
  <div style={{ marginBottom: "2px", position: "relative" }}>
    <label style={styles.label} htmlFor={name}>
      {label}
    </label>
    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ ...styles.input, ...(focused ? styles.inputFocused : {}) }}
        required={required}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <div className="flex items-center relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            ...styles.input,
            paddingRight: "2.5rem", // Adds space for the icon inside the input
            ...(focused ? styles.inputFocused : {}),
          }}
          required={required}
        />
        {name === "password" || name === "confirmPassword" ? (
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
        ) : null}
      </div>
    )}
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
  inputFocused: {
    borderColor: "#4A90E2",
    boxShadow: "0px 0px 4px rgba(74, 144, 226, 0.5)",
  },
};

export default LoginInfo;
