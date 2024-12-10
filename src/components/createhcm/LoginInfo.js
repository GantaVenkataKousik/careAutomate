import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTenantInfo } from "../../redux/tenant/tenantSlice";

const LoginInfo = () => {
  const dispatch = useDispatch();
  const tenantData = useSelector((state) => state.tenant);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    dispatch(updateTenantInfo({ [name]: inputValue }));
  };

  return (
    <div style={styles.container}>
      <Section title="Login Information">
        <InputField
          label="Username"
          name="userName"
          value={tenantData.userName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Password"
          name="password"
          value={tenantData.password}
          onChange={handleChange}
          type="password"
          required
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
}) => (
  <div style={{ marginBottom: "2px" }}>
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ ...styles.input, ...(focused ? styles.inputFocused : {}) }}
        required={required}
      />
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
    color: "#000080",
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
