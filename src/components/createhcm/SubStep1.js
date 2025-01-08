import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputMask from "react-input-mask";
import { updateHcmInfo } from "../../redux/hcm/hcmSlice";

const SubStep1 = () => {
  const dispatch = useDispatch();
  const hcmData = useSelector((state) => state.hcm);
  const [focusedField, setFocusedField] = useState(null);
  // console.log(hcmData);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    dispatch(updateHcmInfo({ [name]: inputValue }));
  };

  const formatDateToMMDDYYYY = (date) => {
    const inputDate = new Date(date);
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    const year = inputDate.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleDateChange = (name, date) => {
    dispatch(updateHcmInfo({ [name]: date }));
  };

  return (
    <div style={styles.container}>
      <Section title="Basic Information">
        <InputField
          label={
            <>
              First Name <span className="required">*</span>
            </>
          }
          name="firstName"
          value={hcmData.firstName}
          onChange={handleChange}
          onFocus={() => setFocusedField("firstName")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "firstName"}
          required
        />
        <InputField
          label="Middle Name"
          name="middleName"
          value={hcmData.middleName}
          onChange={handleChange}
          onFocus={() => setFocusedField("middleName")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "middleName"}
        />
        <InputField
          label={
            <>
              Last Name <span className="required">*</span>
            </>
          }
          name="lastName"
          value={hcmData.lastName}
          onChange={handleChange}
          onFocus={() => setFocusedField("lastName")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "lastName"}
          required
        />
        <InputField
          label={
            <>
              Date of Birth <span className="required">*</span>
            </>
          }
          name="dob"
          value={hcmData.dob ? formatDateToMMDDYYYY(hcmData.dob) : ""}
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
          label={
            <>
              Gender <span className="required">*</span>
            </>
          }
          name="gender"
          value={hcmData.gender}
          onChange={handleChange}
          type="select"
          options={["Male", "Female"]}
          onFocus={() => setFocusedField("gender")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "gender"}
          required
        />
      </Section>
      <Section title="Contact Information">
        <InputField
          label={
            <>
              Phone Number <span className="required">*</span>
            </>
          }
          name="phoneNumber"
          value={hcmData.phoneNumber}
          onChange={handleChange}
          required
        />
        <InputField
          label={
            <>
              Email <span className="required">*</span>
            </>
          }
          name="email"
          value={hcmData.email}
          onChange={handleChange}
          type="email"
          required
        />
        <InputField
          label="Home Phone"
          name="homePhone"
          value={hcmData.homePhone}
          onChange={handleChange}
        />
        <InputField
          label="Cell Phone"
          name="cellPhone"
          value={hcmData.cellPhone}
          onChange={handleChange}
        />
      </Section>

      <Section title="Address Information">
        <InputField
          label={
            <>
              Address Line 1 <span className="required">*</span>
            </>
          }
          name="addressLine1"
          value={hcmData.addressLine1}
          onChange={handleChange}
          required
        />
        <InputField
          label="Address Line 2"
          name="addressLine2"
          value={hcmData.addressLine2}
          onChange={handleChange}
        />
        <InputField
          label={
            <>
              City <span className="required">*</span>
            </>
          }
          name="city"
          value={hcmData.city}
          onChange={handleChange}
          required
        />
        <InputField
          label={
            <>
              State <span className="required">*</span>
            </>
          }
          name="state"
          value={hcmData.state}
          onChange={handleChange}
          required
        />
        <InputField
          label={
            <>
              Zip Code <span className="required">*</span>
            </>
          }
          name="zipCode"
          value={hcmData.zipCode}
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
                  checked={hcmData.mailingAddress === "same"}
                  onChange={() =>
                    dispatch(updateHcmInfo({ mailingAddress: "same" }))
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
                  checked={hcmData.mailingAddress === "different"}
                  onChange={() =>
                    dispatch(updateHcmInfo({ mailingAddress: "different" }))
                  }
                  style={{ marginRight: "1rem" }}
                />
                Different
              </label>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Employment Information">
        <InputField
          label={
            <>
              Emergency Title <span className="required">*</span>
            </>
          }
          name="employmentTitle"
          type="select"
          options={["Permanent", "Contractor"]}
          value={hcmData.employmentTitle}
          onChange={handleChange}
          required
        />
        <InputField
          label="Hire Date"
          name="hireDate"
          value={hcmData.hireDate ? formatDateToMMDDYYYY(hcmData.hireDate) : ""}
          onChange={(date) =>
            handleDateChange("hireDate", date ? formatDateToMMDDYYYY(date) : "")
          }
          type="date"
        />
        <InputField
          label="Termination Date"
          name="terminationDate"
          value={
            hcmData.terminationDate
              ? formatDateToMMDDYYYY(hcmData.terminationDate)
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
          label={
            <>
              SSN <span className="required">*</span>
            </>
          }
          name="ssn"
          value={hcmData.ssn}
          onChange={handleChange}
          required
        />
        <InputField
          label={
            <>
              Rate of Pay <span className="required">*</span>
            </>
          }
          name="rateOfPay"
          value={hcmData.rateOfPay}
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(value)} // Ensure the value is a Dayjs object
          onChange={(date) => onChange(date?.format("YYYY-MM-DD"))} // Format the selected date as "YYYY-MM-DD"
          dateFormat="MM-DD-YYYY" // Set the display format for the date
          placeholder={placeholder || "MM-DD-YYYY"}
          renderInput={(params) => (
            <input
              {...params.inputProps}
              name={name}
              style={{
                ...styles.input,
                ...(focused ? styles.inputFocused : {}),
              }}
              onFocus={onFocus}
              onBlur={onBlur}
              required={required}
            />
          )}
          sx={{
            fontFamily: "Poppins",
            fontSize: "15px",
            width: "80%",
            "& input": {
              padding: "5px 10px",
            },
            "& .MuiInputBase-root": {
              borderRadius: "20px",
              border: "1px solid #ddd",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6F84F8",
            },
          }}
        />
      </LocalizationProvider>
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
