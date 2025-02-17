import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTenantInfo } from "../../redux/tenant/tenantSlice";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputMask from "react-input-mask";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const updateResponsibleParty = (hasResponsibleParty) => ({
  type: "UPDATE_RESPONSIBLE_PARTY",
  payload: hasResponsibleParty,
});

const SubStep1 = () => {
  const dispatch = useDispatch();
  const tenantData = useSelector((state) => state.tenant);
  const [needsMobileAccess, setNeedsMobileAccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isMailingAddress, setIsMailingAddress] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue;

    if (type === "checkbox") {
      inputValue = checked; // Handle checkboxes
    } else if (type === "radio" && name === "mailingSameAsAbove") {
      inputValue = value === "true"; // Convert "true" or "false" string to boolean
    } else {
      inputValue = value; // Handle other inputs
    }
    dispatch(updateTenantInfo({ [name]: inputValue }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value);
      // Check password strength
      if (value.length < 6) {
        setPasswordStrength("Weak (at least 6 characters)");
      } else if (!/[!@#$%^&*]/.test(value)) {
        setPasswordStrength("Medium (add special characters)");
      } else {
        setPasswordStrength("Strong");
      }
      setPasswordMatch(value === confirmPassword);
      dispatch(updateTenantInfo({ [name]: value }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordMatch(password === value);
    dispatch(updateTenantInfo({ confirmPassword: value }));
  };
  const hasResponsibleParty = useSelector(
    (state) => state.tenant.hasResponsibleParty
  );
  const handleSwitchChange = () => {
    const newValue = !hasResponsibleParty;
    dispatch(updateTenantInfo({ hasResponsibleParty: newValue })); // Dispatch action to Redux
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
          label={
            <>
              Last Name <span className="required">*</span>
            </>
          }
          name="lastName"
          value={tenantData.lastName}
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
          label={
            <>
              Gender <span className="required">*</span>
            </>
          }
          name="gender"
          value={tenantData.gender}
          onChange={handleChange}
          type="select"
          options={["Male", "Female", "Other"]}
          onFocus={() => setFocusedField("gender")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "gender"}
          required
        />
        <InputField
          label={
            <>
              MA PMI # <span className="required">*</span>
            </>
          }
          name="maPMINumber"
          value={tenantData.maPMINumber}
          onChange={handleChange}
          maxLength={8}
          onFocus={() => setFocusedField("mapmi")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "mapmi"}
          required
        />
      </Section>
      <hr
        style={{ margin: "2rem 0", border: "1px solid rgba(80, 82, 84, 0.5)" }}
      ></hr>
      <Section title="Address Information">
        <InputField
          label={
            <>
              Address Line 1 <span className="required">*</span>
            </>
          }
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
          label={
            <>
              City <span className="required">*</span>
            </>
          }
          name="city"
          value={tenantData.city}
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
          value={tenantData.state}
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
          value={tenantData.zipCode}
          onChange={handleChange}
          required
        />
        <br></br>
        <div>
          <h1 style={{ color: "#000080", fontSize: "1rem", fontWeight: "600" }}>
            Mailing Address: <span className="text-red-500">*</span>
          </h1>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "1rem" }}>
              <label>
                <input
                  type="radio"
                  name="mailingSameAsAbove"
                  value="true"
                  onChange={handleChange}
                  checked={tenantData.mailingSameAsAbove === true}
                  style={{ marginRight: "1rem" }}
                />
                Same as above
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="mailingSameAsAbove"
                  value="false"
                  onChange={handleChange}
                  checked={tenantData.mailingSameAsAbove === false}
                  style={{ marginRight: "1rem" }}
                />
                Different
              </label>
            </div>
          </div>
        </div>
      </Section>

      {tenantData.mailingSameAsAbove === false && (
        <>
          <hr
            style={{
              margin: "2rem 0",
              border: "1px solid rgba(80, 82, 84, 0.5)",
            }}
          ></hr>
          <Section title="Mailing Address">
            <InputField
              label="Mailing Address Line 1"
              name="mailingAddressLine1"
              value={tenantData.mailingAddressLine1}
              onChange={handleChange}
              required
            />
            <InputField
              label="Mailing Address Line 2"
              name="mailingAddressLine2"
              value={tenantData.mailingAddressLine2}
              onChange={handleChange}
            />
            <InputField
              label="City"
              name="mailingCity"
              value={tenantData.mailingCity}
              onChange={handleChange}
              required
            />
            <InputField
              label="State"
              name="mailingState"
              value={tenantData.mailingState}
              onChange={handleChange}
              required
            />
            <InputField
              label="Zip Code"
              name="mailingZipCode"
              value={tenantData.mailingZipCode}
              onChange={handleChange}
              required
            />
          </Section>
        </>
      )}
      <hr
        style={{ margin: "2rem 0", border: "1px solid rgba(80, 82, 84, 0.5)" }}
      ></hr>
      <Section title="Contact Information">
        <InputField
          label={
            <>
              Phone Number <span className="required">*</span>
            </>
          }
          name="phoneNumber"
          value={tenantData.phoneNumber}
          onChange={handleChange}
          type="tel"
          mask="(999)-999-9999"
          required
        />
        <InputField
          label={
            <>
              Email <span className="required">*</span>
            </>
          }
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
          type="tel"
          mask="(999)-999-9999"
        />
        <InputField
          label="Cell Phone"
          name="cellPhone"
          value={tenantData.cellPhone}
          onChange={handleChange}
          type="tel"
          mask="(999)-999-9999"
        />
      </Section>

      <div
        style={{
          display: "flex",
          marginTop: "20px",
          marginBottom: "1rem",
        }}
      >
        {/* Left side: Races checkboxes */}
        <div className="mr-10">
          <label style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Race & Ethnicity -
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="race"
                value="White"
                checked={tenantData.race === "White"}
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              White
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="race"
                value="Black or African American"
                checked={tenantData.race === "Black or African American"}
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              Black or African American
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="race"
                value="American Indian or Alaska Native"
                checked={tenantData.race === "American Indian or Alaska Native"}
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              American Indian or Alaska Native
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="race"
                value="Asian"
                onChange={handleChange}
                checked={tenantData.race === "Asian"}
                style={{ marginRight: "1rem" }}
              />
              Asian
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="race"
                value="Native Hawaiian or Pacific Islander"
                checked={
                  tenantData.race === "Native Hawaiian or Pacific Islander"
                }
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              Native Hawaiian or Pacific Islander
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="race"
                value="Some Other Race"
                checked={tenantData.race === "Some Other Race"}
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              Some Other Race
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="race"
                value="Two or more Races"
                checked={tenantData.race === "Two or more Races"}
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              Two or more Races
            </label>
          </div>
        </div>

        {/* Right side: Hispanic radio buttons */}
        <div className="ml-10">
          <div style={{ marginTop: "20px" }}>
            <label>
              <input
                type="radio"
                name="ethnicity"
                value="Hispanic"
                checked={tenantData.ethnicity === "Hispanic"}
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              Hispanic
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="ethnicity"
                value="Not Hispanic"
                checked={tenantData.ethnicity === "Not Hispanic"}
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              Not Hispanic
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="ethnicity"
                value="Not Applicable"
                checked={tenantData.ethnicity === "Not Applicable"}
                onChange={handleChange}
                style={{ marginRight: "1rem" }}
              />
              Not Applicable
            </label>
          </div>
        </div>
      </div>
      <hr
        style={{ margin: "2rem 0", border: "1px solid rgba(80, 82, 84, 0.5)" }}
      ></hr>
      <Section title="Emergency Contact Information">
        <InputField
          label="First Name"
          name="emergencyFirstName"
          value={tenantData.emergencyFirstName}
          onChange={handleChange}
        />
        <InputField
          label="Middle Name"
          name="emergencyMiddleName"
          value={tenantData.emergencyMiddleName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          name="emergencyLastName"
          value={tenantData.emergencyLastName}
          onChange={handleChange}
        />
        <InputField
          label="Phone Number"
          name="emergencyPhoneNumber"
          value={tenantData.emergencyPhoneNumber}
          onChange={handleChange}
          type="tel"
          mask="(999)-999-9999"
        />
        <InputField
          label="Email"
          name="emergencyEmail"
          value={tenantData.emergencyEmail}
          onChange={handleChange}
          type="email"
        />
        <InputField
          label="Relationship"
          name="emergencyRelationship"
          type="select"
          options={["Father", "Mother", "Spouse", "Child", "Other"]}
          value={tenantData.emergencyRelationship}
          onChange={handleChange}
        />
      </Section>
      <hr
        style={{ margin: "2rem 0", border: "1px solid rgba(80, 82, 84, 0.5)" }}
      ></hr>
      <Section title="Admission Information">
        <InputField
          label={
            <>
              Insurance <span className="required">*</span>
            </>
          }
          name="insurance"
          value={tenantData.insurance}
          onChange={handleChange}
          type="select"
          options={[
            "Medical Assistance",
            "Blue Plus",
            "Health Partners",
            "Hennepin Health",
            "IMCare",
            "Medica",
            "PrimeWest",
            "SouthCountry",
            "UCare",
            "United Healthcare",
          ]}
          onFocus={() => setFocusedField("insuranceType")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "insurance"}
          required
        />
        <InputField
          label={
            <>
              Insurance Number <span className="required">*</span>
            </>
          }
          name="insuranceNumber"
          value={tenantData.insuranceNumber}
          onChange={handleChange}
          required
        />
        <InputField
          label="ssn"
          name="ssn"
          value={tenantData.insuranceSSN}
          onChange={handleChange}
        />
        <InputField
          label="Intake Date"
          name="intakeDate"
          value={
            tenantData.intakeDate
              ? formatDateToMMDDYYYY(tenantData.intakeDate)
              : ""
          }
          onChange={(date) =>
            handleDateChange(
              "intakeDate",
              date ? formatDateToMMDDYYYY(date) : ""
            )
          }
          type="date"
          onFocus={() => setFocusedField("intakeDate")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "intakeDate"}
        />
        <InputField
          label="Let go Date"
          name="letGoDate"
          value={
            tenantData.letGoDate
              ? formatDateToMMDDYYYY(tenantData.letGoDate)
              : ""
          }
          onChange={(date) =>
            handleDateChange(
              "letGoDate",
              date ? formatDateToMMDDYYYY(date) : ""
            )
          }
          type="date"
          onFocus={() => setFocusedField("letGoDate")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "letGoDate"}
        />
        <InputField
          label="Let go Reason"
          name="LetGoReason"
          value={tenantData.LetGoReason}
          onChange={handleChange}
        />
        <InputField
          label={
            <>
              Diagnosis Code <span className="required">*</span>
            </>
          }
          name="diagnosisCode"
          value={tenantData.diagnosisCode}
          onChange={handleChange}
          type="select"
          options={[
            "Developmentatl Disability - F84.90",
            "Learning Disability - F81.89",
            "Mental Illness - F99",
            "Physical Illness, injury, or impairment - R69",
            "Chemical Dependency - F19.20",
          ]}
          onFocus={() => setFocusedField("diagnosisCode")}
          onBlur={() => setFocusedField(null)}
          focused={focusedField === "diagnosisCode"}
          required
        />
      </Section>
      <hr
        style={{ margin: "2rem 0", border: "1px solid rgba(80, 82, 84, 0.5)" }}
      ></hr>
      <Section title="Case Manager Information">
        <InputField
          label={<>First Name</>}
          name="caseManagerFirstName"
          value={tenantData.caseManagerFirstName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Middle Initial"
          name="caseManagerMiddleInitial"
          value={tenantData.caseManagerMiddleInitial}
          onChange={handleChange}
        />
        <InputField
          label={<>Last Name</>}
          name="caseManagerLastName"
          value={tenantData.caseManagerLastName}
          onChange={handleChange}
        />
        <InputField
          label={<>Phone Number</>}
          name="caseManagerPhoneNumber"
          value={tenantData.caseManagerPhoneNumber}
          onChange={handleChange}
          type="tel"
          mask="(999)-999-9999"
          required
        />
        <InputField
          label={<>Email</>}
          name="caseManagerEmail"
          value={tenantData.caseManagerEmail}
          onChange={handleChange}
          type="email"
          required
        />
      </Section>
      <hr
        style={{ margin: "2rem 0", border: "1px solid rgba(80, 82, 84, 0.5)" }}
      ></hr>
      <div className="flex items-center mb-4">
        <label className="text-gray-700 mr-2">
          Does the tenant need mobile app access?
        </label>
        <Switch
          checked={needsMobileAccess}
          onChange={() => setNeedsMobileAccess(!needsMobileAccess)}
        />
      </div>

      {needsMobileAccess && (
        <Section title="Login Information">
          <InputField
            label={
              <>
                Username <span className="required">*</span>
              </>
            }
            name="userName"
            value={tenantData.userName}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col">
            <InputField
              label={
                <>
                  Password <span className="required">*</span>
                </>
              }
              name="password"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
              required
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            {passwordStrength && (
              <p style={{ fontSize: "0.875rem", color: "#666" }}>
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type={showConfirmPassword ? "text" : "password"}
              required
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
            {!passwordMatch && (
              <p style={{ fontSize: "0.875rem", color: "red" }}>
                Passwords do not match
              </p>
            )}
          </div>
        </Section>
      )}

      <div className="flex items-center mb-4">
        <label className="text-gray-700 mr-2">
          Does the tenant have a responsible party?
        </label>
        <Switch checked={hasResponsibleParty} onChange={handleSwitchChange} />
      </div>
      {hasResponsibleParty && (
        <Section title="Responsible Party Information">
          <InputField
            label={
              <>
                First Name <span className="required">*</span>
              </>
            }
            name="responsibleFirstName"
            value={tenantData.responsibleFirstName}
            onChange={handleChange}
            onFocus={() => setFocusedField("responsibleFirstName")}
            onBlur={() => setFocusedField(null)}
            focused={focusedField === "responsibleFirstName"}
            required
          />
          <InputField
            label="Middle Name"
            name="responsibleMiddleName"
            value={tenantData.responsibleMiddleName}
            onChange={handleChange}
            onFocus={() => setFocusedField("responsibleMiddleName")}
            onBlur={() => setFocusedField(null)}
            focused={focusedField === "responsibleMiddleName"}
          />
          <InputField
            label={
              <>
                Last Name <span className="required">*</span>
              </>
            }
            name="responsibleLastName"
            value={tenantData.responsibleLastName}
            onChange={handleChange}
            onFocus={() => setFocusedField("responsibleLastName")}
            onBlur={() => setFocusedField(null)}
            focused={focusedField === "responsibleLastName"}
            required
          />
          <InputField
            label={
              <>
                Phone Number <span className="required">*</span>
              </>
            }
            name="responsiblePhoneNumber"
            value={tenantData.responsiblePhoneNumber}
            onChange={handleChange}
            type="tel"
            mask="(999)-999-9999"
            onFocus={() => setFocusedField("responsiblePhoneNumber")}
            onBlur={() => setFocusedField(null)}
            focused={focusedField === "responsiblePhoneNumber"}
            required
          />
          <InputField
            label={
              <>
                Email <span className="required">*</span>
              </>
            }
            name="responsibleEmail"
            value={tenantData.responsibleEmail}
            onChange={handleChange}
            type="email"
            onFocus={() => setFocusedField("responsibleEmail")}
            onBlur={() => setFocusedField(null)}
            focused={focusedField === "responsibleEmail"}
            required
          />
          <InputField
            label={
              <>
                Relationship <span className="required">*</span>
              </>
            }
            name="responsibleRelationship"
            value={tenantData.responsibleRelationship}
            type="select"
            options={["Father", "Mother", "Spouse", "Child", "Other"]}
            onChange={handleChange}
            onFocus={() => setFocusedField("responsibleRelationship")}
            onBlur={() => setFocusedField(null)}
            focused={focusedField === "responsibleRelationship"}
            required
          />
        </Section>
      )}
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
  showPassword,
  setShowPassword,
  pattern,
  placeholder,
  mask,
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
    ) : type === "date" ? (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(value)} // Ensure the value is in the Dayjs format
          onChange={(date) => onChange(date?.format("YYYY-MM-DD"))} // Format the selected date as "YYYY-MM-DD"
          dateFormat="MM-DD-YYYY" // Set the display format for the date
          placeholder="MM-DD-YYYY"
          sx={{
            width: "75%",
            "& input": {
              fontFamily: "Poppins",
              fontWeight: 500,
              height: "32px", // Adjust input height
              padding: "5px 10px", // Match padding inside the input field
            },
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
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
      <div className="flex items-center relative w-4/5">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            ...styles.input,
            ...(focused ? styles.inputFocused : {}),
            width: "100%",
            paddingRight: type === "password" ? "2.5rem" : "10px",
          }}
          required={required}
          maxLength={maxLength}
          pattern={pattern}
          placeholder={placeholder}
        />
        {type === "password" && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setShowPassword?.((prev) => !prev)}
          >
            {showPassword ? (
              <FaRegEye className="w-5 h-5" />
            ) : (
              <FaRegEyeSlash className="w-5 h-5" />
            )}
          </span>
        )}
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
    transition: "border-color 0.3s",
  },
  inputFocused: {
    borderColor: "#4A90E2",
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
