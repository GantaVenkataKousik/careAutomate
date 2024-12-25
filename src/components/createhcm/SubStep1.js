import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTenantInfo } from "../../redux/tenant/tenantSlice";
import Switch from "@mui/material/Switch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputMask from "react-input-mask";

const SubStep1 = () => {
  const dispatch = useDispatch();
  const tenantData = useSelector((state) => state.tenant);
  const [hasResponsibleParty, setHasResponsibleParty] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    dispatch(updateTenantInfo({ [name]: inputValue }));
  };

  const formatDateToMMDDYYYY = (date) => {
    const inputDate = new Date(date);
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    const year = inputDate.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleDateChange = (name, date) => {
    dispatch(updateTenantInfo({ [name]: date }));
  };
  // const DateInputField = ({ label, name, value, onChange, required }) => {
  //   return (
  //     <div style={{ marginBottom: "1rem" }}>
  //       <label style={{ fontWeight: "600", color: "#333" }}>
  //         {label}
  //         {required && " *"}
  //       </label>
  //       <DatePicker
  //         selected={value ? new Date(value) : null}
  //         onChange={(date) => onChange({ target: { name, value: date } })}
  //         dateFormat="MM-dd-yyyy"
  //         className="date-picker"
  //         style={{ display: "block", marginTop: "0.5rem", width: "100%" }}
  //       />
  //     </div>
  //   );
  // };

  return (
    <div style={styles.container}>
      <Section title="Basic Information">
        <InputField
          label="First Name *"
          name="firstName"
          value={tenantData.firstName}
          onChange={handleChange}
          onFocus={() => setFocusedField("firstName")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "firstName"}
          required
        />
        <InputField
          label="Middle Name"
          name="middleName"
          value={tenantData.middleName}
          onChange={handleChange}
          onFocus={() => setFocusedField("middleName")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "middleName"}
        />
        <InputField
          label="Last Name *"
          name="lastName"
          value={tenantData.lastName}
          onChange={handleChange}
          onFocus={() => setFocusedField("lastName")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "lastName"}
          required
        />
        <InputField
          label="Date of Birth"
          name="dob"
          value={tenantData.dob ? formatDateToMMDDYYYY(tenantData.dob) : ""}
          onChange={(date) =>
            handleDateChange("dob", date ? formatDateToMMDDYYYY(date) : "")
          }
          type="date"
          onFocus={() => setFocusedField("dob")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "dob"}
          required
        />
        <InputField
          label="Gender"
          name="gender"
          value={tenantData.gender}
          onChange={handleChange}
          type="select"
          options={["Male", "Female"]}
          onFocus={() => setFocusedField("gender")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "gender"}
          required
        />
        {/* <InputField
          label="MA PMI #"
          name="MAPMI#"
          value={tenantData.mapmi}
          onChange={handleChange}
          onFocus={() => setFocusedField("mapmi")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "mapmi"}
          required
        /> */}
      </Section>
      <Section title="Contact Information">
        <InputField
          label="Phone Number *"
          name="phoneNumber"
          value={tenantData.phoneNumber}
          onChange={handleChange}
          required
        />
        <InputField
          label="Email *"
          name="email"
          value={tenantData.email}
          onChange={handleChange}
          type="email"
          required
        />
        <InputField
          label="Home Phone"
          name="homePhone"
          value={tenantData.homePhone}
          onChange={handleChange}
        />
        <InputField
          label="Cell Phone"
          name="cellPhone"
          value={tenantData.cellPhone}
          onChange={handleChange}
        />
      </Section>

      <Section title="Address Information">
        <InputField
          label="Address Line 1"
          name="addressLine1"
          value={tenantData.addressLine1}
          onChange={handleChange}
          required
        />
        <InputField
          label="Address Line 2"
          name="addressLine2"
          value={tenantData.addressLine2}
          onChange={handleChange}
        />
        <InputField
          label="City"
          name="city"
          value={tenantData.city}
          onChange={handleChange}
          required
        />
        <InputField
          label="State"
          name="state"
          value={tenantData.state}
          onChange={handleChange}
          required
        />
        <InputField
          label="Zip Code"
          name="zipCode"
          value={tenantData.zipCode}
          onChange={handleChange}
          required
        />
        <br></br>
        <div>
          <h1 style={{ color: "#000080", fontSize: "1rem", fontWeight: "600" }}>
            Mailing Address:
          </h1>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "1rem" }}>
              <label>
                <input
                  type="radio"
                  name="mailingAddressOption"
                  value="same"
                  checked={tenantData.mailingAddress === "same"}
                  onChange={() =>
                    dispatch(updateTenantInfo({ mailingAddress: "same" }))
                  }
                  style={{ marginRight: "1rem" }}
                />
                Same as above
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="mailingAddressOption"
                  value="different"
                  checked={tenantData.mailingAddress === "different"}
                  onChange={() =>
                    dispatch(updateTenantInfo({ mailingAddress: "different" }))
                  }
                  style={{ marginRight: "1rem" }}
                />
                Different
              </label>
            </div>
          </div>
        </div>
      </Section>

      {/* <Section title="Emergency Contact Information">
        <InputField
          label="Emergency First Name"
          name="emergencyFirstName"
          value={tenantData.emergencyFirstName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Emergency Middle Name"
          name="emergencyMiddleName"
          value={tenantData.emergencyMiddleName}
          onChange={handleChange}
        />
        <InputField
          label="Emergency Last Name"
          name="emergencyLastName"
          value={tenantData.emergencyLastName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Emergency Phone Number"
          name="emergencyPhoneNumber"
          value={tenantData.emergencyPhoneNumber}
          onChange={handleChange}
          required
        />
        <InputField
          label="Emergency Email"
          name="emergencyEmail"
          value={tenantData.emergencyEmail}
          onChange={handleChange}
          type="email"
          required
        />
        <InputField
          label="Relationship"
          name="emergencyRelationship"
          value={tenantData.emergencyRelationship}
          onChange={handleChange}
          required
        />
      </Section> */}

      <Section title="Employment Information">
        <InputField
          label="Employment Title"
          name="employmentTitle"
          value={tenantData.employmentTitle}
          onChange={handleChange}
          required
        />
        <InputField
          label="Hire Date"
          name="hireDate"
          value={
            tenantData.hireDate ? formatDateToMMDDYYYY(tenantData.hireDate) : ""
          }
          onChange={(date) =>
            handleDateChange("hireDate", date ? formatDateToMMDDYYYY(date) : "")
          }
          type="date"
        />
        <InputField
          label="Termination Date"
          name="terminationDate"
          value={
            tenantData.terminationDate
              ? formatDateToMMDDYYYY(tenantData.terminationDate)
              : ""
          }
          onChange={(date) =>
            handleDateChange(
              "terminationDate",
              date ? formatDateToMMDDYYYY(date) : ""
            )
          }
          type="date"
          // onChange={handleChange}
          required
        />
        <InputField
          label="SSN"
          name="ssn"
          value={tenantData.ssn}
          onChange={handleChange}
          required
        />
        <InputField
          label="Rate of Pay"
          name="rateOfPay"
          value={tenantData.rateOfPay}
          onChange={handleChange}
          required
        />
      </Section>
    </div>
  );
};

// Reusable input component
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
  maxLength,
  pattern,
  placeholder,
  mask,
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
    ) : type === "date" ? (
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="MM-dd-yyyy"
        placeholderText="MM-DD-YYYY"
        style={{ ...styles.input, ...(focused ? styles.inputFocused : {}) }}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
      />
    ) : mask ? (
      <InputMask
        mask={mask}
        value={value}
        onChange={onChange}
        name={name}
        style={{ ...styles.input, ...(focused ? styles.inputFocused : {}) }}
        required={required}
      />
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
        maxLength={maxLength}
        pattern={pattern}
        placeholder={placeholder}
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
    transition: "border-color 0.3s",
  },
  inputFocused: {
    borderColor: "#6F84F8",
    boxShadow: "0px 0px 4px rgba(74, 144, 226, 0.5)",
  },

  datePicker: {
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

export default SubStep1;
